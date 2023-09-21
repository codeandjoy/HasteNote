import { AnimatePresence, motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import { pageFadeCallbackState } from "../../atoms/UIAtoms";

import "./css/PageFade.css";

const fadeVariants = {
    initial: {
        opacity: 0
    },
    active: {
        opacity: .7
    }
}


const PageFade = ({ active }) => {
    const clickCallback = useRecoilValue(pageFadeCallbackState);

    if(active){
        document.body.style.overflow = "hidden";
    }
    else{
        document.body.style.overflow = "visible";
    }

    return (
        <AnimatePresence>
            { active &&
                <motion.div
                    variants={ fadeVariants }
                    initial="initial"
                    animate="active"
                    exit="initial"

                    className="page-fade"

                    onClick={ clickCallback }
                >
                </motion.div>
            }
        </AnimatePresence>
    );
};


export default PageFade;