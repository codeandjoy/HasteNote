import './css/ActionBtn.css';


const ActionBtn = ({ children, color, onClick }) => {
    const classNames = 'action-btn action-btn-'+ (color?color:"orange");

    return (
        <button className={ classNames } onClick={onClick}>
            { children }
        </button>
    );
};


export default ActionBtn;