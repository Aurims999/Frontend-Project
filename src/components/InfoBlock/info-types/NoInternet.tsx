import {localStorageData} from "./../../../utils/commonConstants.js";

export const NoInternet = () => {
    const popupImage = localStorage.getItem(localStorageData.icons.NO_INTERNET);
    return (
        <>
            <img src = {popupImage} alt="" />
            <h1>No Internet Connection</h1>
            <p style={{fontSize: "1.25rem"}}>Please check your device's internet connection</p>
        </>
    );
}