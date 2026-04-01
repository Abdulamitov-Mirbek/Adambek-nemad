import React, { useContext } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { LanguageContext } from "../context/LanguageContext";

function InstagramGlyph({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const partners = [
  {
    handle: "@diagonal.kg",
    url: "https://www.instagram.com/diagonal.kg/",
    labelRu: "Diagonal KG",
    labelKg: "Diagonal KG",
  },
  {
    handle: "@asan_mavlonov",
    url: "https://www.instagram.com/asan_mavlonov/",
    labelRu: "Асан Мавлонов",
    labelKg: "Асан Мавлонов",
  },
  {
    handle: "@electro.adis",
    url: "https://www.instagram.com/electro.adis/",
    labelRu: "Electro Adis",
    labelKg: "Electro Adis",
  },
  {
    handle: "@techno.adis",
    url: "https://www.instagram.com/techno.adis/",
    labelRu: "Techno Adis",
    labelKg: "Techno Adis",
  },
  {
    handle: "@electro.adis_osh",
    url: "https://www.instagram.com/electro.adis_osh/",
    labelRu: "Electro Adis — Ош",
    labelKg: "Electro Adis — Ош",
  },
  {
    handle: "@electro.adis_osh_jobs",
    url: "https://www.instagram.com/electro.adis_osh_jobs/",
    labelRu: "Вакансии Electro Adis Ош",
    labelKg: "Electro Adis Ош — вакансиялар",
  },
];

const content = {
  ru: {
    kicker: "СОТРУДНИЧЕСТВО",
    title: "Партнёры и проекты в Instagram",
    lead: "Торговля, электротехника и бренды — официальные страницы для связи, заказов и вакансий. Откройте профиль в новой вкладке.",
    cta: "Открыть в Instagram",
  },
  kg: {
    kicker: "КЫЗМАТТАШЫК",
    title: "Өнөктөштөр жана Instagram долбоорлору",
    lead: "Соода, электротехника жана бренддер — байланыш, заказ жана вакансиялар үчүн расмий баракчалар. Профилди жаңы каалкыда ачыңыз.",
    cta: "Instagram'да ачуу",
  },
};

export const Collaboration = () => {
  const { language } = useContext(LanguageContext);
  const t = content[language];

  const open = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="collaboration"
      className="relative overflow-hidden py-24 md:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-blue-50/40"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-fuchsia-200/30 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-blue-300/25 blur-3xl"
        aria-hidden
      />

      <div className="container-custom relative max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-14 md:mb-16"
        >
          <p className="text-gray-400 text-xs md:text-sm uppercase tracking-[0.35em] mb-4">
            {t.kicker}
          </p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900 mb-4">
            {t.title}
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            {t.lead}
          </p>
        </motion.div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((p, index) => (
            <motion.li
              key={p.handle}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: index * 0.06, duration: 0.45 }}
            >
              <button
                type="button"
                onClick={() => open(p.url)}
                className="group relative flex h-full w-full flex-col rounded-2xl border border-gray-200/80 bg-white/80 p-6 text-left shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-transparent hover:shadow-xl hover:shadow-blue-500/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                <span
                  className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(225,48,108,0.12) 0%, rgba(253,29,29,0.08) 35%, rgba(131,58,180,0.1) 70%, rgba(0,180,255,0.08) 100%)",
                  }}
                  aria-hidden
                />
                <div className="relative flex items-start justify-between gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#bc1888] text-white shadow-md shadow-pink-500/20">
                    <InstagramGlyph className="h-6 w-6" />
                  </div>
                  <ExternalLink className="h-5 w-5 shrink-0 text-gray-300 transition-colors group-hover:text-blue-600" />
                </div>
                <div className="relative mt-5 space-y-1">
                  <p className="text-lg font-bold text-gray-900 group-hover:text-gray-950">
                    {language === "kg" ? p.labelKg : p.labelRu}
                  </p>
                  <p className="font-mono text-sm text-pink-600">{p.handle}</p>
                </div>
                <span className="relative mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-600 opacity-90 transition group-hover:opacity-100">
                  {t.cta}
                  <span className="translate-x-0 transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </span>
              </button>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Collaboration;
