import { AnimatePresence, motion } from "framer-motion";
import "./css/PageFade.css";
import { useEffect } from "react";

const fadeVariants = {
    initial: {
        opacity: 0
    },
    active: {
        opacity: .7
    }
}


const PageFade = ({ isActive }) => {
    useEffect(() => {
        if(isActive){
            document.body.style.overflow = "hidden";
        }
        else{
            document.body.style.overflow = "visible";
        }
    }); 

    return (
        <AnimatePresence>
            { isActive &&
                <motion.div
                    variants={ fadeVariants }
                    initial="initial"
                    animate="active"
                    exit="initial"

                    className="page-fade"
                >
                </motion.div>
            }
        </AnimatePresence>
    );
};


export default PageFade;