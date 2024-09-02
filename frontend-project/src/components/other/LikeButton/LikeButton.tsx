import { useState, useEffect } from "react";

import "./likeButton.css";

export const LikeButton = ({amountOfLikes = 0}) => {
  const [likes, setLikes] = useState("0");

  useEffect(() => {
    if(amountOfLikes >= 1000){
      setLikes(amountOfLikes >= 1000000 ? (Math.round(amountOfLikes / 1000000) + " M") : (Math.round(amountOfLikes / 1000) + " K"));
    } else {
      setLikes(amountOfLikes.toString());
    }
  }, [amountOfLikes]);

  return (
    <div className="likeButton">
      <img
        src="/assets/icons/heart.png"
        alt="Heart icon to add artist to liked artists list"
        className="icon"
      />
      <p>{likes}</p>
    </div>
  );
};
