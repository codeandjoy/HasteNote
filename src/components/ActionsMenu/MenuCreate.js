import { action_btn_open_variants, markdown_btn_variants, quick_note_btn_variants } from "./animationVariants";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { actionsMenuOpenState, actionsMenuPageFadeActiveState, pageFadeCallbackState } from "../../atoms/UIAtoms";
import { quickNoteModalActionState, quickNoteModalAnimationPosState, quickNoteModalOpenState, quickNoteModalState } from "../../atoms/QuickNoteModalAtoms";
import { mdNoteModalActionState, mdNoteModalOpenState, mdNoteModalState } from "../../atoms/MDNoteModalAtoms";
import ActionBtn from "./ActionBtn";


const MenuCreate = () => {
    const [actionsMenuOpen, setActionsMenuOpen] = useRecoilState(actionsMenuOpenState);

    const setPageFadeActive = useSetRecoilState(actionsMenuPageFadeActiveState)
    const setPageFadeCallback = useSetRecoilState(pageFadeCallbackState);

    const setQuickNoteModalAnimationPos = useSetRecoilState(quickNoteModalAnimationPosState);
    const resetQuickNoteModalAnimationPos = useResetRecoilState(quickNoteModalAnimationPosState);
    const setQuickNoteModalAction = useSetRecoilState(quickNoteModalActionState);
    const resetQuickNoteModalData = useResetRecoilState(quickNoteModalState)
    const setQuickNoteModalOpen = useSetRecoilState(quickNoteModalOpenState);

    const resetMDNoteModalData = useResetRecoilState(mdNoteModalState);
    const setMDNoteModalAction = useSetRecoilState(mdNoteModalActionState);
    const setMDNoteModalOpen = useSetRecoilState(mdNoteModalOpenState);

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
                        type="paper"
                        onClick={() => {
                            // Open MD note modal
                            resetMDNoteModalData();
                            setMDNoteModalAction("create");
                            setMDNoteModalOpen(true);
                            //

                            setPageFadeActive(true);
                            setActionsMenuOpen(false);

                            setPageFadeCallback(() => () => {
                                // Close and reset note modal
                                resetMDNoteModalData();
                                setMDNoteModalAction("create"); //reset to default
                                setMDNoteModalOpen(false);
                                //

                                setPageFadeActive(false);
                            })
                        }}
                    />

                    <ActionBtn
                        variants={ quick_note_btn_variants }
                        className="quick-note-btn"
                        type="note"
                        onClick={() => {
                            // Open quick note modal
                            setQuickNoteModalAnimationPos({x: "80%", y: "100%"});
                            resetQuickNoteModalData(); // Initial data is "" because it's a 'create' button
                            setQuickNoteModalAction("create");
                            setQuickNoteModalOpen(true);
                            //

                            setPageFadeActive(true);
                            setActionsMenuOpen(false);
                            
                            setPageFadeCallback(() => () => {
                                // Close and reset note modal
                                resetQuickNoteModalAnimationPos();
                                resetQuickNoteModalData();
                                setQuickNoteModalAction("create"); //reset to default
                                setQuickNoteModalOpen(false);
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