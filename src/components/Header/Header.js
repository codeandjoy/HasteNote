import PlainBtn from "../PlainBtn/PlainBtn"
import Tags from "./Tags";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { boardsMenuOpenState } from "../../atoms/UIAtoms";
import { pageFadeActiveState } from "../../atoms/UIAtoms";
import { pageFadeCallbackState } from "../../atoms/UIAtoms";
import { activeBoardState } from "../../atoms/DataAtoms";

import "./css/Header.css";


const Header = () => {
    const activeBoard = useRecoilValue(activeBoardState);

    const [boardsMenuOpen, setBoardsMenuOpen] = useRecoilState(boardsMenuOpenState);

    const setPageFadeActive = useSetRecoilState(pageFadeActiveState);
    const setPageFadeCallback = useSetRecoilState(pageFadeCallbackState);
    
    return (
        <div className="board-header">
            <div>
                <span className="board-name txt-faded-white">{ activeBoard.name }</span>
                <Tags/>
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
                        className="btn-menu"
                    />
                }
            </div>
        </div>
    );
};


export default Header;