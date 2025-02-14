import { X, Users } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { useSearchTrackers } from "@/hooks/useSearchTrackers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import StarRating from "@/components/StarRating";
import MovieTrailer from "@/components/MovieTrailer";
import TorrentPlayer from "@/components/TorrentPlayer";
import LoadingOverlay from "@/components/LoadingOverlay";
import DynamicQualitySlider from "@/components/DynamicQualitySlider";

import "@/pages/watch.css";

const Watch = () => {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const playButtonRef = useRef(null);
  const API_KEY = "f2da3975fcda82487cc3a97fcbce2479";

  // TMDB API STATE
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // UI STATE
  const [showCast, setShowCast] = useState(false);
  const [storedHash, setStoredHash] = useState("");
  const [qualityArr, setQualityArr] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [webtorLoaded, setWebtorLoaded] = useState(false);
  const [torrentSource, setTorrentSource] = useState(null);
  const [isPlayClicked, setIsPlayClicked] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState(null);
  const [uniqueHashesEtc, setUniqueHashesEtc] = useState(null);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [trailerKey, setTrailerKey] = useState(movieData | null);
  const [uniqueQualitySet, setUniqueQualitySet] = useState(null);
  const [isQualitySelected, setIsQualitySelected] = useState(false);
  const [isInitializingPlayer, setIsInitializingPlayer] = useState(false);

  let poster;
  let title;

  const {
    movieData: torrentData,
    isLoading: torrentLoading,
  } = useSearchTrackers(movieData?.imdb_id, movieData?.title);

  // HELPER FUNCTIONS:
  const generateMagnetLink = (hash) => {
    if (!hash || hash.length !== 40) {
      throw new Error("Invalid hash: Must be a 40-character hex string");
    }

    const trackers = [
      "udp://tracker.openbittorrent.com:80",
      "udp://tracker.opentrackr.org:1337/announce",
      "udp://tracker.coppersurfer.tk:6969",
      "udp://tracker.leechers-paradise.org:6969",
      "udp://tracker.internetwarriors.net:1337",
      "udp://exodus.desync.com:6969",
      "wss://tracker.openwebtorrent.com",
      "wss://tracker.btorrent.xyz",
      "wss://tracker.fastcast.nz",
    ];

    const trackerParams = trackers
      .map((tracker) => `tr=${encodeURIComponent(tracker)}`)
      .join("&");

    return `magnet:?xt=urn:btih:${hash}&${trackerParams}`;
  };

  const getTrailer = () => {
    if (!movieData?.videos?.results) return null;
    return movieData.videos.results.find(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    )?.key;
  };

  const getQualities = () => {
    if (!torrentData) return;

    setQualityArr(torrentData.qualities);
    setUniqueQualitySet([
      ...new Set(torrentData.qualities.map((item) => item.quality)),
    ]);

    const uniqueFeatures = torrentData.qualities.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.quality === item.quality)
    );
    setUniqueHashesEtc(uniqueFeatures);
  };

  const handleVideoPlayerClose = () => {
    const playerElement = document.getElementById("streaming-player");
    if (playerElement) {
      while (playerElement.firstChild) {
        playerElement.removeChild(playerElement.firstChild);
      }
    }
    setShowVideoPlayer(false);
    setIsInitializingPlayer(false);
    setSelectedQuality(null);
    setIsQualitySelected(false);
  };

  // EVT HANDLERS
  const handlePlayClick = () => {
    if (!webtorLoaded) {
      console.warn("Webtor has not yet loaded. Retrying...");
      return;
    }
    setShowVideoPlayer(true);
    setTimeout(() => {
      setLoading(true);
    }, 50);
    setTimeout(() => {
      setLoading(false);
    }, 2550);
    setIsInitializingPlayer(true);
  };

  const handleQualitySelect = (quality) => {
    setSelectedQuality(quality);
    setIsQualitySelected(true);
  };

  const handleShowTrailer = () => {
    setLoading(true);
    setShowTrailer(true);
    setTrailerKey(getTrailer());
  };

  const toggleQualitySlider = () => {
    setIsPlayClicked(!isPlayClicked);
    if (!isPlayClicked) {
      setSelectedQuality(null);
    }
  };

  const handleNavigateBack = (e) => {
    e.stopPropagation();

    if (window.history.length > 1) {
      navigate(-1); // TRY TO GO BACK IN HISTORY IF POSSIBLE
    } else {
      navigate("/"); // FALLBACK TO "/" IF IMPOSSIBLE
    }
  };

  // useEffect HOOKS
  useEffect(() => {
    if (!window.webtor) {
      const script = document.createElement("script");
      script.src = "https://cdn.webtor.io/bundle.js";
      script.async = true;
      script.onload = () => {
        setWebtorLoaded(true);
      };
      document.body.appendChild(script);
    } else {
      setWebtorLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!movieId) {
      setError("Invalid movie ID");
      setLoading(false);
      return;
    }

    const fetchMovieData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=credits,videos`
        );
        if (!response.ok) throw new Error("Failed to fetch movie data");
        const data = await response.json();
        setMovieData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [movieId]);

  useEffect(() => {
    if (!torrentData) return;
    getQualities();
  }, [torrentData]);

  useEffect(() => {
    if (
      !isInitializingPlayer ||
      !storedHash ||
      !webtorLoaded ||
      !playButtonRef.current
    ) {
      return;
    }

    setLoading(true);

    const player = window.webtor.push({
      id: "streaming-player",
      magnet: generateMagnetLink(storedHash),
      width: "800px",
      height: "480px",
      lang: "en",
      style: {
        theme: "dark",
        poster: movieData.poster_path
          ? `https://image.tmdb.org/t/p/original${movieData.poster_path}`
          : "",
      },
      title: movieData.title || "Unknown Title",
      features: {
        continue: true,
        chromecast: true,
      },
      on: {
        ready: () => {
          setLoading(false);
          setIsInitializingPlayer(false);
        },
        error: (e) => {
          console.error("Webtor Error: ", e);
          setLoading(false);
          setIsInitializingPlayer(false);
        },
        download: () => {
          setLoading(false);
          setIsInitializingPlayer(false);
        },
        loaded: () => {
          setLoading(false);
          setIsInitializingPlayer(false);
        },
        destroyed: () => {
          setLoading(false);
          setIsInitializingPlayer(false);
        },
      },
    });

    // CLEANUP TIME! OR NEW PLAYER WILL BE HIDDEN BEHIND OLD, DEAD ONE.
    return () => {
      if (player && player.destroy) {
        player.destroy();
      }
    };
  }, [isInitializingPlayer, storedHash, webtorLoaded, movieData]);

  useEffect(() => {
    if (torrentData) {
      setTorrentSource(torrentData.source);
    }
  }, [torrentData]);

  return (
    <div className="watch-movie-page">
      {loading && <LoadingOverlay isPageLoading={loading | !movieData} className={""} torrentSource={torrentSource} />}

      {!movieData ? (
        <div style={{ color: "#F5F5F5" }}>
          Sorry, no movie data is available. Please try again.
        </div>
      ) : (
        <>
          {/* BG IMAGE */}
          <div
            className="watch-movie-page--bg"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movieData.backdrop_path})`,
            }}
          />

          {/* MAIN CONTENT */}
          <div className="watch-movie--container">
            <div className="watch-movie--wrapper">
              {/* MOVIE POSTER */}
              <div className="watch-movie__poster">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
                  alt={movieData.title}
                />
              </div>

              {/* MOVIE INFO */}
              <div className="watch-movie__data">
                <X
                  title="Double click to go back"
                  className="xmark--watch-movie"
                  onClick={handleNavigateBack}
                />

                <div className="watch-movie__data-title">
                  <h1 className="watch-movie__title">{movieData.title}</h1>

                  <ul className="movie-info__list">
                    <li
                      className="movie-info__list-item"
                      title={
                        "Release Date: " +
                        movieData.release_date?.split("-")[1] +
                        "/" +
                        movieData.release_date?.split("-")[2] +
                        "/" +
                        movieData.release_date?.split("-")[0]
                      }
                    >
                      {movieData.release_date?.split("-")[0]}
                    </li>
                    <li className="movie-info__list-item">
                      {movieData.runtime} min
                    </li>
                    <li
                      className="movie-info__list-item"
                      title={movieData.res?.map((g) => g.name).join(" / ")}
                    >
                      {movieData.genres?.map((g) => g.name).join(" / ")}
                    </li>
                    <li className="movie-info__list-item">
                      <div className="watch-movie__data--info">
                        <div
                          onClick={() => setShowCast(!showCast)}
                          title="Click to display cast"
                          className="cast-toggle"
                        >
                          <Users />
                        </div>
                      </div>
                    </li>
                    <li className="movie-info__list-item">
                      <span className="imdb-page-link">
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg"
                          alt="IMDb"
                          className="imdb_icon"
                          title="Visit IMDB page"
                          onClick={() =>
                            window.open(
                              `https://imdb.com/title/${movieData.imdb_id}/`,
                              "_blank"
                            )
                          }
                        />
                      </span>
                    </li>
                    <li
                      className="movie-info__list-item"
                      title={movieData.vote_count + " total votes"}
                    >
                      <StarRating
                        ratingOutOf10={movieData.vote_average?.toFixed(1)}
                      />
                    </li>
                  </ul>
                </div>

                {/* CAST INFO */}
                <div
                  className={`cast-info--wrapper ${
                    showCast ? "display-cast" : ""
                  }`}
                >
                  <X
                    title="Click to hide"
                    className="cast-info--xmark-close"
                    onClick={() => setShowCast(false)}
                  />
                  {movieData.credits?.cast?.slice(0, 10).map((actor, index) => (
                    <div key={index} className="cast-member">
                      <span className="cast--name">{actor.name}</span>
                      <span className="cast--character">
                        {" "}
                        as {actor.character}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="watch-movie__data--para">{movieData.overview}</p>

                <div className="watch-movie__data--btns">
                  <button
                    onClick={handleShowTrailer}
                    className="btn__movie btn__watch-trailer"
                  >
                    Watch Trailer
                  </button>
                  <div className="quality-controls">
                    <DynamicQualitySlider
                      isPlayClicked={isPlayClicked}
                      uniqueHashesEtc={uniqueHashesEtc}
                      onQualitySelect={(quality, hash) => {
                        handleQualitySelect(quality);
                        setStoredHash(hash);
                      }}
                      selectedQuality={selectedQuality}
                    />
                    <button
                      ref={playButtonRef}
                      disabled={!webtorLoaded | !torrentData | torrentLoading}
                      onClick={
                        isQualitySelected
                          ? handlePlayClick
                          : toggleQualitySlider
                      }
                      className={`btn__movie btn__movie--play ${
                        isQualitySelected ? "ready-to-play" : ""
                      }`}
                    >
                      {!isPlayClicked ? (
                        <FontAwesomeIcon icon={faPlay} />
                      ) : isQualitySelected ? (
                        `Click To Stream Movie: ${selectedQuality}`
                      ) : (
                        "Select A Movie Quality"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {isQualitySelected && storedHash && showVideoPlayer && (
            <TorrentPlayer setShowVideoPlayer={handleVideoPlayerClose} movieData={torrentData}/>
          )}

          {showTrailer && trailerKey && (
            <MovieTrailer
              trailerKey={trailerKey}
              setLoading={setLoading}
              setShowTrailer={setShowTrailer}
              onClose={() => setShowTrailer(false)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Watch;
