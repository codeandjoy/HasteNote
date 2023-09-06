import { useEffect, useRef, useState } from "react";
import NoteModal from "../NoteModal/NoteModal";
import { useSetRecoilState } from "recoil";
import { pageFadeActive } from "../../atom";
import { pageFadeCallback } from "../../atom";

import "./css/Note.css";


const Note = ({ note }) => {
    const setPageFadeActive = useSetRecoilState(pageFadeActive);
    const setPageFadeCallback = useSetRecoilState(pageFadeCallback);
    const [editModalOpen, setEditModalOpen] = useState(true);
    setPageFadeActive(true);
    
    const [pos, setPos] = useState({x:0, y:0});
    const noteRef = useRef();
    useEffect(() => {
        setPos({
            // x: noteRef.current.getBoundingClientRect().x,
            // y: noteRef.current.getBoundingClientRect().y
            x: noteRef.current.offsetLeft,
            y: noteRef.current.offsetTop
        })
    }, []);

    return (
        <div ref={ noteRef }
            className="note"
            onClick={() => {
                setEditModalOpen(true);
                setPageFadeActive(true);
                setPageFadeCallback(()=>()=>{
                    setEditModalOpen(false);
                    setPageFadeActive(false);
                });
            }}
        >
            <h3 className="note-title">{ note.title }</h3>
            <div className="note-tags"><span>{ note.tags }</span></div>
            <div className="note-line"></div>
            <div className="note-content">{ note.content }</div>
            
            {/* animate pressence */}
            {/* white overlay */}
            {/* screen fade */}
            {/* ? screen resize support (change x and y) */}
            <NoteModal
                modalOpen={ editModalOpen }
                initialAnimationPosition={ pos }
                initialData={ note }
            />
        </div>
    );
};

export default Note;