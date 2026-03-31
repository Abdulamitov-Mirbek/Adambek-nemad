// src/sections/Awards.jsx
import React from 'react';

const awards = [
  {
    title: "Ernst & Young Entrepreneur of the Year",
    year: "2019",
    description: "Recognized for outstanding entrepreneurial excellence"
  },
  {
    title: "Albert Einstein Technology Medal",
    year: "2020",
    description: "For groundbreaking innovations in technology"
  },
  {
    title: "Ellis Island Medal of Honor",
    year: "2018",
    description: "Celebrating exceptional contributions to society"
  }
];

export const Awards = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Awards & Achievements
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {awards.map((award, index) => (
            <div key={index} className="text-center p-6 hover:shadow-xl transition-shadow rounded-xl">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold mb-2">{award.title}</h3>
              <p className="text-blue-600 font-semibold mb-2">{award.year}</p>
              <p className="text-gray-600">{award.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Awards;