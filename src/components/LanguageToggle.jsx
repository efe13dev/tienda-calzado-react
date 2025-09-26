import { useLanguage } from '../contexts/useLanguage.js';
import { Globe } from 'lucide-react';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
      title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
    >
      <Globe className="w-5 h-5 text-gray-700" />
      <span className="font-medium text-gray-900">
        {language.toUpperCase()}
      </span>
    </button>
  );
};

export default LanguageToggle;