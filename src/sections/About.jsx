import React, { useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LanguageContext } from "../context/LanguageContext";

import adambekPhoto1 from "../assets/images/Photo.jpg";
import adambekPhoto2 from "../assets/images/Photo (2).jpg";
import adambekPhoto3 from "../assets/images/Photo (3).jpg";

const photos = [adambekPhoto1, adambekPhoto2, adambekPhoto3];

const content = {
  ru: {
    title: "ОБ АДАМБЕКЕ НЭЭМАТЕ",
    description1:
      "Я учу людей приносить пользу через искусство продаж и развивать бизнес честным (адал) путем. Моя цель — раскрыть ваш потенциал и системно увеличить ваш доход.",
    description2:
      "За 10 лет я превратил тысячи людей в профессиональных продавцов. Я прошел путь от обычных рынков до работы с крупнейшими компаниями, собирая только работающие инструменты.",
    description3:
      "Мой подход — это не сухая теория. Это сочетание психологии и техники, где клиент не чувствует давления, а сам хочет совершить покупку.",
    statsTitle: "В цифрах:",
    stat1: "10 лет опыта",
    stat2: "1000+ учеников",
    stat3: "90% результат",
  },
  kg: {
    title: "АДАМБЕК Нээмат ЖӨНҮНДӨ",
    description1:
      "Сатуу өнөрү аркылуу адамдарга пайда алып келүүүнү жана бизнести адал жол менен өстүрүүнү үйрөтөм. Менин максатым — сиздин потенциалыңызды ачуу.",
    description2:
      "Мен — Адамбек Нээмат, 10 жыл ичинде миңдеген адамды профессионал сатуучуга айландырдым. Сиздин да бизнесиңизди жаңы деңгээлге чыгарууга убакыт келди!",
    description3:
      "Мен базардан баштап ири компанияларга чейинки басып өткөн жолумдагы эң иштеген инструменттерди берем. Бул теория эмес, таза практика.",
    statsTitle: "Сандар менен:",
    stat1: "10 жыл тажрыйба",
    stat2: "1000+ окуучу",
    stat3: "90% жыйынтык",
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
    <section id="about" className="scroll-mt-24 py-24 bg-white overflow-hidden">
      <div className="container-custom max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 relative"
          >
            <div className="relative aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden shadow-2xl z-0">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentPhotoIndex}
                  src={photos[currentPhotoIndex]}
                  alt="Адамбек Нээмат"
                  initial={{ opacity: 0 }} // Начальное состояние (невидимый)
                  animate={{ opacity: 1 }} // Состояние при появлении (видимый)
                  exit={{ opacity: 0 }} // Состояние при исчезновении
                  transition={{ duration: 0.6 }} // Длительность перехода (0.8 сек)
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-10" />
            </div>

            <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-8 rounded-2xl hidden md:block shadow-xl z-20">
              <p className="text-4xl font-black italic">10</p>
              <p className="text-xs uppercase tracking-widest opacity-80">
                {language === "ru" ? "Лет в бизнесе" : "Жыл бизнесте"}
              </p>
            </div>
          </motion.div>

          <div className="w-full md:w-1/2">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black mb-8 tracking-tighter text-gray-900uppercase"
            >
              {t.title}
            </motion.h2>

            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
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
                className="font-medium text-gray-900 border-l-4 border-blue-500 pl-4"
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

            <div className="mt-12 grid grid-cols-3 gap-4 border-t border-gray-100 pt-8">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {t.stat1.split(" ")[0]}
                </p>
                <p className="text-[10px] uppercase text-gray-400 tracking-tight mt-1">
                  {t.stat1.split(" ").slice(1).join(" ")}
                </p>
              </div>
              <div className="text-center border-x border-gray-100 px-2">
                <p className="text-2xl font-bold text-blue-600">
                  {t.stat2.split(" ")[0]}
                </p>
                <p className="text-[10px] uppercase text-gray-400 tracking-tight mt-1">
                  {t.stat2.split(" ").slice(1).join(" ")}
                </p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {t.stat3.split(" ")[0]}
                </p>
                <p className="text-[10px] uppercase text-gray-400 tracking-tight mt-1">
                  {t.stat3.split(" ").slice(1).join(" ")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
