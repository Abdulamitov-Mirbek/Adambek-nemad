// src/components/Navbar.jsx
import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LanguageContext } from '../context/LanguageContext';
import { Menu, X, User, Mic2, Video, GraduationCap, BookOpen, Newspaper } from 'lucide-react';


const content = {
  ru: {
    menu: "МЕНЮ",
    about: "О нас",
    speaking: "Выступления",
    videoLibrary: "Видеотека",
    courses: "Курсы",
    books: "Книги",
    press: "Пресса",
    role: "Предприниматель и филантроп"
  },
  kg: {
    menu: "МЕНЮ",
    about: "Биз жөнүндө",
    speaking: "Сүйлөөлөр",
    videoLibrary: "Видеотека",
    courses: "Курстар",
    books: "Китептер",
    press: "Басылмалар",
    role: "Ишкер жана филантроп"
  }
};

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language } = useContext(LanguageContext);
  const t = content[language];

  const menuItems = [
    { name: t.about, href: "#about", icon: <User size={22} /> },
    { name: t.speaking, href: "#speaking", icon: <Mic2 size={22} /> },
    { name: t.videoLibrary, href: "#videos", icon: <Video size={22} /> },
    { name: t.courses, href: "#courses", icon: <GraduationCap size={22} /> },
    { name: t.books, href: "#books", icon: <BookOpen size={22} /> },
    { name: t.press, href: "#press", icon: <Newspaper size={22} /> }
  ];

  return (
    <>
      {/* Кнопка вызова меню */}
      <button
        onClick={() => setIsMenuOpen(true)}
        className="fixed top-6 left-6 z-50 flex items-center gap-2 bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-full shadow-lg border border-gray-100 hover:scale-105 active:scale-95 transition-all group"
      >
        <Menu className="w-5 h-5 text-gray-800 group-hover:text-blue-600 transition-colors" />
        <span className="font-bold text-gray-800 tracking-wide text-sm">{t.menu}</span>
      </button>

      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-[60]">
            {/* Оверлей с размытием */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            {/* Сама панель меню */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 left-0 h-full w-full max-w-[320px] bg-white shadow-2xl flex flex-col"
            >
              {/* Хедер панели */}
              <div className="p-8 border-b border-gray-50">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-black tracking-tighter text-gray-900">
                    ADAMBEK NEEMAT
                  </h2>
                  <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <X size={24} className="text-gray-400" />
                  </button>
                </div>
                <p className="text-blue-600 font-medium text-xs uppercase tracking-widest">{t.role}</p>
              </div>

              {/* Список ссылок */}
              <nav className="flex-1 overflow-y-auto p-6">
                <ul className="space-y-1">
                  {menuItems.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <a
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-4 px-4 py-4 rounded-xl text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-all group"
                      >
                        <span className="text-gray-400 group-hover:text-blue-600 transition-colors">
                          {item.icon}
                        </span>
                        <span className="font-semibold text-base">{item.name}</span>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Футер меню */}
              <div className="p-8 bg-gray-50/50">
                 <div className="flex gap-4">
                    {/* Здесь можно добавить маленькие иконки соцсетей */}
                 </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};