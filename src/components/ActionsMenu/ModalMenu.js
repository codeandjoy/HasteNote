import uuid from "react-uuid";
import { useRecoilValue } from "recoil";
import { pageFadeCallbackState } from "../../atoms/UIAtoms";
import { validateNoteTags } from "../../utils/utils";
import { db } from "../../db";
import ActionBtn from "./ActionBtn";
import { action_btn_open_variants, deleteBtnOpenVariants } from "./animationVariants";


const ModalMenu = ({ modalData, modalAction }) => {
    const pageFadeCallback = useRecoilValue(pageFadeCallbackState);

    return (
    <>
            { modalAction === "edit" &&
                <ActionBtn
                    variants={ deleteBtnOpenVariants }
                    className="delete-btn"
                    type="delete"
                    color="red"
                    onClick={
                        async () => {
                            const activeBoardId = localStorage.getItem('activeBoardId');

                            await db.transaction('rw', [db.boards], async () => {
                                const activeBoard = await db.boards.get(activeBoardId);
                                const newNotes = activeBoard.notes.filter(oldNote => oldNote.id !== modalData.id);

                                await db.boards.update(activeBoardId, { notes: newNotes });
                            });

                            pageFadeCallback();
                        }
                    }
                />
            }
            <ActionBtn
                variants={ action_btn_open_variants }
                className="save-btn"
                type="save"
                color="blue"
                onClick={ 
                    async () => {
                        // if no data entered -> return
                        if(!modalData.title && !modalData.tags && !modalData.content){
                            pageFadeCallback();
                            return;
                        }

                        // if note has no initial data (must be created) -> create new id
                        if(!modalData.id) modalData = { ...modalData, id: uuid() };
                        
                        const activeBoardId = localStorage.getItem('activeBoardId');
                        await db.transaction('rw', [db.boards], async () => {
                            const activeBoard = await db.boards.get(activeBoardId);
                            
                            if(modalAction === 'edit'){
                                await db.boards.update(
                                    activeBoardId, 
                                    { 
                                        notes: activeBoard.notes.map(oldNote => {
                                            if(oldNote.id === modalData.id){
                                                return validateNoteTags(modalData);
                                            }
                                            return oldNote;
                                        })
                                    }
                                );
                            }
                            else if(modalAction === 'create'){
                                await db.boards.update(activeBoardId, { notes: [validateNoteTags(modalData), ...activeBoard.notes]});
                            }
                        }); 

                        pageFadeCallback();
                    }
                }
            />
        </>
    );
}


export default ModalMenu;