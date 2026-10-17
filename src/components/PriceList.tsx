import React from 'react';
import { PRICE_CATEGORIES, ADDITIONAL_SERVICES } from '../data/pricing';
import { Calculator } from './Calculator';
import { Check, Clock, Layers, Scissors, FileSpreadsheet, Box, Printer } from 'lucide-react';

interface PriceListProps {
  onOrderCategory: (categoryTitle: string) => void;
  onTransferCalculator: (data: {
    category: string;
    gradingCount: number;
    addons: string[];
    totalKgs: number;
  }) => void;
}

export const PriceList: React.FC<PriceListProps> = ({
  onOrderCategory,
  onTransferCalculator,
}) => {
  return (
    <section id="pricing" className="py-16 sm:py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 uppercase tracking-wider">
            <span>ПРАЙС-ЛИСТ И ТАРИФЫ 2026</span>
            <span>·</span>
            <span>ФИКСИРОВАННЫЕ ЦЕНЫ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 mt-2">
            Стоимость разработки лекал и градаций
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2">
            Прозрачные расценки без скрытых доплат. В базовую стоимость входит разработка основы в САПР, припуски, контрольные надсечки и экспорт во все производственные форматы (PLT, DXF, PDF).
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRICE_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className={`bg-white rounded-2xl p-6 border transition-all flex flex-col justify-between ${
                cat.popular
                  ? 'border-emerald-600/60 shadow-md ring-1 ring-emerald-600/20'
                  : 'border-stone-200 shadow-xs hover:border-stone-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs text-stone-500 pb-2">
                  <span className="font-mono text-stone-400">Срок: {cat.leadTimeDays}</span>
                  {cat.popular && (
                    <span className="text-emerald-700 font-semibold font-mono text-[11px]">
                      Хит для WB
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-stone-900 mt-1">{cat.title}</h3>
                <p className="text-xs text-stone-500 mt-1 min-h-[32px]">{cat.items}</p>

                <div className="mt-5 pb-5 border-b border-stone-100">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-extrabold text-stone-900 font-mono tabular-nums">
                      {cat.basePriceKgs.toLocaleString('ru-RU')}
                    </span>
                    <span className="text-sm font-semibold text-stone-600">сом</span>
                    <span className="text-xs text-stone-400 ml-1">/ база</span>
                  </div>
                  <div className="text-xs text-stone-500 mt-1">
                    Градация: <span className="font-semibold text-stone-800 font-mono tabular-nums">+{cat.gradingPriceKgs} сом</span> за размер
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-xs text-stone-600">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Построение в САПР Grafis 12</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Файлы PLT, DXF AAMA, PDF 1:1</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Учет плотности и усадки ткани</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Пошив образца: <span className="font-mono font-medium text-stone-800">{cat.sampleSewingKgs} сом</span></span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100">
                <button
                  onClick={() => onOrderCategory(cat.title)}
                  className={`w-full py-2.5 text-xs font-semibold rounded-xl transition-colors ${
                    cat.popular
                      ? 'bg-stone-900 text-white hover:bg-stone-800'
                      : 'bg-stone-100 text-stone-800 hover:bg-stone-200'
                  }`}
                >
                  Заказать эту категорию
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Production Services Grid */}
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 uppercase tracking-wider mb-4">
            <span>ДОПОЛНИТЕЛЬНЫЕ ИНЖЕНЕРНЫЕ СЕРВИСЫ</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ADDITIONAL_SERVICES.map((srv) => (
              <div
                key={srv.id}
                className="bg-white p-5 rounded-xl border border-stone-200/80 hover:border-stone-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-stone-900">{srv.name}</h4>
                  </div>
                  <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                    {srv.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-stone-400 font-mono">{srv.unit}</span>
                  <span className="font-mono font-bold text-stone-900 text-sm tabular-nums">
                    {srv.priceKgs.toLocaleString('ru-RU')} сом
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Live Calculator */}
        <Calculator onTransferToOrder={onTransferCalculator} />
      </div>
    </section>
  );
};
