import Icon from "../Icon/Icon";

import "./css/PlainBtn.css";


const PlainBtn = ({ type, onClick, className }) => {
    return (
        <button onClick={ onClick } className={ "plain-btn " + (className||"") }>
            <Icon type={ type }/>
        </button>
    );
};


export default PlainBtn;