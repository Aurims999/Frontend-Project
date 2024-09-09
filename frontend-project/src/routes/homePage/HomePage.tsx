import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

import { useNavigate } from "react-router-dom";

import Card from "../../components/Card/Card";
import { ContentGrid } from "../../components/Containers/ContentGrid/ContentGrid";

const HomePage = ({ artists }) => {
  const {currentUser, userData} = useContext(UserContext);
  const navigate = useNavigate();

  if (currentUser){
    return (
      <main>
        <ContentGrid title="Artists" amountOfColumns={5}>
          {artists.slice(0, 15).map((entry) => {
            return (
              <Card
                key={entry.id}
                id={entry.id}
                image={entry.image}
                link={entry.link}
                mainText={entry.name}
                subText={entry.genres}
                altText={`Image of ${entry.name}`}
              />
            );
          })}
        </ContentGrid>
        <ContentGrid title="My favourite artists" amountOfColumns={5}>
          {userData.favouriteSongs.slice(0, 15).map((entry) => {
            return (
              <Card
                key={entry.id}
                id={entry.id}
                image={entry.image}
                link={entry.link}
                mainText={entry.name}
                subText={entry.genres}
                altText={`Image of ${entry.name}`}
              />
            );
          })}
        </ContentGrid>
      </main>
    );
  } else {
    navigate("/guest");
  }
};

export default HomePage;
