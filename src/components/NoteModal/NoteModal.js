import { AnimatePresence, motion } from "framer-motion";
import { useRecoilState, useRecoilValue } from "recoil";
import { noteModalAnimationPosState, noteModalOpenState, noteModalState } from "../../atoms/NoteModalAtoms";

import "./css/NoteModal.css";


// ? screen resize support (change x and y)
const NoteModal = () => {
    const noteModalAnimationPos = useRecoilValue(noteModalAnimationPosState);
    const noteModalOpen = useRecoilValue(noteModalOpenState);
    const [noteModalData, setNoteModalData] = useRecoilState(noteModalState);


    const modalVariants = {
        initial: {
            opacity: 0,
            top: noteModalAnimationPos.y,
            left: noteModalAnimationPos.x,
            translateX: 0,
            translateY: 0
        },
        active: {
            opacity: 1,
            top: "50%",
            left: "50%",
            translateX: "-50%",
            translateY: "-50%"
        },
        // TODO add exit state with custom animation pos (top, left)
    }


    return (
        <AnimatePresence>
            { noteModalOpen &&
                <motion.div
                    variants={ modalVariants }
                    initial="initial"
                    animate="active"
                    exit="initial"
                    transition={{ type:"tween" }}

                    className="note-modal"
                >
                    <input
                        className="note-modal--inp-title"
                        placeholder="Title"
                        value={ noteModalData.title }
                        onChange={ e => setNoteModalData(data => ({...data, title: e.target.value})) }
                    />
                    <input
                        className="note-modal--inp-tags"
                        placeholder="#"
                        value={ noteModalData.tags }
                        onChange={ e => setNoteModalData(data => ({...data, tags: e.target.value})) }
                    />
                    <div className="note-modal--line"></div>
                    <textarea
                        className="note-modal--inp-content"
                        placeholder="Content"
                        value={ noteModalData.content }
                        onChange={ e => setNoteModalData(data => ({...data, content: e.target.value})) }
                    />
                </motion.div>
            }
        </AnimatePresence>
    )
};


export default NoteModal;