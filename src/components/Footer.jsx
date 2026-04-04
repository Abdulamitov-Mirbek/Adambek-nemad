import React, { useContext, useState } from "react";
import { LanguageContext } from "../context/LanguageContext";

import { AiFillInstagram } from "react-icons/ai";
import { FaWhatsapp } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import { MdSend } from "react-icons/md";

// НАСТРОЙКИ ДЛЯ TELEGRAM (ДЛЯ 2 ПОЛУЧАТЕЛЕЙ)
const TELEGRAM_BOT_TOKEN = "8465338781:AAG8jJPsRaSQV1AfJXyOX5NttsP7eCUz2R4";
const TELEGRAM_CHAT_IDS = ["8362752737", "5125578925"]; // Массив из двух ID

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
    contactUs: "Связаться с нами",
    fullName: "ФИО",
    phone: "Номер телефона",
    send: "Отправить",
    sending: "Отправка...",
    successMessage: "✅ Сообщение отправлено! Мы свяжемся с вами.",
    errorMessage: "❌ Ошибка! Попробуйте позже.",
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
    contactUs: "Биз менен байланышуу",
    fullName: "Аты-жөнү",
    phone: "Тел номери",
    send: "Жөнөтүү",
    sending: "Жөнөтүлүүдө...",
    successMessage: "✅ Кат жөнөтүлдү! Биз сизге байланышабыз.",
    errorMessage: "❌ Катташуу! Кийинчерээк аракет кылыңыз.",
    copyright: "Бардык укуктар корголгон",
  },
};

export const Footer = () => {
  const { language } = useContext(LanguageContext);
  const t = content[language];

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Отправка через Telegram ДВУМ получателям
  const sendToTelegram = async (fullName, phone) => {
    const message = `📋 *Новая заявка с сайта*\n\n👤 *ФИО:* ${fullName}\n📞 *Телефон:* ${phone}\n🌐 *Язык:* ${language === "kg" ? "Кыргызча" : "Русский"}\n⏰ *Время:* ${new Date().toLocaleString()}`;

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    try {
      // Отправляем каждому получателю отдельно
      const promises = TELEGRAM_CHAT_IDS.map((chatId) =>
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: chatId, // Здесь строка, а не массив!
            text: message,
            parse_mode: "Markdown",
          }),
        }),
      );

      const responses = await Promise.all(promises);
      const allSuccess = responses.every((res) => res.ok);

      if (allSuccess) {
        const data = await Promise.all(responses.map((res) => res.json()));
        console.log("Telegram responses:", data);
      } else {
        const errors = await Promise.all(responses.map((res) => res.text()));
        console.error("Telegram errors:", errors);
      }

      return allSuccess;
    } catch (error) {
      console.error("Telegram error:", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setShowSuccess(false);
    setShowError(false);

    try {
      const success = await sendToTelegram(formData.fullName, formData.phone);

      if (success) {
        setShowSuccess(true);
        setFormData({ fullName: "", phone: "" });
        setTimeout(() => setShowSuccess(false), 4000);
      } else {
        setShowError(true);
        setTimeout(() => setShowError(false), 4000);
      }
    } catch (error) {
      console.error("Ошибка:", error);
      setShowError(true);
      setTimeout(() => setShowError(false), 4000);
    } finally {
      setIsSending(false);
    }
  };

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

          {/* Колонка 3: Социальные сети */}
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
                  <span>Email</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Колонка 4: Форма */}
          <div>
            <h4 className="font-bold mb-6 uppercase text-xs tracking-[0.2em] text-blue-500">
              {t.contactUs}
            </h4>

            {showSuccess && (
              <div className="mb-4 p-3 bg-green-500/20 border border-green-500 rounded-lg text-green-400 text-xs text-center">
                {t.successMessage}
              </div>
            )}

            {showError && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-400 text-xs text-center">
                {t.errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder={t.fullName}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-gray-900 text-white border border-gray-800 focus:outline-none focus:border-blue-500 text-sm transition-colors"
              />

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder={t.phone}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-gray-900 text-white border border-gray-800 focus:outline-none focus:border-blue-500 text-sm transition-colors"
              />

              <button
                type="submit"
                disabled={isSending}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-2.5 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSending ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <MdSend className="text-base" />
                    {t.send}
                  </>
                )}
              </button>
            </form>
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

export default Footer;
