import uuid from "react-uuid";
import { useRecoilCallback, useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { mdNoteModalActionState, mdNoteModalOpenState, mdNoteModalState } from "../../atoms/MDNoteModalAtoms";
import { action_btn_open_variants, deleteBtnOpenVariants } from "./animationVariants";
import { actionsMenuPageFadeActiveState } from "../../atoms/UIAtoms";
import { activeBoardNotesState } from "../../atoms/DataAtoms";
import { validateNoteTags } from "../../utils/utils";
import ActionBtn from "./ActionBtn";


const MenuMDNoteModal = () => {
    const [mdNoteModalAction, setMDNoteModalAction] = useRecoilState(mdNoteModalActionState);
    const setMDNoteModalOpen = useSetRecoilState(mdNoteModalOpenState);
    const resetMDNoteModalData = useResetRecoilState(mdNoteModalState);
    const getMDNoteModalData = useRecoilCallback(({snapshot}) => async () => {
        return await snapshot.getPromise(mdNoteModalState);
    }, []);

    const setPageFadeActive = useSetRecoilState(actionsMenuPageFadeActiveState);
    
    const setActiveBoardNotes = useSetRecoilState(activeBoardNotesState);

    return (
        <>
            { mdNoteModalAction === "edit" &&
                <ActionBtn
                    variants={ deleteBtnOpenVariants }
                    className="delete-btn"
                    type="delete"
                    color="red"
                    onClick={async () => {
                        let modalData = await getMDNoteModalData();
                        setActiveBoardNotes(oldActiveNotes => oldActiveNotes.filter(oldNote => oldNote.id !== modalData.id));
                
                        // Close and reset note modal
                        resetMDNoteModalData();
                        setMDNoteModalAction("create"); // reset to default
                        setMDNoteModalOpen(false);
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
                    let modalData = await getMDNoteModalData();

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
                    resetMDNoteModalData();
                    setMDNoteModalAction("create"); // reset to default
                    setMDNoteModalOpen(false);
                    //

                    setPageFadeActive(false);             
                }}
            />
        </>
    );
};


export default MenuMDNoteModal;