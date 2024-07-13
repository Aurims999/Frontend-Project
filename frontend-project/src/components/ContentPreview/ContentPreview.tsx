import { ContentList } from "../Containers/ContentList/ContentList";

import { LikeButton } from "../other/LikeButton/LikeButton";
import { ContentBlock } from "../other/ContentBlock/ContentBlock";

import "./contentPreview.css";

export const ContentPreview = ({}) => {
  return (
    <section className="contentPreview">
      <img src="/assets/images/defaultImages/artist__default.png" alt="" />
      <div className="description">
        <div className="description__TopRow">
          <div className="mainInfo">
            <h1>Adele</h1>
            {/* <LikeButton /> */}
          </div>
          <p>Liked since: 2023/06/25</p>
        </div>
        <div className="description__BottomRow">
          <div className="genres">
            <h2 className="headline">Genres:</h2>
            <ContentList>
              <ContentBlock>
                <img
                  src="../../assets/icons/pop.png"
                  alt="Heart icon to add artist to liked artists list"
                  className="icon"
                />
                <p>Pop</p>
              </ContentBlock>
              <ContentBlock>
                <img
                  src="../../assets/icons/soul.png"
                  alt="Heart icon to add artist to liked artists list"
                  className="icon"
                />
                <p>Soul</p>
              </ContentBlock>
            </ContentList>
          </div>
        </div>
      </div>
    </section>
  );
};

/*<div className="description">
          <div className="description__header">
            <div className="mainInfo">
              <h1>Adele</h1>
              <div className="blob">
                <img
                  src="../../assets/icons/heart.png"
                  alt="Heart icon to add artist to liked artists list"
                  className="icon"
                />
                <p>3205215</p>
              </div>
            </div>
            <p>Liked since: 2023/06/25</p>
          </div>
          <div className="genres">
            <h2 className="headline">Genres:</h2>
            <div className="listOfItems">
              <div className="blob">
                <img
                  src="../../assets/icons/pop.png"
                  alt="Heart icon to add artist to liked artists list"
                  className="icon"
                />
                <p>Pop</p>
              </div>
              <div className="blob">
                <img
                  src="../../assets/icons/soul.png"
                  alt="Heart icon to add artist to liked artists list"
                  className="icon"
                />
                <p>Soul</p>
              </div>
            </div>
          </div>
        </div> */
