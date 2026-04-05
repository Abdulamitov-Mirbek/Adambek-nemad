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
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

const partners = [
  { handle: "@navis.academy", url: "https://instagram.com/navis.academy/", img: navisImg, labelRu: "Navis Academy", labelKg: "Navis Academy", descRu: "IT курсы в Бишкеке.", descKg: "Бишкектеги IT курстар." },
  { handle: "@navis.academyosh", url: "https://instagram.com/navis.academyosh/", img: navisImgosh, labelRu: "Navis Osh", labelKg: "Navis Ош", descRu: "IT курсы в Оше.", descKg: "Оштогу IT курстар." },
  { handle: "@diagonal.brand", url: "https://instagram.com/diagonal.brand/", img: diagonalImg, labelRu: "Diagonal KG", labelKg: "Diagonal KG", descRu: "Мужская одежда.", descKg: "Эркектердин кийимдери." },
  { handle: "@electro.adis", url: "https://instagram.com/electro.adis/", img: electroImg, labelRu: "Electro Adis", labelKg: "Electro Adis", descRu: "Электротехника в Бишкеке.", descKg: "Электротехника Бишкек." },
  { handle: "@electro.adis_osh", url: "https://instagram.com/electro.adis_osh/", img: electroImgosh, labelRu: "Electro Adis Osh", labelKg: "Electro Adis Ош", descRu: "Электротехника в Оше.", descKg: "Электротехника Ош." },
  { handle: "@techno.adis", url: "https://instagram.com/techno.adis/", img: technoImg, labelRu: "Techno Adis", labelKg: "Techno Adis", descRu: "Бытовая техника.", descKg: "Турмуш-тиричилик техникасы." },
];

const content = {
  ru: { kicker: "СОТРУДНИЧЕСТВО", title: "Проекты", cta: "Перейти", next: "Далее " },
  kg: { kicker: "КЫЗМАТТАШЫК", title: "Долбоорлор", cta: "Көрүү", next: "Кийинки " },
};

export const Collaboration = () => {
  const { language } = useContext(LanguageContext);
  const t = content[language];
  const scrollRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Основная функция обработки скролла
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const { scrollLeft, scrollWidth, clientWidth } = container;

    // 1. Расчет активного индекса для точек
    // Ширина карточки (320) + gap (24) = 344. Используем это для точности.
    const cardWidthWithGap = 344; 
    const index = Math.round(scrollLeft / cardWidthWithGap);
    setActiveIndex(index);

    // 2. Проверка возможности скролла дальше (для кнопки)
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 20);
  };

  useEffect(() => {
    // Вызываем один раз при загрузке, чтобы проверить состояние кнопки
    handleScroll();
    window.addEventListener("resize", handleScroll);
    return () => window.removeEventListener("resize", handleScroll);
  }, []);

  const handleNextScroll = () => {
    if (scrollRef.current) {
      const cardWidthWithGap = 344;
      scrollRef.current.scrollBy({ left: cardWidthWithGap, behavior: "smooth" });
    }
  };

  return (
    <section id="projects" className="py-24 bg-white overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        
        <motion.div className="text-center mb-16">
          <span className="text-[10px] font-bold tracking-[0.3em] text-blue-600 uppercase bg-blue-50 px-4 py-1.5 rounded-full">
            {t.kicker}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-6 tracking-tighter uppercase">
            {t.title}
          </h2>
        </motion.div>

        <div className="relative">
          {/* ВАЖНО: Добавлен onScroll={handleScroll} */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto pb-10 no-scrollbar snap-x snap-mandatory"
          >
            {partners.map((p) => (
              <motion.div
                key={p.handle}
                className="w-[280px] sm:w-[320px] flex-shrink-0 snap-center"
              >
                <div
                  onClick={() => window.open(p.url, "_blank")}
                  className="group flex flex-col h-full bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden text-left cursor-pointer"
                >
                  <div className="relative aspect-square overflow-hidden bg-gray-50">
                    <img src={p.img} alt={p.handle} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-black/5" />
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white mb-4">
                      <InstagramGlyph className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 leading-tight">
                      {language === "kg" ? p.labelKg : p.labelRu}
                    </h3>
                    <p className="text-[11px] font-mono text-pink-600 font-bold mt-1 mb-2">{p.handle}</p>
                    <p className="text-gray-500 text-xs leading-relaxed opacity-80 line-clamp-2">
                      {language === "kg" ? p.descKg : p.descRu}
                    </p>
                    <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600">{t.cta}</span>
                      <ExternalLink size={12} className="text-gray-300" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Индикаторы-точки */}
        <div className="flex justify-center gap-2 mt-4 mb-6">
          {partners.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === idx ? "w-6 bg-blue-600" : "w-1.5 bg-gray-200"
              }`}
            />
          ))}
        </div>

        {/* Кнопка управления */}
        <div className="flex justify-center mt-6">
          <button
            type="button"
            onClick={handleNextScroll}
            className={`
              group inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95
              ${!canScrollRight ? "opacity-30 grayscale pointer-events-none" : "opacity-100"}
            `}
          >
            <span>{t.next}</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
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