import { signInWithGooglePopup } from "../../../utils/firebase/firebase.utils";

import "./googleAuthButton.css";

export const GoogleAuthButton = () => {
  const logGoogleUser = async () => await signInWithGooglePopup();

  return (
    <button
      type="button"
      className="googleAuthentificationButton"
      onClick={logGoogleUser}
    >
      <img
        src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
        alt=""
      />
      <p>Login With Google</p>
    </button>
  );
};
