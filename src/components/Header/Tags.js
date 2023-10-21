import Tag from "./Tag";
import { useRecoilValue } from "recoil";
import { activeBoardIdState } from "../../atoms/DataAtoms";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../db";

import "./css/Tags.css";


const Tags = () => {
    const activeBoardId = useRecoilValue(activeBoardIdState);
    const activeBoard = useLiveQuery(() => db.boards.get(activeBoardId));
    // Unique tags across active board notes
    const activeBoardTags = [...new Set(activeBoard?.notes.map(note => note.tags.split(" ")).flat())];
    const pureTags = activeBoardTags.filter(tag => tag !== "");

    return (
        <div className="board-tags">
            {   
                pureTags?.map((tag, idx) =>
                    <Tag key={ idx } tag={ tag }/>
                )
            }
        </div>
    );
};


export default Tags;