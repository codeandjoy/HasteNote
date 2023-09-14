import { useRecoilState } from "recoil";
import { boardFilterTagsState } from "../../atoms/DataAtoms";

import "./css/Tag.css";


const Tag = ({ tag }) => {
    const [filterTags, setFilterTags] = useRecoilState(boardFilterTagsState);

    const classNames = "tag" + (filterTags.includes(tag) ? " tag-active" : "");

    return (
        <div 
            className={ classNames }
        
            onClick={() => {
                if(!filterTags.includes(tag)){
                    setFilterTags(filterTags => [tag, ...filterTags]);
                }
                else{
                    setFilterTags(filterTags => filterTags.filter(t => t !== tag));
                }
            }}
        >
            <span>{ tag }</span>
        </div>
    );
};


export default Tag;