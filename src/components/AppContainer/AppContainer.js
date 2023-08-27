import "./css/AppContainer.css";


const AppConatiner = ({ children }) => {
    return (
        <div className="app-container">
            { children }
        </div>
    )
};


export default AppConatiner;