// import "@/styles.css";
import "@/components/Navbar.css";

const Navbar = () => {
  const toggleNavSearch = () => {
    console.log("A");
  };

  const setNavDiscover = () => {
    console.log("B");
  };

  const toggleModal = () => {
    console.log("C");
  };

  const openNavMenu = () => {
    console.log("D");
  };

  const closeNavMenu = () => {
    console.log("E");
  };

  return (
    <header>
      <nav>
        <img
          className="nav__logo"
          src="./movienitelogo.png"
          alt="Navbar logo"
        />
        <div className="xmark--close-nav-search">
          <i
            onClick={toggleNavSearch}
            className="fa-solid fa-xmark xmark--close-nav-search"
          ></i>
        </div>
        <div className="nav__list--container">
          <ul className="nav__list">
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
                href="javascript:void(0);"
                value="all"
                onClick={(event) => {
                  setNavDiscover(event);
                }}
              >
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
            <form action="/viewallmovies.html" method="get">
              <div className="nav__input--wrapper">
                <input
                  className="nav__search--input"
                  type="text"
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
                <i className="fa-solid fa-magnifying-glass"></i>
              </a>
            </li>
            <li className="nav__right--list-item">
              <button className="nav__right--btn" onClick={toggleModal}>
                CONTACT ME
              </button>
            </li>
          </ul>
        </div>
        <button className="btn__menu" onClick={openNavMenu}>
          <i className="fa-solid fa-bars"></i>
        </button>
        <div className="menu__backdrop">
          <button className="btn__menu btn__menu--close" onClick={closeNavMenu}>
            <i className="fa-solid fa-xmark xmark--navmenu-close"></i>
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
              <a className="menu__link" href="./viewallmovies.html?all#dr3am">
                <i className="fa-regular fa-compass"></i> Discover
              </a>
            </li>
            <li className="menu__list-item" onClick={closeNavMenu}>
              <a
                className="btn__contact--link"
                href="#"
                onClick={() => {
                  closeNavMenu();
                  toggleModal();
                }}
              >
                <button className="btn__contact">CONTACT ME</button>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
