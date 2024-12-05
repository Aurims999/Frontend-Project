import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { ContentPreview } from "../../components/ContentPreview/ContentPreview";
import { ContentGrid } from "../../components/Containers/ContentGrid/ContentGrid";
import Card from "../../components/Card/Card";

export const ContentPreviewPage = () => {
  const { artistID } = useParams();
  const [data, setData] = useState(null);
  const [otherSongs, setOtherSongs] = useState([]);

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/tracks/${artistID}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const track = await response.json();
        setData(track);
      } catch (error) {
        console.log(error);
      }
    }

    fetchTrack();
  }, [artistID]);

  useEffect(() => {
    if (data == null) {
      return;
    }

    const fetchOtherSongs = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/artists/topTracks/${data.artists[0].id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const otherSongs = await response.json();
        setOtherSongs(otherSongs.tracks);
      } catch (error) {
        console.log(error);
      }
    }

    fetchOtherSongs();
  },
  [data]);

  return (
    <main>
      {data && <ContentPreview data={data} />}
      {otherSongs && 
      <ContentGrid title="Other songs by the artist">
          {otherSongs.slice(0,5).map((entry) => {
          return (
            <Card
              key={entry.id}
              id={entry.id}
              image={entry.album.images[0].url}
              link={entry.external_urls.spotify}
              mainText={entry.name}
              subText={entry.artists[0].name}
              altText={`Image of ${entry.artists[0].name}`}
            />
          );
        })}
      </ContentGrid>
        }
    </main>
  );
};
