import Icon from "../Icon/Icon";

import "./css/DataPlaceholder.css";


const DataPlaceholder = ({ type }) => {
    return (
        <div className="data-placeholder ">
            <div className="data-placeholder--logo-container">
                <Icon type="logo-dark-grey"/>
            </div>

            <span className="data-placeholder--text">Create your first {type==="boards" ? "board": "note"}</span>
            
            <div className={"direction-arrow " + type + "-direction-arrow"}>
                <Icon type="arrow-orange"/>
            </div>
        </div>
    );
};


export default DataPlaceholder;