import PlainBtn from "../PlainBtn/PlainBtn"
import Tags from "./Tags";
import { useSetRecoilState } from "recoil";
import { pageFadeActive } from "../../atom";
import { pageFadeCallback } from "../../atom";

import "./css/Header.css";

const dummyTags = ["work", "school"];

const Header = ({ boardsMenuOpen, setBoardsMenuOpen }) => {
    const setPageFadeActive = useSetRecoilState(pageFadeActive);
    const setPageFadeCallback = useSetRecoilState(pageFadeCallback);

    return (
        <div className="board-header">
            <div>
                <span className="board-name txt-faded-white">Board</span>
                <Tags tags={ dummyTags }/>
            </div>
            <div>
                { !boardsMenuOpen &&
                    <PlainBtn
                        type="menu"
                        onClick={() => {
                            setBoardsMenuOpen(true);
                            setPageFadeActive(true);
                            setPageFadeCallback(()=>()=>{
                                setBoardsMenuOpen(false);
                                setPageFadeActive(false);
                            });
                        }}
                    />
                }
            </div>
        </div>
    );
};


export default Header;