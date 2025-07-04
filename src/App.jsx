import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Calendar from './pages/Calendar';
import ProfessionalLife from './pages/ProfessionalLife';
import RaceDetail from './pages/RaceDetail';
import NextChallenges from './pages/NextChallenges';
import SupporterZone from './pages/SupporterZone';
import SocialMedia from './pages/SocialMedia';
import NotFound from './pages/NotFound';
import PrivateLogin from './pages/PrivateLogin';
import PrivateCalendar from './pages/PrivateCalendar';
import './styles/global.css';
import { LanguageProvider } from './translations/LanguageContext.jsx';


// Category Pages
import Marathons from './pages/categories/Marathons';
import Ultramarathons from './pages/categories/Ultramarathons';
import StagedUltramarathons from './pages/categories/StagedUltramarathons';
import Triathlons from './pages/categories/Triathlons';
import FutureProjects from './pages/categories/FutureProjects';
import Statistics from './pages/categories/Statistics';

function App() {  
  return (
    <LanguageProvider>
      <Router basename="/personal/">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="professional" element={<ProfessionalLife />} />            <Route path="marathons" element={<Marathons />} />
            <Route path="ultramarathons" element={<Ultramarathons />} />
            <Route path="staged-ultramarathons" element={<StagedUltramarathons />} />
            <Route path="triathlons" element={<Triathlons />} />
            <Route path="future-projects" element={<FutureProjects />} />            
            <Route path="statistics" element={<Statistics />} />
            <Route path="race/:id" element={<RaceDetail />} /><Route path="next-challenges" element={<NextChallenges />} />
            <Route path="supporter-zone" element={<SupporterZone />} />            <Route path="social-media" element={<SocialMedia />} />
            <Route path="private" element={<PrivateLogin />} />
            <Route path="private/calendar" element={<PrivateCalendar />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;