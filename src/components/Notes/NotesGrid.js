import { AnimatePresence, motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import { activeBoardNotesFilteredByTagsState } from "../../atoms/DataAtoms";
import { boardsMenuOpenState } from "../../atoms/UIAtoms";
import DataPlaceholder from "../DataPlaceholder/DataPlaceholder";
import QuickNote from "./QuickNote";
import MDNote from "./MDNote";

import "./css/NotesGrid.css";

const notesVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 }
}


const NotesGrid = () => {
    const activeBoardNotesFilteredByTags = useRecoilValue(activeBoardNotesFilteredByTagsState);
    const isBoardsMenuOpen = useRecoilValue(boardsMenuOpenState);

    return (
        <motion.div 
            variants={ notesVariants }
            initial="initial"
            animate="animate"
        
            className="notes-container"
        >
            { !!activeBoardNotesFilteredByTags.length &&
                <div className="notes">
                    <AnimatePresence>
                        {
                            activeBoardNotesFilteredByTags.map(note => 
                                (note.type === "quicknote" && <QuickNote key={ note.id } note={ note }/>)
                                ||
                                (note.type === "mdnote" && <MDNote key={ note.id } note={ note }/>)    
                            )
                        }
                    </AnimatePresence>
                </div>
            }
            { !!!activeBoardNotesFilteredByTags.length && !isBoardsMenuOpen &&
                <DataPlaceholder type="notes"/>
            }
        </motion.div>
    )

};


export default NotesGrid;