import React, { useContext, useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { LanguageContext } from "../context/LanguageContext";

// Import assets
import diagonalImg from "../assets/images/Dioganal.jpg";
import electroImg from "../assets/images/Electro.jpg";
import navisImg from "../assets/images/Navis.jpg";
import technoImg from "../assets/images/Techno.jpg";

function InstagramGlyph({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const partners = [
  {
    handle: "@navis.academy",
    url: "https://www.instagram.com/navis.academy/",
    img: navisImg,
    labelRu: "Navis Academy",
    labelKg: "Navis Academy",
    descRu: "IT курсы в Бишкеке.",
    descKg: "Бишкектеги IT курстар.",
  },
  {
    handle: "@diagonal.kg",
    url: "https://www.instagram.com/diagonal.kg/",
    img: diagonalImg,
    labelRu: "Diagonal KG",
    labelKg: "Diagonal KG",
    descRu: "Мужская одежда.",
    descKg: "Эркектердин кийимдери.",
  },
  {
    handle: "@electro.adis",
    url: "https://www.instagram.com/electro.adis/",
    img: electroImg,
    labelRu: "Electro Adis",
    labelKg: "Electro Adis",
    descRu: "Электротехника в КР.",
    descKg: "Электротехника КР.",
  },
  {
    handle: "@techno.adis",
    url: "https://www.instagram.com/techno.adis/",
    img: technoImg,
    labelRu: "Techno Adis",
    labelKg: "Techno Adis",
    descRu: "Бытовая техника.",
    descKg: "Турмуш-тиричилик техникасы.",
  },
];

const content = {
  ru: { kicker: "СОТРУДНИЧЕСТВО", title: "Проекты", cta: "Перейти" },
  kg: { kicker: "КЫЗМАТТАШЫК", title: "Долбоорлор", cta: "Көрүү" },
};

export const Collaboration = () => {
  const { language } = useContext(LanguageContext);
  const t = content[language];
  const scrollContainerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateScrollInfo = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const currentScroll = container.scrollLeft;
      const maxScrollValue = container.scrollWidth - container.clientWidth;
      setScrollPosition(currentScroll);
      setMaxScroll(maxScrollValue);

      const cardWidth = 320 + 24; 
      const newIndex = Math.round(currentScroll / cardWidth);
      setActiveIndex(Math.min(newIndex, partners.length - 1));
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      updateScrollInfo();
      container.addEventListener("scroll", updateScrollInfo);
      window.addEventListener("resize", updateScrollInfo);
      return () => {
        container.removeEventListener("scroll", updateScrollInfo);
        window.removeEventListener("resize", updateScrollInfo);
      };
    }
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const cardWidth = 320 + 24;
      const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
      const newScrollLeft = scrollContainerRef.current.scrollLeft + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="collaboration" className="py-24 bg-white overflow-hidden">
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 px-6"
        >
          <span className="text-[10px] font-black tracking-[0.3em] text-blue-600 uppercase bg-blue-50 px-3 py-1 rounded-full">
            {t.kicker}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-4 tracking-tighter uppercase">
            {t.title}
          </h2>
        </motion.div>

        <div className="relative group">
          {/* Left Button - Hidden on Desktop Center */}
          <button
            onClick={() => scroll("left")}
            className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg transition-all duration-300 md:hidden ${
              scrollPosition <= 0 ? "opacity-30" : "opacity-100"
            }`}
            disabled={scrollPosition <= 0}
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>

          <div
            ref={scrollContainerRef}
            className="overflow-x-auto pb-8 scrollbar-custom scroll-smooth no-scrollbar"
          >
            {/* md:justify-center центрирует карточки на ноутах */}
            <div className="flex gap-6 min-w-full px-6 md:justify-center">
              {partners.map((p, index) => (
                <motion.div
                  key={p.handle}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="w-[280px] sm:w-[320px] flex-shrink-0"
                >
                  <button
                    onClick={() => window.open(p.url, "_blank", "noopener,noreferrer")}
                    className="group flex w-full flex-col bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden text-left"
                  >
                    <div className="relative aspect-square overflow-hidden bg-gray-50">
                      <img src={p.img} alt={p.handle} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>

                    <div className="p-6">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white shadow-md mb-4">
                        <InstagramGlyph className="h-5 w-5" />
                      </div>
                      <h3 className="text-xl font-black text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                        {language === "kg" ? p.labelKg : p.labelRu}
                      </h3>
                      <p className="text-[11px] font-mono text-pink-600 font-bold mt-1 mb-2 italic">
                        {p.handle}
                      </p>
                      <p className="text-gray-500 text-xs leading-relaxed mb-6 opacity-80">
                        {language === "kg" ? p.descKg : p.descRu}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                        <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">{t.cta}</span>
                        <ExternalLink size={14} className="text-gray-300 group-hover:text-blue-500 transition-colors" />
                      </div>
                    </div>
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Button - Hidden on Desktop Center */}
          <button
            onClick={() => scroll("right")}
            className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg transition-all duration-300 md:hidden ${
              scrollPosition >= maxScroll - 10 ? "opacity-30" : "opacity-100"
            }`}
            disabled={scrollPosition >= maxScroll - 10}
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Dots - Hidden on Desktop */}
        <div className="flex justify-center gap-2 mt-2 md:hidden">
          {partners.map((_, idx) => (
            <div key={idx} className={`h-1.5 rounded-full transition-all duration-300 ${activeIndex === idx ? "w-6 bg-blue-600" : "w-1.5 bg-gray-200"}`} />
          ))}
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default Collaboration;