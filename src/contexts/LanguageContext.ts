import { createContext } from "react";

export interface LanguageContextType {
  language: "es" | "en";
  changeLanguage: (lang: "es" | "en") => void;
  toggleLanguage: () => void;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
