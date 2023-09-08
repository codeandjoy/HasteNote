import { AnimatePresence, motion } from "framer-motion";
import PlainBtn from "../PlainBtn/PlainBtn";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { boardsMenuOpen } from "../../atoms/UIAtoms";
import { pageFadeActive } from "../../atoms/UIAtoms";
import { pageFadeCallback } from "../../atoms/UIAtoms";

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
    const isBoardsMenuOpen = useRecoilValue(boardsMenuOpen);
    const setBoardsMenuOpen = useSetRecoilState(boardsMenuOpen);
    
    const setPageFadeActive = useSetRecoilState(pageFadeActive);
    const setPageFadeCallback = useSetRecoilState(pageFadeCallback);
    
    
    return (
        <AnimatePresence>
            { isBoardsMenuOpen && 
                <motion.div 
                    variants={ boardMenuVariants }
                    initial="initial"
                    animate="menuopen"
                    exit="initial"

                    className="boards-menu"
                >
                    <div className="boards">
                        <PlainBtn
                            type="menu-close"
                            onClick={() => {
                                setBoardsMenuOpen(false);
                                setPageFadeActive(false);
                                setPageFadeCallback(() => () => {});
                            }}
                        />
                    </div>
                </motion.div>
            }
        </AnimatePresence>
    );
};


export default BoardsMenu;