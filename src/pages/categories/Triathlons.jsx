import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Triathlons() {
  const [filter, setFilter] = useState("all");
  const [sorting, setSorting] = useState("date-desc");
  
  // Triathlon race data (would come from API/JSON file in a real app)
  const triathlons = [
    {
      id: "can-picafort-2014",
      title: "Triatlón Can Picafort",
      date: "August 7, 2014",
      location: "Can Picafort, Mallorca, Spain",
      distance: "Sprint",
      finishTime: "1:15:22",
      image: "/assets/images/can-picafort.jpg"
    },
    {
      id: "palma-2014",
      title: "Triatlón Olímpico de Palma",
      date: "September 4, 2014",
      location: "Palma, Mallorca, Spain",
      distance: "Olympic",
      finishTime: "2:14:46",
      image: "/assets/images/palma-triathlon-2014.jpg"
    },
    {
      id: "swim-run-alcudia-2014",
      title: "SWIM - RUN Alcudia",
      date: "September 10, 2014",
      location: "Alcudia, Mallorca, Spain",
      distance: "Swim-Run",
      finishTime: "2:18:29",
      image: "/assets/images/swimrun-alcudia.jpg"
    },
    {
      id: "menorca-2014",
      title: "Medio Ironman Menorca",
      date: "September 18, 2014",
      location: "Menorca, Spain",
      distance: "70.3",
      finishTime: "5:12:57",
      image: "/assets/images/ironman-menorca.jpg"
    },
    {
      id: "sa-pobla-2016",
      title: "Duatlón de Sa Pobla",
      date: "December 4, 2016",
      location: "Sa Pobla, Mallorca, Spain",
      distance: "Sprint Duathlon",
      finishTime: "1:20:39",
      image: "/assets/images/sa-pobla-duathlon.jpg"
    },
    {
      id: "powerman-mallorca-2018",
      title: "PowerMan Mallorca",
      date: "February 17, 2018",
      location: "Mallorca, Spain",
      distance: "5-30-5",
      finishTime: "1:36:11",
      image: "/assets/images/powerman-mallorca.jpg"
    },
    {
      id: "mallorca-olympic-2018",
      title: "Mallorca Olympic Triatlón",
      date: "May 5, 2018",
      location: "Mallorca, Spain",
      distance: "Olympic",
      finishTime: "2:21:30",
      image: "/assets/images/mallorca-olympic.jpg"
    },
    {
      id: "ironman-frankfurt-2018",
      title: "Ironman Frankfurt",
      date: "July 8, 2018",
      location: "Frankfurt, Germany",
      distance: "Full Ironman",
      finishTime: "12:28:36",
      image: "/assets/images/ironman-frankfurt.jpg"
    },
    {
      id: "total-tri-mallorca-2019",
      title: "Total Tri Mallorca",
      date: "June 2, 2019",
      location: "Mallorca, Spain",
      distance: "Olympic",
      finishTime: "2:35:56",
      image: "/assets/images/total-tri-mallorca.jpg"
    },
    {
      id: "sprint-andratx-2019",
      title: "Triatlón Sprint Andratx",
      date: "June 16, 2019",
      location: "Andratx, Mallorca, Spain",
      distance: "Sprint",
      finishTime: "DNF",
      image: "/assets/images/sprint-andratx.jpg"
    },
    {
      id: "ironman-marbella-2023",
      title: "Ironman Marbella 70.3",
      date: "May 7, 2023",
      location: "Marbella, Spain",
      distance: "70.3",
      finishTime: "6:01:29",
      swimTime: "37:00",
      bikeTime: "3:19:00",
      runTime: "1:54:00",
      image: "/assets/images/marbella-703.jpg"
    }
  ];
  
  // Filter and sort the races
  const filteredTriathlons = triathlons.filter(triathlon => {
    if (filter === "all") return true;
    
    const year = typeof triathlon.date === 'string' ? 
      triathlon.date.split(',')[0].split(' ').pop() : 
      triathlon.date.toString();
      
    return year === filter;
  });
  
  const sortedTriathlons = [...filteredTriathlons].sort((a, b) => {
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
  const years = [...new Set(triathlons.map(triathlon => {
    return typeof triathlon.date === 'string' ? 
      triathlon.date.split(',')[0].split(' ').pop() : 
      triathlon.date.toString();
  }))].sort((a, b) => b.localeCompare(a)); // Sort years descending
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Triathlons</h1>
          <p className="text-gray-600">From sprints to full Ironman distance races</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link 
            to="/template" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
          >
            <i className="fas fa-plus-circle mr-2"></i>
            Add New Triathlon
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
      
      {/* Triathlons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedTriathlons.map(triathlon => (
          <Link 
            key={triathlon.id} 
            to={`/race/${triathlon.id}`}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow race-card"
          >
            <div className="h-48 overflow-hidden relative">
              <img 
                src={triathlon.image} 
                alt={triathlon.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-4">
                <h3 className="text-lg font-semibold">{triathlon.title}</h3>
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1 text-sm">
                  <div className="flex items-center text-gray-600">
                    <i className="far fa-calendar-alt w-4 mr-1"></i>
                    <span>{triathlon.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <i className="fas fa-map-marker-alt w-4 mr-1"></i>
                    <span>{triathlon.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <i className="fas fa-trophy w-4 mr-1"></i>
                    <span>{triathlon.distance}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <i className="fas fa-stopwatch w-4 mr-1"></i>
                    <span>Finish time: {triathlon.finishTime}</span>
                  </div>
                  {triathlon.swimTime && (
                    <div className="flex items-center text-gray-600 text-xs">
                      <i className="fas fa-swimmer w-4 mr-1"></i>
                      <span>Swim: {triathlon.swimTime}</span>
                      <i className="fas fa-bicycle w-4 mx-1"></i>
                      <span>Bike: {triathlon.bikeTime}</span>
                      <i className="fas fa-running w-4 mx-1"></i>
                      <span>Run: {triathlon.runTime}</span>
                    </div>
                  )}
                </div>
                <div className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full">
                  Triathlon
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {sortedTriathlons.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <i className="fas fa-swimmer text-gray-300 text-5xl mb-4"></i>
          <p className="text-gray-500 text-lg">No triathlons found with the selected filter.</p>
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

export default Triathlons;