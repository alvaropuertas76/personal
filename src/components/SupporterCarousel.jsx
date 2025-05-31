import React, { useState, useEffect } from 'react';

function SupporterCarousel({ images }) {
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
      if (prev === 0) return images.length - 1;
      return prev - 1;
    });
    
    // Reset animation state after transition
    setTimeout(() => setIsAnimating(false), 600);
  };

  const goToNextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    setCurrentSlide(prev => {
      if (prev === images.length - 1) return 0;
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

  if (!images || images.length === 0) {
    return <div className="h-[400px] bg-gray-200 flex items-center justify-center">No images available</div>;
  }

  return (
    <div className="relative h-[400px] overflow-hidden rounded-lg">
      {/* Carousel Slides */}
      {images.map((slide, index) => (
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
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{slide.title}</h2>
              <p className="text-lg md:text-xl text-white mb-6">{slide.subtitle}</p>
            </div>
          </div>
        </div>
      ))}
      
      {/* Navigation Arrows */}
      <button 
        onClick={goToPrevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full transition-all"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button 
        onClick={goToNextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full transition-all"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      {/* Indicators/Dots */}
      <div className="absolute bottom-4 w-full flex justify-center gap-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-white scale-110' : 'bg-white bg-opacity-50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default SupporterCarousel;
