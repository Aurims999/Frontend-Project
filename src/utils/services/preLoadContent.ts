import { localStorageData } from "./../commonConstants.js";

const loadImageToLocalStorage = async (title, url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const reader = new FileReader();

    reader.onload = () => {
        localStorage.setItem(title, reader.result);
    };

    reader.readAsDataURL(blob);
};

export const preloadData = () => {
    loadImageToLocalStorage(localStorageData.icons.NO_INTERNET, localStorageData.data.PATH_NO_INTERNET_ICON);
}
