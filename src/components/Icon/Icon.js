import './css/Icon.css';


const Icon = ({ type }) => {
    const classes = "icon icon-"+type;

    return (
        <div className={ classes }></div>
    )
};


export default Icon;