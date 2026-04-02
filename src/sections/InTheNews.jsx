// src/sections/InTheNews.jsx
import React, { useContext, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Play, X, Maximize2, Clock, Calendar } from "lucide-react";
import { LanguageContext } from "../context/LanguageContext";

// Video data with more details
const videos = [
  {
    url: "https://www.youtube.com/watch?v=P9iC49k2Q80",
    duration: "14:12",
    date: "2024-03-01",
    views: "1.3K",
    customThumb: null, // Use default YouTube thumbnail
    title: {
      kg: "Адамбек Нээмат: Банкрот болгон ишкер",
      ru: "Адамбек Нээмат: Предприниматель, который банкротился",
    },
    description: {
      kg: "16 бизнес долбоордун автору ийгиликтер жана кемчиликтер жөнүндө айтып берет",
      ru: "Автор 16 бизнес-проектов рассказывает об успехах и неудачах",
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
    url: "https://www.youtube.com/watch?v=crIz4zyNaww",
    duration: "25:30",
    date: "2023-10-11",
    views: "423",
    // Custom thumbnail for third video
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
];

function getVideoId(url) {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) {
      return u.pathname.replace("/", "");
    }
    if (u.searchParams.has("v")) {
      return u.searchParams.get("v");
    }
    return "";
  } catch {
    return "";
  }
}

function getThumbCandidates(id, customThumb) {
  if (customThumb) return [customThumb];
  if (!id) return [];
  return [
    `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
    `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
    `https://img.youtube.com/vi/${id}/mqdefault.jpg`,
  ];
}

const content = {
  ru: {
    kicker: "ЭКСКЛЮЗИВНЫЕ ИНТЕРВЬЮ",
    title: "Адамбек Нээмат",
    lead: "Откровенные разговоры о бизнесе, успехе и жизни. Нажмите на карточку, чтобы посмотреть видео.",
    watchNow: "Смотреть сейчас",
    views: "просмотров",
    moreVideos: "Больше видео",
  },
  kg: {
    kicker: "ЭКСКЛЮЗИВДҮҮ МАЕКТЕР",
    title: "Адамбек Нээмат",
    lead: "Бизнес, ийгилик жана жашоо жөнүндө ачык маектер. Карточканы басып, көрүңүз.",
    watchNow: "Азыр көрүү",
    views: "көрүү",
    moreVideos: "Дагы видео",
  },
};

