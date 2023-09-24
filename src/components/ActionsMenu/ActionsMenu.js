import uuid from 'react-uuid';
import { validateNoteTags } from '../../utils/utils';
import { useRecoilCallback, useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { actionsMenuOpenState, actionsMenuPageFadeActiveState, boardsMenuOpenState } from '../../atoms/UIAtoms';
import { pageFadeCallbackState } from '../../atoms/UIAtoms';
import { noteModalActionState, noteModalAnimationPosState, noteModalOpenState, noteModalState } from '../../atoms/NoteModalAtoms';
import { activeBoardNotesState } from '../../atoms/DataAtoms';
import { AnimatePresence } from 'framer-motion';
import { action_btn_open_variants, deleteBtnOpenVariants, markdown_btn_variants, quick_note_btn_variants } from './animationVariants';
import ActionBtn from "./ActionBtn";
import PageFade from '../PageFade/PageFade';

import "./css/ActionsMenu.css";


const ActionsMenu = () => {
    const [isActionsMenuOpen, setActionsMenuOpen] = useRecoilState(actionsMenuOpenState);
    const isBoardsMenuOpen = useRecoilValue(boardsMenuOpenState);

    const [pageFadeActive, setPageFadeActive] = useRecoilState(actionsMenuPageFadeActiveState);
    const setPageFadeCallback = useSetRecoilState(pageFadeCallbackState);

    const setNoteModalAnimationPos = useSetRecoilState(noteModalAnimationPosState);
    const resetNoteModalAnimationPos = useResetRecoilState(noteModalAnimationPosState);

    const [noteModalOpen, setNoteModalOpen] = useRecoilState(noteModalOpenState);
    
    const [noteModalAction, setNoteModalAction] = useRecoilState(noteModalActionState);
    
    const getNoteModalData = useRecoilCallback(({snapshot}) => async () => {
        return await snapshot.getPromise(noteModalState);
    }, []);
    const resetNoteModalData = useResetRecoilState(noteModalState);

    const setActiveBoardNotes = useSetRecoilState(activeBoardNotesState);

    return (
        <>
            <PageFade active={ pageFadeActive }/>
            
            <div className="actions-menu">
                { !isBoardsMenuOpen && 
                    <div className="action-buttons">
                        <AnimatePresence>
                            { !noteModalOpen &&
                                <ActionBtn 
                                    variants={ action_btn_open_variants }
                                    className="brush-btn"
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
                            }
                        </AnimatePresence>

                        <AnimatePresence>
                            { isActionsMenuOpen && !noteModalOpen &&
                                <>
                                    <ActionBtn 
                                        variants={ markdown_btn_variants } 
                                        className="md-note-btn"
                                        type="markdown"
                                    />

                                    <ActionBtn
                                        variants={ quick_note_btn_variants }
                                        className="quick-note-btn"
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
                                </>
                            }
                        </AnimatePresence>

                        <AnimatePresence>
                            { noteModalOpen &&
                                <>
                                    { noteModalAction === "edit" &&
                                        <ActionBtn
                                            variants={ deleteBtnOpenVariants }
                                            className="delete-btn"
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
                                    }
                                    <ActionBtn
                                        variants={ action_btn_open_variants }
                                        className="save-btn"
                                        type="save"
                                        color="blue"
                                        onClick={async () => {
                                            let modalData = await getNoteModalData();
                                            
                                            // if note has no initial data (must be created) -> create new id
                                            if(!modalData.id) modalData = { ...modalData, id: uuid() };

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
                                </>
                            }
                        </AnimatePresence>
                    </div>
                }
            </div>
        </>
    );
};


export default ActionsMenu;