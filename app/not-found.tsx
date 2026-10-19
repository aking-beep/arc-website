import { Container } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-mono text-sm text-muted-foreground">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
        That page isn&rsquo;t here.
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        The link is broken, or the page moved. The free scan, the assessment,
        and the research briefs are the three places to look.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button href="/labs/arc-agent-governance">Run the free scan</Button>
        <Button href="/assessment" variant="outline">
          The assessment
        </Button>
        <Button href="/" variant="ghost">
          Home
        </Button>
      </div>
    </Container>
  );
}
