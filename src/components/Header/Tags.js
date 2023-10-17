import Tag from "./Tag";
import { useRecoilValue } from "recoil";
import { activeBoardTagsState } from "../../atoms/DataAtoms";

import "./css/Tags.css";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../db";


const Tags = () => {
    const activeBoard = useLiveQuery(() => db.boards.get(localStorage.getItem('activeBoardId')));
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