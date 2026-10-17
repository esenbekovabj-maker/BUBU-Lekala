import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Для каких видов одежды вы разрабатываете лекала?',
      a: 'Мы разрабатываем лекала для абсолютно любой одежды: женской (платья, юбки, корсеты, брюки палаццо), мужской (карго, рубашки, чиносы, худи), трикотажа для маркетплейсов (футболки, свитшоты, оверсайз), верхней одежды (пальто, плащи, тренчи, пуховики), спортивной линейки (велосипедки, рашгарды), детской одежды от 86 до 164 ростовки и униформы.',
    },
    {
      q: 'В каких форматах передаются готовые файлы для цеха?',
      a: 'Мы выдаем файлы во всех производственных стандартах: PLT / HPGL для плоттеров раскройных цехов, DXF AAMA для переноса в любые САПР (Grafis, Gerber, Lectra, Gemini), полноразмерный PDF 1:1 для печати в копицентрах, а также PDF А4 с разбивкой по листам для сборки вручную. По запросу передаем проект Clo 3D.',
    },
    {
      q: 'Можно ли сделать лекала по фотографии из Wildberries, Pinterest или Zara?',
      a: 'Да, 70% наших заказчиков приходят именно с фото референсами. Конструктор анализирует пропорции изделия, рассчитывает технологические прибавки на свободу облегания и выстраивает конструкцию с нуля с соблюдением анатомического баланса.',
    },
    {
      q: 'Как вы учитываете усадку трикотажа (футер 3-нитка, кулирка)?',
      a: 'Если вы уже знаете процент усадки вашей партии ткани с рынков Мадина или Дордой (например, 3% по длине и 1.5% по ширине), мы сразу закладываем поправки в САПР. Если нет — вы можете передать нам отрез полотна 30х30 см, и мы проведем тестовую стирку и расчет коэффициентов.',
    },
    {
      q: 'Входят ли правки посадки в стоимость разработки?',
      a: 'Да, один полноценный этап корректировок после примерки первого образца (макета) входит в стоимость разработки базы. Мы вносим изменения в электронные лекала и обновляем всю градацию.',
    },
    {
      q: 'Где в Бишкеке можно забрать распечатанные лекала?',
      a: 'Наш плоттерный центр находится по адресу: г. Бишкек, ул. Горького, 19. Также работает доставка готовых рулонов курьером прямо в ваш швейный цех по Бишкеку или на рынок Дордой.',
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 sm:py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
            <span>ВОПРОСЫ И ОТВЕТЫ</span>
            <span>·</span>
            <span>ВСЕ О ПРОЦЕССЕ РАЗРАБОТКИ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
            Часто задаваемые вопросы
          </h2>
          <p className="text-stone-600 text-xs sm:text-base mt-2">
            Ответы на популярные вопросы о форматах, сроках, примерке и печати лекал для фабрик и брендов
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-stone-200 overflow-hidden transition-all shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 text-stone-900 font-semibold text-sm sm:text-base hover:text-emerald-700 transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className="p-1 rounded-lg bg-stone-100 text-stone-500 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
