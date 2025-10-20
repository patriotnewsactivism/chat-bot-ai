import express from 'express';
import cors from 'cors';
import { db } from './db.js';
import { chatbots, conversations, messages, users } from '../shared/schema.js';
import { eq, and, desc } from 'drizzle-orm';
import stripeRouter from './routes/stripe.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/stripe', stripeRouter);

app.get('/api/chatbots', async (req, res) => {
  try {
    const userId = req.query.userId as string;
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const bots = await db
      .select()
      .from(chatbots)
      .where(eq(chatbots.userId, userId))
      .orderBy(desc(chatbots.createdAt));

    res.json(bots);
  } catch (error) {
    console.error('Error fetching chatbots:', error);
    res.status(500).json({ error: 'Failed to fetch chatbots' });
  }
});

app.get('/api/chatbots/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [bot] = await db
      .select()
      .from(chatbots)
      .where(eq(chatbots.id, id));

    if (!bot) {
      return res.status(404).json({ error: 'Chatbot not found' });
    }

    res.json(bot);
  } catch (error) {
    console.error('Error fetching chatbot:', error);
    res.status(500).json({ error: 'Failed to fetch chatbot' });
  }
});

app.post('/api/chatbots', async (req, res) => {
  try {
    const { userId, name, description, template, config, knowledgeBase, widgetSettings } = req.body;

    if (!userId || !name) {
      return res.status(400).json({ error: 'User ID and name are required' });
    }

    const [newBot] = await db
      .insert(chatbots)
      .values({
        userId,
        name,
        description,
        template,
        status: 'active',
        config,
        knowledgeBase,
        widgetSettings,
      })
      .returning();

    res.json(newBot);
  } catch (error) {
    console.error('Error creating chatbot:', error);
    res.status(500).json({ error: 'Failed to create chatbot' });
  }
});

app.put('/api/chatbots/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, config, knowledgeBase, widgetSettings, status } = req.body;

    const [updatedBot] = await db
      .update(chatbots)
      .set({
        name,
        description,
        config,
        knowledgeBase,
        widgetSettings,
        status,
        updatedAt: new Date(),
      })
      .where(eq(chatbots.id, id))
      .returning();

    if (!updatedBot) {
      return res.status(404).json({ error: 'Chatbot not found' });
    }

    res.json(updatedBot);
  } catch (error) {
    console.error('Error updating chatbot:', error);
    res.status(500).json({ error: 'Failed to update chatbot' });
  }
});

app.delete('/api/chatbots/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await db
      .delete(chatbots)
      .where(eq(chatbots.id, id));

    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting chatbot:', error);
    res.status(500).json({ error: 'Failed to delete chatbot' });
  }
});

app.get('/api/conversations/:chatbotId', async (req, res) => {
  try {
    const { chatbotId } = req.params;

    const convos = await db
      .select()
      .from(conversations)
      .where(eq(conversations.chatbotId, chatbotId))
      .orderBy(desc(conversations.createdAt));

    res.json(convos);
  } catch (error) {
    console.error('Error fetching conversations:', error);
    res.status(500).json({ error: 'Failed to fetch conversations' });
  }
});

app.get('/api/messages/:conversationId', async (req, res) => {
  try {
    const { conversationId } = req.params;

    const msgs = await db
      .select()
      .from(messages)
      .where(eq(messages.conversationId, conversationId))
      .orderBy(messages.createdAt);

    res.json(msgs);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

app.post('/api/chat', async (req, res) => {
  try {
    const { chatbotId, conversationId, message, visitorId } = req.body;

    if (!chatbotId || !message || !visitorId) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const [chatbot] = await db
      .select()
      .from(chatbots)
      .where(eq(chatbots.id, chatbotId));

    if (!chatbot) {
      return res.status(404).json({ error: 'Chatbot not found' });
    }

    let currentConversationId = conversationId;
    if (!currentConversationId) {
      const [newConv] = await db
        .insert(conversations)
        .values({
          chatbotId,
          sessionId: visitorId,
          visitorId,
        })
        .returning();

      currentConversationId = newConv.id;
    }

    await db.insert(messages).values({
      conversationId: currentConversationId,
      role: 'user',
      content: message,
    });

    const history = await db
      .select()
      .from(messages)
      .where(eq(messages.conversationId, currentConversationId))
      .orderBy(messages.createdAt)
      .limit(20);

    const config = chatbot.config as any;
    const systemPrompt = config?.systemPrompt || 'You are a helpful AI assistant.';
    const knowledgeBase = chatbot.knowledgeBase as any;
    let fullSystemPrompt = systemPrompt;
    if (knowledgeBase && typeof knowledgeBase === 'string') {
      fullSystemPrompt += `\n\nKnowledge Base:\n${knowledgeBase}`;
    }

    const messageHistory = [
      { role: 'system', content: fullSystemPrompt },
      ...history.map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      })),
    ];

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_API_KEY) {
      return res.status(500).json({ error: 'OpenAI API key not configured' });
    }

    const aiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: messageHistory,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('OpenAI API error:', aiResponse.status, errorText);
      return res.status(500).json({ error: 'AI service error' });
    }

    const aiData: any = await aiResponse.json();
    const assistantMessage = aiData.choices[0].message.content;

    await db.insert(messages).values({
      conversationId: currentConversationId,
      role: 'assistant',
      content: assistantMessage,
    });

    res.json({
      message: assistantMessage,
      conversationId: currentConversationId,
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
