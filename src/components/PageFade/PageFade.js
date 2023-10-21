import { AnimatePresence, motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import { pageFadeCallbackState } from "../../atoms/UIAtoms";

import "./css/PageFade.css";
import { useSwipeable } from "react-swipeable";

const fadeVariants = {
    initial: {
        opacity: 0
    },
    active: {
        opacity: .7
    }
}


const PageFade = ({ active, swipeHandlers }) => {
    const clickCallback = useRecoilValue(pageFadeCallbackState);

    const swipe = useSwipeable({ ...swipeHandlers });

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

                    {...swipe}
                >
                </motion.div>
            }
        </AnimatePresence>
    );
};


export default PageFade;