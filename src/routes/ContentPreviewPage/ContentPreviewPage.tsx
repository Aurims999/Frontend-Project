import { useState, useEffect, useContext } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import { SpotifyDataContext } from "../../context/SpotifyDataContext";

import { ContentPreview } from "../../components/ContentPreview/ContentPreview";
import { ContentGrid } from "../../components/Containers/ContentGrid/ContentGrid";

import Card from "../../components/Card/Card";

import { spotify_dataTypes } from "../../utils/commonConstants.js";
import { Track } from "../../types/SpotifyAPI/Track";

export const ContentPreviewPage = () => {
  const { dataID } = useParams();
  const [searchParameters] = useSearchParams();
  const contentType = searchParameters.get("contentType");
  const [data, setData] = useState(null);
  const [otherSongs, setOtherSongs] = useState([]);
  const {getTrack, getArtist} = useContext(SpotifyDataContext);


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (dataID){
          let data = null
          switch (contentType) {
            case spotify_dataTypes.TRACK:
              data = await getTrack(dataID);
              break;
            case spotify_dataTypes.ARTIST:
              data = await getArtist(dataID);
              break;
            default:
              console.error("INVALID CONTENT TYPE");
          }
          
          if (data === null) {
            console.log("Non-existing artist ID");
          }
          setData(data);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
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
              data = {track}
            />
          );
        })}
      </ContentGrid>
        }
    </main>
  );
};
