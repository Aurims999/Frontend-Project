import Card from "../../components/Card/Card";
import { ContentGrid } from "../../components/Containers/ContentGrid/ContentGrid";

const HomePage = ({ artists }) => {
  return (
    <main>
      <ContentGrid title="my favourite artists" amountOfColumns={5}>
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
    </main>
  );
};

export default HomePage;
