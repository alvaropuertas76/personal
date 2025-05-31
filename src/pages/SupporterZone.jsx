import React, { useState, useEffect } from 'react';
import SupporterCarousel from '../components/SupporterCarousel';
import { useLanguage } from '../translations/LanguageContext.jsx';

function SupporterZone() {
  const [supportData, setSupportData] = useState({
    supportEntries: [],
    carouselImages: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t, language } = useLanguage();

  // Cargar los datos del JSON
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/personal/data/support-entries.json');
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();
        setSupportData(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching support data:', err);
        setError('Failed to load support data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-500">
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          {language === 'es' ? 'Zona de Soporte' : 'Supporter Zone'}
        </h1>

        {/* Carrusel de imágenes */}
        <div className="mb-12">
          <SupporterCarousel images={supportData.carouselImages} />
        </div>

        {/* Lista de entradas de soporte */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">
            {language === 'es' ? 'Mensajes de Apoyo en Carreras' : 'Race Support Messages'}
          </h2>
          
          <div className="space-y-8">
            {supportData.supportEntries.map((entry) => (
              <div key={entry.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-blue-600 text-white py-3 px-4">
                  <h3 className="text-xl font-medium">{entry.raceTitle}</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 mb-4">{entry.supportText}</p>
                  <div className="text-right">
                    <span className="text-sm text-gray-500 italic">
                      {language === 'es' ? 'Apoyo de: ' : 'Support from: '}
                      <strong>{entry.supporterName}</strong>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <p className="text-gray-600">
              {language === 'es' ? 
                'Esta sección está dedicada a todas las personas que me han apoyado a lo largo de mis desafíos deportivos.' : 
                'This section is dedicated to all those who have supported me throughout my sporting challenges.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupporterZone;
