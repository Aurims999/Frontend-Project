import "./submitButton.css";

export const SubmitButton = ({title = "Submit"}) => {
    return <button className="defaultButton submitButton">{title}</button>;
}