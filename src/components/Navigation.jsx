import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../utils/constants';

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll event for sticky header styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className={`py-4 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
      <div className="flex items-center justify-between">        {/* Logo */}
        <div className="flex items-center space-x-4">
          <Link to="//" className="flex items-center">
            <img 
              src="./assets/images/firma.png" 
              alt="Álvaro Puertas" 
              className="w-10 h-10 rounded-full object-cover border-2 border-blue-600"
            />
            <span className="ml-2 text-lg font-semibold hidden sm:block">Álvaro Puertas</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {NAV_LINKS.map((link, index) => (
            link.children ? (
              <div key={index} className="dropdown relative group">
                <button className="flex items-center text-gray-700 hover:text-blue-600 transition">
                  {link.name}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="dropdown-menu absolute left-0 mt-2 w-56 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                  <div className="py-1">
                    {link.children.map((child, childIndex) => (
                      <NavLink
                        key={childIndex}
                        to={child.path}
                        className={({ isActive }) => 
                          `block px-4 py-2 text-sm ${isActive ? 'text-blue-600 font-medium bg-blue-50' : 'text-gray-700 hover:bg-gray-100'}`
                        }
                      >
                        {child.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <NavLink
                key={index}
                to={link.path}
                className={({ isActive }) => 
                  `text-gray-700 hover:text-blue-600 transition ${isActive ? 'nav-link-active' : ''}`
                }
              >
                {link.name}
              </NavLink>
            )
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="text-gray-700 focus:outline-none"
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 bg-white border-t pt-4 animate-fade-in">
          <div className="flex flex-col space-y-3">
            {NAV_LINKS.map((link, index) => (
              link.children ? (
                <div key={index} className="space-y-2">
                  <div className="font-medium text-gray-800">{link.name}</div>
                  <div className="pl-4 border-l-2 border-gray-200 space-y-2">
                    {link.children.map((child, childIndex) => (
                      <NavLink
                        key={childIndex}
                        to={child.path}
                        className={({ isActive }) => 
                          `block text-sm ${isActive ? 'text-blue-600 font-medium' : 'text-gray-600'}`
                        }
                      >
                        {child.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              ) : (
                <NavLink
                  key={index}
                  to={link.path}
                  className={({ isActive }) => 
                    `block ${isActive ? 'text-blue-600 font-medium' : 'text-gray-700'}`
                  }
                >
                  {link.name}
                </NavLink>
              )
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navigation;