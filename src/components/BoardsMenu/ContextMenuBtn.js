import "./css/ContextMenuBtn.css";


const ContextMenuBtn = ({ text, onClick }) => {
    return (
        <div
            className="context-menu-btn"
            onClick={ onClick }
        >
            <span className="context-menu-btn--text">{ text }</span>
        </div>
    );
};


export default ContextMenuBtn;