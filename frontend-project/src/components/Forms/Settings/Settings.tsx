import "./settings.css"

export const Settings = ({title, type = "text", options = []}) => {
    return(
        <div className="personalInfo__usernameField settingsField">
            <h3>{title}</h3>
            {options.length > 0 ? (
                <select name={title}>
                    {options.map(value => {
                        return <option className="settingsOption" value={value}>{value}</option>;
                    })}
                </select>
            ) : (
                <input type={type}/>
            )}
        </div>
    );
}