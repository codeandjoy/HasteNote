import { AnimatePresence, motion } from "framer-motion";
import uuid from "react-uuid";
import PlainBtn from "../PlainBtn/PlainBtn";
import Boards from "./Boards";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { boardsMenuPageFadeActiveState, boardsMenuOpenState } from "../../atoms/UIAtoms";
import { pageFadeCallbackState } from "../../atoms/UIAtoms";
import { activeBoardIdState, boardsState } from "../../atoms/DataAtoms";
import PageFade from "../PageFade/PageFade";

import "./css/BoardsMenu.css";

// ! make <right> responsive using 'react-responsive' media query
const boardMenuVariants = {
    initial: {
        right: "-370px"
    },
    menuopen: {
        right: "0px"
    }
}


const BoardsMenu = () => {
    const [boardsMenuOpen, setBoardsMenuOpen] = useRecoilState(boardsMenuOpenState);
    const [boards, setBoards] = useRecoilState(boardsState);
    const setActiveBoardId = useSetRecoilState(activeBoardIdState);

    const [pageFadeActive, setPageFadeActive] = useRecoilState(boardsMenuPageFadeActiveState);
    const resetPageFadeCallback = useResetRecoilState(pageFadeCallbackState);
    
    return (
        <>
            <PageFade active={ pageFadeActive }/>
            <AnimatePresence>
                { boardsMenuOpen && 
                    <motion.div 
                        variants={ boardMenuVariants }
                        initial="initial"
                        animate="menuopen"
                        exit="initial"

                        className="boards-menu"
                    >
                        <div className="boards-pane">
                            <PlainBtn
                                type="menu-close"
                                onClick={() => {
                                    setBoardsMenuOpen(false);
                                    setPageFadeActive(false);
                                    resetPageFadeCallback();
                                }}
                                className="btn-close-menu"
                            />
                            <span className="boards-pane-title">Boards</span>
                            <PlainBtn
                                type="plus"
                                onClick={()=>{
                                    const newId = uuid();

                                    // If creating first board
                                    if(!boards.length) setActiveBoardId(newId);

                                    setBoards(oldBoards =>
                                        [
                                            {
                                                id: newId,
                                                name: "Board",
                                                notes: []
                                            },
                                            ...oldBoards
                                        ]
                                    )
                                }}
                                className="btn-add-board"
                            />
                            <Boards/>
                        </div>
                    </motion.div>
                }
            </AnimatePresence>
        </>
    );
};


export default BoardsMenu;