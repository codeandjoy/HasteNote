import { AnimatePresence, motion } from 'framer-motion';
import uuid from 'react-uuid';
import ActionBtn from "./ActionBtn";
import { useRecoilCallback, useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { actionsMenuOpen } from '../../atoms/UIAtoms';
import { pageFadeActive } from '../../atoms/UIAtoms';
import { pageFadeCallback } from '../../atoms/UIAtoms';
import { noteModalActionState, noteModalAnimationPosState, noteModalOpenState, noteModalState } from '../../atoms/NoteModalAtoms';
import { activeBoardNotesState } from '../../atoms/DataAtoms';

import "./css/ActionsMenu.css";
import { validateNoteTags } from '../../utils/utils';

const actionBtnHover = { scale: .9 }
const action_btn_open_variants = {
    initial: {
        opacity: 0,
        right: 0
    },
    menuopen: {
        opacity: 1
    }
}
const markdown_btn_variants = {
    ...action_btn_open_variants,
    menuopen:{
        ...action_btn_open_variants.menuopen,
        right: "160px"
    }
};
const quick_note_btn_variants = {
    ...action_btn_open_variants,
    menuopen:{
        ...action_btn_open_variants.menuopen,
        right: "80px"
    }
};
const deleteBtnOpenVariants = {
    initial: {
        opacity: 0,
        left: 0
    },
    menuopen: {
        opacity: 1
    }
}


const ActionsMenu = () => {
    const [isActionsMenuOpen, setActionsMenuOpen] = useRecoilState(actionsMenuOpen);

    const setPageFadeActive = useSetRecoilState(pageFadeActive);
    const setPageFadeCallback = useSetRecoilState(pageFadeCallback);

    const setNoteModalAnimationPos = useSetRecoilState(noteModalAnimationPosState);
    const resetNoteModalAnimationPos = useResetRecoilState(noteModalAnimationPosState);
    const [noteModalOpen, setNoteModalOpen] = useRecoilState(noteModalOpenState);
    const [noteModalAction, setNoteModalAction] = useRecoilState(noteModalActionState);
    const resetNoteModalData = useResetRecoilState(noteModalState);
    const getNoteModalData = useRecoilCallback(({snapshot}) => async () => {
        return await snapshot.getPromise(noteModalState);
    }, []);
    // * Add save action button that will either 'create' or 'edit' 
    // ! based on NoteModal 'modalAction'

    const setActiveBoardNotes = useSetRecoilState(activeBoardNotesState);

    return (
        <div className="actions-menu">
            <div className="action-buttons">
                <AnimatePresence>
                    { !noteModalOpen &&
                        <motion.div 
                            variants={ action_btn_open_variants }
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
                    { isActionsMenuOpen && !noteModalOpen &&
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
                                        // Open note modal
                                        setNoteModalAnimationPos({x: "80%", y: "100%"});
                                        resetNoteModalData(); // Initial data is "" because it's a 'create' button
                                        setNoteModalAction("create");
                                        setNoteModalOpen(true);
                                        //
                                        setPageFadeActive(true);
                                        setActionsMenuOpen(false);
                                        setPageFadeCallback(() => () => {
                                            // Close and reset note modal
                                            resetNoteModalAnimationPos();
                                            resetNoteModalData();
                                            setNoteModalAction("create"); //reset to default
                                            setNoteModalOpen(false);
                                            //
                                            setPageFadeActive(false);
                                        });
                                    }}    
                                />
                            </motion.div>
                        </>
                    }
                </AnimatePresence>

                <AnimatePresence>
                    { noteModalOpen &&
                        <>
                            { noteModalAction === "edit" &&
                                <motion.div
                                    variants={ deleteBtnOpenVariants }
                                    initial="initial"
                                    animate="menuopen"
                                    exit="initial"
                                    whileHover={ actionBtnHover }

                                    className='delete-btn'
                                >
                                    <ActionBtn
                                        type="delete"
                                        color="red"
                                        onClick={async () => {
                                            let modalData = await getNoteModalData();
                                            setActiveBoardNotes(oldActiveNotes => oldActiveNotes.filter(oldNote => oldNote.id !== modalData.id));
                                    
                                            // Close and reset note modal
                                            resetNoteModalAnimationPos();
                                            resetNoteModalData();
                                            setNoteModalAction("create"); // reset to default
                                            setNoteModalOpen(false);
                                            //
                                            setPageFadeActive(false);
                                            }}
                                    />
                                </motion.div>
                            }
                            <motion.div
                                variants={ action_btn_open_variants }
                                initial="initial"
                                animate="menuopen"
                                exit="initial"
                                whileHover={ actionBtnHover }

                                className='save-btn'
                            >
                                <ActionBtn
                                    type="save"
                                    color="blue"
                                    onClick={async () => {
                                        let modalData = await getNoteModalData();
                                        if(!modalData.id) modalData = { ...modalData, id: uuid() }; // if note has no initial data (must be created) -> create new id

                                        setActiveBoardNotes(oldActiveNotes => {
                                            // If note already exists -> edit
                                            if(oldActiveNotes.some(oldNote => oldNote.id === modalData.id)){
                                                return oldActiveNotes.map(oldNote => {
                                                    if(oldNote.id === modalData.id){
                                                        return validateNoteTags(modalData);
                                                    }
                                                    return oldNote;
                                                })
                                            }
                                            // else -> create
                                            else{
                                                return [validateNoteTags(modalData), ...oldActiveNotes];
                                            }
                                        });

                                        // Close and reset note modal
                                        resetNoteModalAnimationPos();
                                        resetNoteModalData();
                                        setNoteModalAction("create"); // reset to default
                                        setNoteModalOpen(false);
                                        //
                                        setPageFadeActive(false);
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