import uuid from "react-uuid";
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from "recoil";
import { quickNoteModalActionState, quickNoteModalState } from "../../atoms/QuickNoteModalAtoms";
import { activeBoardNotesState } from "../../atoms/DataAtoms";
import { action_btn_open_variants, deleteBtnOpenVariants } from "./animationVariants";
import { validateNoteTags } from "../../utils/utils";
import ActionBtn from "./ActionBtn";
import { pageFadeCallbackState } from "../../atoms/UIAtoms";


const MenuQuickNoteModal = () => {
    const quickNoteModalAction = useRecoilValue(quickNoteModalActionState);
    const getQuickNoteModalData = useRecoilCallback(({snapshot}) => async () => {
        return await snapshot.getPromise(quickNoteModalState);
    }, []);

    const setActiveBoardNotes = useSetRecoilState(activeBoardNotesState);

    const pageFadeCallback = useRecoilValue(pageFadeCallbackState);

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
                
                        pageFadeCallback();
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

                    pageFadeCallback();
                }}
            />
        </>
    );  
};


export default MenuQuickNoteModal;