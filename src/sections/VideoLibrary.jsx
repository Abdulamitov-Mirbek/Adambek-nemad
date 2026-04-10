import React, { useContext, useMemo, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";
import { LanguageContext } from "../context/LanguageContext";

const videos = [
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
    // Очищаем URL от параметров типа ?si=...
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
  // Порядок важен: сначала пробуем Максимум, потом Высокое
  return [
    `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`, // Максимальное (пробуем первым)
    `https://i.ytimg.com/vi/${id}/hqdefault.jpg`, // Высокое ( fallback №1, обычно самое сочное для Shorts)
    `https://i.ytimg.com/vi/${id}/sddefault.jpg`, // Стандартное (fallback №2)
    `https://i.ytimg.com/vi/${id}/mqdefault.jpg`, // Среднее (fallback №3)
  ];
}

const content = {
  ru: {
    badge: "ВИДЕОКОНТЕНТ",
    title: "ВИДЕО-ОТЗЫВЫ",
    titleGradient: "КЛИЕНТОВ",
    lead: "Реальные истории успеха наших учеников. Нажмите на карточку, чтобы запустить видео.",
  },
  kg: {
    badge: "ВИДЕОКОНТЕНТ",
    title: "ВИДЕО-ПИКИРЛЕР",
    titleGradient: "КЛИЕНТТЕРДИН",
    lead: "Окуучуларыбыздын чыныгы ийгилик тарыхтары. Видеону көрүү үчүн карточканы басыңыз.",
  },
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
      const cardWidth = 280 + 24;
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
      const cardWidth = 320 + 24;
      const amount = direction === "left" ? -cardWidth : cardWidth;
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <section
      id="videos"
      className="relative py-32 overflow-hidden bg-black scroll-mt-24"
    >
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-20">
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

          <h2 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tighter">
            {t.title}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              {t.titleGradient}
            </span>
          </h2>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto">{t.lead}</p>
        </motion.div>

        <div className="relative group/container">
          <button
            onClick={() => scroll("left")}
            className={`absolute -left-4 top-1/2 -translate-y-1/2 z-20 bg-black/80 backdrop-blur-md border border-white/10 rounded-full p-3 shadow-xl transition-all duration-300 hidden lg:flex items-center justify-center hover:bg-black/100 hover:scale-110 hover:border-blue-500/50 ${
              scrollInfo.current <= 5
                ? "opacity-0 pointer-events-none"
                : "opacity-0 group-hover/container:opacity-100"
            }`}
          >
            <ChevronLeft size={20} className="text-white" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-10 scroll-smooth snap-x snap-mandatory no-scrollbar relative z-0"
          >
            {cards.map((v, idx) => (
              <motion.div
                key={`${v.id}-${idx}`}
                className="min-w-[280px] md:min-w-[320px] snap-center"
                whileHover={{ y: -8 }}
                onClick={() => setActiveVideo(v.id)}
              >
                <div className="group relative aspect-[9/16] cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-gray-800 to-gray-900 shadow-xl transition-all duration-500 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/20">
                  <img
                    src={v.thumbCandidates[0]} // Всегда пробуем maxresdefault
                    alt="Preview"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onLoad={(e) => {
                      // Если YouTube отдал "битую" заглушку (маленькая ширина 120px)
                      if (e.target.naturalWidth === 120) {
                        // Ищем текущую ссылку в списке кандидатов
                        const currentSrc = e.target.src;
                        const idx = v.thumbCandidates.indexOf(currentSrc);

                        // Если есть куда падать по качеству, падаем
                        if (idx !== -1 && idx < v.thumbCandidates.length - 1) {
                          e.target.src = v.thumbCandidates[idx + 1];
                        }
                      }
                    }}
                    onError={(e) => {
                      // Если ссылка вообще не открылась (404), делаем то же самое
                      const currentSrc = e.target.src;
                      const idx = v.thumbCandidates.indexOf(currentSrc);
                      if (idx !== -1 && idx < v.thumbCandidates.length - 1) {
                        e.target.src = v.thumbCandidates[idx + 1];
                      } else {
                        // Если совсем всё плохо, ставим темный фон
                        e.target.src =
                          "https://via.placeholder.com/360x640/0f0f0f/0f0f0f";
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-white/20 animate-ping" />
                      <div className="relative h-16 w-16 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="h-8 w-8 text-white fill-current ml-1" />
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-white font-bold tracking-wide text-xs opacity-80 mb-1">
                      {language === "kg" ? "ПИКИР" : "ОТЗЫВ"} {idx + 1}
                    </p>
                    <div className="h-0.5 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className={`absolute -right-4 top-1/2 -translate-y-1/2 z-20 bg-black/80 backdrop-blur-md border border-white/10 rounded-full p-3 shadow-xl transition-all duration-300 hidden lg:flex items-center justify-center hover:bg-black/100 hover:scale-110 hover:border-blue-500/50 ${
              scrollInfo.current >= scrollInfo.max - 5
                ? "opacity-0 pointer-events-none"
                : "opacity-0 group-hover/container:opacity-100"
            }`}
          >
            <ChevronRight size={20} className="text-white" />
          </button>

          {scrollInfo.max > 0 && (
            <div className="flex justify-center gap-2 mt-6">
              {cards.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeIndex === idx
                      ? "w-8 bg-gradient-to-r from-blue-500 to-purple-500"
                      : "w-1.5 bg-white/20"
                  }`}
                />
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
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 40 }}
              className="relative w-full max-w-[400px] aspect-[9/16] bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl overflow-hidden shadow-2xl border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 z-10 h-10 w-10 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors backdrop-blur-sm"
              >
                <X size={20} />
              </button>
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0`}
                title="YouTube Video"
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
