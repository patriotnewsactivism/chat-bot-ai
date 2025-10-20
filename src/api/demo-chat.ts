import { Request, Response } from 'express';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface DemoChatRequest {
  message: string;
  system_prompt: string;
  conversation_history: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
}

export const handleDemoChat = async (req: Request, res: Response) => {
  try {
    const { message, system_prompt, conversation_history }: DemoChatRequest = req.body;

    if (!message || !system_prompt) {
      return res.status(400).json({
        error: 'Missing required fields: message and system_prompt'
      });
    }

    // Build messages for OpenAI API
    const messages = [
      { role: 'system', content: system_prompt },
      ...conversation_history.slice(-10), // Last 10 messages for context
      { role: 'user', content: message }
    ];

    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: messages,
      temperature: 0.7,
      max_tokens: 500,
      presence_penalty: 0.1,
      frequency_penalty: 0.1
    });

    const botResponse = response.choices[0].message.content;

    // Check if response suggests upgrade
    const suggestsUpgrade = botResponse.toLowerCase().includes('upgrade') || 
                           botResponse.toLowerCase().includes('limit') ||
                           botResponse.toLowerCase().includes('professional');

    return res.json({
      response: botResponse,
      suggests_upgrade: suggestsUpgrade,
      model: 'gpt-4-turbo-preview',
      tokens_used: response.usage?.total_tokens || 0
    });

  } catch (error) {
    console.error('Demo chat API error:', error);
    
    return res.status(500).json({
      error: 'Failed to generate response',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Rate limiting middleware
export const demoChatRateLimit = async (req: Request, res: Response, next: Function) => {
  const clientIP = req.ip || req.connection.remoteAddress;
  const key = `demo_chat:${clientIP}`;
  
  try {
    // Check rate limit (10 requests per minute)
    const current = await redisClient.get(key);
    if (current && parseInt(current) > 10) {
      return res.status(429).json({
        error: 'Rate limit exceeded',
        message: 'Please wait before sending another message'
      });
    }
    
    // Increment counter
    await redisClient.incr(key);
    await redisClient.expire(key, 60); // 1 minute TTL
    
    next();
  } catch (error) {
    console.error('Rate limiting error:', error);
    next(); // Continue without rate limiting if Redis fails
  }
};