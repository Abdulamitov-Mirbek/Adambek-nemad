// src/App.jsx - Updated with Navbar
import React, { useState } from "react";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Courses } from "./sections/Courses";
import { FeaturedIn } from "./sections/FeaturedIn";
import { VisionaryInsight } from "./sections/VisionaryInsight";
import { Books } from "./sections/Books";
import { Collaboration } from "./sections/Collaboration";
import { Footer } from "./components/Footer";
import { LanguageContext } from "./context/LanguageContext";
import { Navbar } from "./components/Navbar";
import Awards from "./sections/Awards";
import { VideoLibrary } from "./sections/VideoLibrary";
import InTheNews from "./sections/InTheNews";

function App() {
  const [language, setLanguage] = useState("ru");

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <Navbar />
      <Hero />
      <div className="bg-white">
        <About />
        <Courses />
        <FeaturedIn />
        <Collaboration />
        <Awards />
        <VisionaryInsight />
        <Books />
        <VideoLibrary />
        <InTheNews />
        <Footer />
      </div>
    </LanguageContext.Provider>
  );
}

export default App;
