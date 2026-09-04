import { useMotionPreference } from './hooks/useMotionPreference';
import { CinematicExperience } from './components/CinematicExperience';
import { TwoDExperience } from './components/TwoDExperience';

function App() {
  const mode = useMotionPreference();
  return mode === 'cinematic' ? <CinematicExperience /> : <TwoDExperience />;
}

export default App;
