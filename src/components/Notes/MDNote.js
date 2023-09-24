import Icon from "../Icon/Icon";

import "./css/NotePreview.css"
import "./css/MDNote.css"


const MDNote = ({ note }) => {
    return (
        <div
            className="note-preview md-note"
        >
            <div className="md-note--art-side md-note--art-side-left"><Icon type="paper-black"/></div>
            <div className="md-note--art-side md-note--art-side-right"><Icon type="paper-black"/></div>

            <div className="centered-preview-content">
                <div className="preview-art"><Icon type="paper"/></div>
                <h3 className="note-title">{ note.title }</h3>
                <div className="note-tags"><span>{ note.tags }</span></div>
            </div>
        </div>
    );
};


export default MDNote;