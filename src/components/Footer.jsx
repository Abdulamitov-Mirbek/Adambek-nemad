// src/components/Footer.jsx
import React, { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";

const content = {
  ru: {
    name: "Навин Джейн",
    title: "Предприниматель и филантроп",
    quickLinks: "Быстрые ссылки",
    about: "О нас",
    companies: "Компании",
    speaking: "Выступления",
    collaboration: "Сотрудничество",
    courses: "Курсы",
    connect: "Связаться",
    newsletter: "Новости",
    newsletterText: "Получайте последние обновления и инсайты",
    emailPlaceholder: "Ваш email",
    copyright: "Все права защищены",
  },
  kg: {
    name: "Навин Жейн",
    title: "Ишкер жана филантроп",
    quickLinks: "Тез шилтемелер",
    about: "Биз жөнүндө",
    companies: "Компаниялар",
    speaking: "Сүйлөөлөр",
    collaboration: "Кызматташуу",
    courses: "Курстар",
    connect: "Байланыш",
    newsletter: "Жаңылыктар",
    newsletterText: "Акыркы жаңыртууларды жана инсайттарды алыңыз",
    emailPlaceholder: "Электрондук почтаңыз",
    copyright: "Бардык укуктар корголгон",
  },
};

export const Footer = () => {
  const { language } = useContext(LanguageContext);
  const t = content[language];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container-custom">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">{t.name}</h3>
            <p className="text-gray-400">{t.title}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t.quickLinks}</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#about" className="hover:text-white transition">
                  {t.about}
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-white transition">
                  {t.courses}
                </a>
              </li>
              <li>
                <a href="#companies" className="hover:text-white transition">
                  {t.companies}
                </a>
              </li>
              <li>
                <a href="#speaking" className="hover:text-white transition">
                  {t.speaking}
                </a>
              </li>
              <li>
                <a
                  href="#collaboration"
                  className="hover:text-white transition"
                >
                  {t.collaboration}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t.connect}</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Email
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t.newsletter}</h4>
            <p className="text-gray-400 mb-2">{t.newsletterText}</p>
            <input
              type="email"
              placeholder={t.emailPlaceholder}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>
            &copy; 2024 {t.name}. {t.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};
