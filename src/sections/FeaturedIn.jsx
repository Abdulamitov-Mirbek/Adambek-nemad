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
    link: "https://wa.me/996704343756",
    class: "font-medium tracking-widest text-green-600",
  }, // Добавили WhatsApp
  {
    name: "TAPLINK",
    link: "https://taplink.cc/zak.0806",
    class: "font-bold italic",
  },
];
const content = {
  ru: { title: "УПОМИНАНИЯ И ПАРТНЕРСТВО" },
  kg: { title: "ШИЛТЕМЕЛЕР ЖАНА ӨНӨКТӨШТӨР" },
};

export const FeaturedIn = () => {
  const { language } = useContext(LanguageContext);
  const t = content[language];

  const handleOpen = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center text-gray-400 text-sm uppercase tracking-[0.4em] mb-12"
        >
          {t.title}
        </motion.p>

        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 grayscale opacity-40 hover:opacity-100 transition-all duration-700">
          {featuredPartners.map((logo, index) => (
            <motion.div
              key={index}
              onClick={() => handleOpen(logo.link)}
              whileHover={{ scale: 1.1, grayscale: 0, opacity: 1 }}
              className={`text-2xl md:text-3xl text-gray-900 cursor-pointer transition-all duration-500 ${logo.class}`}
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
