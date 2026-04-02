import React, { useContext, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { LanguageContext } from "../context/LanguageContext";

const videos = [
  "https://www.youtube.com/shorts/OfMA-QJzG6A?feature=share",
  "https://youtu.be/of-JJl9Yauc",
  "https://www.youtube.com/shorts/bCFWI_acscM?feature=share",
  "https://www.youtube.com/shorts/4b_HxfcT2nE?feature=share",
  "https://www.youtube.com/shorts/N6Z8TlRiVsY?feature=share",
  "https://www.youtube.com/shorts/yMrsSJkQhWE?feature=share",
];

function getVideoId(url) {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) {
      return u.pathname.replace("/", "");
    }
    const parts = u.pathname.split("/").filter(Boolean); // e.g. ["shorts","OfMA-QJzG6A"]
    const idx = parts.indexOf("shorts");
    if (idx !== -1 && parts[idx + 1]) return parts[idx + 1];
    return "";
  } catch {
    return "";
  }
}

function getThumbCandidates(id) {
  if (!id) return [];
  // Try best quality first; if the URL doesn't exist, fall back to the next.
  return [
    `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
    `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
    `https://img.youtube.com/vi/${id}/mqdefault.jpg`,
  ];
}

const content = {
  ru: {
    kicker: "ОТЗЫВЫ",
    title: "Отзывы",
    lead:
      "Короткие видео-отзывы о бизнесе, продажах и практике. Нажмите на карточку, чтобы открыть на YouTube.",
  },
  kg: {
    kicker: "ПИКИРЛЕР",
    title: "Пикирлер",
    lead:
      "Бизнес, сатуу жана практика боюнча кыска видео-пикирлер. Карточканы басып, YouTube'тан ачыңыз.",
  },
};

const VideoCard = ({ v, idx, language }) => {
  const thumbCandidates = v.thumbCandidates || [];
  const [thumbIndex, setThumbIndex] = useState(0);

  const thumb = thumbCandidates[thumbIndex] || "";

  const handleError = () => {
    setThumbIndex((i) => Math.min(i + 1, Math.max(thumbCandidates.length - 1, 0)));
  };

  return (
    <a
      href={v.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
    >
      <div className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl">
        {thumb ? (
          <img
            src={thumb}
            onError={handleError}
            alt={`YouTube Shorts ${idx + 1}`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-gray-100 to-blue-50" />
        )}

        {/* Top gradient */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"
          aria-hidden
        />

        {/* “ОТЗЫВЫ” badge */}
        <div className="absolute left-3 top-3 inline-flex items-center rounded-full bg-black/40 px-3 py-1 text-[10px] font-bold tracking-widest text-white backdrop-blur-sm">
          {language === "kg" ? "ПИКИР" : "ОТЗЫВ"}
        </div>

        {/* Play overlay */}
        <div className="absolute inset-0 grid place-items-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-md ring-1 ring-white/20 transition-all group-hover:bg-white/15">
            <Play className="h-7 w-7 text-white" strokeWidth={2.5} />
          </div>
        </div>

        {/* Bottom text */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="text-sm font-semibold text-white">
            {language === "kg" ? `Пикир ${idx + 1}` : `Отзыв ${idx + 1}`}
          </p>
          <p className="mt-1 text-xs text-white/80">
            {language === "kg" ? "YouTube'тан көрүү" : "Смотреть на YouTube"}
          </p>
        </div>
      </div>
    </a>
  );
};

export const VideoLibrary = () => {
  const { language } = useContext(LanguageContext);
  const t = content[language];

  const cards = useMemo(
    () =>
      videos.map((url) => {
        const id = getVideoId(url);
        return {
          url,
          id,
          thumbCandidates: getThumbCandidates(id),
        };
      }),
    [],
  );

  return (
    <section
      id="videos"
      className="section-padding bg-white overflow-hidden"
    >
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-blue-100 bg-blue-50/60 px-5 py-2 text-xs font-bold tracking-[0.25em] text-blue-700">
            <span className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600" />
            {t.kicker}
          </div>
          <h2 className="text-3xl font-black tracking-tight text-gray-900 md:text-4xl">
            {t.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-600 md:text-lg">
            {t.lead}
          </p>
        </motion.div>

        {/* One horizontal row (scrollable) */}
        <ul className="flex gap-6 overflow-x-auto pb-2 scroll-smooth snap-x snap-mandatory">
          {cards.map((v, idx) => (
            <motion.li
              key={v.url}
              className="min-w-[280px] sm:min-w-[320px] lg:min-w-[360px] snap-start"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: idx * 0.05, duration: 0.45 }}
            >
              <VideoCard v={v} idx={idx} language={language} />
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default VideoLibrary;

