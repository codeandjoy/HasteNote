import "./css/Tag.css";


const Tag = ({ tag }) => {
    return (
        <div className="tag txt-faded-white">
            <span>#{tag}</span>
        </div>
    );
};


export default Tag;