import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { DashboardShell } from "@/components/dashboard-shell";
import { runResearch } from "@/lib/ai.functions";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant — Aurora AI" },
      {
        name: "description",
        content: "Turn any topic into a clear, structured research brief in seconds.",
      },
      { property: "og:title", content: "AI Research Assistant — Aurora AI" },
      {
        property: "og:description",
        content: "Turn any topic into a clear, structured research brief in seconds.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  const run = useServerFn(runResearch);
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!topic.trim() || loading) return;
    setLoading(true);
    setResult("");
    try {
      const res = await run({ data: { topic } });
      setResult(res.text);
    } catch {
      toast.error("Couldn't run the research. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <DashboardShell
      title="AI Research Assistant"
      description="Give Aurora AI a topic or question and get a structured brief back."
    >
      <form onSubmit={onSubmit} className="tool-card space-y-4">
        <label className="text-sm font-medium">Topic or question</label>
        <textarea
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          rows={4}
          placeholder="How are mid-size SaaS companies pricing AI features in 2026?"
          className="w-full rounded-2xl border border-border bg-secondary p-4 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
        />
        <button
          type="submit"
          disabled={loading || !topic.trim()}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/85 disabled:opacity-50"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading ? "Researching…" : "Create brief"}
        </button>
      </form>

      {result && (
        <section className="tool-card mt-6">
          <h2 className="text-lg font-semibold">Research brief</h2>
          <pre className="mt-4 whitespace-pre-wrap font-sans text-sm leading-relaxed">{result}</pre>
        </section>
      )}
    </DashboardShell>
  );
}
