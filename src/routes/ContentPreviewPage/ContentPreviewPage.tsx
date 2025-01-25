import { useState, useEffect, useContext } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import { SpotifyDataContext } from "../../context/SpotifyDataContext";

import { SpotifyDataType } from "../../types/SpotifyAPI/DataType.js";
import { Track } from "../../types/SpotifyAPI/Track";

import { ContentPreview } from "../../components/ContentPreview/ContentPreview";
import { ContentGrid } from "../../components/Containers/ContentGrid/ContentGrid";
import Card from "../../components/Card/Card";

export const ContentPreviewPage = () => {
  const { dataID } = useParams();
  const [searchParameters] = useSearchParams();
  const contentType = searchParameters.get("contentType");
  
  const [data, setData] = useState(null);
  const [otherSongs, setOtherSongs] = useState([]);
  const {getDetailedData} = useContext(SpotifyDataContext);


  useEffect(() => {
    const retrieveData = async () => {
      const data = await getDetailedData(dataID!, contentType);
      setData(data);
    }

    retrieveData();
  }, [dataID]);

  // useEffect(() => {
  //   if (data == null) {
  //     return;
  //   }

  //   const fetchOtherSongs = async () => {
  //     const artist = await getArtist(data.artist[0].id);
  //     const tracks = await Promise.all(
  //       artist.tracks.map(trackId => getTrack(trackId))
  //     );
  //     setOtherSongs(tracks);
  //   }

  //   fetchOtherSongs();
  // },
  // [data]);

  return (
    <main>
      {data && <ContentPreview data={data} />}
      {/* {otherSongs && 
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
        } */}
    </main>
  );
};
