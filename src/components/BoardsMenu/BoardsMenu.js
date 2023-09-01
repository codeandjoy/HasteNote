import { AnimatePresence, motion } from "framer-motion";

import "./css/BoardsMenu.css";
import PlainBtn from "../PlainBtn/PlainBtn";

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
                        <PlainBtn type="menu-close" onClick={() => setBoardsMenuOpen(false)}/>
                    </div>
                </motion.div>
            }
        </AnimatePresence>
    );
};


export default BoardsMenu;