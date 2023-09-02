import Icon from '../Icon/Icon';

import './css/ActionBtn.css';


const ActionBtn = ({ type, color, onClick }) => {
    const classNames = 'action-btn action-btn-'+ (color?color:"orange");

    return (
        <button className={ classNames } onClick={ onClick }>
            <Icon type={ type }/>
        </button>
    );
};


export default ActionBtn;