import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';

export function NotFound() {
  return (
    <section className="py-24">
      <Container>
        <p className="font-mono text-[13px] text-ink-3">404</p>
        <h1 className="mt-4 font-serif text-[44px] leading-tight text-ink">That page isn’t here.</h1>
        <p className="mt-4 max-w-[520px] text-[17px] text-ink-2">It may have moved in the redesign. These are the main places to go.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button to="/">Home</Button>
          <Button to="/control" variant="secondary">ARC Control</Button>
          <Button to="/labs" variant="secondary">ARC Labs</Button>
          <Button to="/contact" variant="secondary">Talk to ARC</Button>
        </div>
      </Container>
    </section>
  );
}
