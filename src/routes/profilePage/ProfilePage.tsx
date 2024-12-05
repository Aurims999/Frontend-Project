import { useState, useEffect, useContext } from "react";

import UserPreviewBlock from "../../components/UserPreviewBlock/UserPreviewBlock";
import { IconBlock } from "../../components/other/iconBlock/IconBlock";
import { StatItem } from "../../components/other/iconBlock/StatItem/StatItem";
import { UserContext } from "../../context/UserContext";

import Card from "../../components/Card/Card";

import { ContentGrid } from "../../components/Containers/ContentGrid/ContentGrid";

const ProfilePage = () => {
  const [profileImage, setImage] = useState("/assets/images/defaultImages/artist__default.png");
  const {currentUser, userData} = useContext(UserContext);
  const username = userData.displayName;

  useEffect(() => {
    if (currentUser.photoURL){
      setImage(currentUser.photoURL);
    } 
  }, [currentUser]);

  return (
    <main>
      <UserPreviewBlock userImage={profileImage} userNickname={username}/>
      <ContentGrid amountOfColumns={3}>
        <IconBlock>
          <StatItem statNumber={userData.userStats.amountOfSubscribers} statTitle={"Subscribers"} />
        </IconBlock>
        <IconBlock>
          <StatItem statNumber={userData.favouriteArtists.length} statTitle={"Favourite Artists"} />
        </IconBlock>
        <IconBlock>
          <StatItem statNumber={userData.userStats.hoursListened.toString() + "h"} statTitle={"Listened"} />
        </IconBlock>
      </ContentGrid>

      <ContentGrid title="my playlists" amountOfColumns={5}>
        <Card
          key={1}
          image={"/assets/images/userData/playlist-cover-1.jpg"}
          mainText={"Monday Vibes"}
          subText={"183 tracks (Ariana Grande, Mariah Carey, ...)"}
        />
        <Card
          key={2}
          image={"/assets/images/userData/playlist-cover-2.jpg"}
          mainText={"Soul Playlist"}
          subText={"14 tracks (Aretha Franklin, Stevie Wonder,...)"}
        />
        <Card
          key={3}
          image={"/assets/images/userData/playlist-cover-3.jpg"}
          mainText={"Summer Memories"}
          subText={"58 tracks (Adele, Edmundas Kučinskas, ...)"}
        />
      </ContentGrid>
    </main>
  );
};

export default ProfilePage;
