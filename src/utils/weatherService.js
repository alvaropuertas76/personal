/**
 * Servicio para obtener el pronóstico del tiempo para eventos de tipo "Race"
 */

// API key de OpenWeatherMap obtenida de variables de entorno
const WEATHER_API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY || process.env.OPENWEATHERMAP_API_KEY || '';
if (!WEATHER_API_KEY) {
  console.error('¡Error! API key de OpenWeatherMap no encontrada. Asegúrate de definir la variable de entorno VITE_OPENWEATHERMAP_API_KEY');
}
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Caché simple para evitar múltiples llamadas para la misma ubicación
const weatherCache = {
  data: {},
  // Tiempo de expiración de 60 minutos (en ms)
  expiration: 60 * 60 * 1000,
  
  // Guardar datos en la caché
  set: function(key, data) {
    this.data[key] = {
      timestamp: Date.now(),
      data: data
    };
  },
  
  // Obtener datos de la caché si son válidos
  get: function(key) {
    const entry = this.data[key];
    if (!entry) return null;
    
    // Comprobar si han pasado más de 60 minutos
    if (Date.now() - entry.timestamp > this.expiration) {
      delete this.data[key];
      return null;
    }
    
    return entry.data;
  }
};

/**
 * Obtiene el pronóstico del tiempo para una ubicación específica
 * @param {string} location - Nombre de la ubicación (ciudad, país)
 * @param {string} lang - Código de idioma (es, en)
 * @returns {Promise} - Promesa con los datos del pronóstico
 */
export const getWeatherForecast = async (location, lang = 'es') => {
  try {
    if (!location) {
      console.warn('Ubicación no proporcionada para el pronóstico del tiempo');
      return null;
    }
    
    // Normalizar la ubicación para la clave de caché
    const cacheKey = `${location.toLowerCase()}_${lang}`;
    
    // Intentar obtener datos de la caché
    const cachedData = weatherCache.get(cacheKey);
    if (cachedData) {
      console.log('Usando datos en caché para:', location);
      return cachedData;
    }
      // Si no hay datos en caché, hacer la llamada a la API
    console.log('Solicitando pronóstico para:', location);
    
    // Asegurarse de que la ubicación esté correctamente codificada para URL
    const encodedLocation = encodeURIComponent(location);
    const url = `${WEATHER_API_URL}?q=${encodedLocation}&appid=${WEATHER_API_KEY}&units=metric&lang=${lang}`;
    
    // Mostrar la URL completa para fines de depuración (Recomendación: quita esto en producción)
    console.log('URL completa de la API:', url);
    // Versión para mostrar en la consola de desarrollo (sin la clave API)
    console.log('URL de la API:', url.replace(WEATHER_API_KEY, 'API_KEY_HIDDEN'));
      const response = await fetch(url);
    
    // Mostrar detalles de la respuesta HTTP
    console.log('Respuesta HTTP:', {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
      headers: Object.fromEntries([...response.headers])
    });
      // Verificar si la respuesta es exitosa
    if (!response.ok) {
      let errorMessage = `Error HTTP: ${response.status} - ${response.statusText}`;
      
      try {
        const errorData = await response.json();
        console.error('Error de la API:', {
          status: response.status,
          statusText: response.statusText,
          errorData
        });
        
        if (errorData && errorData.message) {
          errorMessage = `Error API: ${errorData.message}`;
        }
        
        // Mostrar información detallada del error para depuración
        console.log('Información detallada del error:', JSON.stringify(errorData, null, 2));
      } catch (e) {
        console.error('No se pudo analizar el error de la API');
      }
      
      // Para errores 404 (no encontrado), intentar con una ciudad más genérica
      if (response.status === 404) {
        console.log('Ubicación no encontrada, intentando con una más genérica');
        
        // Extraer solo la primera palabra (posible ciudad o país)
        const firstWord = location.split(/[,\s]+/)[0];
        
        if (firstWord && firstWord !== location) {
          console.log(`Reintentando con ubicación simplificada: ${firstWord}`);
          return getWeatherForecast(firstWord, lang);
        } else {
          // Si es solo una palabra y no se encontró, probar con una ciudad genérica
          return getWeatherForecast("Madrid", lang);
        }
      }
      
      throw new Error(errorMessage);
    }
    
    const data = await response.json();
    console.log('Datos recibidos de la API:', data);
    
    // Transformar los datos a un formato más simple para nuestra aplicación
    const formattedData = {
      temperature: Math.round(data.main.temp),
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6), // Convertir de m/s a km/h
      cityName: data.name,
      countryCode: data.sys.country,
      iconUrl: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    };
    
    // Guardar en caché
    weatherCache.set(cacheKey, formattedData);
    
    return formattedData;
  } catch (error) {
    console.error('Error en el servicio de clima:', error.message);
    return null;
  }
};

/**
 * Obtiene la ubicación a partir de la cadena de descripción del evento
 * @param {Object} event - Objeto de evento
 * @returns {string} - Ubicación para buscar el pronóstico
 */
