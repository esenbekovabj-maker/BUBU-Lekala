import React, { useState } from 'react';
import { Menu, X, PhoneCall } from 'lucide-react';

interface HeaderProps {
  onOrderClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOrderClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Портфолио', href: '#portfolio' },
    { label: 'Калькулятор', href: '#calculator' },
    { label: 'Прайс-лист', href: '#pricing' },
    { label: 'САПР & Фабрики', href: '#cad-workflow' },
    { label: 'Контакты', href: '#contacts' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-lg font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0 hover:text-stone-700 transition-colors"
        >
          BUBU LEKALA
        </a>

        {/* Zone 2: 4-5 concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 decoration-stone-400"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action + mobile toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="https://wa.me/996559444996?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D1%83%D0%B7%D0%BD%D0%B0%D1%82%D1%8C%20%D1%81%D1%82%D0%BE%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8C%20%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B8%20%D0%BB%D0%B5%D0%BA%D0%B0%D0%BB%20%D0%B2%20BUBU"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 px-3 py-2 rounded-lg hover:bg-stone-100 transition-colors whitespace-nowrap"
          >
            <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
            <span className="font-mono tabular-nums">+996 (559) 444-996</span>
          </a>

          <button
            onClick={onOrderClick}
            className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors whitespace-nowrap shrink-0 shadow-sm"
          >
            Заказать лекала
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-stone-700 hover:text-stone-900 rounded-lg hover:bg-stone-100 focus:outline-none"
            aria-label="Открыть меню"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-5 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="block w-full text-left py-2 px-3 text-sm font-medium text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-stone-100 flex flex-col gap-2">
            <a
              href="https://wa.me/996559444996"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-3 text-sm text-stone-600 hover:bg-stone-50 rounded-lg flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp: +996 (559) 444-996</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOrderClick();
              }}
              className="w-full py-2.5 bg-stone-900 text-white text-xs font-semibold rounded-lg shadow-sm"
            >
              Заказать разработку онлайн
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
