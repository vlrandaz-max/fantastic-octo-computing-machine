import { useMotionPreference } from './hooks/useMotionPreference';
import { CinematicExperience } from './components/CinematicExperience';
import { TwoDExperience } from './components/TwoDExperience';
import { SimpleHome } from './components/simple/SimpleHome';
import { HomesAvailablePage } from './components/simple/HomesAvailablePage';
import { PineWoodsPage } from './components/simple/PineWoodsPage';
import { ContactUsPage } from './components/simple/ContactUsPage';
import { HomeDetailPage } from './components/simple/HomeDetailPage';
import { GrandeurPage } from './components/simple/GrandeurPage';
import { FalconEstatesPage } from './components/simple/FalconEstatesPage';
import { GalleryPage } from './components/GalleryPage';
import { HOME_DETAILS } from './data/site';

function App() {
  const mode = useMotionPreference();

  // Lightweight path-based routing — a full router is unwarranted for a
  // handful of static routes. `/simple` is the conventional rh.house-style
  // homepage, requested as an alternative alongside the cinematic
  // experience rather than a replacement for it; `/gallery` is the full
  // photo gallery every "View Full Gallery" link on the site points to;
  // `/homes-available`, `/pine-woods`, and `/contact-us` mirror real pages
  // on the live landrhomes.com site that didn't exist in this build yet.
  const path = typeof window !== 'undefined' ? window.location.pathname : '';
  if (path.startsWith('/gallery')) return <GalleryPage />;
  if (path.startsWith('/homes-available')) return <HomesAvailablePage />;
  if (path.startsWith('/grandeur')) return <GrandeurPage />;
  if (path.startsWith('/falcon-estates')) return <FalconEstatesPage />;
  if (path.startsWith('/majestic')) return <HomeDetailPage home={HOME_DETAILS.majestic} />;
  if (path.startsWith('/heritage')) return <HomeDetailPage home={HOME_DETAILS.heritage} />;
  if (path.startsWith('/pine-woods')) return <PineWoodsPage />;
  if (path.startsWith('/contact-us')) return <ContactUsPage />;
  if (path.startsWith('/simple')) return <SimpleHome />;

  return mode === 'cinematic' ? <CinematicExperience /> : <TwoDExperience />;
}

export default App;
