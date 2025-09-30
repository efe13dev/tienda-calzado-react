import { Home, MapPin, Shield, Truck } from "lucide-react";
import React from "react";

import { useLanguage } from "../contexts/useLanguage";
import { translations } from "../data/translations.ts";

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const Features = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const features: Feature[] = [
    {
      icon: Home,
      title: t.features.comfort.title,
      description: t.features.comfort.description,
    },
    {
      icon: Shield,
      title: t.features.quality.title,
      description: t.features.quality.description,
    },
    {
      icon: Truck,
      title: t.features.shipping.title,
      description: t.features.shipping.description,
    },
    {
      icon: MapPin,
      title: t.features.madeInSpain.title,
      description: t.features.madeInSpain.description,
    },
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl">{t.features.title}</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">{t.features.subtitle}</p>
        </div>

        {/* Mobile: Grid layout estático */}
        <div className="grid grid-cols-1 gap-8 md:hidden">
          {features.map((feature, index) => (
            <div key={index} className="group text-center">
              <div className="bg-primary-100 group-hover:bg-primary-200 mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full transition-colors">
                <feature.icon className="text-primary-600 h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Desktop: Scroll horizontal animado */}
        <div className="hidden overflow-hidden md:block">
          <div className="animate-scroll-left flex space-x-24">
            {/* Primer conjunto de features */}
            {features.map((feature, index) => (
              <div key={index} className="group w-80 flex-shrink-0 text-center">
                <div className="bg-primary-100 group-hover:bg-primary-200 mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full transition-colors">
                  <feature.icon className="text-primary-600 h-8 w-8" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
            {/* Segundo conjunto duplicado para efecto infinito sin saltos */}
            {features.map((feature, index) => (
              <div key={`duplicate-${index}`} className="group w-80 flex-shrink-0 text-center">
                <div className="bg-primary-100 group-hover:bg-primary-200 mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full transition-colors">
                  <feature.icon className="text-primary-600 h-8 w-8" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
