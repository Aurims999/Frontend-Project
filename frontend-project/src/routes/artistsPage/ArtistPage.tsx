import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { ContentPreview } from "../../components/ContentPreview/ContentPreview";

export const ArtistPage = ({}) => {
  const { artistID } = useParams();

  return (
    <main>
      <ContentPreview />
      <section className="contentBlock">
        <div className="sideLayout">
          <img
            src="../../assets/images/artists/adele.jpg"
            alt="An image of Adele"
          />
          <div className="description">
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
          </div>
        </div>
      </section>
    </main>
  );
};

/*     <section className="contentBlock">
        <div className="header">
          <h1>Albums</h1>
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
              src="../../assets/images/albums/Adele 30.jpg"
              alt="Image of adele's album '30'"
            />
            <h2>30</h2>
            <p>Release date: 2021</p>
          </div>
          <div className="card">
            <img
              src="../../assets/images/albums/Adele 25.jpg"
              alt="Image of adele's album '25'"
            />
            <h2>25</h2>
            <p>Release date: 2015</p>
          </div>
          <div className="card">
            <img
              src="../../assets/images/albums/Adele 21.jpg"
              alt="Image of adele's album '21'"
            />
            <h2>21</h2>
            <p>Release date: 2011</p>
          </div>
          <div className="card">
            <img
              src="../../assets/images/albums/Adele 19.jpg"
              alt="Image of adele's album '19'"
            />
            <h2>19</h2>
            <p>Release date: 2008</p>
          </div>
        </div>
      </section> */
