import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HERO_IMAGES } from '../utils/constants';

function CarouselHero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(interval);
  }, [currentSlide]);

  const goToPrevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    setCurrentSlide(prev => {
      if (prev === 0) return HERO_IMAGES.length - 1;
      return prev - 1;
    });
    
    // Reset animation state after transition
    setTimeout(() => setIsAnimating(false), 600);
  };

  const goToNextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    setCurrentSlide(prev => {
      if (prev === HERO_IMAGES.length - 1) return 0;
      return prev + 1;
    });
    
    // Reset animation state after transition
    setTimeout(() => setIsAnimating(false), 600);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    
    // Reset animation state after transition
    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <div className="relative h-[500px] md:h-[600px] overflow-hidden">
      {/* Carousel Slides */}
      {HERO_IMAGES.map((slide, index) => (
        <div
          key={index}
          className={`
            absolute inset-0 transition-opacity duration-1000 ease-in-out
            ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}
          `}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center hero-overlay"
            style={{ 
              backgroundImage: `url(${slide.url})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover'
            }}
          ></div>
          
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          
          <div className="absolute inset-0 flex items-center justify-center text-center px-4">
            <div className="max-w-3xl animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{slide.title}</h2>
              <p className="text-xl md:text-2xl text-white mb-8">{slide.subtitle}</p>
              <Link 
                to={slide.link} 
                className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                View Race Details
              </Link>
            </div>
          </div>
        </div>
      ))}
      
      {/* Navigation Arrows */}
      <button 
        onClick={goToPrevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full transition-all"
      >
        <i className="fas fa-chevron-left"></i>
      </button>
      
      <button 
        onClick={goToNextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full transition-all"
      >
        <i className="fas fa-chevron-right"></i>
      </button>
      
      {/* Indicators */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2 z-20">
        {HERO_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-white scale-125' : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default CarouselHero;