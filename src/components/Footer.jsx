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
    website: "", // Honeypot для защиты от ботов
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
    if (formData.website) return; // Игнорируем ботов

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
    <footer
      id="contact"
      className="scroll-mt-24 bg-[#050505] text-white py-16 border-t border-white/5"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Имя и Роль */}
          <div className="space-y-4">
            <h3 className="text-2xl font-black tracking-tighter uppercase">
              {t.name}
            </h3>
            <p className="text-white/90 text-sm leading-relaxed font-light">
              {t.title}
            </p>
          </div>

          {/* Ссылки */}
          <div>
            <h4 className="font-bold mb-6 uppercase text-[10px] tracking-[0.2em] text-blue-500">
              {t.quickLinks}
            </h4>
            <ul className="space-y-3 text-white/100 text-sm">
              <li>
                <a
                  href="#about"
                  aria-label={t.about}
                  className="hover:text-blue-400 transition-colors"
                >
                  {t.about}
                </a>
              </li>
              <li>
                <a
                  href="#courses"
                  aria-label={t.courses}
                  className="hover:text-blue-400 transition-colors"
                >
                  {t.courses}
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  aria-label={t.projects}
                  className="hover:text-blue-400 transition-colors"
                >
                  {t.projects}
                </a>
              </li>
            </ul>
          </div>

          {/* Соцсети */}
          <div>
            <h4 className="font-bold mb-6 uppercase text-[10px] tracking-[0.2em] text-blue-500">
              {t.connect}
            </h4>
            <ul className="space-y-4 text-white/80 text-sm">
              <li>
                <a
                  href="https://wa.me/996704343756"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="flex items-center gap-3 hover:text-green-500 transition-colors group"
                >
                  <FaWhatsapp className="text-xl text-white group-hover:scale-110 transition-transform" />
                  <span>WhatsApp</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/adambek.neemat"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex items-center gap-3 hover:text-pink-500 transition-colors group"
                >
                  <AiFillInstagram className="text-xl text-white group-hover:scale-110 transition-transform" />
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:mmrek07@gmail.com"
                  aria-label="Email"
                  className="flex items-center gap-3 hover:text-blue-400 transition-colors group"
                >
                  <TfiEmail className="text-xl text-white group-hover:scale-110 transition-transform" />
                  <span>Email</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Форма */}
          <div>
            <h4 className="font-bold mb-6 uppercase text-[10px] tracking-[0.2em] text-blue-500">
              {t.contactUs}
            </h4>

            {showSuccess && (
              <p className="text-green-400 text-xs mb-4">{t.successMessage}</p>
            )}
            {showError && (
              <p className="text-red-400 text-xs mb-4">{t.errorMessage}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Honeypot field (hidden from users) */}
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="hidden"
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
                className="w-full px-4 py-3 rounded-xl bg-white/5 text-white border border-white/10 focus:outline-none focus:border-blue-500/50 text-sm transition-all placeholder:text-white/70"
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder={t.phone}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 text-white border border-white/10 focus:outline-none focus:border-blue-500/50 text-sm transition-all placeholder:text-white/70"
              />
              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                placeholder={t.comment}
                rows="3"
                className="w-full px-4 py-3 rounded-xl bg-white/5 text-white border border-white/10 focus:outline-none focus:border-blue-500/50 text-sm transition-all resize-none placeholder:text-white/70"
              />
              <button
                type="submit"
                disabled={isSending}
                aria-label={t.send}
                className="w-full flex items-center justify-center gap-2 bg-white text-black hover:bg-blue-600 hover:text-white font-bold py-3 rounded-xl transition-all disabled:opacity-50"
              >
                {isSending ? (
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <MdSend size={18} /> {t.send}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Copyright - Исправлена контрастность (text-white/60) */}
        <div className="border-t border-white/5 pt-8 flex justify-center text-white/60 text-[11px] uppercase tracking-[0.1em] font-medium">
          <p className="text-center">
            &copy; {new Date().getFullYear()} {t.name} • {t.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
