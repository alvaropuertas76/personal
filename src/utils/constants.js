/**
 * Constants and configurations for the personal website
 */

// Navigation links structure for the main menu
export const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Calendar", path: "/calendar" },
  {
    name: "Races",
    children: [
      { name: "Marathons", path: "/marathons" },
      { name: "Ultramarathons", path: "/ultramarathons" },
      { name: "Staged Ultramarathons", path: "/staged-ultramarathons" },
      { name: "Triathlons", path: "/triathlons" }
    ]
  },
  { name: "Next Challenges", path: "/next-challenges" },
  { name: "Professional Life", path: "/professional" },
  { name: "Race Template", path: "/template" }
];

// Social media and external profile links
export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/alvaropuertaspunal/",
  github: "https://github.com/alvaropuertas76",
  strava: "https://www.strava.com/athletes/35247033",
  garmin: "https://connect.garmin.com/modern/profile/alvaropuertas",
  facebook: "https://www.facebook.com/alvaropuertas76",
  instagram: "https://www.instagram.com/alvaropuertas76"
};

// Google Maps configuration
export const MAPS_CONFIG = {
  apiKey: "AIzaSyAsAUowinOWyylVW1BtnT-NWqS-l33LGxg", 
  defaultZoom: 7,
  defaultCenter: { lat: 40.4168, lng: -3.7038 } // Madrid, Spain
};

// Calendar event categories with color coding
export const CALENDAR_CATEGORIES = {
  race: {
    name: "Race",
    color: "blue-600"
  },
  training: {
    name: "Training",
    color: "green-500"
  },
  rest: {
    name: "Rest Day",
    color: "yellow-400"
  },
  travel: {
    name: "Travel",
    color: "purple-500"
  }
};

// Race categories for filtering and organization
export const RACE_CATEGORIES = [
  { id: "marathons", name: "Marathons", description: "Classic 42.2km races" },
  { id: "ultramarathons", name: "Ultramarathons", description: "Races beyond the marathon distance" },
  { id: "staged-ultramarathons", name: "Staged Ultramarathons", description: "Multi-day ultra adventures" },
  { id: "triathlons", name: "Triathlons", description: "Swim, bike, run events" },
  { id: "future-projects", name: "Future Projects", description: "Upcoming challenges" },
  { id: "supporter-space", name: "Supporter Space", description: "Supporter Space" }
];

// Placeholder image for when no image is available
export const PLACEHOLDER_IMAGE = "./assets/images/placeholder-race.jpg";

// Hero carousel images for the homepage
export const HERO_IMAGES = [
  {
    url: "./assets/images/mds2022.jpg",
    title: "Marathon des Sables",
    subtitle: "250km across the Sahara Desert",
    link: "/race/mds-2022"
  },
  {
    url: "./assets/images/fire-ice-ultra.jpg",
    title: "Fire & Ice Ultra",
    subtitle: "250km through Iceland's volcanic landscape",
    link: "/race/fire-ice-ultra-2018" 
  },
  {
    url: "./assets/images/frankfurt-ironman.jpeg",
    title: "Ironman Frankfurt",
    subtitle: "Full distance triathlon in Germany",
    link: "/race/ironman-frankfurt-2018"
  }
];

// Website metadata
export const SITE_METADATA = {
  title: "Álvaro Puertas Puñal | Software Architect & Endurance Athlete",
  description: "Personal website of Álvaro Puertas Puñal, Software Architect and endurance athlete specialized in ultramarathons and extreme races.",
  author: "Álvaro Puertas Puñal",
  keywords: "software architect, ultramarathon, marathon, endurance athlete, trail running, triathlon"
};

// Professional experience highlights for the homepage
export const PROFESSIONAL_HIGHLIGHTS = [
  {
    title: "Software Architecture",
    description: "Designing resilient, scalable systems with over 15 years of experience in enterprise software.",
    icon: "fas fa-drafting-compass"
  },
  {
    title: "Cloud Infrastructure",
    description: "Building and optimizing AWS and Azure infrastructure for global applications.",
    icon: "fas fa-cloud"
  },
  {
    title: "Technical Leadership",
    description: "Leading engineering teams with a focus on quality, performance, and continuous delivery.",
    icon: "fas fa-users-cog"
  }
];

// Race highlights for the homepage
export const RACE_HIGHLIGHTS = [
  {
    title: "Marathon des Sables",
    description: "Completed the legendary 250km self-supported race across the Sahara Desert in 2022.",
    icon: "fas fa-sun"
  },
  {
    title: "Ironman Frankfurt",
    description: "Finished full Ironman distance triathlon in 12:28:36 (3.8km swim, 180km bike, 42.2km run).",
    icon: "fas fa-swimmer"
  },
  {
    title: "Fire & Ice Ultra",
    description: "Conquered 250km across Iceland's volcanic terrain and glacial rivers in 6 days.",
    icon: "fas fa-fire"
  }
];