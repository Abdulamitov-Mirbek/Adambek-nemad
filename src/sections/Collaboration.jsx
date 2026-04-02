import React, { useContext } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { LanguageContext } from "../context/LanguageContext";

// Импорты ассетов
import diagonalImg from "../assets/images/Dioganal.jpg";
import electroImg from "../assets/images/Electro.jpg";
import navisImg from "../assets/images/Navis.jpg";
import technoImg from "../assets/images/Techno.jpg";

function InstagramGlyph({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const partners = [
  {
    handle: "@navis.academy",
    url: "https://www.instagram.com/navis.academy/",
    img: navisImg,
    labelRu: "Navis Academy",
    labelKg: "Navis Academy",
    descRu: "IT курсы в Бишкеке.",
    descKg: "Бишкектеги IT курстар.",
  },
  {
    handle: "@diagonal.kg",
    url: "https://www.instagram.com/diagonal.kg/",
    img: diagonalImg,
    labelRu: "Diagonal KG",
    labelKg: "Diagonal KG",
    descRu: "Мужская одежда.",
    descKg: "Эркектердин кийимдери.",
  },
  {
    handle: "@electro.adis",
    url: "https://www.instagram.com/electro.adis/",
    img: electroImg,
    labelRu: "Electro Adis",
    labelKg: "Electro Adis",
    descRu: "Электротехника в КР.",
    descKg: "Электротехника КР.",
  },
  {
    handle: "@techno.adis",
    url: "https://www.instagram.com/techno.adis/",
    img: technoImg,
    labelRu: "Techno Adis",
    labelKg: "Techno Adis",
    descRu: "Бытовая техника.",
    descKg: "Турмуш-тиричилик техникасы.",
  },
];

const content = {
  ru: { kicker: "СОТРУДНИЧЕСТВО", title: "Проекты", cta: "Перейти" },
  kg: { kicker: "КЫЗМАТТАШЫК", title: "Долбоорлор", cta: "Көрүү" },
};

export const Collaboration = () => {
  const { language } = useContext(LanguageContext);
  const t = content[language];

  return (
    <section id="collaboration" className="py-24 bg-white overflow-hidden">
      <div className="container-custom max-w-[1400px] mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[10px] font-black tracking-[0.3em] text-blue-600 uppercase bg-blue-50 px-3 py-1 rounded-full">
            {t.kicker}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-4 tracking-tighter uppercase">
            {t.title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {partners.map((p, index) => (
            <motion.div
              key={p.handle}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                onClick={() => window.open(p.url, "_blank", "noopener,noreferrer")}
                className="group flex w-full flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden text-left"
              >
                {/* ФОТО СВЕРХУ - сделал aspect-[3/4] для еще большей высоты и ширины */}
                <div className="relative aspect-[10/10] overflow-hidden bg-gray-50">
                  <img 
                    src={p.img} 
                    alt={p.handle} 
                    className="w-full h-full object-cover" 
                  />
                </div>

                {/* ТЕКСТ СНИЗУ */}
                <div className="p-6">
                  {/* Иконка инсты теперь здесь, рядом с заголовком */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white shadow-md">
                      <InstagramGlyph className="h-5 w-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-black text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                    {language === "kg" ? p.labelKg : p.labelRu}
                  </h3>
                  <p className="text-[12px] font-mono text-pink-600 font-bold mt-1 mb-3">
                    {p.handle}
                  </p>
                  <p className="text-gray-500 text-xs leading-relaxed mb-6 opacity-80">
                    {language === "kg" ? p.descKg : p.descRu}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">
                      {t.cta}
                    </span>
                    <ExternalLink size={14} className="text-gray-300 group-hover:text-blue-500 transition-colors" />
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collaboration;