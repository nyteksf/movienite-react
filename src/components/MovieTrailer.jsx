import { useState, useEffect } from "react";

import LoadingOverlay from "@/components/LoadingOverlay";

const MovieTrailer = ({ trailerKey, setLoading, setShowTrailer }) => {
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);

  useEffect(() => {
    setLoading(true); // Ensure loading starts
  }, []);

  const handleIframeLoad = () => {
    setTimeout(() => {
      setLoading(false);
      setIsIframeLoaded(true);
    }, 1000); // Delay for better loading UX
  };

  return (
    <>
      {!isIframeLoaded && <LoadingOverlay isPageLoading={isIframeLoaded} className={"show-loader"} />}
      <div
        className="video-player-container"
        onClick={() => {
          setShowTrailer(false);
        }}
      >
        <iframe
          width="680"
          height="383"
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1`}
          frameBorder="0"
          onLoad={handleIframeLoad}
          allowFullScreen
        />
      </div>
    </>
  );
};

export default MovieTrailer;
