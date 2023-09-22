import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";

import "./css/MDNoteModal.css";


const MDNoteModal = () => {
    const [content, setContent] = useState("");
    
    console.log(content);

    return (
        <div className="MDNoteModal" data-color-mode="dark">
            <MDEditor
                value={ content }
                onChange={ setContent }
                className="MDEditor"
            />
        </div>
    );
}

export default MDNoteModal;