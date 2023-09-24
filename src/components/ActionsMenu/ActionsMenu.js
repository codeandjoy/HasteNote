import { useRecoilValue } from 'recoil';
import { AnimatePresence } from 'framer-motion';
import { actionsMenuPageFadeActiveState, boardsMenuOpenState } from '../../atoms/UIAtoms';
import { quickNoteModalOpenState } from '../../atoms/QuickNoteModalAtoms';
import { mdNoteModalOpenState } from '../../atoms/MDNoteModalAtoms';
import PageFade from '../PageFade/PageFade';
import MenuCreate from './MenuCreate';
import MenuQuickNoteModal from './MenuQuickNoteModal';

import "./css/ActionsMenu.css";


const ActionsMenu = () => {
    const isBoardsMenuOpen = useRecoilValue(boardsMenuOpenState);
    const pageFadeActive = useRecoilValue(actionsMenuPageFadeActiveState);
    const quickNoteModalOpen = useRecoilValue(quickNoteModalOpenState);
    const mdNoteModalOpen = useRecoilValue(mdNoteModalOpenState);

    return (
        <>
            <PageFade active={ pageFadeActive }/>
            
            <div className="actions-menu">
                { !isBoardsMenuOpen && 
                    <div className="action-buttons">
                        <AnimatePresence>
                            { !quickNoteModalOpen &&
                                <MenuCreate/>
                            }
                        </AnimatePresence>

                        <AnimatePresence>
                            { quickNoteModalOpen &&
                                <MenuQuickNoteModal/>
                            }
                        </AnimatePresence>

                        <AnimatePresence>
                        </AnimatePresence>
                    </div>
                }
            </div>
        </>
    );
};


export default ActionsMenu;