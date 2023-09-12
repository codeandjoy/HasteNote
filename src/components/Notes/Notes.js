import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import { activeBoardNotesFilteredByTagsState } from "../../atoms/DataAtoms";
import Note from "./Note";

import "./css/Notes.css";

const notesVariants = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: {
            staggerChildren: .1
        }
    }
}


const Notes = () => {
    const activeBoardNotesFilteredByTags = useRecoilValue(activeBoardNotesFilteredByTagsState);

    return (
        <motion.div 
            variants={ notesVariants }
            initial="initial"
            animate="animate"
        
            className="notes-container"
        >
            <div className="notes">
                {
                    activeBoardNotesFilteredByTags.map(note => 
                        <Note key={ note.id } note={ note }/>    
                    )
                }
            </div>
        </motion.div>
    )
};


export default Notes;