import { useRecoilValue } from 'recoil';
import { AnimatePresence } from 'framer-motion';
import { actionsMenuPageFadeActiveState, boardsMenuOpenState } from '../../atoms/UIAtoms';
import { quickNoteModalOpenState } from '../../atoms/QuickNoteModalAtoms';
import { mdNoteModalOpenState } from '../../atoms/MDNoteModalAtoms';
import PageFade from '../PageFade/PageFade';
import MenuCreate from './MenuCreate';
import MenuQuickNoteModal from './MenuQuickNoteModal';
import MenuMDNoteModal from './MenuMDNoteModal';
import { motion } from 'framer-motion';
import useDetectKeyboardOpen from 'use-detect-keyboard-open';

import "./css/ActionsMenu.css";


const ActionsMenu = () => {
    const isBoardsMenuOpen = useRecoilValue(boardsMenuOpenState);
    const pageFadeActive = useRecoilValue(actionsMenuPageFadeActiveState);
    const quickNoteModalOpen = useRecoilValue(quickNoteModalOpenState);
    const mdNoteModalOpen = useRecoilValue(mdNoteModalOpenState);

    const isKeyboardOpen = useDetectKeyboardOpen();

    return (
        <>
            <PageFade active={ pageFadeActive }/>
            
            <motion.div
                animate={{ top: isKeyboardOpen ? "40%" : "auto" }}

                className="actions-menu"
            >
                { !isBoardsMenuOpen && 
                    <div className="action-buttons">
                        <AnimatePresence>
                            { !quickNoteModalOpen && !mdNoteModalOpen &&
                                <MenuCreate/>
                            }
                        </AnimatePresence>

                        <AnimatePresence>
                            { quickNoteModalOpen &&
                                <MenuQuickNoteModal/>
                            }
                        </AnimatePresence>

                        <AnimatePresence>
                            { mdNoteModalOpen &&
                                <MenuMDNoteModal/>
                            }
                        </AnimatePresence>
                    </div>
                }
            </motion.div>
        </>
    );
};


export default ActionsMenu;