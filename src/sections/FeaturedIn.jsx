import React, { useContext } from "react";
import { motion } from "framer-motion";
import { LanguageContext } from "../context/LanguageContext";

const featuredPartners = [
  {
    name: "INSTAGRAM",
    link: "https://www.instagram.com/adambek.neemat",
    class: "font-light tracking-[0.3em]",
  },
  {
    name: "YOUTUBE",
    link: "https://www.youtube.com/@adambek.neemat",
    class: "font-semibold",
  },
  {
    name: "WHATSAPP",
    link: "https://wa.me/996704343756?text=Ассаламу%20алайкум!%20Мен%20сайттан%20жазып жатам...",
    class: "font-medium tracking-widest text-green-600",
  }, // Добавили WhatsApp
];
const content = {
  ru: { title: "МЫ В СОЦСЕТЯХ" },
  kg: { title: "БИЗ СОЦТАРМАКТАРДА" },
};

export const FeaturedIn = () => {
  const { language } = useContext(LanguageContext);
  const t = content[language];

  return (
    <section id="press" className="py-16 bg-white border-y border-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-gray-400 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-12"
        >
          {t.title}
        </motion.p>

        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-24 opacity-60 hover:opacity-100 transition-opacity duration-500">
          {featuredPartners.map((logo, index) => (
            <motion.div
              key={index}
              onClick={() => window.open(logo.link, "_blank", "noopener,noreferrer")}
              whileHover={{ 
                scale: 1.05, 
                color: logo.name === "WHATSAPP" ? "#16a34a" : "#000" 
              }}
              className={`text-xl md:text-2xl text-gray-900 cursor-pointer transition-all duration-300 ${logo.class}`}
            >
              {logo.name}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedIn;
