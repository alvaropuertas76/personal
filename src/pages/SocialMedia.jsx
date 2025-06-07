import React from 'react';
import { useLanguage } from '../translations/LanguageContext.jsx';

function SocialMedia() {
  const { t } = useLanguage();
  const instagramUsername = 'alvaropuertas76'; // Reemplaza con tu usuario de Instagram


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        {t?.socialMedia?.title || "Redes Sociales"}
      </h1>
        <div className="instagram-feed mb-12">
        <h2 className="text-2xl font-semibold mb-6">Instagram</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Widget de Instagram */}
          <div className="instagram-widget bg-white rounded-lg shadow-md p-4">
            <div className="aspect-square">
              <iframe
                src={`https://www.instagram.com/alvaropuertas76/embed`}
                className="w-full h-full"
                frameBorder="0"
                scrolling="no"
                allowtransparency="true"
              ></iframe>
            </div>
          </div>
          
          {/* Feed de Instagram */}
          <div className="instagram-profile bg-white rounded-lg shadow-md p-4">
            <a
              href={`https://www.instagram.com/${instagramUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center mb-4"
            >
              <img
                src={`https://unavatar.io/instagram/${instagramUsername}`}
                alt={instagramUsername}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h3 className="font-bold">@{instagramUsername}</h3>
                <p className="text-sm text-gray-600">{t?.socialMedia?.instagram?.followMe || "Sígueme en Instagram"}</p>
              </div>
            </a>
            
            <a
              href={`https://www.instagram.com/${instagramUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              {t?.socialMedia?.instagram?.viewProfile || "Ver perfil completo"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SocialMedia;
