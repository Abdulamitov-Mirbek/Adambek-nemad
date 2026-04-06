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

  useEffect(() => {
    const handleContextMenu = (e) => {
      // Запрет правой кнопки мыши
      e.preventDefault();
    };

    const handleKeyDown = (e) => {
      // Запрет F12, Ctrl+Shift+I (инспектора), Ctrl+U (исходного кода)
      const handleKeyDown = (e) => {
        if (
          e.keyCode === 123 || // F12
          (e.ctrlKey &&
            e.shiftKey &&
            (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) || // Ctrl+Shift+I/J/C
          (e.ctrlKey && e.keyCode === 85) || // Ctrl+U (Исходный код)
          (e.ctrlKey && e.keyCode === 83) || // Ctrl+S (Сохранение страницы)
          (e.ctrlKey && e.keyCode === 80) // Ctrl+P (Печать страницы)
        ) {
          e.preventDefault();
          return false;
        }
      };
    };

    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <Navbar />
      <Hero />
      <div className="bg-white">
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
      </div>
    </LanguageContext.Provider>
  );
}

export default App;
