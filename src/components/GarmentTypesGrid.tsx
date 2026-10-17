import React from 'react';
import { Shirt, Sparkles, Layers, Package, ShieldCheck, HeartHandshake, Baby, Activity } from 'lucide-react';

interface GarmentTypesGridProps {
  onSelectCategory: (categoryName: string) => void;
}

export const GarmentTypesGrid: React.FC<GarmentTypesGridProps> = ({ onSelectCategory }) => {
  const garmentTypes = [
    {
      title: 'Женская одежда',
      desc: 'Платья миди и макси, брюки палаццо со стрелками, корсетные топы, юбки, струящиеся блузы, жакеты оверсайз.',
      badge: 'Популярное направление',
      cad: 'Grafis 12 · Баланс посадки',
    },
    {
      title: 'Трикотаж & WB / Ozon',
      desc: 'Худи со спущенным плечом, свитшоты, футболки плотностью 240г, джоггеры, костюмы из футера 3-нитки.',
      badge: 'Хит продаж',
      cad: 'Усадка полотна до 5%',
    },
    {
      title: 'Мужская линейка',
      desc: 'Рубашки оверсайз, карго с объемными карманами, спортивные штаны, классические брюки, лонгсливы.',
      badge: 'Выверенные пропорции',
      cad: 'Мужские базы ЦНИИШП',
    },
    {
      title: 'Верхняя одежда',
      desc: 'Двубортные тренчи с погонами, пальто-кокон, утепленные бомберы, стеганые жилеты, легкие пуховики.',
      badge: 'Пакет утеплителя',
      cad: 'Лекала верха + подклад',
    },
    {
      title: 'Activewear & Фитнес',
      desc: 'Рашгарды, леггинсы с моделирующим эффектом, велосипедки, спортивные топы с ластовицей под плоский шов.',
      badge: 'Высокая эластичность',
      cad: 'Отрицательные прибавки',
    },
    {
      title: 'Детская и подростковая',
      desc: 'Одежда для новорожденных, боди, комбинезоны, детские худи и школьная форма по ростовкам от 86 до 164 см.',
      badge: 'Ростовые сетки',
      cad: 'Нормы ГОСТ для детей',
    },
    {
      title: 'Униформа и спецодежда',
      desc: 'Медицинские костюмы, фартуки, поварская форма, корпоративная одежда для персонала ресторанов и клиник.',
      badge: 'Эргономика движения',
      cad: 'Технологичные швы',
    },
    {
      title: 'Домашняя одежда & белье',
      desc: 'Шелковые пижамные комплекты, кимоно, платья-комбинации по косой, муслиновые халаты и топы.',
      badge: 'Свободный крой',
      cad: 'Косой раскрой 45°',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 uppercase tracking-wider">
            <span>ШИРОКИЙ СПЕКТР РАЗРАБОТКИ</span>
            <span>·</span>
            <span>ЛЮБЫЕ ТИПЫ ИЗДЕЛИЙ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 mt-2">
            Разрабатываем лекала для всех видов одежды
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2">
            От простого базового трикотажа до сложной многослойной верхней одежды. Подготавливаем полный комплект технической документации для безостановочной работы швейного цеха.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {garmentTypes.map((g, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs hover:border-stone-400 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                  <span className="font-semibold text-stone-800">{g.badge}</span>
                </div>
                <h3 className="text-lg font-bold text-stone-900">{g.title}</h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                  {g.desc}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[11px] font-mono text-emerald-700 font-medium">
                  {g.cad}
                </span>
                <button
                  onClick={() => onSelectCategory(g.title)}
                  className="text-xs font-semibold text-stone-900 hover:text-emerald-700 transition-colors"
                >
                  Заказать →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
