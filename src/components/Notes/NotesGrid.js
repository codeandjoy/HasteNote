import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import { activeBoardNotesFilteredByTagsState } from "../../atoms/DataAtoms";
import { boardsMenuOpenState } from "../../atoms/UIAtoms";
import DataPlaceholder from "../DataPlaceholder/DataPlaceholder";
import QuickNote from "./QuickNote";
import MDNote from "./MDNote";

import "./css/NotesGrid.css";
import MasonryGrid from "../MasonryGrid/MasonryGrid";
import { useMediaQuery } from "react-responsive";

const notesVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 }
}


const NotesGrid = () => {
    const activeBoardNotesFilteredByTags = useRecoilValue(activeBoardNotesFilteredByTagsState);
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
            { !!activeBoardNotesFilteredByTags.length &&
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
            { !!!activeBoardNotesFilteredByTags.length && !isBoardsMenuOpen &&
                <DataPlaceholder type="notes"/>
            }
        </motion.div>
    )

};


export default NotesGrid;