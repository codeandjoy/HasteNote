import './css/Icon.css';


const Icon = ({ type }) => {
    const classes = "icon icon-"+type;

    console.log(classes);

    return (
        <div className={ classes }></div>
    )
};


export default Icon;