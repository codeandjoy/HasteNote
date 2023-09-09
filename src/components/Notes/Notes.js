import Note from "./Note";
import { useRecoilValue } from "recoil";
import { activeBoardNotesState } from "../../atoms/DataAtoms";

import "./css/Notes.css";


const Notes = () => {
    const activeBoardNotes = useRecoilValue(activeBoardNotesState);

    return (
        <div className="notes-container">
            <div className="notes">
                {
                    activeBoardNotes.map(note => 
                        <Note key={ note.id } note={ note }/>    
                    )
                }
            </div>
        </div>
    )
};


export default Notes;