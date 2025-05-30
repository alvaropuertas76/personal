import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function FutureProjects() {
  const [filter, setFilter] = useState("all");
  
  // Future planned races (would come from API/JSON file in a real app)
  const futureRaces = [
    {
      id: "bilbao-marathon-2024",
      title: "Marathon de Bilbao",
      date: "October 15, 2024",
      location: "Bilbao, Spain",
      distance: "42.2 km",
      category: "marathon",
      description: "A scenic marathon through the beautiful Basque city, featuring the iconic Guggenheim Museum and riverside views.",
      status: "registered",
      image: "./assets/images/bilbao.jpg"
    },
    {
      id: "zaragoza-marathon-2024",
      title: "Marathon de Zaragoza",
      date: "November 22, 2024",
      location: "Zaragoza, Spain",
      distance: "42.2 km",
      category: "marathon",
      description: "Fast and flat course through historic Zaragoza, perfect for setting a personal record.",
      status: "planned",
      image: "./assets/images/zaragoza.jpg"
    },
    {
      id: "javelina-jundred-2024",
      title: "Javelina Jundred 100 Miles",
      date: "October 26, 2024",
      location: "Arizona, USA",
      distance: "100 miles (160.9 km)",
      category: "ultra",
      description: "A premier desert ultra in the McDowell Mountain Regional Park. Famous for its festive Halloween atmosphere and relatively non-technical desert terrain.",
      status: "planned",
      image: "./assets/images/javelina.jpg"
    },
    {
      id: "atacama-crossing-2025",
      title: "Atacama Crossing",
      date: "March 2-8, 2025",
      location: "Atacama Desert, Chile",
      distance: "250 km",
      category: "staged-ultra",
      description: "A 7-day, 6-stage, 250 km race across the driest desert on Earth. Self-supported race in extreme conditions.",
      status: "training",
      image: "./assets/images/atacama.jpg"
    },
    {
      id: "warsaw-marathon-2025",
      title: "Warsaw Marathon",
      date: "September 28, 2025",
      location: "Warsaw, Poland",
      distance: "42.2 km",
      category: "marathon",
      description: "One of Eastern Europe's best marathons through the historic streets of Poland's capital.",
      status: "planned",
      image: "./assets/images/warsaw.jpg"
    },
    {
      id: "desertica-2025",
      title: "La Desertica",
      date: "October 11, 2025",
      location: "Almeria, Spain",
      distance: "71 km",
      category: "ultra",
      description: "A challenging ultra trail race through the desert landscape of southern Spain.",
      status: "planned",
      image: "./assets/images/desertica.jpg"
    }
  ];
  
  // Filtered races based on category
  const filteredRaces = futureRaces.filter(race => {
    if (filter === "all") return true;
    return race.category === filter;
  });
  
  // Categories for filter buttons
  const categories = [
    { id: "all", name: "All Categories" },
    { id: "marathon", name: "Marathons" },
    { id: "ultra", name: "Ultramarathons" },
    { id: "staged-ultra", name: "Staged Ultras" },
    { id: "triathlon", name: "Triathlons" }
  ];
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Future Projects</h1>
          <p className="text-gray-600">Upcoming races and challenges I'm preparing for</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link 
            to="/template" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
          >
            <i className="fas fa-plus-circle mr-2"></i>
            Add New Project
          </Link>
        </div>
      </div>
      
      {/* Category Filter Pills */}
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map(category => (
          <button 
            key={category.id}
            onClick={() => setFilter(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === category.id 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      {/* Future Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRaces.map(race => (
          <div key={race.id} className="race-card bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
            <div className="h-48 overflow-hidden">
              <img 
                src={race.image} 
                alt={race.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 flex-grow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold">{race.title}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  race.status === "registered" 
                    ? "bg-green-100 text-green-800" 
                    : race.status === "training" 
                    ? "bg-yellow-100 text-yellow-800" 
                    : "bg-blue-100 text-blue-800"
                }`}>
                  {race.status === "registered" ? "Registered" : 
                  race.status === "training" ? "Training" : "Planned"}
                </span>
              </div>
              <div className="mb-4 space-y-1 text-sm text-gray-600">
                <div className="flex items-center">
                  <i className="far fa-calendar-alt w-4 mr-1"></i>
                  <span>{race.date}</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-map-marker-alt w-4 mr-1"></i>
                  <span>{race.location}</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-route w-4 mr-1"></i>
                  <span>{race.distance}</span>
                </div>
              </div>
              <p className="text-gray-700 mb-4 text-sm line-clamp-3">{race.description}</p>
            </div>
            <div className="p-4 pt-0 mt-auto">
              <Link 
                to={`/template`} 
                className="inline-block w-full text-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                View Race Details
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      {/* Race Wishlist Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Race Bucket List</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
            <div className="h-48 overflow-hidden">
              <img 
                src="./assets/images/utmb.jpg" 
                alt="UTMB" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold">UTMB</h3>
                <span className="bg-black bg-opacity-75 text-white px-3 py-1 rounded-full text-xs">
                  Dream Race
                </span>
              </div>
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <i className="fas fa-map-marker-alt w-4 mr-1"></i>
                  <span>Chamonix, France</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-running w-4 mr-1"></i>
                  <span>Mountain Ultramarathon</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-route w-4 mr-1"></i>
                  <span>170 km</span>
                </div>
              </div>
              <p className="text-gray-700 text-sm">The crown jewel of trail ultrarunning, circumnavigating Mont Blanc through France, Italy, and Switzerland.</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
            <div className="h-48 overflow-hidden">
              <img 
                src="./assets/images/badwater.jpg" 
                alt="Badwater 135" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold">Badwater 135</h3>
                <span className="bg-black bg-opacity-75 text-white px-3 py-1 rounded-full text-xs">
                  Dream Race
                </span>
              </div>
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <i className="fas fa-map-marker-alt w-4 mr-1"></i>
                  <span>Death Valley, USA</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-running w-4 mr-1"></i>
                  <span>Extreme Ultramarathon</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-route w-4 mr-1"></i>
                  <span>217 km</span>
                </div>
              </div>
              <p className="text-gray-700 text-sm">Known as "the world's toughest foot race," covering 135 miles from Death Valley to Mt. Whitney Portal in extreme heat.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Training Plans Section */}
      <div className="mt-12 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Current Training Focus</h2>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3">Atacama Crossing Preparation</h3>
          <p className="text-gray-700 mb-4">
            My current training is focused on building the endurance and resilience needed for
            the extreme conditions of the Atacama Desert. This includes heat acclimation training,
            back-to-back long runs, and carrying a weighted pack to simulate race conditions.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Physical Preparation</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                <li>Weekly mileage: 70-90km</li>
                <li>Back-to-back weekend long runs</li>
                <li>Heat training chamber sessions</li>
                <li>Weighted pack training</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Equipment Testing</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                <li>Desert-specific footwear</li>
                <li>Sand gaiters optimization</li>
                <li>Heat management clothing</li>
                <li>Lightweight sleeping systems</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Nutrition Strategy</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                <li>Calorie-dense food selection</li>
                <li>Electrolyte balance testing</li>
                <li>Heat-stable food options</li>
                <li>Minimum weight optimization</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FutureProjects;