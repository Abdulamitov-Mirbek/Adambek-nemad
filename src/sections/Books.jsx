// src/sections/Books.jsx
import React, { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

const content = {
  ru: {
    title: "КНИГИ",
    bookTitle: "Формула молодости",
    description: "Представьте: вы сохраняете энергию и остроту ума тридцатилетнего человека в свои девяносто и старше. Это больше не просто хорошая идея. Согласно статистике хронических заболеваний, 74% из нас умрут раньше времени от предотвратимых болезней. Хорошая новость в том, что мы можем обратить эти тенденции вспять благодаря технологическим прорывам.",
    button: "Купить на Amazon →"
  },
  kg: {
    title: "КИТЕПТЕР",
    bookTitle: "Жаштык формуласы",
    description: "Элестетип көрүңүз: сиз отуз жаштагы адамдын күч-кубатын жана акыл-эсинин курчтугун токсон жашка чейин жана андан да көпкө сактап каласыз. Бул эми жөн гана жакшы идея эмес. Өнөкөт оорулардын статистикасына ылайык, 74% адам алдын алууга боло турган оорулардан эрте өлөт. Жакшы кабар - биз бул тенденцияларды технологиялык жетишкендиктердин аркасында тескере алабыз.",
    button: "Amazon'дан сатып алуу →"
  }
};

export const Books = () => {
  const { language } = useContext(LanguageContext);
  const t = content[language];

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t.title}</h2>
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden md:flex">
            <div className="md:w-1/3 bg-gradient-to-br from-blue-500 to-purple-600 p-8 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-6xl mb-4">📚</div>
                <div className="text-2xl font-bold">{t.bookTitle}</div>
              </div>
            </div>
            <div className="md:w-2/3 p-8">
              <h3 className="text-2xl font-bold mb-4">{t.bookTitle}</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                {t.description}
              </p>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transition-all">
                {t.button}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Books;