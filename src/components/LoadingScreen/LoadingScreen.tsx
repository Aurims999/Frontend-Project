import "./loadingScreen.css";

export const LoadingScreen = () => {
  return (
    <div className="loadingScreen">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="150" height="150">
        <circle fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="9" r="15" cx="40" cy="65">
          <animate attributeName="cy" calcMode="spline" dur="2s" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4s"></animate>
        </circle>
        <circle fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="9" r="15" cx="100" cy="65">
          <animate attributeName="cy" calcMode="spline" dur="2s" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2s"></animate>
        </circle>
        <circle fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="9" r="15" cx="160" cy="65">
          <animate attributeName="cy" calcMode="spline" dur="2s" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0s"></animate>
        </circle>
      </svg>
    </div>
  );
};
