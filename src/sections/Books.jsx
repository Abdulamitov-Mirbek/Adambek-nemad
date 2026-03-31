// src/sections/Books.jsx
import React from 'react';

export const Books = () => {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Books</h2>
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden md:flex">
            <div className="md:w-1/3 bg-gradient-to-br from-blue-500 to-purple-600 p-8 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-6xl mb-4">📚</div>
                <div className="text-2xl font-bold">The Youth Formula</div>
              </div>
            </div>
            <div className="md:w-2/3 p-8">
              <h3 className="text-2xl font-bold mb-4">The Youth Formula</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Picture this: you experience a thirty-year-old's vitality and intellectual sharpness into your nineties and beyond. 
                This is no longer simply a nice idea. According to statistics on chronic disease, 74 percent of us will die earlier 
                than we have to from an avoidable disease. The great news is that we can reverse these trends thanks to technological breakthroughs.
              </p>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transition-all">
                Buy now on Amazon →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Books;