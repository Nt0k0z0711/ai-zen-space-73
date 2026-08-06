import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const EmailInput = z.object({
  purpose: z.string().min(1),
  recipient: z.string().optional(),
  tone: z.string().min(1),
});

const ResearchInput = z.object({
  topic: z.string().min(1),
});

export const generateEmail = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => EmailInput.parse(input))
  .handler(async ({ data }) => {
    const { runPrompt } = await import("./ai.server");
    return {
      text: await runPrompt(
        "You are an expert business writer. Write a complete, ready-to-send email. Output only the email, starting with a Subject: line.",
        `Purpose: ${data.purpose}\nRecipient: ${data.recipient || "unspecified"}\nTone: ${data.tone}`,
      ),
    };
  });

export const runResearch = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ResearchInput.parse(input))
  .handler(async ({ data }) => {
    const { runPrompt } = await import("./ai.server");
    return {
      text: await runPrompt(
        "You are a sharp research assistant. Produce a concise markdown-free brief with: Overview, Key Points (bulleted with '-'), Considerations, and Suggested Next Steps.",
        `Topic: ${data.topic}`,
      ),
    };
  });
