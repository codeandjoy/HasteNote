import './css/ActionButton.css';


const ActionButton = ({ children, color, onClick }) => {
    const classNames = 'action-button action-button-'+ (color?color:"orange");

    return (
        <button className={ classNames } onClick={onClick}>
            { children }
        </button>
    );
};


export default ActionButton;