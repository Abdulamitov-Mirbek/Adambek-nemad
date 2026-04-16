import React, { useContext, useMemo, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronRight as ArrowRight,
} from "lucide-react";
import { LanguageContext } from "../context/LanguageContext";

const videos = [
  "https://www.youtube.com/shorts/OfMA-QJzG6A",
  "https://www.youtube.com/shorts/bCFWI_acscM",
  "https://www.youtube.com/shorts/4b_HxfcT2nE",
  "https://www.youtube.com/shorts/N6Z8TlRiVsY",
  "https://www.youtube.com/shorts/yMrsSJkQhWE",
  "https://youtube.com/shorts/hGD94wr7jGc",
  "https://youtube.com/shorts/SAeUxoUbvgg",
  "https://youtube.com/shorts/eECH5n8TnkA",
  "https://youtube.com/shorts/lMpMAmgp-W4",
  "https://youtube.com/shorts/ozSxEFqfxog",
  "https://youtube.com/shorts/cRh1GIhOlzc",
  "https://youtube.com/shorts/FuSeZFgdBnU",
  "https://youtube.com/shorts/SfBJjNtNME8",
  "https://youtube.com/shorts/YoerIvssug4",
  "https://youtube.com/shorts/-bigux1daTA",
  "https://youtube.com/shorts/Q-eXF2k0mwQ",
];

function getVideoId(url) {
  try {
    const cleanUrl = url.split("?")[0];
    const u = new URL(cleanUrl);
    if (u.hostname.includes("youtu.be")) return u.pathname.replace("/", "");
    const parts = u.pathname.split("/").filter(Boolean);
    const idx = parts.indexOf("shorts");
    if (idx !== -1 && parts[idx + 1]) return parts[idx + 1];
    if (u.searchParams.get("v")) return u.searchParams.get("v");
    return parts[parts.length - 1] || "";
  } catch {
    return "";
  }
}

function getThumbCandidates(id) {
  if (!id) return [];
  return [
    `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    `https://i.ytimg.com/vi/${id}/sddefault.jpg`,
    `https://i.ytimg.com/vi/${id}/mqdefault.jpg`,
  ];
}

const content = {
  ru: {
    badge: "ВИДЕОКОНТЕНТ",
    title: "ВИДЕО-ОТЗЫВЫ",
    titleGradient: "КЛИЕНТОВ",
    lead: "Реальные истории успеха наших учеников. Нажмите на карточку, чтобы запустить видео.",
    ariaPrev: "Предыдущий видео-отзыв",
    ariaNext: "Следующий видео-отзыв",
    ariaClose: "Закрыть видео",
    goToSlide: "Перейти к видео номер",
    moreButton: "СМОТРЕТЬ ЕЩЁ",
    moreSubtext: "Больше видео в Instagram",
  },
  kg: {
    badge: "ВИДЕОКОНТЕНТ",
    title: "КАРДАРЛАРДЫН",
    titleGradient: "ОЙ-ПИКИРЛЕРИ",
    lead: "Окуучуларыбыздын чыныгы ийгилик тарыхтары. Видеону көрүү үчүн карточканы басыңыз.",
    ariaPrev: "Мурунку видео-пикир",
    ariaNext: "Кийинки видео-пикир",
    ariaClose: "Видеону жабуу",
    goToSlide: "Видео номерине өтүү",
    moreButton: "ДАГЫ КӨРҮҮ",
    moreSubtext: "Дагы видеолор Instagramда",
  },
};

