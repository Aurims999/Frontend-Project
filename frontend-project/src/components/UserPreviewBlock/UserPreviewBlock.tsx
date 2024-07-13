import { useState } from "react";

import "./userPreviewBlock.css";

const UserPreviewBlock = ({}) => {
  const [profileImage, setProfileImage] = useState("");
  const [profileBackground, setBackground] = useState("");
  const [username, setUsername] = useState("User123");

  return (
    <section className="profileHeader">
      <img
        src="/assets/images/userData/person-playing-classical-guitar-at-home@1400x1050.jpg"
        alt="User's profile image"
      />
      <h1>{username}</h1>
    </section>
  );
};

export default UserPreviewBlock;
