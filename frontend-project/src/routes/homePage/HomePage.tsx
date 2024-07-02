import { useState } from "react";

import ContentBlock from "../../components/ContentBlock/ContentBlock";

const HomePage = ({ artists }) => {
  return (
    <main>
      <ContentBlock
        content={artists.slice(0, 15)}
        contentTitle={"My favourite artist"}
        layout={true}
      />
    </main>
  );
};

export default HomePage;
