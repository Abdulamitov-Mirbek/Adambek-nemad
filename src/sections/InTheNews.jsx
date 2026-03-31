// src/sections/InTheNews.jsx
import React from 'react';

const news = [
  {
    title: "Gut check at Nordstrom: Retail giant to sell microbiome test from Seattle-area startup Viome",
    source: "GEEKWIRE",
    link: "#"
  },
  {
    title: "Is Viome the Future of Food?",
    source: "THE FOOD INSTITUTE",
    link: "#"
  },
  {
    title: "For Naveen Jain, the Big Problems Are the Draw",
    source: "INC.",
    link: "#"
  }
];

export const InTheNews = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">IN THE NEWS</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {news.map((item, index) => (
            <a 
              key={index}
              href={item.link}
              className="group block p-6 border border-gray-200 rounded-xl hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="text-sm text-blue-600 font-semibold mb-3">{item.source}</div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {item.title}
              </h3>
              <div className="mt-4 text-gray-500 group-hover:text-blue-600 flex items-center">
                Read more →
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InTheNews; 