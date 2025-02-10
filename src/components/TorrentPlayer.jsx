import '@/components/torrent-player.css';

const TorrentPlayer = ({ setShowVideoPlayer }) => {

  return (
    <div className="torrent-player-overlay" onClick={(e) => {
      e.stopPropagation();
      setShowVideoPlayer(false);
    }}>
      <div 
        className="torrent-player-container"
        onClick={(e) => e.stopPropagation()} // Prevent click from bubbling
      >
        <div 
          id="streaming-player"
          className="torrent-player-video"
        />
      </div>
    </div>
  );
};

export default TorrentPlayer;