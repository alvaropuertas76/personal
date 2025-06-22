import React, { useState } from 'react';
import { useLanguage } from '../translations/LanguageContext.jsx';
import { Link } from 'react-router-dom';

function LanguageSelector() {
  const { language, changeLanguage, flags, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  // Alternar el menú desplegable
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Cambiar el idioma y cerrar el menú
  const handleLanguageChange = (lang) => {
    changeLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center space-x-1 focus:outline-none"
          aria-label="Language selector"
        >
          <img 
            src={flags[language]} 
            alt={language === 'es' ? 'Español' : 'English'}
            title={language === 'es' ? 'Español' : 'English'}
            className="w-6 h-auto"
          />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50">
            <div className="py-1">
              <button
                onClick={() => handleLanguageChange('es')}
                className={`flex items-center px-4 py-2 text-sm w-full text-left ${
                  language === 'es' ? 'bg-gray-100 font-medium' : 'hover:bg-gray-50'
                }`}
              >
                <img 
                  src={flags.es} 
                  alt="Español" 
                  className="w-5 h-auto mr-3" 
                /> Español
              </button>
              <button
                onClick={() => handleLanguageChange('en')}
                className={`flex items-center px-4 py-2 text-sm w-full text-left ${
                  language === 'en' ? 'bg-gray-100 font-medium' : 'hover:bg-gray-50'
                }`}
              >
                <img 
                  src={flags.en} 
                  alt="English" 
                  className="w-5 h-auto mr-3" 
                /> English
              </button>
            </div>
          </div>
        )}
      </div>
      <Link 
        to="/private"
        className="text-gray-700 hover:text-blue-600 transition text-sm font-medium"
      >
        {t?.common?.private || "Privado"}
      </Link>
    </div>
  );
}

export default LanguageSelector;
