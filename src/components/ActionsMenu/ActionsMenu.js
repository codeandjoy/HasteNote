import ActionButton from "./ActionButton";
import Icon from "../Icon/Icon";

import "./css/ActionsMenu.css";


const ActionsMenu = () => {
    return (
        <div className="actions-menu">
            <ActionButton>
                <Icon type="brush"/>
            </ActionButton>
        </div>
    );
};


export default ActionsMenu;