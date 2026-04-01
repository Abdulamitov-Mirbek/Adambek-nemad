// src/sections/Hero.jsx - Updated to adjust for navbar
import React, { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { LanguageSwitcher } from '../components/LanguageSwitcher';

const content = {
  ru: {
    title: "РЕШАЙТЕ",
    titleGradient: "НЕВОЗМОЖНОЕ",
    description: "Навин Джейн решает самые большие проблемы мира. Он доказывает, что нет вызова, который не могли бы решить предпринимательство и инновации.",
    button1: "Смотреть историю",
    button2: "Связаться"
  },
  kg: {
    title: "МҮМКҮН ЭМЕСТИ",
    titleGradient: "ЧЕЧИҢИЗ",
    description: "Навин Жейн дүйнөнүн эң чоң көйгөйлөрүн чечет. Ал ишкердик жана инновация чече албаган көйгөй жок экенинин далили.",
    button1: "Тарыхын көрүү",
    button2: "Байланышуу"
  }
};

export const Hero = () => {
  const { language } = useContext(LanguageContext);
  const t = content[language];

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <LanguageSwitcher />
      <div className="absolute inset-0 bg-black/50 z-10" />
      <div className="container-custom relative z-20 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          {t.title}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            {t.titleGradient}
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
          {t.description}
        </p>
        <div className="flex gap-4 justify-center">
          <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold hover:shadow-lg transition-all hover:scale-105">
            {t.button1}
          </button>
          <button className="px-8 py-3 border-2 border-white rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all">
            {t.button2}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;