// Кнопка-обманка
const FakeMoreButton = ({ t }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
    }, 3000);
  };

  return (
    <>
      <motion.div
        className="min-w-[240px] sm:min-w-[280px] md:min-w-[320px] snap-center"
        whileHover={{ y: -8 }}
      >
        <div
          onClick={handleClick}
          className="group relative aspect-[9/16] cursor-pointer overflow-hidden rounded-2xl sm:rounded-3xl border border-dashed border-blue-500/50 bg-gradient-to-br from-blue-600/10 to-purple-600/10 backdrop-blur-sm shadow-xl transition-all duration-500 hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-500/20"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="flex flex-col items-center justify-center h-full p-4 sm:p-6 text-center relative z-10">
            <div className="w-14 h-14 sm:w-20 sm:h-20 mb-3 sm:mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.5)] group-hover:scale-110 transition-transform duration-300">
              <ArrowRight className="w-7 h-7 sm:w-10 sm:h-10 text-white" />
            </div>
            <h3 className="text-base sm:text-xl font-black text-white uppercase tracking-tight mb-1 sm:mb-2">
              {t.moreButton}
            </h3>
            <p className="text-xs sm:text-sm text-white/60">{t.moreSubtext}</p>
            <div className="mt-4 sm:mt-6 w-8 sm:w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full group-hover:w-12 sm:group-hover:w-24 transition-all duration-300" />
          </div>
        </div>
      </motion.div>

      {/* Модальное окно с ошибкой */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
            onClick={() => setShowModal(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-red-500/30 rounded-2xl p-6 sm:p-8 max-w-md w-full text-center shadow-2xl"
          >
            <div className="text-6xl sm:text-7xl mb-4">⚠️</div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              УПС!
            </h3>
            <p className="text-sm sm:text-base text-gray-400 mb-6">
              Видео временно недоступно. Загляните в наш Instagram для просмотра
              всех видео-отзывов.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full text-white font-bold transition-all"
              >
                Закрыть
              </button>
              <button
                onClick={() =>
                  window.open(
                    "https://www.instagram.com/adambek.neemat",
                    "_blank",
                  )
                }
                className="px-5 sm:px-6 py-2 sm:py-2.5 bg-white/5 hover:bg-white/10 border border-white/20 rounded-full text-white font-bold transition-all"
              >
                Instagram →
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export const VideoLibrary = () => {
  const { language } = useContext(LanguageContext);
  const t = content[language];
  const [activeVideo, setActiveVideo] = useState(null);

  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollInfo, setScrollInfo] = useState({ current: 0, max: 0 });

  const cards = useMemo(
    () =>
      videos.map((url) => {
        const id = getVideoId(url);
        return { url, id, thumbCandidates: getThumbCandidates(id) };
      }),
    [],
  );

  const updateScrollStatus = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setScrollInfo({ current: scrollLeft, max: scrollWidth - clientWidth });
      const cardWidth = 240 + 24;
      setActiveIndex(Math.round(scrollLeft / cardWidth));
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      updateScrollStatus();
      container.addEventListener("scroll", updateScrollStatus);
      window.addEventListener("resize", updateScrollStatus);
      return () => {
        container.removeEventListener("scroll", updateScrollStatus);
        window.removeEventListener("resize", updateScrollStatus);
      };
    }
  }, [cards]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const cardWidth = window.innerWidth < 640 ? 264 : 344;
      const amount = direction === "left" ? -cardWidth : cardWidth;
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  const allCards = [...cards, { isFake: true }];

  return (
    <section
      id="videos"
      className="relative py-20 sm:py-32 overflow-hidden bg-black scroll-mt-24"
    >
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-8 sm:mb-12 max-w-3xl text-center"
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

        <div className="relative group/container">
          <button
            onClick={() => scroll("left")}
            aria-label={t.ariaPrev}
            className={`absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-20 bg-black/80 backdrop-blur-md border border-white/10 rounded-full p-2 sm:p-3 shadow-xl transition-all duration-300 hidden lg:flex items-center justify-center hover:bg-black/100 hover:scale-110 hover:border-blue-500/50 ${
              scrollInfo.current <= 5
                ? "opacity-0 pointer-events-none"
                : "opacity-0 group-hover/container:opacity-100"
            }`}
          >
            <ChevronLeft size={18} className="text-white" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 sm:pb-10 scroll-smooth snap-x snap-mandatory no-scrollbar relative z-0"
          >
            {cards.map((v, idx) => (
              <motion.div
                key={`${v.id}-${idx}`}
                className="min-w-[240px] sm:min-w-[280px] md:min-w-[320px] snap-center transition-transform duration-300 hover:-translate-y-1 sm:hover:-translate-y-2"
                onClick={() => setActiveVideo(v.id)}
              >
                <div className="group relative aspect-[9/16] cursor-pointer overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-gradient-to-br from-gray-800 to-gray-900 shadow-xl transition-all duration-500 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/20">
                  <img
                    src={v.thumbCandidates[0]}
                    alt={`${t.title} ${idx + 1}`}
                    loading="lazy"
                    fetchpriority={idx === 0 ? "high" : "low"}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onLoad={(e) => {
                      if (e.target.naturalWidth === 120) {
                        const currentSrc = e.target.src;
                        const srcIdx = v.thumbCandidates.indexOf(currentSrc);
                        if (
                          srcIdx !== -1 &&
                          srcIdx < v.thumbCandidates.length - 1
                        ) {
                          e.target.src = v.thumbCandidates[srcIdx + 1];
                        }
                      }
                    }}
                    onError={(e) => {
                      const currentSrc = e.target.src;
                      const srcIdx = v.thumbCandidates.indexOf(currentSrc);
                      if (
                        srcIdx !== -1 &&
                        srcIdx < v.thumbCandidates.length - 1
                      ) {
                        e.target.src = v.thumbCandidates[srcIdx + 1];
                      } else {
                        e.target.src =
                          "https://via.placeholder.com/360x640/0f0f0f/0f0f0f";
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-white/20 animate-ping" />
                      <div className="relative h-12 w-12 sm:h-16 sm:w-16 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="h-6 w-6 sm:h-8 sm:w-8 text-white fill-current ml-0.5 sm:ml-1" />
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                    <p className="text-white/90 font-bold tracking-wide text-[10px] sm:text-xs mb-1">
                      {language === "kg" ? "ПИКИР" : "ОТЗЫВ"} {idx + 1}
                    </p>
                    <div className="h-0.5 w-8 sm:w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Кнопка "Смотреть ещё" в конце */}
            <FakeMoreButton t={t} />
          </div>

          <button
            onClick={() => scroll("right")}
            aria-label={t.ariaNext}
            className={`absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-20 bg-black/80 backdrop-blur-md border border-white/10 rounded-full p-2 sm:p-3 shadow-xl transition-all duration-300 hidden lg:flex items-center justify-center hover:bg-black/100 hover:scale-110 hover:border-blue-500/50 ${
              scrollInfo.current >= scrollInfo.max - 5
                ? "opacity-0 pointer-events-none"
                : "opacity-0 group-hover/container:opacity-100"
            }`}
          >
            <ChevronRight size={18} className="text-white" />
          </button>

          {scrollInfo.max > 0 && (
            <div className="flex justify-center gap-0.5 sm:gap-1 mt-4 sm:mt-6">
              {allCards.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    const cardWidth = window.innerWidth < 640 ? 264 : 344;
                    scrollRef.current.scrollTo({
                      left: idx * cardWidth,
                      behavior: "smooth",
                    });
                  }}
                  aria-label={`${t.goToSlide} ${idx + 1}`}
                  aria-current={activeIndex === idx ? "page" : undefined}
                  className="p-2 sm:p-3 rounded-full transition-all duration-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <span
                    className={`block rounded-full transition-all duration-300 ${
                      activeIndex === idx
                        ? "h-1.5 sm:h-2 w-5 sm:w-8 bg-gradient-to-r from-blue-500 to-purple-500"
                        : "h-1 w-1 sm:h-1.5 sm:w-1.5 bg-white/40 group-hover:bg-white/60"
                    }`}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-3 sm:p-4"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 40 }}
              className="relative w-full max-w-[350px] sm:max-w-[400px] aspect-[9/16] bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveVideo(null)}
                aria-label={t.ariaClose}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors backdrop-blur-sm"
              >
                <X size={16} className="sm:w-5 sm:h-5" />
              </button>
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0`}
                title={`${t.title} - ${activeVideo}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default VideoLibrary;
