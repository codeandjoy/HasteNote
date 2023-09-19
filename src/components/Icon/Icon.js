import './css/Icon.css';


const Icon = ({ type, className }) => {
    const classNames = "icon icon-"+type+" "+className;

    return (
        <div className={ classNames }></div>
    )
};


export default Icon;