import { AnimatePresence, motion } from "framer-motion";
import PlainBtn from "../PlainBtn/PlainBtn";
import { useSetRecoilState } from "recoil";
import { pageFadeActive } from "../../atom";
import { pageFadeCallback } from "../../atom";

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

const BoardsMenu = ({ boardsMenuOpen, setBoardsMenuOpen }) => {
    const setPageFadeActive = useSetRecoilState(pageFadeActive);
    const setPageFadeCallback = useSetRecoilState(pageFadeCallback);
    
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