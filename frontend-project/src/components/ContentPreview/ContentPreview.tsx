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
          <ContentList>
            <h1 style={{ fontSize: "5rem", marginRight: "2rem" }}>
              Artist Name
            </h1>
            <LikeButton />
          </ContentList>
          <p style={{ fontSize: "1.25rem" }}>Liked since: 20XX/XX/XX</p>
        </div>
        <ContentList title="Genres:">
          <ContentBlock>
            <img
              src="../../assets/icons/pop.png"
              alt="Heart icon to add artist to liked artists list"
              className="icon"
            />
            <p>Example Genre 1</p>
          </ContentBlock>
          <ContentBlock>
            <img
              src="../../assets/icons/soul.png"
              alt="Heart icon to add artist to liked artists list"
              className="icon"
            />
            <p>Example Genre 2</p>
          </ContentBlock>
        </ContentList>
      </div>
    </section>
  );
};
