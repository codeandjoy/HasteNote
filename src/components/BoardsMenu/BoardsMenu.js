import { AnimatePresence, motion } from "framer-motion";
import uuid from "react-uuid";
import PlainBtn from "../PlainBtn/PlainBtn";
import Boards from "./Boards";
import { useRecoilValue } from "recoil";
import { boardsMenuPageFadeActiveState, boardsMenuOpenState } from "../../atoms/UIAtoms";
import { pageFadeCallbackState } from "../../atoms/UIAtoms";
import PageFade from "../PageFade/PageFade";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../db";

import "./css/BoardsMenu.css";

// ! make <right> responsive using 'react-responsive' media query
const boardMenuVariants = {
    initial: {
        right: "-370px"
    },
    menuopen: {
        right: "0px"
    }
}


const BoardsMenu = () => {
    // const [boards, setBoards] = useRecoilState(boardsState);
    // const setActiveBoardId = useSetRecoilState(activeBoardIdState);
    const boards = useLiveQuery(() => db.boards.toArray());

    const boardsMenuOpen = useRecoilValue(boardsMenuOpenState);

    const pageFadeActive = useRecoilValue(boardsMenuPageFadeActiveState);
    const pageFadeCallback = useRecoilValue(pageFadeCallbackState);
    
    return (
        <>
            <PageFade active={ pageFadeActive }/>
            <AnimatePresence>
                { boardsMenuOpen && 
                    <motion.div 
                        variants={ boardMenuVariants }
                        initial="initial"
                        animate="menuopen"
                        exit="initial"

                        className="boards-menu"
                    >
                        <div className="boards-pane">
                            <PlainBtn
                                type="menu-close"
                                onClick={() => {
                                    pageFadeCallback();
                                }}
                                className="btn-close-menu"
                            />
                            <span className="boards-pane-title">Boards</span>
                            <PlainBtn
                                type="plus"
                                onClick={async ()=>{
                                    const newId = uuid();

                                    // If creating first board
                                    if(!boards.length) localStorage.setItem('activeBoardId', newId);

                                    await db.boards.add(
                                        {
                                            id: newId,
                                            name: "Board",
                                            notes: []
                                        },
                                    );
                                }}
                                className="btn-add-board"
                            />
                            <Boards boards={ boards }/>
                        </div>
                    </motion.div>
                }
            </AnimatePresence>
        </>
    );
};


export default BoardsMenu;