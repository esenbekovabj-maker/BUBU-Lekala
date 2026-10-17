export type Currency = 'KGS' | 'RUB' | 'USD';

export interface GarmentCategory {
  id: string;
  name: string;
  shortDesc: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  image: string;
  baseSize: string;
  gradingRange: string;
  fabricType: string;
  fabricConsumption: string;
  nestingEfficiency: string; // e.g., "89.2% КИМ"
  detailsCount: number;
  leadTime: string;
  priceKgs: number;
  description: string;
  measurements: {
    name: string;
    value: string;
  }[];
  features: string[];
  recommendedFabrics: string[];
  cadFormats: string[];
}

export interface PriceCategory {
  id: string;
  title: string;
  items: string;
  basePriceKgs: number;
  gradingPriceKgs: number; // per size
  sampleSewingKgs: number;
  leadTimeDays: string;
  popular?: boolean;
}

export interface AdditionalService {
  id: string;
  name: string;
  description: string;
  priceKgs: number;
  unit: string;
}

export interface OrderFormData {
  garmentCategory: string;
  garmentSubtype: string;
  experienceLevel: string; // 'WB / Ozon Seller' | 'Brand Owner' | 'Sewing Factory' | 'Individual'
  materialStatus: string; // 'Есть фото / референс' | 'Есть готовый эскиз' | 'Есть готовый образец в Бишкеке' | 'Нужна разработка с нуля'
  baseSize: string;
  gradingSizes: string[];
  heights: string[];
  fabricType: string;
  shrinkageTested: boolean;
  shrinkagePercent: string;
  outputFormats: string[];
  needsSampleSewing: boolean;
  needs3DVisualization: boolean;
  needsMarkerNesting: boolean;
  needsPaperPlotterPrint: boolean;
  comments: string;
  clientName: string;
  clientPhone: string;
  clientMessenger: 'whatsapp' | 'telegram';
  clientCity: string;
  uploadedFileName?: string;
  uploadedFilePreview?: string;
}
