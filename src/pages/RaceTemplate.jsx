import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';

function RaceTemplate() {
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      raceTitle: '',
      raceDate: '',
      raceLocation: '',
      raceCategory: '',
      raceDistance: '',
      raceElevation: '',
      raceTime: '',
      raceDescription: '',
      raceTerrain: '',
      raceNotes: '',
    }
  });

  const [previewData, setPreviewData] = useState(null);
  const [formStep, setFormStep] = useState('form'); // 'form', 'preview'
  
  // Race categories
  const categories = [
    { value: 'marathon', label: 'Marathon' },
    { value: 'ultramarathon', label: 'Ultramarathon' },
    { value: 'staged-ultra', label: 'Staged Ultramarathon' },
    { value: 'triathlon', label: 'Triathlon' },
    { value: 'trail-race', label: 'Trail Race' },
    { value: 'road-race', label: 'Road Race' },
    { value: 'other', label: 'Other' }
  ];

  // Terrain types
  const terrainTypes = [
    { value: 'road', label: 'Road' },
    { value: 'trail', label: 'Trail' },
    { value: 'mountain', label: 'Mountain' },
    { value: 'desert', label: 'Desert' },
    { value: 'mixed', label: 'Mixed Terrain' }
  ];

  const onSubmit = (data) => {
    // In a real app we would save this data to a backend
    console.log('Form data submitted:', data);
    setPreviewData(data);
    setFormStep('preview');
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-center mb-2">Race Documentation Template</h1>
        <p className="text-center text-gray-600 mb-8">Use this form to document your races and keep a record of your achievements.</p>

        {formStep === 'form' ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Race Title */}
                <div className="md:col-span-2">
                  <label htmlFor="raceTitle" className="block text-gray-700 font-medium mb-1">Race Title*</label>
                  <input
                    id="raceTitle"
                    type="text"
                    className={`w-full border ${errors.raceTitle ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    {...register("raceTitle", { required: "Race title is required" })}
                  />
                  {errors.raceTitle && <p className="text-red-500 text-sm mt-1">{errors.raceTitle.message}</p>}
                </div>

                {/* Race Date */}
                <div>
                  <label htmlFor="raceDate" className="block text-gray-700 font-medium mb-1">Date*</label>
                  <input
                    id="raceDate"
                    type="date"
                    className={`w-full border ${errors.raceDate ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    {...register("raceDate", { required: "Race date is required" })}
                  />
                  {errors.raceDate && <p className="text-red-500 text-sm mt-1">{errors.raceDate.message}</p>}
                </div>

                {/* Race Location */}
                <div>
                  <label htmlFor="raceLocation" className="block text-gray-700 font-medium mb-1">Location*</label>
                  <input
                    id="raceLocation"
                    type="text"
                    placeholder="City, Country"
                    className={`w-full border ${errors.raceLocation ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    {...register("raceLocation", { required: "Race location is required" })}
                  />
                  {errors.raceLocation && <p className="text-red-500 text-sm mt-1">{errors.raceLocation.message}</p>}
                </div>

                {/* Race Category */}
                <div>
                  <label htmlFor="raceCategory" className="block text-gray-700 font-medium mb-1">Category*</label>
                  <select
                    id="raceCategory"
                    className={`w-full border ${errors.raceCategory ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    {...register("raceCategory", { required: "Race category is required" })}
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>{category.label}</option>
                    ))}
                  </select>
                  {errors.raceCategory && <p className="text-red-500 text-sm mt-1">{errors.raceCategory.message}</p>}
                </div>

                {/* Race Distance */}
                <div>
                  <label htmlFor="raceDistance" className="block text-gray-700 font-medium mb-1">Distance (km)*</label>
                  <input
                    id="raceDistance"
                    type="number"
                    step="0.1"
                    placeholder="42.2"
                    className={`w-full border ${errors.raceDistance ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    {...register("raceDistance", { 
                      required: "Race distance is required",
                      min: { value: 0.1, message: "Distance must be positive" }
                    })}
                  />
                  {errors.raceDistance && <p className="text-red-500 text-sm mt-1">{errors.raceDistance.message}</p>}
                </div>

                {/* Race Elevation */}
                <div>
                  <label htmlFor="raceElevation" className="block text-gray-700 font-medium mb-1">Elevation Gain (m)</label>
                  <input
                    id="raceElevation"
                    type="number"
                    placeholder="500"
                    className={`w-full border ${errors.raceElevation ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    {...register("raceElevation", { min: { value: 0, message: "Elevation must be positive or 0" } })}
                  />
                  {errors.raceElevation && <p className="text-red-500 text-sm mt-1">{errors.raceElevation.message}</p>}
                </div>

                {/* Race Finish Time */}
                <div>
                  <label htmlFor="raceTime" className="block text-gray-700 font-medium mb-1">Finish Time</label>
                  <input
                    id="raceTime"
                    type="text"
                    placeholder="3:30:45"
                    pattern="^([0-9]+:)?[0-5]?[0-9]:[0-5][0-9]$"
                    title="Format: hours:minutes:seconds (e.g., 3:30:45) or minutes:seconds (e.g., 30:45)"
                    className={`w-full border ${errors.raceTime ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    {...register("raceTime")}
                  />
                  {errors.raceTime && <p className="text-red-500 text-sm mt-1">{errors.raceTime.message}</p>}
                </div>

                {/* Race Terrain */}
                <div>
                  <label htmlFor="raceTerrain" className="block text-gray-700 font-medium mb-1">Terrain Type</label>
                  <select
                    id="raceTerrain"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("raceTerrain")}
                  >
                    <option value="">Select terrain type</option>
                    {terrainTypes.map((terrain) => (
                      <option key={terrain.value} value={terrain.value}>{terrain.label}</option>
                    ))}
                  </select>
                </div>

                {/* Race Position */}
                <div className="md:col-span-2">
                  <label htmlFor="racePosition" className="block text-gray-700 font-medium mb-1">Position (optional)</label>
                  <input
                    id="racePosition"
                    type="text"
                    placeholder="e.g. 156/1200"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("racePosition")}
                  />
                </div>

                {/* Race Description */}
                <div className="md:col-span-2">
                  <label htmlFor="raceDescription" className="block text-gray-700 font-medium mb-1">Race Description*</label>
                  <textarea
                    id="raceDescription"
                    rows="4"
                    placeholder="Describe the race, route, and your experience..."
                    className={`w-full border ${errors.raceDescription ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    {...register("raceDescription", { required: "Race description is required" })}
                  ></textarea>
                  {errors.raceDescription && <p className="text-red-500 text-sm mt-1">{errors.raceDescription.message}</p>}
                </div>

                {/* Race Challenges */}
                <div className="md:col-span-2">
                  <label htmlFor="raceChallenges" className="block text-gray-700 font-medium mb-1">Challenges Faced (optional)</label>
                  <textarea
                    id="raceChallenges"
                    rows="3"
                    placeholder="What challenges did you face and overcome?"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("raceChallenges")}
                  ></textarea>
                </div>

                {/* Race Nutrition */}
                <div className="md:col-span-2">
                  <label htmlFor="raceNutrition" className="block text-gray-700 font-medium mb-1">Nutrition Strategy (optional)</label>
                  <textarea
                    id="raceNutrition"
                    rows="3"
                    placeholder="What was your nutrition strategy for this race?"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("raceNutrition")}
                  ></textarea>
                </div>

                {/* Race Lessons Learned */}
                <div className="md:col-span-2">
                  <label htmlFor="raceLessons" className="block text-gray-700 font-medium mb-1">Lessons Learned (optional)</label>
                  <textarea
                    id="raceLessons"
                    rows="3"
                    placeholder="What did you learn from this race?"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("raceLessons")}
                  ></textarea>
                </div>

                {/* Race Website */}
                <div className="md:col-span-2">
                  <label htmlFor="raceWebsite" className="block text-gray-700 font-medium mb-1">Race Website URL (optional)</label>
                  <input
                    id="raceWebsite"
                    type="url"
                    placeholder="https://www.example-race.com"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("raceWebsite", { 
                      pattern: { 
                        value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/, 
                        message: "Please enter a valid URL" 
                      } 
                    })}
                  />
                  {errors.raceWebsite && <p className="text-red-500 text-sm mt-1">{errors.raceWebsite.message}</p>}
                </div>

                {/* Strava Activity Link */}
                <div className="md:col-span-2">
                  <label htmlFor="stravaLink" className="block text-gray-700 font-medium mb-1">Strava Activity URL (optional)</label>
                  <input
                    id="stravaLink"
                    type="url"
                    placeholder="https://www.strava.com/activities/1234567890"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("stravaLink", { 
                      pattern: { 
                        value: /^(https?:\/\/)?(www\.)?strava\.com\/activities\/\d+$/, 
                        message: "Please enter a valid Strava activity URL" 
                      } 
                    })}
                  />
                  {errors.stravaLink && <p className="text-red-500 text-sm mt-1">{errors.stravaLink.message}</p>}
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <Link 
                  to="/"
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </Link>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Preview Entry
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {previewData && (
              <>
                {/* Preview Header */}
                <div className="bg-gray-800 text-white p-6">
                  <h2 className="text-2xl font-bold">{previewData.raceTitle}</h2>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-2">
                    <span className="flex items-center text-gray-300">
                      <i className="fas fa-map-marker-alt mr-2"></i>
                      {previewData.raceLocation}
                    </span>
                    <span className="flex items-center text-gray-300">
                      <i className="far fa-calendar-alt mr-2"></i>
                      {new Date(previewData.raceDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                    <span className="flex items-center text-gray-300">
                      <i className="fas fa-running mr-2"></i>
                      {getCategoryLabel(previewData.raceCategory)}
                    </span>
                  </div>
                </div>

                {/* Preview Content */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <h3 className="text-xl font-bold mb-3">Race Description</h3>
                      <p className="text-gray-700 whitespace-pre-line mb-6">{previewData.raceDescription}</p>

                      {previewData.raceChallenges && (
                        <>
                          <h3 className="text-xl font-bold mb-3">Challenges Faced</h3>
                          <p className="text-gray-700 whitespace-pre-line mb-6">{previewData.raceChallenges}</p>
                        </>
                      )}

                      {previewData.raceNutrition && (
                        <>
                          <h3 className="text-xl font-bold mb-3">Nutrition Strategy</h3>
                          <p className="text-gray-700 whitespace-pre-line mb-6">{previewData.raceNutrition}</p>
                        </>
                      )}

                      {previewData.raceLessons && (
                        <>
                          <h3 className="text-xl font-bold mb-3">Lessons Learned</h3>
                          <p className="text-gray-700 whitespace-pre-line mb-6">{previewData.raceLessons}</p>
                        </>
                      )}
                    </div>

                    <div>
                      <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <h3 className="text-lg font-bold mb-3">Race Details</h3>
                        <ul className="space-y-2">
                          <li className="flex justify-between">
                            <span className="text-gray-600">Distance:</span>
                            <span className="font-medium">{previewData.raceDistance} km</span>
                          </li>
                          {previewData.raceElevation && (
                            <li className="flex justify-between">
                              <span className="text-gray-600">Elevation:</span>
                              <span className="font-medium">{previewData.raceElevation} m</span>
                            </li>
                          )}
                          {previewData.raceTime && (
                            <li className="flex justify-between">
                              <span className="text-gray-600">Finish Time:</span>
                              <span className="font-medium">{previewData.raceTime}</span>
                            </li>
                          )}
                          {previewData.racePosition && (
                            <li className="flex justify-between">
                              <span className="text-gray-600">Position:</span>
                              <span className="font-medium">{previewData.racePosition}</span>
                            </li>
                          )}
                          {previewData.raceTerrain && (
                            <li className="flex justify-between">
                              <span className="text-gray-600">Terrain:</span>
                              <span className="font-medium">{getTerrainLabel(previewData.raceTerrain)}</span>
                            </li>
                          )}
                        </ul>
                      </div>

                      {(previewData.raceWebsite || previewData.stravaLink) && (
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h3 className="text-lg font-bold mb-3">External Links</h3>
                          <ul className="space-y-2">
                            {previewData.raceWebsite && (
                              <li>
                                <a 
                                  href={previewData.raceWebsite} 
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:underline flex items-center"
                                >
                                  <i className="fas fa-external-link-alt mr-2"></i>
                                  Race Website
                                </a>
                              </li>
                            )}
                            {previewData.stravaLink && (
                              <li>
                                <a 
                                  href={previewData.stravaLink} 
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:underline flex items-center"
                                >
                                  <i className="fab fa-strava mr-2"></i>
                                  Strava Activity
                                </a>
                              </li>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="border-t border-gray-200 p-6 bg-gray-50">
              <div className="flex justify-between">
                <button 
                  onClick={() => setFormStep('form')}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Edit Entry
                </button>
                <button
                  onClick={() => {
                    // In a real app, this would submit the data to a database
                    alert("In a production app, this would save your race entry to the database.");
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Save Entry
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Helper functions for label lookups
  function getCategoryLabel(value) {
    const category = categories.find(c => c.value === value);
    return category ? category.label : value;
  }
  
  function getTerrainLabel(value) {
    const terrain = terrainTypes.find(t => t.value === value);
    return terrain ? terrain.label : value;
  }
}

export default RaceTemplate;