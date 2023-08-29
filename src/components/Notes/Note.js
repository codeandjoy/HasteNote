import "./css/Note.css";


const Note = ({ note }) => {
    return (
        <div className="note">
            <h3 className="note-title">{ note.title }</h3>
            <div className="note-tags"><span>{ note.tags }</span></div>
            <div className="note-line"></div>
            <div className="note-content">{ note.content }</div>
        </div>
    );
};

export default Note;