import { Home, Shield, Truck, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/useLanguage.js';
import { translations } from '../data/translations';

const Features = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const features = [
    {
      icon: Home,
      title: t.features.comfort.title,
      description: t.features.comfort.description
    },
    {
      icon: Shield,
      title: t.features.quality.title,
      description: t.features.quality.description
    },
    {
      icon: Truck,
      title: t.features.shipping.title,
      description: t.features.shipping.description
    },
    {
      icon: MapPin,
      title: t.features.madeInSpain.title,
      description: t.features.madeInSpain.description
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {t.features.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t.features.subtitle}
          </p>
        </div>
        
        {/* Mobile: Grid layout estático */}
        <div className="md:hidden grid grid-cols-1 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4 group-hover:bg-primary-200 transition-colors">
                <feature.icon className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Desktop: Scroll horizontal animado */}
        <div className="hidden md:block overflow-hidden">
          <div className="flex animate-scroll-left space-x-24">
            {/* Primer conjunto de features */}
            {features.map((feature, index) => (
              <div key={index} className="flex-shrink-0 w-80 text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4 group-hover:bg-primary-200 transition-colors mx-auto">
                  <feature.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
            {/* Segundo conjunto duplicado para efecto infinito sin saltos */}
            {features.map((feature, index) => (
              <div key={`duplicate-${index}`} className="flex-shrink-0 w-80 text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4 group-hover:bg-primary-200 transition-colors mx-auto">
                  <feature.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
            {/* Tercer conjunto extra para mayor suavidad */}
            {features.map((feature, index) => (
              <div key={`extra-${index}`} className="flex-shrink-0 w-80 text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4 group-hover:bg-primary-200 transition-colors mx-auto">
                  <feature.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;