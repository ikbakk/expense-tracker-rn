import { GoogleGenAI } from '@google/genai';

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
  apiKey: 'AIzaSyA7zbTnT87vqKi1o78X5cgC4NOYGzLEpuo',
});

export async function parseReceiptWithAi(rawText: string) {
  const prompt = `
You are given the raw OCR text of a shopping receipt.

Extract one expense record in format below (please make it so it can be easily parse using JSON.parse() from JavaScript:

response = {
  data: {
    "amount_cents": 12345,
    "merchant": "...",
    "date": "YYYY-MM-DD",
    "category": "Groceries",
    "description": "...",
    "receipt_text": "..."
  }
  description: a little summary max 2 sentences (example: you just insert x amount of items with total amount of x from merchan_name, dont forget at date)
}

Rules:
- "amount_cents": total in cents (integer only).
- "merchant": the store name.
- "date": ISO format (YYYY-MM-DD), or use time.now() if missing.
- "category": choose one of [Food, Groceries, Transport, Shopping, Other].
- "description": short summary of items.
- "receipt_text": always include the rawText.
- Output only valid JSON, no extra commentary.
- Please use indonesian currency when stating a summary even though the database said cents
`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-lite', // or gemini-2.0-flash if you want cheaper
    contents: [{ role: 'user', parts: [{ text: rawText }] }],
    config: {
      thinkingConfig: { thinkingBudget: 0 },
      systemInstruction: prompt,
      temperature: 0.2,
    },
  });

  console.log('response', response);

  const rawTextResponse = response.text;
  const cleanedText = cleanAiJson(rawTextResponse || '');

  try {
    return JSON.parse(cleanedText);
  } catch (err) {
    console.error('Failed to parse AI JSON:', cleanedText, err);
    return { data: null, description: '' };
  }
}

function cleanAiJson(raw: string) {
  // Remove ```json fences
  const cleaned = raw
    .replace(/```json\s*/i, '')
    .replace(/```$/, '')
    .trim();

  // Sometimes AI adds extra newlines or whitespace
  return cleaned;
}
