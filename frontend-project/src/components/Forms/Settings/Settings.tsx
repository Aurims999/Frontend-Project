import "./settings.css"

export const Settings = ({title, type = "text"}) => {
    return(
        <div className="personalInfo__usernameField settingsField">
            <h3>{title}</h3>
            <input type={type} />
        </div>
    );
}