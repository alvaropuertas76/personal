import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Calendar from './pages/Calendar';
import ProfessionalLife from './pages/ProfessionalLife';
import RaceDetail from './pages/RaceDetail';
import NextChallenges from './pages/NextChallenges';
import RaceTemplate from './pages/RaceTemplate';
import NotFound from './pages/NotFound';
import './styles/global.css';

// Category Pages
import Marathons from './pages/categories/Marathons';
import Ultramarathons from './pages/categories/Ultramarathons';
import StagedUltramarathons from './pages/categories/StagedUltramarathons';
import Triathlons from './pages/categories/Triathlons';
import FutureProjects from './pages/categories/FutureProjects';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="professional" element={<ProfessionalLife />} />
          <Route path="marathons" element={<Marathons />} />
          <Route path="ultramarathons" element={<Ultramarathons />} />
          <Route path="staged-ultramarathons" element={<StagedUltramarathons />} />
          <Route path="triathlons" element={<Triathlons />} />
          <Route path="future-projects" element={<FutureProjects />} />
          <Route path="race/:id" element={<RaceDetail />} />
          <Route path="next-challenges" element={<NextChallenges />} />
          <Route path="template" element={<RaceTemplate />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;