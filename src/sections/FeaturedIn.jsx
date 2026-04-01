import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { LanguageContext } from '../context/LanguageContext';

const featuredPartners = [
  { name: 'INSTAGRAM', link: 'https://www.instagram.com/adambek.neemat?igsh=MW9uaWpiOXR4MDJjNQ==', class: 'font-light tracking-[0.3em]' },
  { name: 'YOUTUBE', link: 'https://www.youtube.com/@adambek.neemat', class: 'font-semibold' },
  { name: 'TELEGRAM', link: 'https://t.me/adambekneemat', class: 'font-medium' },
  { name: 'TAPLINK', link: 'https://taplink.cc/zak.0806', class: 'font-bold italic' }
];
const content = {
  ru: { title: "УПОМИНАНИЯ И ПАРТНЕРСТВО" },
  kg: { title: "ШИЛТЕМЕЛЕР ЖАНА ӨНӨКТӨШТӨР" }
};

export const FeaturedIn = () => {
  const { language } = useContext(LanguageContext);
  const t = content[language];

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
            onClick={() => window.open(logo.link, "_blank")}
              key={index} 
              whileHover={{ scale: 1.1, grayscale: 0 }}
              className={`text-2xl md:text-3xl text-gray-900 cursor-default ${logo.class}`}
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