import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, Copy } from "lucide-react";
import { toast } from "sonner";
import { DashboardShell } from "@/components/dashboard-shell";
import { generateEmail } from "@/lib/ai.functions";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — Aurora AI" },
      {
        name: "description",
        content: "Draft polished, ready-to-send emails with the right tone in seconds.",
      },
      { property: "og:title", content: "Smart Email Generator — Aurora AI" },
      {
        property: "og:description",
        content: "Draft polished, ready-to-send emails with the right tone in seconds.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EmailPage,
});

const tones = ["Professional", "Friendly", "Persuasive", "Apologetic", "Concise"];

function EmailPage() {
  const run = useServerFn(generateEmail);
  const [purpose, setPurpose] = useState("");
  const [recipient, setRecipient] = useState("");
  const [tone, setTone] = useState(tones[0]!);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!purpose.trim() || loading) return;
    setLoading(true);
    setResult("");
    try {
      const res = await run({ data: { purpose, recipient, tone } });
      setResult(res.text);
    } catch {
      toast.error("Couldn't generate the email. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <DashboardShell
      title="Smart Email Generator"
      description="Describe what you need to say — Aurora AI writes the email for you."
    >
      <form onSubmit={onSubmit} className="tool-card space-y-4">
        <div>
          <label className="text-sm font-medium">What is the email about?</label>
          <textarea
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            rows={4}
            placeholder="Follow up with a client about the delayed invoice…"
            className="mt-2 w-full rounded-2xl border border-border bg-secondary p-4 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium">Recipient (optional)</label>
            <input
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Sarah, Head of Finance"
              className="mt-2 w-full rounded-2xl border border-border bg-secondary p-3 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Tone</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-border bg-secondary p-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              {tones.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          type="submit"
          disabled={loading || !purpose.trim()}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/85 disabled:opacity-50"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading ? "Writing…" : "Generate email"}
        </button>
      </form>

      {result && (
        <section className="tool-card mt-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-semibold">Your draft</h2>
            <button
              onClick={() => {
                navigator.clipboard.writeText(result);
                toast.success("Copied to clipboard");
              }}
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Copy className="h-4 w-4" /> Copy
            </button>
          </div>
          <pre className="mt-4 whitespace-pre-wrap font-sans text-sm leading-relaxed">{result}</pre>
        </section>
      )}
    </DashboardShell>
  );
}
