import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navigation from './Navigation';
import GoogleAnalytics from './GoogleAnalytics';
import { SOCIAL_LINKS, SITE_METADATA } from '../utils/constants';

function Layout() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const analyticsId = 'G-FSH0GKBKEB'; // Reemplaza con tu ID de Google Analytics

  return (
    <div className="flex flex-col min-h-screen">
      {/* Google Analytics */}
      <GoogleAnalytics measurementId={analyticsId} />

      {/* Header */}
      <header className={`sticky top-0 z-50 bg-white shadow-md transition-all duration-300`}>
        <div className="container mx-auto px-4">
          <Navigation />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Column 1: About */}
            <div>
              <h3 className="text-xl font-bold mb-4">Álvaro Puertas Puñal</h3>
              <p className="text-gray-300 mb-4">
                Software Architect & Endurance Athlete passionate about pushing boundaries in technology and athletic performance.
              </p>
              <div className="flex space-x-4">
                <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-300 hover:text-white transition">
                  <i className="fab fa-linkedin text-xl"></i>
                </a>
                <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-gray-300 hover:text-white transition">
                  <i className="fab fa-github text-xl"></i>
                </a>
                <a href={SOCIAL_LINKS.strava} target="_blank" rel="noopener noreferrer" aria-label="Strava" className="text-gray-300 hover:text-white transition">
                  <i className="fab fa-strava text-xl"></i>
                </a>
                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-300 hover:text-white transition">
                  <i className="fab fa-instagram text-xl"></i>
                </a>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/personal/" className="text-gray-300 hover:text-white transition">Home</a>
                </li>
                <li>
                  <a href="/personal/calendar" className="text-gray-300 hover:text-white transition">Race Calendar</a>
                </li>
                <li>
                  <a href="/personal/professional" className="text-gray-300 hover:text-white transition">Professional Life</a>
                </li>
                <li>
                  <a href="/personal/next-challenges" className="text-gray-300 hover:text-white transition">Next Challenges</a>
                </li>
              </ul>
            </div>

            {/* Column 3: Contact */}
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <p className="text-gray-300 mb-2">
                Feel free to reach out for professional inquiries or race collaboration.
              </p>
              <p className="text-gray-300">
                <i className="fas fa-envelope mr-2"></i>
                alvaropuertas76@gmail.com
              </p>            </div>
          </div>          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p>&copy; {new Date().getFullYear()} Álvaro Puertas Puñal. All rights reserved.</p>
              <div className="mt-4 md:mt-0">
                <p className="text-sm">Powered by Me!!!</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;