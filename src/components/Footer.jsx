import { useEffect, useState } from "react";
import { faRss } from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faFacebook,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "@/components/footer.css";

const Footer = () => {
  const [dates, setDates] = useState([]);

  // Render dates dynamically
  useEffect(() => {
    const renderDates = () => {
      const currentDate = new Date();
      const formattedDates = Array.from({ length: 3 }, (_, index) => {
        const date = new Date(currentDate);
        date.setDate(date.getDate() - index);
        return date.toLocaleDateString("en-us", {
          year: "numeric",
          month: "short",
          day: "2-digit",
        });
      });
      setDates(formattedDates);
    };

    renderDates();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <footer id="footer">
      <ul className="footer__list--outer">
        <li className="footer__list--wrapper">
          <ul className="footer__list-1 footer__list">
            <li className="footer__list-item-1 footer__list-item footer__list-item--main">
              <img
                className="footer-logo"
                src="/movienitelogo.png"
                alt="Logo"
              />
            </li>
            <li className="footer__list-item">
              <p className="footer__para">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel
                quibusdam, cum in veritatis non ducimus?
              </p>
            </li>
          </ul>
          <ul className="footer__list-2 footer__list">
            <li className="footer__list-item footer__list-item--main">
              <h2>Useful Links</h2>
            </li>
            <li className="footer__list-item footer__list-item--gen-link">
              Updates
            </li>
            <li className="footer__list-item footer__list-item--gen-link">
              Onion Forum
            </li>
            <li className="footer__list-item footer__list-item--gen-link">
              My Account
            </li>
            <li className="footer__list-item footer__list-item--gen-link">
              My Watch List
            </li>
          </ul>
          <ul className="footer__list-3 footer__list">
            <li className="footer__list-item footer__list-item--main">
              <h2>Latest News</h2>
            </li>
            {dates
              .slice() // Create a copy of the dates array to avoid mutating the original array
              .sort((a, b) => new Date(b) - new Date(a)) // Sort dates in descending order (newest to oldest)
              .map((date, index) => (
                <li
                  key={index}
                  className="footer__list-item footer__list-item--blog"
                >
                  <a className="footer__list-item--blog-link" href="#">
                    Blog Post {dates.length - index}{" "}
                    {/* Reverse the index to start with Blog Post 3 */}
                  </a>
                  <small className="footer__small-text">{date}</small>
                </li>
              ))}
          </ul>
          <ul className="footer__list-4 footer__list">
            <li className="footer__list-item footer__list-item--main">
              <h2>Follow Me</h2>
            </li>
            <p className="footer__para">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero,
              eum excepturi!
            </p>
            <li className="footer__list--4 footer__list-item">
              <ul className="footer__social-links">
                <li className="footer__list-item footer__list-item--social">
                  <div className="footer__social-link footer__social-link--facebook">
                    <FontAwesomeIcon icon={faFacebook} />
                  </div>
                </li>
                <li className="footer__list-item footer__list-item--social">
                  <div className="footer__social-link footer__social-link--twitter">
                    <FontAwesomeIcon icon={faTwitter} />
                  </div>
                </li>
                <li className="footer__list-item footer__list-item--social">
                  <div className="footer__social-link footer__social-link--instagram">
                    <FontAwesomeIcon icon={faInstagram} />
                  </div>
                </li>
                <li className="footer__list-item footer__list-item--social">
                  <div className="footer__social-link footer__social-link--rss">
                    <FontAwesomeIcon icon={faRss} />
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
