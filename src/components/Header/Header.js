import PlainBtn from "../PlainBtn/PlainBtn"
import Tags from "./Tags";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { boardsMenuOpen } from "../../atoms/UIAtoms";
import { pageFadeActive } from "../../atoms/UIAtoms";
import { pageFadeCallback } from "../../atoms/UIAtoms";
import { activeBoardState } from "../../atoms/DataAtoms";

import "./css/Header.css";


const Header = () => {
    const activeBoard = useRecoilValue(activeBoardState);

    const isBoardsMenuOpen = useRecoilValue(boardsMenuOpen);
    const setBoardsMenuOpen = useSetRecoilState(boardsMenuOpen);

    const setPageFadeActive = useSetRecoilState(pageFadeActive);
    const setPageFadeCallback = useSetRecoilState(pageFadeCallback);

    
    return (
        <div className="board-header">
            <div>
                <span className="board-name txt-faded-white">{ activeBoard.name }</span>
                <Tags/>
            </div>
            <div>
                { !isBoardsMenuOpen &&
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