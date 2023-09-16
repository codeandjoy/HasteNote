import { useRecoilValue } from "recoil";
import { boardsState } from "../../atoms/DataAtoms";
import { AnimatePresence } from "framer-motion";
import Board from "./Board";

import "./css/Boards.css";


const Boards = () => {
    const boards = useRecoilValue(boardsState);

    return (
        <div className="boards">
            <AnimatePresence>
                {
                    boards.map(board => 
                        <Board key={ board.id } board={ board }/>    
                    )
                }
            </AnimatePresence>
        </div>
    );
};


export default Boards;