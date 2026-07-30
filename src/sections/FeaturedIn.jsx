import React, { useContext } from "react";
import { motion } from "framer-motion";
import { FaYoutube, FaTelegramPlane } from "react-icons/fa";
import { LanguageContext } from "../context/LanguageContext";

// Кастомная иконка Instagram для соответствия стилю Lucide
const InstagramIcon = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const featuredPartners = [
  {
    name: "INSTAGRAM",
    link: "https://www.instagram.com/adambek.neemat",
    icon: <InstagramIcon size={32} />,
    gradient: "from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]",
    hoverColor: "group-hover:text-[#ee2a7b]",
  },
  {
    name: "YOUTUBE",
    link: "https://www.youtube.com/@adambek.neemat",
    icon: <FaYoutube size={32} />,
    gradient: "from-[#FF0000] to-[#cc0000]",
    hoverColor: "group-hover:text-[#FF0000]",
  },
  {
    name: "TELEGRAM",
    link: "https://t.me/adambek_neemat",
    icon: <FaTelegramPlane size={32} />,
    gradient: "from-[#0088cc] to-[#005f8a]",
    hoverColor: "group-hover:text-[#0088cc]",
  },
];

const content = {
  ru: {
    badge: "ПОДПИСЫВАЙТЕСЬ",
    title: "Больше пользы —",
    titleGradient: "в моих социальных сетях",
    description:
      "Здесь вы найдете реальные кейсы, современные техники продаж, советы по развитию бизнеса, мотивацию и ответы на самые частые вопросы предпринимателей.",
    footerText: "Присоединяйтесь к нам в соцсетях",
  },
  kg: {
    badge: "ЖАЗЫЛЫҢЫЗ",
    title: "Көбүрөөк пайда —",
    titleGradient: "менин социалдык тармактарымда",
    description:
      "Бул жерде сиз реалдуу кейстер, заманбап сатуу техникалары, бизнести өнүктүрүү боюнча кеңештер, мотивация жана ишкерлердин эң көп берилүүчү суроолоруна жоопторду таба аласыз.",
    footerText: "Соцтармактарга кошулуңуз",
  },
};

export const FeaturedIn = () => {
  const { language } = useContext(LanguageContext);
  const t = content[language];

  return (
    <section
      id="press"
      className="relative py-20 sm:py-32 overflow-hidden bg-black"
    >
      {/* Фоновые градиенты */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 mb-4 sm:mb-6 border border-white/10 bg-white/5 backdrop-blur-md rounded-full">
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-blue-400">
              {t.badge}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 sm:mb-4 tracking-tighter leading-[1.2]">
            {t.title}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 whitespace-nowrap sm:whitespace-normal inline-block">
              {t.titleGradient}
            </span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-white/100 max-w-2xl mx-auto italic px-2">
            {t.description}
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center items-center gap-5 sm:gap-8 md:gap-12">
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
              whileHover={{ scale: 1.05, y: -5 }}
              className="group cursor-pointer"
            >
              <div
                className={`w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${social.gradient} p-[2px] transition-all duration-500 group-hover:shadow-[0_0_40px_-10px] group-hover:shadow-current`}
                style={{
                  color:
                    social.name === "YOUTUBE"
                      ? "#FF0000"
                      : social.name === "TELEGRAM"
                      ? "#0088cc"
                      : "#ee2a7b",
                }}
              >
                <div className="relative w-full h-full rounded-[20px] sm:rounded-[22px] bg-[#0a0a0a] flex flex-col items-center justify-center gap-2 sm:gap-4 transition-all duration-500">
                  {/* Добавляем легкое свечение внутри в статике */}
                  <div
                    className={`absolute inset-0 opacity-5 bg-gradient-to-br ${social.gradient}`}
                  />

                  {/* Слой полной заливки при ховере */}
                  <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-100 rounded-2xl sm:rounded-3xl transition-opacity duration-500 bg-gradient-to-br ${social.gradient}`}
                  />

                  {/* Контент */}
                  <div className="relative z-10 flex flex-col items-center gap-2 sm:gap-4">
                    <div className="text-white transition-transform duration-300 group-hover:scale-110">
                      {social.icon}
                    </div>
                    <span className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-black tracking-[0.15em] sm:tracking-[0.2em] text-white uppercase">
                      {social.name}
                    </span>
                    <div className="w-6 sm:w-10 h-[1px] bg-white/20 group-hover:bg-white/60 transition-colors" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 sm:mt-20"
        >
          <p className="text-[8px] sm:text-[10px] text-white/100 uppercase tracking-[0.2em] sm:tracking-[0.3em] font-medium">
            {t.footerText}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedIn;
