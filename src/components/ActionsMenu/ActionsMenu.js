import { AnimatePresence, motion } from 'framer-motion';
import ActionBtn from "./ActionBtn";

import "./css/ActionsMenu.css";

const actionBtnHover = { scale: .9 }
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


const ActionsMenu = ({ actionsMenuOpen, setActionsMenuOpen }) => {
    return (
        <div className="actions-menu">
            <div className="action-buttons">
                <motion.div 
                    whileHover={ actionBtnHover }

                    className="brush-btn"
                >
                    <ActionBtn 
                        type="brush"
                        color={actionsMenuOpen ? "black" : "orange"}
                        onClick={()=>setActionsMenuOpen(actionsMenuOpen => !actionsMenuOpen)}
                    />
                </motion.div>

                <AnimatePresence>
                    { actionsMenuOpen &&
                        <>
                            <motion.div
                                variants={ markdown_btn_variants }
                                initial="initial"
                                animate="menuopen"
                                exit="initial"
                                whileHover={ actionBtnHover }
                                
                                className="markdown-note-btn"
                            >
                                <ActionBtn type="markdown"/>
                            </motion.div>

                            <motion.div 
                                variants={ quick_note_btn_variants }
                                initial="initial"
                                animate="menuopen"
                                exit="initial"
                                whileHover={ actionBtnHover }
                                
                                className="quick-note-btn"
                            >
                                <ActionBtn type="note"/>
                            </motion.div>
                        </>
                    }
                </AnimatePresence>
            </div>
        </div>
    );
};


export default ActionsMenu;