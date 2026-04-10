// src/sections/Books.jsx
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { LanguageContext } from "../context/LanguageContext";
import bookImg from "../assets/images/book.jpg";

const content = {
  ru: {
    title: "КНИГИ",
    bookTitle: "Создай свой успех",
    description:
      "Открой врата в мир безграничных возможностей! В этой захватывающей книге автор проведет вас по уникальному пути через таинственный мир разума. От космических просторов до глубин подсознания — вы исследуете бесконечный потенциал своего ума и отправитесь в удивительное путешествие. Раскройте секреты мышления, творчества и решения сложных задач. Эта книга, полная мудрости и интриг, станет вашим верным спутником на пути к знаниям и просвещению. Приготовьтесь по-настоящему открыть себя и мир вокруг. Откройте страницы и позвольте своему разуму расцвести во всей красе!",
    button: "Купить на Amazon →",
  },
  kg: {
    title: "КИТЕПТЕР",
    bookTitle: "Ийгиликти жарат",
    description:
      "Чексиз мумкунчулуктер дуйнесуне дарбаза ач! Бул кызыктуу китепте автор акылдын сырдуу дуйнесу боюнча уникалдуу жол корсетет. Космос мейкиндигинен ан-сезимдин терендигине чейин сиз акылыныздын тугенгус потенциалын изилдеп, укмуштуудай саякатка чыгасыз. Ой жугуртуунун, чыгармачылыктын жана татаал маселелерди чечуунун сырларын ачыныз. Акылмандыкка жана интригага толгон бул китеп билим жана агартуу жолунда сиздин ишенимдуу шеригиниз болот. Озунузду жана айлананыздагы дуйнену чындап ачууга дарданыны. Барактарды ачып, акылдын бардык данкы менен гулдешуне жол бериниз!",
    button: "Amazon'дан сатып алуу →",
  },
};

export const Books = () => {
  const { language } = useContext(LanguageContext);
  const t = content[language];

  return (
    <section id="books" className="py-24 bg-black relative overflow-hidden">
      {/* Мягкое фоновое свечение */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-purple-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1.5 mb-6 border border-white/10 bg-white/5 backdrop-blur-md rounded-full">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-purple-400">
              Premium Edition
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">
            {t.title}
          </h2>
        </motion.div>

        <div className="bg-[#0f0f0f] border border-white/10 rounded-3xl overflow-hidden shadow-2xl md:flex items-stretch">
          {/* Обложка книги с эффектом левитации */}
          <div className="md:w-2/5 bg-gradient-to-br from-gray-900 to-black p-12 flex items-center justify-center relative">
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10"
            >
              <img
                src={bookImg}
                alt={t.bookTitle}
                loading="lazy"
                className="w-full max-w-[260px] rounded-lg shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-white/5"
              />
            </motion.div>
          </div>

          {/* Контентная часть */}
          <div className="md:w-3/5 p-8 md:p-14 flex flex-col justify-center bg-gradient-to-r from-transparent to-white/[0.02]">
            <h3 className="text-3xl md:text-4xl font-black text-white mb-6 uppercase tracking-tight leading-none">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                {t.bookTitle}
              </span>
            </h3>
            <p className="text-white/100 text-base md:text-lg leading-relaxed mb-10 font-medium">
              {t.description}
            </p>
            <div>
              <button
                onClick={() => window.open("https://amazon.com", "_blank")}
                aria-label={t.button}
                className="group relative px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(147,51,234,0.4)] active:scale-95"
              >
                {t.button}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Books;
