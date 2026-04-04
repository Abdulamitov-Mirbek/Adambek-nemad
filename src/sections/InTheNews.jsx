import React, { useContext, useMemo, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LanguageContext } from "../context/LanguageContext";

// SVG иконки
const PlayIcon = ({ className = "w-4 h-4", fill = "none" }) => (
  <svg className={className} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 3 19 12 5 21 5 3"></polygon>
  </svg>
);
const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);
const ClockIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);
const CalendarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);
const ChevronIcon = ({ dir }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: dir === 'left' ? 'rotate(0deg)' : 'rotate(180deg)' }}>
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

const videos = [
  {
    url: "https://www.youtube.com/watch?v=P9iC49k2Q80",
    duration: "14:12", date: "2024-03-01", views: "1.3K",
    title: { kg: "Адамбек Нээмат: Банкрот болгон ишкер", ru: "Адамбек Нээмат: Предприниматель, который банкротился" },
    description: { kg: "16 бизнес долбоордун автору ийгиликтер жана кемчиликтер жөнүндө айтып берет", ru: "Автор 16 бизнес-проектов рассказывает об успехах и неудачах" },
  },
  {
    url: "https://www.youtube.com/watch?v=LAmf9UZ-f6A",
    duration: "18:45", date: "2024-02-15", views: "2.1K",
    title: { kg: "Адамбек Нээмат: Ийгилик сырлары", ru: "Адамбек Нээмат: Секреты успеха" },
    description: { kg: "Ийгиликтүү ишкер болуунун негизги принциптери", ru: "Ключевые принципы успешного предпринимательства" },
  },
  {
    url: "https://www.youtube.com/watch?v=crIz4zyNaww",
    duration: "25:30", date: "2023-10-11", views: "423",
    customThumb: "https://i.ytimg.com/vi/crIz4zyNaww/hqdefault.jpg",
    title: { kg: "Адамбек Нээмат: Кеңири маек", ru: "Адамбек Нээмат: Развернутое интервью" },
    description: { kg: "Бизнес, лидерлик жана келечек жөнүндө толук маек", ru: "Полное интервью о бизнесе, лидерстве и будущем" },
  },
];

function getVideoId(url) {
  try {
    const u = new URL(url);
    return u.searchParams.get("v") || u.pathname.replace("/", "");
  } catch { return ""; }
}

const content = {
  ru: { kicker: "ЭКСКЛЮЗИВНЫЕ ИНТЕРВЬЮ", title: "Адамбек Нээмат", lead: "Откровенные разговоры о бизнесе, успехе и жизни.", watchNow: "Смотреть сейчас", views: "просмотров" },
  kg: { kicker: "ЭКСКЛЮЗИВДҮҮ МАЕКТЕР", title: "Адамбек Нээмат", lead: "Бизнес, ийгилик жана жашоо жөнүндө ачык маектер.", watchNow: "Азыр көрүү", views: "көрүү" },
};

export const InTheNews = () => {
  const { language } = useContext(LanguageContext);
  const t = content[language];
  const [selectedVideo, setSelectedVideo] = useState(null);
  
  // Состояния для скролла
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScroll, setCanScroll] = useState(false);

  const cards = useMemo(() => videos.map(v => ({
    ...v, id: getVideoId(v.url),
    thumb: v.customThumb || `https://img.youtube.com/vi/${getVideoId(v.url)}/maxresdefault.jpg`
  })), []);

  const handleScroll = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollLeft = container.scrollLeft;
      const cardWidth = 320 + 32; // min-w + gap
      setActiveIndex(Math.round(scrollLeft / cardWidth));
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      const checkScroll = () => {
        setCanScroll(container.scrollWidth > container.clientWidth);
      };
      checkScroll();
      container.addEventListener("scroll", handleScroll);
      window.addEventListener("resize", checkScroll);
      return () => {
        container.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, []);

  const scroll = (dir) => {
    if (scrollRef.current) {
      const amount = dir === "left" ? -400 : 400;
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <section id="press" className="py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-sm font-semibold text-blue-700 tracking-wide">{t.kicker}</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 uppercase">
            {t.title} <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {language === "kg" ? "МАЕКТЕР" : "ИНТЕРВЬЮ"}
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t.lead}</p>
        </motion.div>

        {/* Scroll Container */}
        <div className="relative group">
          <button onClick={() => scroll("left")} className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow-xl p-3 rounded-full lg:hidden hover:scale-110 transition-transform">
            <ChevronIcon dir="left" />
          </button>
          <button onClick={() => scroll("right")} className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow-xl p-3 rounded-full lg:hidden hover:scale-110 transition-transform">
            <ChevronIcon dir="right" />
          </button>

          <div 
            ref={scrollRef}
            className="
              flex gap-8 overflow-x-auto pb-6 no-scrollbar
              snap-x snap-mandatory
              lg:grid lg:grid-cols-3 lg:overflow-visible lg:justify-items-center lg:max-w-6xl lg:mx-auto
            "
          >
            {cards.map((v, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedVideo(v)}
                className="min-w-[320px] md:min-w-[380px] lg:min-w-0 lg:w-full cursor-pointer snap-center"
              >
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 transition-all hover:shadow-blue-500/20">
                  <div className="relative aspect-video overflow-hidden bg-gray-900">
                    <img src={v.thumb} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/40" />
                    
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                       <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-white font-bold flex items-center gap-1">
                         <ClockIcon /> {v.duration}
                       </div>
                       <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-white font-bold">
                         {v.views} {t.views}
                       </div>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-white/20 animate-ping" />
                        <div className="relative w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                          <PlayIcon className="w-8 h-8 text-white ml-1" fill="white" />
                        </div>
                      </div>
                    </div>

                    <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-white font-bold flex items-center gap-1">
                      <CalendarIcon /> {v.date}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">{v.title[language]}</h3>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-6">{v.description[language]}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-sm font-bold text-blue-600">{t.watchNow}</span>
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                        <PlayIcon className="w-4 h-4 text-blue-600 ml-0.5" fill="currentColor" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Пагинация (точки) для мобилок */}
          {canScroll && (
            <div className="flex justify-center gap-2 mt-4 lg:hidden">
              {cards.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeIndex === idx ? "w-6 bg-blue-600" : "w-1.5 bg-gray-200"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4" onClick={() => setSelectedVideo(null)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
              <button onClick={() => setSelectedVideo(null)} className="absolute top-4 right-4 z-10 p-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors"><CloseIcon /></button>
              <iframe src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`} className="w-full h-full" frameBorder="0" allowFullScreen></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
    </section>
  );
};

export default InTheNews;