import { useState, useEffect, useContext } from "react";

import UserPreviewBlock from "../../components/UserPreviewBlock/UserPreviewBlock";
import { ContentGrid } from "../../components/Containers/ContentGrid/ContentGrid";
import Card from "../../components/Card/Card";

import { UserContext } from "../../context/UserContext";
import { SpotifyDataContext } from "../../context/SpotifyDataContext";
import { fetchProfilePageData } from "../../utils/services/spotifyDataRetrieval";

const ProfilePage = () => {
  const [profileImage, setImage] = useState(
    "/assets/images/defaultImages/artist__default.png"
  );
  const [favouriteTracks, setFavouriteTracks] = useState([]);
  const [favouriteArtists, setFavouriteArtists] = useState([]);
  const { currentUser, userData } = useContext(UserContext);
  const { getUserFavouriteTracks, getUserFavouriteArtists } =
    useContext(SpotifyDataContext);
  const username = userData.displayName;

  useEffect(() => {
    fetchProfilePageData(getUserFavouriteTracks, getUserFavouriteArtists).then(
      ({ tracks, artists }) => {
        setFavouriteTracks(tracks);
        setFavouriteArtists(artists);
      }
    );
  }, []);
  useEffect(() => {
    if (currentUser.photoURL) {
      setImage(currentUser.photoURL);
    }
  }, [currentUser]);

  return (
    <main>
      <UserPreviewBlock
        userImage={"/assets/images/defaultImages/artist__default.png"}
        userNickname={username}
      />
      <ContentGrid title="Favourite tracks" amountOfColumns={5}>
        {favouriteTracks?.map((track) => {
          return <Card key={track.id} data={track} />;
        })}
      </ContentGrid>
      <ContentGrid title="Favourite artists" amountOfColumns={5}>
        {favouriteArtists?.map((artist) => {
          return <Card key={artist.id} data={artist} />;
        })}
      </ContentGrid>
    </main>
  );
};

export default ProfilePage;
