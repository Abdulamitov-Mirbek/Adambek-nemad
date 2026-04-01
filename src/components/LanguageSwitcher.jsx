import React, { useContext } from 'react';
import { motion } from 'framer-motion'; 
import { LanguageContext } from '../context/LanguageContext';

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <div className="fixed top-6 right-6 z-50 flex items-center bg-black/20 backdrop-blur-md border border-white/10 rounded-full p-1.5 shadow-2xl">
      <button
        onClick={() => setLanguage('ru')}
        className={`relative px-5 py-1.5 rounded-full text-xs font-bold tracking-widest transition-all duration-300 ${
          language === 'ru' 
            ? 'text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-inner' 
            : 'text-gray-400 hover:text-white'
        }`}
      >
        РУС
      </button>
      <button
        onClick={() => setLanguage('kg')}
        className={`relative px-5 py-1.5 rounded-full text-xs font-bold tracking-widest transition-all duration-300 ${
          language === 'kg' 
            ? 'text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-inner' 
            : 'text-gray-400 hover:text-white'
        }`}
      >
        КЫР
      </button>
    </div>
  );
};