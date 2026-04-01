import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LanguageContext } from "../context/LanguageContext";

const testimonials = {
  ru: [
    {
      text: "Айлык акым 25 000 сомдон 1 000 000 сомго чыкты! Это был поворотный момент в моей карьере.",
      author: "Нурбек",
      role: "Сатуу менеджери",
    },
    {
      text: "Бир ай ичинде курулуш компаниябыздын сатуусун 2 эсеге өстүрдүк. Система реально работает.",
      author: "ГрандСтрой",
      role: "Курулуш компаниясы",
    },
    {
      text: "Сатуудан коркчумун, азыр ар бир кардар менен ырахаттанып сүйлөшөм. Это свобода!",
      author: "Айжамал",
      role: "Ишкер",
    },
  ],
  kg: [
    {
      text: "Айлык акым 25 000 сомдон 1 000 000 сомго чыкты! Бул менин жашоомдогу эң чоң бурулуш болду.",
      author: "Нурбек",
      role: "Сатуу менеджери",
    },
    {
      text: "Бир ай ичинде курулуш компаниябыздын сатуусун 2 эсеге өстүрдүк. Система иштеп жатат!",
      author: "ГрандСтрой",
      role: "Курулуш компаниясы",
    },
    {
      text: "Сатуудан коркчумун, азыр ар бир кардар менен ырахаттанып сүйлөшөм. Бул чыныгы эркиндик!",
      author: "Айжамал",
      role: "Ишкер",
    },
  ],
};

const content = {
  ru: {
    title: "ИСТОРИИ УСПЕХА",
    button1: "Записаться на курс",
    button2: "Все отзывы",
  },
  kg: {
    title: "ИЙГИЛИК ТАРЫХТАРЫ",
    button1: "Курска жазылуу",
    button2: "Баардык пикирлер",
  },
};

export const VisionaryInsight = () => {
  const { language } = useContext(LanguageContext);
  const t = content[language];
  const items = testimonials[language];
  const [index, setIndex] = useState(0);

  // Ссылка на WhatsApp для кнопки
  const waLink =
    "https://wa.me/996704343756?text=" +
    encodeURIComponent(
      "Ассаламу алайкум! Курс боюнча маалымат алайын дедим эле.",
    );

  return (
    <section className="py-24 bg-gradient-to-br from-blue-700 via-purple-700 to-indigo-900 text-white overflow-hidden relative">
      {/* Декоративные круги для стиля */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

      <div className="container px-6 mx-auto text-center relative z-10">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="inline-block px-4 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold tracking-[0.3em] mb-8 uppercase"
        >
          {t.title}
        </motion.span>

        <div className="max-w-4xl mx-auto min-h-[300px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index + language}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-5xl font-black leading-tight italic">
                "{items[index].text}"
              </h2>
              <div>
                <p className="text-xl font-bold text-blue-300">
                  {items[index].author}
                </p>
                <p className="text-sm uppercase tracking-widest opacity-60">
                  {items[index].role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Переключатели отзывов (точки) */}
        <div className="flex justify-center gap-3 mt-12 mb-12">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full transition-all ${index === i ? "bg-white w-8" : "bg-white/30"}`}
            />
          ))}
        </div>

        {/* Кнопки действий */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.open(waLink, "_blank")}
            className="px-10 py-4 bg-white text-purple-700 rounded-full font-bold shadow-2xl hover:bg-blue-50 transition-all hover:scale-105 active:scale-95"
          >
            {t.button1}
          </button>
          <button
            onClick={() =>
              window.open("https://www.instagram.com/adambek.neemat", "_blank")
            }
            className="px-10 py-4 border-2 border-white/30 rounded-full font-bold hover:bg-white/10 transition-all"
          >
            {t.button2}
          </button>
        </div>
      </div>
    </section>
  );
};

export default VisionaryInsight;
