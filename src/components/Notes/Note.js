import { useRef } from "react";
import { motion } from "framer-motion";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { pageFadeActiveState } from "../../atoms/UIAtoms";
import { pageFadeCallbackState } from "../../atoms/UIAtoms";
import { noteModalActionState, noteModalAnimationPosState, noteModalOpenState, noteModalState } from "../../atoms/NoteModalAtoms";

import "./css/Note.css";

const noteVariants = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: {
            duration: 1
        }
    },
    exit: {
        opacity: 0,
        scale: .5
    }
}

const Note = ({ note }) => {
    const setPageFadeActive = useSetRecoilState(pageFadeActiveState);
    const setPageFadeCallback = useSetRecoilState(pageFadeCallbackState);

    const setNoteModalAnimationPos = useSetRecoilState(noteModalAnimationPosState);
    const resetNoteModalAnimationPos = useResetRecoilState(noteModalAnimationPosState);

    const setNoteModalData = useSetRecoilState(noteModalState);
    const resetNoteModalData = useResetRecoilState(noteModalState);

    const setNoteModalAction = useSetRecoilState(noteModalActionState);
    const resetNoteModalAction = useResetRecoilState(noteModalActionState);

    const setNoteModalOpen = useSetRecoilState(noteModalOpenState);
    const resetNoteModalOpen = useResetRecoilState(noteModalOpenState);

    const noteRef = useRef();

    return (
        <motion.div 
            variants={ noteVariants }
            initial="initial"
            animate="animate"
            exit="exit"
            layout
        
            ref={ noteRef }
            
            className="note"

            onClick={() => {
                // Open note modal
                setNoteModalAnimationPos({
                    x: noteRef.current.offsetLeft,
                    y: noteRef.current.offsetTop
                });
                setNoteModalData(note); // Set initial data
                setNoteModalAction("edit");
                setNoteModalOpen(true);
                //
                setPageFadeActive(true);

                setPageFadeCallback(()=>()=>{
                    // Close and reset note modal
                    resetNoteModalAnimationPos();
                    resetNoteModalData();
                    resetNoteModalAction();
                    resetNoteModalOpen();
                    //
                    setPageFadeActive(false);
                });
            }}
        >
            <h3 className="note-title">{ note.title }</h3>
            <div className="note-tags"><span>{ note.tags }</span></div>
            <div className="note-line"></div>
            <div className="note-content">{ note.content }</div>
        </motion.div>
    );
};

export default Note;