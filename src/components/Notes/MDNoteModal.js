import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRecoilState, useRecoilValue } from "recoil";
import { mdNoteModalOpenState, mdNoteModalState } from "../../atoms/MDNoteModalAtoms";
import MDEditor from "@uiw/react-md-editor";
import PlainBtn from "../PlainBtn/PlainBtn";
import Icon from "../Icon/Icon";

import "./css/MDNoteModal.css";

const mdNoteModalVariants = {
    initial: {
        opacity: 0,
        top: "100%"
    },
    animate: {
        opacity: 1,
        top: 0
    },
    exit: {
        opacity: 0,
        top: 0,
        left: "-100%"
    }
}


const MDNoteModal = () => {
    const [mdNoteModalData, setMDNoteModalData] = useRecoilState(mdNoteModalState);
    const mdNoteModalOpen = useRecoilValue(mdNoteModalOpenState);
    
    const [formatVisible, setFormatVisible] = useState(false);
    
    return (
        <AnimatePresence>
            { mdNoteModalOpen &&
                <motion.div
                    variants={ mdNoteModalVariants }
                    initial="initial"
                    animate="animate"
                    exit="exit"

                    className="MDNoteModal"
                
                    data-color-mode="dark"
                >
                    <div className="modal-header">
                        <PlainBtn
                            type="menu-arrow-left"
                            className="btn-back"
                        />
                        <Icon type="paper" className="art-paper"/>
                        <PlainBtn
                            type={ formatVisible ? "hide" : "format" }
                            className="btn-format"
                            onClick={() => setFormatVisible(fv => !fv)}
                        />
                    </div>

                    <div className="note-header">
                        <input
                            className="note-name"
                            placeholder="Title"
                            value={ mdNoteModalData.title }
                            onChange={ e => setMDNoteModalData(data => ({...data, title: e.target.value})) }
                        />
                        <input
                            className="note-tags"
                            placeholder="#"
                            value={ mdNoteModalData.tags }
                            onChange={ e => setMDNoteModalData(data => ({...data, tags: e.target.value})) }
                        />
                    </div>

                    <div className="content-editor">
                        <MDEditor
                            value={ mdNoteModalData.content }
                            onChange={ value => setMDNoteModalData(data => ({...data, content: value })) }
                            className={"MDEditor"+(formatVisible ? " format-visible":"")}
                        />
                    </div>
                </motion.div>
            }
        </AnimatePresence>
    );
}

export default MDNoteModal;