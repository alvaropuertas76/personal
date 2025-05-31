import React, { useEffect } from 'react';

// Este componente se encarga de inicializar Google Analytics
const GoogleAnalytics = ({ measurementId }) => {
  useEffect(() => {
    // Carga el script de Google Analytics
    const loadGoogleAnalytics = () => {
      // Crear los elementos script
      const gtagScript = document.createElement('script');
      gtagScript.async = true;
      gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      
      const dataLayerScript = document.createElement('script');
      dataLayerScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${measurementId}');
      `;
      
      // Añadir los scripts al head
      document.head.appendChild(gtagScript);
      document.head.appendChild(dataLayerScript);
    };

    loadGoogleAnalytics();

    // Limpieza al desmontar
    return () => {
      // Opcionalmente, eliminar los scripts al desmontar el componente
      // En la práctica, generalmente no se eliminan ya que Google Analytics debe estar presente en toda la app
    };
  }, [measurementId]);

  // Este componente no renderiza nada visible
  return null;
};

export default GoogleAnalytics;
