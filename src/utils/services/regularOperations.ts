export const formatAmountOfLikes = (numberOfLikes) : string => {
    if(numberOfLikes >= 1000){
      return numberOfLikes >= 1000000 ? (Math.round(numberOfLikes / 1000000) + " M") : (Math.round(numberOfLikes / 1000) + " K");
    } else {
      return numberOfLikes;
    }
 }