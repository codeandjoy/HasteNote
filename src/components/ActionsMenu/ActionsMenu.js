import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ActionBtn from "./ActionBtn";
import NoteModal from '../NoteModal/NoteModal';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { actionsMenuOpen } from '../../atoms/UIAtoms';
import { pageFadeActive } from '../../atoms/UIAtoms';
import { pageFadeCallback } from '../../atoms/UIAtoms';

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


const ActionsMenu = () => {
    const isActionsMenuOpen = useRecoilValue(actionsMenuOpen);
    const setActionsMenuOpen = useSetRecoilState(actionsMenuOpen);

    const setPageFadeActive = useSetRecoilState(pageFadeActive);
    const setPageFadeCallback = useSetRecoilState(pageFadeCallback);

    const [createModalOpen, setCreateModalOpen] = useState(false);

    return (
        <div className="actions-menu">
            <NoteModal
                modalOpen={ createModalOpen }
                initialAnimationPosition={{ x: "80%", y: "100%" }}
            />

            <div className="action-buttons">
                <AnimatePresence>
                    { !createModalOpen &&
                        <motion.div 
                            variants={action_btn_open_variants}
                            initial="initial"
                            animate="menuopen"
                            exit="initial"
                            whileHover={ actionBtnHover }

                            className="brush-btn"
                        >
                            <ActionBtn 
                                type="brush"
                                color={isActionsMenuOpen ? "black" : "orange"}
                                onClick={() => {
                                    setActionsMenuOpen(isActionsMenuOpen => !isActionsMenuOpen);
                                    setPageFadeActive(active => !active);
                                    setPageFadeCallback(
                                        isActionsMenuOpen
                                            ? () => () => {}
                                            : () => () => {
                                                setActionsMenuOpen(false);
                                                setPageFadeActive(false);
                                            }
                                    );
                                }}
                            />
                        </motion.div>
                    }
                </AnimatePresence>

                <AnimatePresence>
                    { isActionsMenuOpen && !createModalOpen &&
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
                                <ActionBtn
                                    type="note"
                                    onClick={() => {
                                        setCreateModalOpen(true);
                                        setPageFadeActive(true);
                                        setActionsMenuOpen(false);
                                        setPageFadeCallback(() => () => {
                                            setCreateModalOpen(false);
                                            setPageFadeActive(false);
                                        });
                                    }}    
                                />
                            </motion.div>
                        </>
                    }
                </AnimatePresence>
            </div>
        </div>
    );
};


export default ActionsMenu;