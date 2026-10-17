import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CadViewer } from './components/CadViewer';
import { GarmentTypesGrid } from './components/GarmentTypesGrid';
import { Portfolio } from './components/Portfolio';
import { PriceList } from './components/PriceList';
import { BishkekProduction } from './components/BishkekProduction';
import { OrderForm } from './components/OrderForm';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { PortfolioItem } from './types';

export default function App() {
  const [prefilledCategory, setPrefilledCategory] = useState<string>('Худи / Свитшот / Зипка');
  const [prefilledData, setPrefilledData] = useState<{
    category: string;
    gradingCount: number;
    addons: string[];
    totalKgs: number;
  } | null>(null);

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOrderClick = () => {
    scrollToSection('#order');
  };

  const handleCalculateClick = () => {
    scrollToSection('#calculator');
  };

  const handleSelectItemForOrder = (item: PortfolioItem) => {
    setPrefilledCategory(item.title);
    scrollToSection('#order');
  };

  const handleSelectGarmentCategory = (categoryName: string) => {
    setPrefilledCategory(categoryName);
    scrollToSection('#order');
  };

  const handleTransferCalculator = (data: {
    category: string;
    gradingCount: number;
    addons: string[];
    totalKgs: number;
  }) => {
    setPrefilledData(data);
    setPrefilledCategory(data.category);
    scrollToSection('#order');
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-emerald-500 selection:text-white">
      {/* 1. Header (Top Bar 3-Zone Contract) */}
      <Header onOrderClick={handleOrderClick} />

      {/* 2. Hero Section */}
      <Hero
        onOrderClick={handleOrderClick}
        onCalculateClick={handleCalculateClick}
      />

      {/* 3. Interactive CAD Pattern Blueprint & Nesting Simulator */}
      <section className="py-12 sm:py-16 bg-stone-900 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <span>САПР ЛЕКАЛА 1:1</span>
              <span>·</span>
              <span>ПРОИЗВОДСТВЕННАЯ ТОЧНОСТЬ</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              Интерактивный чертеж лекал в САПР
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 mt-1 max-w-2xl">
              Попробуйте переключить слои: посмотрите линии градации размеров, припуски на швы, контрольные надсечки и плотную автораскладку настила.
            </p>
          </div>
          <CadViewer onOrderClick={handleOrderClick} />
        </div>
      </section>

      {/* 4. Broad Variety of Garment Types */}
      <GarmentTypesGrid onSelectCategory={handleSelectGarmentCategory} />

      {/* 5. Portfolio Section with Case Studies & Measurements */}
      <Portfolio onSelectItemForOrder={handleSelectItemForOrder} />

      {/* 6. Price List & Interactive Live Cost Calculator */}
      <PriceList
        onOrderCategory={(catTitle) => {
          setPrefilledCategory(catTitle);
          scrollToSection('#order');
        }}
        onTransferCalculator={handleTransferCalculator}
      />

      {/* 7. Bishkek Apparel Production Advantages & Plotter Service */}
      <BishkekProduction onOrderClick={handleOrderClick} />

      {/* 8. Order Form for Custom Development */}
      <OrderForm
        prefilledCategory={prefilledCategory}
        prefilledData={prefilledData}
      />

      {/* 9. FAQ Section */}
      <FaqSection />

      {/* 10. Footer */}
      <Footer onNavClick={scrollToSection} />
    </div>
  );
}
