// src/sections/VisionaryInsight.jsx
import React from 'react';

export const VisionaryInsight = () => {
  return (
    <section className="section-padding bg-gradient-to-r from-purple-600 to-blue-600 text-white">
      <div className="container-custom text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">VISIONARY INSIGHT</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          An icon propelled by imagination, Naveen sees beyond the current business and technological landscape, creating companies that push humanity forward.
        </p>
        <div className="flex gap-4 justify-center">
          <button className="px-8 py-3 bg-white text-purple-600 rounded-full font-semibold hover:shadow-lg transition-all hover:scale-105">
            Watch Naveen Speak
          </button>
          <button className="px-8 py-3 border-2 border-white rounded-full font-semibold hover:bg-white hover:text-purple-600 transition-all">
            Book Naveen to speak
          </button>
        </div>
      </div>
    </section>
  );
};

export default VisionaryInsight;