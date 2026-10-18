import React from 'react';
import { Phone, MapPin, Clock, MessageSquare, ArrowUp, Send, Instagram } from 'lucide-react';

const INSTAGRAM_URL = 'https://www.instagram.com/lekala_bubu_kg/';

const ADDRESS_QUERY = encodeURIComponent('Бишкек, улица Горького, 19');
const MAP_EMBED_URL = `https://maps.google.com/maps?q=${ADDRESS_QUERY}&z=17&hl=ru&output=embed`;
const GOOGLE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${ADDRESS_QUERY}`;
const TWO_GIS_URL = `https://2gis.kg/bishkek/search/${ADDRESS_QUERY}`;

interface FooterProps {
  onNavClick: (href: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contacts" className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800 text-xs sm:text-sm">
          {/* Col 1: Brand & Summary */}
          <div className="space-y-4">
            <a href="#" className="text-lg font-bold tracking-tight text-white block">
              BUBU LEKALA
            </a>
            <p className="text-stone-400 text-xs leading-relaxed">
              Конструкторское бюро лекал «BUBU» в Бишкеке (ул. Горького, 19). Проектирование в САПР Grafis 12 и Clo 3D, точная градация размеров, табель мер и автораскладки для швейных производств и брендов.
            </p>
            <div className="text-xs text-stone-400 font-mono">
              г. Бишкек · ул. Горького, 19
            </div>
          </div>

          {/* Col 2: Clothing Categories */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase text-emerald-400 font-semibold tracking-wider">
              Виды одежды
            </div>
            <ul className="space-y-2 text-stone-400 text-xs">
              <li><button onClick={() => onNavClick('#portfolio')} className="hover:text-white transition-colors">Женская одежда и платья</button></li>
              <li><button onClick={() => onNavClick('#portfolio')} className="hover:text-white transition-colors">Трикотаж оверсайз (WB / Ozon)</button></li>
              <li><button onClick={() => onNavClick('#portfolio')} className="hover:text-white transition-colors">Брюки палаццо и джоггеры</button></li>
              <li><button onClick={() => onNavClick('#portfolio')} className="hover:text-white transition-colors">Верхняя одежда и тренчи</button></li>
              <li><button onClick={() => onNavClick('#portfolio')} className="hover:text-white transition-colors">Activewear и спортивные комплекты</button></li>
              <li><button onClick={() => onNavClick('#portfolio')} className="hover:text-white transition-colors">Детские ростовки и униформа</button></li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase text-emerald-400 font-semibold tracking-wider">
              Навигация
            </div>
            <ul className="space-y-2 text-stone-400 text-xs">
              <li><button onClick={() => onNavClick('#portfolio')} className="hover:text-white transition-colors">Портфолио работ</button></li>
              <li><button onClick={() => onNavClick('#pricing')} className="hover:text-white transition-colors">Прайс-лист и тарифы</button></li>
              <li><button onClick={() => onNavClick('#calculator')} className="hover:text-white transition-colors">Калькулятор стоимости</button></li>
              <li><button onClick={() => onNavClick('#cad-workflow')} className="hover:text-white transition-colors">САПР и плоттер 180 см</button></li>
              <li><button onClick={() => onNavClick('#order')} className="hover:text-white transition-colors">Форма онлайн заказа</button></li>
            </ul>
          </div>

          {/* Col 4: Contacts in Bishkek */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase text-emerald-400 font-semibold tracking-wider">
              Контакты в Бишкеке
            </div>
            <div className="space-y-2 text-xs text-stone-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>г. Бишкек, ул. Горького, 19</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Пн–Сб: 09:00 – 19:00</span>
              </div>
              <a
                href="tel:+996559444996"
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="font-mono tabular-nums">+996 (559) 444-996</span>
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <Instagram className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>@lekala_bubu_kg</span>
              </a>
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <a
                  href="https://wa.me/996559444996"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg text-xs transition-colors shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Написать в WhatsApp</span>
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram бюро BUBU"
                  className="inline-flex items-center justify-center w-8 h-8 bg-stone-800 hover:bg-stone-700 text-white rounded-lg transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Location Map */}
        <div className="py-10 border-b border-stone-800">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-5">
            <div>
              <div className="text-xs font-mono uppercase text-emerald-400 font-semibold tracking-wider">
                Как нас найти
              </div>
              <div className="flex items-center gap-2 mt-2 text-sm text-white font-semibold">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>г. Бишкек, ул. Горького, 19</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-stone-800 hover:bg-stone-700 text-white font-medium rounded-lg transition-colors"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Открыть в Google Картах</span>
              </a>
              <a
                href={TWO_GIS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-stone-800 hover:bg-stone-700 text-white font-medium rounded-lg transition-colors"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Открыть в 2GIS</span>
              </a>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden border border-stone-800 bg-stone-800 aspect-4/3 sm:aspect-21/9">
            <iframe
              src={MAP_EMBED_URL}
              title="Карта: г. Бишкек, ул. Горького, 19"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} Конструкторское бюро лекал «BUBU» (г. Бишкек, ул. Горького, 19). Разработка лекал одежды любой сложности.
          </div>

          <div className="flex items-center gap-4">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram бюро BUBU"
              className="text-stone-400 hover:text-white transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-stone-400 hover:text-white transition-colors"
            >
              <span>Наверх</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
