import React, { useState } from 'react';
import { Layers, Maximize2, Scissors, Check, Eye, Ruler, RefreshCw, ZoomIn, ZoomOut } from 'lucide-react';

interface CadViewerProps {
  onOrderClick: () => void;
}

export const CadViewer: React.FC<CadViewerProps> = ({ onOrderClick }) => {
  const [activeTab, setActiveTab] = useState<'pattern' | 'nesting'>('pattern');
  const [selectedPiece, setSelectedPiece] = useState<string>('front');
  const [showSeamAllowance, setShowSeamAllowance] = useState<boolean>(true);
  const [showGrading, setShowGrading] = useState<boolean>(true);
  const [showNotches, setShowNotches] = useState<boolean>(true);
  const [showGrainline, setShowGrainline] = useState<boolean>(true);
  const [activeSize, setActiveSize] = useState<string>('46');
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const sizes = ['42', '44', '46 (База)', '48', '50', '52'];

  const pieces = [
    { id: 'front', name: 'Полочка (Перед)', count: '1 деталь со сгибом' },
    { id: 'back', name: 'Спинка', count: '1 деталь со сгибом' },
    { id: 'sleeve', name: 'Рукав спущенный', count: '2 детали' },
    { id: 'hood', name: 'Капюшон анатомический', count: '2 детали верха + 2 подклад' },
    { id: 'pocket', name: 'Карман кенгуру', count: '1 деталь' },
  ];

  return (
    <div className="bg-slate-950 text-slate-100 rounded-2xl p-6 lg:p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
      {/* CAD Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono tracking-wider">
            <span>САПР GRAFIS v12</span>
            <span>·</span>
            <span>BUBU PATTERN LAB</span>
            <span>·</span>
            <span>БИШКЕК</span>
          </div>
          <h3 className="text-xl font-bold text-white mt-1">
            Интерактивный чертеж лекал: Худи Oversize Boxy Fit
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Точные векторные контуры, градация приращений по ГОСТ/ЦНИИШП, припуски на швы и технологические надсечки
          </p>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-2">
          <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setActiveTab('pattern')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                activeTab === 'pattern'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Конструкция лекал
            </button>
            <button
              onClick={() => setActiveTab('nesting')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                activeTab === 'nesting'
                  ? 'bg-slate-800 text-emerald-400 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Раскладка настила (91.4%)
            </button>
          </div>

          <button
            onClick={onOrderClick}
            className="px-3.5 py-1.5 text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-lg transition-colors shrink-0"
          >
            Заказать такие лекала
          </button>
        </div>
      </div>

      {/* Main CAD Canvas & Side Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 pt-6">
        {/* Left / Center: Interactive SVG Canvas */}
        <div className="lg:col-span-3 bg-slate-900/90 rounded-xl border border-slate-800/80 p-4 relative min-h-[420px] flex flex-col justify-between overflow-hidden">
          {/* Subtle engineering grid background */}
          <div 
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, #38bdf8 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          />

          {/* Top Controls on Canvas */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-1.5 bg-slate-950/80 px-2.5 py-1.5 rounded-lg border border-slate-800 text-slate-300">
              <span className="text-slate-500 font-mono">Базовый размер:</span>
              <span className="font-semibold text-white">46 (Рост 170)</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-500 font-mono">Припуск:</span>
              <span className="font-semibold text-emerald-400">7 мм / 25 мм</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.1))}
                className="p-1.5 bg-slate-950/80 rounded border border-slate-800 text-slate-400 hover:text-white transition-colors"
                title="Уменьшить"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono text-xs text-slate-400 w-12 text-center">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(1.4, z + 0.1))}
                className="p-1.5 bg-slate-950/80 rounded border border-slate-800 text-slate-400 hover:text-white transition-colors"
                title="Увеличить"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setZoomLevel(1)}
                className="p-1.5 bg-slate-950/80 rounded border border-slate-800 text-slate-400 hover:text-white transition-colors"
                title="Сбросить масштаб"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive SVG Diagram */}
          <div 
            className="relative z-10 my-4 flex items-center justify-center transition-transform duration-200"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            {activeTab === 'pattern' ? (
              <svg
                viewBox="0 0 760 380"
                className="w-full max-h-[340px] drop-shadow-md select-none"
              >
                <defs>
                  {/* Pattern grid */}
                  <pattern id="cadGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.75" />
                  </pattern>
                </defs>
                <rect width="760" height="380" fill="url(#cadGrid)" opacity="0.6" />

                {/* PIECE 1: Полочка (Front) */}
                <g 
                  onClick={() => setSelectedPiece('front')}
                  className="cursor-pointer transition-opacity"
                  opacity={selectedPiece === 'front' ? 1 : 0.65}
                >
                  {/* Seam allowance outer stroke if enabled */}
                  {showSeamAllowance && (
                    <path
                      d="M 50 40 L 155 40 L 160 85 L 180 155 L 180 340 L 50 340 Z"
                      fill="none"
                      stroke="#059669"
                      strokeWidth="1.2"
                      strokeDasharray="4 3"
                    />
                  )}
                  {/* Grading lines if enabled */}
                  {showGrading && (
                    <>
                      <path d="M 50 36 L 158 36 L 163 83 L 184 153 L 184 346 L 50 346 Z" fill="none" stroke="#38bdf8" strokeWidth="0.8" opacity="0.5" />
                      <path d="M 50 44 L 152 44 L 157 87 L 176 157 L 176 334 L 50 334 Z" fill="none" stroke="#ec4899" strokeWidth="0.8" opacity="0.5" />
                    </>
                  )}
                  {/* Main cut line */}
                  <path
                    d="M 50 40 L 155 40 C 135 48, 120 70, 115 85 L 175 110 C 160 140, 168 175, 175 190 L 175 330 L 50 330 Z"
                    fill={selectedPiece === 'front' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(51, 65, 85, 0.2)'}
                    stroke={selectedPiece === 'front' ? '#34d399' : '#94a3b8'}
                    strokeWidth="2"
                  />
                  {/* Grainline */}
                  {showGrainline && (
                    <g stroke="#94a3b8" strokeWidth="1">
                      <line x1="100" y1="120" x2="100" y2="280" strokeDasharray="3 3" />
                      <polygon points="97,125 100,118 103,125" fill="#94a3b8" />
                      <polygon points="97,275 100,282 103,275" fill="#94a3b8" />
                      <text x="106" y="200" fill="#94a3b8" fontSize="9" fontFamily="monospace">ДОЛЕВАЯ</text>
                    </g>
                  )}
                  {/* Notches */}
                  {showNotches && (
                    <g stroke="#f59e0b" strokeWidth="1.5">
                      <line x1="168" y1="140" x2="173" y2="137" />
                      <line x1="175" y1="230" x2="170" y2="230" />
                    </g>
                  )}
                  <text x="75" y="180" fill="#ffffff" fontSize="11" fontWeight="600">ПОЛОЧКА</text>
                  <text x="75" y="196" fill="#94a3b8" fontSize="9" fontFamily="monospace">1 дет. со сгибом</text>
                </g>

                {/* PIECE 2: Спинка (Back) */}
                <g 
                  onClick={() => setSelectedPiece('back')}
                  className="cursor-pointer transition-opacity"
                  opacity={selectedPiece === 'back' ? 1 : 0.65}
                >
                  {showSeamAllowance && (
                    <path
                      d="M 210 30 L 315 30 L 320 75 L 340 145 L 340 335 L 210 335 Z"
                      fill="none"
                      stroke="#059669"
                      strokeWidth="1.2"
                      strokeDasharray="4 3"
                    />
                  )}
                  {showGrading && (
                    <>
                      <path d="M 210 26 L 318 26 L 324 73 L 344 143 L 344 341 L 210 341 Z" fill="none" stroke="#38bdf8" strokeWidth="0.8" opacity="0.5" />
                      <path d="M 210 34 L 312 34 L 316 77 L 336 147 L 336 329 L 210 329 Z" fill="none" stroke="#ec4899" strokeWidth="0.8" opacity="0.5" />
                    </>
                  )}
                  <path
                    d="M 210 30 L 315 30 C 300 35, 285 45, 275 52 L 335 77 C 320 107, 328 142, 335 157 L 335 325 L 210 325 Z"
                    fill={selectedPiece === 'back' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(51, 65, 85, 0.2)'}
                    stroke={selectedPiece === 'back' ? '#34d399' : '#94a3b8'}
                    strokeWidth="2"
                  />
                  {showGrainline && (
                    <g stroke="#94a3b8" strokeWidth="1">
                      <line x1="260" y1="100" x2="260" y2="260" strokeDasharray="3 3" />
                      <polygon points="257,105 260,98 263,105" fill="#94a3b8" />
                      <polygon points="257,255 260,262 263,255" fill="#94a3b8" />
                      <text x="266" y="180" fill="#94a3b8" fontSize="9" fontFamily="monospace">СГИБ СПИНКИ</text>
                    </g>
                  )}
                  <text x="230" y="170" fill="#ffffff" fontSize="11" fontWeight="600">СПИНКА</text>
                  <text x="230" y="186" fill="#94a3b8" fontSize="9" fontFamily="monospace">1 дет. со сгибом</text>
                </g>

                {/* PIECE 3: Рукав (Sleeve) */}
                <g 
                  onClick={() => setSelectedPiece('sleeve')}
                  className="cursor-pointer transition-opacity"
                  opacity={selectedPiece === 'sleeve' ? 1 : 0.65}
                >
                  <path
                    d="M 440 40 C 400 45, 370 75, 365 110 L 390 320 L 490 320 L 515 110 C 510 75, 480 45, 440 40 Z"
                    fill={selectedPiece === 'sleeve' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(51, 65, 85, 0.2)'}
                    stroke={selectedPiece === 'sleeve' ? '#34d399' : '#94a3b8'}
                    strokeWidth="2"
                  />
                  {showSeamAllowance && (
                    <path
                      d="M 440 33 C 395 38, 362 70, 357 107 L 383 328 L 497 328 L 523 107 C 518 70, 485 38, 440 33 Z"
                      fill="none"
                      stroke="#059669"
                      strokeWidth="1.2"
                      strokeDasharray="4 3"
                    />
                  )}
                  {showGrading && (
                    <path d="M 440 28 C 390 33, 355 65, 350 102 L 377 334 L 503 334 L 530 102 C 525 65, 490 33, 440 28 Z" fill="none" stroke="#38bdf8" strokeWidth="0.8" opacity="0.5" />
                  )}
                  {showNotches && (
                    <g stroke="#f59e0b" strokeWidth="1.5">
                      {/* Shoulder seam notch */}
                      <line x1="440" y1="38" x2="440" y2="46" />
                      {/* Front notch */}
                      <line x1="375" y1="90" x2="382" y2="92" />
                    </g>
                  )}
                  {showGrainline && (
                    <line x1="440" y1="70" x2="440" y2="290" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
                  )}
                  <text x="418" y="180" fill="#ffffff" fontSize="11" fontWeight="600">РУКАВ</text>
                  <text x="412" y="196" fill="#94a3b8" fontSize="9" fontFamily="monospace">2 детали (L/R)</text>
                </g>

                {/* PIECE 4: Капюшон (Hood) */}
                <g 
                  onClick={() => setSelectedPiece('hood')}
                  className="cursor-pointer transition-opacity"
                  opacity={selectedPiece === 'hood' ? 1 : 0.65}
                >
                  <path
                    d="M 550 60 C 565 40, 630 40, 655 75 C 675 110, 680 180, 675 220 L 590 220 L 550 170 Z"
                    fill={selectedPiece === 'hood' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(51, 65, 85, 0.2)'}
                    stroke={selectedPiece === 'hood' ? '#34d399' : '#94a3b8'}
                    strokeWidth="2"
                  />
                  {showSeamAllowance && (
                    <path
                      d="M 545 56 C 562 34, 634 34, 661 72 C 682 108, 687 182, 682 225 L 588 225 L 544 172 Z"
                      fill="none"
                      stroke="#059669"
                      strokeWidth="1.2"
                      strokeDasharray="4 3"
                    />
                  )}
                  <text x="590" y="130" fill="#ffffff" fontSize="11" fontWeight="600">КАПЮШОН</text>
                  <text x="580" y="146" fill="#94a3b8" fontSize="9" fontFamily="monospace">2+2 детали</text>
                </g>

                {/* PIECE 5: Карман кенгуру (Pocket) */}
                <g 
                  onClick={() => setSelectedPiece('pocket')}
                  className="cursor-pointer transition-opacity"
                  opacity={selectedPiece === 'pocket' ? 1 : 0.65}
                >
                  <path
                    d="M 565 255 L 675 255 L 690 325 L 550 325 Z"
                    fill={selectedPiece === 'pocket' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(51, 65, 85, 0.2)'}
                    stroke={selectedPiece === 'pocket' ? '#34d399' : '#94a3b8'}
                    strokeWidth="2"
                  />
                  {showSeamAllowance && (
                    <path
                      d="M 561 251 L 679 251 L 695 330 L 545 330 Z"
                      fill="none"
                      stroke="#059669"
                      strokeWidth="1.2"
                      strokeDasharray="4 3"
                    />
                  )}
                  <text x="590" y="290" fill="#ffffff" fontSize="10" fontWeight="600">КЕНГУРУ КАРМАН</text>
                  <text x="600" y="304" fill="#94a3b8" fontSize="8" fontFamily="monospace">1 деталь</text>
                </g>
              </svg>
            ) : (
              /* Nesting Layout View */
              <div className="w-full py-4">
                <div className="border border-dashed border-emerald-500/40 rounded-lg p-3 bg-slate-950/70">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                    <span>ШИРИНА ТКАНИ: 180 СМ (ФУТЕР 3-НИТКА)</span>
                    <span className="text-emerald-400 font-semibold">КИМ (КОЭФФИЦИЕНТ ИСПОЛЬЗОВАНИЯ): 91.4%</span>
                  </div>

                  <svg viewBox="0 0 740 180" className="w-full max-h-[220px]">
                    {/* Fabric bounds */}
                    <rect x="0" y="0" width="740" height="180" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                    
                    {/* Nested pattern blocks in real-world arrangement */}
                    {/* Front piece */}
                    <path d="M 10 10 L 160 10 L 160 170 L 10 170 Z" fill="#0284c7" opacity="0.3" stroke="#38bdf8" strokeWidth="1.5" />
                    <text x="50" y="95" fill="#e0f2fe" fontSize="11" fontWeight="600">ПОЛОЧКА 46</text>

                    {/* Back piece inverted for tight nesting */}
                    <path d="M 170 10 L 320 10 L 320 170 L 170 170 Z" fill="#0284c7" opacity="0.3" stroke="#38bdf8" strokeWidth="1.5" />
                    <text x="215" y="95" fill="#e0f2fe" fontSize="11" fontWeight="600">СПИНКА 46</text>

                    {/* Sleeves paired head-to-toe */}
                    <path d="M 330 10 L 460 10 L 460 90 L 330 90 Z" fill="#10b981" opacity="0.3" stroke="#34d399" strokeWidth="1.5" />
                    <text x="360" y="55" fill="#ecfdf5" fontSize="10">РУКАВ 1</text>

                    <path d="M 330 95 L 460 95 L 460 175 L 330 175 Z" fill="#10b981" opacity="0.3" stroke="#34d399" strokeWidth="1.5" />
                    <text x="360" y="140" fill="#ecfdf5" fontSize="10">РУКАВ 2</text>

                    {/* Hoods in interstitial gap */}
                    <path d="M 470 10 L 570 10 L 570 85 L 470 85 Z" fill="#f59e0b" opacity="0.3" stroke="#fbbf24" strokeWidth="1.5" />
                    <text x="495" y="52" fill="#fffbeb" fontSize="10">КАПЮШОН 1-2</text>

                    <path d="M 470 95 L 570 95 L 570 170 L 470 170 Z" fill="#f59e0b" opacity="0.3" stroke="#fbbf24" strokeWidth="1.5" />
                    <text x="495" y="137" fill="#fffbeb" fontSize="10">КАПЮШОН 3-4</text>

                    {/* Pocket & trims filling edge void */}
                    <path d="M 580 10 L 725 10 L 725 110 L 580 110 Z" fill="#a855f7" opacity="0.3" stroke="#c084fc" strokeWidth="1.5" />
                    <text x="625" y="65" fill="#faf5ff" fontSize="10">КАРМАН КЕНГУРУ</text>

                    <path d="M 580 120 L 725 120 L 725 170 L 580 170 Z" fill="#64748b" opacity="0.4" stroke="#94a3b8" strokeWidth="1.5" />
                    <text x="615" y="150" fill="#f1f5f9" fontSize="10">ПОДВЯЗЫ И ОБТАЧКИ</text>
                  </svg>
                  <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 mt-2">
                    <span>Расход полотна: 1.42 м на 1 изделие</span>
                    <span className="text-emerald-400">Экономия ткани относительно ручной раскладки: ~9.8% (~380 сом/изделие)</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Layer Controls */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800 text-xs">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-slate-400 font-mono">Слои САПР:</span>
              
              <label className="flex items-center gap-1.5 cursor-pointer text-slate-300 hover:text-white">
                <input
                  type="checkbox"
                  checked={showSeamAllowance}
                  onChange={(e) => setShowSeamAllowance(e.target.checked)}
                  className="rounded border-slate-700 text-emerald-500 focus:ring-0 w-3.5 h-3.5 bg-slate-800"
                />
                <span>Припуски (зеленый пунктир)</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer text-slate-300 hover:text-white">
                <input
                  type="checkbox"
                  checked={showGrading}
                  onChange={(e) => setShowGrading(e.target.checked)}
                  className="rounded border-slate-700 text-cyan-500 focus:ring-0 w-3.5 h-3.5 bg-slate-800"
                />
                <span>Градация 42–52 (контуры)</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer text-slate-300 hover:text-white">
                <input
                  type="checkbox"
                  checked={showNotches}
                  onChange={(e) => setShowNotches(e.target.checked)}
                  className="rounded border-slate-700 text-amber-500 focus:ring-0 w-3.5 h-3.5 bg-slate-800"
                />
                <span>Контрольные надсечки</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer text-slate-300 hover:text-white">
                <input
                  type="checkbox"
                  checked={showGrainline}
                  onChange={(e) => setShowGrainline(e.target.checked)}
                  className="rounded border-slate-700 text-slate-400 focus:ring-0 w-3.5 h-3.5 bg-slate-800"
                />
                <span>Долевая нить</span>
              </label>
            </div>

            <div className="font-mono text-slate-500">
              Масштаб 1:1 · PLT / DXF AAMA
            </div>
          </div>
        </div>

        {/* Right Column: Piece Inspector & Specs */}
        <div className="bg-slate-900/60 rounded-xl border border-slate-800/80 p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-mono uppercase text-slate-400">Спецификация деталей</span>
              <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-mono">14 деталей</span>
            </div>

            {/* Pieces Selector */}
            <div className="space-y-1.5 mt-3">
              {pieces.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPiece(p.id)}
                  className={`w-full text-left p-2.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                    selectedPiece === p.id
                      ? 'bg-slate-800 border border-emerald-500/40 text-white'
                      : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                  }`}
                >
                  <span className="font-medium">{p.name}</span>
                  <span className="text-[11px] font-mono text-slate-500">{p.count}</span>
                </button>
              ))}
            </div>

            {/* Selected Piece Details */}
            <div className="mt-4 p-3 bg-slate-950/60 rounded-lg border border-slate-800 text-xs space-y-2">
              <div className="text-[11px] text-slate-400 uppercase font-mono tracking-wider">
                Параметры детали: {pieces.find((p) => p.id === selectedPiece)?.name}
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-500">Припуск боковой:</span>
                <span className="font-mono">7 мм (оверлок)</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-500">Припуск низ:</span>
                <span className="font-mono">25 мм (распошив)</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-500">Поправка на усадку:</span>
                <span className="font-mono text-emerald-400">+3.5% по длине</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-500">Контрольных точек:</span>
                <span className="font-mono">6 надсечек</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800">
            <div className="text-xs text-slate-400 mb-2">
              Готовые файлы отдаем в форматах PLT, DXF AAMA, PDF для фабрик Бишкека или печатаем на плоттере 180 см.
            </div>
            <button
              onClick={onOrderClick}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium rounded-lg transition-colors border border-slate-700"
            >
              Заказать разработку модели
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
