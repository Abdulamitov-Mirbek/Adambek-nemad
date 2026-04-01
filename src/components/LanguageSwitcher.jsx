// src/components/LanguageSwitcher.jsx - Updated position
import React, { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <div className="fixed top-6 right-6 z-50 flex gap-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg p-1">
      <button
        onClick={() => setLanguage('ru')}
        className={`px-4 py-2 rounded-full transition-all ${
          language === 'ru' 
            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        Рус
      </button>
      <button
        onClick={() => setLanguage('kg')}
        className={`px-4 py-2 rounded-full transition-all ${
          language === 'kg' 
            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        Кыр
      </button>
    </div>
  );
};