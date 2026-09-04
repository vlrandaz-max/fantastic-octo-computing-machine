import { useMotionPreference } from './hooks/useMotionPreference';
import { CinematicExperience } from './components/CinematicExperience';
import { TwoDExperience } from './components/TwoDExperience';
import { SimpleHome } from './components/simple/SimpleHome';

function App() {
  const mode = useMotionPreference();

  // Lightweight path-based routing — a full router is unwarranted for two
  // static routes. `/simple` is the conventional rh.house-style homepage,
  // requested as an alternative alongside the cinematic experience rather
  // than a replacement for it.
  if (typeof window !== 'undefined' && window.location.pathname.startsWith('/simple')) {
    return <SimpleHome />;
  }

  return mode === 'cinematic' ? <CinematicExperience /> : <TwoDExperience />;
}

export default App;
