import { useMotionPreference } from './hooks/useMotionPreference';
import { CinematicExperience } from './components/CinematicExperience';
import { TwoDExperience } from './components/TwoDExperience';
import { SimpleHome } from './components/simple/SimpleHome';
import { GalleryPage } from './components/GalleryPage';

function App() {
  const mode = useMotionPreference();

  // Lightweight path-based routing — a full router is unwarranted for a
  // handful of static routes. `/simple` is the conventional rh.house-style
  // homepage, requested as an alternative alongside the cinematic
  // experience rather than a replacement for it; `/gallery` is the full
  // photo gallery every "View Full Gallery" link on the site points to.
  const path = typeof window !== 'undefined' ? window.location.pathname : '';
  if (path.startsWith('/gallery')) return <GalleryPage />;
  if (path.startsWith('/simple')) return <SimpleHome />;

  return mode === 'cinematic' ? <CinematicExperience /> : <TwoDExperience />;
}

export default App;
