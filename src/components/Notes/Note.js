import { useRef } from "react";
import { motion } from "framer-motion";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { pageFadeActive } from "../../atoms/UIAtoms";
import { pageFadeCallback } from "../../atoms/UIAtoms";
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
    const setPageFadeActive = useSetRecoilState(pageFadeActive);
    const resetPageFadeActive = useResetRecoilState(pageFadeActive);
    const setPageFadeCallback = useSetRecoilState(pageFadeCallback);

    // ? Refactor into custom hook
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
                    resetPageFadeActive(false);
                });
            }}
        >
            <h3 className="note-title">{ note.title }</h3>
            <div className="note-tags"><span>{ note.tags }</span></div>
            <div className="note-line"></div>
            <div className="note-content">{ note.content }</div>
            
            {/* white overlay */}
            {/* screen fade */}
        </motion.div>
    );
};

export default Note;