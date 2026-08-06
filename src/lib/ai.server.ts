import { streamText } from "ai";
import { AI_MODEL, createLovableAiGatewayProvider, requireApiKey } from "./ai-gateway.server";

export async function runPrompt(system: string, prompt: string): Promise<string> {
  const gateway = createLovableAiGatewayProvider(requireApiKey());
  const result = streamText({
    model: gateway(AI_MODEL),
    system,
    prompt,
  });
  return await result.text;
}