const VideoCard = ({ v, idx, language, onOpen }) => {
  const thumbCandidates = v.thumbCandidates || [];
  const [thumbIndex, setThumbIndex] = useState(0);
  const [imgError, setImgError] = useState(false);

  const thumb = (!imgError && thumbCandidates[thumbIndex]) || "";
  const title = v.title[language];
  const description = v.description[language];

  const handleError = () => {
    if (thumbIndex < thumbCandidates.length - 1) {
      setThumbIndex((prev) => prev + 1);
    } else {
      setImgError(true);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(language === "kg" ? "ky" : "ru", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1, duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="group cursor-pointer flex-shrink-0"
      onClick={() => onOpen(v)}
    >
      <div className="relative w-[380px] lg:w-[420px] bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20">
        {/* Image Container */}
        <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
          {thumb && !imgError ? (
            <img
              src={thumb}
              onError={handleError}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <Play className="w-16 h-16 text-white/30" />
            </div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Duration Badge */}
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg">
            <Clock className="w-3 h-3 text-white" />
            <span className="text-xs font-medium text-white">{v.duration}</span>
          </div>

          {/* Views Badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg">
            <span className="text-xs font-medium text-white">
              {v.views} {content[language].views}
            </span>
          </div>

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <div className="absolute inset-0 rounded-full bg-white/20 animate-ping" />
              <div className="relative w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                <Play className="w-10 h-10 text-white ml-1" fill="white" />
              </div>
            </motion.div>
          </div>

          {/* Date Badge Bottom */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg">
            <Calendar className="w-3 h-3 text-white" />
            <span className="text-xs font-medium text-white">
              {formatDate(v.date)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 bg-white">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2 mb-4">
            {description}
          </p>

          {/* Watch Button */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <span className="text-sm font-medium text-blue-600 group-hover:text-blue-700 transition-colors">
              {content[language].watchNow}
            </span>
            <motion.div
              whileHover={{ x: 5 }}
              className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors"
            >
              <Play className="w-4 h-4 text-blue-600 ml-0.5" fill="blue" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Video Modal Component
const VideoModal = ({ video, onClose, language }) => {
  if (!video) return null;

  const videoId = getVideoId(video.url);
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&showinfo=0`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-6xl bg-black rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 z-20 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-all duration-300 backdrop-blur-sm"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Fullscreen Button */}
        <button
          onClick={() => {
            const iframe = document.querySelector(".video-iframe");
            if (iframe && iframe.requestFullscreen) {
              iframe.requestFullscreen();
            }
          }}
          className="absolute top-4 right-16 text-white hover:text-gray-300 z-20 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-all duration-300 backdrop-blur-sm"
        >
          <Maximize2 className="h-5 w-5" />
        </button>

        {/* Video Title */}
        <div className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/60 to-transparent z-10">
          <h3 className="text-white text-2xl font-bold">
            {video.title[language]}
          </h3>
          <p className="text-gray-300 text-sm mt-1">
            {video.description[language]}
          </p>
        </div>

        {/* YouTube Embed */}
        <div className="aspect-video">
          <iframe
            src={embedUrl}
            title={video.title[language]}
            className="video-iframe w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
          ></iframe>
        </div>

        {/* Video Info Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent z-10">
          <div className="flex items-center gap-4 text-white/80 text-sm">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {video.duration}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(video.date).toLocaleDateString(
                language === "kg" ? "ky" : "ru",
              )}
            </span>
            <span>
              {video.views} {content[language].views}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const InTheNews = () => {
  const { language } = useContext(LanguageContext);
  const t = content[language];
  const [selectedVideo, setSelectedVideo] = useState(null);

  const cards = useMemo(
    () =>
      videos.map((video) => {
        const id = getVideoId(video.url);
        return {
          ...video,
          id,
          thumbCandidates: getThumbCandidates(id, video.customThumb),
        };
      }),
    [],
  );

  return (
    <>
      <section
        id="press"
        className="scroll-mt-24 py-20 md:py-32 bg-gradient-to-b from-white to-gray-50 overflow-hidden"
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 max-w-7xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-sm font-semibold text-blue-700 tracking-wide">
                {t.kicker}
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">
              {t.title}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {language === "kg" ? "МАЕКТЕР" : "ИНТЕРВЬЮ"}
              </span>
            </h2>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t.lead}</p>
          </motion.div>

          {/* Horizontal Scrollable Row - No white space */}
          <div className="relative max-w-full overflow-hidden">
            {/* Scrollable Container */}
            <div className="overflow-x-auto pb-6 scrollbar-custom px-4">
              <div
                className="flex gap-8 min-w-max"
                style={{
                  paddingLeft: "calc((100% - 1400px) / 2)",
                  paddingRight: "calc((100% - 1400px) / 2)",
                }}
              >
                {cards.map((v, idx) => (
                  <VideoCard
                    key={v.url}
                    v={v}
                    idx={idx}
                    language={language}
                    onOpen={setSelectedVideo}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Scroll Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-center mt-8"
          >
            <p className="text-sm text-gray-400 flex items-center justify-center gap-2">
              <span>←</span>
              <span>
                {language === "kg" ? "Жылдыруу үчүн" : "Листайте для просмотра"}
              </span>
              <span>→</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Video Modal */}
      <VideoModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
        language={language}
      />

      {/* Исправленный блок стилей без атрибута jsx */}
      <style>{`
        .scrollbar-custom::-webkit-scrollbar {
          height: 6px;
        }
        .scrollbar-custom::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .scrollbar-custom::-webkit-scrollbar-thumb {
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          border-radius: 10px;
        }
        /* Tailwind уже имеет класс line-clamp-2, но если версия старая, оставим этот фикс */
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
};

export default InTheNews;
