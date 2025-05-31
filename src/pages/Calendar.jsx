import React, { useState } from 'react';
import { CALENDAR_CATEGORIES } from '../utils/constants';

function Calendar() {
  // State for the selected year (default to current year)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Sample events data - in a real application, this would come from an API or database
  const [events] = useState([
    {
      id: 1,
      title: "Marathon des Sables",
      date: new Date(2022, 3, 25), // April 25, 2022
      category: "race",
      description: "250km self-supported race across the Sahara Desert, Morocco",
      link: "/race/mds-2022"
    },
    {
      id: 2,
      title: "Long Training Run",
      date: new Date(2023, 0, 15), // January 15, 2023
      category: "training",
      description: "30km trail training run with elevation",
      link: null
    },
    {
      id: 3,
      title: "Ironman Frankfurt",
      date: new Date(2023, 5, 18), // June 18, 2023
      category: "race",
      description: "Full distance triathlon in Germany",
      link: "/race/ironman-frankfurt-2023"
    },
    {
      id: 4,
      title: "Rest Week",
      date: new Date(2023, 6, 10), // July 10, 2023
      category: "rest",
      description: "Active recovery week after Ironman",
      link: null
    },
    {
      id: 5,
      title: "Ultra Trail Mont Blanc",
      date: new Date(2023, 7, 28), // August 28, 2023
      category: "race",
      description: "100 mile trail race in the Alps",
      link: "/race/utmb-2023"
    },
    {
      id: 6,
      title: "Training Block",
      date: new Date(2023, 10, 15), // November 15, 2023
      category: "training",
      description: "Intensive 3-week training block for upcoming races",
      link: null
    },
    {
      id: 7,
      title: "Boston Marathon",
      date: new Date(2024, 3, 15), // April 15, 2024
      category: "race",
      description: "Road marathon in Boston, MA",
      link: "/race/boston-2024"
    },    {
      id: 8,
      title: "Sahara Desert Expedition",
      date: new Date(2024, 9, 5), // October 5, 2024
      category: "travel",
      description: "Travel to Morocco for race preparations",
      link: null
    },
    {
      id: 9,
      title: "Maratón de Invierno",
      date: new Date(2025, 0, 15), // January 15, 2025
      category: "race",
      description: "Carrera de invierno en condiciones extremas",
      link: "/race/winter-marathon-2025"
    },
    {
      id: 10,
      title: "Warsaw Marathon",
      date: new Date(2025, 8, 28), // January 15, 2025
      category: "race",
      description: "Marathon in Warsaw, Poland",
      link: "/race/warsaw-marathon-2025"
    },
    {
      id: 11,
      title: "La Desertica",
      date: new Date(2025, 9, 18), // October 28, 2025
      category: "race",
      description: "Ultramarathon in the Spanish desert of Almeria",
      link: "/race/la-desertica-2025"
    }

  ]);

  // Generate array of months
  const months = [
    "January", "February", "March", "April", 
    "May", "June", "July", "August", 
    "September", "October", "November", "December"
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
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Race & Training Calendar</h1>
        
        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
          <div className="flex items-center">
            <label htmlFor="year-select" className="mr-2 font-medium">Year:</label>
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
          
          <div className="flex items-center">
            <label htmlFor="category-select" className="mr-2 font-medium">Category:</label>
            <select 
              id="category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Events</option>
              {Object.entries(CALENDAR_CATEGORIES).map(([key, category]) => (
                <option key={key} value={key}>{category.name}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Category Legend */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <div className="flex items-center">
            <span className="inline-block w-4 h-4 rounded-full bg-blue-600 mr-2"></span>
            <span>Race</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-4 h-4 rounded-full bg-green-500 mr-2"></span>
            <span>Training</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-4 h-4 rounded-full bg-yellow-400 mr-2"></span>
            <span>Rest Day</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-4 h-4 rounded-full bg-purple-500 mr-2"></span>
            <span>Travel</span>
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
                  {/* Days of week header */}
                <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium mb-2">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(day => (
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
                    
                    return (
                      <div 
                        key={`${monthIndex}-${day}`}
                        className={`relative h-10 md:h-12 flex items-center justify-center border border-gray-100 rounded-sm ${
                          hasEvent ? `calendar-day ${eventCategory}` : ''
                        }`}
                      >
                        <span className="text-sm">{day}</span>
                        
                        {/* Event indicator */}
                        {hasEvent && (
                          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                            <span 
                              className={`inline-block w-2 h-2 rounded-full bg-${CALENDAR_CATEGORIES[eventCategory].color}`}
                              title={eventsForDay.map(e => e.title).join(', ')}
                            ></span>
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
        
        {/* Event List */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Events in {selectedYear}</h2>
          
          {filteredEvents.length === 0 ? (
            <p className="text-center text-gray-500">No events found for the selected criteria.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredEvents.map(event => (
                <div 
                  key={event.id} 
                  className={`border-l-4 border-${CALENDAR_CATEGORIES[event.category].color} bg-white rounded-lg shadow-soft p-4 hover:shadow-md transition`}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg">{event.title}</h3>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-${CALENDAR_CATEGORIES[event.category].color} bg-opacity-20 text-${CALENDAR_CATEGORIES[event.category].color}`}>
                      {CALENDAR_CATEGORIES[event.category].name}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mt-1">
                    {event.date.toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                  <p className="mt-2 text-gray-700">{event.description}</p>
                  
                  {event.link && (
                    <div className="mt-3">
                      <a 
                        href={event.link} 
                        className="inline-flex items-center text-blue-600 hover:text-blue-800"
                      >
                        View Details
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
        </div>
      </div>
    </div>
  );
}

export default Calendar;