export const getLocationFromEvent = (event) => {
  console.log('Evento recibido:', event);
  
  // Si el evento tiene una ubicación explícita, la usamos
  if (event.location) {
    console.log('Ubicación encontrada en atributo location:', event.location);
    return event.location;
  }
  
  // De lo contrario, intentamos extraer una ubicación de la descripción
  const description = event.description || '';
  console.log('Descripción del evento:', description);
    // Buscar patrones específicos comunes en las descripciones de carreras
  
  // Mapa de eventos conocidos a ubicaciones específicas
  const knownEvents = {
    "Marathon des Sables": "Morocco",
    "Ironman Frankfurt": "Frankfurt, Germany",
    "Ultra Trail Mont Blanc": "Chamonix, France",
    "UTMB": "Chamonix, France",
    "Boston Marathon": "Boston, USA",
    "Fire & Ice Ultra": "Iceland",
    "Berlin Marathon": "Berlin, Germany"
  };
  
  // Verificar si es un evento conocido
  for (const [eventName, location] of Object.entries(knownEvents)) {
    if (event.title.includes(eventName)) {
      console.log(`Ubicación encontrada para evento conocido ${eventName}:`, location);
      return location;
    }
  }
  
  // Patrón específico para Marathon des Sables
  if (event.title.includes('Marathon des Sables') || description.includes('Sahara')) {
    console.log('Ubicación encontrada para Marathon des Sables: Morocco');
    return 'Morocco';
  }
  
  // Patrón específico para UTMB
  if (event.title.includes('Mont Blanc') || event.title.includes('UTMB')) {
    console.log('Ubicación encontrada para UTMB: Chamonix, France');
    return 'Chamonix, France';
  }
  
  // Patrón específico para Ironman
  const ironmanMatch = event.title.match(/Ironman\s+([A-Za-zÀ-ÿ\s]+)(?:\s|$)/i);
  if (ironmanMatch) {
    console.log('Ubicación de Ironman encontrada:', ironmanMatch[1]);
    return ironmanMatch[1]; // Devuelve la ciudad después de "Ironman"
  }
  
  // Extraer ciudad y país de descripciones con formato "... in [Ciudad], [País]"
  const cityCountryPattern = /\bin\s+([A-Za-zÀ-ÿ\s]+),\s*([A-Za-zÀ-ÿ]+)(?:\s|$)/i;
  const cityCountryMatch = description.match(cityCountryPattern);
  if (cityCountryMatch) {
    const location = `${cityCountryMatch[1].trim()}, ${cityCountryMatch[2].trim()}`;
    console.log('Ubicación extraída de ciudad, país:', location);
    return location;
  }
  
  // Extraer ciudad de descripciones con formato "... in [Ciudad]"
  const cityPattern = /\bin\s+([A-Za-zÀ-ÿ\s]+)(?:\s|$)/i;
  const cityMatch = description.match(cityPattern);
  if (cityMatch) {
    const location = cityMatch[1].trim();
    console.log('Ubicación extraída de ciudad:', location);
    return location;
  }
  
  // Extraer país de descripciones
  const countryPattern = /\b(Morocco|Germany|France|USA|Spain|Poland|Italy|Japan|UK|Switzerland|Austria)\b/i;
  const countryMatch = description.match(countryPattern);
  if (countryMatch) {
    console.log('País extraído de descripción:', countryMatch[1]);
    return countryMatch[1];
  }
  
  // Buscar ubicaciones conocidas en la descripción
  const locationWords = [
    'Morocco', 'Germany', 'France', 'USA', 'Poland', 'Spain', 'Boston', 'Frankfurt', 
    'Warsaw', 'Almeria', 'Alps', 'Chamonix', 'Berlin', 'London', 'Tokyo', 'Madrid', 
    'Barcelona', 'Rome', 'New York', 'Chicago', 'Sydney', 'Melbourne', 'Paris',
    'Vienna', 'Munich', 'Amsterdam', 'Brussels', 'Geneva', 'Zurich', 'Milan'
  ];
  
  // Primero buscar en la descripción
  for (const location of locationWords) {
    if (description.toLowerCase().includes(location.toLowerCase())) {
      console.log('Ubicación encontrada como palabra clave en descripción:', location);
      return location;
    }
  }
  
  // Luego buscar en el título
  for (const location of locationWords) {
    if (event.title.toLowerCase().includes(location.toLowerCase())) {
      console.log('Ubicación encontrada como palabra clave en título:', location);
      return location;
    }
  }
  
  // Extraer la primera palabra del título que podría ser una ubicación
  const words = event.title.split(/\s+/);
  const excludedWords = [
    'Marathon', 'Ultramarathon', 'Race', 'Ultra', 'Trail', 'Running', 
    'des', 'de', 'the', 'La', 'El', 'Los', 'Las', 'A', 'An', 'The'
  ];
  
  for (const word of words) {
    if (word.length > 3 && 
        word[0] === word[0].toUpperCase() && 
        !excludedWords.includes(word)) {
      console.log('Posible ubicación extraída del título:', word);
      return word;
    }
  }
  
  // Si todo lo demás falla, extraer algo que parezca una ubicación de la descripción
  const potentialLocationMatch = description.match(/\b([A-Z][a-zÀ-ÿ]{2,})\b/);
  if (potentialLocationMatch) {
    console.log('Extrayendo posible ubicación de la descripción:', potentialLocationMatch[1]);
    return potentialLocationMatch[1];
  }
  
  // Último recurso: usar una ubicación genérica basada en la temporada
  const date = new Date(event.date);
  const month = date.getMonth(); // 0-11
  
  if (month >= 3 && month <= 8) {
    // Temporada de primavera/verano, usar una ubicación genérica de Europa
    console.log('Usando ubicación genérica (primavera/verano): Madrid');
    return 'Madrid';
  } else {
    // Temporada de otoño/invierno, usar una ubicación genérica
    console.log('Usando ubicación genérica (otoño/invierno): Barcelona');
    return 'Barcelona';
  }
};
