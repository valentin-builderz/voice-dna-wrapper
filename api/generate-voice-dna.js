const fs = require("node:fs");
const path = require("node:path");

const XAI_API_BASE = "https://api.x.ai/v1";
const DEFAULT_MODEL = "grok-4.3";
const PROMPT_PATH = path.join(__dirname, "voice-dna-extractor-consolidated.md");

let cachedPrompt;

function getPrompt() {
  if (!cachedPrompt) {
    cachedPrompt = fs.readFileSync(PROMPT_PATH, "utf8");
  }

  return cachedPrompt;
}

function clean(value, maxLength) {
  return String(value || "").trim().slice(0, maxLength);
}

function extractResponseText(data) {
  if (typeof data.output_text === "string" && data.output_text.trim()) {
    return data.output_text;
  }

  if (!Array.isArray(data.output)) return "";

  return data.output
    .flatMap((item) => Array.isArray(item.content) ? item.content : [])
    .filter((content) => content.type === "output_text" && content.text)
    .map((content) => content.text)
    .join("\n\n");
}

async function callGrok(input, instructions) {
  const apiKey = process.env.XAI_API_KEY || process.env.GROK_API_KEY;

  if (!apiKey) {
    throw new Error("Grok is not configured. Add XAI_API_KEY in the deployment environment.");
  }

  const response = await fetch(`${XAI_API_BASE}/responses`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.XAI_MODEL || process.env.GROK_MODEL || DEFAULT_MODEL,
      instructions,
      input,
      temperature: 0.2,
      max_output_tokens: 12000,
      text: {
        format: {
          type: "text",
        },
      },
    }),
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : {};

  if (!response.ok) {
    const message = data.error?.message || data.message || "Grok request failed";
    throw new Error(message);
  }

  return extractResponseText(data);
}

module.exports = async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed" });
  }

  const samples = clean(request.body?.samples, 180000);
  const audience = clean(request.body?.audience, 12000);
  const context = clean(request.body?.context, 12000);
  const avoid = clean(request.body?.avoid, 4000);
  const depth = clean(request.body?.depth, 100) || "standard";

  if (samples.length < 500) {
    return response.status(400).json({
      error: "Paste a larger writing sample. Voice DNA needs enough language to extract signal.",
    });
  }

  try {
    const mechanism = getPrompt();
    const voiceDna = await callGrok([
      "Run EXTRACTION mode using the full Voice DNA Extractor mechanism provided in the instructions.",
      "Do not shorten the mechanism. Apply it exactly.",
      "Because this is a web app, return the completed Voice DNA Profile directly in this response instead of writing files to disk.",
      "Include the practical prompt block the user can paste into future AI chats.",
      "",
      "=== USER CONTEXT ===",
      `Output depth: ${depth}`,
      `Audience / writing context: ${audience || "Not provided"}`,
      `Additional context: ${context || "Not provided"}`,
      `Things this person's copy should never sound like: ${avoid || "Not provided"}`,
      "",
      "=== WRITING SAMPLES TO ANALYZE ===",
      samples,
    ].join("\n"), mechanism);

    if (!voiceDna) {
      throw new Error("Grok returned an empty Voice DNA.");
    }

    return response.status(200).json({ voiceDna });
  } catch (error) {
    return response.status(502).json({ error: error.message || "Could not generate Voice DNA" });
  }
};
