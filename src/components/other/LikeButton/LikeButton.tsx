import { useState, useEffect, useContext } from "react";
import { addToFavourites, removeFromFavourites } from "../../../utils/firebase/firebase.utils.js";
import { UserContext } from "../../../context/UserContext.js";
import { useSearchParams } from "react-router-dom";

import "./likeButton.css";
import { SpotifyDataType } from "../../../types/SpotifyAPI/DataType.js";

export const LikeButton = ({entryID, amountOfLikes = 0}) => {
  const [likes, setLikes] = useState(amountOfLikes);
  const [isLiked, setLiked] = useState(false);
  const {userData} = useContext(UserContext);

  const [searchParameters] = useSearchParams();
  const contentType = searchParameters.get("contentType");

  const formatAmountOfLikes = (numberOfLikes) => {
    if(numberOfLikes >= 1000){
      return numberOfLikes >= 1000000 ? (Math.round(numberOfLikes / 1000000) + " M") : (Math.round(numberOfLikes / 1000) + " K");
    } else {
      return numberOfLikes;
    }
  }
  
  useEffect(() => {
    switch(contentType){
      case SpotifyDataType.TRACK:
        setLiked(userData.favouriteSongs.includes(entryID));
        break;
      case SpotifyDataType.ARTIST:
        setLiked(userData.favouriteArtists.includes(entryID));
        break;
    }
    
    setLikes(formatAmountOfLikes(amountOfLikes));
  }, [entryID])

  const handlePress = async () => {
    if (isLiked) {
      setLiked(!isLiked);
      await removeFromFavourites(entryID, contentType);
    } else {
      setLiked(!isLiked);
      await addToFavourites(entryID, contentType);
    }
  } 

  return (
    <div className="likeButton">
      <img
        src={isLiked ? "/assets/icons/heart-full.png" : "/assets/icons/heart-empty.png"}
        alt="Heart icon to add artist to liked artists list"
        className="icon"
        onClick={() => handlePress()}
      />
      {likes != 0 && <p>{likes}</p>}
    </div>
  );
};
