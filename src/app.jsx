// src/App.jsx
import React from "react";
import Hero from "./sections/Hero";
import FeaturedIn from "./sections/FeaturedIn";
import Awards from "./sections/Awards";
import VisionaryInsight from "./sections/VisionaryInsight";
import Books from "./sections/Books";
import InTheNews from "./sections/InTheNews";
import Footer from "./sections/Footer";

function App() {
  return (
    <div className="bg-white">
      <Hero />
      <FeaturedIn />
      <Awards />
      <VisionaryInsight />
      <Books />
      <InTheNews />
      <Footer />
    </div>
  );
}

export default App;
