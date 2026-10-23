import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { routeMeta } from '../data/site';

/**
 * On navigation: reset scroll, update <title> and meta description, and move
 * focus to <main> so screen-reader users hear the new page rather than nothing.
 */
export function RouteEffects() {
  const { pathname } = useLocation();
  const first = useRef(true);

  useEffect(() => {
    const meta = routeMeta[pathname] ?? routeMeta['/'];
    document.title = meta.title;
    let tag = document.querySelector('meta[name="description"]');
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('name', 'description');
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', meta.description);

    if (first.current) {
      first.current = false;
      return;
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
    document.getElementById('main')?.focus({ preventScroll: true });
  }, [pathname]);

  return null;
}
