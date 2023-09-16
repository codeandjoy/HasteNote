import { useRecoilState } from "recoil";
import { activeBoardIdState } from "../../atoms/DataAtoms";
import { motion } from "framer-motion"; 

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

    const classNames = "board"+(activeBoardId===board.id ? " board-active":"");

    return (
        <motion.div
            variants={ boardVariants }
            initial="initial"
            animate="animate"
            exit="initial"
        
            onClick={() => {
                setActiveBoardId(board.id);
            }}
        
            className={ classNames }
        >
            <span className="board-name">{ board.name }</span>
        </motion.div>
    );
};


export default Board;