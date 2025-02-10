import { useEffect, useRef, useState } from "react";

import { SearchBar } from "@/components/SearchBar";
import RadioButtonsGroup from "@/components/RadioButtonsGroup";

import "@/components/landing-page.css";

const LandingPage = () => {
  const searchTitleRef = useRef(null);
  const landingPageRef = useRef(null);

  const [searchInput, setSearchInput] = useState("");
  const [selectedButton, setSelectedButton] = useState(1);

  const images = ["/slider1.jpg", "/slider2.jpg", "/slider3.jpg"];
  const titles = {
    1: "START STREAMING NOW",
    2: "ULTRA HD RESOLUTION",
    3: "THE LATEST MOVIES",
  };

  const handleRadioSelect = (buttonNumber) => {
    // Update selected button state
    setSelectedButton(buttonNumber);

    // Handle title animation
    if (searchTitleRef.current) {
      searchTitleRef.current.classList.remove("search__title--show");
    }

    // Update background and title with delay
    setTimeout(() => {
      if (landingPageRef.current) {
        landingPageRef.current.style.backgroundImage = `url(${
          images[buttonNumber - 1]
        })`;
      }
      searchTitleRef.current.textContent = titles[buttonNumber];
    }, 650);

    // Show title with animation after delay
    setTimeout(() => {
      if (searchTitleRef.current) {
        searchTitleRef.current.classList.add("search__title--show");
      }
    }, 1000);
  };

  // Auto-transition effect
  useEffect(() => {
    const interval = setInterval(() => {
      // Calculate next button number (1-3)
      const nextButton = selectedButton === 3 ? 1 : selectedButton + 1;
      handleRadioSelect(nextButton);
    }, 30000);

    // CLEANUP INTERVAL ON UNMOUNT
    return () => clearInterval(interval);
  }, [selectedButton]);

  useEffect(() => {
    const landingPage = document.getElementById("landing-page");
    if (landingPage) {
      landingPageRef.current = landingPage;
    }
  }, []);

  return (
    <section id="landing-page">
      <SearchBar searchTitleRef={searchTitleRef} />
      <RadioButtonsGroup
        searchTitleRef={searchTitleRef}
        selectedButton={selectedButton}
        handleRadioSelect={handleRadioSelect}
      />
    </section>
  );
};

export default LandingPage;
