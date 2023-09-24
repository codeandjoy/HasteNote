import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import PlainBtn from "../PlainBtn/PlainBtn";
import Icon from "../Icon/Icon";

import "./css/MDNoteModal.css";


const MDNoteModal = () => {
    const [content, setContent] = useState("");
    
    const [formatVisible, setFormatVisible] = useState(false);

    return (
        <div className="MDNoteModal" data-color-mode="dark">
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
                    value="Markdown note"
                />
                <input
                    className="note-tags"
                    value="#work #school"
                />
            </div>

            <div className="content-editor">
                <MDEditor
                    value={ content }
                    onChange={ setContent }
                    className={"MDEditor"+(formatVisible ? " format-visible":"")}
                />
            </div>
        </div>
    );
}

export default MDNoteModal;