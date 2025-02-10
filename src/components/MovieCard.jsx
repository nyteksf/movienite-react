import { useNavigate } from "react-router-dom";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import StarRating from "@/components/StarRating";

import { FormatDate } from "@/utils/FormatDate.jsx";

const MovieCard = ({ movie, variant = "viewall" }) => {
  const navigate = useNavigate();

  // NAVIGATE USER TO RELEVANT VIEW MOVIE PAGE onClick()
  const handleNavigation = (movieId) => {
    navigate(`/watch/${movieId}`);
  };

  return (
    <div
      key={movie.id}
      className={variant === "home" ? "movie-wrapper--home" : "movie-wrapper--view-all" }
      onClick={() => handleNavigation(movie.id)}
    >
      <div className="movie">
        <img
          className="movie__img"
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w342/${movie.poster_path}`
              : "/image-unavailable.jpg"
          }
          alt={movie.title}
        />
        <div className="movie--wrapper-bg"></div>
        <div className="movie__description">
          <div className="movie__rating--wrapper">
            <div className="movie__rating--stars">
              <StarRating ratingOutOf10={movie.vote_average} />
            </div>
            <p className="movie__rating--score">
              {Math.round((movie.vote_average / 2) * 2) / 2}/5
            </p>
          </div>
          <div className="movie__play-btn--wrapper">
            <div
              className="movie__play-btn"
              onClick={() => handleNavigation(movie.id)}
              style={{ cursor: "pointer" }}
            >
              <FontAwesomeIcon icon={faPlay} aria-hidden="true" />
            </div>
          </div>
          <div className="movie__title-and-date">
            <h5 className="movie-title">{movie.title}</h5>
            <p className="movie__release-date">
              <FormatDate date={movie.release_date} />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
