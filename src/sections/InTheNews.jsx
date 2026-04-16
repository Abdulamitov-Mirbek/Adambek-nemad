import React, { useContext, useMemo, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LanguageContext } from "../context/LanguageContext";

// SVG иконки
const PlayIcon = ({ className = "w-4 h-4", fill = "none" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="5 3 19 12 5 21 5 3"></polygon>
  </svg>
);

const CloseIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const ClockIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const CalendarIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const ChevronIcon = ({ dir }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ transform: dir === "left" ? "rotate(0deg)" : "rotate(180deg)" }}
  >
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

const videos = [
  {
    url: "https://www.youtube.com/watch?v=crIz4zyNaww",
    duration: "25:30",
    date: "2023-10-11",
    views: "423",
    customThumb: "https://i.ytimg.com/vi/crIz4zyNaww/hqdefault.jpg",
    title: {
      kg: "Адамбек Нээмат: Кеңири маек",
      ru: "Адамбек Нээмат: Развернутое интервью",
    },
    description: {
      kg: "Бизнес, лидерлик жана келечек жөнүндө толук маек",
      ru: "Полное интервью о бизнесе, лидерстве и будущем",
    },
  },
  {
    url: "https://www.youtube.com/watch?v=LAmf9UZ-f6A",
    duration: "18:45",
    date: "2024-02-15",
    views: "2.1K",
    customThumb: null,
    title: {
      kg: "Адамбек Нээмат: Ийгилик сырлары",
      ru: "Адамбек Нээмат: Секреты успеха",
    },
    description: {
      kg: "Ийгиликтүү ишкер болуунун негизги принциптери",
      ru: "Ключевые принципы успешного предпринимательства",
    },
  },
  {
    url: "https://www.youtube.com/watch?v=P9iC49k2Q80",
    duration: "14:12",
    date: "2024-03-01",
    views: "1.3K",
    customThumb: null,
    title: {
      kg: "Адамбек Нээмат: Банкрот болгон ишкер",
      ru: "Адамбек Нээмат: Предприниматель, который банкротился",
    },
    description: {
      kg: "16 бизнес долбоордун автору ийгиликтер жана кемчиликтер жөнүндө айтып берет",
      ru: "Автор 16 бизнес-проектов рассказывает об успехах и неудачах",
    },
  },
];

function getVideoId(url) {
  try {
    const u = new URL(url);
    return u.searchParams.get("v") || u.pathname.replace("/", "");
  } catch {
    return "";
  }
}

const content = {
  ru: {
    badge: "ВИДЕОКОНТЕНТ",
    title: "ИНТЕРВЬЮ",
    titleGradient: "И ВЫСТУПЛЕНИЯ",
    lead: "Откровенные разговоры о бизнесе, успехе и жизни. Нажмите на карточку, чтобы посмотреть видео.",
    watchNow: "Смотреть сейчас",
    views: "просмотров",
  },
  kg: {
    badge: "ВИДЕОКОНТЕНТ",
    title: "МАЕКТЕР",
    titleGradient: "ЖАНА ЧЫГУУЛАР",
    lead: "Бизнес, ийгилик жана жашоо жөнүндө ачык маектер. Видеону көрүү үчүн карточканы басыңыз.",
    watchNow: "Азыр көрүү",
    views: "көрүү",
  },
};

