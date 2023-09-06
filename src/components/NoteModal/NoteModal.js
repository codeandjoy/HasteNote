import { AnimatePresence, motion } from "framer-motion";

import "./css/NoteModal.css";
import { useState } from "react";



const NoteModal = ({ modalOpen, initialAnimationPosition, initialData }) => {
    const [title, setTitle] = useState(initialData.title || "");
    const [tags, setTags] = useState(initialData.tags || "");
    const [content, setContent] = useState(initialData.content || "");
    
    const modalVariants = {
        initial: {
            opacity: 0,
            top: initialAnimationPosition.y,
            left: initialAnimationPosition.x,
            translateX: 0,
            translateY: 0
        },
        active: {
            opacity: 1,
            top: "50%",
            left: "50%",
            translateX: "-50%",
            translateY: "-50%"
        }
    }
    return (
        <AnimatePresence>
            { modalOpen &&
                <motion.div
                    variants={ modalVariants }
                    initial="initial"
                    animate="active"
                    exit="initial"
                    transition={{ type:"tween" }}

                    className="note-modal"
                >
                    <input
                        className="note-modal--inp-title note-title"
                        placeholder="Title"
                        value={ title }
                        onChange={ e => setTitle(e.target.value) }
                    />
                    <input
                        className="note-modal--inp-tags note-tags"
                        placeholder="#"
                        value={ tags }
                        onChange={ e => setTags(e.target.value) }
                    />
                    <div className="note-line"></div>
                    <textarea
                        className="note-modal--inp-content"
                        placeholder="Content"
                        value={ content }
                        onChange={ e => setContent(e.target.value) }
                    />
                </motion.div>
            }
        </AnimatePresence>

    )
};


export default NoteModal;