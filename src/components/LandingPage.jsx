import { useEffect } from "react";

import "@/components/LandingPage.css";

const LandingPage = () => {
  useEffect(() => {
    const images = ["/slider1.jpg", "/slider2.jpg", "/slider3.jpg"];

    let currentIndex = 0;

    function changeBackground() {
      const landingPage = document.getElementById("landing-page");
      let targetRadioBtn = "";

      // REMOVE ALL ACTIVE STATES FROM FAUX RADIO BTNS
    /*
      document
        .querySelectorAll(".radio__btn")
        .forEach((btn) => btn.classList.remove("radio__btn--selected"));
    */

      // RESET LOOP ON 3
      if (currentIndex === 3) {
        currentIndex = 0;
      }
      /*
      targetRadioBtn = `.radio__btn--${currentIndex + 1}`;

      document.querySelector(`${targetRadioBtn}`).classList +=
        " radio__btn--selected";
      searchTitle[0].classList.remove("search__title--show");
      */

      // CHANGE SEARCH TITLE AND SELECT CORRESPONDING FAUX RADIO BTN
      /*
      switch (currentIndex) {
        case 0:
          searchTitle[0].innerHTML = "START STREAMING NOW";
          break;
        case 1:
          searchTitle[0].innerHTML = "ULTRA HD QUALITY";
          break;
        case 2:
          searchTitle[0].innerHTML = "THE LATEST MOVIES";
          break;
      }
      // REANIMATE SEARCH TITLE ON innerHTML REFRESH
      setTimeout(() => {
        searchTitle[0].classList.add("search__title--show");
      }, 2000);
      */
      landingPage.style.backgroundImage = `url(${images[currentIndex]})`;
      currentIndex += 1;
    }

    // CHANGE LANDING PAGE BACKGROUND EVERY 30 SECS
    setInterval(changeBackground, 30000);

    // INITIAL CALL
    changeBackground();
  }, []);

  return (
    <section id="landing-page">
        Home
    </section>
  );
};

export default LandingPage;
