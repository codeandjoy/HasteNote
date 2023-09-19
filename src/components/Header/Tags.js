import Tag from "./Tag";
import { useRecoilValue } from "recoil";
import { activeBoardTagsState } from "../../atoms/DataAtoms";

import "./css/Tags.css";


const Tags = () => {
    const activeBoardTags = useRecoilValue(activeBoardTagsState);

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