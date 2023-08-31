import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ActionButton from "./ActionButton";
import Icon from "../Icon/Icon";
import PageFade from '../PageFade/PageFade';

import "./css/ActionsMenu.css";

const actionBtnHover = { scale: 1.2 }
const action_btn_open_variants = {
    initial: {
        opacity: 0,
        left: 0
    },
    menuopen: {
        opacity: 1
    }
}
const markdown_btn_variants = {
    ...action_btn_open_variants,
    menuopen:{
        ...action_btn_open_variants.menuopen,
        left: "-160px"
    }
};
const quick_note_btn_variants = {
    ...action_btn_open_variants,
    menuopen:{
        ...action_btn_open_variants.menuopen,
        left: "-80px"
    }
};


const ActionsMenu = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="actions-menu">
            <PageFade isActive={menuOpen}/>

            <div className="action-buttons">
                <motion.div 
                    whileHover={ actionBtnHover }

                    className="brush-btn"
                >
                    <ActionButton 
                        color={menuOpen ? "black" : "orange"}
                        onClick={()=>setMenuOpen(menuOpen=>!menuOpen)}
                    >
                        <Icon type="brush"/>
                    </ActionButton>
                </motion.div>

                <AnimatePresence>
                    { menuOpen &&
                        <>
                            <motion.div
                                variants={ markdown_btn_variants }
                                initial="initial"
                                animate="menuopen"
                                exit="initial"
                                whileHover={ actionBtnHover }
                                
                                className="markdown-note-btn"
                            >
                                <ActionButton>
                                    <Icon type="markdown"/>
                                </ActionButton>
                            </motion.div>

                            <motion.div 
                                variants={ quick_note_btn_variants }
                                initial="initial"
                                animate="menuopen"
                                exit="initial"
                                whileHover={ actionBtnHover }
                                
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