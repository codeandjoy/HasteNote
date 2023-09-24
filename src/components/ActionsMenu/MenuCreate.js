import { action_btn_open_variants, markdown_btn_variants, quick_note_btn_variants } from "./animationVariants";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { actionsMenuOpenState, actionsMenuPageFadeActiveState, pageFadeCallbackState } from "../../atoms/UIAtoms";
import ActionBtn from "./ActionBtn";
import { quickNoteModalActionState, quickNoteModalAnimationPosState, quickNoteModalOpenState, quickNoteModalState } from "../../atoms/QuickNoteModalAtoms";


const MenuCreate = () => {
    const [actionsMenuOpen, setActionsMenuOpen] = useRecoilState(actionsMenuOpenState);

    const setPageFadeActive = useSetRecoilState(actionsMenuPageFadeActiveState)
    const setPageFadeCallback = useSetRecoilState(pageFadeCallbackState);

    const setNoteModalAnimationPos = useSetRecoilState(quickNoteModalAnimationPosState);
    const resetNoteModalAnimationPos = useResetRecoilState(quickNoteModalAnimationPosState);
    const setNoteModalAction = useSetRecoilState(quickNoteModalActionState);
    const resetNoteModalData = useResetRecoilState(quickNoteModalState)
    const setNoteModalOpen = useSetRecoilState(quickNoteModalOpenState);

    return (
        <>
            <ActionBtn 
                variants={ action_btn_open_variants }
                className="brush-btn"
                type="brush"
                color={actionsMenuOpen ? "black" : "orange"}
                onClick={() => {
                    setActionsMenuOpen(o => !o);
                    setPageFadeActive(active => !active);
                    setPageFadeCallback(
                        actionsMenuOpen
                            ? () => () => {}
                            : () => () => {
                                setActionsMenuOpen(false);
                                setPageFadeActive(false);
                            }
                    );
                }}
            />

            { actionsMenuOpen &&
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
        </>
    );
}


export default MenuCreate;