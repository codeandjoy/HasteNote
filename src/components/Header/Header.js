import PlainBtn from "../PlainBtn/PlainBtn"
import Tags from "./Tags";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { boardsMenuPageFadeActiveState, boardsMenuOpenState } from "../../atoms/UIAtoms";
import { pageFadeCallbackState } from "../../atoms/UIAtoms";

import "./css/Header.css";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../db";
import { activeBoardIdState } from "../../atoms/DataAtoms";


const Header = () => {
    const activeBoardId = useRecoilValue(activeBoardIdState);
    const activeBoard = useLiveQuery(() => db.boards.get(activeBoardId), [activeBoardId]);

    const [boardsMenuOpen, setBoardsMenuOpen] = useRecoilState(boardsMenuOpenState);

    const setBoardMenuPageFadeActive = useSetRecoilState(boardsMenuPageFadeActiveState);
    const setPageFadeCallback = useSetRecoilState(pageFadeCallbackState);
    
    return (
        <div className="board-header-content-container">
            <div className="board-header">
                <div>
                    { activeBoard &&
                        <div className="board-name txt-faded-white">{ activeBoard.name }</div>
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
            <div className="board-tags">
                { activeBoard &&
                    <Tags/>
                }
            </div>
        </div>
    );
};


export default Header;