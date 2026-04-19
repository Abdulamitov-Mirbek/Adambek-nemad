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

// Утилиты (ID видео и превью) остаются без изменений
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
    errorTitle: "УПС!",
    errorMessage:
      "Видео временно недоступно. Загляните в наш Instagram для просмотра всех видео-отзывов.",
    closeButton: "Закрыть",
    instagramButton: "Instagram →",
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
    errorTitle: "ОЙ!",
    errorMessage:
      "Видео убактылуу жеткиликсиз. Бардык видео-пикирлерди көрүү для Instagram'га кириңиз.",
    closeButton: "Жабуу",
    instagramButton: "Instagram →",
  },
};

const FakeMoreButton = ({ t }) => {
  const [showModal, setShowModal] = useState(false);
  const handleClick = () => {
    setShowModal(true);
    setTimeout(() => setShowModal(false), 3000);
  };

  return (
    <>
      <motion.div
        className="min-w-[240px] sm:min-w-[280px] md:min-w-[320px] snap-center transition-transform duration-300 hover:-translate-y-2"
        whileHover={{ y: -8 }}
      >
        <button
          type="button"
          onClick={handleClick}
          aria-label={t.moreButton}
          className="group relative aspect-[9/16] cursor-pointer overflow-hidden rounded-3xl border border-dashed border-blue-500/50 bg-gradient-to-br from-blue-600/10 to-purple-600/10 backdrop-blur-sm shadow-xl transition-all duration-500 hover:border-blue-400"
        >
          <div className="flex flex-col items-center justify-center h-full p-6 text-center relative z-10">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.5)] group-hover:scale-110 transition-transform">
              <ArrowRight className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight mb-2">
              {t.moreButton}
            </h3>
            <p className="text-xs sm:text-sm text-white/60">{t.moreSubtext}</p>
          </div>
        </button>
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-[200] px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
              onClick={() => setShowModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-gray-900 border border-red-500/30 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl"
            >
              <div className="text-6xl mb-4">⚠️</div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {t.errorTitle}
              </h3>
              <p className="text-gray-400 mb-6">{t.errorMessage}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-bold"
                >
                  {t.closeButton}
                </button>
                <button
                  onClick={() =>
                    window.open(
                      "https://www.instagram.com/adambek.neemat",
                      "_blank",
                    )
                  }
                  className="px-6 py-2 bg-white/5 border border-white/20 rounded-full text-white font-bold"
                >
                  {t.instagramButton}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
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

  const allCards = [...cards, { isFake: true }];

  // Исправленная логика обновления статуса скролла
  const updateScrollStatus = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setScrollInfo({ current: scrollLeft, max: scrollWidth - clientWidth });

      const container = scrollRef.current;
      const children = Array.from(container.children);
      if (children.length > 0) {
        // Находим индекс элемента, который ближе всего к центру или левому краю
        const distances = children.map((child) =>
          Math.abs(
            child.offsetLeft - scrollLeft - (window.innerWidth < 640 ? 16 : 24),
          ),
        );
        const minDistanceIdx = distances.indexOf(Math.min(...distances));
        setActiveIndex(minDistanceIdx);
      }
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      updateScrollStatus();
      container.addEventListener("scroll", updateScrollStatus, {
        passive: true,
      });
      window.addEventListener("resize", updateScrollStatus);
      return () => {
        container.removeEventListener("scroll", updateScrollStatus);
        window.removeEventListener("resize", updateScrollStatus);
      };
    }
  }, [cards]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const cardWidth = window.innerWidth < 640 ? 256 : 344; // Приблизительный шаг
      const amount = direction === "left" ? -cardWidth : cardWidth;
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <section
      id="videos"
      className="relative py-20 sm:py-32 overflow-hidden bg-black scroll-mt-24"
    >
      {/* Фоновые градиенты */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <div className="inline-block px-4 py-1.5 mb-6 border border-white/10 bg-white/5 backdrop-blur-md rounded-full">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-blue-400">
              {t.badge}
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-white mb-4 tracking-tighter leading-tight">
            {t.title}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              {t.titleGradient}
            </span>
          </h2>
          <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto">
            {t.lead}
          </p>
        </motion.div>

        <div className="relative group/container">
          {/* Кнопки навигации (только десктоп) */}
          <button
            onClick={() => scroll("left")}
            aria-label={t.ariaPrev}
            className={`absolute -left-6 top-1/2 -translate-y-1/2 z-30 bg-black/80 backdrop-blur-md border border-white/10 rounded-full p-4 hidden lg:flex items-center justify-center transition-all ${
              scrollInfo.current <= 5
                ? "opacity-0 pointer-events-none"
                : "opacity-0 group-hover/container:opacity-100 hover:scale-110 hover:border-blue-500"
            }`}
          >
            <ChevronLeft size={20} className="text-white" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto pb-10 scroll-smooth snap-x snap-mandatory no-scrollbar relative z-10"
          >
            {cards.map((v, idx) => (
              <motion.div
                key={`${v.id}-${idx}`}
                className="min-w-[240px] sm:min-w-[280px] md:min-w-[320px] snap-center"
                onClick={() => setActiveVideo(v.id)}
              >
                <div className="group relative aspect-[9/16] cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-gray-900 shadow-xl transition-all duration-500 hover:border-blue-500/50">
                  <img
                    src={v.thumbCandidates[0]}
                    alt={`Видео отзыв ${idx + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative h-16 w-16 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="h-8 w-8 text-white fill-current ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-6 left-6">
                    <p className="text-white font-bold tracking-wide text-xs mb-1">
                      {language === "kg" ? "ПИКИР" : "ОТЗЫВ"} {idx + 1}
                    </p>
                    <div className="h-0.5 w-12 bg-blue-500 rounded-full" />
                  </div>
                </div>
              </motion.div>
            ))}
            <FakeMoreButton t={t} />
          </div>

          <button
            onClick={() => scroll("right")}
            aria-label={t.ariaNext}
            className={`absolute -right-6 top-1/2 -translate-y-1/2 z-30 bg-black/80 backdrop-blur-md border border-white/10 rounded-full p-4 hidden lg:flex items-center justify-center transition-all ${
              scrollInfo.current >= scrollInfo.max - 5
                ? "opacity-0 pointer-events-none"
                : "opacity-0 group-hover/container:opacity-100 hover:scale-110 hover:border-blue-500"
            }`}
          >
            <ChevronRight size={20} className="text-white" />
          </button>

          {/* Премиальные Индикаторы */}
          {scrollInfo.max > 0 && (
            <div className="flex justify-center items-center gap-3 mt-4">
              {allCards.map((_, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      const container = scrollRef.current;
                      const card = container.children[idx];
                      if (card) {
                        container.scrollTo({
                          left:
                            card.offsetLeft -
                            (window.innerWidth < 640 ? 16 : 24),
                          behavior: "smooth",
                        });
                      }
                    }}
                    aria-label={`${t.goToSlide} ${idx + 1}`}
                    className="relative flex items-center justify-center p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full -m-3"
                  >
                    <div
                      className={`rounded-full transition-all duration-500 ${isActive ? "w-8 h-2 bg-transparent" : "w-2 h-2 bg-white/20 hover:bg-white/40"}`}
                    />
                    {isActive && (
                      <motion.div
                        layoutId="activeVideoDot"
                        className="absolute h-2 w-8 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-[0_0_15px_rgba(59,130,246,0.6)]"
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 25,
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Модалка видео */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 40 }}
              className="relative w-full max-w-[400px] aspect-[9/16] bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveVideo(null)}
                aria-label={t.ariaClose}
                className="absolute top-4 right-4 z-10 h-10 w-10 flex items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm"
              >
                <X size={20} />
              </button>
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0`}
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
