// src/sections/VisionaryInsight.jsx
import React, { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

const content = {
  ru: {
    title: "ВИДЕНИЕ БУДУЩЕГО",
    description: "Вдохновленный воображением, Навин видит дальше текущего бизнес-ландшафта и технологий, создавая компании, которые продвигают человечество вперед.",
    button1: "Посмотреть выступление",
    button2: "Пригласить Навина"
  },
  kg: {
    title: "КЕЛЕЧЕКТИ КӨРӨ БИЛҮҮ",
    description: "Элестетүү күчү менен шыктанган Навин, азыркы бизнес жана технологиялык ландшафттан ары көрүп, адамзатты алдыга жылдырган компанияларды түзөт.",
    button1: "Сүйлөгөнүн көрүү",
    button2: "Навинди чакыруу"
  }
};

export const VisionaryInsight = () => {
  const { language } = useContext(LanguageContext);
  const t = content[language];

  return (
    <section className="section-padding bg-gradient-to-r from-purple-600 to-blue-600 text-white">
      <div className="container-custom text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.title}</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          {t.description}
        </p>
        <div className="flex gap-4 justify-center">
          <button className="px-8 py-3 bg-white text-purple-600 rounded-full font-semibold hover:shadow-lg transition-all hover:scale-105">
            {t.button1}
          </button>
          <button className="px-8 py-3 border-2 border-white rounded-full font-semibold hover:bg-white hover:text-purple-600 transition-all">
            {t.button2}
          </button>
        </div>
      </div>
    </section>
  );
};

export default VisionaryInsight;