import { AnimatePresence, motion } from "framer-motion";
import PlainBtn from "../PlainBtn/PlainBtn";
import Boards from "./Boards";
import { useRecoilState, useSetRecoilState } from "recoil";
import { boardsMenuOpenState } from "../../atoms/UIAtoms";
import { pageFadeActiveState } from "../../atoms/UIAtoms";
import { pageFadeCallbackState } from "../../atoms/UIAtoms";

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

    const setPageFadeActive = useSetRecoilState(pageFadeActiveState);
    const setPageFadeCallback = useSetRecoilState(pageFadeCallbackState);
    
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
                                setPageFadeCallback(() => () => {});
                            }}
                            className="btn-close-menu"
                        />
                        <span className="boards-pane-title">Boards</span>
                        <PlainBtn
                            type="plus"
                            onClick={()=>{}}
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