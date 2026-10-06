import { useEffect } from 'react';
import { useAppPath, installLinkInterceptor } from './lib/router';
import { titleForPath } from './data/routeTitles';
import { SimpleHome } from './components/simple/SimpleHome';
import { HomesAvailablePage } from './components/simple/HomesAvailablePage';
import { PineWoodsPage } from './components/simple/PineWoodsPage';
import { ContactUsPage } from './components/simple/ContactUsPage';
import { HomeDetailPage } from './components/simple/HomeDetailPage';
import { GrandeurPage } from './components/simple/GrandeurPage';
import { CrestwoodPage } from './components/simple/CrestwoodPage';
import { CambridgePage } from './components/simple/CambridgePage';
import { StratfordPage } from './components/simple/StratfordPage';
import { MadisonPage } from './components/simple/MadisonPage';
import { FalconEstatesPage } from './components/simple/FalconEstatesPage';
import { ClassicHomePage } from './components/simple/ClassicHomePage';
import { Classic2HomePage } from './components/simple/Classic2HomePage';
import { NotFoundPage } from './components/simple/NotFoundPage';
import { Suite101Page } from './components/simple/Suite101Page';
import { GalleryPage } from './components/GalleryPage';
import { HOME_DETAILS } from './data/site';

function App() {
  // Lightweight path-based routing — a full router is unwarranted for a
  // handful of static routes. `/classic2` is the homepage; `/simple` and
  // `/classic` are earlier alternative homepage designs kept reachable at
  // their own paths; `/gallery` is the full photo gallery every "View Full
  // Gallery" link on the site points to; `/homes-available`, `/pine-woods`,
  // and `/contact-us` mirror real pages on the live landrhomes.com site
  // that didn't exist in this build yet.
  // `useAppPath` (src/lib/router.ts) tracks the current route reactively —
  // both browser back/forward and this app's own intercepted link clicks
  // (installed below) update it without a full page reload — and already
  // normalizes against the deploy base ("/" in dev, a GitHub Pages project
  // subpath in prod), so route matching below works in both.
  useEffect(() => {
    installLinkInterceptor();
  }, []);

  const path = useAppPath();

  // Keeps the browser tab title correct on every route change, including
  // back/forward navigation — the static per-route <title> that
  // scripts/prerender-meta.mjs writes only covers the initial full load.
  useEffect(() => {
    document.title = titleForPath(path);
  }, [path]);

  if (path === '/' || path === '') return <Classic2HomePage />;
  if (path.startsWith('/gallery')) return <GalleryPage />;
  if (path.startsWith('/homes-available')) return <HomesAvailablePage />;
  if (path.startsWith('/grandeur')) return <GrandeurPage />;
  if (path.startsWith('/crestwood')) return <CrestwoodPage />;
  if (path.startsWith('/cambridge')) return <CambridgePage />;
  if (path.startsWith('/stratford')) return <StratfordPage />;
  if (path.startsWith('/madison')) return <MadisonPage />;
  if (path.startsWith('/falcon-estates')) return <FalconEstatesPage />;
  if (path.startsWith('/majestic')) return <HomeDetailPage home={HOME_DETAILS.majestic} />;
  if (path.startsWith('/heritage')) return <HomeDetailPage home={HOME_DETAILS.heritage} />;
  if (path.startsWith('/pine-woods')) return <PineWoodsPage />;
  if (path.startsWith('/contact-us')) return <ContactUsPage />;
  if (path.startsWith('/suite-101')) return <Suite101Page />;
  if (path.startsWith('/classic2')) return <Classic2HomePage />;
  if (path.startsWith('/classic')) return <ClassicHomePage />;
  if (path.startsWith('/simple')) return <SimpleHome />;

  return <NotFoundPage />;
}

export default App;
