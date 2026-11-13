import { Reveal } from '../Reveal';
import { FALCON_ESTATES_HOMES, PINE_WOODS_HOMES, type HomeListing } from '../../data/site';
import { withBase } from '../../lib/url';

const available = (homes: HomeListing[]) => homes.filter((h) => h.status !== 'sold').length;
const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`;

const falconReady = available(FALCON_ESTATES_HOMES);
const pineReady = available(PINE_WOODS_HOMES);

// Detail lines are derived from the listing data so a status change in
// site.ts can never leave a stale count on the homepage.
const TILES = [
  {
    label: 'Falcon Estates',
    detail: `${falconReady} move-in ready`,
    image: withBase('/assets/home/crestwood-twilight-2026.jpg'),
    href: withBase('/falcon-estates-rochester-hills'),
    position: '50% 50%',
  },
  {
    label: 'Pine Woods',
    detail: `${plural(pineReady, 'home')} ready now`,
    image: withBase('/assets/pine-woods/majestic-twilight-2.jpg'),
    href: withBase('/pine-woods'),
    position: '42% 50%',
  },
  {
    label: 'Homes Available',
    detail: `${plural(falconReady + pineReady, 'home')} ready to tour`,
    image: withBase('/assets/home/coachwood-twilight-final.jpg'),
    href: withBase('/homes-available'),
    position: '50% 50%',
  },
  {
    label: 'Gallery',
    detail: 'Portfolio photographs',
    image: withBase('/assets/home/dining-room-staged-2.jpg'),
    href: withBase('/gallery'),
    position: '62% 50%',
  },
];

export function ExploreTiles() {
  return (
    <div className="explore-tiles">
      {TILES.map((tile, i) => (
        <Reveal key={tile.label} type="fade-in-up" delay={i * 100}>
          <a href={tile.href} className="explore-tile">
            <img src={tile.image} alt="" loading="lazy" style={{ objectPosition: tile.position }} />
            <span className="explore-tile-frame" aria-hidden="true" />
            <span className="explore-tile-body">
              <span className="explore-tile-title">{tile.label}</span>
              <span className="explore-tile-rule" aria-hidden="true" />
              <span className="explore-tile-detail">
                {tile.detail}
                <span className="explore-tile-arrow" aria-hidden="true" />
              </span>
            </span>
          </a>
        </Reveal>
      ))}
    </div>
  );
}
