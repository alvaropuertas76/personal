import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PLACEHOLDER_IMAGE } from '../../utils/constants';

function Ultramarathons() {
  const [ultras, setUltras] = useState([]);
  const [filteredUltras, setFilteredUltras] = useState([]);
  const [sortBy, setSortBy] = useState('date-desc');
  const [filterYear, setFilterYear] = useState('all');
  const [filterDistance, setFilterDistance] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [years, setYears] = useState([]);

  // Sample data for ultramarathons - in a real app, this would come from an API
  useEffect(() => {
    const ultraData = [
      {
        id: 'grand-raid-2022',
        title: 'Grand Raid Réunion',
        date: new Date('2022-10-20'),
        location: 'Réunion Island',
        distance: 165,
        elevationGain: 9500,
        time: '39:45:12',
        description: 'One of the most challenging mountain ultras, known as the "Diagonale des Fous" (Madmen\'s Diagonal).',
        image: '/assets/images/grand-raid.jpg',
        highlight: true,
        year: 2022,
        position: '145th / 1,200',
        terrain: 'Mountain trails'
      },
      {
        id: 'western-states-2023',
        title: 'Western States 100',
        date: new Date('2023-06-24'),
        location: 'California, USA',
        distance: 100,
        elevationGain: 5500,
        time: '24:13:45',
        description: 'The world\'s oldest 100-mile trail race through California\'s Sierra Nevada mountains.',
        image: '/assets/images/western-states.jpg',
        highlight: true,
        year: 2023,
        position: '89th / 380',
        terrain: 'Mountain trails'
      },
      {
        id: 'utmb-2021',
        title: 'Ultra-Trail du Mont-Blanc',
        date: new Date('2021-08-27'),
        location: 'Chamonix, France',
        distance: 170,
        elevationGain: 10000,
        time: '36:28:15',
        description: 'The legendary mountain ultra around Mont Blanc through France, Italy, and Switzerland.',
        image: '/assets/images/utmb.jpg',
        highlight: true,
        year: 2021,
        position: '235th / 2,300',
        terrain: 'Alpine trails'
      },
      {
        id: 'spartathlon-2022',
        title: 'Spartathlon',
        date: new Date('2022-09-30'),
        location: 'Athens to Sparta, Greece',
        distance: 246,
        elevationGain: 1200,
        time: '33:45:30',
        description: 'Historic ultra retracing Pheidippides\' footsteps from Athens to Sparta.',
        image: '/assets/images/spartathlon.jpg',
        highlight: false,
        year: 2022,
        position: '67th / 350',
        terrain: 'Road'
      },
      {
        id: 'badwater-2023',
        title: 'Badwater 135',
        date: new Date('2023-07-10'),
        location: 'Death Valley, USA',
        distance: 217,
        elevationGain: 4450,
        time: '36:12:45',
        description: 'The world\'s toughest foot race through Death Valley in extreme heat.',
        image: '/assets/images/badwater.jpg',
        highlight: true,
        year: 2023,
        position: '32nd / 100',
        terrain: 'Road, desert'
      },
      {
        id: 'tarawera-2021',
        title: 'Tarawera Ultramarathon',
        date: new Date('2021-02-13'),
        location: 'Rotorua, New Zealand',
        distance: 102,
        elevationGain: 2800,
        time: '14:56:23',
        description: 'Running through New Zealand\'s stunning lakes district and native forests.',
        image: '/assets/images/tarawera.jpg',
        highlight: false,
        year: 2021,
        position: '56th / 420',
        terrain: 'Forest trails'
      },
      {
        id: 'transvulcania-2022',
        title: 'Transvulcania',
        date: new Date('2022-05-07'),
        location: 'La Palma, Spain',
        distance: 73,
        elevationGain: 4350,
        time: '10:23:45',
        description: 'A volcanic ultra through the stunning landscapes of La Palma island.',
        image: '/assets/images/transvulcania.jpg',
        highlight: false,
        year: 2022,
        position: '124th / 1,800',
        terrain: 'Volcanic trails'
      },
      {
        id: 'leadville-2021',
        title: 'Leadville Trail 100',
        date: new Date('2021-08-21'),
        location: 'Colorado, USA',
        distance: 161,
        elevationGain: 4800,
        time: '26:45:12',
        description: 'The "Race Across The Sky" at extreme altitude in the Colorado Rockies.',
        image: '/assets/images/leadville.jpg',
        highlight: false,
        year: 2021,
        position: '78th / 625',
        terrain: 'Mountain trails'
      }
    ];

    setUltras(ultraData);
    setFilteredUltras(ultraData);

    // Extract unique years for the filter
    const uniqueYears = [...new Set(ultraData.map(ultra => ultra.year))].sort().reverse();
    setYears(uniqueYears);
  }, []);

  // Distance categories for filtering
  const distanceCategories = [
    { value: 'all', label: 'All Distances' },
    { value: '50-80', label: '50-80km' },
    { value: '81-100', label: '81-100km' },
    { value: '101-160', label: '101-160km' },
    { value: '161+', label: '161km+' }
  ];

  // Apply filters and sorting when criteria change
  useEffect(() => {
    let result = [...ultras];

    // Apply year filter
    if (filterYear !== 'all') {
      result = result.filter(ultra => ultra.year === parseInt(filterYear));
    }

    // Apply distance filter
    if (filterDistance !== 'all') {
      switch (filterDistance) {
        case '50-80':
          result = result.filter(ultra => ultra.distance >= 50 && ultra.distance <= 80);
          break;
        case '81-100':
          result = result.filter(ultra => ultra.distance > 80 && ultra.distance <= 100);
          break;
        case '101-160':
          result = result.filter(ultra => ultra.distance > 100 && ultra.distance <= 160);
          break;
        case '161+':
          result = result.filter(ultra => ultra.distance > 160);
          break;
        default:
          break;
      }
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(ultra => 
        ultra.title.toLowerCase().includes(query) || 
        ultra.location.toLowerCase().includes(query) ||
        ultra.terrain.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'date-desc':
        result.sort((a, b) => b.date - a.date);
        break;
      case 'date-asc':
        result.sort((a, b) => a.date - b.date);
        break;
      case 'distance-desc':
        result.sort((a, b) => b.distance - a.distance);
        break;
      case 'distance-asc':
        result.sort((a, b) => a.distance - b.distance);
        break;
      case 'name-asc':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    setFilteredUltras(result);
  }, [ultras, filterYear, filterDistance, sortBy, searchQuery]);

  // Format time from hours to readable format
  const formatTime = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    
    if (hours >= 24) {
      const days = Math.floor(hours / 24);
      const remainingHours = hours % 24;
      return `${days}d ${remainingHours}h ${minutes}m`;
    }
    
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-center mb-2">Ultramarathons</h1>
        <p className="text-center text-gray-600 mb-8">Races beyond the marathon distance</p>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-soft p-4 mb-8">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <input 
                type="text" 
                id="search"
                placeholder="Search by name, location or terrain..." 
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="w-full sm:w-auto">
              <label htmlFor="year-filter" className="block text-sm font-medium text-gray-700 mb-1">Year</label>
              <select 
                id="year-filter"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
              >
                <option value="all">All Years</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            
            <div className="w-full sm:w-auto">
              <label htmlFor="distance-filter" className="block text-sm font-medium text-gray-700 mb-1">Distance</label>
              <select 
                id="distance-filter"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filterDistance}
                onChange={(e) => setFilterDistance(e.target.value)}
              >
                {distanceCategories.map(category => (
                  <option key={category.value} value={category.value}>{category.label}</option>
                ))}
              </select>
            </div>
            
            <div className="w-full sm:w-auto">
              <label htmlFor="sort-by" className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
              <select 
                id="sort-by"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="date-desc">Date (Newest First)</option>
                <option value="date-asc">Date (Oldest First)</option>
                <option value="distance-desc">Distance (Longest First)</option>
                <option value="distance-asc">Distance (Shortest First)</option>
                <option value="name-asc">Name (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-gray-600 mb-6">Showing {filteredUltras.length} ultramarathons</p>

        {/* Race Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUltras.map(ultra => (
            <Link 
              to={`/race/${ultra.id}`} 
              key={ultra.id}
              className="bg-white rounded-lg shadow-soft overflow-hidden hover:shadow-lg transition-all duration-300 race-card"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={ultra.image || PLACEHOLDER_IMAGE} 
                  alt={ultra.title} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = PLACEHOLDER_IMAGE;
                  }}
                />
                {ultra.highlight && (
                  <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 text-sm font-bold">
                    Highlight
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-bold text-gray-800 mb-1">{ultra.title}</h2>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full whitespace-nowrap">
                    {formatTime(ultra.time)}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-600 text-sm">{ultra.location}</p>
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full whitespace-nowrap">
                    {ultra.distance}km
                  </span>
                </div>
                <p className="text-gray-500 text-sm mb-1">{ultra.date.toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</p>
                <p className="text-xs text-gray-500 mb-3">
                  <i className="fas fa-mountain mr-1"></i> {ultra.elevationGain}m D+ | {ultra.terrain}
                </p>
                <p className="text-gray-700 mb-4 line-clamp-2">{ultra.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Position: {ultra.position}</span>
                  <span className="text-blue-600 font-medium text-sm flex items-center">
                    View details
                    <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredUltras.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No ultramarathons found matching your criteria.</p>
            <button 
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              onClick={() => {
                setFilterYear('all');
                setFilterDistance('all');
                setSortBy('date-desc');
                setSearchQuery('');
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Ultramarathons;