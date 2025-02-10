import { useState } from "react";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ButtonToTop from "@/components/ButtonToTop";
import LandingPage from "@/components/LandingPage";
import ScrollToTop from "@/components/ScrollToTop";
import MovieSection from "@/components/MovieSection";
import ContactMeModal from "@/components/ContactMeModal";
import LoadingOverlay from "@/components/LoadingOverlay";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isModalAnimating, setIsModalAnimating] = useState(false);

  return (
    <>
      {isPageLoading && <LoadingOverlay isPageLoading={isPageLoading} />}
      <ScrollToTop />
      {(isModalOpen || isModalAnimating) && (
        <ContactMeModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          isModalAnimating={isModalAnimating}
          setIsModalAnimating={setIsModalAnimating}
        />
      )}
      <Navbar
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        isModalAnimating={isModalAnimating}
        setIsModalAnimating={setIsModalAnimating}
      />
      <LandingPage />
      {!isModalOpen && (
        <>
          <MovieSection
            isPageLoading={isPageLoading}
            setIsPageLoading={setIsPageLoading}
            linkName={"latest"}
            sectionTitle="Latest Movies"
          />
          <MovieSection
            isPageLoading={isPageLoading}
            setIsPageLoading={setIsPageLoading}
            linkName={"popular"}
            sectionTitle="Popular Movies"
            variant="middle-container"
          />
          <MovieSection
            isPageLoading={isPageLoading}
            setIsPageLoading={setIsPageLoading}
            linkName={"rated"}
            sectionTitle="Highest Rated Movies"
          />
          <Footer />
        </>
      )}
      <ButtonToTop />
    </>
  );
};

export default Home;
