import { AnimatePresence, motion } from "framer-motion";
import uuid from "react-uuid";
import PlainBtn from "../PlainBtn/PlainBtn";
import Boards from "./Boards";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { boardsMenuOpenState } from "../../atoms/UIAtoms";
import { pageFadeActiveState } from "../../atoms/UIAtoms";
import { pageFadeCallbackState } from "../../atoms/UIAtoms";
import { boardsState } from "../../atoms/DataAtoms";

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
    const setBoards = useSetRecoilState(boardsState);

    const setPageFadeActive = useSetRecoilState(pageFadeActiveState);
    const resetPageFadeCallback = useResetRecoilState(pageFadeCallbackState);
    
    return (
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
                                setBoards(oldBoards => 
                                    [
                                        {
                                            id: uuid(),
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
    );
};


export default BoardsMenu;