import { useState, useEffect, useContext } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import { SpotifyDataContext } from "../../context/SpotifyDataContext";

import { SpotifyDataType } from "../../types/SpotifyAPI/DataType.js";
import { Track } from "../../types/SpotifyAPI/Track";

import { ContentPreview } from "../../components/ContentPreview/ContentPreview";
import { ContentGrid } from "../../components/Containers/ContentGrid/ContentGrid";
import Card from "../../components/Card/Card";
import { fetchContentPreviewData } from "../../utils/services/spotifyDataRetrieval.js";

export const ContentPreviewPage = () => {
  const { dataID } = useParams();
  const [searchParameters] = useSearchParams();
  const contentType = searchParameters.get("contentType");
  
  
  const [data, setData] = useState(null);
  const {getDetailedData} = useContext(SpotifyDataContext);

  useEffect(() => {
    fetchContentPreviewData(dataID, contentType, getDetailedData)
    .then((pageContent) => {
      setData(pageContent);
    });
  },[dataID]);

  if (data){
    return (
      <main>
        {data && <ContentPreview data={data.mainContent} />}
        {data.relatedTracks && 
         data.relatedTracks.map((entry) => (
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
  }
};
