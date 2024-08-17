import Button from "../../../components/other/Button/Button";

import "./header.css";

export const GuestPage_Header = ({}) => {
  return (
    <header className="guestPage__header">
      <img src="/assets/icons/Logo.svg" alt="" />
      <Button>Login</Button>
    </header>
  );
};
