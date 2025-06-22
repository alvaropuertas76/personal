import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../translations/LanguageContext.jsx';

function PrivateCalendar() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    // Verificar autenticación
    const isAuthenticated = sessionStorage.getItem('privateAuth') === 'true';
    if (!isAuthenticated) {
      navigate('/private');
      return;
    }

    // Cargar el cliente de Google Calendar
    const loadGoogleCalendar = async () => {
      try {
        // Cargar el script de Google Calendar API
        const script = document.createElement('script');
        script.src = 'https://apis.google.com/js/api.js';
        script.onload = initializeGoogleCalendar;
        document.body.appendChild(script);
      } catch (err) {
        setError(t?.private?.calendarError || 'Error loading calendar');
        setLoading(false);
      }
    };

    loadGoogleCalendar();
  }, [navigate, t]);

  const initializeGoogleCalendar = () => {
    window.gapi.load('client', async () => {
      try {
        await window.gapi.client.init({
          apiKey: import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY,
          discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
        });

        // Obtener eventos del calendario
        const response = await window.gapi.client.calendar.events.list({
          calendarId: import.meta.env.VITE_GOOGLE_CALENDAR_ID,
          timeMin: new Date().toISOString(),
          maxResults: 100,
          singleEvents: true,
          orderBy: 'startTime',
        });

        setEvents(response.result.items);
        setLoading(false);
      } catch (err) {
        setError(t?.private?.calendarError || 'Error loading calendar');
        setLoading(false);
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p>{t?.private?.loading || 'Loading calendar...'}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          {t?.private?.calendar || 'Training Calendar'}
        </h1>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {events.map((event) => (
              <li key={event.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {event.summary}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {new Date(event.start.dateTime || event.start.date).toLocaleString()}
                    </p>
                  </div>
                  {event.description && (
                    <p className="mt-1 text-sm text-gray-600 max-w-xl">
                      {event.description}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PrivateCalendar;
