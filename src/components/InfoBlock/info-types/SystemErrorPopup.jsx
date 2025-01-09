import { ScreenOverlay } from "./../../Containers/ScreenOverlay/ScreenOverlay.tsx";
import { InfoBlock } from "./../InfoBlock.tsx";

import Button from "../../other/Button/Button";

export const SystemErrorPopup = () => {
    return (
        <ScreenOverlay>
            <InfoBlock>
                <img src = {"/assets/icons/500Error.png"} alt="" />
                <h1>System Error</h1>
                <p style={{fontSize: "1.25rem"}}>We're working to fix this unexpected error!</p>
                <Button nextPage={"/"}>Go to Home Page</Button>
            </InfoBlock>
        </ScreenOverlay>
    );
}