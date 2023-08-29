import Note from "./Note";

import "./css/Notes.css";


const Notes = ({ notes }) => {
    return (
        <div className="notes-container">
            <div className="notes">
                {
                    notes.map(note => 
                        <Note key={ note.id } note={ note }/>    
                    )
                }
            </div>
        </div>
    )
};


export default Notes;