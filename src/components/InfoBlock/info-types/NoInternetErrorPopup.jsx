import { ScreenOverlay } from "./../../Containers/ScreenOverlay/ScreenOverlay.tsx";
import { InfoBlock } from "./../InfoBlock.tsx";
import { localStorageData } from "../../../utils/commonConstants.js";

export const NoInternetErrorPopup = () => {
    const popupImage = localStorage.getItem(localStorageData.icons.NO_INTERNET);
    return (
        <ScreenOverlay>
          <InfoBlock>
            <img src = {popupImage} alt="" />
            <h1>No Internet Connection</h1>
            <p style={{fontSize: "1.25rem"}}>Please check your device's internet connection</p>
          </InfoBlock>
        </ScreenOverlay>
    );
}