import Tag from "./Tag";

import "./css/Tags.css";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../db";


const Tags = () => {
    const activeBoard = useLiveQuery(() => db.boards.get(localStorage.getItem('activeBoardId') || 0));
    // Unique tags across active board notes
    const activeBoardTags = [...new Set(activeBoard?.notes.map(note => note.tags.split(" ")).flat())];

    return (
        <div className="board-tags">
            {   
                activeBoardTags?.map((tag, idx) =>
                    <Tag key={ idx } tag={ tag }/>
                )
            }
        </div>
    );
};


export default Tags;