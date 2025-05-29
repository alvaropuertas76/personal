import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PLACEHOLDER_IMAGE } from '../../utils/constants';

function Marathons() {
  const [marathons, setMarathons] = useState([]);
  const [filteredMarathons, setFilteredMarathons] = useState([]);
  const [sortBy, setSortBy] = useState('date-desc');
  const [filterYear, setFilterYear] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [years, setYears] = useState([]);

  // Sample data for marathons - in a real app, this would come from an API
  useEffect(() => {
    const marathonData = [
      {
        id: 'berlin-2022',
        title: 'Berlin Marathon',
        date: new Date('2022-09-25'),
        location: 'Berlin, Germany',
        distance: 42.2,
        time: '3:12:45',
        description: 'One of the World Marathon Majors, fast and flat course through historic Berlin.',
        image: '/assets/images/berlin-marathon.jpg',
        highlight: true,
        year: 2022,
        position: '1,245th / 45,000',
      },
      {
        id: 'london-2021',
        title: 'London Marathon',
        date: new Date('2021-10-03'),
        location: 'London, UK',
        distance: 42.2,
        time: '3:15:30',
        description: 'Iconic race through the streets of London passing many famous landmarks.',
        image: '/assets/images/london-marathon.jpg',
        highlight: true,
        year: 2021,
        position: '1,876th / 40,000',
      },
      {
        id: 'boston-2023',
        title: 'Boston Marathon',
        date: new Date('2023-04-17'),
        location: 'Boston, USA',
        distance: 42.2,
        time: '3:22:18',
        description: 'The oldest annual marathon with the famous Heartbreak Hill.',
        image: '/assets/images/boston-marathon.jpg',
        highlight: true,
        year: 2023,
        position: '2,132nd / 30,000',
      },
      {
        id: 'chicago-2022',
        title: 'Chicago Marathon',
        date: new Date('2022-10-09'),
        location: 'Chicago, USA',
        distance: 42.2,
        time: '3:18:42',
        description: 'Fast, flat course through the vibrant city of Chicago.',
        image: '/assets/images/chicago-marathon.jpg',
        highlight: false,
        year: 2022,
        position: '1,954th / 35,000',
      },
      {
        id: 'valencia-2021',
        title: 'Valencia Marathon',
        date: new Date('2021-12-05'),
        location: 'Valencia, Spain',
        distance: 42.2,
        time: '3:09:27',
        description: 'One of the fastest marathon courses with wonderful crowd support.',
        image: '/assets/images/valencia-marathon.jpg',
        highlight: false,
        year: 2021,
        position: '1,256th / 25,000',
      },
      {
        id: 'tokyo-2023',
        title: 'Tokyo Marathon',
        date: new Date('2023-03-05'),
        location: 'Tokyo, Japan',
        distance: 42.2,
        time: '3:24:55',
        description: 'A journey through Tokyo\'s modern urban landscape.',
        image: '/assets/images/tokyo-marathon.jpg',
        highlight: false,
        year: 2023,
        position: '2,567th / 38,000',
      },
      {
        id: 'paris-2022',
        title: 'Paris Marathon',
        date: new Date('2022-04-03'),
        location: 'Paris, France',
        distance: 42.2,
        time: '3:19:21',
        description: 'Beautiful course through the streets of Paris.',
        image: '/assets/images/paris-marathon.jpg',
        highlight: false,
        year: 2022,
        position: '2,105th / 47,000',
      },
      {
        id: 'madrid-2021',
        title: 'Madrid Marathon',
        date: new Date('2021-09-26'),
        location: 'Madrid, Spain',
        distance: 42.2,
        time: '3:28:16',
        description: 'Challenging course with significant elevation through the Spanish capital.',
        image: '/assets/images/madrid-marathon.jpg',
        highlight: false,
        year: 2021,
        position: '876th / 15,000',
      },
    ];

    setMarathons(marathonData);
    setFilteredMarathons(marathonData);

    // Extract unique years for the filter
    const uniqueYears = [...new Set(marathonData.map(m => m.year))].sort().reverse();
    setYears(uniqueYears);
  }, []);

  // Apply filters and sorting when criteria change
  useEffect(() => {
    let result = [...marathons];

    // Apply year filter
    if (filterYear !== 'all') {
      result = result.filter(marathon => marathon.year === parseInt(filterYear));
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(marathon => 
        marathon.title.toLowerCase().includes(query) || 
        marathon.location.toLowerCase().includes(query)
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
      case 'time-fast':
        result.sort((a, b) => {
          const aTime = a.time.split(':').reduce((acc, time, i) => acc + parseInt(time) * Math.pow(60, 2 - i), 0);
          const bTime = b.time.split(':').reduce((acc, time, i) => acc + parseInt(time) * Math.pow(60, 2 - i), 0);
          return aTime - bTime;
        });
        break;
      case 'name-asc':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    setFilteredMarathons(result);
  }, [marathons, filterYear, sortBy, searchQuery]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-center mb-2">Marathon Races</h1>
        <p className="text-center text-gray-600 mb-8">Classic 42.2km races from around the world</p>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-soft p-4 mb-8">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <input 
                type="text" 
                id="search"
                placeholder="Search by name or location..." 
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
              <label htmlFor="sort-by" className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
              <select 
                id="sort-by"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="date-desc">Date (Newest First)</option>
                <option value="date-asc">Date (Oldest First)</option>
                <option value="time-fast">Finish Time (Fastest First)</option>
                <option value="name-asc">Name (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-gray-600 mb-6">Showing {filteredMarathons.length} marathons</p>

        {/* Race Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMarathons.map(marathon => (
            <Link 
              to={`/race/${marathon.id}`} 
              key={marathon.id}
              className="bg-white rounded-lg shadow-soft overflow-hidden hover:shadow-lg transition-all duration-300 race-card"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={marathon.image || PLACEHOLDER_IMAGE} 
                  alt={marathon.title} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = PLACEHOLDER_IMAGE;
                  }}
                />
                {marathon.highlight && (
                  <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 text-sm font-bold">
                    Highlight
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-bold text-gray-800">{marathon.title}</h2>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {marathon.time}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-2">{marathon.location}</p>
                <p className="text-gray-500 text-sm mb-4">{marathon.date.toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</p>
                <p className="text-gray-700 mb-4 line-clamp-2">{marathon.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Position: {marathon.position}</span>
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

        {filteredMarathons.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No marathons found matching your criteria.</p>
            <button 
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              onClick={() => {
                setFilterYear('all');
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

export default Marathons;