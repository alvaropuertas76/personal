import { useEffect, useState, useRef } from 'react';

function MapSection({ coordinates, title, route }) {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [attemptCount, setAttemptCount] = useState(0);
  const mapRef = useRef(null);
  const mapTimerRef = useRef(null);

  // Función para inicializar el mapa
  const initializeMap = () => {
    try {
      // Verificar que tenemos las coordenadas
      if (!coordinates || !coordinates.lat || !coordinates.lng) {
        throw new Error('Coordenadas inválidas');
      }

      const mapElement = document.getElementById('race-map');
      if (!mapElement) {
        throw new Error('Elemento de mapa no encontrado');
      }

      if (!window.google || !window.google.maps) {
        // Si superamos el máximo de intentos, mostrar error
        if (attemptCount >= 20) {
          throw new Error('No se pudo cargar la API de Google Maps');
        }
        
        // Incrementar contador e intentar de nuevo
        setAttemptCount(prev => prev + 1);
        mapTimerRef.current = setTimeout(initializeMap, 500);
        return;
      }

      console.log('Creando mapa con coordenadas:', coordinates);
      
      // Crear instancia del mapa
      const newMap = new window.google.maps.Map(mapElement, {
        center: coordinates,
        zoom: 10,
        mapTypeId: 'terrain'
      });
      
      // Añadir marcador
      new window.google.maps.Marker({
        position: coordinates,
        map: newMap,
        title: title
      });
      
      // Si hay ruta, mostrarla
      if (route && route.length > 1) {
        const path = new window.google.maps.Polyline({
          path: route,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 3
        });
        
        path.setMap(newMap);
        
        // Ajustar a los límites de la ruta
        const bounds = new window.google.maps.LatLngBounds();
        route.forEach(point => bounds.extend(point));
        newMap.fitBounds(bounds);
      }
      
      // Guardar la referencia y actualizar estado
      mapRef.current = newMap;
      setMapLoaded(true);
      console.log('Mapa inicializado con éxito');
    } catch (err) {
      console.error('Error al inicializar el mapa:', err);
      setError(`Error: ${err.message}`);
    }
  };

  // Efecto para manejar la inicialización del mapa
  useEffect(() => {
    // Solo intentar inicializar si tenemos coordenadas y no hay error
    if (coordinates && !error && !mapRef.current) {
      // Intentar inicializar inmediatamente
      initializeMap();
      
      // Registrar evento para cuando Google Maps se cargue
      const handleMapsLoaded = () => {
        console.log('Evento de carga de Google Maps recibido');
        if (!mapRef.current) {
          initializeMap();
        }
      };
      
      window.addEventListener('googleMapsLoaded', handleMapsLoaded);
      
      // Limpiar al desmontar
      return () => {
        window.removeEventListener('googleMapsLoaded', handleMapsLoaded);
        if (mapTimerRef.current) {
          clearTimeout(mapTimerRef.current);
        }
        mapRef.current = null;
      };
    }
  }, [coordinates, error]); // eslint-disable-line react-hooks/exhaustive-deps

  // Si hay un error, mostrar mensaje
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
        <p className="text-red-800 font-medium">
          <i className="fas fa-exclamation-triangle mr-2"></i>
          Error al cargar el mapa
        </p>
        <p className="text-red-700 mt-2">{error}</p>
        <p className="text-red-700 text-sm mt-1">
          Coordenadas: Lat {coordinates.lat.toFixed(4)}, Lng {coordinates.lng.toFixed(4)}
        </p>
        <p className="text-red-700 text-sm mt-1">
          Comprueba tu conexión a internet y que no haya bloqueadores de contenido activos.
        </p>
        <button 
          className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          onClick={() => {
            setError(null);
            setAttemptCount(0);
            mapRef.current = null;
            initializeMap();
          }}
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <>
      <div id="race-map" className="h-96 w-full rounded-lg mb-4"></div>
      {!mapLoaded && (
        <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg mb-4">
          <p className="text-yellow-800">
            <i className="fas fa-spinner fa-spin mr-2"></i>
            Cargando el mapa... ({attemptCount} intentos)
          </p>
          <p className="text-yellow-700 text-sm mt-2">
            Si el mapa no se carga, comprueba tu conexión a internet o que no haya bloqueadores de contenido activos.
          </p>
          <p className="text-yellow-700 text-sm mt-1">
            Coordenadas: Lat {coordinates.lat.toFixed(4)}, Lng {coordinates.lng.toFixed(4)}
          </p>
        </div>
      )}
    </>
  );
}

export default MapSection;
