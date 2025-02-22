import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompass } from "@fortawesome/free-solid-svg-icons";

import { Bars, Compass, Search, XMark } from "@/components/Icons";
import { cn } from "@/lib/utils";
import "./navbar.css"; /* CHANGED FROM "@/components/..." */


/* NEXT I NEED TO TRY TO RECOMPILE WHOLE PROJECT W/ ORIGINAL UNENCRYPTED INDEX.HTML, THEN RUN 'NPM RUN BUILD' AGAIN TO SEE IF THAT FIXES ISSUE W/ NOT FINDING navbar.css IN VERCEL (eg: [vite:load-fallback] Could not load /vercel/path0/src/components/navbar.css (imported by src/components/Navbar.jsx): ENOENT: no such file or directory, open '/vercel/path0/src/components/navbar.css'
) */

const Navbar = ({
  variant = "default",
  isModalOpen,
  setIsModalOpen,
  setIsModalAnimating,
}) => {
  const [value, setValue] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchIsOpen, setSearchIsOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const openModal = () => {
    setTimeout(() => {
      setIsModalAnimating(true);
    }, 50);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (value.trim() !== "") {
      if (location.pathname.includes("/discover/search/")) {
        navigate(`/discover/search/${encodeURIComponent(value)}`, {
          replace: true,
        });
      } else {
        navigate(`/discover/search/${encodeURIComponent(value)}`);
      }
      setValue("");
      setSearchIsOpen(false);
    }
  };

  const toggleNavSearch = () => setSearchIsOpen((prev) => !prev);

  const openNavMenu = () => {
    // ToDo: ADD MOBILE NAV
    console.log(1);
  };

  const closeNavMenu = () => {
    // ToDo: ADD MOBILE NAV
    console.log(0);
  };

  return (
    <header>
      <nav
        className={`${isScrolled ? "nav--scroll" : ""} ${
          isModalOpen ? "navbar-hidden" : ""
        }`}
      >
        {variant !== "default" ? (
          <div className="nav-logo-wrapper" onClick={() => navigate("/")}>
            <img
              className={cn(
                "nav__logo",
                variant === "viewallpage" &&
                  isScrolled &&
                  "invertLogoColorLight",
                variant === "viewallpage" &&
                  !isScrolled &&
                  "invertLogoColorDark"
              )}
              src="/movienitelogo.png"
              alt="Navbar logo"
            />
          </div>
        ) : (
          <img
            className={cn(
              "nav__logo cursor-default",
              variant === "viewallpage" && isScrolled && "invertLogoColorLight",
              variant === "viewallpage" && !isScrolled && "invertLogoColorDark"
            )}
            src="/movienitelogo.png"
            alt="Navbar logo"
          />
        )}

        <div className="xmark--close-nav-search">
          <XMark
            onClick={toggleNavSearch}
            className="xmark--close-nav-search"
          />
        </div>

        <div className="nav__list--container">
          <ul
            className={cn(
              "nav__list",
              variant === "viewallpage" && "hide-nav-links"
            )}
          >
            <li className="nav__list--item">
              <a className="nav__link" href="#latest">
                Latest Movies
              </a>
            </li>
            <li className="nav__list--item">
              <a className="nav__link" href="#popular">
                Most Popular
              </a>
            </li>
            <li className="nav__list--item">
              <a className="nav__link" href="#rated">
                Highest Rated
              </a>
            </li>
            <li className="nav__list--item">
              <a
                className="nav__link"
                value="all"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/discover")}
              >
                <FontAwesomeIcon className="discover-icon" icon={faCompass} />
                Discover
              </a>
            </li>
            <li className="nav__list--item">
              <a className="nav__link" href="#">
                Home
              </a>
            </li>
          </ul>
        </div>

        <div className="nav__right">
          <ul className="nav__right--list">
            <form onSubmit={handleSearch}>
              <div className="nav__input--wrapper">
                <input
                  className="nav__search--input"
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  name="query"
                  placeholder="Type and Press Enter To Search"
                />
              </div>
            </form>
            <li className="nav__right--list-item">
              <a
                className="nav__right--link"
                href="#"
                onClick={toggleNavSearch}
              >
                <strong>
                  <Search
                    className={cn(
                      "fa-magnifying-glass",
                      variant === "viewallpage" &&
                        isScrolled &&
                        "makeMagLensLight",
                      variant === "viewallpage" &&
                        !isScrolled &&
                        "makeMagLensDark"
                    )}
                  />
                </strong>
              </a>
            </li>
            <li className="nav__right--list-item">
              <button className="nav__right--btn" onClick={openModal}>
                {isModalOpen ? "THANKS" : "CONTACT ME"}
              </button>
            </li>
          </ul>
        </div>

        <button className="btn__menu" onClick={openNavMenu}>
          <Bars />
        </button>

        <div className="menu__backdrop">
          <button className="btn__menu btn__menu--close" onClick={closeNavMenu}>
            <XMark className="xmark--navmenu-close" />
          </button>
          <ul className="menu__links">
            <li className="menu__list-item" onClick={closeNavMenu}>
              <a className="menu__link" href="#latest">
                Latest Movies
              </a>
            </li>
            <li className="menu__list-item" onClick={closeNavMenu}>
              <a className="menu__link" href="#popular">
                Most Popular
              </a>
            </li>
            <li className="menu__list-item" onClick={closeNavMenu}>
              <a className="menu__link" href="#rated">
                Highest Rated
              </a>
            </li>
            <li className="menu__list-item" onClick={closeNavMenu}>
              <button
                className="menu__link"
                onClick={() => navigate("/discover")}
              >
                <Compass /> Discover
              </button>
            </li>
            <li className="menu__list-item" onClick={closeNavMenu}>
              <a
                className="btn__contact--link"
                href="#"
                onClick={() => {
                  closeNavMenu();
                }}
              >
                <button className="btn__contact">CONTACT ME</button>
              </a>
            </li>
          </ul>
        </div>

        <div
          className={`nav__input--wrapper ${
            searchIsOpen ? "nav__search--open" : ""
          }`}
        >
          <form onSubmit={handleSearch}>
            <input
              className="nav__search--input"
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              name="query"
              placeholder="Type and Press Enter To Search"
            />
          </form>
        </div>

        <button
          onClick={toggleNavSearch}
          className={`xmark--close-nav-search ${
            searchIsOpen ? "nav__search--show-xmark" : ""
          }`}
        >
          <XMark />
        </button>

        {searchIsOpen && (
          <style jsx global>{`
            body {
              @apply nav__search--open;
            }
          `}</style>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
