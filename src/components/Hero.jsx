
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/useLanguage.js';
import { translations } from '../data/translations';
import AnimatedText from './AnimatedText';
import AnimatedCounter from './AnimatedCounter';

const Hero = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [startCounters, setStartCounters] = useState(false);

  return (
    <section className="relative bg-gradient-to-r from-primary-50 to-secondary-50 py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="h-32 lg:h-40 mb-6">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900">
                <AnimatedText 
                  text={t.hero.title} 
                  className="block"
                  delay={300}
                  onComplete={() => setShowSubtitle(true)}
                />
                {showSubtitle && (
                  <AnimatedText 
                    text={t.hero.subtitle} 
                    className="text-primary-600 block mt-2"
                    delay={200}
                    onComplete={() => setStartCounters(true)}
                  />
                )}
              </h1>
            </div>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {t.hero.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/productos" className="btn-primary text-center inline-flex items-center justify-center">
                {t.hero.viewProducts}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link to="/ofertas" className="btn-secondary text-center inline-flex items-center justify-center">
                {t.hero.specialOffers}
              </Link>
            </div>
            
            <div className="mt-12 grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">
                <AnimatedCounter target={1000} duration={2000} suffix="+" startAnimation={startCounters} />
              </div>
                <div className="text-gray-600">{t.hero.customers}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">
                <AnimatedCounter target={50} duration={1500} suffix="+" startAnimation={startCounters} />
              </div>
                <div className="text-gray-600">{t.hero.models}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2 animate-pulse">24/7</div>
                <div className="text-gray-600">{t.hero.support}</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&h=600&fit=crop"
                alt="Calzado de hogar"
                className="rounded-lg shadow-2xl"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-primary-200 rounded-full opacity-50 blur-3xl"></div>
            <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-secondary-200 rounded-full opacity-50 blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;