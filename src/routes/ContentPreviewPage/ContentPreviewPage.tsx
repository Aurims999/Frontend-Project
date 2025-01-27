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
      const data = await getDetailedData(dataID!, contentType!);
      setData(data);
    }

    retrieveData();
  }, [dataID]);

  useEffect(() => {
    if (data == null) return;
    const getTracks = async (trackIds) => {
      const tracks = await Promise.all(
        trackIds.map(trackId => getDetailedData(trackId, SpotifyDataType.TRACK))
      );
      return tracks;
    }

    const fetchRelatedContent = async () => {
      let relatedContent : object[] = [];

      if(contentType === SpotifyDataType.ARTIST) {
        const tracks = await getTracks(data.tracks)
        relatedContent.push({artist: data, tracks});
      } else {
        for(const trackArtist of data.artist){
          const artist = await getDetailedData(trackArtist.id, SpotifyDataType.ARTIST);
          const tracks = await getTracks(artist.tracks);
          relatedContent.push({artist, tracks});
        }
      }
      
      setOtherSongs(relatedContent);
      console.log("DATA: ", relatedContent);
    }

    fetchRelatedContent();
  },
  [data]);

  return (
    <main>
      {data && <ContentPreview data={data} />}
      {otherSongs && 
       otherSongs.map((entry) => (
        <ContentGrid title={`Other songs by ${entry.artist.name}`} key={entry.artist.id}>
          {entry.tracks.slice(0, contentType === SpotifyDataType.ARTIST ? 10 : 5).map((track: Track) => (
            <Card 
              key={track.id} 
              data={track} 
            />
          ))}
        </ContentGrid>
  ))
}
    </main>
  );
};
