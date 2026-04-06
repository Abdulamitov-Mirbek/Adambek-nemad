import React, { useContext, useMemo, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react"; 
import { LanguageContext } from "../context/LanguageContext";

const videos = [
  "https://www.youtube.com/shorts/OfMA-QJzG6A",
  "https://youtu.be/of-JJl9Yauc",
  "https://www.youtube.com/shorts/bCFWI_acscM",
  "https://www.youtube.com/shorts/4b_HxfcT2nE",
  "https://www.youtube.com/shorts/N6Z8TlRiVsY",
  "https://www.youtube.com/shorts/yMrsSJkQhWE",
];

function getVideoId(url) {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) return u.pathname.replace("/", "");
    const parts = u.pathname.split("/").filter(Boolean);
    const idx = parts.indexOf("shorts");
    if (idx !== -1 && parts[idx + 1]) return parts[idx + 1];
    if (u.searchParams.get("v")) return u.searchParams.get("v");
    return "";
  } catch { return ""; }
}

function getThumbCandidates(id) {
  if (!id) return [];
  return [
    `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
    `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
  ];
}

const content = {
  ru: {
    kicker: "ОТЗЫВЫ",
    title: "Видео-отзывы",
    lead: "Нажмите на карточку, чтобы запустить плеер.",
  },
  kg: {
    kicker: "ПИКИРЛЕР",
    title: "Видео-пикирлер",
    lead: "Плеерди иштетүү үчүн карточканы басыңыз.",
  },
};

export const VideoLibrary = () => {
  const { language } = useContext(LanguageContext);
  const t = content[language];
  const [activeVideo, setActiveVideo] = useState(null);
  
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollInfo, setScrollInfo] = useState({ current: 0, max: 0 });

  const cards = useMemo(() =>
    videos.map((url) => {
      const id = getVideoId(url);
      return { url, id, thumbCandidates: getThumbCandidates(id) };
    }), []
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
    <section  className="scroll-mt-24 py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        <motion.div
        id="videos"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-blue-100 bg-blue-50 px-6 py-2 text-xs font-bold tracking-[0.2em] text-blue-700 uppercase">
            {t.kicker}
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 mb-6 uppercase">
            {t.title}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed opacity-80">{t.lead}</p>
        </motion.div>

        <div  className="relative group/container">
          {/* Стрелка Влево - видна на десктопах при ховере */}
          <button
            onClick={() => scroll("left")}
            className={`absolute -left-4 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-3 shadow-xl transition-all duration-300 hidden md:flex items-center justify-center hover:bg-blue-600 hover:text-white ${
                scrollInfo.current <= 5 ? "opacity-0 pointer-events-none" : "opacity-0 group-hover/container:opacity-100"
            }`}
          >
            <ChevronLeft size={24} />
          </button>

          {/* Список видео */}
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-10 scroll-smooth snap-x snap-mandatory no-scrollbar relative z-0"
          >
            {cards.map((v, idx) => (
              <motion.div
                key={v.id}
                className="min-w-[280px] md:min-w-[320px] snap-center"
                whileHover={{ y: -8 }}
                onClick={() => setActiveVideo(v.id)}
              >
                <div className="group relative aspect-[9/16] cursor-pointer overflow-hidden rounded-[2.5rem] bg-gray-100 border-[6px] border-white shadow-xl transition-all hover:shadow-blue-200">
                  <img
                    src={v.thumbCandidates[0]}
                    alt="Preview"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-16 w-16 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 group-hover:scale-120 transition-transform">
                      <Play className="h-8 w-8 text-white fill-current" />
                    </div>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                     <p className="text-white font-bold tracking-wide uppercase text-xs opacity-80 mb-1">{t.kicker} {idx + 1}</p>
                     <div className="h-1 w-12 bg-blue-500 rounded-full" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Стрелка Вправо - видна на десктопах при ховере */}
          <button
            onClick={() => scroll("right")}
            className={`absolute -right-4 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-3 shadow-xl transition-all duration-300 hidden md:flex items-center justify-center hover:bg-blue-600 hover:text-white ${
                scrollInfo.current >= scrollInfo.max - 5 ? "opacity-0 pointer-events-none" : "opacity-0 group-hover/container:opacity-100"
            }`}
          >
            <ChevronRight size={24} />
          </button>

          {/* Точки (Pagination) - всегда видны, если контента много */}
          {scrollInfo.max > 0 && (
            <div className="flex justify-center gap-2 mt-4">
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

      {/* MODAL PLAYER */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 40 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 40 }}
              className="relative w-full max-w-[400px] aspect-[9/16] bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 z-10 h-10 w-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                <X size={24} />
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