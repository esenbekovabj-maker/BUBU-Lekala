import React, { useState, useRef, useEffect } from 'react';
import { OrderFormData } from '../types';
import {
  Upload,
  CheckCircle2,
  AlertCircle,
  FileText,
  Trash2,
  Send,
  MessageSquare,
  Sparkles,
  Phone,
  User,
  MapPin,
  Scissors,
  Check,
  Copy,
} from 'lucide-react';

interface OrderFormProps {
  prefilledCategory?: string;
  prefilledData?: {
    category: string;
    gradingCount: number;
    addons: string[];
    totalKgs: number;
  } | null;
}

export const OrderForm: React.FC<OrderFormProps> = ({
  prefilledCategory,
  prefilledData,
}) => {
  const [formData, setFormData] = useState<OrderFormData>({
    garmentCategory: prefilledCategory || 'Худи / Свитшот / Зипка',
    garmentSubtype: 'Oversize свободный крой',
    experienceLevel: 'WB / Ozon Seller',
    materialStatus: 'Есть фото из карточки маркетплейса',
    baseSize: '46',
    gradingSizes: ['42', '44', '46', '48', '50'],
    heights: ['164-170'],
    fabricType: 'Футер 3-нитка пенье 380–420 г/м²',
    shrinkageTested: true,
    shrinkagePercent: '3.5% по длине, 1.5% по ширине',
    outputFormats: ['PLT (для плоттера цеха)', 'PDF 1:1', 'DXF AAMA'],
    needsSampleSewing: false,
    needs3DVisualization: false,
    needsMarkerNesting: true,
    needsPaperPlotterPrint: false,
    comments: '',
    clientName: '',
    clientPhone: '',
    clientMessenger: 'whatsapp',
    clientCity: 'Бишкек',
    uploadedFileName: '',
    uploadedFilePreview: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [copiedSummary, setCopiedSummary] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync prefilled data
  useEffect(() => {
    if (prefilledCategory) {
      setFormData((prev) => ({
        ...prev,
        garmentCategory: prefilledCategory,
      }));
    }
    if (prefilledData) {
      setFormData((prev) => ({
        ...prev,
        garmentCategory: prefilledData.category,
        needs3DVisualization: prefilledData.addons.some((a) => a.includes('3D')),
        needsMarkerNesting: prefilledData.addons.some((a) => a.includes('раскладка')),
        needsPaperPlotterPrint: prefilledData.addons.some((a) => a.includes('плоттере')),
        needsSampleSewing: prefilledData.addons.some((a) => a.includes('образца')),
      }));
    }
  }, [prefilledCategory, prefilledData]);

  const categories = [
    'Худи / Свитшот / Зипка',
    'Футболка / Лонгслив / Топ',
    'Брюки палаццо / Джоггеры / Карго',
    'Платье / Юбка / Сарафан',
    'Жакет / Пиджак / Костюм',
    'Тренч / Пальто / Куртка',
    'Activewear / Велосипедки / Рашгард',
    'Детская линейка / Ростовки',
    'Спецодежда / Медицинская форма',
  ];

  const standardSizes = ['40', '42', '44', '46', '48', '50', '52', '54', '56', '58'];
  const heightOptions = ['158-164 см', '164-170 см (база)', '170-176 см', '176-182 см'];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileName = file.name;
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          setFormData((prev) => ({
            ...prev,
            uploadedFileName: fileName,
            uploadedFilePreview: reader.result as string,
          }));
        };
        reader.readAsDataURL(file);
      } else {
        setFormData((prev) => ({
          ...prev,
          uploadedFileName: fileName,
          uploadedFilePreview: '',
        }));
      }
    }
  };

  const removeFile = () => {
    setFormData((prev) => ({
      ...prev,
      uploadedFileName: '',
      uploadedFilePreview: '',
    }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const toggleGradingSize = (size: string) => {
    setFormData((prev) => {
      const exists = prev.gradingSizes.includes(size);
      return {
        ...prev,
        gradingSizes: exists
          ? prev.gradingSizes.filter((s) => s !== size)
          : [...prev.gradingSizes, size].sort(),
      };
    });
  };

  const toggleOutputFormat = (format: string) => {
    setFormData((prev) => {
      const exists = prev.outputFormats.includes(format);
      return {
        ...prev,
        outputFormats: exists
          ? prev.outputFormats.filter((f) => f !== format)
          : [...prev.outputFormats, format],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!formData.clientName.trim()) {
      setValidationError('Пожалуйста, укажите ваше имя или название бренда.');
      return;
    }
    if (!formData.clientPhone.trim() || formData.clientPhone.replace(/\D/g, '').length < 8) {
      setValidationError('Пожалуйста, укажите корректный номер телефона / WhatsApp.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const randomId = `KG-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      setIsSubmitting(false);
      setSubmissionSuccess(randomId);
    }, 600);
  };

  // Generate WhatsApp pre-filled text
  const generateWhatsAppLink = () => {
    const text = `Здравствуйте! Хочу заказать разработку лекал в бюро BUBU (Бишкек):
- Номер заявки: ${submissionSuccess || 'Новая'}
- Изделие: ${formData.garmentCategory} (${formData.garmentSubtype})
- Исходные данные: ${formData.materialStatus}
- Базовый размер: ${formData.baseSize}
- Градация размеров: ${formData.gradingSizes.join(', ')}
- Ткань: ${formData.fabricType}
- Усадка: ${formData.shrinkagePercent}
- Раскладка для кроя: ${formData.needsMarkerNesting ? 'Да' : 'Нет'}
- 3D примерка Clo3D: ${formData.needs3DVisualization ? 'Да' : 'Нет'}
- Форматы: ${formData.outputFormats.join(', ')}
- Заказчик: ${formData.clientName} (${formData.clientCity})
- Телефон: ${formData.clientPhone}
${formData.comments ? `- Примечания: ${formData.comments}` : ''}`;

    return `https://wa.me/996559444996?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="order" className="py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
            <span>ОНЛАЙН ЗАЯВКА НА РАЗРАБОТКУ</span>
            <span>·</span>
            <span>КОНСТРУКТОРСКОЕ БЮРО «BUBU» БИШКЕК</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900">
            Форма заказа индивидуальной разработки лекал
          </h2>
          <p className="text-stone-600 text-xs sm:text-base mt-2">
            Заполните параметры модели, прикрепите фото или эскиз. Конструктор рассчитает точный расход ткани и свяжется с вами в течение 30 минут.
          </p>
        </div>

        {/* Success Modal / Banner */}
        {submissionSuccess ? (
          <div className="bg-stone-50 border border-emerald-500/40 rounded-2xl p-6 sm:p-10 shadow-lg text-center space-y-6">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <div className="text-xs font-mono text-emerald-700 uppercase tracking-wider">
                Заявка успешно зарегистрирована
              </div>
              <h3 className="text-2xl font-bold text-stone-900 mt-1">
                Номер заявки: <span className="font-mono text-emerald-800">{submissionSuccess}</span>
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-lg mx-auto">
                Спасибо, {formData.clientName}! Мы зафиксировали параметры разработки для изделия «{formData.garmentCategory}».
              </p>
            </div>

            {/* Direct WhatsApp CTA */}
            <div className="p-4 bg-white rounded-xl border border-stone-200 max-w-lg mx-auto text-left text-xs space-y-2">
              <div className="font-semibold text-stone-900 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>Быстрый старт через WhatsApp:</span>
              </div>
              <p className="text-stone-500">
                Нажмите кнопку ниже, чтобы отправить сформированное ТЗ главному конструктору в WhatsApp без повторного набора текста.
              </p>
              <div className="pt-2">
                <a
                  href={generateWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 text-sm shadow-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>Открыть WhatsApp с готовым ТЗ</span>
                </a>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `Заявка ${submissionSuccess}: ${formData.garmentCategory}, Заказчик: ${formData.clientName}, Тел: ${formData.clientPhone}`
                  );
                  setCopiedSummary(true);
                  setTimeout(() => setCopiedSummary(false), 2000);
                }}
                className="px-4 py-2 text-xs font-medium text-stone-700 bg-white border border-stone-300 rounded-lg hover:bg-stone-100 transition-colors flex items-center gap-1.5"
              >
                {copiedSummary ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSummary ? 'Скопировано!' : 'Скопировать номер заявки'}</span>
              </button>

              <button
                onClick={() => setSubmissionSuccess(null)}
                className="px-4 py-2 text-xs font-medium text-stone-500 hover:text-stone-800 transition-colors"
              >
                Создать еще один заказ
              </button>
            </div>
          </div>
        ) : (
          /* Main Interactive Order Form */
          <form
            onSubmit={handleSubmit}
            className="bg-stone-50/70 border border-stone-200 rounded-2xl p-6 sm:p-10 shadow-xs space-y-8"
          >
            {/* Error banner if validation fails */}
            {validationError && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{validationError}</span>
              </div>
            )}

            {/* SECTION 1: Category & Material Status */}
            <div>
              <div className="text-xs font-mono uppercase text-stone-500 mb-4 pb-2 border-b border-stone-200 flex items-center justify-between">
                <span>01. ТИП ИЗДЕЛИЯ И ИСХОДНЫЕ МАТЕРИАЛЫ</span>
                <span className="text-[11px] text-stone-400">Шаг 1 из 4</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1.5">
                    Категория изделия <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.garmentCategory}
                    onChange={(e) => setFormData({ ...formData, garmentCategory: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:border-stone-900"
                  >
                    {categories.map((cat, idx) => (
                      <option key={idx} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1.5">
                    Силуэт / Особенности кроя
                  </label>
                  <input
                    type="text"
                    value={formData.garmentSubtype}
                    onChange={(e) => setFormData({ ...formData, garmentSubtype: e.target.value })}
                    placeholder="Например: Oversize, укороченный, реглан, высокая талия"
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:border-stone-900"
                  />
                </div>
              </div>

              {/* Status of Materials */}
              <div className="mt-4">
                <label className="block text-xs font-semibold text-stone-800 mb-2">
                  Что у вас есть на руках?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
                  {[
                    'Есть фото из карточки маркетплейса',
                    'Есть готовый эскиз / техрисунок',
                    'Есть образец в Бишкеке на замер',
                    'Нужна разработка с нуля',
                  ].map((status, idx) => (
                    <label
                      key={idx}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 ${
                        formData.materialStatus === status
                          ? 'bg-white border-stone-900 text-stone-900 font-medium shadow-xs'
                          : 'bg-white/60 border-stone-200 text-stone-600 hover:border-stone-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="materialStatus"
                        checked={formData.materialStatus === status}
                        onChange={() => setFormData({ ...formData, materialStatus: status })}
                        className="mt-0.5 text-stone-900 focus:ring-0"
                      />
                      <span>{status}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* File upload drag and drop simulator */}
              <div className="mt-5">
                <label className="block text-xs font-semibold text-stone-800 mb-1.5">
                  Прикрепить фото референса, эскиз или техзадание (необязательно)
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*,.pdf,.dxf"
                  className="hidden"
                />

                {formData.uploadedFileName ? (
                  <div className="p-3 bg-white border border-stone-300 rounded-xl flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      {formData.uploadedFilePreview ? (
                        <img
                          src={formData.uploadedFilePreview}
                          alt="Загруженное фото"
                          className="w-10 h-10 object-cover rounded-lg border border-stone-200"
                        />
                      ) : (
                        <FileText className="w-6 h-6 text-stone-500" />
                      )}
                      <div>
                        <div className="font-semibold text-stone-900">{formData.uploadedFileName}</div>
                        <div className="text-[11px] text-emerald-600">Файл успешно прикреплен к заявке</div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={removeFile}
                      className="p-1.5 text-stone-400 hover:text-red-600 transition-colors"
                      title="Удалить файл"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-stone-300 hover:border-stone-400 rounded-xl p-5 text-center cursor-pointer transition-colors bg-white/50"
                  >
                    <Upload className="w-6 h-6 text-stone-400 mx-auto mb-1.5" />
                    <div className="text-xs font-semibold text-stone-700">
                      Нажмите для загрузки фото или перетащите файл сюда
                    </div>
                    <div className="text-[11px] text-stone-400 mt-0.5">
                      Поддерживаются JPG, PNG, WEBP, PDF (до 25 МБ)
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* SECTION 2: Size specs & Grading */}
            <div>
              <div className="text-xs font-mono uppercase text-stone-500 mb-4 pb-2 border-b border-stone-200 flex items-center justify-between">
                <span>02. РАЗМЕРНЫЙ РЯД И ГРАДАЦИЯ</span>
                <span className="text-[11px] text-stone-400">Шаг 2 из 4</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1.5">
                    Базовый размер (с которого строится лекало)
                  </label>
                  <select
                    value={formData.baseSize}
                    onChange={(e) => setFormData({ ...formData, baseSize: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:border-stone-900"
                  >
                    {standardSizes.map((sz) => (
                      <option key={sz} value={sz}>
                        Размер {sz} {sz === '44' || sz === '46' ? '(Рекомендуется для РФ/СНГ)' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1.5">
                    Ростовка
                  </label>
                  <select
                    value={formData.heights[0] || '164-170 см'}
                    onChange={(e) => setFormData({ ...formData, heights: [e.target.value] })}
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:border-stone-900"
                  >
                    {heightOptions.map((h, idx) => (
                      <option key={idx} value={h}>
                        {h}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Grading multi-select */}
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-stone-800">
                    Выберите размеры для градации:
                  </label>
                  <span className="text-xs font-mono text-stone-500">
                    Выбрано: {formData.gradingSizes.length} разм.
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {standardSizes.map((size) => {
                    const isSelected = formData.gradingSizes.includes(size);
                    const isBase = formData.baseSize === size;
                    return (
                      <button
                        type="button"
                        key={size}
                        onClick={() => toggleGradingSize(size)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                          isSelected
                            ? 'bg-stone-900 text-white shadow-xs'
                            : 'bg-white border border-stone-300 text-stone-700 hover:border-stone-400'
                        }`}
                      >
                        {size} {isBase ? '(база)' : ''}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* SECTION 3: Fabric, Shrinkage & CAD Outputs */}
            <div>
              <div className="text-xs font-mono uppercase text-stone-500 mb-4 pb-2 border-b border-stone-200 flex items-center justify-between">
                <span>03. ТКАНЬ, УСАДКА И ФОРМАТЫ ВЫДАЧИ</span>
                <span className="text-[11px] text-stone-400">Шаг 3 из 4</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1.5">
                    Тип полотна / ткани
                  </label>
                  <input
                    type="text"
                    value={formData.fabricType}
                    onChange={(e) => setFormData({ ...formData, fabricType: e.target.value })}
                    placeholder="Например: Футер 3-нитка пенье 380г, Кулирка 180г"
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:border-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1.5">
                    Усадка после стирки (если известна)
                  </label>
                  <input
                    type="text"
                    value={formData.shrinkagePercent}
                    onChange={(e) => setFormData({ ...formData, shrinkagePercent: e.target.value })}
                    placeholder="Например: 3% по длине, 1% по ширине, или 'нужен замер'"
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:border-stone-900"
                  />
                </div>
              </div>

              {/* Output Formats */}
              <div className="mt-4">
                <label className="block text-xs font-semibold text-stone-800 mb-2">
                  Необходимые форматы файлов (отметим нужные для вашей фабрики):
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs">
                  {[
                    'PLT (для плоттера цеха)',
                    'DXF AAMA (для САПР)',
                    'PDF 1:1 (для плоттерной печати)',
                    'PDF на листах А4 (для обычного принтера)',
                    'Clo 3D (.zprj проект)',
                    'Печать на бумаге 180 см (Бишкек)',
                  ].map((fmt, idx) => (
                    <label
                      key={idx}
                      className="p-2.5 bg-white rounded-lg border border-stone-200 flex items-center gap-2 cursor-pointer hover:border-stone-300"
                    >
                      <input
                        type="checkbox"
                        checked={formData.outputFormats.includes(fmt)}
                        onChange={() => toggleOutputFormat(fmt)}
                        className="rounded border-stone-300 text-stone-900 focus:ring-0 w-3.5 h-3.5"
                      />
                      <span className="font-mono text-stone-800">{fmt}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Additional Options */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <label className="p-3 bg-white rounded-xl border border-stone-200 flex items-start gap-2 cursor-pointer hover:border-stone-300">
                  <input
                    type="checkbox"
                    checked={formData.needsMarkerNesting}
                    onChange={(e) => setFormData({ ...formData, needsMarkerNesting: e.target.checked })}
                    className="mt-0.5 rounded border-stone-300 text-emerald-600 focus:ring-0"
                  />
                  <div>
                    <div className="font-semibold text-stone-900">Раскладка для кроя</div>
                    <div className="text-[11px] text-stone-500">Экономия ткани до 12%</div>
                  </div>
                </label>

                <label className="p-3 bg-white rounded-xl border border-stone-200 flex items-start gap-2 cursor-pointer hover:border-stone-300">
                  <input
                    type="checkbox"
                    checked={formData.needs3DVisualization}
                    onChange={(e) => setFormData({ ...formData, needs3DVisualization: e.target.checked })}
                    className="mt-0.5 rounded border-stone-300 text-emerald-600 focus:ring-0"
                  />
                  <div>
                    <div className="font-semibold text-stone-900">3D примерка в Clo3D</div>
                    <div className="text-[11px] text-stone-500">Визуализация до раскроя</div>
                  </div>
                </label>

                <label className="p-3 bg-white rounded-xl border border-stone-200 flex items-start gap-2 cursor-pointer hover:border-stone-300">
                  <input
                    type="checkbox"
                    checked={formData.needsSampleSewing}
                    onChange={(e) => setFormData({ ...formData, needsSampleSewing: e.target.checked })}
                    className="mt-0.5 rounded border-stone-300 text-emerald-600 focus:ring-0"
                  />
                  <div>
                    <div className="font-semibold text-stone-900">Пошив образца</div>
                    <div className="text-[11px] text-stone-500">Тест в цехе в Бишкеке</div>
                  </div>
                </label>
              </div>
            </div>

            {/* SECTION 4: Contact & City */}
            <div>
              <div className="text-xs font-mono uppercase text-stone-500 mb-4 pb-2 border-b border-stone-200 flex items-center justify-between">
                <span>04. КОНТАКТЫ ДЛЯ СВЯЗИ И ПЕРЕДАЧИ ЛЕКАЛ</span>
                <span className="text-[11px] text-stone-400">Шаг 4 из 4</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1.5">
                    Ваше имя или бренд <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={formData.clientName}
                      onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                      placeholder="Айсулуу / Brand X"
                      className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:border-stone-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1.5">
                    Телефон / WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      value={formData.clientPhone}
                      onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                      placeholder="+996 (555) 00-00-00"
                      className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:border-stone-900 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1.5">
                    Город / Локация
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={formData.clientCity}
                      onChange={(e) => setFormData({ ...formData, clientCity: e.target.value })}
                      placeholder="Бишкек / Москва / Алматы"
                      className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:border-stone-900"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-xs font-semibold text-stone-800 mb-1.5">
                  Комментарии и пожелания по посадке
                </label>
                <textarea
                  rows={3}
                  value={formData.comments}
                  onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                  placeholder="Укажите желаемые прибавки на свободу, особенности обработки горловины или требования фабрики..."
                  className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:border-stone-900"
                />
              </div>
            </div>

            {/* Submission Button */}
            <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-stone-500 text-center sm:text-left">
                Конструктор ответит в течение 30 минут в рабочее время (09:00–19:00 Бишкек)
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Регистрация заявки...</span>
                ) : (
                  <>
                    <span>Отправить заявку на расчет</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
