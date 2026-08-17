import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Linkedin, Mail } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/contact-form";
import { FaqList } from "@/components/faq-list";
import { digitalTransformation, faqs, pillars, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "About & contact",
  description:
    "Meet Andrew King and ARC Transformation Group: digital transformation for companies, nonprofits, individuals, and communities who want to keep pace without getting left behind.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="About"
        title="One honest partner across strategy, build, and scale."
        lead="ARC started as an advisory practice and grew into an ecosystem. The through-line never changed: name the stage, show the work, and help companies, nonprofits, teams, and communities keep pace with digital change."
      />

      <Section>
        <SectionHeading
          kicker="What we mean"
          title="Digital transformation, in plain terms."
          lead="Digital transformation is not one product or one AI project. It is how organizations and communities change technology, process, and people together so they keep delivering value as the digital world moves. That is what ARC focuses on."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {digitalTransformation.map((item) => (
            <div
              key={item.name}
              className="rounded-lg border border-border bg-card p-5"
            >
              <h3 className="text-sm font-semibold">{item.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-muted/30">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.35fr] lg:items-start">
          <div>
            <SectionHeading
              kicker="Founder"
              title={site.founder.name}
              lead={site.founder.role}
            />
          </div>
          <div className="space-y-6">
            <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
              <p className="text-base leading-relaxed text-muted-foreground">
                {site.founder.bio}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href={site.calendly} size="sm">
                  Book a call
                </Button>
                <Button href={`mailto:${site.email}`} variant="outline" size="sm">
                  Email Andrew
                </Button>
                <Button href={site.linkedin} variant="outline" size="sm">
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </Button>
              </div>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {site.founder.highlights.map((h) => (
                <li
                  key={h}
                  className="rounded-lg border border-border bg-background/60 px-4 py-3 text-sm leading-relaxed text-muted-foreground"
                >
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading
          kicker="Why an ecosystem"
          title="Every part feeds the next."
          lead="Free tools build trust. Trust opens the door to advisory work. What we learn becomes research and workshops. Each part feeds the next."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <Link
              key={p.id}
              href={p.href}
              className="rounded-lg border border-border bg-card p-5 transition-all hover:border-foreground/20 hover:shadow-sm"
            >
              <h3 className="text-sm font-semibold">{p.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {p.summary}
              </p>
            </Link>
          ))}
        </div>
      </Section>

      <Section className="bg-muted/30">
        <SectionHeading
          kicker="FAQ"
          title="Straight answers."
          lead="The questions we get on almost every discovery call."
        />
        <div className="mt-10 max-w-3xl">
          <FaqList items={faqs} />
        </div>
      </Section>

      <Section id="contact">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeading
              kicker="Get in touch"
              title="Let's see if there's a fit."
              lead="A 30-minute discovery call. No pitch deck, no commitment. We'll listen, ask the hard questions, and tell you straight up whether ARC is the right partner, even if the answer is no."
            />
            <div className="mt-8 flex flex-col gap-3">
              <Button href={site.calendly} size="lg">
                <Calendar className="h-4 w-4" />
                Book a 30-min discovery call
              </Button>
              <Button
                href={`mailto:${site.email}?subject=Discovery%20call%20request`}
                variant="outline"
                size="lg"
              >
                <Mail className="h-4 w-4" />
                Email Andrew directly
              </Button>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
            <h3 className="text-lg font-semibold">Send a quick note</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              We read every message. A real human writes back within one business
              day.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
