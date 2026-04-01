// src/context/LanguageContext.jsx
import React from 'react';

export const LanguageContext = React.createContext({
  language: 'ru',
  setLanguage: () => {}
});