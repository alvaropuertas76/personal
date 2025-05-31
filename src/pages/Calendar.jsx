import React, { useState, useEffect } from 'react';
import { CALENDAR_CATEGORIES } from '../utils/constants';
import { useLanguage } from '../translations/LanguageContext.jsx';
import { getWeatherForecast, getLocationFromEvent } from '../utils/weatherService';

function Calendar() {
  // State for the selected year (default to current year)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Estados para el modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDateEvents, setSelectedDateEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  // Estado para el pronóstico del tiempo
  const [weatherData, setWeatherData] = useState(null);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [weatherError, setWeatherError] = useState(null);
  
  // Obtener las traducciones
  const { t, language } = useLanguage();
  
  // Cargar eventos desde los archivos JSON
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
          // Cargar datos de los cuatro archivos
        const fetchFileData = async (fileName) => {
          try {
            const response = await fetch(`/personal/data/${fileName}-events.json`);
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status} for ${fileName}`);
            }
            return await response.json();
          } catch (error) {
            console.error(`Error loading ${fileName} events:`, error);
            throw error; // Re-throw to be caught by the main try-catch
          }
        };
        
        // Obtener datos de cada categoría en paralelo
        const [raceData, trainingData, restData, travelData] = await Promise.all([
          fetchFileData('race'),
          fetchFileData('training'),
          fetchFileData('rest'),
          fetchFileData('travel')
        ]);
          // Combinar todos los datos
        const allData = [...raceData, ...trainingData, ...restData, ...travelData];
        
        // Convertir las fechas de string a objetos Date
        const eventsWithDates = allData.map(event => {
          // Asegurarnos de que la fecha se interpreta correctamente
          // Convertir YYYY-MM-DD a un array [año, mes, día]
          const [year, month, day] = event.date.split('-').map(Number);
          
          // Crear una nueva fecha usando el constructor Date con año, mes (0-indexado), día
          // Importante: en JavaScript, los meses son 0-indexados (0 = enero, 11 = diciembre)
          const dateObj = new Date(year, month - 1, day);
          
          console.log(`Fecha original: ${event.date}, Fecha convertida: ${dateObj.toISOString()}`);
          
          return {
            ...event,
            date: dateObj
          };
        });
          setEvents(eventsWithDates);
      } catch (error) {
        console.error("Error cargando eventos:", error);
        setError("No se pudieron cargar los eventos. Por favor, inténtalo de nuevo más tarde.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchEvents();  }, []);
  // Generate array of months
  const months = t?.calendar?.months || [
    "Enero", "Febrero", "Marzo", "Abril", 
    "Mayo", "Junio", "Julio", "Agosto", 
    "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  
  // Function to get days in month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };
    // Function to get the day of week the month starts on (0 = Monday, 6 = Sunday)
  const getFirstDayOfMonth = (year, month) => {
    const day = new Date(year, month, 1).getDay();
    // Convert from Sunday-based (0-6) to Monday-based (0-6)
    return day === 0 ? 6 : day - 1;
  };
  
  // Filter events by year and category
  const filteredEvents = events.filter(event => {
    return (
      event.date.getFullYear() === selectedYear &&
      (selectedCategory === 'all' || event.category === selectedCategory)
    );
  });
  
  // Find events for a specific day
  const getEventsForDate = (date) => {
    return filteredEvents.filter(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };
  
  // Years to show in dropdown (5 years back, 5 years forward)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);
    // Función para manejar el clic en un día del calendario
  const handleDayClick = (date, events) => {
    if (events.length > 0) {
      setSelectedDate(date);
      setSelectedDateEvents(events);
      setIsModalOpen(true);
      
      // Resetear el estado del pronóstico al abrir un nuevo modal
      setWeatherData(null);
      setWeatherError(null);
      setLoadingWeather(false);
      
      // Buscar si hay eventos de carrera (tipo 'race') para esta fecha
      const raceEvents = events.filter(event => event.category === 'race');
      
      // Si hay eventos de carrera, obtener el pronóstico del tiempo para la primera carrera
      if (raceEvents.length > 0) {
        fetchWeatherForEvent(raceEvents[0]);
      }
    }
  };  // Función para obtener el pronóstico del tiempo para un evento
  const fetchWeatherForEvent = async (event) => {
    setLoadingWeather(true);
    setWeatherError(null);
    
    try {
      console.log('Obteniendo pronóstico para evento:', event);
      console.log('Título del evento:', event.title);
      console.log('Descripción del evento:', event.description);
      
      // Obtener la ubicación a partir del evento
      const location = getLocationFromEvent(event);
      
      if (!location) {
        console.error('No se pudo determinar la ubicación del evento');
        setWeatherError(t?.calendar?.weather?.noLocation || "Ubicación no disponible");
        setLoadingWeather(false);
        return;
      }
      
      console.log('Ubicación determinada:', location);
      
      // Llamar a la API de pronóstico del tiempo
      const forecast = await getWeatherForecast(location, language || 'es');
      
      if (forecast) {
        console.log('Datos de pronóstico recibidos:', forecast);
        setWeatherData(forecast);
      } else {
        // Hacer un segundo intento con una ubicación alternativa
        const alternativeLocation = event.title.split(' ')[0]; // Usar la primera palabra del título
        console.log('Intentando con ubicación alternativa:', alternativeLocation);
        
        const alternativeForecast = await getWeatherForecast(alternativeLocation, language || 'es');
        
        if (alternativeForecast) {
          console.log('Datos de pronóstico alternativos recibidos:', alternativeForecast);
          setWeatherData(alternativeForecast);
        } else {
          console.error('No se recibieron datos de pronóstico después de intentos alternativos');
          setWeatherError(t?.calendar?.weather?.error || "No se pudo cargar el pronóstico");
        }
      }
    } catch (error) {
      console.error("Error al obtener el pronóstico:", error);
      setWeatherError(`${t?.calendar?.weather?.error || "No se pudo cargar el pronóstico"}: ${error.message}`);
    } finally {
      setLoadingWeather(false);
    }
  };
    return (
    <div className="bg-gray-50 min-h-screen">      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">{t?.calendar?.title || "Calendario de Carreras y Entrenamientos"}</h1>
          {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p>{t?.calendar?.loading || "Cargando eventos..."}</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{t?.calendar?.error || error}</span>
            </div>
          </div>
        ) : (
          <>            {/* Filters */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
          <div className="flex items-center">
            <label htmlFor="year-select" className="mr-2 font-medium">{t?.calendar?.year || "Año:"}</label>
            <select 
              id="year-select"
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center">            <label htmlFor="category-select" className="mr-2 font-medium">{t?.calendar?.category || "Categoría:"}</label>
            <select 
              id="category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">{t?.calendar?.allEvents || "Todos los eventos"}</option>
              {Object.entries(CALENDAR_CATEGORIES).map(([key, category]) => (
                <option key={key} value={key}>{category.name}</option>
              ))}
            </select>
          </div>
        </div>        {/* Category Legend */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <div className="flex items-center">
            <span className="inline-block w-4 h-4 rounded-full bg-blue-600 mr-2"></span>
            <span>{t?.calendar?.categories?.race || "Carrera"}</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-4 h-4 rounded-full bg-green-500 mr-2"></span>
            <span>{t?.calendar?.categories?.training || "Entrenamiento"}</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-4 h-4 rounded-full bg-yellow-400 mr-2"></span>
            <span>{t?.calendar?.categories?.rest || "Descanso"}</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-4 h-4 rounded-full bg-purple-500 mr-2"></span>
            <span>{t?.calendar?.categories?.travel || "Viaje"}</span>
          </div>
        </div>
        
        {/* Calendar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {months.map((month, monthIndex) => {            // Get number of days in this month
            const daysInMonth = getDaysInMonth(selectedYear, monthIndex);
            // Get first day of the month (0 = Monday, 6 = Sunday)
            const firstDayOfMonth = getFirstDayOfMonth(selectedYear, monthIndex);
            // Create days array including empty spots for formatting
            const days = Array.from({ length: firstDayOfMonth + daysInMonth }, (_, i) => {
              if (i < firstDayOfMonth) return null;
              return i - firstDayOfMonth + 1;
            });
            
            return (
              <div key={month} className="bg-white rounded-lg shadow-soft p-4">
                <h2 className="text-lg font-bold mb-4 text-center">{month} {selectedYear}</h2>
                  {/* Days of week header */}                <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium mb-2">
                  {(t?.calendar?.weekDays || ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]).map(day => (
                    <div key={day} className="py-1">{day}</div>
                  ))}
                </div>
                
                {/* Days grid */}
                <div className="grid grid-cols-7 gap-1">
                  {days.map((day, i) => {
                    if (day === null) {
                      return <div key={`empty-${i}`} className="h-10 md:h-12"></div>;
                    }
                    
                    const date = new Date(selectedYear, monthIndex, day);
                    const eventsForDay = getEventsForDate(date);
                    const hasEvent = eventsForDay.length > 0;
                    const eventCategory = hasEvent ? eventsForDay[0].category : null;
                    
                    return (                      <div 
                        key={`${monthIndex}-${day}`}
                        className={`relative h-10 md:h-12 flex items-center justify-center border border-gray-100 rounded-sm ${
                          hasEvent 
                            ? `calendar-day ${eventCategory} cursor-pointer hover:shadow-md transition-all` 
                            : ''
                        }`}
                        onClick={() => handleDayClick(date, eventsForDay)}
                        title={hasEvent ? `${eventsForDay.length} event(s): ${eventsForDay.map(e => e.title).join(', ')}` : ''}
                      >
                        <span className="text-sm">{day}</span>
                          {/* Event indicator */}
                        {hasEvent && (
                          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-1">
                            <span 
                              className={`inline-block w-2 h-2 rounded-full bg-${CALENDAR_CATEGORIES[eventCategory].color}`}
                              title={eventsForDay.map(e => e.title).join(', ')}
                            ></span>
                            {eventsForDay.length > 1 && (
                              <span className="text-xs text-gray-500">+{eventsForDay.length - 1}</span>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Event Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50" onClick={() => setIsModalOpen(false)}></div>
            
            <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 z-10 overflow-y-auto max-h-[90vh]">              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">{t?.calendar?.eventsOn || "Eventos del"} {selectedDate.toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</h3>
                <button 
                  onClick={() => setIsModalOpen(false)} 
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Cerrar"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {selectedDateEvents.length === 0 ? (
                <p className="text-center text-gray-500">{t?.calendar?.noEvents || "No hay eventos para esta fecha."}</p>
              ) : (
                <div className="space-y-4">
                  {selectedDateEvents.map(event => (                    <div key={event.id} className={`border-l-4 border-${CALENDAR_CATEGORIES[event.category].color} pl-4 p-3 bg-gray-50 rounded-r`}>
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold text-lg">{event.title}</h4>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-${CALENDAR_CATEGORIES[event.category].color} bg-opacity-20 text-${CALENDAR_CATEGORIES[event.category].color}`}>
                          {CALENDAR_CATEGORIES[event.category].name}
                        </span>
                      </div>                      <p className="text-gray-500 text-sm mt-1">
                        {event.date.toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                      <p className="mt-2 text-gray-700">{event.description}</p>
                        {/* Mostrar pronóstico del tiempo solo para eventos de tipo "race" */}
                      {event.category === 'race' && (
                        <div className="mt-4 border-t pt-3 weather-forecast">
                          <h5 className="font-medium text-sm mb-2">{t?.calendar?.weather?.title || "Pronóstico del tiempo"}</h5>
                          
                          {loadingWeather && (
                            <div className="flex items-center text-gray-500 text-sm">
                              <div className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-500 mr-2"></div>
                              <span>{t?.calendar?.weather?.loading || "Cargando pronóstico..."}</span>
                            </div>
                          )}
                          
                          {weatherError && !loadingWeather && (
                            <p className="text-sm text-red-500">{weatherError}</p>
                          )}
                          
                          {weatherData && !loadingWeather && !weatherError && (
                            <div className="bg-blue-50 p-3 rounded-md weather-forecast-content">
                              <div className="flex items-center mb-2">
                                <img 
                                  src={weatherData.iconUrl} 
                                  alt={weatherData.description} 
                                  className="w-10 h-10 weather-icon"
                                />
                                <div className="ml-2">
                                  <p className="font-medium">{weatherData.cityName}</p>
                                  <p className="text-sm text-gray-600 capitalize">{weatherData.description}</p>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-3 gap-2 text-sm">
                                <div>
                                  <p className="text-gray-500">{t?.calendar?.weather?.temperature || "Temperatura"}</p>
                                  <p className="font-medium">{weatherData.temperature} {t?.calendar?.weather?.degrees || "°C"}</p>
                                </div>
                                <div>
                                  <p className="text-gray-500">{t?.calendar?.weather?.humidity || "Humedad"}</p>
                                  <p className="font-medium">{weatherData.humidity} {t?.calendar?.weather?.percent || "%"}</p>
                                </div>
                                <div>
                                  <p className="text-gray-500">{t?.calendar?.weather?.wind || "Viento"}</p>
                                  <p className="font-medium">{weatherData.windSpeed} {t?.calendar?.weather?.kmh || "km/h"}</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                      
                      {event.link && (
                        <div className="mt-3">
                          <a 
                            href={event.link} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-blue-600 hover:text-blue-800 hover:underline" 
                          >
                            {t?.calendar?.viewDetails || "Ver detalles"}
                            <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
                <div className="mt-6 flex justify-end">
                <button 
                  onClick={() => setIsModalOpen(false)} 
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition font-medium"
                >
                  {t?.calendar?.close || "Cerrar"}
                </button>
              </div>
            </div>
          </div>
        )}
          </>
        )}
      </div>
    </div>
  );
}

export default Calendar;