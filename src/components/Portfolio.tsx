import React, { useState } from 'react';
import { PORTFOLIO_CATEGORIES, PORTFOLIO_ITEMS } from '../data/portfolio';
import { PortfolioItem } from '../types';
import { X, ArrowRight, Eye, Check, Scissors, Layers, Sparkles } from 'lucide-react';

interface PortfolioProps {
  onSelectItemForOrder: (item: PortfolioItem) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onSelectItemForOrder }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalItem, setActiveModalItem] = useState<PortfolioItem | null>(null);

  const filteredItems =
    selectedCategory === 'all'
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <section id="portfolio" className="py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 uppercase tracking-wider">
              <span>ПОРТФОЛИО КОНСТРУКТОРСКИХ РАЗРАБОТОК</span>
              <span>·</span>
              <span>РЕАЛЬНЫЕ КЕЙСЫ</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 mt-2">
              Примеры разработанных лекал и посадки
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-2xl">
              Каждое изделие построено с нуля в САПР с учетом усадки ткани, отработано на макете и проверено в серийном производстве фабрик Бишкека.
            </p>
          </div>

          {/* Interactive Category Filter Bar */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100 rounded-xl">
            {PORTFOLIO_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-white text-stone-900 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col bg-stone-50/50 rounded-2xl overflow-hidden border border-stone-200 hover:border-stone-400 hover:shadow-lg transition-all cursor-pointer"
              onClick={() => setActiveModalItem(item)}
            >
              {/* Image Container with 4:3 Aspect Ratio */}
              <div className="relative aspect-4/3 w-full overflow-hidden bg-stone-200">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-3.5 py-2 text-xs font-semibold text-white bg-stone-900/90 rounded-lg shadow-sm flex items-center gap-1.5 backdrop-blur-xs">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Смотреть табель мер и лекала</span>
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  {/* Clean unboxed metadata with separators */}
                  <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
                    <span>{item.categoryLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums">{item.detailsCount} дет.</span>
                    <span aria-hidden="true">·</span>
                    <span>КИМ {item.nestingEfficiency}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-stone-900 leading-snug group-hover:text-emerald-700 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-stone-200/80 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-stone-500">База / Градация: </span>
                    <span className="font-semibold text-stone-800">{item.gradingRange}</span>
                  </div>

                  <div className="text-right">
                    <span className="font-mono font-bold text-stone-900 text-sm tabular-nums">
                      {item.priceKgs.toLocaleString('ru-RU')} сом
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal: Detailed Spec Sheet & Measurements */}
        {activeModalItem && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/70 backdrop-blur-xs overflow-y-auto"
            onClick={() => setActiveModalItem(null)}
          >
            <div
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-stone-300 shadow-2xl relative my-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-xs px-6 py-4 border-b border-stone-200 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-stone-500 font-mono">
                    <span>АРТИКУЛ: {activeModalItem.id.toUpperCase()}</span>
                    <span>·</span>
                    <span>САПР GRAFIS</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-stone-900">
                    {activeModalItem.title}
                  </h3>
                </div>

                <button
                  onClick={() => setActiveModalItem(null)}
                  className="p-2 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
                  aria-label="Закрыть"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-8">
                {/* Visual + Core Specifications */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  <div className="rounded-xl overflow-hidden border border-stone-200 bg-stone-100">
                    <img
                      src={activeModalItem.image}
                      alt={activeModalItem.title}
                      className="w-full h-auto object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="space-y-4 text-xs sm:text-sm">
                    <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2.5">
                      <div className="flex justify-between">
                        <span className="text-stone-500">Базовый размер:</span>
                        <span className="font-semibold text-stone-900">{activeModalItem.baseSize}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Диапазон градации:</span>
                        <span className="font-semibold text-stone-900">{activeModalItem.gradingRange}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Количество деталей:</span>
                        <span className="font-mono text-stone-900 tabular-nums">{activeModalItem.detailsCount} элементов</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Расход на изделие:</span>
                        <span className="font-semibold text-stone-900">{activeModalItem.fabricConsumption}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Коэффициент настила (КИМ):</span>
                        <span className="font-mono font-semibold text-emerald-700">{activeModalItem.nestingEfficiency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Срок разработки:</span>
                        <span className="text-stone-900 font-medium">{activeModalItem.leadTime}</span>
                      </div>
                    </div>

                    <div>
                      <div className="font-semibold text-stone-900 mb-1">Рекомендуемые материалы:</div>
                      <ul className="list-disc list-inside text-stone-600 space-y-0.5 text-xs">
                        {activeModalItem.recommendedFabrics.map((fab, idx) => (
                          <li key={idx}>{fab}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <div className="font-semibold text-stone-900 mb-1">Файлы комплекта:</div>
                      <div className="flex flex-wrap gap-1.5">
                        {activeModalItem.cadFormats.map((fmt, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-stone-100 border border-stone-200 text-stone-700 rounded text-xs font-mono"
                          >
                            {fmt}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Measurements Table (Табель мер) */}
                <div>
                  <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wide mb-3 flex items-center gap-2">
                    <Scissors className="w-4 h-4 text-emerald-600" />
                    <span>Табель основных измерений готового образца (База: {activeModalItem.baseSize})</span>
                  </h4>

                  <div className="overflow-x-auto border border-stone-200 rounded-xl">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-stone-100/80 text-stone-600 font-semibold border-b border-stone-200">
                        <tr>
                          <th className="py-2.5 px-4">Параметр контроля измерения</th>
                          <th className="py-2.5 px-4 text-right">Значение (см)</th>
                          <th className="py-2.5 px-4 text-right">Допуск ГОСТ</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-200 font-mono">
                        {activeModalItem.measurements.map((m, idx) => (
                          <tr key={idx} className="hover:bg-stone-50">
                            <td className="py-2 px-4 font-sans text-stone-800">{m.name}</td>
                            <td className="py-2 px-4 text-right font-semibold text-stone-900 tabular-nums">
                              {m.value}
                            </td>
                            <td className="py-2 px-4 text-right text-stone-500 tabular-nums">± 0.5–1.0 см</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Features & Nuances */}
                <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-200/80">
                  <div className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-2">
                    Конструктивные особенности и производственная адаптация:
                  </div>
                  <ul className="space-y-1.5 text-xs text-emerald-950">
                    {activeModalItem.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Modal Footer CTA */}
              <div className="sticky bottom-0 bg-stone-50 px-6 py-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-stone-500">
                  Стоимость базового комплекта: <span className="font-bold text-stone-900 text-sm font-mono">{activeModalItem.priceKgs.toLocaleString('ru-RU')} сом</span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => setActiveModalItem(null)}
                    className="flex-1 sm:flex-none px-4 py-2.5 text-xs font-semibold text-stone-700 bg-white border border-stone-300 rounded-xl hover:bg-stone-100 transition-colors"
                  >
                    Закрыть
                  </button>
                  <button
                    onClick={() => {
                      const item = activeModalItem;
                      setActiveModalItem(null);
                      onSelectItemForOrder(item);
                    }}
                    className="flex-1 sm:flex-none px-5 py-2.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <span>Заказать похожую модель</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
