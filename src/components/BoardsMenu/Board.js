import { useState } from "react";
import { useRecoilCallback, useRecoilState, useSetRecoilState } from "recoil";
import { activeBoardIdState, boardsState } from "../../atoms/DataAtoms";
import { AnimatePresence, motion } from "framer-motion"; 
import BoardContextMenu from "./BoardContextMenu";
import PlainBtn from "../PlainBtn/PlainBtn";

import "./css/Board.css";
import EditableText from "./EditableText";

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
    const [isEditMode, setIsEditMode] = useState(false);
    // Edit mode state thats changed by context menu edit action

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
            layout
        
            onClick={() => {
                setActiveBoardId(board.id);
            }}

            onMouseOver={(e) => setHoverHiglight(true)}
            onMouseOut={() => setHoverHiglight(false)}
        
            className={ classNames }
        >
            {/* <span className="board-name">{ board.name }</span> */}
            <EditableText
                className="board-name"

                trueState={ board.name }
                onCommit={(inputState) => {
                    setBoards(oldBoards => {
                        return oldBoards.map(oldBoard => {
                            if(oldBoard.id === board.id){
                                return {...board, name: inputState};
                            }
                            return oldBoard;
                        })
                    });
                    setIsEditMode(false);
                }}
                isEditMode={ isEditMode }
            />

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
                        onEdit={() => {
                            setIsEditMode(true);
                            setContextMenuOpen(false);
                        }}
                        onDelete={async () => {
                            if(activeBoardId === board.id){
                                const allBoards = await getAllBoards();
                                
                                if(allBoards.length > 1){
                                    // Set first board in the array as active
                                    const nextActiveId = allBoards.find(b => b.id !== activeBoardId).id;
                                    setActiveBoardId(nextActiveId);
                                }
                                else{
                                    setActiveBoardId(0);
                                }
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