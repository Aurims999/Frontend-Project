import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { ContentPreview } from "../../components/ContentPreview/ContentPreview";
import { ContentGrid } from "../../components/Containers/ContentGrid/ContentGrid";
import Card from "../../components/Card/Card";

export const ArtistPage = ({}) => {
  const { artistID } = useParams();

  return (
    <main>
      <ContentPreview />
      <ContentGrid title="Albums:">
        <Card
          key={1}
          id={1}
          image={"/assets/images/albums/Adele 30.jpg"}
          mainText={"30"}
          subText={"Release date: 2021"}
          altText={`Image of album 30`}
        />
        <Card
          key={2}
          id={2}
          image={"/assets/images/albums/Adele 25.jpg"}
          mainText={"25"}
          subText={"Release date: 2015"}
          altText={`Image of album 30`}
        />
        <Card
          key={3}
          id={3}
          image={"/assets/images/albums/Adele 21.jpg"}
          mainText={"21"}
          subText={"Release date: 2011"}
          altText={`Image of album 30`}
        />
        <Card
          key={4}
          id={4}
          image={"/assets/images/albums/Adele 19.jpg"}
          mainText={"19"}
          subText={"Release date: 2008"}
          altText={`Image of album 30`}
        />
      </ContentGrid>
    </main>
  );
};
