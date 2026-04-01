// src/sections/Awards.jsx
import React, { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

const awardsData = {
  ru: [
    {
      title: "Предприниматель года по версии Ernst & Young",
      year: "2019",
      description: "Признание выдающихся предпринимательских достижений"
    },
    {
      title: "Медаль Альберта Эйнштейна за технологии",
      year: "2020",
      description: "За революционные инновации в технологиях"
    },
    {
      title: "Медаль Почета острова Эллис",
      year: "2018",
      description: "В знак признания исключительного вклада в общество"
    }
  ],
  kg: [
    {
      title: "Ernst & Young тарабынан жылдын ишкери",
      year: "2019",
      description: "Көрүнүктүү ишкердик жетишкендиктер үчүн"
    },
    {
      title: "Альберт Эйнштейн технология медалы",
      year: "2020",
      description: "Технологиядагы революциялык инновациялар үчүн"
    },
    {
      title: "Эллис аралынын Ардак медалы",
      year: "2018",
      description: "Коомго кошкон өзгөчө салымы үчүн"
    }
  ]
};

const content = {
  ru: { title: "НАГРАДЫ И ДОСТИЖЕНИЯ" },
  kg: { title: "СЫЙЛЫКТАР ЖАНА ЖЕТИШКЕНДИКТЕР" }
};

export const Awards = () => {
  const { language } = useContext(LanguageContext);
  const t = content[language];
  const awards = awardsData[language];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {t.title}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {awards.map((award, index) => (
            <div key={index} className="text-center p-6 hover:shadow-xl transition-shadow rounded-xl">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold mb-2">{award.title}</h3>
              <p className="text-blue-600 font-semibold mb-2">{award.year}</p>
              <p className="text-gray-600">{award.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Awards;