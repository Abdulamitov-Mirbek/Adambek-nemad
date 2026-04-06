import React, { useContext, useState } from "react";
import { LanguageContext } from "../context/LanguageContext";

import { AiFillInstagram } from "react-icons/ai";
import { FaWhatsapp } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import { MdSend } from "react-icons/md";

const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_IDS = [
  import.meta.env.VITE_TELEGRAM_CHAT_ID_1,
  import.meta.env.VITE_TELEGRAM_CHAT_ID_2,
].filter(Boolean);

const content = {
  ru: {
    name: "Адамбек Нээмат",
    title: "Предприниматель и бизнес-коуч",
    quickLinks: "Быстрые ссылки",
    about: "Обо мне",
    projects: "Проекты",
    courses: "Курсы",
    connect: "Связаться",
    contactUs: "Связаться с нами",
    fullName: "ФИО",
    phone: "Номер телефона",
    comment: "Комментарий",
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
    projects: "Долбоорлор",
    courses: "Курстар",
    connect: "Байланыш",
    contactUs: "Биз менен байланышуу",
    fullName: "Аты-жөнү",
    phone: "Тел номери",
    comment: "Комментарий",
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
    comment: "",
    website: "", // Honeypot
  });

  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendToTelegram = async (fullName, phone, comment) => {
    const message = `📋 *Новая заявка*\n\n👤 *ФИО:* ${fullName}\n📞 *Телефон:* ${phone}\n💬 *Комментарий:* ${comment || "—"}\n🌐 *Язык:* ${language === "kg" ? "Кыргызча" : "Русский"}\n⏰ *Время:* ${new Date().toLocaleString()}`;
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    try {
      const promises = TELEGRAM_CHAT_IDS.map((chatId) =>
        fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: "Markdown",
          }),
        }),
      );
      const responses = await Promise.all(promises);
      return responses.every((res) => res.ok);
    } catch (error) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. ЗАЩИТА: Honeypot
    if (formData.website) return;

    // 2. ЗАЩИТА: Прогрессивная блокировка
    const lastSend = parseInt(
      localStorage.getItem("last_form_submission") || "0",
    );
    const attempts = parseInt(
      localStorage.getItem("submission_attempts") || "0",
    );
    const now = Date.now();

    let limit = 0;
    if (attempts === 1) limit = 40 * 1000;
    else if (attempts === 2) limit = 60 * 60 * 1000;
    else if (attempts >= 3) limit = 24 * 60 * 60 * 1000;

    if (lastSend && now - lastSend < limit) {
      const timeLeft = limit - (now - lastSend);
      let timeString;
      if (timeLeft > 3600000)
        timeString = `${Math.ceil(timeLeft / 3600000)} ч.`;
      else if (timeLeft > 60000)
        timeString = `${Math.ceil(timeLeft / 60000)} мин.`;
      else timeString = `${Math.ceil(timeLeft / 1000)} сек.`;

      alert(`Доступ ограничен. Попробуйте через ${timeString}`);
      return;
    }

    setIsSending(true);
    setShowSuccess(false);
    setShowError(false);

    try {
      const success = await sendToTelegram(
        formData.fullName,
        formData.phone,
        formData.comment,
      );
      if (success) {
        localStorage.setItem("last_form_submission", Date.now().toString());
        localStorage.setItem("submission_attempts", (attempts + 1).toString());

        setShowSuccess(true);
        setFormData({ fullName: "", phone: "", comment: "", website: "" });
        setTimeout(() => setShowSuccess(false), 5000);
      } else {
        setShowError(true);
        setTimeout(() => setShowError(false), 4000);
      }
    } catch (error) {
      setShowError(true);
      setTimeout(() => setShowError(false), 4000);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <footer id="contact" className="scroll-mt-24 bg-gray-950 text-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-black tracking-tighter">{t.name}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{t.title}</p>
          </div>

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
                  className="flex items-center gap-3 hover:text-blue-400 transition-colors group"
                >
                  <TfiEmail className="text-xl group-hover:scale-110 transition-transform" />
                  <span>Email</span>
                </a>
              </li>
            </ul>
          </div>

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
                name="website"
                value={formData.website}
                onChange={handleChange}
                style={{ display: "none" }}
                tabIndex="-1"
                autoComplete="off"
              />
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

              {/* Новое поле: Комментарий */}
              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                placeholder={t.comment}
                rows="3"
                className="w-full px-4 py-2.5 rounded-xl bg-gray-900 text-white border border-gray-800 focus:outline-none focus:border-blue-500 text-sm transition-colors resize-none"
              />

              <button
                type="submit"
                disabled={isSending}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-2.5 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSending ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <MdSend className="text-base" /> {t.send}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-xs">
          <p>
            &copy; {new Date().getFullYear()} {t.name}. {t.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
