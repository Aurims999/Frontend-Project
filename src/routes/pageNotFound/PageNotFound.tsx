import Button from "../../components/other/Button/Button";

import "./pageNotFound.css";
import "./../../animations/animations.css";

export const PageNotFound = ({}) => {
  return (
    <div className="pageNotFoundPage">
      <main className="pageContainer">
        <h1 className="title">404</h1>
        <p className="description">The page that you were looking for was not found</p>
        <Button nextPage={"/"}>Go to Home Page</Button>
      </main>
    </div>
  );
};
