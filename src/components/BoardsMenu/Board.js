import { useRecoilValue } from "recoil";
import { activeBoardIdState } from "../../atoms/DataAtoms";

import "./css/Board.css";


const Board = ({ board }) => {
    const activeBoardId = useRecoilValue(activeBoardIdState);

    const classNames = "board"+(activeBoardId===board.id ? " board-active":"");

    return (
        <div className={ classNames }>
            <span className="board-name">{ board.name }</span>
        </div>
    );
};


export default Board;