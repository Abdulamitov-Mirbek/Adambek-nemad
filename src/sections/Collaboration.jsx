import React, { useContext, useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ChevronRight } from "lucide-react";
import { LanguageContext } from "../context/LanguageContext";

// Импорты картинок
import diagonalImg from "../assets/images/Dioganal.jpg";
import electroImg from "../assets/images/Electro.jpg";
import electroImgosh from "../assets/images/electro_adis_osh.jpg";
import navisImg from "../assets/images/Navis.jpg";
import navisImgosh from "../assets/images/navis_osh.jpg";
import technoImg from "../assets/images/Techno.jpg";

function InstagramGlyph({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const partners = [
  {
    handle: "@electro.adis",
    url: "https://instagram.com/electro.adis/",
    img: electroImg,
    labelRu: "Electro Adis",
    labelKg: "Electro Adis",
    descRu: "Электротехника в Бишкеке.",
    descKg: "Электротехника Бишкек.",
  },
  {
    handle: "@electro.adis_osh",
    url: "https://instagram.com/electro.adis_osh/",
    img: electroImgosh,
    labelRu: "Electro Adis Osh",
    labelKg: "Electro Adis Ош",
    descRu: "Электротехника в Оше.",
    descKg: "Электротехника Ош.",
  },
  {
    handle: "@navis.academy",
    url: "https://instagram.com/navis.academy/",
    img: navisImg,
    labelRu: "Navis Academy",
    labelKg: "Navis Academy",
    descRu: "IT курсы в Бишкеке.",
    descKg: "Бишкектеги IT курстар.",
  },
  {
    handle: "@techno.adis",
    url: "https://instagram.com/techno.adis/",
    img: technoImg,
    labelRu: "Techno Adis",
    labelKg: "Techno Adis",
    descRu: "Бытовая техника.",
    descKg: "Турмуш-тиричилик техникасы.",
  },
  {
    handle: "@diagonal.brand",
    url: "https://instagram.com/diagonal.brand/",
    img: diagonalImg,
    labelRu: "Diagonal KG",
    labelKg: "Diagonal KG",
    descRu: "Мужская одежда.",
    descKg: "Эркектердин кийимдери.",
  },
  {
    handle: "@navis.academyosh",
    url: "https://instagram.com/navis.academyosh/",
    img: navisImgosh,
    labelRu: "Navis Osh",
    labelKg: "Navis Ош",
    descRu: "IT курсы в Оше.",
    descKg: "Оштогу IT курстар.",
  },
];

const content = {
  ru: {
    badge: "ПАРТНЕРЫ",
    title: "ПРОЕКТЫ",
    titleGradient: "И КОМПАНИИ",
    cta: "Перейти",
    next: "Далее",
    description: "Компании, которые доверяют мне и растут вместе со мной",
  },
  kg: {
    badge: "БИЗДИН ӨНӨКТӨШТӨР",
    title: "ДОЛБООРЛОР",
    titleGradient: "ЖАНА КОМПАНИЯЛАР",
    cta: "Көрүү",
    next: "Кийинки",
    description: "Бизге ишенип, биз менен чогуу өскөн компаниялар",
  },
};

export const Collaboration = () => {
  const { language } = useContext(LanguageContext);
  const t = content[language];
  const scrollRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const { scrollLeft, scrollWidth, clientWidth } = container;
    const cardWidthWithGap = window.innerWidth < 640 ? 284 : 344;
    const index = Math.round(scrollLeft / cardWidthWithGap);
    setActiveIndex(index);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 20);
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("resize", handleScroll);
    return () => window.removeEventListener("resize", handleScroll);
  }, []);

  const handleNextScroll = () => {
    if (scrollRef.current) {
      const cardWidthWithGap = window.innerWidth < 640 ? 284 : 344;
      scrollRef.current.scrollBy({
        left: cardWidthWithGap,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="projects"
      className="relative py-20 sm:py-32 overflow-hidden bg-black scroll-mt-20"
    >
      {/* Фоновые градиенты */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-20">
        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-16"
        >
          <div className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 mb-4 sm:mb-6 border border-white/10 bg-white/5 backdrop-blur-md rounded-full">
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-blue-400">
              {t.badge}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 sm:mb-4 tracking-tighter leading-[1.2]">
            {t.title}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 whitespace-nowrap sm:whitespace-normal inline-block">
              {t.titleGradient}
            </span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-white/100 max-w-2xl mx-auto mt-3 sm:mt-4 px-2">
            {t.description}
          </p>
        </motion.div>

        {/* Карточки партнеров */}
        <div className="relative">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 sm:pb-10 no-scrollbar snap-x snap-mandatory"
          >
            {partners.map((p, idx) => (
              <motion.div
                key={p.handle}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="w-[240px] sm:w-[280px] md:w-[320px] flex-shrink-0 snap-center"
              >
                <div
                  onClick={() => window.open(p.url, "_blank")}
                  className="group flex flex-col h-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl hover:border-blue-500/30 transition-all duration-500 overflow-hidden text-left cursor-pointer hover:transform hover:-translate-y-2"
                >
                  <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                    <img
                      src={p.img}
                      alt={p.handle}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <div className="p-4 sm:p-6 flex flex-col flex-grow">
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white mb-3 sm:mb-4 shadow-lg group-hover:scale-110 transition-transform">
                      <InstagramGlyph className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white leading-tight group-hover:text-blue-400 transition-colors">
                      {language === "kg" ? p.labelKg : p.labelRu}
                    </h3>
                    <p className="text-[9px] sm:text-[11px] font-mono text-pink-400 font-bold mt-1 mb-1 sm:mb-2">
                      {p.handle}
                    </p>
                    <p className="text-white/80 text-[11px] sm:text-xs leading-relaxed line-clamp-2">
                      {language === "kg" ? p.descKg : p.descRu}
                    </p>
                    <div className="mt-auto pt-3 sm:pt-4 border-t border-white/10 flex items-center justify-between">
                      <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-blue-400 group-hover:text-blue-300 transition-colors">
                        {t.cta}
                      </span>
                      <ExternalLink
                        size={11}
                        className="text-white/70 group-hover:text-blue-400 transition-colors sm:w-3 sm:h-3"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Индикаторы-точки */}
        <div className="flex justify-center gap-1 sm:gap-2 mt-4 sm:mt-6">
          {partners.map((_, idx) => (
            <div
              key={idx}
              className={`h-1 sm:h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === idx
                  ? "w-5 sm:w-8 bg-gradient-to-r from-blue-500 to-purple-500"
                  : "w-1 sm:w-1.5 bg-white/20"
              }`}
            />
          ))}
        </div>

        {/* Кнопка управления */}
        <div className="flex justify-center mt-6 sm:mt-8">
          <button
            type="button"
            onClick={handleNextScroll}
            aria-label={t.next}
            className={`
              group inline-flex items-center gap-2 px-5 sm:px-8 py-2 sm:py-3 rounded-full font-bold text-xs sm:text-sm shadow-xl transition-all duration-300 hover:scale-105 active:scale-95
              ${
                !canScrollRight
                  ? "bg-white/10 text-white/70 cursor-not-allowed opacity-50"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-blue-500/30"
              }
            `}
            disabled={!canScrollRight}
          >
            <span>{t.next}</span>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default Collaboration;
