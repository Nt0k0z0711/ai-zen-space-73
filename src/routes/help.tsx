import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard-shell";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Help — Aurora AI" },
      { name: "description", content: "How to get the most out of Aurora AI's productivity tools." },
      { property: "og:title", content: "Help — Aurora AI" },
      {
        property: "og:description",
        content: "How to get the most out of Aurora AI's productivity tools.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HelpPage,
});

const faqs = [
  {
    q: "How does the Smart Email Generator work?",
    a: "Describe the purpose of the email, who it's for and the tone you want. Aurora AI returns a complete draft with a subject line that you can copy straight into your mail client.",
  },
  {
    q: "What does the Research Assistant return?",
    a: "A structured brief with an overview, key points, considerations and suggested next steps. Always verify facts before using them in professional work.",
  },
  {
    q: "Is my data stored?",
    a: "No. Nothing is saved to an account — your inputs and results live only in this browser session.",
  },
];

function HelpPage() {
  return (
    <DashboardShell
      title="Help"
      description="Everything you need to know about working with Aurora AI."
    >
      <div className="space-y-4">
        {faqs.map((f) => (
          <article key={f.q} className="tool-card">
            <h2 className="text-lg font-semibold">{f.q}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
          </article>
        ))}
      </div>
    </DashboardShell>
  );
}
