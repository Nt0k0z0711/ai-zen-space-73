import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { DashboardShell } from "@/components/dashboard-shell";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Chatbot — Aurora AI" },
      {
        name: "description",
        content: "Ask questions, brainstorm ideas and plan your work with Aurora AI.",
      },
      { property: "og:title", content: "AI Chatbot — Aurora AI" },
      {
        property: "og:description",
        content: "Ask questions, brainstorm ideas and plan your work with Aurora AI.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ChatPage,
});

function ChatPage() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    onError: () => toast.error("The assistant is unavailable right now. Please try again."),
  });
  const isLoading = status === "submitted" || status === "streaming";

  return (
    <DashboardShell
      title="AI Chatbot"
      description="Ask anything — Aurora AI answers in real time as it thinks."
    >
      <div className="tool-card flex h-[540px] flex-col">
        <div className="flex-1 space-y-4 overflow-y-auto pr-1">
          {messages.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Start the conversation — try “Plan my week around three deadlines”.
            </p>
          )}
          {messages.map((m) => (
            <div key={m.id} className={m.role === "user" ? "text-right" : "text-left"}>
              <div
                className={`inline-block max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground"
                }`}
              >
                {m.parts.map((p, i) => (p.type === "text" ? <span key={i}>{p.text}</span> : null))}
              </div>
            </div>
          ))}
          {isLoading && <p className="text-sm text-muted-foreground">Aurora AI is typing…</p>}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!input.trim() || isLoading) return;
            sendMessage({ text: input.trim() });
            setInput("");
          }}
          className="mt-4 flex items-center gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Aurora AI anything…"
            className="flex-1 rounded-full border border-border bg-secondary px-5 py-3 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            aria-label="Send message"
            className="grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/85 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </DashboardShell>
  );
}
