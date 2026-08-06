import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, Search, MessageSquare, ShieldCheck } from "lucide-react";
import { DashboardSidebar } from "@/components/dashboard-sidebar";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aurora AI — Productivity Dashboard" },
      {
        name: "description",
        content:
          "Three focused AI tools for professionals: write better emails, digest research and get instant answers.",
      },
      { property: "og:title", content: "Aurora AI — Productivity Dashboard" },
      {
        property: "og:description",
        content:
          "Write better emails, digest research and get instant answers with three focused AI tools.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const cards = [
  {
    icon: Mail,
    title: "Smart Email Generator",
    description: "Draft polished emails with the right tone in seconds.",
    to: "/email",
  },
  {
    icon: Search,
    title: "AI Research Assistant",
    description: "Turn topics, articles or links into a clear research brief.",
    to: "/research",
  },
  {
    icon: MessageSquare,
    title: "AI Chatbot",
    description: "Ask questions, brainstorm ideas and plan your work.",
    to: "/chat",
  },
] as const;


function Index() {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <DashboardSidebar />

      <main className="flex-1 animate-fade-up px-5 py-8 sm:px-10 sm:py-12">
        <div className="mx-auto w-full max-w-[1400px]">
          <section className="hero-gradient rounded-[24px] p-8 sm:p-10">
            <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-hero-foreground sm:text-[36px] sm:leading-tight">
              Work faster with AI
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-hero-foreground/85">
              Three focused tools for professionals: write better emails, digest research and get
              instant answers. No account needed — everything stays in this browser session.
            </p>
          </section>

          <section className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((card) => (
              <article key={card.title} className="tool-card">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent text-accent-foreground">
                  <card.icon className="h-5 w-5" />
                </span>
                <h2 className="mt-6 text-[22px] font-semibold tracking-tight">{card.title}</h2>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                  {card.description}
                </p>
                <button className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/85">
                  Open <span aria-hidden>→</span>
                </button>
              </article>
            ))}
          </section>

          <section className="mt-8 flex items-start gap-3 rounded-[16px] border border-border bg-card p-6">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              AI-generated content is intended to assist with productivity and should be reviewed
              for accuracy before being used in professional or business communications.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
