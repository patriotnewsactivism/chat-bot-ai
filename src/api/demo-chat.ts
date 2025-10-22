import { Request, Response } from 'express';
import OpenAI from 'openai';

/**
 * Server-side demo chat handler.
 * - Validates input
 * - Limits history length and sanitizes messages
 * - Uses server-only OPENAI_API_KEY (DO NOT expose to client)
 * - Model is configurable via OPENAI_MODEL env var
 *
 * Notes:
 * - Deploy this on a server or as a serverless function (Vercel: set OPENAI_API_KEY as a Project Secret)
 * - Add rate limiting / authentication in production
 */

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const DEFAULT_MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';
const MAX_HISTORY = 10;
const MAX_TOKENS = 500;

export const handleDemoChat = async (req: Request, res: Response) => {
  try {
    const body = req.body ?? {};
    const { message, system_prompt, conversation_history } = body as {
      message?: unknown;
      system_prompt?: unknown;
      conversation_history?: unknown;
    };

    if (!message || typeof message !== 'string' || !system_prompt || typeof system_prompt !== 'string') {
      return res.status(400).json({ error: 'Missing or invalid required fields: message and system_prompt' });
    }

    // Normalize conversation history
    const historyArray = Array.isArray(conversation_history) ? conversation_history : [];
    const safeHistory = historyArray
      .filter((m: any) =>
        m &&
        (m.role === 'user' || m.role === 'assistant') &&
        typeof m.content === 'string'
      )
      .slice(-MAX_HISTORY);

    const messages = [
      { role: 'system', content: system_prompt },
      ...safeHistory,
      { role: 'user', content: message },
    ];

    // Call OpenAI (server-side only)
    const response = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      messages,
      temperature: 0.7,
      max_tokens: MAX_TOKENS,
      presence_penalty: 0.1,
    });

    // Extract text safely (SDK response shape may vary)
    const reply = response?.choices?.[0]?.message?.content ?? 'No reply from model';

    return res.status(200).json({ reply });
  } catch (err) {
    console.error('Demo chat error:', err);
    return res.status(500).json({ error: 'Demo chat failed' });
  }
};

export default handleDemoChat;
