import React, { useContext, useMemo } from "react";
import { motion } from "framer-motion";
import { LanguageContext } from "../context/LanguageContext";

import {
  TrendingUp,
  MessageCircle,
  Users,
  Target,
  BookOpen,
  Brain,
  CheckCircle2,
} from "lucide-react";

const modules = [
  {
    icon: TrendingUp,
    number: "01",
    color: "from-blue-500 to-cyan-500",
    bgColor: "from-blue-500/10 to-cyan-500/10",
    borderColor: "border-blue-500/20 hover:border-blue-500/40",
    shadowColor: "shadow-blue-500/20",
  },
  {
    icon: MessageCircle,
    number: "02",
    color: "from-purple-500 to-pink-500",
    bgColor: "from-purple-500/10 to-pink-500/10",
    borderColor: "border-purple-500/20 hover:border-purple-500/40",
    shadowColor: "shadow-purple-500/20",
  },
  {
    icon: Users,
    number: "03",
    color: "from-emerald-500 to-teal-500",
    bgColor: "from-emerald-500/10 to-teal-500/10",
    borderColor: "border-emerald-500/20 hover:border-emerald-500/40",
    shadowColor: "shadow-emerald-500/20",
  },
  {
    icon: Target,
    number: "04",
    color: "from-amber-500 to-orange-500",
    bgColor: "from-amber-500/10 to-orange-500/10",
    borderColor: "border-amber-500/20 hover:border-amber-500/40",
    shadowColor: "shadow-amber-500/20",
  },
  {
    icon: BookOpen,
    number: "05",
    color: "from-rose-500 to-red-500",
    bgColor: "from-rose-500/10 to-red-500/10",
    borderColor: "border-rose-500/20 hover:border-rose-500/40",
    shadowColor: "shadow-rose-500/20",
  },
  {
    icon: Brain,
    number: "06",
    color: "from-violet-500 to-indigo-500",
    bgColor: "from-violet-500/10 to-indigo-500/10",
    borderColor: "border-violet-500/20 hover:border-violet-500/40",
    shadowColor: "shadow-violet-500/20",
  },
];

