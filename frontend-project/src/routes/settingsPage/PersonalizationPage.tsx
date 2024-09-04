import { RegularContainer } from "../../components/Containers/RegularContainer/RegularContainer";
import { Settings } from "../../components/Forms/Settings/Settings";
import { SubmitButton } from "../../components/Forms/SubmitButton/SubmitButton";


export const PersonalizationPage = () => {
    const themeOptions = ["LIGHT", "DARK", "DEVICE"];

    return (
        <RegularContainer>
            <h2>Profile Personalization</h2>
            <Settings title={"Theme"} type="dropdown" options={themeOptions}/>
            <SubmitButton title="Apply Changes"/>
        </RegularContainer>
    );
}