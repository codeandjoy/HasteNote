import Tag from "./Tag";

import "./css/Tags.css";


const Tags = ({tags}) => {
    return (
        <div className="board-tags">
            {   
                tags.map((tag, idx) =>
                    <Tag key={ idx } tag={ tag }/>
                )
            }
        </div>
    );
};


export default Tags;