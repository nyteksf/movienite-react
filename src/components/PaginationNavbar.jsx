import useGetMovies from "@/hooks/useGetMovies";

import "./pagination-navbar.css";

const PaginationNavbar = ({ pageNum, setPageNum, loading }) => {
  const handlePageChange = (newPage) => {
    setPageNum(newPage);
  };

  const handleNext = (event) => {
    event.preventDefault();
    handlePageChange(pageNum + 1);
  };

  const handlePrev = (event) => {
    event.preventDefault();
    if (pageNum > 1) {
      handlePageChange(pageNum - 1);
    }
  };

  return (
    <nav className="pagination__nav">
      <ul className="pagination-menu">
        <li>
          <button
            className="pagination-btn prev"
            onClick={handlePrev}
            disabled={pageNum < 2 || loading}
          >
            <span className="pagination-btn__icon">«</span>
          </button>
        </li>
        <li>
          <button
            className="pagination-btn next"
            onClick={handleNext}
            disabled={loading}
          >
            <span className="pagination-btn__icon">»</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default PaginationNavbar;
