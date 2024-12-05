import { useState, useEffect } from "react";

import "./userPreviewBlock.css";

const UserPreviewBlock = ({userImage, userNickname}) => {
  const [profileImage, setProfileImage] = useState(userImage);
  const [profileBackground, setBackground] = useState("");
  const [username, setUsername] = useState(userNickname);

  useEffect(() => {
    setProfileImage(userImage);
  }, [userImage]);

  useEffect(() => {
    setUsername(userNickname);
  }, [userNickname])

  return (
    <section className="profileHeader">
      <img
        src={profileImage}
        alt="User's profile image"
      />
      <h1>{username}</h1>
    </section>
  );
};

export default UserPreviewBlock;
