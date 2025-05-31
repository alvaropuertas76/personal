import React, { useEffect, useState } from 'react';

const VisitCounter = () => {
  const [visits, setVisits] = useState('--');
  const [loading, setLoading] = useState(true);

  // Función para actualizar el contador local
  const updateLocalCounter = () => {
    try {
      const localCount = localStorage.getItem('local-visit-count') || '0';
      const newCount = parseInt(localCount) + 1;
      localStorage.setItem('local-visit-count', newCount.toString());
      return newCount;
    } catch (error) {
      console.error('Error updating local counter:', error);
      return 1;
    }
  };

  useEffect(() => {
    const fetchVisitCount = async () => {
      try {
        const today = new Date().toDateString();
        const lastVisit = localStorage.getItem('last-visit-date');
        
        // Determinar si debemos incrementar o solo obtener
        const shouldIncrement = lastVisit !== today;
        
        // Usar localStorage para conteo
        if (shouldIncrement) {
          // Es una nueva visita
          const localCount = updateLocalCounter();
          setVisits(localCount.toLocaleString());
          localStorage.setItem('last-visit-date', today);
        } else {
          // Solo obtener el conteo actual
          const localCount = localStorage.getItem('local-visit-count') || '1';
          setVisits(parseInt(localCount).toLocaleString());
        }
      } catch (error) {
        console.error('Error in visit counter:', error);
        setVisits('1'); // Valor por defecto
      } finally {
        setLoading(false);
      }
    };

    fetchVisitCount();
  }, []);

  return (
    <div className="flex items-center">
      <span className="mr-2">Visitantes:</span>
      <div className="bg-gray-700 px-3 py-1 rounded text-gray-200">
        {loading ? (
          <span className="inline-block w-12 text-center">
            <i className="fas fa-spinner fa-spin"></i>
          </span>
        ) : (
          <span>{visits}</span>
        )}
      </div>
    </div>
  );
};

export default VisitCounter;