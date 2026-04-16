import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LanguageContext } from "../context/LanguageContext";

const content = {
  ru: {
    badge: "Официальный сайт",
    title: "АДАМБЕК",
    titleGradient: "НЭЭМАТ",
    description:
      "Предприниматель, ментор и визионер. Помогаю раскрыть потенциал через системное мышление и инновационные подходы в бизнесе.",
    button1: "Смотреть курсы",
    button2: "Связаться",
  },
  kg: {
    badge: "Расмий сайт",
    title: "АДАМБЕК",
    titleGradient: "НЭЭМАТ",
    description:
      "Ишкер, ментор жана визионер. Системалык ой жүгүртүү жана бизнестеги инновациялык ыкмалар аркылуу потенциалды ачууга жардам берем.",
    button1: "Курстарды көрүү",
    button2: "Байланышуу",
  },
};

// LanguageSwitcher компонент внутри Hero
const LanguageSwitcher = ({ language, setLanguage, isVisible }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
      transition={{ duration: 0.3 }}
      className="fixed top-6 right-6 z-[100] flex items-center bg-black/60 backdrop-blur-md border border-white/10 rounded-full p-1.5 shadow-2xl"
      style={{ pointerEvents: isVisible ? "auto" : "none" }}
    >
      <button
        onClick={() => setLanguage("ru")}
        aria-label="Switch to Russian"
        className={`relative px-5 py-1.5 rounded-full text-xs font-bold tracking-widest transition-all duration-300 ${
          language === "ru"
            ? "text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
            : "text-white/60 hover:text-white hover:bg-white/10"
        }`}
      >
        РУС
      </button>
      <button
        onClick={() => setLanguage("kg")}
        aria-label="Switch to Kyrgyz"
        className={`relative px-5 py-1.5 rounded-full text-xs font-bold tracking-widest transition-all duration-300 ${
          language === "kg"
            ? "text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
            : "text-white/60 hover:text-white hover:bg-white/10"
        }`}
      >
        КЫР
      </button>
    </motion.div>
  );
};

export const Hero = () => {
  const { language, setLanguage } = useContext(LanguageContext);
  const t = content[language];
  const [showLanguageSwitcher, setShowLanguageSwitcher] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById("hero");
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        // Показываем переключатель только когда Hero секция видна
        const isHeroVisible = rect.top <= 100 && rect.bottom >= 100;
        setShowLanguageSwitcher(isHeroVisible);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Вызываем сразу для установки начального состояния

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a] text-white"
    >
      {/* Фоновый градиент для глубины */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full" />

      {/* LanguageSwitcher только на Hero и исчезает при скролле */}
      <LanguageSwitcher
        language={language}
        setLanguage={setLanguage}
        isVisible={showLanguageSwitcher}
      />

      <div className="container px-6 relative z-20 text-center">
        {/* Маленький бейдж над заголовком */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block px-4 py-1.5 mb-6 border border-white/10 bg-white/5 backdrop-blur-md rounded-full"
        >
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-blue-400">
            {t.badge}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter"
        >
          {t.title}
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            {t.titleGradient}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-white/100 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
        >
          {t.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-5 justify-center items-center"
        >
          <a
            href="#courses"
            aria-label={t.button1}
            className="w-full sm:w-auto px-10 py-4 bg-white text-black rounded-full font-bold hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-blue-500/40 text-center inline-block"
          >
            {t.button1}
          </a>
          <a
            href="https://wa.me/996704343756?text=%D0%90%D1%81%D1%81%D0%B0%D0%BB%D0%B0%D0%BC%D1%83%20%D0%B0%D0%BB%D0%B0%D0%B9%D0%BA%D1%83%D0%BC!%20%D0%9C%D0%B5%D0%BD%20%D1%81%D0%B0%D0%B9%D1%82%D1%82%D0%B0%D0%BD%20%D0%B6%D0%B0%D0%B7%D1%8B%D0%BF%20%D0%B6%D0%B0%D1%82%D0%B0%D0%BC."
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.button2}
            className="w-full sm:w-auto px-10 py-4 border border-white/20 rounded-full font-bold hover:bg-white/10 backdrop-blur-sm transition-all duration-300 text-center inline-block"
          >
            {t.button2}
          </a>
        </motion.div>
      </div>

      {/* Декоративный элемент снизу */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-30"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
