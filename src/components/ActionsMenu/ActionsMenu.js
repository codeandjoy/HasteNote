import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ActionButton from "./ActionButton";
import Icon from "../Icon/Icon";

import "./css/ActionsMenu.css";

const markdown_btn_variants = {
    initial: {
        opacity: 0,
        left: 0
    },
    menuopen: {
        opacity: 1,
        left: "-160px"
    },
    exit: {
        opacity: 0,
        left: 0
    }
}
const quick_note_btn_variants = {
    initial: {
        opacity: 0,
        left: 0
    },
    menuopen: {
        opacity: 1,
        left: "-80px"
    },
    exit: {
        opacity: 0,
        left: 0
    }
}

const ActionsMenu = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="actions-menu">
            <div className="action-buttons">
                <div className="brush-btn">
                    <ActionButton 
                        color={menuOpen ? "black" : "orange"}
                        onClick={()=>setMenuOpen(menuOpen=>!menuOpen)}
                    >
                        <Icon type="brush"/>
                    </ActionButton>
                </div>

                <AnimatePresence>
                    { menuOpen &&
                        <>
                            <motion.div
                                variants={ markdown_btn_variants }
                                initial="initial"
                                animate={menuOpen ? "menuopen" : "initial"}
                                exit="exit"
                                className="markdown-note-btn"
                            >
                                <ActionButton>
                                    <Icon type="markdown"/>
                                </ActionButton>
                            </motion.div>

                            <motion.div 
                                variants={ quick_note_btn_variants }
                                initial="initial"
                                animate={menuOpen ? "menuopen" : "initial"}
                                exit="exit"
                                className="quick-note-btn"
                            >
                                <ActionButton>
                                    <Icon type="note"/>
                                </ActionButton>
                            </motion.div>
                        </>
                    }
                </AnimatePresence>
            </div>
        </div>
    );
};


export default ActionsMenu;