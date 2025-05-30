import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PLACEHOLDER_IMAGE, MAPS_CONFIG } from '../utils/constants';
import MapSection from '../components/MapSection';

function RaceDetail() {  const { id } = useParams();
  const [race, setRace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // In a real app, this would fetch from an API
  useEffect(() => {
    setLoading(true);
    
    // Simulating API call to get race details
    setTimeout(() => {
      // Mock race data based on ID
      const raceData = mockRaceData.find(race => race.id === id) || null;
        setRace(raceData);
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
      </div>
    </div>
  );
}

// Mock race data
const mockRaceData = [
  {
    id: 'mds-2022',
    title: 'Marathon des Sables',
    date: '2022-04-25',
    location: 'Sahara Desert, Morocco',
    category: 'Staged Ultramarathon',
    distance: 250,
    elevationGain: 1200,
    time: '41:25:13',
    position: '145/1200',
    description: '250km self-supported race across the Sahara Desert, known as "The Toughest Footrace on Earth".',
    fullDescription: `<p>The Marathon des Sables is a legendary multi-stage ultramarathon held annually in the Sahara Desert of Morocco. The race spans approximately 250 kilometers (155 miles) over 6 stages, with runners required to carry all their own food, sleeping gear, and supplies.</p>
    <p>Each participant carries a backpack containing all essential survival equipment, food, and personal items. The only assistance provided is limited water rations and tents to sleep in at night. The harsh desert conditions include temperatures that can exceed 50°C (122°F) during the day and drop dramatically at night.</p>
    <p>The course traverses a variety of desert terrain including sand dunes, rocky plains, mountains, and dried river beds. The longest single stage, known as the "long march," typically covers around 80-90km and must be completed in one continuous effort.</p>`,
    experience: 'This was my first self-supported stage race and easily the most challenging race I\'ve ever completed. The combination of extreme heat, sand dunes, and carrying all supplies created a unique physical and mental challenge. The camaraderie among participants was incredible, with everyone supporting each other through the toughest moments.',
    challenges: 'The biggest challenges were managing water consumption in 45°C heat, dealing with severe blisters after stage 3, and the mental fatigue during the 86km long stage that took me over 20 hours to complete.',    coordinates: { lat: 31.1566, lng: -4.2569 },
    image: './assets/images/mds2022.jpg',
    headerImage: './assets/images/mds-header.jpg',
    terrain: 'Desert, sand dunes, rocky plains',
    website: 'https://www.marathondessables.com/',
    stravaActivity: 'https://www.strava.com/activities/1234567890',
    stravaActivityStage1: 'https://www.strava.com/activities/1234567892',
    stravaActivityStage2: 'https://www.strava.com/activities/1234567895',
    stravaActivityStage3: 'https://www.strava.com/activities/1234567894',
    stravaActivityStage4: 'https://www.strava.com/activities/1234567898',
    stravaActivityStage5: 'https://www.strava.com/activities/1234567897',
    stravaActivityStage6: 'https://www.strava.com/activities/1234567899',    highlight: true,
    photos: [
      { url: './assets/images/mds-1.jpg', caption: 'Starting line at dawn' },
      { url: './assets/images/mds-2.jpg', caption: 'Crossing the endless dunes' },
      { url: './assets/images/mds-3.jpg', caption: 'Reaching the finish line' },
      { url: './assets/images/mds-4.jpg', caption: 'The camp at night' }
    ],
    splits: [
      { distance: 'Stage 1 (32km)', time: '4:12:35', pace: '7:54/km' },
      { distance: 'Stage 2 (38km)', time: '5:23:12', pace: '8:30/km' },
      { distance: 'Stage 3 (31km)', time: '4:56:41', pace: '9:34/km' },
      { distance: 'Stage 4 (86km)', time: '20:14:55', pace: '14:08/km' },
      { distance: 'Stage 5 (42.2km)', time: '6:37:50', pace: '9:25/km' }
    ],
    garminData: {
      avgHeartRate: 148,
      maxHeartRate: 175,
      calories: 28500,
      avgPace: '9:45',
      activityLink: 'https://connect.garmin.com/modern/activity/1234567890'
    },
    nutrition: 'Freeze-dried meals averaging 2000 calories per day, supplemented with energy bars, nuts, and electrolyte tablets. I consumed approximately 8-10 liters of water daily.',
    lessons: 'Proper foot care is essential - preventative taping saved my race. Pack calories, not weight. Mental resilience matters more than physical preparation in the later stages.'
  },
  {
    id: 'boston-2024',
    title: 'Boston Marathon',
    date: '2024-04-15',
    location: 'Boston, Massachusetts, USA',
    category: 'Marathon',
    distance: 42.2,
    elevationGain: 150,
    time: '3:05:47',
    position: '1245/30000',
    description: 'The world\'s oldest annual marathon and one of the World Marathon Majors.',
    coordinates: { lat: 42.3472, lng: -71.0845 },
    image: './assets/images/boston-marathon.jpg',
    terrain: 'Road, rolling hills',
    website: 'https://www.baa.org/',
    highlight: true,
    garminData: {
      avgHeartRate: 162,
      maxHeartRate: 185,
      calories: 3150,
      avgPace: '4:23',
      activityLink: 'https://connect.garmin.com/modern/activity/9876543210'
    }
  },
  {
    id: 'utmb-2023',
    title: 'Ultra-Trail du Mont-Blanc',
    date: '2023-08-25',
    location: 'Chamonix, France',
    category: 'Ultramarathon',
    distance: 171,
    elevationGain: 10000,
    time: '36:45:22',
    position: '235/2300',
    description: 'The iconic mountain ultramarathon around Mont Blanc through France, Italy, and Switzerland.',
    coordinates: { lat: 45.9237, lng: 6.8694 },
    image: './assets/images/utmb.jpg',
    terrain: 'Mountain trails, technical alpine terrain',
    highlight: true
  },
  {
    id: 'ironman-frankfurt-2018',
    title: 'Ironman Frankfurt',
    date: '2018-06-18',
    location: 'Frankfurt, Germany',
    category: 'Triathlon',
    distance: 226,
    time: '12:15:33',
    description: 'Full distance triathlon including 3.8km swim, 180km bike, and 42.2km run.',
    coordinates: { lat: 50.1109, lng: 8.6821 },
    image: './assets/images/ironman-frankfurt.jpeg',
    terrain: 'Swim, bike, run',
    position: '876/2500'
  },
  {
    id: 'fire-ice-ultra-2018',
    title: 'Fire & Ice Ultra',
    date: '2018-08-29',
    location: 'Iceland',
    category: 'Staged Ultramarathon',
    distance: 250,
    elevationGain: 6000,
    time: '39:12:44',
    description: '250km self-supported race through Iceland\'s volcanic terrain and glacial rivers.',
    coordinates: { lat: 64.9631, lng: -19.0208 },
    image: './assets/images/fire-ice.jpg',
    terrain: 'Volcanic trails, rivers, glaciers',
    highlight: true
  }
];

export default RaceDetail;