import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../translations/LanguageContext.jsx';
// Intentamos importar los datos del archivo JSON
// Nota: La importación puede fallar si el JSON tiene comentarios o formato incorrecto
// import jsonData from '../../data/runningStats.json';

function Statistics() {
  const { t } = useLanguage();
  const [statsData, setStatsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('Intentando cargar datos mediante fetch...');
        const response = await fetch('/personal/data/runningStats.json');
        console.log('Respuesta fetch:', response.status, response.statusText);
        
        if (!response.ok) {
          throw new Error(`Error al cargar datos: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Datos cargados mediante fetch:', data);
        
        if (!data || !data.yearlyKilometers || !data.yearlyKilometers.length) {
          throw new Error('El formato de los datos no es válido');
        }
        
        setStatsData(data);
        setIsLoading(false);
      } catch (err) {
        console.error('Error al cargar datos:', err);
        setError(`${t.statistics.errorLoading}: ${err.message}`);
        setIsLoading(false);
      }
    };

    loadData();
  }, [t.statistics.errorLoading]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl text-red-600 mb-6">{t.statistics.errorLoading}</h1>
        <p className="mb-4">{error}</p>
        <div className="p-4 bg-gray-100 rounded-lg inline-block text-left">
          <h2 className="font-semibold mb-2">Posibles soluciones:</h2>
          <ul className="list-disc pl-5">
            <li>Verificar que el archivo JSON existe en public/data</li>
            <li>Comprobar que el JSON no tiene comentarios ni errores de formato</li>
            <li>Refrescar la página o limpiar la caché del navegador</li>
          </ul>
        </div>
      </div>
    );
  }

  // Calcular valores estadísticos
  const totalKilometers = statsData?.yearlyKilometers.reduce((acc, curr) => acc + curr.kilometers, 0) || 0;
  const averageYearlyDistance = Math.round(totalKilometers / (statsData?.yearlyKilometers.length || 1));
  const yearsRunning = statsData?.yearlyKilometers.length || 0;
  
  // Encontrar el valor máximo para calcular porcentajes
  const maxKilometers = Math.max(...statsData?.yearlyKilometers.map(item => item.kilometers) || [0]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">{t.statistics.title}</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">{t.statistics.yearlyDistanceTitle}</h2>
        
        {/* Gráfico de barras personalizado usando divs */}
        <div className="mt-8 space-y-4">
          {statsData?.yearlyKilometers.map((item) => (
            <div key={item.year} className="flex items-center">
              <div className="w-16 text-right mr-4">{item.year}</div>
              <div className="flex-1">
                <div 
                  className="bg-blue-500 h-8 rounded-r-lg transition-all duration-500 flex items-center px-3"
                  style={{ width: `${(item.kilometers / maxKilometers) * 100}%` }}
                >
                  <span className="text-white font-medium">{item.kilometers} km</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-sm text-gray-600">
          <p>{t.statistics.dataDescription}</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">{t.statistics.totalStats}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <h3 className="text-lg font-medium text-blue-800">{t.statistics.totalDistance}</h3>
            <p className="text-3xl font-bold text-blue-600">
              {totalKilometers.toLocaleString()} km
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <h3 className="text-lg font-medium text-green-800">{t.statistics.averageYearlyDistance}</h3>
            <p className="text-3xl font-bold text-green-600">
              {averageYearlyDistance.toLocaleString()} km
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <h3 className="text-lg font-medium text-purple-800">{t.statistics.yearsRunning}</h3>
            <p className="text-3xl font-bold text-purple-600">
              {yearsRunning}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
