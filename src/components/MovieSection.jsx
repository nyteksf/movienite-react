import { useNavigate } from "react-router-dom";

import { useFetchMovies } from "@/hooks/useFetchMovies";

import MovieCard from "@/components/MovieCard";
import { Button } from "@/components/ui/button";
import LoadingOverlay from "@/components/LoadingOverlay";

import { cn } from "@/lib/utils";

import "@/components/movie-section.css";

const MovieSection = ({
  sectionTitle = "Default Title",
  variant = "outer-container",
  linkName,
  isPageLoading,
  setIsPageLoading,
}) => {
  const navigate = useNavigate();
  const { movies, isLoading, error } = useFetchMovies(linkName, setIsPageLoading);

  return (
    <section
      id={linkName || null}
      className={cn(
        "movieSection",
        variant === "middle-container" && "bg-gradient"
      )}
    >
      <div className="movieSection__content">
        <div className="movie-section__header-container">
          <h2
            className={cn(
              "all__title",
              variant === "middle-container" && "offwhite-text"
            )}
          >
            {sectionTitle || "Error loading section title"}
          </h2>
          <Button
            type="submit"
            className="header__button"
            disabled={isPageLoading}
            onClick={() => {
              navigate(`/discover/${linkName}`);
            }}
          >
            View All <span className="double-chevron-right">»</span>
          </Button>
        </div>
        <div className="movies-render-box">{error ? ( <p>Error loading movies: {error}</p> ) : isLoading ? (
            <LoadingOverlay isPageLoading={isLoading} />
          ) : (
            movies.map((movie) => <MovieCard key={movie.id} movie={movie} variant="home" />)
          )}
        </div>
      </div>
    </section>
  );
};

export default MovieSection;
