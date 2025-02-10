import { useEffect, useState } from "react";

const WebtorPlayer = ({ magnetURI, onClose }) => {
  useEffect(() => {
    // Add webtor script if it doesn't exist
    if (!document.getElementById("webtor-script")) {
      const script = document.createElement("script");
      script.id = "webtor-script";
      script.src =
        "https://cdn.jsdelivr.net/npm/@webtor/embed-sdk-js/dist/index.min.js";
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        zIndex: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div id="player"></div>
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          background: "white",
          border: "none",
          padding: "10px",
          cursor: "pointer",
        }}
      >
        Close
      </button>
    </div>
  );
};

// Parent component usage example
const MovieList = () => {
  const [showPlayer, setShowPlayer] = useState(false);

  // Create the onClick string that will be directly evaluated
  const createPlayerScript = (hash) => {
    const trackers = [
      "udp://explodie.org:6969",
      "udp://tracker.coppersurfer.tk:6969",
      "udp://tracker.empire-js.us:1337",
      "udp://tracker.leechers-paradise.org:6969",
      "udp://tracker.opentrackr.org:1337",
    ]
      .map((tracker) => `&tr=${tracker}`)
      .join("");

    const magnetLink = `magnet:?xt=urn:btih:${hash}${trackers}`;

    return `
      setShowPlayer(true); 
      window.webtor = window.webtor || []; 
      window.webtor.push({
        id: 'player',
        magnet: '${magnetLink}',
        width: '800px',
        height: '480px',
        lang: 'en',
        controls: true
      });
    `;
  };

  return (
    <div>
      <button
        onClick={(e) => {
          // Using Function constructor to evaluate the string
          new Function("setShowPlayer", createPlayerScript(torrentHash))(
            setShowPlayer
          );
        }}
      >
        Play Movie
      </button>

      {showPlayer && (
        <WebtorPlayer
          magnetURI={torrentHash}
          onClose={() => {
            setShowPlayer(false);
            window.webtor = [];
          }}
        />
      )}
    </div>
  );
};

export default MovieList;
