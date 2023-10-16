import Board from "./Board";

import "./css/Boards.css";


const Boards = ({ boards }) => {
    return (
        <div className="boards">
            {
                boards?.map(board => 
                    <Board key={ board.id } board={ board }/>    
                )
            }
        </div>
    );
};


export default Boards;