import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ContextMenuBtn from "./ContextMenuBtn";

import "./css/BoardContextMenu.css";


const BoardContextMenu = ({ onClickOutside, onEdit, onDelete }) => {
    const ref = useRef(null);

    // ? refactor -
    // useClickOutside(<ref>, <function>)
    useEffect(() => {
        const handleClickOutside = (e) => {
            if(ref.current && !ref.current.contains(e.target)){ onClickOutside(); }
        }

        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        }
    }, [onClickOutside]);

    return (
        <motion.div
            ref={ ref }
            
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