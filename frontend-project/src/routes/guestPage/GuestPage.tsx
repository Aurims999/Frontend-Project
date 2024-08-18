import { GuestPage_Header } from "./header/GuestPage_Header";
import { SplitScreen } from "../../components/Containers/SplitScreen/SplitScreen";
import Button from "../../components/other/Button/Button";

import "./guestPage.css";
import "./../../animations/animations.css";

export const GuestPage = ({}) => {
  return (
    <div className="GuestPageContainer">
      <GuestPage_Header />
      <main>
        <SplitScreen>
          <div className="description">
            <h1>Elevate Your Mood, One Track at a Time</h1>
            <p>
              Stream music that resonates with your mood. Explore VibeLift and
              find the beats that move you
            </p>
            <Button nextPage={"/login"}>Try out now!</Button>
          </div>
          <img
            className="guestPageIllustration"
            src="/assets/images/stockImages/human1.png"
            alt=""
          />
        </SplitScreen>
      </main>
    </div>
  );
};
