import { HashRouter, Route, Routes } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { RouteEffects } from './components/RouteEffects';
import { Home } from './pages/Home';
import { Control } from './pages/Control';
import { Labs } from './pages/Labs';
import { Services } from './pages/Services';
import { Research } from './pages/Research';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <HashRouter>
        <RouteEffects />
        <div className="flex flex-col bg-canvas font-sans text-ink">
          <a
            href="#main"
            className="sr-only-focusable fixed left-4 top-3 z-[60] rounded-md bg-ink px-4 py-2 text-sm font-medium text-white"
          >
            Skip to content
          </a>
          <Nav />
          <main id="main" tabIndex={-1} className="flex-1 outline-none">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/control" element={<Control />} />
              <Route path="/labs" element={<Labs />} />
              <Route path="/services" element={<Services />} />
              <Route path="/research" element={<Research />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </MotionConfig>
  );
}
