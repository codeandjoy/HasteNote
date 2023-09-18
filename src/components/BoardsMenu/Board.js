import { useState } from "react";
import { useRecoilCallback, useRecoilState, useSetRecoilState } from "recoil";
import { activeBoardIdState, boardsState } from "../../atoms/DataAtoms";
import { AnimatePresence, motion } from "framer-motion"; 
import BoardContextMenu from "./BoardContextMenu";
import PlainBtn from "../PlainBtn/PlainBtn";

import "./css/Board.css";

const boardVariants = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1
    }
}


const Board = ({ board }) => {
    const [activeBoardId, setActiveBoardId] = useRecoilState(activeBoardIdState);
    const setBoards = useSetRecoilState(boardsState);
    const getAllBoards = useRecoilCallback(({snapshot}) => async () => {
        return await snapshot.getPromise(boardsState)
    }, []);

    const [hoverHighlight, setHoverHiglight] = useState(false);
    const [contextMenuOpen, setContextMenuOpen] = useState(false);

    // TODO
    // contextMenuOpen opens contextmenu

    // TODO modes 
    // edit mode == true
    // make span into input and on click outside save new board name
    // delete button just deletes board

    const classNames = "board"
        +(activeBoardId===board.id ? " board-active":"")
        +(hoverHighlight ? " board-hover":"");

    return (
        <motion.div
            variants={ boardVariants }
            initial="initial"
            animate="animate"
            exit="initial"
        
            onClick={() => {
                setActiveBoardId(board.id);
            }}

            onMouseOver={(e) => setHoverHiglight(true)}
            onMouseOut={() => setHoverHiglight(false)}
        
            className={ classNames }
        >
            <span className="board-name">{ board.name }</span>

            { hoverHighlight &&
                <PlainBtn
                    type="menu-dots"
                    onClick={(e) => {
                        e.stopPropagation();
                        setContextMenuOpen(o => !o);
                    }}
                    className="btn-menu-dots"
                />
            }

            <AnimatePresence>
                { contextMenuOpen &&
                    <BoardContextMenu
                        onClickOutside={() => { setContextMenuOpen(false); }}
                        onEdit={() => {}}
                        onDelete={async () => {
                            if(activeBoardId === board.id){
                                // Set first board in the array as active
                                // ! Bug - can't find if no boards in the array !
                                const nextActiveId = (await getAllBoards()).find(b => b.id !== activeBoardId).id;
                                setActiveBoardId(nextActiveId);
                            }
                            setBoards(oldBoards => oldBoards.filter(b => b.id !== board.id));
                        }}
                    />
                }
            </AnimatePresence>
        </motion.div>
    );
};


export default Board;