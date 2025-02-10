import { useNavigate } from "react-router-dom";

const AllMoviesHeader = ({
  loading,
  filterType,
  setFilterType,
  selectedGenre,
  setSelectedGenre,
}) => {
  const navigate = useNavigate();

  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    setFilterType(selectedFilter);
    if (selectedFilter === "popular") {
      navigate("/discover/popular");
    } 
    else if (selectedFilter === "rated") { 
      navigate("/discover/rated");
    }
    else if (selectedFilter === "latest") { 
      navigate("/discover/latest");
    }
    else if (selectedFilter === "all") {
      navigate("/discover/");
    }
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  return (
    <div className="all-movies-header__container">
      <div className="movies--wrapper">
        <div className="all__header view-all__header filter-page__header">
          <h2 className="all__title view-all__title">Explore Movies</h2>
          <div className="filter-type">
            {filterType === "all" && (
              <select
                className="dropdown--genre"
                name="movie-genre-options"
                onChange={handleGenreChange}
                value={selectedGenre}
                disabled={loading}
              >
                <option value="SELECT GENRE" disabled>
                  SELECT GENRE
                </option>
                <option value="28">Action</option>
                <option value="12">Adventure</option>
                <option value="16">Animation</option>
                <option value="35">Comedy</option>
                <option value="80">Crime</option>
                <option value="99">Documentary</option>
                <option value="18">Drama</option>
                <option value="10751">Family</option>
                <option value="14">Fantasy</option>
                <option value="36">History</option>
                <option value="27">Horror</option>
                <option value="10402">Music</option>
                <option value="9648">Mystery</option>
                <option value="10749">Romance</option>
                <option value="878">SciFi</option>
                <option value="10770">TV Movie</option>
                <option value="53">Thriller</option>
                <option value="10752">War</option>
                <option value="37">Western</option>
              </select>
            )}
            <select
              className="dropdown"
              name="movie-type-options"
              onChange={handleFilterChange}
              value={filterType}
              disabled={loading}
            >
              <option value="all">All</option>
              <option value="latest">Latest</option>
              <option value="popular">Popular</option>
              <option value="rated">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllMoviesHeader;
