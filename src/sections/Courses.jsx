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
    kicker: "КУРСЫ",
    title: "Обучение для бизнеса и продаж",
    lead: "Адамбек Нээмат — предприниматель и бизнес-аналитик: помогает разобраться в цифрах, процессах и клиентах, чтобы рост был измеримым, а не случайным. На курсах — структура, практика и обратная связь.",
    ctaTitle: "Свяжитесь с нами",
    ctaBody:
      "Напишите в WhatsApp или подпишитесь на Instagram — будьте в курсе новых курсов и материалов.",
    whatsappButton: "Написать в WhatsApp",
    instagramButton: "Подписаться в Instagram",
    ctaNote: "Ответим в рабочее время · без обязательств на первом сообщении",
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
    kicker: "КУРСТАР",
    title: "Бизнес жана сатуу боюнча окутуу",
    lead: "Адамбек Нээмат — ишкер жана бизнес-аналитик: сандарды, процесстерди жана кардарларды түшүнүүгө жардам берет. Курстарда — түзүлүш, практика жана байланыш.",
    ctaTitle: "Биз менен байланышыңыз",
    ctaBody:
      "WhatsApp аркылуу жазыңыз же Instagram'га жазылыңыз — жаңы курстар жана материалдар жөнүндө кабардар болуңуз.",
    whatsappButton: "WhatsApp аркылуу жазуу",
    instagramButton: "Instagram'га жазылуу",
    ctaNote: "Жумуш убактысында жооп беребиз · биринчи кабарда милдеттүү эмес",
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

// Instagram SVG Icon - No external dependencies
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
    <section
      id="courses"
      className="relative scroll-mt-24 overflow-hidden border-y border-gray-100 bg-gradient-to-b from-slate-50 to-white py-24 md:py-28"
    >
      <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 translate-x-1/3 rounded-full bg-blue-200/40 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-48 -translate-x-1/4 rounded-full bg-violet-200/35 blur-3xl" />

      <div className="container-custom relative max-w-6xl">
        <div className="mb-4 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-blue-600 shadow-sm">
            <GraduationCap className="h-4 w-4" strokeWidth={2.5} />
            {t.kicker}
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45 }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <h2 className="mb-5 text-3xl font-black tracking-tight text-gray-900 md:text-4xl">
            {t.title}
          </h2>
          <p className="text-lg leading-relaxed text-gray-600 md:text-xl">
            {t.lead}
          </p>
        </motion.div>

        <ul className="mb-14 grid gap-5 md:grid-cols-3">
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
                <div className="h-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-gray-900">
                    {f.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {f.text}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ul>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 p-8 text-center text-white shadow-xl shadow-blue-900/20 md:p-10"
        >
          <h3 className="mb-3 text-2xl font-black md:text-3xl">{t.ctaTitle}</h3>
          <p className="mb-8 text-base leading-relaxed text-blue-100 md:text-lg">
            {t.ctaBody}
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            {/* WhatsApp Button */}
            <button
              type="button"
              onClick={openWa}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-indigo-700 shadow-lg transition-all duration-300 hover:bg-blue-50 hover:shadow-xl hover:-translate-y-1 active:scale-[0.97] sm:w-auto"
            >
              <MessageCircle className="h-5 w-5 shrink-0" />
              {t.whatsappButton}
            </button>

            {/* Instagram Button */}
            <button
              type="button"
              onClick={openInstagram}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 px-8 py-4 text-base font-bold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 active:scale-[0.97] sm:w-auto"
            >
              <InstagramIcon />
              {t.instagramButton}
            </button>
          </div>
          <p className="mt-5 text-xs text-blue-200/90">{t.ctaNote}</p>
        </motion.div>

        
      </div>
    </section>
  );
};

export default Courses;
