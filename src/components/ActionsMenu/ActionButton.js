import './css/ActionButton.css';


const ActionButton = ({ children }) => {
    return (
        <button className='action-button'>
            { children }
        </button>
    );
};


export default ActionButton;