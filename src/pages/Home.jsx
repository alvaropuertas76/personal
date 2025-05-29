import React from 'react';
import { Link } from 'react-router-dom';
import CarouselHero from '../components/CarouselHero';
import { PROFESSIONAL_HIGHLIGHTS, RACE_HIGHLIGHTS } from '../utils/constants';

function Home() {
  return (
    <div>
      {/* Hero Carousel */}
      <CarouselHero />
      
      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Álvaro Puertas</h1>
            <div className="flex items-center justify-center mb-6">
              <span className="h-px bg-blue-600 w-12 mx-4"></span>
              <span className="text-xl text-blue-600">Software Architect & Endurance Athlete</span>
              <span className="h-px bg-blue-600 w-12 mx-4"></span>
            </div>
            <p className="text-lg text-gray-700 mb-8">
              Passionate about technology and endurance sports, I push boundaries in both professional and athletic life.
              With over 15 years in software architecture and more than 40 marathons and ultras completed, I believe in
              the power of persistence, strategic planning, and continuous improvement.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/professional"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Professional Life
              </Link>
              <Link 
                to="/next-challenges"
                className="px-6 py-3 border border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                Next Challenges
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Professional Highlights */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Professional Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROFESSIONAL_HIGHLIGHTS.map((highlight, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-soft p-6 transition-transform hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="text-4xl text-blue-600 mb-4">
                  <i className={highlight.icon}></i>
                </div>
                <h3 className="text-xl font-bold mb-3">{highlight.title}</h3>
                <p className="text-gray-600">{highlight.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link 
              to="/professional"
              className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800"
            >
              Learn more about my professional background
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Athletic Highlights */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Race Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {RACE_HIGHLIGHTS.map((highlight, index) => (
              <div 
                key={index} 
                className="bg-gray-50 rounded-lg shadow-soft p-6 transition-transform hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="text-4xl text-blue-600 mb-4">
                  <i className={highlight.icon}></i>
                </div>
                <h3 className="text-xl font-bold mb-3">{highlight.title}</h3>
                <p className="text-gray-600">{highlight.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link 
              to="/staged-ultramarathons"
              className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800"
            >
              Explore my race history
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready for the Next Challenge</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Whether it's building robust software architecture or conquering extreme endurance races,
            I'm always looking for the next challenge to push my limits.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/next-challenges"
              className="px-6 py-3 bg-white text-blue-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Upcoming Races
            </Link>
            <Link 
              to="/calendar"
              className="px-6 py-3 border border-white text-white hover:bg-blue-800 rounded-lg transition-colors"
            >
              View Calendar
            </Link>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">40+</div>
              <div className="text-gray-700">Marathons & Ultras</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">12</div>
              <div className="text-gray-700">Countries Raced</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">15+</div>
              <div className="text-gray-700">Years in Tech</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">5</div>
              <div className="text-gray-700">Major Ultras</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;