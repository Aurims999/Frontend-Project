import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { ContentPreview } from "../../components/ContentPreview/ContentPreview";


export const ContentPreviewPage = () => {
  const { artistID } = useParams();
  const [data, setData] = useState(null);
  // const requestedArtist = ARTISTS.find(artist => artist.id.toString() === artistID);

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

  return (
    <main>
      {data && <ContentPreview data={data} />}
    </main>
  );
};
