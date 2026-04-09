import React, { useContext, useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { ExternalLink, ChevronRight } from "lucide-react";
import { LanguageContext } from "../context/LanguageContext";

// Импорты ассетов
import asanmavlonov from "../assets/images/asanmavlonov.jpg";
import azasport from "../assets/images/azasport.jpg";
import kutman_nurlanbek from "../assets/images/kutman_nurlanbek.jpg";
import rahmanberdi from "../assets/images/rahmanberdi.jpg";
import rayber_barbershop from "../assets/images/rayber_barbershop.jpg";
import _barbershop from "../assets/images/_barbershop01.jpg";
import turan_ned from "../assets/images/turan_ned.jpg";
import turan_nedvizhimost from "../assets/images/turan_nedvizh.jpg";
import elitcamera from "../assets/images/elitcamera.jpg";
import smartcamera from "../assets/images/smartcamera.jpg";

function InstagramGlyph({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const AwardCard = ({ item, t, isMobile }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    if (isMobile) return;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const background = useMotionTemplate`
    radial-gradient(
      450px circle at ${mouseX}px ${mouseY}px,
      rgba(59, 130, 246, 0.25),
      transparent 80%
    )
  `;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="w-[280px] sm:w-[320px] md:w-[350px] flex-shrink-0 snap-center"
    >
      <div
        onClick={() => window.open(item.insta, "_blank")}
        onMouseMove={handleMouseMove}
        className="group relative flex flex-col bg-[#0f0f0f] border border-white/10 hover:border-blue-500/50 rounded-2xl cursor-pointer transition-all duration-500 h-full shadow-2xl overflow-hidden"
      >
        {/* Слой свечения карточки */}
        {isMobile ? (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/15 via-transparent to-transparent opacity-100" />
        ) : (
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 z-0"
            style={{ background }}
          />
        )}

        {/* Изображение */}
        <div className="relative aspect-[7/9] overflow-hidden">
          <img
            src={item.img}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-90" />
        </div>

        {/* Контент с живым дымком */}
        <div className="p-6 relative z-10 flex flex-col flex-grow glow-image-container">
          <div className="flex items-center justify-between mb-4 relative z-20">
            {/* Яркая иконка Инсты */}
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white shadow-[0_5px_15px_rgba(238,42,123,0.3)]">
              <InstagramGlyph className="h-5 w-5" />
            </div>
            <div className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]">
              {item.result}
            </div>
          </div>

          <h3 className="text-xl font-black text-white uppercase tracking-tight mb-1 group-hover:text-blue-400 transition-colors relative z-20">
            {item.name}
          </h3>
          <p className="text-[11px] font-medium text-blue-400/70 mb-3 tracking-wide relative z-20">{item.handle}</p>
          <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow relative z-20 italic">"{item.description}"</p>

          <div className="pt-4 border-t border-white/5 flex items-center justify-between relative z-20">
            <span className="text-xs font-bold uppercase tracking-widest text-white/50 group-hover:text-blue-400 transition-colors">
              {t.cta}
            </span>
            <ExternalLink size={16} className="text-white/30 group-hover:text-blue-400 transition-all" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ... resultsData и content (без изменений, оставляем твои)

const resultsData = {
  ru: [
    { name: "Асан Мавлонов", result: "20k → 1M+ сом", description: "Прошел путь от скромной зарплаты до статуса миллионера.", img: asanmavlonov, handle: "@asan_mavlonov", insta: "https://www.instagram.com/asan_mavlonov/" },
    { name: "Кутман Нурланбек", result: "Профессиональный рост", description: "Закрытие крупных сделок и внедрение скриптов Адамбека.", img: kutman_nurlanbek, handle: "@kutman_nurlanbek", insta: "https://www.instagram.com/kutman_nurlanbek/" },
    { name: "elitcamera", result: "Лидер продаж", description: "Масштабирование магазина систем видеонаблюдения через контент.", img: elitcamera, handle: "@elitcamera.kg", insta: "https://www.instagram.com/elitcamera.kg/" },
    { name: "smartcamera", result: "Системный маркетинг", description: "Автоматизация привлечения клиентов и создание узнаваемого бренда.", img: smartcamera, handle: "@smartcamera.kg", insta: "https://www.instagram.com/smartcamera.kg/" },
    { name: "turan_ned", result: "Масштабный рост", description: "Лидер рынка в нише зарубежной недвижимости и инвестиций.", img: turan_ned, handle: "@turan_ned", insta: "https://www.instagram.com/turan_ned/" },
    { name: "Aza Sport", result: "Системные продажи", description: "Внедрение системы продаж в крупнейший магазин спорттоваров.", img: azasport, handle: "@azasport_bishkek", insta: "https://www.instagram.com/azasport_bishkek/" },
    { name: "turan_nedvizhimost", result: "Сильный бренд", description: "Создание качественного медиа-присутствия в сфере жилья.", img: turan_nedvizhimost, handle: "@turan_nedvizhimost", insta: "https://www.instagram.com/turan_nedvizhimost/" },
    { name: "_barbershop01.kg", result: "Лояльные клиенты", description: "Построение системы сервиса и стабильного потока записей.", img: _barbershop, handle: "@_barbershop01.kg", insta: "https://www.instagram.com/_barbershop01.kg/" },
    { name: "Rayber Barber", result: "Масштабирование", description: "Построил сильный бренд и наладил поток лояльных клиентов.", img: rayber_barbershop, handle: "@rayber_barbershop", insta: "https://www.instagram.com/rayber_barbershop/" },
    { name: "Рахманберди", result: "Результат х3", description: "Увеличил личный доход и масштаб бизнеса после обучения.", img: rahmanberdi, handle: "@rahmanberdi_mavlonov", insta: "https://www.instagram.com/rahmanberdi_mavlonov/" },
  ],
  kg: [
    { name: "Асан Мавлонов", result: "20k → 1M+ сом", description: "Жөнөкөй айлыктан миллионер статусуна чейинки жолду басып өттү.", img: asanmavlonov, handle: "@asan_mavlonov", insta: "https://www.instagram.com/asan_mavlonov/" },
    { name: "Кутман Нурланбек", result: "Кесиптик өсүү", description: "Ири келишимдерди түзүү жана Адамбектин скрипттерин колдонуу.", img: kutman_nurlanbek, handle: "@kutman_nurlanbek", insta: "https://www.instagram.com/kutman_nurlanbek/" },
    { name: "elitcamera", result: "Сатуунун лидери", description: "Контент аркылуу видеокөзөмөл дүкөнүн өнүктүрүү.", img: elitcamera, handle: "@elitcamera.kg", insta: "https://www.instagram.com/elitcamera.kg/" },
    { name: "smartcamera", result: "Системалуу маркетинг", description: "Кардарларды тартууну автоматташтыруу жана таанымал бренд түзүү.", img: smartcamera, handle: "@smartcamera.kg", insta: "https://www.instagram.com/smartcamera.kg/" },
    { name: "turan_ned", result: "Масштабдуу өсүү", description: "Инвестиция жана чет өлкөлүк мүлк рыногунун лидери.", img: turan_ned, handle: "@turan_ned", insta: "https://www.instagram.com/turan_ned/" },
    { name: "Aza Sport", result: "Системалуу сатуу", description: "Спорт товарлар дүкөнүнө заманбап сатуу системасын киргизди.", img: azasport, handle: "@azasport_bishkek", insta: "https://www.instagram.com/azasport_bishkek/" },
    { name: "turan_nedvizhimost", result: "Күчтүү бренд", description: "Турак жай тармагында сапаттуу медиа-контент түзүү.", img: turan_nedvizhimost, handle: "@turan_nedvizhimost", insta: "https://www.instagram.com/turan_nedvizhimost/" },
    { name: "_barbershop01.kg", result: "Туруктуу кардарлар", description: "Тейлөө тутумун жана жазылуулардын туруктуу агымын түзүү.", img: _barbershop, handle: "@_barbershop01.kg", insta: "https://www.instagram.com/_barbershop01.kg/" },
    { name: "Rayber Barber", result: "Масштабдоо", description: "Күчтүү бренд куруп, туруктуу кардарлар агымын түздү.", img: rayber_barbershop, handle: "@rayber_barbershop", insta: "https://www.instagram.com/rayber_barbershop/" },
    { name: "Рахманберди", result: "Жыйынтык х3", description: "Окуудан кийин жеке кирешесин жана бизнесин өстүрдү.", img: rahmanberdi, handle: "@rahmanberdi_mavlonov", insta: "https://www.instagram.com/rahmanberdi_mavlonov/" },
  ],
};

const content = {
  ru: { badge: "ИСТОРИИ УСПЕХА", title: "РЕЗУЛЬТАТЫ", titleGradient: "УЧЕНИКОВ", cta: "Смотреть отзыв", showAll: "Показать всех", hideAll: "Скрыть" },
  kg: { badge: "ИЙГИЛИК ТАРЫХТАРЫ", title: "ШАКИРТТЕРДИН", titleGradient: "ЖЕТИШКЕНДИКТЕРИ", cta: "Пикирди көрүү", showAll: "Баарын көрүү", hideAll: "Жабуу" },
};

export const Awards = () => {
  const { language } = useContext(LanguageContext);
  const t = content[language];
  const results = resultsData[language];
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
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
    <section id="students" className="relative py-32 overflow-hidden bg-black">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-20">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 mb-6 border border-white/10 bg-white/5 backdrop-blur-md rounded-full">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-blue-400">{t.badge}</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tighter uppercase">
            {t.title}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">{t.titleGradient}</span>
          </h2>
        </motion.div>

        <div className="relative">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className={`flex gap-6 overflow-x-auto pb-8 no-scrollbar snap-x snap-mandatory 
              ${!showAll ? "md:flex md:justify-center" : "md:grid md:grid-cols-2 lg:grid-cols-3 md:max-w-fit md:mx-auto"} 
              md:overflow-visible md:pb-0 md:gap-y-12`}
          >
            {displayedResults.map((item, index) => (
              <AwardCard key={`${item.handle}-${index}`} item={item} t={t} isMobile={isMobile} />
            ))}
          </div>

          {isMobile && (
            <div className="flex justify-center items-center gap-2 mt-6">
              {displayedResults.map((_, idx) => (
                <div key={idx} className={`h-1.5 rounded-full transition-all duration-300 ${activeIndex === idx ? "w-8 bg-gradient-to-r from-blue-500 to-purple-500" : "w-1.5 bg-white/20"}`} />
              ))}
            </div>
          )}
        </div>

        {results.length > 3 && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => { setShowAll(!showAll); setActiveIndex(0); }}
              className="group inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold text-sm shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 bg-gradient-to-r from-blue-600 to-purple-600 text-white"
            >
              <span>{showAll ? t.hideAll : t.showAll}</span>
              <motion.div animate={{ rotate: showAll ? 180 : 0 }} transition={{ duration: 0.3 }}><ChevronRight className="w-4 h-4" /></motion.div>
            </button>
          </div>
        )}
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        .glow-image-container { position: relative; }

        .glow-image-container::before {
          content: "";
          position: absolute;
          inset: -1rem;
          z-index: 1;
          border-radius: inherit;
          background: linear-gradient(120deg, #3b82f6, #000000, #2563eb, #000000);
          background-size: 300% 300%;
          opacity: 0.6;
          filter: blur(2.0rem);
          animation: gradientShift 10s ease-in-out infinite;
          pointer-events: none;
        }

        .glow-image-container .relative.z-20 { z-index: 2; }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; transform: scale(1) translateY(0); }
          50% { background-position: 100% 50%; transform: scale(1.1) translateY(-10px); }
          100% { background-position: 0% 50%; transform: scale(1) translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default Awards;