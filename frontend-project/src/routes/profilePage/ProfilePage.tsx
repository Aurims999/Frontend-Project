import UserPreviewBlock from "../../components/UserPreviewBlock/UserPreviewBlock";
import { IconBlock } from "../../components/other/iconBlock/IconBlock";
import { StatItem } from "../../components/other/iconBlock/StatItem/StatItem";

import { ContentGrid } from "../../components/Containers/ContentGrid/ContentGrid";

const ProfilePage = () => {
  return (
    <main>
      <UserPreviewBlock />
      <ContentGrid amountOfColumns={3}>
        <IconBlock>
          <StatItem statNumber={100} statTitle={"Subscribers"} />
        </IconBlock>
        <IconBlock>
          <StatItem statNumber={16} statTitle={"Playlists"} />
        </IconBlock>
        <IconBlock>
          <StatItem statNumber={"356h"} statTitle={"Listened"} />
        </IconBlock>
      </ContentGrid>
      <section className="contentBlock">
        <div className="header">
          <h1 className="headline">My Playlists:</h1>
          <div className="buttons">
            <p>View by:</p>
            <button>
              <img src="../../assets/icons/menu-burger.png" alt="List layout" />
            </button>
            <button>
              <img src="../../assets/icons/grid.png" alt="Grid layout" />
            </button>
          </div>
        </div>
        <div className="grid">
          <div className="card">
            <img
              src="../../assets/images/userData/playlist-cover-1.jpg"
              alt="Example playlist cover image no. 1"
            />
            <h2>Monday Vibes</h2>
            <p>183 tracks (Ariana Grande, Mariah Carey, ...)</p>
          </div>
          <div className="card">
            <img
              src="../../assets/images/userData/playlist-cover-2.jpg"
              alt="Example playlist cover image no. 1"
            />
            <h2>Soul Playlist</h2>
            <p>14 tracks (Aretha Franklin, Stevie Wonder, ...)</p>
          </div>
          <div className="card">
            <img
              src="../../assets/images/userData/playlist-cover-3.jpg"
              alt="Example playlist cover image no. 1"
            />
            <h2>Summer memories</h2>
            <p>58 tracks (Adele, Edmundas Kučinskas, ...)</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProfilePage;
