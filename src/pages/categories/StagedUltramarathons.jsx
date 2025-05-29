import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function StagedUltramarathons() {
  const [filter, setFilter] = useState("all");
  const [sorting, setSorting] = useState("date-desc");
  
  // Staged ultramarathon race data (would come from API/JSON file in a real app)
  const stagedUltras = [
    {
      id: "menorca-camidecavals-2013",
      title: "Ultra Trail Menorca (Cami de Cavals)",
      date: "May 17-18, 2013",
      location: "Menorca, Spain",
      distance: "185km",
      stages: "DNF at 53km",
      finishTime: "DNF",
      image: "/assets/images/menorca-camidecavals.jpg"
    },
    {
      id: "menorca-camidecavals-2014",
      title: "Ultra Trail Menorca Cami de Cavalls",
      date: "May 17-18, 2014",
      location: "Menorca, Spain",
      distance: "185km",
      stages: "1 stage",
      finishTime: "34:40:00",
      image: "/assets/images/menorca-camidecavals-2014.jpg"
    },
    {
      id: "canal-castilla-2015",
      title: "Canal de Castilla Ultra Race",
      date: "October 3-4, 2015",
      location: "Palencia - Alar del Rey, Spain",
      distance: "107km",
      stages: "1 stage",
      finishTime: "13:01:34",
      image: "/assets/images/canal-castilla.jpg"
    },
    {
      id: "fire-ice-ultra-2018",
      title: "Fire and Ice Ultra",
      date: "August 27 - September 1, 2018",
      location: "Iceland",
      distance: "250km",
      stages: "6 stages",
      finishTime: "29:21:53",
      image: "/assets/images/fire-and-ice.jpg"
    },
    {
      id: "costa-brava-extreme-2019",
      title: "Costa Brava Extreme Run",
      date: "May 3-5, 2019",
      location: "Costa Brava, Spain",
      distance: "125km",
      stages: "3 stages",
      finishTime: "20:30:23",
      image: "/assets/images/costa-brava.jpg"
    },
    {
      id: "polar-circle-challenge-2019",
      title: "Polar Circle Marathon (Polar Bear Challenge)",
      date: "October 26-27, 2019",
      location: "Kangerlussuaq, Greenland",
      distance: "63.3km",
      stages: "2 stages",
      finishTime: "Combined time",
      image: "/assets/images/polar-circle.jpg"
    },
    {
      id: "mds-2022",
      title: "Marathon des Sables",
      date: "March 25, 2022",
      location: "Sahara Desert, Morocco",
      distance: "250km",
      stages: "6 stages",
      finishTime: "45 hours",
      image: "/assets/images/mds.jpg"
    },
    {
      id: "global-limits-cambodia-2022",
      title: "Global Limits Cambodia",
      date: "November 24, 2022",
      location: "Cambodia",
      distance: "220km",
      stages: "6 stages",
      finishTime: "DNF fifth stage CP1",
      image: "/assets/images/cambodia.jpg"
    }
  ];
  
  // Filter and sort the races
  const filteredStagedUltras = stagedUltras.filter(ultra => {
    if (filter === "all") return true;
    
    const year = typeof ultra.date === 'string' ? 
      ultra.date.split(',')[0].split(' ').pop() : 
      ultra.date.toString();
      
    return year === filter;
  });
  
  const sortedStagedUltras = [...filteredStagedUltras].sort((a, b) => {
    if (sorting === "title") {
      return a.title.localeCompare(b.title);
    } else if (sorting === "date-asc") {
      return a.date.toString().localeCompare(b.date.toString());
    } else {
      // Default: date-desc
      return b.date.toString().localeCompare(a.date.toString());
    }
  });
  
  // Get unique years for filter
  const years = [...new Set(stagedUltras.map(ultra => {
    return typeof ultra.date === 'string' ? 
      ultra.date.split(',')[0].split(' ').pop() : 
      ultra.date.toString();
  }))].sort((a, b) => b.localeCompare(a)); // Sort years descending
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Staged Ultramarathons</h1>
          <p className="text-gray-600">Multi-day ultra adventures around the world</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link 
            to="/template" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
          >
            <i className="fas fa-plus-circle mr-2"></i>
            Add New Staged Ultra
          </Link>
        </div>
      </div>
      
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <label htmlFor="year-filter" className="mr-2 text-sm font-medium text-gray-700">Filter by year:</label>
            <select 
              id="year-filter"
              className="border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Years</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="sort-by" className="mr-2 text-sm font-medium text-gray-700">Sort by:</label>
            <select 
              id="sort-by"
              className="border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={sorting}
              onChange={(e) => setSorting(e.target.value)}
            >
              <option value="date-desc">Date (Newest First)</option>
              <option value="date-asc">Date (Oldest First)</option>
              <option value="title">Name (A-Z)</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Staged Ultras Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedStagedUltras.map(ultra => (
          <Link 
            key={ultra.id} 
            to={`/race/${ultra.id}`}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow race-card"
          >
            <div className="h-48 overflow-hidden relative">
              <img 
                src={ultra.image} 
                alt={ultra.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-4">
                <h3 className="text-lg font-semibold">{ultra.title}</h3>
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1 text-sm">
                  <div className="flex items-center text-gray-600">
                    <i className="far fa-calendar-alt w-4 mr-1"></i>
                    <span>{ultra.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <i className="fas fa-map-marker-alt w-4 mr-1"></i>
                    <span>{ultra.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <i className="fas fa-route w-4 mr-1"></i>
                    <span>{ultra.distance}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <i className="fas fa-layer-group w-4 mr-1"></i>
                    <span>{ultra.stages}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <i className="fas fa-stopwatch w-4 mr-1"></i>
                    <span>{ultra.finishTime}</span>
                  </div>
                </div>
                <div className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                  Staged Ultra
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {sortedStagedUltras.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <i className="fas fa-campground text-gray-300 text-5xl mb-4"></i>
          <p className="text-gray-500 text-lg">No staged ultramarathons found with the selected filter.</p>
          <button 
            onClick={() => setFilter("all")} 
            className="mt-4 text-blue-600 hover:text-blue-800"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}

export default StagedUltramarathons;