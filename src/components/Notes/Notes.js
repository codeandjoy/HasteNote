import Note from "./Note";

import "./css/Notes.css";


const Notes = ({ notes }) => {
    return (
        <div className="notes">
            {
                notes.map(note => 
                    <Note key={ note.id } note={ note }/>    
                )
            }
        </div>
    )
};


export default Notes;