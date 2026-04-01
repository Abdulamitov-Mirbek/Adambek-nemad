// src/sections/InTheNews.jsx
import React, { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

const newsData = {
  ru: [
    {
      title: "Gut check at Nordstrom: розничный гигант продаст тест микробиома от стартапа Viome из Сиэтла",
      source: "GEEKWIRE",
      link: "#"
    },
    {
      title: "Является ли Viome будущим еды?",
      source: "THE FOOD INSTITUTE",
      link: "#"
    },
    {
      title: "Для Навина Джейна большие проблемы - это привлекательная задача",
      source: "INC.",
      link: "#"
    }
  ],
  kg: [
    {
      title: "Nordstrom компаниясы: Сиэтлдик Viome стартабынын микробиом тестин сатуу",
      source: "GEEKWIRE",
      link: "#"
    },
    {
      title: "Viome тамак-аштын келечегиби?",
      source: "THE FOOD INSTITUTE",
      link: "#"
    },
    {
      title: "Навин Жейн үчүн чоң көйгөйлөр - кызыктуу тапшырма",
      source: "INC.",
      link: "#"
    }
  ]
};

const content = {
  ru: { title: "В НОВОСТЯХ", readMore: "Читать далее →" },
  kg: { title: "ЖАҢЫЛЫКТАРДА", readMore: "Көбүрөөк окуу →" }
};

export const InTheNews = () => {
  const { language } = useContext(LanguageContext);
  const t = content[language];
  const news = newsData[language];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t.title}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {news.map((item, index) => (
            <a 
              key={index}
              href={item.link}
              className="group block p-6 border border-gray-200 rounded-xl hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="text-sm text-blue-600 font-semibold mb-3">{item.source}</div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {item.title}
              </h3>
              <div className="mt-4 text-gray-500 group-hover:text-blue-600 flex items-center">
                {t.readMore}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InTheNews;