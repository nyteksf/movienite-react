import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

import useGetMovies from "@/hooks/useGetMovies";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import MovieCard from "@/components/MovieCard";
import ButtonToTop from "@/components/ButtonToTop";
import ScrollToTop from "@/components/ScrollToTop";
import ContactMeModal from "@/components/ContactMeModal";
import LoadingOverlay from "@/components/LoadingOverlay";
import AllMoviesHeader from "@/components/AllMoviesHeader";
import PaginationNavbar from "@/components/PaginationNavbar";

import "@/pages/view-all.css";
import "@/components/button-to-top.css";
import "@/components/all-movies-header.css";

const ViewAll = () => {
  const { category, query } = useParams();

  const location = useLocation();

  console.log("CATEGORY NAME: ", category);
  console.log("QUERY: ", query);

  const [pageNum, setPageNum] = useState(1);
  const [filterType, setFilterType] = useState(category || "all");
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalAnimating, setIsModalAnimating] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("SELECT GENRE");

  const { movies, loading, fetchMovies } = useGetMovies(
    filterType,
    selectedGenre,
    setIsPageLoading,
    query
  );

  useEffect(() => {
    // Reset page number when URL changes
    setPageNum(1);
    // Reset filter type based on new category
    setFilterType(category || "all");
    // Fetch movies with new query
    fetchMovies(1);
  }, [location.pathname, category, query]); // This will trigger on URL changes

  // HANDLE CATEGORY FILTER & GENRE CHANGES
  useEffect(() => {
    fetchMovies(pageNum);
  }, [pageNum, filterType, selectedGenre]);

  // RESET PAGENUM WHEN FILTERS CHANGE
  useEffect(() => {
    setPageNum(1);
  }, [filterType, selectedGenre]);

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };
    // FIRE ONE MO' TIME FOR GOOD LUCK
    scrollToTop();
  }, []);

  return (
    <div className="view-all-page">
      {(isModalOpen || isModalAnimating) && (
        <ContactMeModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          isModalAnimating={isModalAnimating}
          setIsModalAnimating={setIsModalAnimating}
        />
      )}
      <LoadingOverlay isPageLoading={isPageLoading} />
      <ScrollToTop />
      <ButtonToTop />
      <Navbar
        variant="viewallpage"
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setIsModalAnimating={setIsModalAnimating}
      />
      {!isModalOpen && (
        <AllMoviesHeader
          loading={loading}
          filterType={filterType}
          setFilterType={setFilterType}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
        />
      )}
      <div className="content-container">
        {loading && <LoadingOverlay />}
        {!loading && movies.length === 0 && <p>Error: No movies found.</p>}
        <div className="movies-container">
          {!isModalOpen && (
            <>
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </>
          )}
        </div>
      </div>
      {!isModalOpen && (
        <>
          <PaginationNavbar
            pageNum={pageNum}
            setPageNum={setPageNum}
            loading={isPageLoading}
          />
          <Footer />
        </>
      )}
    </div>
  );
};

export default ViewAll;
