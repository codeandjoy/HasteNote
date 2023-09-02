import { AnimatePresence, motion } from "framer-motion";

import "./css/NoteModal.css";



const NoteModal = ({ modalOpen, initialAnimationPosition, initialData }) => {
    console.log("x: "+initialAnimationPosition.x);
    console.log("y: "+initialAnimationPosition.y);
    const modalVariants = {
        initial: {
            opacity: 0,
            top: initialAnimationPosition.y,
            left: initialAnimationPosition.x
        },
        active: {
            opacity: 1,
            top: "50%",
            left: "50%",
            translateX: "-50%",
            translateY: "-50%"
        }
    }
    return (
        <AnimatePresence>
            { modalOpen &&
                <motion.div
                    variants={ modalVariants }
                    initial="initial"
                    animate="active"
                    exit="initial"
                    transition={{ type:"tween" }}

                    className="note-modal"
                >
                    
                </motion.div>
            }
        </AnimatePresence>

    )
};


export default NoteModal;