import { useEffect, useLayoutEffect } from "react";

const ScrollToTop = () => {
  function ScrollToTop() {
    // Use both useLayoutEffect and useEffect for better coverage
    useLayoutEffect(() => {
      const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: "instant", // Use 'instant' instead of smooth for immediate effect
        });
      };

      // Attempt 1: Immediate execution
      scrollToTop();

      // Attempt 2: After a short delay
      const timeoutId = setTimeout(scrollToTop, 10);

      // Attempt 3: Listen for load event
      window.addEventListener("load", scrollToTop);

      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener("load", scrollToTop);
      };
    }, []);

    // Backup useEffect
    useEffect(() => {
      const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      };

      // Additional attempt after component mount
      scrollToTop();
    }, []);

    return null; // This component doesn't render anything
  }
};

export default ScrollToTop;
