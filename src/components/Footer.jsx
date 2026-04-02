import React, { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";

import { AiFillInstagram } from "react-icons/ai";
import { FaWhatsapp } from "react-icons/fa"; // Иконка WhatsApp
import { TfiEmail } from "react-icons/tfi";
import { MdAddCall } from "react-icons/md";

const content = {
  ru: {
    name: "Адамбек Нээмат",
    title: "Предприниматель и бизнес-коуч",
    quickLinks: "Быстрые ссылки",
    about: "Обо мне",
    companies: "Проекты",
    speaking: "Выступления",
    projects: "Проекты",
    courses: "Курсы",
    connect: "Связаться",
    newsletter: "Рассылка",
    newsletterText: "Получайте инсайты по продажам и бизнесу",
    emailPlaceholder: "Ваш email",
    copyright: "Все права защищены",
  },
  kg: {
    name: "Адамбек Нээмат",
    title: "Ишкер жана бизнес-коуч",
    quickLinks: "Тез шилтемелер",
    about: "Мен жөнүндө",
    companies: "Долбоорлор",
    speaking: "Чыгуулар",
    projects: "Долбоорлор",
    courses: "Курстар",
    connect: "Байланыш",
    newsletter: "Жаңылыктар",
    newsletterText: "Сатуу жана бизнес боюнча инсайттарды алыңыз",
    emailPlaceholder: "Электрондук почтаңыз",
    copyright: "Бардык укуктар корголгон",
  },
};

export const Footer = () => {
  const { language } = useContext(LanguageContext);
  const t = content[language];

  return (
    <footer id="contact" className="scroll-mt-24 bg-gray-950 text-white py-16">
      <div className="container-custom max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Колонка 1: О Бренде */}
          <div className="space-y-4">
            <h3 className="text-2xl font-black tracking-tighter">{t.name}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{t.title}</p>
          </div>

          {/* Колонка 2: Навигация */}
          <div>
            <h4 className="font-bold mb-6 uppercase text-xs tracking-[0.2em] text-blue-500">
              {t.quickLinks}
            </h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  {t.about}
                </a>
              </li>
              <li>
                <a
                  href="#courses"
                  className="hover:text-white transition-colors"
                >
                  {t.courses}
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="hover:text-white transition-colors"
                >
                  {t.projects}
                </a>
              </li>
            </ul>
          </div>

          {/* Колонка 3: Контакты с иконками */}
          <div>
            <h4 className="font-bold mb-6 uppercase text-xs tracking-[0.2em] text-blue-500">
              {t.connect}
            </h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li>
                <a
                  href="https://wa.me/996704343756"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-green-500 transition-colors group"
                >
                  <FaWhatsapp className="text-xl group-hover:scale-110 transition-transform" />
                  <span>WhatsApp</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/adambek.neemat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-pink-500 transition-colors group"
                >
                  <AiFillInstagram className="text-xl group-hover:scale-110 transition-transform" />
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:mmrek07@gmail.com"
                  target="_blank"
                  className="flex items-center gap-3 hover:text-blue-400 transition-colors group"
                >
                  <TfiEmail className="text-xl group-hover:scale-110 transition-transform" />
                  <span className="font-mono text-sm break-all leading-tight">
                    Email
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* Колонка 4: Подписка */}
          <div>
            <h4 className="font-bold mb-6 uppercase text-xs tracking-[0.2em] text-blue-500">
              {t.newsletter}
            </h4>
            <p className="text-gray-400 text-xs mb-4">{t.newsletterText}</p>
            <div className="relative">
              <input
                type="email"
                placeholder={t.emailPlaceholder}
                className="w-full px-4 py-3 rounded-xl bg-gray-900 text-white border border-gray-800 focus:outline-none focus:border-blue-500 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Копирайт */}
        <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-xs">
          <p>
            &copy; {new Date().getFullYear()} {t.name}. {t.copyright}
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
