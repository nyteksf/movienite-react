import { useState, useCallback } from "react";

const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMmRhMzk3NWZjZGE4MjQ4N2NjM2E5N2ZjYmNlMjQ3OSIsIm5iZiI6MTcyMjQ5ODUxNi42MTQsInN1YiI6IjY2YWIzZGQ0YTJlMTRiYWMxNDVhMDUwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HK1bx6Z7Btwub-fyxW6rmlItcr0t3XUrWLONLUZXkEs";

const apiUrls = {
  all: "https://api.themoviedb.org/3/discover/movie?language=en-US&page=",
  latest: "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=",
  popular: "https://api.themoviedb.org/3/movie/popular?language=en-US&page=",
  rated: "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=",
  query: "https://api.themoviedb.org/3/search/movie?query=",
};

const useGetMovies = (filterType, selectedGenre, setIsPageLoading, query) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const headers = {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  };

  const fetchMovies = useCallback(async (page = 1) => {
    setLoading(true);
    setIsPageLoading(true);
    let url;

    try {
      if (query) {
        // QUERY-BASED SEARCH:
        url = `${apiUrls.query}${encodeURIComponent(query)}&page=${page}&language=en-US`;
      } else if (selectedGenre !== "SELECT GENRE" && filterType === "all") {
        // GENRE-BASED SEARCH:
        url = `https://api.themoviedb.org/3/discover/movie?language=en-US&with_genres=${selectedGenre}&page=${page}`;
      } else {
        // "DISCOVER" SEARCH:
        url = `${apiUrls[filterType]}${page}`;
        if (filterType === "all") {
          url += "&sort_by=popularity.desc";
        }
      }

      const response = await fetch(url, { headers });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      setMovies(data.results || []);
    } catch (error) {
      console.error("Failed to fetch movies:", error);
      setMovies([]);
    } finally {
      setLoading(false);
      setIsPageLoading(false);
    }
  }, [filterType, selectedGenre, query, setIsPageLoading]);

  return { movies, loading, fetchMovies };
};

export default useGetMovies;
