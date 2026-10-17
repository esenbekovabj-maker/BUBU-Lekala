import React from 'react';
import { Scissors, Printer, Cpu, Compass, Layers, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';

interface BishkekProductionProps {
  onOrderClick: () => void;
}

export const BishkekProduction: React.FC<BishkekProductionProps> = ({ onOrderClick }) => {
  return (
    <section id="cad-workflow" className="py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 uppercase tracking-wider">
            <span>ПРОИЗВОДСТВЕННЫЙ КЛАСТЕР БИШКЕКА</span>
            <span>·</span>
            <span>ПОЧЕМУ НАШИ ЛЕКАЛА ВЫБИРАЮТ ЦЕХА</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 mt-2">
            Спроектировано для фабрик и швейных цехов Кыргызстана
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2">
            Бишкек — главный центр производства одежды в Центральной Азии. Мы строим лекала с глубоким пониманием специфики местных швейных потоков, свойств тканей с рынков Мадина и Дордой, а также оборудования местных цехов.
          </p>
        </div>

        {/* 3 Pillars Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Fabric Savings */}
          <div className="bg-stone-50 rounded-2xl p-6 sm:p-8 border border-stone-200 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center mb-4">
                <Scissors className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-stone-900">
                Экономия до 12% ткани на автораскладках
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                В САПР Grafis мы создаем плотную раскладку деталей под точную ширину вашего рулона (140, 150, 160 или 180 см). Минимальные межлекальные выпады экономят десятки метров ткани при настиле партии.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-200/80 text-xs text-emerald-800 font-mono">
              КИМ раскладки: 89% — 93%
            </div>
          </div>

          {/* Card 2: 100% Factory Compatibility */}
          <div className="bg-stone-50 rounded-2xl p-6 sm:p-8 border border-stone-200 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-stone-200 text-stone-800 rounded-xl flex items-center justify-center mb-4">
                <Printer className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-stone-900">
                Широкоформатный плоттер 180 см в Бишкеке
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                Печатаем лекала на плотной бумаге в масштабе 1:1 в день обращения. Вам не нужно искать где распечатать — забирайте готовые рулоны на ул. Горького, 19 или заказывайте доставку прямо в ваш цех.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-200/80 text-xs text-stone-700 font-mono">
              Печать за 1–2 часа · Термобумага 80г
            </div>
          </div>

          {/* Card 3: Fabric Testing & Shrinkage */}
          <div className="bg-stone-50 rounded-2xl p-6 sm:p-8 border border-stone-200 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-amber-100 text-amber-800 rounded-xl flex items-center justify-center mb-4">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-stone-900">
                Учет усадки полотна после стирки
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                Турецкий и китайский трикотаж (футер, кулирка) дает усадку до 5% по длине. Мы закладываем расчетные коэффициенты усадки в лекала, поэтому после стирки изделие строго соответствует размерной сетке.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-200/80 text-xs text-amber-800 font-mono">
              Нулевой процент возвратов по ростовке
            </div>
          </div>
        </div>

        {/* Step-by-step production flow strip */}
        <div className="mt-14 p-6 sm:p-8 bg-stone-900 text-white rounded-2xl">
          <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-6">
            ЭТАПЫ СОТРУДНИЧЕСТВА: ОТ ИДЕИ ДО ПАРТИИ
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs sm:text-sm">
            <div className="space-y-1.5">
              <div className="text-emerald-400 font-mono font-bold text-base">01. Заявка и фото</div>
              <p className="text-stone-300">
                Вы присылаете фото, референс с маркетплейса или готовый образец для снятия мерок.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-emerald-400 font-mono font-bold text-base">02. Построение базы</div>
              <p className="text-stone-300">
                Конструктор строит базовое лекало в САПР Grafis с учетом припусков и свойств ткани.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-emerald-400 font-mono font-bold text-base">03. Примерка и правки</div>
              <p className="text-stone-300">
                Виртуальная примерка в Clo3D или отшив макета из бязи/полотна для утверждения посадки.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-emerald-400 font-mono font-bold text-base">04. Градация и файлы</div>
              <p className="text-stone-300">
                Размножение по размерам, табель мер, автораскладка и передача файлов PLT/DXF или печать.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-stone-400">
              Работаем как с начинающими брендами от 1 модели, так и с крупными фабриками с сериями по 50 000 ед.
            </div>
            <button
              onClick={onOrderClick}
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs rounded-xl transition-colors shrink-0"
            >
              Оставить заявку на разработку
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
