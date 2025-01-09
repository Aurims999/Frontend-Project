import { ScreenOverlay } from "../../Containers/ScreenOverlay/ScreenOverlay";
import { InfoBlock } from "../../InfoBlock/InfoBlock";
import { SystemError } from "../../InfoBlock/info-types/SystemErrorPopup.jsx"

export const ErrorScreen = () => {
  return (
    <ScreenOverlay>
      <InfoBlock>
        <SystemError />
      </InfoBlock>
    </ScreenOverlay>
  );
}