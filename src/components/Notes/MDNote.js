import { motion } from "framer-motion";
import Icon from "../Icon/Icon";

import "./css/NotePreview.css"
import "./css/MDNote.css"
import { noteVariants } from "./animationVariants";


const MDNote = ({ note }) => {
    return (
        <motion.div
            variants={ noteVariants }
            initial="initial"
            animate="animate"
            exit="exit"
            layout

            className="note-preview md-note"

            onClick={() => {
                // Open MD modal
            }}
        >
            <div className="md-note--art-side md-note--art-side-left"><Icon type="paper-black"/></div>
            <div className="md-note--art-side md-note--art-side-right"><Icon type="paper-black"/></div>

            <div className="centered-preview-content">
                <div className="preview-art"><Icon type="paper"/></div>
                <h3 className="note-title">{ note.title }</h3>
                <div className="note-tags"><span>{ note.tags }</span></div>
            </div>
        </motion.div>
    );
};


export default MDNote;