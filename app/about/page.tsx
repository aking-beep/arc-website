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
    "Andrew King founded ARC to bring Fortune 100/500 delivery standards to 10–500 person companies, nonprofits, and teams.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="About"
        title="A small practice for mid-size problems."
        lead="ARC is Andrew King plus the tools, research, and workshops around the same method. We help companies, nonprofits, and teams of about 10 to 500 people figure out what to do about data, security, architecture, and AI — then we ship the system."
      />

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
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {site.founder.scope.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-lg border border-border bg-background/60 px-4 py-3"
                  >
                    <div className="text-lg font-semibold tracking-tight">
                      {item.metric}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{item.label}</p>
                  </div>
                ))}
              </div>
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
          kicker="What we mean"
          title="Digital transformation, without the fog."
          lead="It is not one product, and it is not an AI project with a bow on it. It is how an organization changes technology, process, and people together so the work still holds as the stack moves. That is the job."
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
        <SectionHeading
          kicker="The practice"
          title="Four parts. Same standard."
          lead="Tools so you can see how we think. Studio for the paid work. Research for the arguments. Workshops when the room is the problem."
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

      <Section>
        <SectionHeading
          kicker="Who it's for"
          title="Mid-size organizations with a real problem."
          lead="Companies, nonprofits, and teams of about 10 to 500 people are the commercial focus. Smaller groups are welcome when the same method fits. They are not who the homepage is written for."
        />
      </Section>

      <Section className="bg-muted/30">
        <SectionHeading
          kicker="FAQ"
          title="Straight answers."
          lead="The questions that come up on almost every call."
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
              title="Thirty minutes. No deck."
              lead="We'll listen, ask the hard questions, and tell you whether ARC is the right next step — including when it isn't."
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
            <h3 className="text-lg font-semibold">Send a note</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              A person writes back within one business day.
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
