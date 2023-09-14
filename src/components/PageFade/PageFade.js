import { AnimatePresence, motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import { pageFadeActive } from "../../atoms/UIAtoms";
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
    const isActive = useRecoilValue(pageFadeActive);
    const clickCallback = useRecoilValue(pageFadeCallback);

    if(isActive){
        document.body.style.overflow = "hidden";
    }
    else{
        document.body.style.overflow = "visible";
    }

    return (
        <AnimatePresence>
            { isActive &&
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