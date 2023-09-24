import { motion } from "framer-motion";
import Icon from "../Icon/Icon";

import "./css/NotePreview.css"
import "./css/MDNote.css"
import { noteVariants } from "./animationVariants";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { mdNoteModalActionState, mdNoteModalOpenState, mdNoteModalState } from "../../atoms/MDNoteModalAtoms";
import { actionsMenuPageFadeActiveState, pageFadeCallbackState } from "../../atoms/UIAtoms";


const MDNote = ({ note }) => {
    const setActionsMenuPageFadeActive = useSetRecoilState(actionsMenuPageFadeActiveState);
    const setPageFadeCallback = useSetRecoilState(pageFadeCallbackState);

    const setMDNoteModalData = useSetRecoilState(mdNoteModalState);
    const resetMDNoteModalData = useResetRecoilState(mdNoteModalState);

    const setMDNoteModalAction = useSetRecoilState(mdNoteModalActionState);
    const resetMDNoteModalAction = useResetRecoilState(mdNoteModalActionState);

    const setMDNoteModalOpen = useSetRecoilState(mdNoteModalOpenState);
    const resetMDNoteModalOpen = useResetRecoilState(mdNoteModalOpenState);

    return (
        <motion.div
            variants={ noteVariants }
            initial="initial"
            animate="animate"
            exit="exit"
            layout

            className="note-preview md-note"

            onClick={() => {
                // Open note modal
                setMDNoteModalData(note); // Set initial data
                setMDNoteModalAction("edit");
                setMDNoteModalOpen(true);
                //
                setActionsMenuPageFadeActive(true);

                setPageFadeCallback(()=>()=>{
                    // Close and reset note modal
                    resetMDNoteModalData();
                    resetMDNoteModalAction();
                    resetMDNoteModalOpen();
                    //
                    setActionsMenuPageFadeActive(false);
                });
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