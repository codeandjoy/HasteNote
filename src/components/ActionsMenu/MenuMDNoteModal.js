import uuid from "react-uuid";
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from "recoil";
import { mdNoteModalActionState, mdNoteModalState } from "../../atoms/MDNoteModalAtoms";
import { action_btn_open_variants, deleteBtnOpenVariants } from "./animationVariants";
import { pageFadeCallbackState } from "../../atoms/UIAtoms";
import { activeBoardNotesState } from "../../atoms/DataAtoms";
import { validateNoteTags } from "../../utils/utils";
import ActionBtn from "./ActionBtn";


const MenuMDNoteModal = () => {
    const mdNoteModalAction = useRecoilValue(mdNoteModalActionState);
    const getMDNoteModalData = useRecoilCallback(({snapshot}) => async () => {
        return await snapshot.getPromise(mdNoteModalState);
    }, []);

    const setActiveBoardNotes = useSetRecoilState(activeBoardNotesState);

    const pageFadeCallback = useRecoilValue(pageFadeCallbackState);

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

                    pageFadeCallback();           
                }}
            />
        </>
    );
};


export default MenuMDNoteModal;