export const InTheNews = () => {
  const { language } = useContext(LanguageContext);
  const t = content[language];
  const [selectedVideo, setSelectedVideo] = useState(null);

  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScroll, setCanScroll] = useState(false);

  const cards = useMemo(
    () =>
      videos.map((v) => ({
        ...v,
        id: getVideoId(v.url),
        thumb:
          v.customThumb ||
          `https://img.youtube.com/vi/${getVideoId(v.url)}/maxresdefault.jpg`,
      })),
    [],
  );

  const handleScroll = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollLeft = container.scrollLeft;
      const cardWidth = window.innerWidth < 640 ? 280 : 352;
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
      const amount = dir === "left" ? -320 : 320;
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <section
      id="press"
      className="relative py-20 sm:py-32 overflow-hidden bg-black"
    >
      {/* Фоновые градиенты */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-20">
        {/* Header */}
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

          <p className="text-sm sm:text-base md:text-lg text-white/100 max-w-2xl mx-auto px-2">
            {t.lead}
          </p>
        </motion.div>

        {/* Scroll Container */}
        <div className="relative group">
          <button
            onClick={() => scroll("left")}
            aria-label="Предыдущее видео"
            className="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-10 bg-black/80 backdrop-blur-md border border-white/10 shadow-xl p-2 sm:p-3 rounded-full hover:bg-black/100 hover:scale-110 transition-all duration-300 hidden lg:flex items-center justify-center"
          >
            <ChevronIcon dir="left" />
          </button>

          <button
            onClick={() => scroll("right")}
            aria-label="Следующее видео"
            className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-10 bg-black/80 backdrop-blur-md border border-white/10 shadow-xl p-2 sm:p-3 rounded-full hover:bg-black/100 hover:scale-110 transition-all duration-300 hidden lg:flex items-center justify-center"
          >
            <ChevronIcon dir="right" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-8 overflow-x-auto pb-4 sm:pb-6 no-scrollbar snap-x snap-mandatory lg:grid lg:grid-cols-3 lg:overflow-visible lg:justify-items-center lg:max-w-6xl lg:mx-auto"
          >
            {cards.map((v, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedVideo(v)}
                className="min-w-[260px] sm:min-w-[320px] md:min-w-[360px] lg:min-w-0 lg:w-full cursor-pointer snap-center"
              >
                <div className="bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/10">
                  <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                    <img
                      src={v.thumb}
                      alt={`${v.title[language]}`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    <div className="absolute top-2 sm:top-4 left-2 sm:left-4 right-2 sm:right-4 flex justify-between items-start gap-2">
                      <div className="bg-black/60 backdrop-blur-md px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[8px] sm:text-[10px] text-white font-bold flex items-center gap-1">
                        <ClockIcon /> {v.duration}
                      </div>
                      <div className="bg-black/60 backdrop-blur-md px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[8px] sm:text-[10px] text-white font-bold">
                        {v.views} {t.views}
                      </div>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-white/20 animate-ping" />
                        <div className="relative w-14 h-14 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                          <PlayIcon
                            className="w-7 h-7 sm:w-10 sm:h-10 text-white ml-0.5 sm:ml-1"
                            fill="white"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 bg-black/60 backdrop-blur-md px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[8px] sm:text-[10px] text-white font-bold flex items-center gap-1">
                      <CalendarIcon />{" "}
                      {new Date(v.date).toLocaleDateString(
                        language === "kg" ? "ky" : "ru",
                      )}
                    </div>
                  </div>

                  <div className="p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2 sm:mb-3 line-clamp-2 leading-tight hover:text-blue-400 transition-colors">
                      {v.title[language]}
                    </h3>
                    <p className="text-white/80 text-xs sm:text-sm line-clamp-2 mb-4 sm:mb-6">
                      {v.description[language]}
                    </p>
                    <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-white/10">
                      <span className="text-xs sm:text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors">
                        {t.watchNow}
                      </span>
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-500/20 flex items-center justify-center hover:bg-blue-500/30 transition-colors">
                        <PlayIcon
                          className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 ml-0.5"
                          fill="currentColor"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {canScroll && (
            <div className="flex justify-center gap-1 sm:gap-2 mt-4 sm:mt-6 lg:hidden">
              {cards.map((_, idx) => (
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
          )}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-3 sm:p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl aspect-video bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 p-1.5 sm:p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors backdrop-blur-sm"
              >
                <CloseIcon />
              </button>
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`}
                className="w-full h-full"
                frameBorder="0"
                allowFullScreen
                title={selectedVideo.title[language]}
              ></iframe>
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
