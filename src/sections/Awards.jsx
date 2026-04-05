import React, { useContext, useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronRight } from "lucide-react";
import { LanguageContext } from "../context/LanguageContext";

// Импорты ассетов
import asanmavlonov from "../assets/images/asanmavlonov.jpg";
import azasport from "../assets/images/azasport.jpg";
import kutman_nurlanbek from "../assets/images/kutman_nurlanbek.jpg";
import rahmanberdi from "../assets/images/rahmanberdi.jpg";
import rayber_barbershop from "../assets/images/rayber_barbershop.jpg";
import kutman_nurlanbekovich from "../assets/images/kutman_nurlanbekovich.jpg";
import _barbershop from "../assets/images/_barbershop01.jpg";
import turan_ned from "../assets/images/turan_ned.jpg";
import turan_nedvizhimost from "../assets/images/turan_nedvizh.jpg";

const ENTERPRISE_HANDLES = new Set([
  "@turan_ned",
  "@azasport_bishkek",
  "@turan_nedvizhimost",
  "@_barbershop01.kg",
  "@rayber_barbershop",
]);

function InstagramGlyph({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const resultsData = {
  ru: [
    {
      name: "turan_ned",
      role: "Эксперт / Недвижимость",
      result: "Масштабный рост",
      description: "Лидер рынка в нише зарубежной недвижимости и инвестиций.",
      img: turan_ned,
      handle: "@turan_ned",
      insta: "https://www.instagram.com/turan_ned/",
    },
    {
      name: "Aza Sport",
      role: "Владелец бизнеса",
      result: "Системные продажи",
      description: "Внедрение системы продаж в крупнейший магазин спорттоваров.",
      img: azasport,
      handle: "@azasport_bishkek",
      insta: "https://www.instagram.com/azasport_bishkek/",
    },
    {
      name: "Кутман Нурланбек",
      role: "Топ-менеджер",
      result: "Профессиональный рост",
      description: "Закрытие крупных сделок и внедрение скриптов Адамбека.",
      img: kutman_nurlanbek,
      handle: "@kutman_nurlanbek",
      insta: "https://www.instagram.com/kutman_nurlanbek/",
    },
    {
      name: "Асан Мавлонов",
      role: "Топ-ученик / Миллионер",
      result: "20k → 1M+ сом",
      description: "Прошел путь от скромной зарплаты до статуса миллионера.",
      isGold: true,
      img: asanmavlonov,
      handle: "@asan_mavlonov",
      insta: "https://www.instagram.com/asan_mavlonov/",
    },
    {
      name: "Кутман Нурланбекович",
      role: "Эксперт / Продажи",
      result: "Личный бренд",
      description: "Выход на новый уровень чека и качества аудитории.",
      img: kutman_nurlanbekovich,
      handle: "@kutman_nurlanbekovich",
      insta: "https://www.instagram.com/kutman_nurlanbekovich/",
    },
    {
      name: "turan_nedvizhimost",
      role: "Агентство / Инвестиции",
      result: "Сильный бренд",
      description: "Создание качественного медиа-присутствия в сфере жилья.",
      img: turan_nedvizhimost,
      handle: "@turan_nedvizhimost",
      insta: "https://www.instagram.com/turan_nedvizhimost/",
    },
    {
      name: "_barbershop01.kg",
      role: "Владелец сети",
      result: "Лояльные клиенты",
      description: "Построение системы сервиса и стабильного потока записей.",
      img: _barbershop,
      handle: "@_barbershop01.kg",
      insta: "https://www.instagram.com/_barbershop01.kg/",
    },
    {
      name: "Rayber Barber",
      role: "Основатель сети",
      result: "Масштабирование",
      description: "Построил сильный бренд и наладил поток лояльных клиентов.",
      img: rayber_barbershop,
      handle: "@rayber_barbershop",
      insta: "https://www.instagram.com/rayber_barbershop/",
    },
    {
      name: "Рахманберди",
      role: "Предприниматель",
      result: "Результат х3",
      description: "Увеличил личный доход и масштаб бизнеса после обучения.",
      img: rahmanberdi,
      handle: "@rahmanberdi_mavlonov",
      insta: "https://www.instagram.com/rahmanberdi_mavlonov/",
    },
  ],
  kg: [
    {
      name: "turan_ned",
      role: "Эксперт / Кыймылсыз мүлк",
      result: "Масштабдуу өсүү",
      description: "Инвестиция жана чет өлкөлүк мүлк рыногунун лидери.",
      img: turan_ned,
      handle: "@turan_ned",
      insta: "https://www.instagram.com/turan_ned/",
    },
    {
      name: "Aza Sport",
      role: "Бизнес ээси",
      result: "Системалуу сатуу",
      description: "Спорт товарлар дүкөнүнө заманбап сатуу системасын киргизди.",
      img: azasport,
      handle: "@azasport_bishkek",
      insta: "https://www.instagram.com/azasport_bishkek/",
    },
    {
      name: "Кутман Нурланбек",
      role: "Топ-менеджер",
      result: "Кесиптик өсүү",
      description: "Ири келишимдерди түзүү жана Адамбектин скрипттерин колдонуу.",
      img: kutman_nurlanbek,
      handle: "@kutman_nurlanbek",
      insta: "https://www.instagram.com/kutman_nurlanbek/",
    },
    {
      name: "Асан Мавлонов",
      role: "Алдыңкы окуучу / Миллионер",
      result: "20k → 1M+ сом",
      description: "Жөнөкөй айлыктан миллионер статусуна чейинки жолду басып өттү.",
      isGold: true,
      img: asanmavlonov,
      handle: "@asan_mavlonov",
      insta: "https://www.instagram.com/asan_mavlonov/",
    },
    {
      name: "Кутман Нурланбекович",
      role: "Эксперт / Сатуу",
      result: "Жеке бренд",
      description: "Жогорку чекке чыгуу и аудиториянын сапатын жогорулатуу.",
      img: kutman_nurlanbekovich,
      handle: "@kutman_nurlanbekovich",
      insta: "https://www.instagram.com/kutman_nurlanbekovich/",
    },
    {
      name: "turan_nedvizhimost",
      role: "Агенттик / Инвестиция",
      result: "Күчтүү бренд",
      description: "Турак жай тармагында сапаттуу медиа-контент түзүү.",
      img: turan_nedvizhimost,
      handle: "@turan_nedvizhimost",
      insta: "https://www.instagram.com/turan_nedvizhimost/",
    },
    {
      name: "_barbershop01.kg",
      role: "Тармактын ээси",
      result: "Туруктуу кардарлар",
      description: "Тейлөө тутумун жана жазылуулардын туруктуу агымын түзүү.",
      img: _barbershop,
      handle: "@_barbershop01.kg",
      insta: "https://www.instagram.com/_barbershop01.kg/",
    },
    {
      name: "Rayber Barber",
      role: "Тармактын негиздөөчүсү",
      result: "Масштабдоо",
      description: "Күчтүү бренд куруп, туруктуу кардарлар агымын түздү.",
      img: rayber_barbershop,
      handle: "@rayber_barbershop",
      insta: "https://www.instagram.com/rayber_barbershop/",
    },
    {
      name: "Рахманберди",
      role: "Ишкер",
      result: "Жыйынтык х3",
      description: "Окуудан кийин жеке кирешесин жана бизнесин өстүрдү.",
      img: rahmanberdi,
      handle: "@rahmanberdi_mavlonov",
      insta: "https://www.instagram.com/rahmanberdi_mavlonov/",
    },
  ],
};

const content = {
  ru: {
    studentTitle: "УЧЕНИКИ",
    enterpriseTitle: "ПРЕДПРИЯТИЯ",
    cta: "Смотреть отзыв",
    showAll: "Показать всех →",
    hideAll: "Подождите немного или попробуйте снова...",
  },
  kg: {
    studentTitle: "ШАКИРТТЕР",
    enterpriseTitle: "ИШКАНАЛАР",
    cta: "Пикирди көрүү",
    showAll: "Бардыгын көрүү →",
    hideAll: "Сураныч, бир аз күтө туруңуз же кайра аракет кылыңыз...",
  },
};

function StoriesSection({ id, title, results, t, bgClass }) {
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const items = container.querySelectorAll(".snap-center");
    if (items.length === 0) return;

    const itemWidth = items[0].offsetWidth + 24;
    const index = Math.round(container.scrollLeft / itemWidth);
    setActiveIndex(index);
  };

  const displayedResults = showAll ? results : results.slice(0, 3);

  return (
    <section id={id} className={`scroll-mt-24 py-24 overflow-hidden ${bgClass}`}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[10px] font-black tracking-[0.3em] text-blue-600 uppercase bg-blue-50 px-3 py-1 rounded-full">
            SUCCESS STORIES
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-4 tracking-tighter uppercase leading-none">
            {title}
          </h2>
        </motion.div>

        <div className="relative">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className={`flex gap-6 overflow-x-auto pb-8 no-scrollbar snap-x snap-mandatory 
              ${!showAll 
                ? "md:flex md:justify-center" 
                : "md:grid md:grid-cols-2 lg:grid-cols-3 md:max-w-fit md:mx-auto"
              } 
              md:overflow-visible md:pb-0 md:gap-y-12`}
          >
            {displayedResults.map((item, index) => (
              <motion.div
                key={`${item.handle}-${index}`}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="w-[280px] sm:w-[320px] md:w-[350px] flex-shrink-0 snap-center"
              >
                <div
                  onClick={() => window.open(item.insta, "_blank")}
                  className={`group relative flex flex-col bg-white rounded-[2.5rem] border cursor-pointer transition-all duration-500 overflow-hidden h-full ${
                    item.isGold
                      ? "border-yellow-400 shadow-2xl shadow-yellow-50"
                      : "border-gray-100 shadow-xl shadow-gray-100/50"
                  }`}
                >
                  <div className="relative aspect-[7/9] overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {item.isGold && (
                      <div className="absolute top-5 left-5 bg-yellow-400 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                        Best Case
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white">
                        <InstagramGlyph className="h-4 w-4" />
                      </div>
                      <div
                        className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase ${
                          item.isGold ? "bg-yellow-100 text-yellow-700" : "bg-blue-50 text-blue-600"
                        }`}
                      >
                        {item.result}
                      </div>
                    </div>
                    <h3 className="text-xl font-black text-gray-900 uppercase leading-tight">
                      {item.name}
                    </h3>
                    <p className="text-[10px] font-mono text-pink-600 font-bold mb-3">
                      {item.handle}
                    </p>
                    <p className="text-gray-500 text-[11px] leading-relaxed italic mb-6">
                      "{item.description}"
                    </p>
                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between group/cta">
                      <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">
                        {t.cta}
                      </span>
                      <ExternalLink size={14} className="text-gray-300" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Пагинация: теперь не исчезает при нажатии кнопки */}
          {isMobile && (
            <div className="flex flex-col items-center mt-4 mb-2">
              <div className="flex justify-center items-center gap-3">
                {displayedResults.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      activeIndex === idx ? "w-10 bg-blue-600" : "w-2.5 bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {results.length > 3 && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => {
                setShowAll(!showAll);
                setActiveIndex(0);
              }}
              className={`group inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm shadow-xl transition-all duration-300 active:scale-95 ${
                showAll
                  ? "bg-white text-gray-900 border border-gray-200"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
              }`}
            >
              <span>{showAll ? t.hideAll : t.showAll}</span>
              <motion.div animate={{ rotate: showAll ? 180 : 0 }}>
                <ChevronRight className="w-4 h-4" />
              </motion.div>
            </button>
          </div>
        )}
      </div>
      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
    </section>
  );
}

export const Awards = () => {
  const { language } = useContext(LanguageContext);
  const t = content[language];
  const all = resultsData[language];
  const students = all.filter((r) => !ENTERPRISE_HANDLES.has(r.handle));
  const enterprises = all.filter((r) => ENTERPRISE_HANDLES.has(r.handle));

  return (
    <>
      <StoriesSection
        id="students"
        title={t.studentTitle}
        results={students}
        t={t}
        bgClass="bg-white"
      />
      <StoriesSection
        id="enterprises"
        title={t.enterpriseTitle}
        results={enterprises}
        t={t}
        bgClass="bg-gray-50"
      />
    </>
  );
};

export default Awards;