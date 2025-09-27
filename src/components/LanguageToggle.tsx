import { Globe } from "lucide-react";

import { useLanguage } from "../contexts/useLanguage";

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-2 rounded-lg px-3 py-2 transition-colors hover:bg-gray-100"
      title={language === "es" ? "Switch to English" : "Cambiar a Español"}
    >
      <Globe className="h-5 w-5 text-gray-700" />
      <span className="font-medium text-gray-900">{language.toUpperCase()}</span>
    </button>
  );
};

export default LanguageToggle;
