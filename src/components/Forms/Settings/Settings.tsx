import { updateColorTheme } from "../../../utils/firebase/firebase.utils.js"

import "./settings.css"

export const Settings = ({title, type = "text", options = [], defaultValue}) => {
    const handleSelection = async (event) => {
        await updateColorTheme(event.target.value);
    }

    return(
        <div className="personalInfo__usernameField settingsField">
            <h3>{title}</h3>
            {options.length > 0 ? (
                <select name={title} onChange={handleSelection} value={defaultValue || ""}>
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