import { useState, useEffect, useContext } from "react";
import { addArtistToFavourites } from "../../../utils/firebase/firebase.utils.js";
import { UserContext } from "../../../context/UserContext.js";

import "./likeButton.css";

export const LikeButton = ({songId, amountOfLikes = 0}) => {
  const [likes, setLikes] = useState("0");
  const [isLiked, setLiked] = useState(false);
  const {userData} = useContext(UserContext);

  useEffect(() => {
    setLiked(userData.favouriteArtists.includes(songId));
  })

  useEffect(() => {
    if(amountOfLikes >= 1000){
      setLikes(amountOfLikes >= 1000000 ? (Math.round(amountOfLikes / 1000000) + " M") : (Math.round(amountOfLikes / 1000) + " K"));
    } else {
      setLikes(amountOfLikes.toString());
    }
  }, [amountOfLikes]);

  const handlePress = async () => {
    await addArtistToFavourites(songId);
    setLiked(!isLiked);
  } 

  return (
    <div className="likeButton">
      <img
        src={isLiked ? "/assets/icons/heart-full.png" : "/assets/icons/heart-empty.png"}
        alt="Heart icon to add artist to liked artists list"
        className="icon"
        onClick={() => handlePress()}
      />
      <p>{likes}</p>
    </div>
  );
};
