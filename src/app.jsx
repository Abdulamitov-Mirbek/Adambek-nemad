// src/App.jsx - Updated with Navbar
import React, { useEffect, useState } from "react";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Courses } from "./sections/Courses";
import { FeaturedIn } from "./sections/FeaturedIn";
import { Books } from "./sections/Books";
import { Collaboration } from "./sections/Collaboration";
import { InTheNews } from "./sections/InTheNews";
import { Footer } from "./components/Footer";
import { LanguageContext } from "./context/LanguageContext";
import { Navbar } from "./components/Navbar";
import Awards from "./sections/Awards";
import { VideoLibrary } from "./sections/VideoLibrary";

function App() {
  const [language, setLanguage] = useState("ru");

  // Update HTML lang attribute for accessibility and SEO
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    document.body.classList.add("animate-fade-in-up");
  }, []);


  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <Navbar />
      <Hero />
      <main>
        {/* Порядок секций совпадает с пунктами меню (после Hero) */}
        <About />
        <Collaboration />
        <Awards />
        <Books />
        <Courses />
        <VideoLibrary />
        <InTheNews />
        <FeaturedIn />
        <Footer />
      </main>
    </LanguageContext.Provider>
  );
}

export default App;