const content = {
  ru: {
    badge: "ОБУЧЕНИЕ",
    title: "КУРСЫ",
    titleGradient: "ПРОГРАММЫ",
    lead: "Имея 17-летний опыт в продажах, я разработал 6 модулей, которые помогут вам выстроить сильную систему продаж, уверенно работать с возражениями и стабильно увеличивать прибыль.",
    moduleTitles: [
      "Продавать дорого, не теряя клиентов",
      "Правильно работать с возражениями",
      "Превращать потенциальных клиентов в постоянных",
      "Подбирать предложение под потребности клиента",
      "Тактики продаж по исламским принципам",
      "Психология продаж и мышление предпринимателя",
    ],
    moduleItems: [
      [
        "Почему клиент покупает не самую низкую цену",
        "Как создать ценность продукта",
        "Как уверенно озвучивать стоимость",
        "Как уйти от постоянных скидок",
        "Увеличение среднего чека",
      ],
      [
        "Причины возникновения возражений",
        "Основные виды возражений",
        "Алгоритм работы с возражениями",
        "«Дорого», «Я подумаю», «Нет времени», «Нет денег»",
        "Как закрывать сделку после возражений",
      ],
      [
        "Построение долгосрочных отношений",
        "Повышение доверия клиента",
        "Повторные продажи",
        "Работа с клиентской базой",
        "Получение рекомендаций",
      ],
      [
        "Выявление потребностей",
        "Искусство задавать вопросы",
        "Активное слушание",
        "Презентация через выгоды",
        "Индивидуальный подход к каждому клиенту",
      ],
      [
        "Халяль-продажи и честность",
        "Этика общения с клиентами",
        "Доверие как основа бизнеса",
        "Баракат в торговле",
        "Продажи без обмана и манипуляций",
      ],
      [
        "Психология принятия решений",
        "Эмоции в продажах",
        "Уверенность продавца",
        "Лидерское мышление",
        "Дисциплина и привычки успешного предпринимателя",
      ],
    ],
    ctaTitle: "Готовы увеличить продажи и вывести свой бизнес на новый уровень?",
    ctaBody:
      "Выберите удобный способ связи — мы ответим на все вопросы и поможем подобрать программу именно под ваши цели.",
    whatsappButton: "Написать в WhatsApp",
    instagramButton: "Перейти в Instagram",
    ctaNote: "Ответим в рабочее время · без обязательств",
  },
  kg: {
    badge: "ОКУТУУ",
    title: "КУРСТАР",
    titleGradient: "ПРОГРАММАЛАР",
    lead: "Сатууда 17 жылдык тажрыйбам менен мен 6 модулду иштеп чыктым, алар сизге күчтүү сатуу системасын түзүүгө, каршылыктар менен ишенимдүү иштөөгө жана кирешени туруктуу көбөйтүүгө жардам берет.",
    moduleTitles: [
      "Клиенттерди жоготпой кымбат сатуу",
      "Каршылыктар менен туура иштөө",
      "Потенциалдуу клиенттерди туруктуу кардарларга айландыруу",
      "Сунушту кардардын муктаждыгына ылайыктоо",
      "Ислам принциптери боюнча сатуу тактикалары",
      "Сатуу психологиясы жана ишкердин ой жүгүртүүсү",
    ],
    moduleItems: [
      [
        "Эмне үчүн кардар эң төмөнкү бааны сатып албайт",
        "Продукттун баалуулугун кантип түзүү керек",
        "Наркты ишенимдүү кантип айтуу керек",
        "Туруктуу арзандатуулардан кантип кутулуу керек",
        "Орточо чекти көбөйтүү",
      ],
      [
        "Каршылыктардын пайда болуу себептери",
        "Каршылыктардын негизги түрлөрү",
        "Каршылыктар менен иштөө алгоритми",
        "«Кымбат», «Ойлоном», «Убактым жок», «Акчам жок»",
        "Каршылыктардан кийин сөздү кантип жабуу керек",
      ],
      [
        "Узак мөөнөттүү мамилелерди түзүү",
        "Кардардын ишенимин жогорулатуу",
        "Кайталануучу сатуулар",
        "Кардарлар базасы менен иштөө",
        "Сунуштарды алуу",
      ],
      [
        "Муктаждыктарды аныктоо",
        "Суроо берүү өнөрү",
        "Активдүү угуу",
        "Пайда аркылуу презентация",
        "Ар бир кардарга жекече мамиле",
      ],
      [
        "Халяль-сатуу жана чынчылдык",
        "Кардарлар менен баарлашуу этикасы",
        "Ишеним бизнестин негизи катары",
        "Соодада береке",
        "Алдамчылыксыз жана манипуляциясыз сатуу",
      ],
      [
        "Чечим кабыл алуу психологиясы",
        "Сатуудагы эмоциялар",
        "Сатуучунун ишенимдүүлүгү",
        "Лидерлик ой жүгүртүү",
        "Ийгиликтүү ишкердин дисциплинасы жана адаттары",
      ],
    ],
    ctaTitle: "Сапарыңызды баштаңыз",
    ctaBody:
      "Өзүңүзгө ыңгайлуу байланыш жолун тандаңыз — биз сизге ылайыктуу окуу форматын сунуштайбыз",
    whatsappButton: "WhatsApp аркылуу жазуу",
    instagramButton: "Instagram'га өтүү",
    ctaNote: "Жумуш убактысында жооп беребиз · милдеттүү эмес",
  },
};

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
    <section
      id="courses"
      className="relative py-32 overflow-hidden bg-black scroll-mt-24"
    >
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
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 tracking-tighter leading-[1.2]">
            {t.title}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 whitespace-nowrap sm:whitespace-normal inline-block">
              {t.titleGradient}
            </span>
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-white/90">
            {t.lead}
          </p>
        </motion.div>

        {/* 6 Модулей в сетке 2x3 */}
        <div className="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {t.moduleTitles.map((title, i) => {
            const mod = modules[i];
            const Icon = mod.icon;
            const items = t.moduleItems[i];

            return (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group"
              >
                <div
                  className={`h-full rounded-2xl border ${mod.borderColor} bg-white/[0.03] backdrop-blur-sm p-6 transition-all duration-500 hover:shadow-xl ${mod.shadowColor} hover:-translate-y-2 relative overflow-hidden`}
                >
                  {/* Фоновый градиент при ховере */}
                  <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b ${mod.bgColor}`}
                  />

                  <div className="relative z-10">
                    {/* Номер модуля */}
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${mod.color} text-white shadow-lg`}
                      >
                        <Icon className="h-6 w-6" strokeWidth={2} />
                      </div>
                      <span
                        className={`text-4xl font-black bg-gradient-to-r ${mod.color} bg-clip-text text-transparent opacity-30`}
                      >
                        {mod.number}
                      </span>
                    </div>

                    {/* Название модуля */}
                    <h3 className="mb-4 text-lg font-bold text-white leading-snug min-h-[3.5rem]">
                      {title}
                    </h3>

                    {/* Разделитель */}
                    <div
                      className={`w-12 h-0.5 rounded-full bg-gradient-to-r ${mod.color} mb-4`}
                    />

                    {/* Список пунктов */}
                    <ul className="space-y-2.5">
                      {items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2
                            className={`h-4 w-4 min-w-4 mt-0.5 bg-gradient-to-r ${mod.color} bg-clip-text text-transparent fill-current`}
                            style={{
                              color:
                                idx === 0
                                  ? "rgb(59,130,246)"
                                  : idx === 1
                                  ? "rgb(168,85,247)"
                                  : idx === 2
                                  ? "rgb(16,185,129)"
                                  : idx === 3
                                  ? "rgb(245,158,11)"
                                  : "rgb(139,92,246)",
                            }}
                          />
                          <span className="text-sm text-white/80 group-hover:text-white/90 transition-colors duration-300">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Блок */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-sm p-6 sm:p-8 md:p-10 text-center shadow-2xl"
        >
          <h3 className="mb-3 text-xl sm:text-2xl md:text-3xl font-black text-white">
            {t.ctaTitle}
          </h3>
          <p className="mb-6 sm:mb-8 text-sm sm:text-base md:text-lg leading-relaxed text-gray-300">
            {t.ctaBody}
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            {/* WhatsApp Button */}
            <button
              type="button"
              onClick={openWa}
              aria-label={t.whatsappButton}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold text-indigo-700 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 active:scale-[0.97] sm:w-auto"
            >
              <MessageCircle className="h-5 w-5 shrink-0 transition-transform group-hover:scale-110" />
              <span className="whitespace-nowrap">{t.whatsappButton}</span>
            </button>

            {/* Instagram Button */}
            <button
              type="button"
              onClick={openInstagram}
              aria-label={t.instagramButton}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 active:scale-[0.97] sm:w-auto"
            >
              <InstagramIcon />
              <span className="whitespace-nowrap">{t.instagramButton}</span>
            </button>
          </div>

          <p className="mt-5 text-xs text-white/70">{t.ctaNote}</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Courses;