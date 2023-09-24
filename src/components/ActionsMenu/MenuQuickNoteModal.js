import uuid from "react-uuid";
import { useRecoilCallback, useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { quickNoteModalActionState, quickNoteModalAnimationPosState, quickNoteModalOpenState, quickNoteModalState } from "../../atoms/QuickNoteModalAtoms";
import { activeBoardNotesState } from "../../atoms/DataAtoms";
import { action_btn_open_variants, deleteBtnOpenVariants } from "./animationVariants";
import { validateNoteTags } from "../../utils/utils";
import ActionBtn from "./ActionBtn";
import { actionsMenuPageFadeActiveState } from "../../atoms/UIAtoms";


const MenuQuickNoteModal = () => {
    const [quickNoteModalAction, setQuickNoteModalAction] = useRecoilState(quickNoteModalActionState);
    const resetQuickNoteModalAnimationPos = useResetRecoilState(quickNoteModalAnimationPosState);
    const setQuickNoteModalOpen = useSetRecoilState(quickNoteModalOpenState);
    const resetQuickNoteModalData = useResetRecoilState(quickNoteModalState);
    const getQuickNoteModalData = useRecoilCallback(({snapshot}) => async () => {
        return await snapshot.getPromise(quickNoteModalState);
    }, []);

    const setPageFadeActive = useSetRecoilState(actionsMenuPageFadeActiveState);

    const setActiveBoardNotes = useSetRecoilState(activeBoardNotesState);

    return (
        <>
            { quickNoteModalAction === "edit" &&
                <ActionBtn
                    variants={ deleteBtnOpenVariants }
                    className="delete-btn"
                    type="delete"
                    color="red"
                    onClick={async () => {
                        let modalData = await getQuickNoteModalData();
                        setActiveBoardNotes(oldActiveNotes => oldActiveNotes.filter(oldNote => oldNote.id !== modalData.id));
                
                        // Close and reset note modal
                        resetQuickNoteModalAnimationPos();
                        resetQuickNoteModalData();
                        setQuickNoteModalAction("create"); // reset to default
                        setQuickNoteModalOpen(false);
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
                    let modalData = await getQuickNoteModalData();
                    
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
                    resetQuickNoteModalAnimationPos();
                    resetQuickNoteModalData();
                    setQuickNoteModalAction("create"); // reset to default
                    setQuickNoteModalOpen(false);
                    //

                    setPageFadeActive(false);
                }}
            />
        </>
    );  
};


export default MenuQuickNoteModal;