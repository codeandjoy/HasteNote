import MenuBtn from "./MenuBtn";
import Tags from "./Tags";

import "./css/Header.css";

const dummyTags = ["work", "school"];

const Header = () => {
    return (
        <div className="board-header">
            <div>
                <span className="board-name txt-faded-white">Board</span>
                <Tags tags={ dummyTags }/>
            </div>
            <div>
                <MenuBtn/>
            </div>
        </div>
    );
};


export default Header;