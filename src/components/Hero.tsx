import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { useLanguage } from "../contexts/useLanguage";
import { translations } from "../data/translations.ts";

import AnimatedCounter from "./AnimatedCounter";
import AnimatedText from "./AnimatedText";

const Hero = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [showSubtitle, setShowSubtitle] = useState<boolean>(false);
  const [startCounters, setStartCounters] = useState<boolean>(false);

  return (
    <section className="from-primary-50 to-secondary-50 relative bg-gradient-to-r py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-6 h-32 lg:h-40">
              <h1 className="text-4xl font-bold text-gray-900 lg:text-6xl">
                <AnimatedText
                  text={t.hero.title}
                  className="block"
                  delay={300}
                  onComplete={() => setShowSubtitle(true)}
                />
                {showSubtitle && (
                  <AnimatedText
                    text={t.hero.subtitle}
                    className="text-primary-600 mt-2 block"
                    delay={200}
                    onComplete={() => setStartCounters(true)}
                  />
                )}
              </h1>
            </div>

            <p className="mb-8 text-lg leading-relaxed text-gray-600">
              {t.hero.description}
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                to="/productos"
                className="btn-primary inline-flex items-center justify-center text-center"
              >
                {t.hero.viewProducts}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/ofertas"
                className="btn-secondary inline-flex items-center justify-center text-center"
              >
                {t.hero.specialOffers}
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-primary-600 mb-2 text-3xl font-bold">
                  <AnimatedCounter
                    target={1000}
                    duration={2000}
                    suffix="+"
                    startAnimation={startCounters}
                  />
                </div>
                <div className="text-gray-600">{t.hero.customers}</div>
              </div>
              <div className="text-center">
                <div className="text-primary-600 mb-2 text-3xl font-bold">
                  <AnimatedCounter
                    target={50}
                    duration={1500}
                    suffix="+"
                    startAnimation={startCounters}
                  />
                </div>
                <div className="text-gray-600">{t.hero.models}</div>
              </div>
              <div className="text-center">
                <div className="text-primary-600 mb-2 animate-pulse text-3xl font-bold">
                  24/7
                </div>
                <div className="text-gray-600">{t.hero.support}</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&h=600&fit=crop"
                alt="Zapatillas de casa cómodas para estar en casa"
                className="rounded-lg shadow-2xl"
              />
            </div>
            <div className="bg-primary-200 absolute -top-4 -right-4 h-72 w-72 rounded-full opacity-50 blur-3xl"></div>
            <div className="bg-secondary-200 absolute -bottom-4 -left-4 h-72 w-72 rounded-full opacity-50 blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
