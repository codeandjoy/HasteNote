import { useRecoilValue } from "recoil";
import { boardsState } from "../../atoms/DataAtoms";
import Board from "./Board";

import "./css/Boards.css";


const Boards = () => {
    const boards = useRecoilValue(boardsState);

    return (
        <div className="boards">
            {
                boards.map(board => 
                    <Board key={ board.id } board={ board }/>    
                )
            }
        </div>
    );
};


export default Boards;