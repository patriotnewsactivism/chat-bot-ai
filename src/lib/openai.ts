import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // For demo - move to backend in production
});

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export async function* streamChatCompletion(
  messages: Message[],
  systemPrompt: string,
  knowledgeBase?: string
) {
  try {
    // Prepare messages with system prompt and knowledge base
    const systemMessage: Message = {
      role: 'system',
      content: systemPrompt + (knowledgeBase ? `\n\nKnowledge Base:\n${knowledgeBase}` : '')
    };

    const stream = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Cost-effective model
      messages: [systemMessage, ...messages],
      stream: true,
      temperature: 0.7,
      max_tokens: 1000,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        yield content;
      }
    }
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('Failed to get response from AI. Please try again.');
  }
}

export async function getChatCompletion(
  messages: Message[],
  systemPrompt: string,
  knowledgeBase?: string
): Promise<string> {
  try {
    const systemMessage: Message = {
      role: 'system',
      content: systemPrompt + (knowledgeBase ? `\n\nKnowledge Base:\n${knowledgeBase}` : '')
    };

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [systemMessage, ...messages],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return response.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('Failed to get response from AI. Please try again.');
  }
}