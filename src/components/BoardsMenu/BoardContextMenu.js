import { motion } from "framer-motion";

import "./css/BoardContextMenu.css";
import ContextMenuBtn from "./ContextMenuBtn";


const BoardContextMenu = ({ onEdit, onDelete }) => {
    return (
        <motion.div
            className="board-context-menu"
            onMouseOver={e => e.stopPropagation()} // Fix hover bug
            onMouseOut={e => e.stopPropagation()} // Fix hover bug
            onClick={e => e.stopPropagation()} // Fix delete bug
        >
            <ContextMenuBtn text="Edit" onClick={ onEdit }/>
            <ContextMenuBtn text="Delete" onClick={ onDelete }/>
        </motion.div>
    );
};


export default BoardContextMenu;