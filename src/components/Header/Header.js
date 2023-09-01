import PlainBtn from "../PlainBtn/PlainBtn"
import Tags from "./Tags";

import "./css/Header.css";

const dummyTags = ["work", "school"];

const Header = ({ boardsMenuOpen, setBoardsMenuOpen }) => {
    return (
        <div className="board-header">
            <div>
                <span className="board-name txt-faded-white">Board</span>
                <Tags tags={ dummyTags }/>
            </div>
            <div>
                { !boardsMenuOpen &&
                    <PlainBtn type="menu" onClick={() => setBoardsMenuOpen(true)}/>
                }
            </div>
        </div>
    );
};


export default Header;