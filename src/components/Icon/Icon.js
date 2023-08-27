import PropTypes from 'prop-types';

import './css/Icon.css';


const Icon = ({ type }) => {
    const classes = "icon icon-"+type;

    return (
        <div className={ classes }></div>
    )
};


Icon.propTypes = {
    type: PropTypes.string.isRequired
};

export default Icon;