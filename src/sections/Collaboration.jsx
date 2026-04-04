import React, { useContext, useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { LanguageContext } from "../context/LanguageContext";

import diagonalImg from "../assets/images/Dioganal.jpg";
import electroImg from "../assets/images/Electro.jpg";
import electroImgosh from "../assets/images/electro_adis_osh.jpg";
import navisImg from "../assets/images/Navis.jpg";
import navisImgosh from "../assets/images/navis_osh.jpg";
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
    handle: "@navis.academyosh",
    url: "https://www.instagram.com/navis.academyosh/",
    img: navisImgosh,
    labelRu: "Navis Osh",
    labelKg: "Navis Ош",
    descRu: "IT курсы в Оше.",
    descKg: "Оштогу IT курстар.",
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
    descRu: "Электротехника в Бишкеке.",
    descKg: "Электротехника Бишкек.",
  },
  {
    handle: "@electro.adis_osh",
    url: "https://www.instagram.com/electro.adis_osh/",
    img: electroImgosh,
    labelRu: "Electro Adis Osh",
    labelKg: "Electro Adis Ош",
    descRu: "Электротехника в Оше.",
    descKg: "Электротехника Ош.",
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
      setScrollPosition(container.scrollLeft);
      setMaxScroll(container.scrollWidth - container.clientWidth);
      const itemWidth = container.scrollWidth / partners.length;
      setActiveIndex(Math.round(container.scrollLeft / itemWidth));
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      updateScrollInfo();
      container.addEventListener("scroll", updateScrollInfo, { passive: true });
      window.addEventListener("resize", updateScrollInfo);
      return () => {
        container.removeEventListener("scroll", updateScrollInfo);
        window.removeEventListener("resize", updateScrollInfo);
      };
    }
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const cardWidth = 304; 
      scrollContainerRef.current.scrollBy({ left: direction === "left" ? -cardWidth : cardWidth, behavior: "smooth" });
    }
  };

  return (
    <section id="projects" className="py-24 bg-white overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[10px] font-bold tracking-[0.3em] text-blue-600 uppercase bg-blue-50 px-4 py-1.5 rounded-full">
            {t.kicker}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-6 tracking-tighter uppercase">
            {t.title}
          </h2>
        </motion.div>

        <div className="relative">
          {/* Навигация только для мобилок/планшетов */}
          <button
            onClick={() => scroll("left")}
            className={`absolute -left-2 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-2 shadow-lg md:hidden transition-opacity ${scrollPosition <= 5 ? "opacity-0 pointer-events-none" : "opacity-100"}`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div
            ref={scrollContainerRef}
            className="
              flex gap-6 overflow-x-auto pb-6 no-scrollbar snap-x snap-mandatory
              md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:overflow-visible md:pb-0
            "
          >
            {partners.map((p, index) => (
              <motion.div
                key={p.handle}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="w-[280px] flex-shrink-0 snap-center md:w-full"
              >
                <div
                  onClick={() => window.open(p.url, "_blank", "noopener,noreferrer")}
                  className="group flex flex-col h-full bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden text-left cursor-pointer"
                >
                  <div className="relative aspect-square overflow-hidden bg-gray-100">
                    <img 
                      src={p.img} 
                      alt={p.handle} 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-black/5" />
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white mb-4 shadow-sm">
                      <InstagramGlyph className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                      {language === "kg" ? p.labelKg : p.labelRu}
                    </h3>
                    <p className="text-[11px] font-mono text-pink-600 font-bold mt-1 mb-2">
                      {p.handle}
                    </p>
                    <p className="text-gray-500 text-xs leading-relaxed mb-6 opacity-80 line-clamp-2">
                      {language === "kg" ? p.descKg : p.descRu}
                    </p>

                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600">
                        {t.cta}
                      </span>
                      <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                        <ExternalLink size={12} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className={`absolute -right-2 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-2 shadow-lg md:hidden transition-opacity ${scrollPosition >= maxScroll - 5 ? "opacity-0 pointer-events-none" : "opacity-100"}`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Точки пагинации (только мобилки) */}
        {maxScroll > 0 && (
          <div className="flex justify-center gap-1.5 mt-6 md:hidden">
            {partners.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-1 rounded-full transition-all duration-300 ${activeIndex === idx ? "w-6 bg-blue-600" : "w-1.5 bg-gray-200"}`} 
              />
            ))}
          </div>
        )}
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
    </section>
  );
};

export default Collaboration;