import React from 'react';
import { useLanguage } from '../translations/LanguageContext.jsx';

function SocialMedia() {
  const { t } = useLanguage();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        {t?.socialMedia?.title || "Redes Sociales"}
      </h1>
      
      <div className="instagram-feed mb-12">
        <h2 className="text-2xl font-semibold mb-6">
          {t?.socialMedia?.instagram?.title || "Instagram"}
        </h2>
        
        <div className="flex justify-center mb-6">
          <div className="instagram-embed bg-white rounded-lg shadow-md overflow-hidden max-w-3xl w-full">
            <iframe
              title="Instagram Feed"
              src="https://www.instagram.com/alvaropuertas76/embed"
              width="100%"
              height="600"
              frameBorder="0"
              scrolling="no"
              allowTransparency="true"
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
        
        <div className="text-center">
          <a 
            href="https://www.instagram.com/alvaropuertas76/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition"
          >
            {t?.socialMedia?.instagram?.viewOnInstagram || "Ver en Instagram"}
          </a>
        </div>
      </div>
    </div>
  );
}

export default SocialMedia;
