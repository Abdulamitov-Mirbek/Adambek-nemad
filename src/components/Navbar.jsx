// src/components/Navbar.jsx
import React, { useState, useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

const content = {
  ru: {
    menu: "МЕНЮ",
    about: "О нас",
    speaking: "Выступления",
    videoLibrary: "Видеотека",
    courses: "Курсы",
    books: "Книги",
    press: "Пресса"
  },
  kg: {
    menu: "МЕНЮ",
    about: "Биз жөнүндө",
    speaking: "Сүйлөөлөр",
    videoLibrary: "Видеотека",
    courses: "Курстар",
    books: "Китептер",
    press: "Басылмалар"
  }
};

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language } = useContext(LanguageContext);
  const t = content[language];

  const menuItems = [
    { name: t.about, href: "#about", icon: "👤" },
    { name: t.speaking, href: "#speaking", icon: "🎤" },
    { name: t.videoLibrary, href: "#videos", icon: "📹" },
    { name: t.courses, href: "#courses", icon: "📚" },
    { name: t.books, href: "#books", icon: "📖" },
    { name: t.press, href: "#press", icon: "📰" }
  ];

  return (
    <>
      {/* Menu Button */}
      <button
        onClick={() => setIsMenuOpen(true)}
        className="fixed top-6 left-6 z-50 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all group"
      >
        <div className="w-6 h-0.5 bg-gray-800 mb-1.5 group-hover:bg-blue-600 transition"></div>
        <div className="w-6 h-0.5 bg-gray-800 mb-1.5 group-hover:bg-blue-600 transition"></div>
        <div className="w-6 h-0.5 bg-gray-800 group-hover:bg-blue-600 transition"></div>
        <span className="ml-2 font-semibold text-gray-800">{t.menu}</span>
      </button>

      {/* Side Menu Panel */}
      <div 
        className={`fixed inset-0 z-40 transition-all duration-500 ${
          isMenuOpen ? 'visible' : 'invisible'
        }`}
      >
        {/* Overlay */}
        <div 
          className={`absolute inset-0 bg-black transition-opacity duration-500 ${
            isMenuOpen ? 'opacity-50' : 'opacity-0'
          }`}
          onClick={() => setIsMenuOpen(false)}
        />
        
        {/* Menu Panel - Left Side */}
        <div 
          className={`absolute top-0 left-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-500 ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Panel Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                NAVEEN JAIN
              </h2>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-500 hover:text-gray-800 text-2xl"
              >
                ✕
              </button>
            </div>
            <p className="text-gray-600 text-sm">Entrepreneur & Philanthropist</p>
          </div>

          {/* Menu Items */}
          <nav className="p-6">
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 transition-all group"
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform">
                      {item.icon}
                    </span>
                    <span className="font-medium text-lg">{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};