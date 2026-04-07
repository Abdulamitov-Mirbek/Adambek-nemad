import React, { useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LanguageContext } from "../context/LanguageContext";

import adambekPhoto1 from "../assets/images/Photo.jpg";
import adambekPhoto2 from "../assets/images/Photo (2).jpg";
import adambekPhoto3 from "../assets/images/Photo (3).jpg";

const photos = [adambekPhoto1, adambekPhoto2, adambekPhoto3];

const content = {
  ru: {
    badge: "ОБО МНЕ",
    title: "АДАМБЕК",
    titleGradient: "НЭЭМАТ",
    description1:
      "Я учу людей приносить пользу через искусство продаж и развивать бизнес честным (адал) путем. Моя цель — раскрыть ваш потенциал и системно увеличить ваш доход.",
    description2:
      "За 17 лет я превратил тысячи людей в профессиональных продавцов. Я прошел путь от обычных рынков до работы с крупнейшими компаниями, собирая только работающие инструменты.",
    description3:
      "Мой подход — это не сухая теория. Это сочетание психологии и техники, где клиент не чувствует давления, а сам хочет совершить покупку.",
    statsTitle: "В цифрах:",
    stat1: "17 лет опыта",
    stat2: "1000+ учеников",
    stat3: "90% результат",
    button: "Узнать больше",
  },
  kg: {
    badge: "БИЗ ЖӨНҮНДӨ",
    title: "АДАМБЕК",
    titleGradient: "НЭЭМАТ",
    description1:
      "Сатуу өнөрү аркылуу адамдарга пайда алып келүүүнү жана бизнести адал жол менен өстүрүүнү үйрөтөм. Менин максатым — сиздин потенциалыңызды ачуу.",
    description2:
      "Мен — Адамбек Нээмат, 17 жыл ичинде миңдеген адамды профессионал сатуучуга айландырдым. Сиздин да бизнесиңизди жаңы деңгээлге чыгарууга убакыт келди!",
    description3:
      "Мен базардан баштап ири компанияларга чейинки басып өткөн жолумдагы эң иштеген инструменттерди берем. Бул теория эмес, таза практика.",
    statsTitle: "Сандар менен:",
    stat1: "17 жыл тажрыйба",
    stat2: "1000+ окуучу",
    stat3: "90% жыйынтык",
    button: "Көбүрөөк билүү",
  },
};

export const About = () => {
  const { language } = useContext(LanguageContext);
  const t = content[language];

  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhotoIndex((prevIndex) =>
        prevIndex === photos.length - 1 ? 0 : prevIndex + 1,
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="relative py-32 overflow-hidden bg-black">
      {/* Фоновые градиенты */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      <div className="container-custom max-w-6xl mx-auto px-6 relative z-20">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          {/* Левая колонка - фото */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 relative"
          >
            <div className="relative aspect-[4/5] bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentPhotoIndex}
                  src={photos[currentPhotoIndex]}
                  alt="Адамбек Нээмат"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
              </AnimatePresence>

              {/* Градиентная накладка */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />

              {/* Индикатор слайдов */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
                {photos.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPhotoIndex(idx)}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      currentPhotoIndex === idx
                        ? "w-8 bg-white"
                        : "w-2 bg-white/50 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Декоративный элемент - ИЗМЕНЕНО с 10 на 17 */}
            <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl hidden md:block shadow-xl z-20">
              <p className="text-5xl font-black italic">17</p>
              <p className="text-xs uppercase tracking-widest opacity-90">
                {language === "ru" ? "Лет в бизнесе" : "Жыл бизнесте"}
              </p>
            </div>
          </motion.div>

          {/* Правая колонка - текст */}
          <div className="w-full md:w-1/2">
            {/* Бейдж */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 mb-6 border border-white/10 bg-white/5 backdrop-blur-md rounded-full"
            >
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-blue-400">
                {t.badge}
              </span>
            </motion.div>

            {/* Заголовок */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-black mb-6 leading-tight text-white"
            >
              {t.title}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                {t.titleGradient}
              </span>
            </motion.h2>

            {/* Текст */}
            <div className="space-y-5 text-gray-300 text-lg leading-relaxed">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {t.description1}
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="font-medium text-white border-l-4 border-blue-500 pl-4 bg-gradient-to-r from-blue-500/10 to-transparent py-2 rounded-r-lg"
              >
                {t.description2}
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {t.description3}
              </motion.p>
            </div>

            {/* Статистика */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12 grid grid-cols-3 gap-4 border-t border-white/10 pt-8"
            >
              <div className="text-center">
                <p className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  {t.stat1.split(" ")[0]}
                </p>
                <p className="text-[10px] uppercase text-gray-500 tracking-tight mt-1">
                  {t.stat1.split(" ").slice(1).join(" ")}
                </p>
              </div>
              <div className="text-center border-x border-white/10 px-4">
                <p className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  {t.stat2.split(" ")[0]}
                </p>
                <p className="text-[10px] uppercase text-gray-500 tracking-tight mt-1">
                  {t.stat2.split(" ").slice(1).join(" ")}
                </p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  {t.stat3.split(" ")[0]}
                </p>
                <p className="text-[10px] uppercase text-gray-500 tracking-tight mt-1">
                  {t.stat3.split(" ").slice(1).join(" ")}
                </p>
              </div>
            </motion.div>

            {/* Кнопка */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8"
            >
              <a
                href="#courses"
                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-bold text-white hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105"
              >
                {t.button}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
