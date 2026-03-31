// src/sections/FeaturedIn.jsx
import React from 'react';

const featuredLogos = [
  { name: 'Forbes', class: 'text-3xl' },
  { name: 'Inc.', class: 'text-4xl font-bold' },
  { name: 'GeekWire', class: 'text-2xl font-semibold' },
  { name: 'The Food Institute', class: 'text-xl' },
  { name: 'Amazon', class: 'text-3xl font-light' }
];

export const FeaturedIn = () => {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <p className="text-center text-gray-600 uppercase tracking-wider mb-8">Featured In</p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
          {featuredLogos.map((logo, index) => (
            <div key={index} className={`text-gray-500 ${logo.class}`}>
              {logo.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default FeaturedIn;