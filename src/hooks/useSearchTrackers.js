import { useState, useEffect, useCallback } from "react";

export const useSearchTrackers = (imdbId, movieTitle) => {
  const [movieData, setMovieData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedQuality, setSelectedQuality] = useState(null);

  const formMagnetLink = useCallback((torrentHash) => {
    return `magnet:?xt=urn:btih:${torrentHash}`;
  }, []);

  const containsTitle = useCallback((str, title) => {
    const normalizeString = (text) => {
      return text
        .replace(/[^a-zA-Z0-9 ]/g, " ")
        .toLowerCase()
        .trim()
        .replace(/\s+/g, " ");
    };

    const normalizedStr = normalizeString(str);
    const normalizedTitle = normalizeString(title);
    const words = normalizedTitle.split(" ").filter((word) => word.length > 0);
    const pattern = new RegExp(
      words.map((word) => `(?=.*\\b${word}\\b)`).join(""),
      "i"
    );

    return pattern.test(normalizedStr);
  }, []);

  const searchYTS = useCallback(async () => {
    try {
      const response = await fetch(
        `https://yts.mx/api/v2/list_movies.json?query_term=${imdbId}`
      );
      const results = await response.json();

      if (results.data.movie_count > 0) {
        const movie = results.data.movies[0];
        const qualities = movie.torrents.map((torrent) => ({
          quality: torrent.quality,
          hash: torrent.hash,
          size: torrent.size,
          magnetLink: formMagnetLink(torrent.hash),
        }));

        setMovieData({
          source: "YTS",
          title: movie.title,
          year: movie.year,
          rating: movie.rating,
          runtime: movie.runtime,
          qualities,
          selectedQuality: qualities[0],
        });
        setSelectedQuality(qualities[0]);
        return true;
      }
      return false;
    } catch (err) {
      console.error("YTS search error:", err);
      return false;
    }
  }, [imdbId, formMagnetLink]);

  const searchPirateBay = useCallback(async () => {
    try {
      const response = await fetch(
        `https://corsproxy.io/?https://apibay.org/q.php?q=${imdbId}`
      );
      const data = await response.json();

      const filteredMovies = data.filter((movie) =>
        containsTitle(movie.name, movieTitle)
      );

      if (filteredMovies.length > 0) {
        // GROUP MOVIES BY QUALITY
        const qualityGroups = filteredMovies.reduce((acc, movie) => {
          const qualityRegex = /\d{3,4}p/i;
          const qualityMatch = movie.name.match(qualityRegex);

          if (qualityMatch) {
            const quality = qualityMatch[0];
            if (!acc[quality]) {
              acc[quality] = movie;
            } else if (
              parseInt(movie.seeders) > parseInt(acc[quality].seeders)
            ) {
              // KEEP TORRENT VERSION WITH MOST SEEDERS FOR EACH QUALITY LEVEL
              acc[quality] = movie;
            }
          }
          return acc;
        }, {});

        const qualities = Object.entries(qualityGroups).map(
          ([quality, movie]) => ({
            quality: quality,
            hash: movie.info_hash,
            size: `${Math.round(movie.size / (1024 * 1024 * 1024))} GB`,
            magnetLink: formMagnetLink(movie.info_hash),
          })
        );

        // SORT QUALITIES FROM HIGHEST TO LOWEST ON SLIDER
        qualities.sort((b, a) => {
          const getPixels = (quality) =>
            parseInt(quality.quality.replace("p", ""));
          return getPixels(b) - getPixels(a);
        });

        setMovieData({
          source: "TPB",
          title: filteredMovies[0].name,
          qualities,
          selectedQuality: qualities[0],
        });
        setSelectedQuality(qualities[0]);
        return true;
      }
      return false;
    } catch (err) {
      console.error("TPB search error:", err);
      throw new Error(
        "Failed to find movie on both YTS and The Pirate Bay. Please try again later."
      );
    }
  }, [imdbId, movieTitle, containsTitle, formMagnetLink]);

  const searchMovie = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const foundOnYTS = await searchYTS();
      if (!foundOnYTS) {
        await searchPirateBay();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [searchYTS, searchPirateBay]);

  useEffect(() => {
    if (imdbId && movieTitle) {
      searchMovie();
    }
  }, [imdbId, movieTitle, searchMovie]);

  const selectQuality = useCallback((quality) => {
    setSelectedQuality(quality);
    setMovieData((prev) => ({
      ...prev,
      selectedQuality: quality,
    }));
  }, []);

  return {
    movieData,
    isLoading,
    error,
    selectedQuality,
    selectQuality,
  };
};
