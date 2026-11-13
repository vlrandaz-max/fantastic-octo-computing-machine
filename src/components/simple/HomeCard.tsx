import type { HomeListing } from '../../data/site';
import { STATUS_LABEL } from '../../data/site';
import { withBase } from '../../lib/url';

/** A single home listing, styled as the same full-photograph tile as the homepage Explore row. */
export function HomeCard({ home }: { home: HomeListing }) {
  const sold = home.status === 'sold';
  return (
    <a href={home.href ?? withBase('/contact-us')} className={`explore-tile home-tile${sold ? ' is-sold' : ''}`}>
      <img src={home.image} alt="" loading="lazy" />
      <span className="explore-tile-frame" aria-hidden="true" />
      <span className="explore-tile-body">
        <span className="explore-tile-title">{home.name}</span>
        <span className="explore-tile-rule" aria-hidden="true" />
        <span className="explore-tile-detail">
          <span className="home-tile-status">{STATUS_LABEL[home.status]}</span>
          <span className="explore-tile-arrow" aria-hidden="true" />
        </span>
      </span>
    </a>
  );
}
