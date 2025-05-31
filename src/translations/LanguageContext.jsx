import React, { createContext, useState, useContext, useEffect } from 'react';
import esTranslations from './es';
import enTranslations from './en';

// Traducciones disponibles
const translations = {
  es: esTranslations,
  en: enTranslations,
};

// Crear el contexto
const LanguageContext = createContext();

// Hook personalizado para usar el contexto de idioma
export const useLanguage = () => useContext(LanguageContext);

// Proveedor del contexto de idioma
export const LanguageProvider = ({ children }) => {
  // Intentar obtener el idioma guardado en localStorage, o usar 'es' por defecto
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'es';
  });

  // Guardar el idioma en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('language', language);
    // También podríamos establecer el atributo lang en el elemento html
    document.documentElement.lang = language;
  }, [language]);

  // Función para cambiar el idioma
  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
    }
  };

  // Obtener las traducciones para el idioma actual
  const t = translations[language];  // Valor que proporcionará el contexto
  const contextValue = {
    language,
    changeLanguage,
    t,
    // Rutas a las imágenes de banderas reales
    flags: {
      es: './assets/images/country/es.png',
      en: './assets/images/country/gb.png',
    },
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
