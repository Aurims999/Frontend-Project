import { GuestPage_Header } from "./header/GuestPage_Header";
import { SplitScreen } from "../../components/Containers/SplitScreen/SplitScreen";
import Button from "../../components/other/Button/Button";

import "./guestPage.css";

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
            <Button>Try out now!</Button>
          </div>
          <img
            src="/assets/images/stockImages/human1.png"
            style={{
              position: "absolute",
              bottom: "-20vh",
              right: "-100px",
              height: "100vh",

              transform: "scaleX(-1)",
            }}
            alt=""
          />
        </SplitScreen>
      </main>
    </div>
  );
};
