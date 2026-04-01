import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { LanguageContext } from '../context/LanguageContext';

const resultsData = {
  ru: [
    {
      name: "Нурбек",
      role: "Менеджер по продажам",
      result: "Зарплата: 25 000 → 1 000 000 сом",
      description: "После курса полностью пересмотрел подход к переговорам и закрыл рекордные сделки."
    },
    {
      name: '"ГрандСтрой"',
      role: "Строительная компания",
      result: "Продажи х2 за месяц",
      description: "Внедрение системы Адамбека позволило удвоить выручку без увеличения штата."
    },
    {
      name: "Айжамал",
      role: "Предприниматель",
      result: "Преодолела страх продаж",
      description: "Теперь общение с клиентами приносит удовольствие и стабильный доход."
    }
  ],
  kg: [
    {
      name: "Нурбек",
      role: "Сатуу менеджери",
      result: "Айлык: 25 000 → 1 000 000 сом",
      description: "Курстан кийин сүйлөшүү тактикасын толугу менен өзгөртүп, рекорддук келишимдерди түздү."
    },
    {
      name: '"ГрандСтрой"',
      role: "Курулуш компаниясы",
      result: "Сатуулар 1 айда 2 эсе өстү",
      description: "Адамбектин системасын киргизүү кызматкерлерди көбөйтпөй туруп кирешени эки эсеге жогорулатты."
    },
    {
      name: "Айжамал",
      role: "Ишкер",
      result: "Сатуудан коркууну жеңди",
      description: "Азыр ар бир кардар менен ырахаттанып сүйлөшөт жана туруктуу киреше табат."
    }
  ]
};

const content = {
  ru: { title: "РЕЗУЛЬТАТЫ УЧЕНИКОВ" },
  kg: { title: "ОКУУЧУЛАРДЫН ИЙГИЛИГИ" }
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
          className="text-3xl md:text-5xl font-black text-center mb-16 tracking-tighter text-gray-900"
        >
          {t.title}
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {results.map((item, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col justify-between hover:scale-[1.02] transition-transform"
            >
              <div>
                <div className="text-blue-600 text-3xl mb-4">🚀</div>
                <h3 className="text-2xl font-bold mb-1 text-gray-900">{item.name}</h3>
                <p className="text-sm text-blue-500 font-bold uppercase tracking-widest mb-4">{item.role}</p>
                <div className="bg-blue-50 text-blue-700 py-2 px-4 rounded-lg font-black text-lg mb-4 inline-block">
                  {item.result}
                </div>
                <p className="text-gray-600 leading-relaxed italic">
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