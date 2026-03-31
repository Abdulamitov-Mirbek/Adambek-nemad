// src/sections/Hero.jsx
import React from 'react';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="absolute inset-0 bg-black/50 z-10" />
      <div className="container-custom relative z-20 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          SOLVE THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">IMPOSSIBLE</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
          Naveen Jain tackles some of the world's biggest problems. He is proof that there is no challenge that entrepreneurship and innovation can't solve.
        </p>
        <div className="flex gap-4 justify-center">
          <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold hover:shadow-lg transition-all hover:scale-105">
            Watch His Journey
          </button>
          <button className="px-8 py-3 border-2 border-white rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all">
            Get in Touch
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;