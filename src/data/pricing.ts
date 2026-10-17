import { PriceCategory, AdditionalService } from '../types';

export const EXCHANGE_RATES = {
  KGS: 1,
  RUB: 1.05, // ~1 RUB = 0.95 KGS -> 1 KGS = 1.05 RUB approximately
  USD: 0.0114, // ~1 USD = 87.5 KGS
};

export const PRICE_CATEGORIES: PriceCategory[] = [
  {
    id: 'basic-knit',
    title: 'Базовый трикотаж (WB / Ozon)',
    items: 'Футболки, лонгсливы, топы, простые шорты, велосипедки',
    basePriceKgs: 2200,
    gradingPriceKgs: 350,
    sampleSewingKgs: 1200,
    leadTimeDays: '1–2 дня',
    popular: true,
  },
  {
    id: 'heavy-knit',
    title: 'Сложный трикотаж & худи',
    items: 'Худи оверсайз с двойным капюшоном, свитшоты, джоггеры, зип-худи',
    basePriceKgs: 3200,
    gradingPriceKgs: 450,
    sampleSewingKgs: 1600,
    leadTimeDays: '2–3 дня',
    popular: true,
  },
  {
    id: 'shirts-trousers',
    title: 'Поясные и плечевые изделия',
    items: 'Брюки палаццо, карго, джинсы, рубашки оверсайз, простые платья',
    basePriceKgs: 3800,
    gradingPriceKgs: 550,
    sampleSewingKgs: 2000,
    leadTimeDays: '2–3 дня',
  },
  {
    id: 'jackets-blazers',
    title: 'Жакеты, пиджаки и платья',
    items: 'Однобортные и двубортные жакеты, сложные платья, комбинезоны',
    basePriceKgs: 5200,
    gradingPriceKgs: 700,
    sampleSewingKgs: 2800,
    leadTimeDays: '3–4 дня',
  },
  {
    id: 'outerwear',
    title: 'Верхняя одежда & утепленные',
    items: 'Тренчи с кокеткой, пальто-кокон, куртки-бомберы, пуховики',
    basePriceKgs: 6500,
    gradingPriceKgs: 850,
    sampleSewingKgs: 3600,
    leadTimeDays: '4–5 дней',
  },
  {
    id: 'workwear-kids',
    title: 'Спецодежда & детская линейка',
    items: 'Медицинские костюмы, рабочие комбинезоны, детские ростовки 86–164',
    basePriceKgs: 3000,
    gradingPriceKgs: 400,
    sampleSewingKgs: 1500,
    leadTimeDays: '2–3 дня',
  },
];

export const ADDITIONAL_SERVICES: AdditionalService[] = [
  {
    id: 'tech-spec',
    name: 'Табель мер готового изделия + тех. спецификация',
    description: 'Параметры изделия во всех размерах градации с припусками и допусками ГОСТ/СТО для контроля ОТК на фабрике',
    priceKgs: 600,
    unit: 'за модель',
  },
  {
    id: 'clo3d-render',
    name: '3D примерка в Clo 3D с анимацией посадки',
    description: 'Визуализация на параметрическом аватаре, тепловая карта натяжения ткани (stress map), рендер 360° для маркетплейса',
    priceKgs: 1500,
    unit: 'за модель',
  },
  {
    id: 'marker-nesting',
    name: 'Оптимизированная раскладка под ширину рулона',
    description: 'Раскладка лекал в САПР Grafis под ширину настила фабрики (140/150/160/180 см) с экономией ткани 8–14%',
    priceKgs: 800,
    unit: 'за настил',
  },
  {
    id: 'plotter-print',
    name: 'Печать лекал на плоттере (ширина до 180 см)',
    description: 'Широкоформатная печать на термобумаге или плотной крафт-бумаге 80г/м². Самовывоз ул. Горького, 19 или доставка по цехам Бишкека',
    priceKgs: 150,
    unit: 'за погонный метр',
  },
  {
    id: 'digitizing',
    name: 'Оцифровка бумажных лекал (дигитайзер)',
    description: 'Перевод существующих бумажных/картонных лекал в цифровой векторный вид САПР с выравниванием линий',
    priceKgs: 120,
    unit: 'за 1 деталь кроя',
  },
];
