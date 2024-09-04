import { RegularContainer } from "../../components/Containers/RegularContainer/RegularContainer";
import { Settings } from "../../components/Forms/Settings/Settings";

export const ProfileInfo = () => {
    return(
        <div className="settings__personalInfo">
            <RegularContainer>
                <h2>Personal Information Settings</h2>
                <Settings title={"Username"}></Settings>
                <Settings title={"New Password"}></Settings>
                <Settings title={"Email"} type="email"></Settings>
                <Settings title={"Birthday"} type="date"></Settings>
                <div className="personalInfo__image">
                </div>
                <div className="personalInfo__nickname"></div>
                <div className="personalInfo__IDK"></div>
            </RegularContainer>
        </div>
    );
}