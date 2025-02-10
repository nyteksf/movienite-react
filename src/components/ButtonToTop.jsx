import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";

import "./button-to-top.css";

const ButtonToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const latestSection = document.querySelector("#latest");
      const contentContainer = document.querySelector(".content-container");

      if (!latestSection && !contentContainer) return;

      if (latestSection) {
        // Original logic for #latest section
        const sectionTop = latestSection.getBoundingClientRect().top;
        const viewportHeight = window.innerHeight;
        setIsVisible(sectionTop < viewportHeight * 0.8);
      } else {
        // New logic for content-container - show button after scrolling down a bit
        setIsVisible(window.scrollY > 300); // Show after 300px of scrolling
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <a
      href="#"
      className={`btn--ToTop ${isVisible ? "btn--toTop-opaque" : ""}`}
      onClick={scrollToTop}
    >
      <div>
        <FontAwesomeIcon icon={faAngleUp} />
      </div>
    </a>
  );
};

export default ButtonToTop;
