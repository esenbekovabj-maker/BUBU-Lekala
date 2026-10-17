import React, { useState } from 'react';
import { PRICE_CATEGORIES, ADDITIONAL_SERVICES, EXCHANGE_RATES } from '../data/pricing';
import { Currency } from '../types';
import { Calculator as CalcIcon, Check, ArrowRight, Layers, FileText, Box, Scissors, Printer } from 'lucide-react';

interface CalculatorProps {
  onTransferToOrder: (calculatedData: {
    category: string;
    gradingCount: number;
    addons: string[];
    totalKgs: number;
  }) => void;
}

export const Calculator: React.FC<CalculatorProps> = ({ onTransferToOrder }) => {
  const [selectedCatId, setSelectedCatId] = useState<string>(PRICE_CATEGORIES[0].id);
  const [gradingCount, setGradingCount] = useState<number>(4);
  const [currency, setCurrency] = useState<Currency>('KGS');

  // Addons state
  const [includeTechSpec, setIncludeTechSpec] = useState<boolean>(true);
  const [includeClo3D, setIncludeClo3D] = useState<boolean>(false);
  const [includeNesting, setIncludeNesting] = useState<boolean>(true);
  const [includePlotterPrint, setIncludePlotterPrint] = useState<boolean>(false);
  const [plotterMeters, setPlotterMeters] = useState<number>(6);
  const [includeSampleSewing, setIncludeSampleSewing] = useState<boolean>(false);

  const activeCategory = PRICE_CATEGORIES.find((c) => c.id === selectedCatId) || PRICE_CATEGORIES[0];

  // Price Calculation in KGS
  const basePrice = activeCategory.basePriceKgs;
  const gradingTotal = gradingCount * activeCategory.gradingPriceKgs;
  const techSpecTotal = includeTechSpec ? 600 : 0;
  const clo3DTotal = includeClo3D ? 1500 : 0;
  const nestingTotal = includeNesting ? 800 : 0;
  const plotterTotal = includePlotterPrint ? plotterMeters * 150 : 0;
  const sampleSewingTotal = includeSampleSewing ? activeCategory.sampleSewingKgs : 0;

  const totalKgs =
    basePrice +
    gradingTotal +
    techSpecTotal +
    clo3DTotal +
    nestingTotal +
    plotterTotal +
    sampleSewingTotal;

  // Format currency helper
  const formatPrice = (amountKgs: number) => {
    if (currency === 'KGS') {
      return `${Math.round(amountKgs).toLocaleString('ru-RU')} сом`;
    } else if (currency === 'RUB') {
      const rub = amountKgs * EXCHANGE_RATES.RUB;
      return `${Math.round(rub).toLocaleString('ru-RU')} ₽`;
    } else {
      const usd = amountKgs * EXCHANGE_RATES.USD;
      return `$${usd.toFixed(0)}`;
    }
  };

  const handleTransfer = () => {
    const addons: string[] = [];
    if (includeTechSpec) addons.push('Табель мер и тех. спецификация');
    if (includeClo3D) addons.push('3D примерка в Clo 3D');
    if (includeNesting) addons.push('Оптимальная раскладка для настила');
    if (includePlotterPrint) addons.push(`Печать на плоттере (${plotterMeters} м)`);
    if (includeSampleSewing) addons.push('Пошив эталонного образца');

    onTransferToOrder({
      category: activeCategory.title,
      gradingCount,
      addons,
      totalKgs,
    });
  };

  return (
    <div id="calculator" className="bg-stone-900 text-stone-100 rounded-2xl p-6 sm:p-8 lg:p-10 border border-stone-800 shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
            <CalcIcon className="w-4 h-4" />
            <span>ОНЛАЙН КАЛЬКУЛЯТОР РАЗРАБОТКИ ЛЕКАЛ</span>
            <span>·</span>
            <span>ПРОЗРАЧНЫЙ РАСЧЕТ</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
            Рассчитать предварительную стоимость заказа
          </h3>
          <p className="text-xs sm:text-sm text-stone-400 mt-1">
            Выберите тип изделия, количество размеров градации и необходимые сопроводительные файлы для цеха
          </p>
        </div>

        {/* Currency Switcher */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-stone-400">Валюта:</span>
          <div className="flex bg-stone-950 p-1 rounded-lg border border-stone-800">
            {(['KGS', 'RUB', 'USD'] as Currency[]).map((cur) => (
              <button
                key={cur}
                onClick={() => setCurrency(cur)}
                className={`px-2.5 py-1 text-xs font-mono font-medium rounded transition-colors ${
                  currency === cur
                    ? 'bg-stone-800 text-emerald-400 shadow-xs'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                {cur === 'KGS' ? 'KGS (сом)' : cur === 'RUB' ? 'RUB (₽)' : 'USD ($)'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
        {/* Left Form Controls (8 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: Garment Category */}
          <div>
            <label className="block text-xs font-mono uppercase text-stone-400 mb-2">
              1. Категория изделия
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {PRICE_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCatId(cat.id)}
                  className={`p-3 rounded-xl text-left border text-xs transition-all ${
                    selectedCatId === cat.id
                      ? 'bg-stone-800 border-emerald-500/60 text-white shadow-xs'
                      : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:bg-stone-800/40 hover:text-stone-200'
                  }`}
                >
                  <div className="font-semibold text-stone-100 flex items-center justify-between">
                    <span>{cat.title}</span>
                    <span className="font-mono text-emerald-400 tabular-nums">
                      {formatPrice(cat.basePriceKgs)}
                    </span>
                  </div>
                  <div className="text-[11px] text-stone-500 mt-1 line-clamp-1">{cat.items}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Grading Count Slider */}
          <div className="p-4 bg-stone-950/60 rounded-xl border border-stone-800">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-mono uppercase text-stone-400">
                2. Градация размеров (помимо базового)
              </label>
              <span className="font-mono text-xs text-emerald-400 font-semibold tabular-nums">
                +{gradingCount} {gradingCount === 1 ? 'размер' : gradingCount < 5 ? 'размера' : 'размеров'} ({formatPrice(gradingTotal)})
              </span>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="range"
                min="0"
                max="10"
                value={gradingCount}
                onChange={(e) => setGradingCount(parseInt(e.target.value, 10))}
                className="w-full accent-emerald-500 bg-stone-800 h-2 rounded-lg cursor-pointer"
              />
              <span className="font-mono font-bold text-white text-base w-8 text-center tabular-nums">
                {gradingCount}
              </span>
            </div>

            <div className="flex justify-between text-[11px] text-stone-500 mt-2 font-mono">
              <span>0 (только база)</span>
              <span>4 размера (стандарт WB)</span>
              <span>10 размеров</span>
            </div>
          </div>

          {/* Step 3: Production Add-ons */}
          <div>
            <label className="block text-xs font-mono uppercase text-stone-400 mb-2">
              3. Сопроводительные производственные услуги
            </label>

            <div className="space-y-2">
              {/* Tech Spec */}
              <label className="flex items-start gap-3 p-3 bg-stone-950/60 rounded-xl border border-stone-800 hover:border-stone-700 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={includeTechSpec}
                  onChange={(e) => setIncludeTechSpec(e.target.checked)}
                  className="mt-0.5 rounded border-stone-700 text-emerald-500 focus:ring-0 w-4 h-4 bg-stone-800"
                />
                <div className="flex-1 text-xs">
                  <div className="flex items-center justify-between font-semibold text-stone-200">
                    <span>Табель мер готового изделия + спецификация для ОТК</span>
                    <span className="font-mono text-emerald-400">+{formatPrice(600)}</span>
                  </div>
                  <div className="text-stone-500 mt-0.5">
                    Таблица контрольных параметров по всем размерам с допусками для контроля швейного цеха
                  </div>
                </div>
              </label>

              {/* Marker Nesting */}
              <label className="flex items-start gap-3 p-3 bg-stone-950/60 rounded-xl border border-stone-800 hover:border-stone-700 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={includeNesting}
                  onChange={(e) => setIncludeNesting(e.target.checked)}
                  className="mt-0.5 rounded border-stone-700 text-emerald-500 focus:ring-0 w-4 h-4 bg-stone-800"
                />
                <div className="flex-1 text-xs">
                  <div className="flex items-center justify-between font-semibold text-stone-200">
                    <span>Оптимальная автораскладка настила в САПР (КИМ до 92%)</span>
                    <span className="font-mono text-emerald-400">+{formatPrice(800)}</span>
                  </div>
                  <div className="text-stone-500 mt-0.5">
                    Экономит 8–14% ткани на партии. Подгоняем под ширину рулона вашей ткани (150, 160, 180 см)
                  </div>
                </div>
              </label>

              {/* Clo 3D */}
              <label className="flex items-start gap-3 p-3 bg-stone-950/60 rounded-xl border border-stone-800 hover:border-stone-700 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={includeClo3D}
                  onChange={(e) => setIncludeClo3D(e.target.checked)}
                  className="mt-0.5 rounded border-stone-700 text-emerald-500 focus:ring-0 w-4 h-4 bg-stone-800"
                />
                <div className="flex-1 text-xs">
                  <div className="flex items-center justify-between font-semibold text-stone-200">
                    <span>3D виртуальная примерка в Clo 3D (проверка баланса и натяжения)</span>
                    <span className="font-mono text-emerald-400">+{formatPrice(1500)}</span>
                  </div>
                  <div className="text-stone-500 mt-0.5">
                    Устраняет ошибки кроя еще до закупки ткани; рендеры 360° подходят для карточки товара
                  </div>
                </div>
              </label>

              {/* Plotter print */}
              <div className="p-3 bg-stone-950/60 rounded-xl border border-stone-800 space-y-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includePlotterPrint}
                    onChange={(e) => setIncludePlotterPrint(e.target.checked)}
                    className="mt-0.5 rounded border-stone-700 text-emerald-500 focus:ring-0 w-4 h-4 bg-stone-800"
                  />
                  <div className="flex-1 text-xs">
                    <div className="flex items-center justify-between font-semibold text-stone-200">
                      <span>Широкоформатная печать лекал на плоттере (бумага 80 г/м²)</span>
                      <span className="font-mono text-emerald-400">
                        +{formatPrice(plotterMeters * 150)}
                      </span>
                    </div>
                    <div className="text-stone-500 mt-0.5">
                      Готовые выкройки на плотной бумаге в масштабе 1:1. Забор на ул. Горького, 19 или доставка
                    </div>
                  </div>
                </label>

                {includePlotterPrint && (
                  <div className="flex items-center gap-3 pl-7 pt-1 text-xs">
                    <span className="text-stone-400">Метраж печати:</span>
                    <input
                      type="number"
                      min="2"
                      max="40"
                      value={plotterMeters}
                      onChange={(e) => setPlotterMeters(Math.max(1, parseInt(e.target.value || '1', 10)))}
                      className="w-16 px-2 py-1 bg-stone-800 border border-stone-700 rounded text-center font-mono text-white"
                    />
                    <span className="text-stone-400">пог. м (150 сом/м)</span>
                  </div>
                )}
              </div>

              {/* Sample sewing */}
              <label className="flex items-start gap-3 p-3 bg-stone-950/60 rounded-xl border border-stone-800 hover:border-stone-700 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={includeSampleSewing}
                  onChange={(e) => setIncludeSampleSewing(e.target.checked)}
                  className="mt-0.5 rounded border-stone-700 text-emerald-500 focus:ring-0 w-4 h-4 bg-stone-800"
                />
                <div className="flex-1 text-xs">
                  <div className="flex items-center justify-between font-semibold text-stone-200">
                    <span>Пошив эталонного образца (макета) в Бишкеке</span>
                    <span className="font-mono text-emerald-400">
                      +{formatPrice(activeCategory.sampleSewingKgs)}
                    </span>
                  </div>
                  <div className="text-stone-500 mt-0.5">
                    Отшив образца в экспериментальном цехе для живой примерки и проверки узлов обработки
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Summary Card (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="p-6 bg-stone-950 rounded-2xl border border-stone-800 sticky top-24 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <span className="text-xs font-mono uppercase text-stone-400">Итоговая смета</span>
              <span className="text-xs text-emerald-400 font-mono">Срок: {activeCategory.leadTimeDays}</span>
            </div>

            {/* Breakdown Items */}
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-stone-300">
                <span>Базовый комплект ({activeCategory.title}):</span>
                <span className="font-mono font-semibold tabular-nums">{formatPrice(basePrice)}</span>
              </div>

              {gradingCount > 0 && (
                <div className="flex justify-between text-stone-300">
                  <span>Градация ({gradingCount} разм. × {formatPrice(activeCategory.gradingPriceKgs)}):</span>
                  <span className="font-mono font-semibold tabular-nums">{formatPrice(gradingTotal)}</span>
                </div>
              )}

              {includeTechSpec && (
                <div className="flex justify-between text-stone-300">
                  <span>Табель мер и спецификация:</span>
                  <span className="font-mono tabular-nums">{formatPrice(techSpecTotal)}</span>
                </div>
              )}

              {includeNesting && (
                <div className="flex justify-between text-stone-300">
                  <span>Оптимальная раскладка САПР:</span>
                  <span className="font-mono tabular-nums">{formatPrice(nestingTotal)}</span>
                </div>
              )}

              {includeClo3D && (
                <div className="flex justify-between text-stone-300">
                  <span>3D примерка в Clo 3D:</span>
                  <span className="font-mono tabular-nums">{formatPrice(clo3DTotal)}</span>
                </div>
              )}

              {includePlotterPrint && (
                <div className="flex justify-between text-stone-300">
                  <span>Плоттерная печать ({plotterMeters} м):</span>
                  <span className="font-mono tabular-nums">{formatPrice(plotterTotal)}</span>
                </div>
              )}

              {includeSampleSewing && (
                <div className="flex justify-between text-stone-300">
                  <span>Пошив эталонного образца:</span>
                  <span className="font-mono tabular-nums">{formatPrice(sampleSewingTotal)}</span>
                </div>
              )}
            </div>

            {/* Total box */}
            <div className="pt-4 border-t border-stone-800">
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-semibold text-stone-300">ИТОГО К ОПЛАТЕ:</span>
                <div className="text-right">
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono tabular-nums">
                    {formatPrice(totalKgs)}
                  </div>
                  {currency !== 'KGS' && (
                    <div className="text-[11px] font-mono text-stone-500 tabular-nums">
                      ≈ {totalKgs.toLocaleString('ru-RU')} сом
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Fabric economy proof */}
            {includeNesting && (
              <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-800/60 text-xs text-emerald-200">
                <div className="font-semibold">Расчетная выгода от раскладки:</div>
                <div className="text-[11px] text-emerald-300/90 mt-0.5">
                  При партии 300 шт. экономия ткани составит ~35–45 метров (экономия от ~12 000 сом на полотне).
                </div>
              </div>
            )}

            {/* Transfer to Order Form button */}
            <button
              onClick={handleTransfer}
              className="w-full py-3 text-xs sm:text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 font-sans"
            >
              <span>Перенести расчет в форму заказа</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[11px] text-stone-500 text-center">
              Окончательная цена фиксируется после согласования эскиза, ткани и сложности модели
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
