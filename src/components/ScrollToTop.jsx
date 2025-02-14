import { useEffect, useLayoutEffect } from "react";

const ScrollToTop = () => {
  function ScrollToTop() {
    // USE BOTH useLayoutEffect AND useEffect FOR BETTER COVERAGE
    useLayoutEffect(() => {
      const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      };

      // ATTEMPT 1: IMMEDIATE EXECUTION
      scrollToTop();

      // ATTEMPT 2: AFTER SHORT DELAY
      const timeoutId = setTimeout(scrollToTop, 10);

      // ATTEMPT 3: LISTEN FOR LOAD EVENT
      window.addEventListener("load", scrollToTop);

      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener("load", scrollToTop);
      };
    }, []);

    // BACKUP useEffect()
    useEffect(() => {
      const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      };

      // ADD'L ATTEMPT AFTER MOUNT
      scrollToTop();
    }, []);

    return null; // WE ARE NOT RENDERING ANYTHING HERE
  }
};

export default ScrollToTop;
