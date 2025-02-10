import "./loading-overlay.css";

const LoadingOverlay = ({ isPageLoading, className = "" }) => {
  return (
    <div className={`loading-overlay ${className} ${isPageLoading ? "show-loading-overlay" : ""}`}>
      <div className="pseudo-button--outer">
        <div className="pseudo-button">
          <figure>
            <img className="play-icon" src="/play-icon.png" alt="Play icon" />
          </figure>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
