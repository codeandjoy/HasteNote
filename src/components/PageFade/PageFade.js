import { AnimatePresence, motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import { pageFadeActiveState } from "../../atoms/UIAtoms";
import { pageFadeCallback } from "../../atoms/UIAtoms";

import "./css/PageFade.css";

const fadeVariants = {
    initial: {
        opacity: 0
    },
    active: {
        opacity: .7
    }
}


const PageFade = () => {
    const pageFadeActive = useRecoilValue(pageFadeActiveState);
    const clickCallback = useRecoilValue(pageFadeCallback);

    if(pageFadeActive){
        document.body.style.overflow = "hidden";
    }
    else{
        document.body.style.overflow = "visible";
    }

    return (
        <AnimatePresence>
            { pageFadeActive &&
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