import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { inject } from '@vercel/analytics';

import PhysicsBackground from '@/components/PhysicsBackground';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

import Home from '@/app/page';
import About from '@/app/about/page';
import Contact from '@/app/contact/page';
import Projects from '@/app/projects/page';
import Recaller from '@/app/projects/recaller/page';
import ApiCreations from '@/app/projects/api-creations/page';
import SocialWellness from '@/app/projects/social-wellness/page';
import Frameday from '@/app/projects/social-wellness/frameday/page';
import Research from '@/app/research/page';
import AiCopilot from '@/app/research/ai-copilot/page';
import ConstructionComm from '@/app/research/construction-communication/page';
import DigitalContentMarketing from '@/app/research/digital-content-marketing/page';
import DigitalTransformation from '@/app/research/digital-transformation/page';
import ItMigrations from '@/app/research/it-migrations/page';
import TrainingPrograms from '@/app/research/training-programs/page';
import NotFound from '@/app/not-found';

inject();

function ScrollReset() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="min-h-screen relative">
      <PhysicsBackground />
      <CustomCursor />
      <Navbar />
      <ScrollReset />
      <main className="content-layer">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/recaller" element={<Recaller />} />
          <Route path="/projects/api-creations" element={<ApiCreations />} />
          <Route path="/projects/social-wellness" element={<SocialWellness />} />
          <Route path="/projects/social-wellness/frameday" element={<Frameday />} />
          <Route path="/research" element={<Research />} />
          <Route path="/research/ai-copilot" element={<AiCopilot />} />
          <Route path="/research/construction-communication" element={<ConstructionComm />} />
          <Route path="/research/digital-content-marketing" element={<DigitalContentMarketing />} />
          <Route path="/research/digital-transformation" element={<DigitalTransformation />} />
          <Route path="/research/it-migrations" element={<ItMigrations />} />
          <Route path="/research/training-programs" element={<TrainingPrograms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
