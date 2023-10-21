import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import { activeBoardIdState, activeFilterTagsState } from "../../atoms/DataAtoms";
import { boardsMenuOpenState } from "../../atoms/UIAtoms";
import DataPlaceholder from "../DataPlaceholder/DataPlaceholder";
import QuickNote from "./QuickNote";
import MDNote from "./MDNote";

import "./css/NotesGrid.css";
import MasonryGrid from "../MasonryGrid/MasonryGrid";
import { useMediaQuery } from "react-responsive";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../db";

const notesVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 }
}

const filterNotesByTags = (notes, filterTags) => {
    if(!notes) return [];
    if(filterTags.length === 0) return notes;
    
    return notes.filter(note => filterTags.some(filterTag => note.tags.split(" ").includes(filterTag)));
}


const NotesGrid = () => {
    const activeBoardId = useRecoilValue(activeBoardIdState);
    const activeBoard = useLiveQuery(() => db.boards.get(activeBoardId));
    const activeFilterTags = useRecoilValue(activeFilterTagsState);

    const activeBoardNotesFilteredByTags = filterNotesByTags(activeBoard?.notes, activeFilterTags);

    
    const isBoardsMenuOpen = useRecoilValue(boardsMenuOpenState);

    const is2Col = useMediaQuery({ query: '(max-width: 800px)' });
    const is1Col = useMediaQuery({ query: '(max-width: 500px)' });
    const numCols = (()=>{if(is1Col) return 1; if(is2Col) return 2; return 3})();

    return (
        <motion.div 
            variants={ notesVariants }
            initial="initial"
            animate="animate"
        
            className="notes-container"
        >
            { activeBoardNotesFilteredByTags && !!activeBoardNotesFilteredByTags.length &&
                <MasonryGrid
                    numCols={ numCols }
                    colGap={ 20 }
                    rowGap={ 20 }
                >
                    {
                        activeBoardNotesFilteredByTags.map(note => 
                            (note.type === "quicknote" && <QuickNote key={ note.id } note={ note }/>)
                            ||
                            (note.type === "mdnote" && <MDNote key={ note.id } note={ note }/>)    
                        )
                    }
                </MasonryGrid>
            }
            { activeBoardNotesFilteredByTags && !!!activeBoardNotesFilteredByTags.length && !isBoardsMenuOpen &&
                <DataPlaceholder type="notes"/>
            }
        </motion.div>
    )

};


export default NotesGrid;