import { useMotionPreference } from './hooks/useMotionPreference';
import { CinematicExperience } from './components/CinematicExperience';
import { TwoDExperience } from './components/TwoDExperience';
import { SimpleHome } from './components/simple/SimpleHome';
import { HomesAvailablePage } from './components/simple/HomesAvailablePage';
import { PineWoodsPage } from './components/simple/PineWoodsPage';
import { ContactUsPage } from './components/simple/ContactUsPage';
import { HomeDetailPage } from './components/simple/HomeDetailPage';
import { GrandeurPage } from './components/simple/GrandeurPage';
import { CrestwoodPage } from './components/simple/CrestwoodPage';
import { CambridgePage } from './components/simple/CambridgePage';
import { FalconEstatesPage } from './components/simple/FalconEstatesPage';
import { ClassicHomePage } from './components/simple/ClassicHomePage';
import { Classic2HomePage } from './components/simple/Classic2HomePage';
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
  // on the live landrhomes.com site that didn't exist in this build yet;
  // `/classic` is a third homepage variant styled after a bold-sans,
  // video-hero homebuilder marketing template (requested to mimic
  // lassalehomes.com's layout), built from L&R's own copy and photography.
  // Normalize against the deploy base ("/" in dev, a GitHub Pages project
  // subpath in prod) so route matching below works in both.
  const rawPath = typeof window !== 'undefined' ? window.location.pathname : '';
  const base = import.meta.env.BASE_URL;
  const path = rawPath.startsWith(base) ? `/${rawPath.slice(base.length)}` : rawPath;
  if (path.startsWith('/gallery')) return <GalleryPage />;
  if (path.startsWith('/homes-available')) return <HomesAvailablePage />;
  if (path.startsWith('/grandeur')) return <GrandeurPage />;
  if (path.startsWith('/crestwood')) return <CrestwoodPage />;
  if (path.startsWith('/cambridge')) return <CambridgePage />;
  if (path.startsWith('/falcon-estates')) return <FalconEstatesPage />;
  if (path.startsWith('/majestic')) return <HomeDetailPage home={HOME_DETAILS.majestic} />;
  if (path.startsWith('/heritage')) return <HomeDetailPage home={HOME_DETAILS.heritage} />;
  if (path.startsWith('/pine-woods')) return <PineWoodsPage />;
  if (path.startsWith('/contact-us')) return <ContactUsPage />;
  if (path.startsWith('/classic2')) return <Classic2HomePage />;
  if (path.startsWith('/classic')) return <ClassicHomePage />;
  if (path.startsWith('/simple')) return <SimpleHome />;

  return mode === 'cinematic' ? <CinematicExperience /> : <TwoDExperience />;
}

export default App;
