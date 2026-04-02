import React, { useContext } from "react";
import { motion } from "framer-motion";
import { LanguageContext } from "../context/LanguageContext";

const resultsData = {
  ru: [
    {
      name: "Асан Мавлонов",
      role: "Топ-ученик / Миллионер",
      result: "20 000 → 1 000 000+ сом",
      description: "Считает Адамбека своим главным наставником (устаз). Прошел путь от скромной зарплаты до статуса миллионера, внедрив систему продаж.",
      isGold: true
    },
    {
      name: "Нурбек",
      role: "Менеджер по продажам",
      result: "Зарплата: 25 000 → 1 000 000 сом",
      description: "После курса полностью пересмотрел подход к переговорам и закрыл рекордные сделки.",
    },
    {
      name: '"ГрандСтрой"',
      role: "Строительная компания",
      result: "Продажи х2 за месяц",
      description: "Внедрение системы Адамбека позволило удвоить выручку без увеличения штата.",
    },
    {
      name: "Айжамал",
      role: "Предприниматель",
      result: "Преодолела страх продаж",
      description: "Теперь общение с клиентами приносит удовольствие и стабильный доход.",
    },
  ],
  kg: [
    {
      name: "Асан Мавлонов",
      role: "Алдыңкы окуучу / Миллионер",
      result: "20 000 → 1 000 000+ сом",
      description: "Адамбек мырзаны өзүнүн негизги устаты катары сыйлайт. 20 000 сомдук айлыктан миллионерге чейинки жолду басып өттү.",
      isGold: true
    },
    {
      name: "Нурбек",
      role: "Сатуу менеджери",
      result: "Айлык: 25 000 → 1 000 000 сом",
      description: "Курстан кийин сүйлөшүү тактикасын толугу менен өзгөртүп, рекорддук келишимдерди түздү.",
    },
    {
      name: '"ГрандСтрой"',
      role: "Курулуш компаниясы",
      result: "Сатуулар 1 айда 2 эсе өстү",
      description: "Адамбектин системасын киргизүү кызматкерлерди көбөйтпөй туруп кирешени эки эсеге жогорулатты.",
    },
    {
      name: "Айжамал",
      role: "Ишкер",
      result: "Сатуудан коркууну жеңди",
      description: "Азыр ар бир кардар менен ырахаттанып сүйлөшөт жана туруктуу киреше табат.",
    },
  ],
};

const content = {
  ru: { title: "РЕЗУЛЬТАТЫ УЧЕНИКОВ" },
  kg: { title: "ОКУУЧУЛАРДЫН ИЙГИЛИГИ" },
};

export const Awards = () => {
  const { language } = useContext(LanguageContext);
  const t = content[language];
  const results = resultsData[language];

  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="container-custom max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-black text-center mb-16 tracking-tighter text-gray-900"
        >
          {t.title}
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {results.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                y: -10,
                scale: 1.02,
                boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.08)",
              }}
              className={`relative bg-white p-8 rounded-[2.5rem] border transition-all ${
                item.isGold 
                ? "border-yellow-400 shadow-yellow-100 shadow-2xl" 
                : "border-gray-100 shadow-xl shadow-gray-200/50"
              } flex flex-col justify-between cursor-pointer`}
            >
              {item.isGold && (
                <div className="absolute -top-4 -right-4 bg-yellow-400 text-white text-xs font-black px-4 py-2 rounded-full shadow-lg uppercase tracking-tighter">
                  Best Case
                </div>
              )}
              
              <div>
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  className={`text-3xl mb-4 inline-block ${item.isGold ? "filter-none" : ""}`}
                >
                  {item.isGold ? "👑" : "🚀"}
                </motion.div>

                <h3 className="text-2xl font-black mb-1 text-gray-900 uppercase">
                  {item.name}
                </h3>
                <p className={`text-sm font-bold uppercase tracking-widest mb-4 ${item.isGold ? "text-yellow-600" : "text-blue-500"}`}>
                  {item.role}
                </p>

                <div className={`py-2 px-4 rounded-xl font-black text-xl mb-4 inline-block ${
                  item.isGold ? "bg-yellow-100 text-yellow-700" : "bg-blue-50 text-blue-700"
                }`}>
                  {item.result}
                </div>

                <p className="text-gray-600 leading-relaxed italic text-lg">
                  "{item.description}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Awards;