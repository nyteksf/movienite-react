import { useState, useEffect } from 'react';

const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMmRhMzk3NWZjZGE4MjQ4N2NjM2E5N2ZjYmNlMjQ3OSIsIm5iZiI6MTcyMjU1NjA2Ny43Nzk0NTEsInN1YiI6IjY2YWIzZGQ0YTJlMTRiYWMxNDVhMDUwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TUKSEzd1vTgUVk25RJqZdTbg7spv97zQ6ERRhzbqCrk";

const apiUrls = {
  latest: "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
  popular: "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
  rated: "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
};

export const useFetchMovies = (category, setIsPageLoading) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      if (!category) return;

      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      };

      try {
        const response = await fetch(apiUrls[category], options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMovies(data.results.slice(0, 6));
        setError(null);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
        setTimeout(() => {
          setIsPageLoading?.(false);
        }, 1200);
      }
    };

    setIsLoading(true);
    fetchMovies();
  }, [category, setIsPageLoading]);

  return { movies, isLoading, error };
};