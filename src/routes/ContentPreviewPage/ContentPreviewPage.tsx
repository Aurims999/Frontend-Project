import { useState, useEffect, useContext } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import { SpotifyDataContext } from "../../context/SpotifyDataContext";

import { ContentPreview } from "../../components/ContentPreview/ContentPreview";
import { ContentGrid } from "../../components/Containers/ContentGrid/ContentGrid";
import Card from "../../components/Card/Card";
import { Track } from "../../types/SpotifyAPI/Track";

export const ContentPreviewPage = () => {
  const { dataID } = useParams();
  const [searchParameters] = useSearchParams();
  const contentType = searchParameters.get("contentType");
  const [data, setData] = useState(null);
  const [otherSongs, setOtherSongs] = useState([]);
  const {getTrack, getArtist} = useContext(SpotifyDataContext);


  useEffect(() => {
    const fetchTrack = async () => {
      try {
        if (dataID){
          const track = await getTrack(dataID);
          if (track === null) {
            console.log("Non-existing artist ID");
          }
          setData(track);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchTrack();
  }, [dataID]);

  useEffect(() => {
    if (data == null) {
      return;
    }

    const fetchOtherSongs = async () => {
      const artist = await getArtist(data.artist[0].id);
      const tracks = await Promise.all(
        artist.tracks.map(trackId => getTrack(trackId))
      );
      setOtherSongs(tracks);
    }

    fetchOtherSongs();
  },
  [data]);

  return (
    <main>
      {data && <ContentPreview data={data} />}
      {otherSongs && 
      <ContentGrid title="Other songs by the artist">
          {otherSongs.slice(0,5).map((track : Track) => {
          return (
            <Card
              key={track.id}
              id={track.id}
              image={track.image}
              link={track.href}
              mainText={track.name}
              subText={track.description}
              altText={`Image of song ${track.name}`}
            />
          );
        })}
      </ContentGrid>
        }
    </main>
  );
};
