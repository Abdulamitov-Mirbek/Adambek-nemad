// src/sections/About.jsx - New section for About page
import React, { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

const content = {
  ru: {
    title: "Adambek Neemat",
    description1: "Навин Джейн — предприниматель, филантроп и визионер, который создает компании, решающие самые сложные проблемы человечества.",
    description2: "Основатель нескольких успешных компаний, включая Viome, Moon Express и Intelius, Навин посвятил свою жизнь использованию инноваций для улучшения жизни людей.",
    description3: "Его страсть к решению невозможных задач привела к прорывам в области здравоохранения, космических исследований и искусственного интеллекта."
  },
  kg: {
    title: "Адамбек Неемат ЖӨНҮНДӨ",
    description1: "Навин Жейн - ишкер, филантроп жана адамзаттын эң татаал көйгөйлөрүн чечүүчү компанияларды түзгөн көрөгөч.",
    description2: "Viome, Moon Express жана Intelius сыяктуу ийгиликтүү компаниялардын негиздөөчүсү, Навин өз жашоосун инновацияларды колдонуп, адамдардын жашоосун жакшыртууга арнаган.",
    description3: "Мүмкүн эмес маселелерди чечүүгө болгон кумарлыгы саламаттык сактоо, космосту изилдөө жана жасалма интеллект тармагында чоң жетишкендиктерге алып келди."
  }
};

export const About = () => {
  const { language } = useContext(LanguageContext);
  const t = content[language];

  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {t.title}
          </h2>
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
            <p>{t.description1}</p>
            <p>{t.description2}</p>
            <p>{t.description3}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
 export default About;