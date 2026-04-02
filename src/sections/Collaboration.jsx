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
    descRu:
      "Магазин стильной мужской одежды в Бишкеке. Современный крой и качество.",
    descKg:
      "Бишкектеги стилдүү эркектердин кийим дүкөнү. Заманбап стиль жана сапат.",
  },

  {
    handle: "@electro.adis",
    url: "https://www.instagram.com/electro.adis/",
    labelRu: "Electro Adis",
    labelKg: "Electro Adis",
    descRu:
      "Лидер на рынке электротехники и профессионального оборудования в КР.",
    descKg:
      "Кыргызстандагы электротехника жана кесипкөй жабдуулар рыногунун лидери.",
  },
  {
    handle: "@techno.adis",
    url: "https://www.instagram.com/techno.adis/",
    labelRu: "Techno Adis",
    labelKg: "Techno Adis",
    descRu:
      "Инновационные решения в сфере бытовой и специализированной техники.",
    descKg:
      "Турмуш-тиричилик жана адистештирилген техникадагы инновациялык чечимдер.",
  },
  {
    handle: "@electro.adis_osh_jobs",
    url: "https://www.instagram.com/electro.adis_osh_jobs/",
    labelRu: "Вакансии Electro Adis",
    labelKg: "Electro Adis — вакансиялар",
    descRu: "Стань частью команды лидера. Актуальные вакансии и карьера в Оше.",
    descKg: "Лидердин командасына кошулуңуз. Оштогу актуалдуу вакансиялар.",
  },
];

const content = {
  ru: {
    kicker: "СОТРУДНИЧЕСТВО",
    title: "Проекты",
    lead: "Торговля, электротехника и личные бренды — экосистема проектов Адамбека Немата.",
    cta: "Открыть в Instagram",
  },
  kg: {
    kicker: "КЫЗМАТТАШЫК",
    title: "Долбоорлор",
    lead: "Соода, электротехника жана жеке бренддер — Адамбек Нээматтын долбоорлор экосистемасы.",
    cta: "Instagram'да ачуу",
  },
};

export const Collaboration = () => {
  const { language } = useContext(LanguageContext);
  const t = content[language];

  return (
    <section
      id="collaboration"
      className="relative overflow-hidden py-24 bg-white"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 via-white to-white pointer-events-none" />
      <div className="absolute -left-24 top-0 h-96 w-96 rounded-full bg-blue-50 blur-3xl opacity-50" />

      <div className="container-custom relative max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-blue-600 text-xs font-bold uppercase tracking-[0.3em] mb-4">
            {t.kicker}
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
            {t.title}
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed italic opacity-80">
            {t.lead}
          </p>
        </motion.div>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((p, index) => (
            <motion.li
              key={p.handle}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                type="button"
                onClick={() =>
                  window.open(p.url, "_blank", "noopener,noreferrer")
                }
                className="group relative flex h-full min-h-[220px] w-full flex-col rounded-[2rem] border border-gray-100 bg-white p-8 text-left shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2"
              >
                {/* Инста-эффект при наведении */}
                <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-orange-500/5 via-pink-500/5 to-purple-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative flex items-center justify-between mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white shadow-lg">
                    <InstagramGlyph className="h-6 w-6" />
                  </div>
                  <ExternalLink className="h-5 w-5 text-gray-300 group-hover:text-blue-500 transition-colors" />
                </div>

                <div className="relative flex-grow">
                  <h3 className="text-xl font-black text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {language === "kg" ? p.labelKg : p.labelRu}
                  </h3>
                  <p className="font-mono text-sm text-pink-600 mb-3">
                    {p.handle}
                  </p>
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
                    {language === "kg" ? p.descKg : p.descRu}
                  </p>
                </div>

                <div className="relative mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-blue-600 transition-colors">
                  {t.cta} <span>→</span>
                </div>
              </button>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Collaboration;
