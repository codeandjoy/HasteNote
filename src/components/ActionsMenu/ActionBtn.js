import { motion } from "framer-motion";
import { actionBtnHover } from "./animationVariants";
import Icon from '../Icon/Icon';

import './css/ActionBtn.css';


const ActionBtn = ({ type, color, variants, className, onClick }) => {
    const classNames = "action-btn" +
        (className?" "+className:"") + 
        " action-btn-" + (color?color:"orange");

    return (
        <motion.button 
            variants={ variants }
            initial="initial"
            animate="menuopen"
            exit="initial"
            whileHover={ actionBtnHover }

            className={ classNames }
            onClick={ onClick }
        >
            <Icon type={ type }/>
        </motion.button>
    );
};


export default ActionBtn;