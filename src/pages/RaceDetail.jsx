import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PLACEHOLDER_IMAGE, MAPS_CONFIG } from '../utils/constants';
import MapSection from '../components/MapSection';
import raceData from '../data/raceData';

function RaceDetail() {  
  const { id } = useParams();
  const [race, setRace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // In a real app, this would fetch from an API
  useEffect(() => {
    setLoading(true);
    
    // Simulating API call to get race details
    setTimeout(() => {
      // Find race data based on ID
      const raceDetails = raceData.find(race => race.id === id) || null;
      setRace(raceDetails);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-blue-600">Loading race details...</span>
      </div>
    );
  }

  if (!race) {
    return (
      <div className="bg-gray-50 min-h-screen py-12 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Race Not Found</h1>
          <p className="text-gray-600 mb-8">We couldn't find the race you're looking for.</p>
          <Link 
            to="/marathons" 
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Races
          </Link>
        </div>
      </div>
    );
  }

  // Format finish time with proper labels
  const formatTime = (timeString) => {
    const parts = timeString.split(':').map(Number);
    if (parts.length === 3) {
      const [hours, minutes, seconds] = parts;
      if (hours >= 24) {
        const days = Math.floor(hours / 24);
        const remainingHours = hours % 24;
        return `${days}d ${remainingHours}h ${minutes}m ${seconds}s`;
      }
      return `${hours}h ${minutes}m ${seconds}s`;
    }
    return timeString;
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="relative h-80 bg-gray-900 overflow-hidden">
        <img 
          src={race.headerImage || race.image || PLACEHOLDER_IMAGE} 
          alt={race.title} 
          className="absolute inset-0 w-full h-full object-cover opacity-70"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = PLACEHOLDER_IMAGE;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
        <div className="container mx-auto relative h-full flex items-end z-10 px-4 pb-8">
          <div>
            <div className="flex items-center mb-2">
              <span className="px-3 py-1 bg-blue-600 text-white text-sm font-bold rounded-full mr-2">
                {race.category}
              </span>
              <span className="text-white text-sm">
                {new Date(race.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">{race.title}</h1>
            <p className="text-white text-xl">{race.location}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="bg-white rounded-lg shadow-md p-6 -mt-10 mb-8 relative z-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {race.distance}<span className="text-lg">km</span>
              </div>
              <div className="text-sm text-gray-600">Distance</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {race.elevationGain ? `${race.elevationGain}m` : 'N/A'}
              </div>
              <div className="text-sm text-gray-600">Elevation Gain</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {formatTime(race.time)}
              </div>
              <div className="text-sm text-gray-600">Finish Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {race.position || 'N/A'}
              </div>
              <div className="text-sm text-gray-600">Position</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 border-b">
          <div className="flex overflow-x-auto">
            <button 
              className={`px-4 py-3 font-medium whitespace-nowrap ${
                activeTab === 'overview' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-600 hover:text-blue-600'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`px-4 py-3 font-medium whitespace-nowrap ${
                activeTab === 'map' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-600 hover:text-blue-600'
              }`}
              onClick={() => setActiveTab('map')}
            >
              Route Map
            </button>
            <button 
              className={`px-4 py-3 font-medium whitespace-nowrap ${
                activeTab === 'photos' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-600 hover:text-blue-600'
              }`}
              onClick={() => setActiveTab('photos')}
            >
              Photos
            </button>
            <button 
              className={`px-4 py-3 font-medium whitespace-nowrap ${
                activeTab === 'stats' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-600 hover:text-blue-600'
              }`}
              onClick={() => setActiveTab('stats')}
            >
              Stats
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mb-10">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h2 className="text-2xl font-bold mb-4">Race Description</h2>
                  <div className="prose max-w-none">
                    {race.fullDescription ? (
                      <div dangerouslySetInnerHTML={{ __html: race.fullDescription }} />
                    ) : (
                      <p className="text-gray-700 mb-4">{race.description}</p>
                    )}
                    
                    {race.experience && (
                      <>
                        <h3 className="text-xl font-bold mt-6 mb-3">My Experience</h3>
                        <p className="text-gray-700">{race.experience}</p>
                      </>
                    )}
                    
                    {race.challenges && (
                      <>
                        <h3 className="text-xl font-bold mt-6 mb-3">Challenges Faced</h3>
                        <p className="text-gray-700">{race.challenges}</p>
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <div className="bg-white rounded-lg shadow-md p-5 mb-6">
                    <h3 className="text-xl font-bold mb-3">Race Information</h3>
                    <ul className="space-y-3">
                      <li className="flex">
                        <span className="text-gray-500 w-24">Date:</span>
                        <span className="font-medium">
                          {new Date(race.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </li>
                      <li className="flex">
                        <span className="text-gray-500 w-24">Location:</span>
                        <span className="font-medium">{race.location}</span>
                      </li>
                      <li className="flex">
                        <span className="text-gray-500 w-24">Distance:</span>
                        <span className="font-medium">{race.distance} km</span>
                      </li>
                      {race.elevationGain && (
                      <li className="flex">
                        <span className="text-gray-500 w-24">Elevation:</span>
                        <span className="font-medium">{race.elevationGain} m</span>
                      </li>
                      )}
                      <li className="flex">
                        <span className="text-gray-500 w-24">Terrain:</span>
                        <span className="font-medium">{race.terrain || 'Mixed'}</span>
                      </li>
                      <li className="flex">
                        <span className="text-gray-500 w-24">Finish Time:</span>
                        <span className="font-medium">{formatTime(race.time)}</span>
                      </li>
                      {race.position && (
                      <li className="flex">
                        <span className="text-gray-500 w-24">Position:</span>
                        <span className="font-medium">{race.position}</span>
                      </li>
                      )}
                    </ul>
                  </div>

                  {race.website && (
                    <div className="bg-white rounded-lg shadow-md p-5">
                      <h3 className="text-xl font-bold mb-3">External Links</h3>
                      <ul className="space-y-3">
                        <li>
                          <a 
                            href={race.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline flex items-center"
                          >
                            <i className="fas fa-external-link-alt mr-2"></i>
                            Official Race Website
                          </a>
                        </li>
                        {race.stravaActivity && (
                          <li>
                            <a 
                              href={race.stravaActivity} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline flex items-center"
                            >
                              <i className="fab fa-strava mr-2"></i>
                              Strava Activity
                            </a>
                          </li>
                        )}
                        {race.stravaActivityStage1 && (
                          <li>
                            <a 
                              href={race.stravaActivityStage1} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline flex items-center"
                            >
                              <i className="fab fa-strava mr-2"></i>
                              Strava Activity Stage 1
                            </a>
                          </li>
                        )}
                        {race.stravaActivityStage2 && (
                          <li>
                            <a 
                              href={race.stravaActivityStage2} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline flex items-center"
                            >
                              <i className="fab fa-strava mr-2"></i>
                              Strava Activity Stage 2
                            </a>
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Map Tab */}
          {activeTab === 'map' && (
            <div className="animate-fade-in">
              <div className="bg-white rounded-lg shadow-md p-5 mb-6">                <h2 className="text-2xl font-bold mb-4">Race Route</h2>                {race.coordinates ? (
                  <MapSection 
                    coordinates={race.coordinates} 
                    title={race.title}
                    route={race.route}
                  />
                ) : (
                  <div className="bg-gray-100 h-96 w-full rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">No map data available for this race</p>
                  </div>
                )}
                
                {race.routeDescription && (
                  <div className="mt-4">
                    <h3 className="text-xl font-bold mb-2">Route Description</h3>
                    <p className="text-gray-700">{race.routeDescription}</p>
                  </div>
                )}
                
                {race.mapCredits && (
                  <p className="text-xs text-gray-500 mt-2">{race.mapCredits}</p>
                )}
              </div>

              {race.elevationProfile && (
                <div className="bg-white rounded-lg shadow-md p-5">
                  <h3 className="text-xl font-bold mb-3">Elevation Profile</h3>
                  <img 
                    src={race.elevationProfile} 
                    alt="Race elevation profile" 
                    className="w-full h-auto rounded-lg"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>
          )}

          {/* Photos Tab */}
          {activeTab === 'photos' && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold mb-4">Race Photos</h2>
              
              {race.photos && race.photos.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {race.photos.map((photo, index) => (
                    <div key={index} className="aspect-square overflow-hidden rounded-lg shadow-md">
                      <img 
                        src={photo.url} 
                        alt={photo.caption || `Race photo ${index + 1}`} 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = PLACEHOLDER_IMAGE;
                        }}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-md p-12 text-center">
                  <p className="text-gray-500">No photos available for this race</p>
                </div>
              )}
            </div>
          )}

          {/* Stats Tab */}
          {activeTab === 'stats' && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold mb-4">Race Statistics</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {race.splits && race.splits.length > 0 && (
                  <div className="bg-white rounded-lg shadow-md p-5">
                    <h3 className="text-xl font-bold mb-3">Split Times</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gray-50 border-b">
                            <th className="py-2 px-4 text-left">Distance</th>
                            <th className="py-2 px-4 text-left">Split Time</th>
                            <th className="py-2 px-4 text-left">Pace</th>
                          </tr>
                        </thead>
                        <tbody>
                          {race.splits.map((split, index) => (
                            <tr key={index} className="border-b last:border-0">
                              <td className="py-2 px-4">{split.distance}</td>
                              <td className="py-2 px-4">{split.time}</td>
                              <td className="py-2 px-4">{split.pace}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {race.garminData && (
                  <div className="bg-white rounded-lg shadow-md p-5">
                    <h3 className="text-xl font-bold mb-3">Performance Data</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Avg. Heart Rate</p>
                        <p className="text-2xl font-bold text-blue-600">
                          {race.garminData.avgHeartRate} <span className="text-sm font-normal">bpm</span>
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Max Heart Rate</p>
                        <p className="text-2xl font-bold text-blue-600">
                          {race.garminData.maxHeartRate} <span className="text-sm font-normal">bpm</span>
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Calories</p>
                        <p className="text-2xl font-bold text-blue-600">
                          {race.garminData.calories.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Avg. Pace</p>
                        <p className="text-2xl font-bold text-blue-600">
                          {race.garminData.avgPace}/km
                        </p>
                      </div>
                    </div>

                    {race.garminData.activityLink && (
                      <div className="mt-4">
                        <a 
                          href={race.garminData.activityLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline flex items-center"
                        >
                          <i className="fas fa-external-link-alt mr-2"></i>
                          View Complete Data on Garmin Connect
                        </a>
                      </div>
                    )}
                  </div>
                )}

                {race.nutrition && (
                  <div className="bg-white rounded-lg shadow-md p-5">
                    <h3 className="text-xl font-bold mb-3">Race Nutrition</h3>
                    <p className="text-gray-700 mb-4">{race.nutrition}</p>
                  </div>
                )}

                {race.lessons && (
                  <div className="bg-white rounded-lg shadow-md p-5">
                    <h3 className="text-xl font-bold mb-3">Lessons Learned</h3>
                    <p className="text-gray-700">{race.lessons}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Navigation between races */}
        <div className="flex justify-between mt-12 pt-8 border-t">
          <Link 
            to={`/races/${race.category.toLowerCase()}`}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Back to all {race.category.toLowerCase()}
          </Link>
        </div>
      </div>    </div>
  );
}

export default RaceDetail;