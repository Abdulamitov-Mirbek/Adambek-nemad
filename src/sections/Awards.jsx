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
      className="w-[260px] sm:w-[300px] md:w-[350px] flex-shrink-0 snap-center"
    >
      <div
        onClick={() => window.open(item.insta, "_blank")}
        onMouseMove={handleMouseMove}
        className="group relative flex flex-col bg-[#0f0f0f] border border-white/10 hover:border-blue-500/50 rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-500 h-full shadow-2xl overflow-hidden"
      >
        {isMobile ? (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/15 via-transparent to-transparent opacity-100" />
        ) : (
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 z-0"
            style={{ background }}
          />
        )}

        <div className="relative aspect-[7/9] overflow-hidden">
          <img
            src={item.img}
            alt={item.name}
            loading="lazy"
            decoding="async"
            width={350}
            height={450}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-90" />
        </div>

        <div className="p-4 sm:p-6 relative z-10 flex flex-col flex-grow">
          <div className="flex items-center justify-between mb-3 sm:mb-4 relative z-20">
            <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white shadow-[0_5px_15px_rgba(238,42,123,0.3)]">
              <InstagramGlyph className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[8px] sm:text-[10px] font-black uppercase tracking-wider bg-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]">
              {item.result}
            </div>
          </div>

          <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight mb-0.5 sm:mb-1 group-hover:text-blue-400 transition-colors relative z-20">
            {item.name}
          </h3>
          <p className="text-[10px] sm:text-[11px] font-medium text-blue-400/70 mb-2 sm:mb-3 tracking-wide relative z-20">
            {item.handle}
          </p>

          <div className="pt-3 sm:pt-4 border-t border-white/5 flex items-center justify-between relative z-20 mt-auto">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/50 group-hover:text-blue-400 transition-colors">
              {t.cta}
            </span>
            <ExternalLink
              size={14}
              className="text-white/30 group-hover:text-blue-400 transition-all sm:w-4 sm:h-4"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Кнопка-обманка с 404 страницей в модальном окне
