import Note from "./Note";
import { useRecoilValue } from "recoil";
import { activeBoardNotesFilteredByTagsState, activeBoardNotesState } from "../../atoms/DataAtoms";

import "./css/Notes.css";


const Notes = () => {
    const activeBoardNotesFilteredByTags = useRecoilValue(activeBoardNotesFilteredByTagsState);

    return (
        <div className="notes-container">
            <div className="notes">
                {
                    activeBoardNotesFilteredByTags.map(note => 
                        <Note key={ note.id } note={ note }/>    
                    )
                }
            </div>
        </div>
    )
};


export default Notes;