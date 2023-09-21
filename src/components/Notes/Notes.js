import { AnimatePresence, motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import { activeBoardNotesFilteredByTagsState } from "../../atoms/DataAtoms";
import Note from "./Note";
import DataPlaceholder from "../DataPlaceholder/DataPlaceholder";
import { boardsMenuOpenState } from "../../atoms/UIAtoms";

import "./css/Notes.css";

const notesVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 }
}


const Notes = () => {
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
                                <Note key={ note.id } note={ note }/>    
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


export default Notes;