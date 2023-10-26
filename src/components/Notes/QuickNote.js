import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { actionsMenuPageFadeActiveState } from "../../atoms/UIAtoms";
import { pageFadeCallbackState } from "../../atoms/UIAtoms";
import { quickNoteModalActionState, quickNoteModalAnimationPosState, quickNoteModalOpenState, quickNoteModalState } from "../../atoms/QuickNoteModalAtoms";
import { noteVariants } from "./animationVariants";

import "./css/NotePreview.css";
import "./css/QuickNote.css";


const QuickNote = ({ note }) => {
    const setActionsMenuPageFadeActive = useSetRecoilState(actionsMenuPageFadeActiveState);
    const setPageFadeCallback = useSetRecoilState(pageFadeCallbackState);

    const setQuickNoteModalAnimationPos = useSetRecoilState(quickNoteModalAnimationPosState);
    const resetQuickNoteModalAnimationPos = useResetRecoilState(quickNoteModalAnimationPosState);

    const setQuickNoteModalData = useSetRecoilState(quickNoteModalState);
    const resetQuickNoteModalData = useResetRecoilState(quickNoteModalState);

    const setQuickNoteModalAction = useSetRecoilState(quickNoteModalActionState);
    const resetQuickNoteModalAction = useResetRecoilState(quickNoteModalActionState);

    const setQuickNoteModalOpen = useSetRecoilState(quickNoteModalOpenState);
    const resetQuickNoteModalOpen = useResetRecoilState(quickNoteModalOpenState);

    const noteRef = useRef();

    const [isHidden, setIsHidden] = useState(false);

    return (
        <motion.div 
            variants={ noteVariants }
            initial="initial"
            animate="animate"
            exit="exit"
            layout
        
            ref={ noteRef }
            
            className={"note-preview quick-note" + (isHidden?" note-preview-hidden":"")}

            onClick={() => {
                setIsHidden(true);

                // Open note modal
                setQuickNoteModalAnimationPos({
                    x: noteRef.current.offsetLeft,
                    y: noteRef.current.offsetTop
                });
                setQuickNoteModalData(note); // Set initial data
                setQuickNoteModalAction("edit");
                setQuickNoteModalOpen(true);
                //
                setActionsMenuPageFadeActive(true);

                setPageFadeCallback(()=>()=>{
                    setIsHidden(false);

                    // Close and reset note modal
                    resetQuickNoteModalAnimationPos();
                    resetQuickNoteModalData();
                    resetQuickNoteModalAction();
                    resetQuickNoteModalOpen();
                    //
                    setActionsMenuPageFadeActive(false);
                });
            }}
        >
            { note.title && 
                <div className="note-title">{ note.title }</div>
            }
            { note.tags &&
                <div className="note-tags">{ note.tags }</div>
            }
            { (note.title || note.tags) &&
                <div className="note-line"></div>
            }
            <div className="note-content">{ note.content }</div>
        </motion.div>
    );
};

export default QuickNote;