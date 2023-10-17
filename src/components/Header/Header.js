import PlainBtn from "../PlainBtn/PlainBtn"
import Tags from "./Tags";
import { useRecoilState, useSetRecoilState } from "recoil";
import { boardsMenuPageFadeActiveState, boardsMenuOpenState } from "../../atoms/UIAtoms";
import { pageFadeCallbackState } from "../../atoms/UIAtoms";

import "./css/Header.css";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../db";


const Header = () => {
    const activeBoard = useLiveQuery(() => db.boards.get(localStorage.getItem('activeBoardId')));

    const [boardsMenuOpen, setBoardsMenuOpen] = useRecoilState(boardsMenuOpenState);

    const setBoardMenuPageFadeActive = useSetRecoilState(boardsMenuPageFadeActiveState);
    const setPageFadeCallback = useSetRecoilState(pageFadeCallbackState);
    
    return (
        <div className="board-header">
            <div>
                { activeBoard &&
                    <>
                        <span className="board-name txt-faded-white">{ activeBoard.name }</span>
                        <Tags/>
                    </>
                }
            </div>
            <div>
                { !boardsMenuOpen &&
                    <PlainBtn
                        type="menu"
                        onClick={() => {
                            setBoardsMenuOpen(true);
                            setBoardMenuPageFadeActive(true);
                            setPageFadeCallback(()=>()=>{
                                setBoardsMenuOpen(false);
                                setBoardMenuPageFadeActive(false);
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