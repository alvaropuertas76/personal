import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Importar constante de imagen placeholder
import { PLACEHOLDER_IMAGE } from '../utils/constants';

function NextChallenges() {
  const [activeTab, setActiveTab] = useState("upcoming");
  
  // Sample upcoming challenges
  const upcomingRaces = [
    {
      id: "bilbao-marathon-2024",
      title: "Marathon de Bilbao",
      date: "October 15, 2024",
      location: "Bilbao, Spain",
      distance: "42.2 km",
      description: "A scenic marathon through the beautiful Basque city, featuring the iconic Guggenheim Museum and riverside views.",
      status: "registered",
      image: "./assets/images/bilbao.jpeg"
    },
    {
      id: "zaragoza-marathon-2024",
      title: "Marathon de Zaragoza",
      date: "November 22, 2024",
      location: "Zaragoza, Spain",
      distance: "42.2 km",
      description: "Fast and flat course through historic Zaragoza, perfect for setting a personal record.",
      status: "planned",
      image: "./assets/images/zaragoza.jpg"
    },
    {
      id: "atacama-crossing-2025",
      title: "Atacama Crossing",
      date: "March 2-8, 2025",
      location: "Atacama Desert, Chile",
      distance: "250 km",
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
      description: "One of Eastern Europe's best marathons through the historic streets of Poland's capital.",
      status: "planned",
      image: "/assets/images/warsaw.jpg"
    },
    {
      id: "desertica-2025",
      title: "La Desertica",
      date: "October 11, 2025",
      location: "Almeria, Spain",
      distance: "71 km",
      description: "A challenging ultra trail race through the desert landscape of southern Spain.",
      status: "planned",
      image: "/assets/images/desertica.jpg"
    }
  ];
  
  // Sample training targets
  const trainingTargets = [
    {
      title: "Weekly Mileage Goal",
      current: 65,
      target: 80,
      unit: "km",
      percentage: 81
    },
    {
      title: "Long Run Distance",
      current: 28,
      target: 35,
      unit: "km",
      percentage: 80
    },
    {
      title: "Weekly Elevation",
      current: 800,
      target: 1200,
      unit: "m",
      percentage: 67
    },
    {
      title: "Tempo Run Pace",
      current: "4:30",
      target: "4:15",
      unit: "min/km",
      percentage: 88
    }
  ];
  
  // Sample race wish list
  const wishlist = [
    {
      title: "UTMB",
      location: "Chamonix, France",
      type: "Mountain Ultramarathon",
      distance: "170 km",
      difficulty: "Extreme",
      image: "/assets/images/utmb.jpg"
    },
    {
      title: "Badwater 135",
      location: "Death Valley, USA",
      type: "Extreme Ultramarathon",
      distance: "217 km",
      difficulty: "Extreme",
      image: "/assets/images/badwater.jpg"
    },
    {
      title: "Western States 100",
      location: "California, USA",
      type: "Mountain Ultramarathon",
      distance: "100 miles",
      difficulty: "Hard",
      image: "/assets/images/western-states.jpg"
    },
    {
      title: "Spartathlon",
      location: "Greece",
      type: "Road Ultramarathon",
      distance: "246 km",
      difficulty: "Extreme",
      image: "/assets/images/spartathlon.jpg"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Next Challenges</h1>
      <p className="text-gray-600 mb-8">Upcoming races, training goals, and future aspirations</p>
      
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8">
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "upcoming" 
                ? "border-blue-500 text-blue-600" 
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
            onClick={() => setActiveTab("upcoming")}
          >
            Upcoming Races
          </button>
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "training" 
                ? "border-blue-500 text-blue-600" 
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
            onClick={() => setActiveTab("training")}
          >
            Training Targets
          </button>
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "wishlist" 
                ? "border-blue-500 text-blue-600" 
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
            onClick={() => setActiveTab("wishlist")}
          >
            Race Wishlist
          </button>
        </nav>
      </div>
      
      {/* Upcoming Races Tab */}
      {activeTab === "upcoming" && (
        <div className="animate-fade-in">
          <div className="mb-8 bg-blue-50 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-3">2024-2025 Race Schedule</h2>
            <p className="text-gray-600">
              My focus for the upcoming year is building endurance and speed for both road marathons and trail ultras, 
              with the Atacama Crossing as my primary target event in early 2025.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingRaces.map(race => (
              <div key={race.id} className="race-card bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={race.image} 
                    alt={race.title} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = PLACEHOLDER_IMAGE;
                    }}
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
        </div>
      )}
      
      {/* Training Targets Tab */}
      {activeTab === "training" && (
        <div className="animate-fade-in">
          <div className="mb-8 bg-blue-50 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-3">Current Training Phase</h2>
            <p className="text-gray-600">
              Base building phase for Atacama Crossing, focusing on increasing weekly mileage, 
              back-to-back long runs, and heat acclimatization training.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trainingTargets.map((target, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-semibold text-lg mb-3">{target.title}</h3>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-700">
                    Currently: {target.current} {target.unit}
                  </span>
                  <span className="text-sm text-gray-700">
                    Target: {target.target} {target.unit}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${target.percentage}%` }}
                  ></div>
                </div>
                <div className="mt-2 text-right text-sm text-gray-600">
                  {target.percentage}% of goal
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h3 className="font-semibold text-lg mb-4">Weekly Training Schedule</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Morning</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Evening</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="py-4 px-4 text-sm font-medium text-gray-900">Monday</td>
                    <td className="py-4 px-4 text-sm text-gray-500">Recovery Run (8km)</td>
                    <td className="py-4 px-4 text-sm text-gray-500">Strength Training</td>
                    <td className="py-4 px-4 text-sm text-gray-500">Easy pace, focus on form</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-sm font-medium text-gray-900">Tuesday</td>
                    <td className="py-4 px-4 text-sm text-gray-500">Tempo Run (12km)</td>
                    <td className="py-4 px-4 text-sm text-gray-500">Core Work</td>
                    <td className="py-4 px-4 text-sm text-gray-500">Include hills</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-sm font-medium text-gray-900">Wednesday</td>
                    <td className="py-4 px-4 text-sm text-gray-500">Easy Run (10km)</td>
                    <td className="py-4 px-4 text-sm text-gray-500">Yoga</td>
                    <td className="py-4 px-4 text-sm text-gray-500">Recovery focused</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-sm font-medium text-gray-900">Thursday</td>
                    <td className="py-4 px-4 text-sm text-gray-500">Interval Training (8km)</td>
                    <td className="py-4 px-4 text-sm text-gray-500">Strength Training</td>
                    <td className="py-4 px-4 text-sm text-gray-500">Track session</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-sm font-medium text-gray-900">Friday</td>
                    <td className="py-4 px-4 text-sm text-gray-500">Rest or Cross-Training</td>
                    <td className="py-4 px-4 text-sm text-gray-500">Mobility Work</td>
                    <td className="py-4 px-4 text-sm text-gray-500">Active recovery</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-sm font-medium text-gray-900">Saturday</td>
                    <td className="py-4 px-4 text-sm text-gray-500">Long Run (28-32km)</td>
                    <td className="py-4 px-4 text-sm text-gray-500">-</td>
                    <td className="py-4 px-4 text-sm text-gray-500">Trail routes with elevation</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-sm font-medium text-gray-900">Sunday</td>
                    <td className="py-4 px-4 text-sm text-gray-500">Medium Long Run (15-18km)</td>
                    <td className="py-4 px-4 text-sm text-gray-500">Recovery Stretch</td>
                    <td className="py-4 px-4 text-sm text-gray-500">Back-to-back with Saturday</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      
      {/* Race Wishlist Tab */}
      {activeTab === "wishlist" && (
        <div className="animate-fade-in">
          <div className="mb-8 bg-blue-50 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-3">Race Bucket List</h2>
            <p className="text-gray-600">
              These are the iconic races that represent my long-term goals and aspirations in endurance sports.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {wishlist.map((race, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={race.image} 
                    alt={race.title} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = PLACEHOLDER_IMAGE;
                    }}
                  />
                  <div className="absolute top-0 right-0 m-3">
                    <span className="bg-black bg-opacity-75 text-white px-3 py-1 rounded-full text-xs">
                      Bucket List
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{race.title}</h3>
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <i className="fas fa-map-marker-alt w-4 mr-1"></i>
                      <span>{race.location}</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-running w-4 mr-1"></i>
                      <span>{race.type}</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-route w-4 mr-1"></i>
                      <span>{race.distance}</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-mountain w-4 mr-1"></i>
                      <span>Difficulty: {race.difficulty}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Create Challenge CTA */}
      <div className="mt-12 text-center">
        <Link 
          to="/template" 
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
        >
          <i className="fas fa-plus-circle mr-2"></i>
          Create New Race Challenge
        </Link>
      </div>
    </div>
  );
}

export default NextChallenges;