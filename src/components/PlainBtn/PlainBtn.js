import Icon from "../Icon/Icon";

import "./css/PlainBtn.css";


const PlainBtn = ({ type, onClick }) => {
    return (
        <button onClick={ onClick } className="plain-btn">
            <Icon type={ type }/>
        </button>
    );
};


export default PlainBtn;