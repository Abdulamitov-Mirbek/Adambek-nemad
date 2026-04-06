import React, { useContext } from "react";
import { motion } from "framer-motion";
import { LanguageContext } from "../context/LanguageContext";

const featuredPartners = [
  {
    name: "INSTAGRAM",
    link: "https://www.instagram.com/adambek.neemat",
    icon: "📷",
    gradient: "from-pink-500 via-red-500 to-yellow-500",
  },
  {
    name: "YOUTUBE",
    link: "https://www.youtube.com/@adambek.neemat",
    icon: "▶️",
    gradient: "from-red-600 to-red-700",
  },
];

const content = {
  ru: {
    badge: "ПОДПИСЫВАЙТЕСЬ",
    title: "МЫ В СОЦСЕТЯХ",
    titleGradient: "СЛЕДИТЕ ЗА НАМИ",
    description:
      "Будьте в курсе всех новостей, анонсов и бесплатных материалов",
  },
  kg: {
    badge: "ЖАЗЫЛЫҢЫЗ",
    title: "БИЗ СОЦТАРМАКТАРДА",
    titleGradient: "БИЗДИ КӨЗӨМӨЛДӨҢҮЗ",
    description:
      "Бардык жаңылыктар, анонстор жана акысыз материалдардан кабардар болуңуз",
  },
};

export const FeaturedIn = () => {
  const { language } = useContext(LanguageContext);
  const t = content[language];

  return (
    <section id="press" className="relative py-32 overflow-hidden bg-black">
      {/* Фоновые градиенты */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-20">
        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
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

          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t.description}
          </p>
        </motion.div>

        {/* Социальные сети */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {featuredPartners.map((social, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() =>
                window.open(social.link, "_blank", "noopener,noreferrer")
              }
              whileHover={{
                scale: 1.05,
                y: -5,
              }}
              className="group cursor-pointer"
            >
              <div
                className={`w-40 h-40 md:w-48 md:h-48 rounded-2xl bg-gradient-to-br ${social.gradient} p-[2px] transition-all duration-300 group-hover:shadow-xl`}
              >
                <div className="w-full h-full rounded-2xl bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center gap-3 transition-all duration-300 group-hover:bg-black/70">
                  <span className="text-5xl md:text-6xl">{social.icon}</span>
                  <span
                    className={`text-sm md:text-base font-bold tracking-wider text-white`}
                  >
                    {social.name}
                  </span>
                  <div className="w-8 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Декоративный элемент снизу */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-xs text-gray-500 tracking-wider">
            {language === "ru"
              ? "Присоединяйтесь к нам в соцсетях"
              : "Соцтармактарга кошулуңуз"}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedIn;
