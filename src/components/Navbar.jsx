// src/components/Navbar.jsx
import React, { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LanguageContext } from "../context/LanguageContext";
import {
  Menu,
  X,
  User,
  FolderKanban,
  Users,
  Building2,
  BookOpen,
  GraduationCap,
  MessageSquare,
  Mic2,
  Phone,
} from "lucide-react";

const content = {
  ru: {
    menu: "Меню",
    about: "Обо мне",
    projects: "Проекты",
    students: "Ученики",
    books: "Книги",
    course: "Курс",
    reviews: "Отзывы",
    interviews: "Интервью",
    contacts: "Контакты",
    role: "Предприниматель и бизнес-коуч",
  },
  kg: {
    menu: "Меню",
    about: "Мен жөнүндө",
    projects: "Долбоорлор",
    students: "Шакирттер",
    books: "Китептер",
    course: "Курс",
    reviews: "Пикирлер",
    interviews: "Маектер",
    contacts: "Байланыш",
    role: "Ишкер жана бизнес-коуч",
  },
};

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language } = useContext(LanguageContext);
  const t = content[language];

  const menuItems = [
    { name: t.about, href: "#about", icon: <User size={22} /> },
    { name: t.projects, href: "#projects", icon: <FolderKanban size={22} /> },
    { name: t.students, href: "#students", icon: <Users size={22} /> },
    { name: t.books, href: "#books", icon: <BookOpen size={22} /> },
    { name: t.course, href: "#courses", icon: <GraduationCap size={22} /> },
    { name: t.reviews, href: "#videos", icon: <MessageSquare size={22} /> },
    { name: t.interviews, href: "#press", icon: <Mic2 size={22} /> },
    { name: t.contacts, href: "#contact", icon: <Phone size={22} /> },
  ];

  return (
    <>
      {/* Кнопка меню */}
      <button
        onClick={() => setIsMenuOpen(true)}
        className="fixed top-6 left-6 z-50 flex items-center gap-2 bg-black/80 backdrop-blur-md px-5 py-2.5 rounded-full shadow-lg border border-white/10 hover:scale-105 active:scale-95 transition-all group"
      >
        <Menu className="w-5 h-5 text-white group-hover:text-blue-400 transition-colors" />
        <span className="font-bold text-white tracking-wide text-sm">
          {t.menu}
        </span>
      </button>

      {/* Модальное меню */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-[60]">
            {/* Оверлей */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Меню панель */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute top-0 left-0 h-full w-full max-w-[360px] bg-gradient-to-b from-gray-900 to-black shadow-2xl flex flex-col border-r border-white/10"
            >
              {/* Шапка меню */}
              <div className="p-8 border-b border-white/10">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-2xl font-black tracking-tighter bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    ADAMBEK NEEMAT
                  </h2>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <X
                      size={24}
                      className="text-gray-400 hover:text-white transition-colors"
                    />
                  </button>
                </div>
                <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-3" />
                <p className="text-blue-400 font-medium text-xs uppercase tracking-widest">
                  {t.role}
                </p>
              </div>

              {/* Навигация */}
              <nav className="flex-1 overflow-y-auto p-6">
                <ul className="space-y-2">
                  {menuItems.map((item, index) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <a
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/10 hover:text-white transition-all group"
                      >
                        <span className="text-gray-500 group-hover:text-blue-400 transition-colors">
                          {item.icon}
                        </span>
                        <span className="font-semibold text-base group-hover:text-white">
                          {item.name}
                        </span>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Футер меню */}
              <div className="p-6 border-t border-white/10">
                <div className="flex flex-col gap-3">
                  <div className="flex gap-4 justify-center">
                    <a
                      href="https://www.instagram.com/adambek.neemat"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 transition-all duration-300 hover:scale-110"
                    >
                      <svg
                        className="w-5 h-5 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <rect
                          x="2"
                          y="2"
                          width="20"
                          height="20"
                          rx="5"
                          ry="5"
                        />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </svg>
                    </a>
                    <a
                      href="https://wa.me/996704343756"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-green-600 transition-all duration-300 hover:scale-110"
                    >
                      <svg
                        className="w-5 h-5 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                      </svg>
                    </a>
                    <a
                      href="https://www.youtube.com/@adambek.neemat"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-red-600 transition-all duration-300 hover:scale-110"
                    >
                      <svg
                        className="w-5 h-5 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" />
                        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                      </svg>
                    </a>
                  </div>
                  <p className="text-center text-gray-500 text-[10px] mt-2">
                    © 2026 ADAMBEK NEEMAT
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
