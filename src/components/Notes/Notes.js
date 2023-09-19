import { AnimatePresence, motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import { activeBoardNotesFilteredByTagsState } from "../../atoms/DataAtoms";
import Note from "./Note";

import "./css/Notes.css";
import DataPlaceholder from "../DataPlaceholder/DataPlaceholder";

const notesVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 }
}


const Notes = () => {
    const activeBoardNotesFilteredByTags = useRecoilValue(activeBoardNotesFilteredByTagsState);

    console.log(activeBoardNotesFilteredByTags);

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
            { !!!activeBoardNotesFilteredByTags.length &&
                <DataPlaceholder type="notes"/>
            }
        </motion.div>
    )
};


export default Notes;