const FakeButton = ({ t }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="w-[260px] sm:w-[300px] md:w-[350px] flex-shrink-0 snap-center"
      >
        <div
          onClick={handleClick}
          className="group relative flex flex-col bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-dashed border-blue-500/50 hover:border-blue-400 rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-500 h-full overflow-hidden backdrop-blur-sm"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="flex flex-col items-center justify-center h-full p-5 sm:p-8 text-center relative z-10 min-h-[400px] sm:min-h-[500px]">
            <div className="w-14 h-14 sm:w-20 sm:h-20 mb-4 sm:mb-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.5)] group-hover:scale-110 transition-transform duration-300">
              <ChevronRight className="w-7 h-7 sm:w-10 sm:h-10 text-white" />
            </div>
            <h3 className="text-lg sm:text-2xl font-black text-white uppercase tracking-tight mb-2 sm:mb-3">
              {t.fakeButton}
            </h3>
            <p className="text-xs sm:text-sm text-white/60">{t.fakeSubtext}</p>
          </div>
        </div>
      </motion.div>

      {/* Модальное окно в стиле 404 ошибки */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
            onClick={() => setShowModal(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-red-500/30 rounded-2xl p-5 sm:p-8 max-w-lg w-full text-center shadow-2xl"
          >
            {/* Анимированный фон с ошибкой */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl">
              <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-br from-red-500/5 via-transparent to-purple-500/5 animate-spin-slow" />
            </div>

            {/* Код ошибки 404 */}
            <div className="relative z-10">
              <div className="text-6xl sm:text-8xl md:text-9xl font-black mb-3 sm:mb-4 tracking-tighter">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500">
                  404
                </span>
              </div>

              {/* Глитч-эффект */}
              <div className="relative">
                <h3
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 glitch-text"
                  data-text={t.errorTitle}
                >
                  {t.errorTitle}
                </h3>
              </div>

              <p className="text-gray-400 mb-4 sm:mb-6 text-base sm:text-lg">
                {t.errorMessage}
              </p>

              {/* Анимированная строка поиска */}
              <div className="mb-6 sm:mb-8 max-w-md mx-auto">
                <div className="relative">
                  <div className="w-full bg-white/5 border border-white/10 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-left text-gray-500 font-mono text-xs sm:text-sm">
                    <span className="text-red-400">$</span> find /students/more
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-shimmer" />
                </div>
                <div className="text-left mt-2 font-mono text-[10px] sm:text-xs text-gray-600">
                  <span className="text-red-400">Error:</span> Resource not
                  found in database
                </div>
              </div>

              {/* Кнопки действий */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-5 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full text-white font-bold transition-all transform hover:scale-105"
                >
                  {t.closeButton}
                </button>
                <button
                  onClick={() =>
                    window.open(
                      "https://www.instagram.com/adambek.neemat?igsh=aDJ1YXQ1eGRjYXlx",
                      "_blank",
                    )
                  }
                  className="px-5 sm:px-6 py-2 sm:py-2.5 bg-white/5 hover:bg-white/10 border border-white/20 rounded-full text-white font-bold transition-all"
                >
                  Instagram →
                </button>
              </div>

              {/* Дополнительная информация */}
              <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-white/10 text-[10px] sm:text-xs text-gray-600 font-mono">
                <p>Reference ID: ERR_404_STUDENTS_NOT_FOUND</p>
                <p className="mt-1">Timestamp: {new Date().toLocaleString()}</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .glitch-text {
          position: relative;
          animation: glitch 0.3s infinite;
        }
        
        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        
        .glitch-text::before {
          left: 2px;
          text-shadow: -2px 0 red;
          clip: rect(24px, 550px, 90px, 0);
          animation: glitch-anim 0.3s infinite linear alternate-reverse;
        }
        
        .glitch-text::after {
          left: -2px;
          text-shadow: -2px 0 blue;
          clip: rect(85px, 550px, 140px, 0);
          animation: glitch-anim2 0.3s infinite linear alternate-reverse;
        }
        
        @keyframes glitch {
          2%, 64% { transform: translate(2px,0) skew(0deg); }
          4%, 60% { transform: translate(-2px,0) skew(0deg); }
          62% { transform: translate(0,0) skew(5deg); }
        }
        
        @keyframes glitch-anim {
          0% { clip: rect(42px, 9999px, 44px, 0); transform: skew(0.3deg); }
          5% { clip: rect(12px, 9999px, 59px, 0); transform: skew(0.03deg); }
          10% { clip: rect(48px, 9999px, 29px, 0); transform: skew(0.72deg); }
          15% { clip: rect(42px, 9999px, 73px, 0); transform: skew(0.7deg); }
          20% { clip: rect(63px, 9999px, 27px, 0); transform: skew(0.15deg); }
          25% { clip: rect(34px, 9999px, 55px, 0); transform: skew(0.16deg); }
          30% { clip: rect(86px, 9999px, 73px, 0); transform: skew(0.81deg); }
          35% { clip: rect(20px, 9999px, 23px, 0); transform: skew(0.85deg); }
          40% { clip: rect(69px, 9999px, 61px, 0); transform: skew(0.82deg); }
          45% { clip: rect(37px, 9999px, 24px, 0); transform: skew(0.31deg); }
          50% { clip: rect(41px, 9999px, 55px, 0); transform: skew(0.64deg); }
          55% { clip: rect(89px, 9999px, 53px, 0); transform: skew(0.17deg); }
          60% { clip: rect(15px, 9999px, 68px, 0); transform: skew(0.98deg); }
          65% { clip: rect(72px, 9999px, 34px, 0); transform: skew(0.74deg); }
          70% { clip: rect(18px, 9999px, 72px, 0); transform: skew(0.65deg); }
          75% { clip: rect(50px, 9999px, 86px, 0); transform: skew(0.45deg); }
          80% { clip: rect(72px, 9999px, 99px, 0); transform: skew(0.52deg); }
          85% { clip: rect(45px, 9999px, 79px, 0); transform: skew(0.1deg); }
          90% { clip: rect(86px, 9999px, 82px, 0); transform: skew(0.49deg); }
          95% { clip: rect(57px, 9999px, 47px, 0); transform: skew(0.34deg); }
          100% { clip: rect(89px, 9999px, 56px, 0); transform: skew(0.05deg); }
        }
        
        @keyframes glitch-anim2 {
          0% { clip: rect(65px, 9999px, 100px, 0); transform: skew(0.88deg); }
          5% { clip: rect(46px, 9999px, 41px, 0); transform: skew(0.35deg); }
          10% { clip: rect(22px, 9999px, 28px, 0); transform: skew(0.42deg); }
          15% { clip: rect(97px, 9999px, 76px, 0); transform: skew(0.76deg); }
          20% { clip: rect(18px, 9999px, 69px, 0); transform: skew(0.29deg); }
          25% { clip: rect(10px, 9999px, 44px, 0); transform: skew(0.6deg); }
          30% { clip: rect(97px, 9999px, 73px, 0); transform: skew(0.27deg); }
          35% { clip: rect(19px, 9999px, 100px, 0); transform: skew(0.68deg); }
          40% { clip: rect(76px, 9999px, 20px, 0); transform: skew(0.15deg); }
          45% { clip: rect(81px, 9999px, 83px, 0); transform: skew(0.1deg); }
          50% { clip: rect(68px, 9999px, 97px, 0); transform: skew(0.03deg); }
          55% { clip: rect(92px, 9999px, 25px, 0); transform: skew(0.56deg); }
          60% { clip: rect(51px, 9999px, 21px, 0); transform: skew(0.25deg); }
          65% { clip: rect(30px, 9999px, 90px, 0); transform: skew(0.65deg); }
          70% { clip: rect(62px, 9999px, 19px, 0); transform: skew(0.17deg); }
          75% { clip: rect(38px, 9999px, 54px, 0); transform: skew(0.55deg); }
          80% { clip: rect(98px, 9999px, 79px, 0); transform: skew(0.84deg); }
          85% { clip: rect(86px, 9999px, 37px, 0); transform: skew(0.44deg); }
          90% { clip: rect(18px, 9999px, 47px, 0); transform: skew(0.18deg); }
          95% { clip: rect(69px, 9999px, 48px, 0); transform: skew(0.93deg); }
          100% { clip: rect(11px, 9999px, 30px, 0); transform: skew(0.02deg); }
        }
      `}</style>
    </>
  );
};

const resultsData = {
  ru: [
    {
      name: "Асан Мавлонов",
      result: "20k → 1M+ сом",
      img: asanmavlonov,
      handle: "@asan_mavlonov",
      insta: "https://www.instagram.com/asan_mavlonov/",
    },
    {
      name: "Кутман Нурланбек",
      result: "Профессиональный рост",
      img: kutman_nurlanbek,
      handle: "@kutman_nurlanbek",
      insta: "https://www.instagram.com/kutman_nurlanbek/",
    },
    {
      name: "elitcamera",
      result: "Лидер продаж",
      img: elitcamera,
      handle: "@elitcamera.kg",
      insta: "https://www.instagram.com/elitcamera.kg/",
    },
    {
      name: "smartcamera",
      result: "Системный маркетинг",
      img: smartcamera,
      handle: "@smartcamera.kg",
      insta: "https://www.instagram.com/smartcamera.kg/",
    },
    {
      name: "turan_ned",
      result: "Масштабный рост",
      img: turan_ned,
      handle: "@turan_ned",
      insta: "https://www.instagram.com/turan_ned/",
    },
    {
      name: "Aza Sport",
      result: "Системные продажи",
      img: azasport,
      handle: "@azasport_bishkek",
      insta: "https://www.instagram.com/azasport_bishkek/",
    },
    {
      name: "turan_nedvizhimost",
      result: "Сильный бренд",
      img: turan_nedvizhimost,
      handle: "@turan_nedvizhimost",
      insta: "https://www.instagram.com/turan_nedvizhimost/",
    },
    {
      name: "_barbershop01.kg",
      result: "Лояльные клиенты",
      img: _barbershop,
      handle: "@_barbershop01.kg",
      insta: "https://www.instagram.com/_barbershop01.kg/",
    },
    {
      name: "Rayber Barber",
      result: "Масштабирование",
      img: rayber_barbershop,
      handle: "@rayber_barbershop",
      insta: "https://www.instagram.com/rayber_barbershop/",
    },
    {
      name: "Рахманберди",
      result: "Результат х3",
      img: rahmanberdi,
      handle: "@rahmanberdi_mavlonov",
      insta: "https://www.instagram.com/rahmanberdi_mavlonov/",
    },
  ],
  kg: [
    {
      name: "Асан Мавлонов",
      result: "20k → 1M+ сом",
      img: asanmavlonov,
      handle: "@asan_mavlonov",
      insta: "https://www.instagram.com/asan_mavlonov/",
    },
    {
      name: "Кутман Нурланбек",
      result: "Кесиптик өсүү",
      img: kutman_nurlanbek,
      handle: "@kutman_nurlanbek",
      insta: "https://www.instagram.com/kutman_nurlanbek/",
    },
    {
      name: "elitcamera",
      result: "Сатуунун лидери",
      img: elitcamera,
      handle: "@elitcamera.kg",
      insta: "https://www.instagram.com/elitcamera.kg/",
    },
    {
      name: "smartcamera",
      result: "Системалуу маркетинг",
      img: smartcamera,
      handle: "@smartcamera.kg",
      insta: "https://www.instagram.com/smartcamera.kg/",
    },
    {
      name: "turan_ned",
      result: "Масштабдуу өсүү",
      img: turan_ned,
      handle: "@turan_ned",
      insta: "https://www.instagram.com/turan_ned/",
    },
    {
      name: "Aza Sport",
      result: "Системалуу сатуу",
      img: azasport,
      handle: "@azasport_bishkek",
      insta: "https://www.instagram.com/azasport_bishkek/",
    },
    {
      name: "turan_nedvizhimost",
      result: "Күчтүү бренд",
      img: turan_nedvizhimost,
      handle: "@turan_nedvizhimost",
      insta: "https://www.instagram.com/turan_nedvizhimost/",
    },
    {
      name: "_barbershop01.kg",
      result: "Туруктуу кардарлар",
      img: _barbershop,
      handle: "@_barbershop01.kg",
      insta: "https://www.instagram.com/_barbershop01.kg/",
    },
    {
      name: "Rayber Barber",
      result: "Масштабдоо",
      img: rayber_barbershop,
      handle: "@rayber_barbershop",
      insta: "https://www.instagram.com/rayber_barbershop/",
    },
    {
      name: "Рахманберди",
      result: "Жыйынтык х3",
      img: rahmanberdi,
      handle: "@rahmanberdi_mavlonov",
      insta: "https://www.instagram.com/rahmanberdi_mavlonov/",
    },
  ],
};

const content = {
  ru: {
    badge: "ИСТОРИИ УСПЕХА",
    title: "РЕЗУЛЬТАТЫ",
    titleGradient: "УЧЕНИКОВ",
    cta: "Смотреть отзыв",
    fakeButton: "СМОТРЕТЬ ВСЕХ",
    fakeSubtext: "Больше историй в Instagram",
    errorTitle: "СТРАНИЦА НЕ НАЙДЕНА",
    errorMessage:
      "Извините, запрашиваемая страница не существует или была перемещена.",
    closeButton: "Вернуться",
  },
  kg: {
    badge: "ИЙГИЛИК ТАРЫХТАРЫ",
    title: "ШАКИРТТЕРДИН",
    titleGradient: "ЖЕТИШКЕНДИКТЕРИ",
    cta: "Пикирди көрүү",
    fakeButton: "БААРЫН КӨРҮҮ",
    fakeSubtext: "Дагы ийгиликтер Instagramда",
    errorTitle: "БЕТ ТАБЫЛГАН ЖОК",
    errorMessage: "Кечиресиз, суралган бет жок же жылдырылган.",
    closeButton: "Кайтуу",
  },
};

export const Awards = () => {
  const { language } = useContext(LanguageContext);
  const t = content[language];
  const results = resultsData[language];
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

  return (
    <section
      id="students"
      className="relative py-20 sm:py-32 overflow-hidden bg-black"
    >
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-16"
        >
          <div className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 mb-4 sm:mb-6 border border-white/10 bg-white/5 backdrop-blur-md rounded-full">
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-blue-400">
              {t.badge}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white mb-3 sm:mb-4 tracking-tighter uppercase leading-[1.2]">
            {t.title}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 whitespace-nowrap sm:whitespace-normal inline-block">
              {t.titleGradient}
            </span>
          </h2>
        </motion.div>

        <div className="relative">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 sm:pb-8 no-scrollbar snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible md:pb-0 md:gap-y-10 lg:gap-y-12"
          >
            {results.map((item, index) => (
              <AwardCard
                key={`${item.handle}-${index}`}
                item={item}
                t={t}
                isMobile={isMobile}
              />
            ))}
            <FakeButton t={t} />
          </div>

          {isMobile && (
            <div className="flex justify-center items-center gap-1 sm:gap-2 mt-4 sm:mt-6">
              {[...results, { id: "fake" }].map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1 sm:h-1.5 rounded-full transition-all duration-300 ${
                    activeIndex === idx
                      ? "w-5 sm:w-8 bg-gradient-to-r from-blue-500 to-purple-500"
                      : "w-1 sm:w-1.5 bg-white/20"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default Awards;
