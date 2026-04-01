// src/App.jsx - Updated with Navbar
import React, { useState } from "react";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { FeaturedIn } from "./sections/FeaturedIn";
import { Awards } from "./sections/Awards";
import { VisionaryInsight } from "./sections/VisionaryInsight";
import { Books } from "./sections/Books";
import { InTheNews } from "./sections/InTheNews";
import { Footer } from "./components/Footer";
import { LanguageContext } from "./context/LanguageContext";
import { Navbar } from "./components/Navbar";

function App() {
  const [language, setLanguage] = useState("ru");

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <Navbar />
      <div className="bg-white">
        <Hero />
        <About />
        <FeaturedIn />
        <Awards />
        <VisionaryInsight />
        <Books />
        <InTheNews />
        <Footer />
      </div>
    </LanguageContext.Provider>
  );
}

export default App;
