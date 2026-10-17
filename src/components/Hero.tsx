import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Cpu, Ruler, Printer } from 'lucide-react';

interface HeroProps {
  onOrderClick: () => void;
  onCalculateClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOrderClick, onCalculateClick }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-stone-200 bg-stone-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 2-column Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Proposition and Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Regional trust marker */}
            <div className="flex items-center gap-2 text-xs font-medium text-stone-600 mb-4">
              <span className="font-semibold text-stone-900">БЮРО «BUBU» · БИШКЕК</span>
              <span aria-hidden="true">·</span>
              <span>УЛ. ГОРЬКОГО, 19</span>
              <span aria-hidden="true">·</span>
              <span>САПР GRAFIS 12 & CLO 3D</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-900 leading-[1.15] text-balance">
              Конструкторское бюро лекал одежды «BUBU» в Бишкеке
            </h1>

            <p className="mt-5 text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl">
              Разрабатываем производственные комплекты лекал любой сложности от фото или эскиза за 48 часов. Точная посадка, градация по ГОСТ, табель мер и автораскладки в САПР с экономией ткани до 12% для швейных цехов.
            </p>

            {/* Quick checkmarks */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-stone-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Учет усадки турецкого и китайского трикотажа</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Файлы PLT, DXF AAMA, PDF для фабрик и плоттеров</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Печать лекал на плоттере 180 см (ул. Горького, 19)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>3D виртуальная примерка в Clo 3D до раскроя</span>
              </div>
            </div>

            {/* Primary & Secondary Actions */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={onOrderClick}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 group"
              >
                <span>Заказать разработку лекал</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={onCalculateClick}
                className="px-6 py-3.5 text-sm font-semibold text-stone-800 bg-white hover:bg-stone-100 border border-stone-300 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <span>Рассчитать стоимость онлайн</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5 relative flex items-stretch">
            <div className="w-full relative rounded-2xl overflow-hidden border border-stone-300/80 shadow-xl bg-stone-900">
              <img
                src="/src/assets/images/hero_pattern_cad_studio_1792068929191.jpg"
                alt="Конструкторское бюро лекал в Бишкеке — разработка в САПР Grafis и Clo 3D"
                className="w-full h-full object-cover min-h-[380px] lg:min-h-full"
                loading="eager"
                referrerPolicy="no-referrer"
              />
              
              {/* Measured contrast scrim and technical overlay caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent flex flex-col justify-end p-5 sm:p-6 text-white">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>CAD / CAM ИНЖЕНЕРИЯ</span>
                </div>
                <div className="text-sm sm:text-base font-semibold">
                  Индивидуальное построение и градация лекал
                </div>
                <p className="text-xs text-stone-300 mt-1">
                  Собственный широкоформатный плоттер 180 см на ул. Горького, 19 и экспериментальный цех в Бишкеке.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4-column KPI / Proof Bar below the hero split */}
        <div className="mt-12 pt-8 border-t border-stone-200 grid grid-cols-2 lg:grid-cols-4 gap-6 text-stone-800">
          <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-xs">
            <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-mono tabular-nums">
              1 450+
            </div>
            <div className="text-xs text-stone-500 mt-1 font-medium">
              Разработанных моделей для селлеров Wildberries и брендов
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-xs">
            <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-mono tabular-nums">
              48 часов
            </div>
            <div className="text-xs text-stone-500 mt-1 font-medium">
              Срок готовности базового комплекта лекал 1-3 категории
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-xs">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-mono tabular-nums">
              до 12%
            </div>
            <div className="text-xs text-stone-500 mt-1 font-medium">
              Экономия ткани на партии благодаря автораскладкам в САПР
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-xs">
            <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-mono tabular-nums">
              100%
            </div>
            <div className="text-xs text-stone-500 mt-1 font-medium">
              Совместимость с плоттерами швейных цехов Кыргызстана
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
