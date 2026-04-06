import React, { useContext, useMemo } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  ChartLine,
  ClipboardList,
  MessageCircle,
  TrendingUp,
} from "lucide-react";
import { LanguageContext } from "../context/LanguageContext";

const content = {
  ru: {
    badge: "ОБУЧЕНИЕ",
    title: "КУРСЫ",
    titleGradient: "ПРОГРАММЫ",
    lead: "Адамбек Нээмат — предприниматель и бизнес-аналитик: помогает разобраться в цифрах, процессах и клиентах, чтобы рост был измеримым, а не случайным.",
    ctaTitle: "Начните свой путь",
    ctaBody: "Выберите удобный способ связи — мы подберём формат обучения под ваши задачи",
    whatsappButton: "Написать в WhatsApp",
    instagramButton: "Перейти в Instagram",
    ctaNote: "Ответим в рабочее время · без обязательств",
    features: [
      {
        title: "Бизнес-аналитика",
        text: "Метрики, воронки и решения на основе данных — не гадание, а ясная картина.",
      },
      {
        title: "Продажи и переговоры",
        text: "Система работы с клиентом: от первого контакта до повторных сделок.",
      },
      {
        title: "Практика на кейсах",
        text: "Инструменты, которые можно внедрить в своём бизнесе сразу после модуля.",
      },
    ],
  },
  kg: {
    badge: "ОКУТУУ",
    title: "КУРСТАР",
    titleGradient: "ПРОГРАММАЛАР",
    lead: "Адамбек Нээмат — ишкер жана бизнес-аналитик: сандарды, процесстерди жана кардарларды түшүнүүгө жардам берет.",
    ctaTitle: "Сапарыңызды баштаңыз",
    ctaBody: "Өзүңүзгө ыңгайлуу байланыш жолун тандаңыз — биз сизге ылайыктуу окуу форматын сунуштайбыз",
    whatsappButton: "WhatsApp аркылуу жазуу",
    instagramButton: "Instagram'га өтүү",
    ctaNote: "Жумуш убактысында жооп беребиз · милдеттүү эмес",
    features: [
      {
        title: "Бизнес-аналитика",
        text: "Көрсөткүчтөр, воронка жана дайындарга негизделген чечимдер.",
      },
      {
        title: "Сатуу жана сүйлөшүү",
        text: "Кардар менен иштөөнүн системасы: биринчи байланыштан кайталуу сатууларга чейин.",
      },
      {
        title: "Практика",
        text: "Модулдон кийин өз бизнесиңизге дароо колдонгон аспаптар.",
      },
    ],
  },
};

const icons = [ChartLine, TrendingUp, ClipboardList];

// Instagram SVG Icon
const InstagramIcon = () => (
  <svg
    className="h-5 w-5 shrink-0"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export const Courses = () => {
  const { language } = useContext(LanguageContext);
  const t = content[language];

  const waLink = useMemo(() => {
    const msg =
      language === "ru"
        ? "Здравствуйте! Хочу записаться на курс Адамбека Нээмата."
        : "Саламатсызбы! Адамбек Нээматтын курсуна жазылгым келет.";
    return `https://wa.me/996704343756?text=${encodeURIComponent(msg)}`;
  }, [language]);

  const instagramLink = "https://www.instagram.com/adambek.neemat";

  const openWa = () => window.open(waLink, "_blank", "noopener,noreferrer");
  const openInstagram = () =>
    window.open(instagramLink, "_blank", "noopener,noreferrer");

  return (
    <section id="courses" className="relative py-32 overflow-hidden bg-black scroll-mt-24">
      {/* Фоновые градиенты */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      <div className="container-custom relative max-w-6xl mx-auto px-6 z-20">
        {/* Заголовок */}
        <div className="mb-4 flex justify-center">
          <div className="inline-block px-4 py-1.5 border border-white/10 bg-white/5 backdrop-blur-md rounded-full">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-blue-400">
              {t.badge}
            </span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45 }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tighter">
            {t.title}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              {t.titleGradient}
            </span>
          </h2>
          <p className="text-lg leading-relaxed text-gray-400 md:text-xl">
            {t.lead}
          </p>
        </motion.div>

        {/* Карточки преимуществ */}
        <ul className="mb-14 grid gap-6 md:grid-cols-3">
          {t.features.map((f, i) => {
            const Icon = icons[i];
            return (
              <motion.li
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-blue-500/30 hover:transform hover:-translate-y-2">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
                    <Icon className="h-6 w-6" strokeWidth={2} />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-white">
                    {f.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-400">
                    {f.text}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ul>

        {/* CTA Блок */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-sm p-8 text-center shadow-2xl md:p-10"
        >
          <h3 className="mb-3 text-2xl font-black text-white md:text-3xl">
            {t.ctaTitle}
          </h3>
          <p className="mb-8 text-base leading-relaxed text-gray-300 md:text-lg">
            {t.ctaBody}
          </p>
          
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            {/* WhatsApp Button */}
            <button
              type="button"
              onClick={openWa}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-indigo-700 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 active:scale-[0.97] sm:w-auto"
            >
              <MessageCircle className="h-5 w-5 shrink-0 transition-transform group-hover:scale-110" />
              {t.whatsappButton}
            </button>

            {/* Instagram Button */}
            <button
              type="button"
              onClick={openInstagram}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 px-8 py-4 text-base font-bold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 active:scale-[0.97] sm:w-auto"
            >
              <InstagramIcon />
              {t.instagramButton}
            </button>
          </div>
          
          <p className="mt-5 text-xs text-gray-400">{t.ctaNote}</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Courses;