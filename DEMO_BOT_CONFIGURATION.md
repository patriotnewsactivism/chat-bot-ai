---
title: "Intelligent Demo Bot Configuration"
version: "1.0"
purpose: "Smart demo bot that can answer complex questions about BuildMyBot"
---

# Intelligent Demo Bot Configuration

## Overview

This document provides the complete configuration for an intelligent demo bot that can answer complex questions about BuildMyBot, including pricing, features, and technical details like "What is a conversation?"

---

## 1. Demo Bot Knowledge Base

### Core Information

```json
{
  "company": {
    "name": "BuildMyBot",
    "website": "https://buildmybot.app",
    "description": "AI-powered chatbot builder for businesses",
    "tagline": "Create intelligent chatbots without coding",
    "founded": "2024",
    "support_email": "support@buildmybot.app",
    "affiliates_email": "affiliates@buildmybot.app"
  },
  
  "pricing": {
    "plans": [
      {
        "name": "Free",
        "price_monthly": 0,
        "price_annual": 0,
        "conversations": 100,
        "chatbots": 1,
        "features": [
          "1 chatbot",
          "100 conversations per month",
          "Basic AI responses",
          "Website embed",
          "Basic analytics",
          "Community support",
          "BuildMyBot branding"
        ],
        "limitations": [
          "Only 100 conversations/month",
          "Only 1 chatbot",
          "BuildMyBot branding required",
          "No custom training",
          "No integrations",
          "7-day conversation history"
        ]
      },
      {
        "name": "Starter",
        "price_monthly": 29,
        "price_annual": 244,
        "annual_savings": 104,
        "conversations": 1000,
        "chatbots": 3,
        "features": [
          "3 chatbots",
          "1,000 conversations per month",
          "Advanced AI responses",
          "Custom training",
          "Remove branding",
          "Email support",
          "30-day conversation history",
          "Basic integrations"
        ]
      },
      {
        "name": "Professional",
        "price_monthly": 79,
        "price_annual": 663,
        "annual_savings": 285,
        "conversations": 5000,
        "chatbots": 10,
        "features": [
          "10 chatbots",
          "5,000 conversations per month",
          "Advanced AI with GPT-4",
          "Custom training & knowledge base",
          "Priority support",
          "Advanced analytics",
          "All integrations (Zapier, Slack, etc.)",
          "90-day conversation history",
          "API access"
        ],
        "popular": true
      },
      {
        "name": "Business",
        "price_monthly": 149,
        "price_annual": 1251,
        "annual_savings": 537,
        "conversations": 15000,
        "chatbots": 25,
        "features": [
          "25 chatbots",
          "15,000 conversations per month",
          "Custom branding",
          "Dedicated support",
          "Advanced analytics & reporting",
          "Team collaboration",
          "Unlimited conversation history",
          "White-label option",
          "Priority API access"
        ]
      },
      {
        "name": "Enterprise",
        "price_monthly": 299,
        "price_annual": 2511,
        "annual_savings": 1077,
        "conversations": "unlimited",
        "chatbots": "unlimited",
        "features": [
          "Unlimited chatbots",
          "Unlimited conversations",
          "Full white-label",
          "SLA guarantee",
          "Custom integrations",
          "Dedicated account manager",
          "Custom AI training",
          "On-premise deployment option",
          "24/7 phone support"
        ]
      }
    ],
    
    "legal_chatbot_plans": [
      {
        "name": "Legal Starter",
        "price_monthly": 99,
        "price_annual": 831,
        "annual_savings": 357,
        "conversations": 2000,
        "features": [
          "Legal compliance features",
          "1 jurisdiction",
          "Verified legal content",
          "ABA compliance",
          "Email support"
        ]
      },
      {
        "name": "Legal Professional",
        "price_monthly": 199,
        "price_annual": 1671,
        "annual_savings": 717,
        "conversations": 5000,
        "features": [
          "Multi-jurisdiction support",
          "Document automation",
          "Practice management integration",
          "Priority support",
          "7-year audit logging"
        ]
      },
      {
        "name": "Legal Business",
        "price_monthly": 399,
        "price_annual": 3351,
        "annual_savings": 1437,
        "conversations": 15000,
        "features": [
          "Custom legal database",
          "Multi-attorney access",
          "Dedicated support",
          "Custom compliance features"
        ]
      },
      {
        "name": "Legal Enterprise",
        "price_monthly": 799,
        "price_annual": 6711,
        "annual_savings": 2877,
        "conversations": "unlimited",
        "features": [
          "White-label",
          "Custom SLA",
          "API access",
          "On-premise option"
        ]
      }
    ],
    
    "annual_discount": "30%",
    "money_back_guarantee": "30 days"
  },
  
  "conversation_definition": {
    "definition": "A conversation is a complete interaction session between a user and your chatbot. Multiple messages within the same session count as ONE conversation.",
    "session_timeout": "30 minutes",
    "examples": [
      {
        "scenario": "Single question",
        "messages": [
          "User: What are your business hours?",
          "Bot: We're open Monday-Friday, 9 AM - 6 PM EST."
        ],
        "conversation_count": 1,
        "explanation": "One question and answer in a single session = 1 conversation"
      },
      {
        "scenario": "Multi-turn conversation",
        "messages": [
          "User: What are your business hours?",
          "Bot: We're open Monday-Friday, 9 AM - 6 PM EST.",
          "User: Are you open on weekends?",
          "Bot: No, we're closed on weekends.",
          "User: What about holidays?",
          "Bot: We're closed on major US holidays."
        ],
        "conversation_count": 1,
        "explanation": "Multiple messages in the same session = still 1 conversation"
      },
      {
        "scenario": "Multiple sessions",
        "messages": [
          "Session 1 (10:00 AM): User asks about prices",
          "Session 2 (2:00 PM): Same user returns to ask about demo"
        ],
        "conversation_count": 2,
        "explanation": "Separate sessions = separate conversations"
      },
      {
        "scenario": "Timeout",
        "messages": [
          "User asks question",
          "30+ minutes pass with no activity",
          "User returns and asks another question"
        ],
        "conversation_count": 2,
        "explanation": "Session timeout creates new conversation"
      }
    ],
    "what_counts": [
      "Each unique user session",
      "Multiple messages within same session = 1 conversation",
      "New session after timeout = new conversation",
      "Same user returning later = new conversation",
      "Different users = separate conversations"
    ],
    "what_doesnt_count": [
      "Bot messages alone (no user input)",
      "System messages or notifications",
      "Failed/error messages",
      "Test messages from dashboard",
      "Admin/owner testing"
    ]
  },
  
  "features": {
    "core": [
      "AI-powered responses using GPT-4",
      "No-code chatbot builder",
      "Multi-channel support (website, mobile, social)",
      "Custom training with your data",
      "Real-time analytics dashboard",
      "Integration with 1000+ apps via Zapier",
      "24/7 availability",
      "Multi-language support"
    ],
    "advanced": [
      "Custom branding and white-label",
      "API access for developers",
      "Webhook support",
      "Team collaboration tools",
      "Advanced analytics and reporting",
      "A/B testing",
      "Conversation routing",
      "Human handoff"
    ],
    "legal_specific": [
      "ABA compliance",
      "GDPR/CCPA compliance",
      "7-year audit logging",
      "Verified legal content",
      "Multi-jurisdiction support",
      "Document automation",
      "Practice management integration",
      "Professional liability insurance included"
    ]
  },
  
  "use_cases": [
    {
      "industry": "E-commerce",
      "benefits": [
        "24/7 customer support",
        "Product recommendations",
        "Order tracking",
        "Reduce cart abandonment"
      ]
    },
    {
      "industry": "Legal",
      "benefits": [
        "Client intake automation",
        "Legal information provision",
        "Document assistance",
        "Appointment scheduling"
      ]
    },
    {
      "industry": "Healthcare",
      "benefits": [
        "Appointment scheduling",
        "Symptom checking",
        "Patient education",
        "Insurance verification"
      ]
    },
    {
      "industry": "Real Estate",
      "benefits": [
        "Property inquiries",
        "Showing scheduling",
        "Lead qualification",
        "Market information"
      ]
    }
  ],
  
  "affiliate_program": {
    "commission_tier1": "50% of first month's payment",
    "commission_tier2": "20% of sub-affiliate earnings",
    "cookie_duration": "90 days",
    "minimum_payout": "$50",
    "payout_schedule": "Monthly on 15th",
    "payment_methods": ["PayPal", "Stripe", "ACH"]
  }
}
```

---

## 2. Intelligent Response Templates

### Conversation Definition Responses

```javascript
const conversationResponses = {
  // Direct question about conversations
  "what is a conversation": `Great question! 

A **conversation** is a complete interaction session between a user and your chatbot. Here's what that means:

📊 **Simple Definition:**
Multiple messages within the same session = 1 conversation

🔍 **Example:**
If a customer asks:
- "What are your hours?" 
- "Are you open weekends?"
- "What about holidays?"

All in the same chat session, that counts as **1 conversation** (even though there are 6 messages total).

⏱️ **Session Rules:**
- Same session = 1 conversation
- New session (after 30 min timeout) = new conversation
- User returns later = new conversation

💡 **What This Means for You:**
On our Starter plan ($29/mo), you get 1,000 conversations. If each customer has an average 5-message conversation, that's 1,000 customer interactions per month!

Want to see how many conversations your business might need? I can help you estimate!`,

  // Follow-up questions
  "how many messages in a conversation": `A conversation can have **any number of messages**! 

Here's how it works:

1️⃣ **Single message:** 
   User: "What are your hours?"
   Bot: "9 AM - 6 PM"
   = 1 conversation

5️⃣ **Five messages:**
   User asks 3 questions, bot gives 3 answers, user says thanks
   = Still 1 conversation (same session)

🔄 **The key is the SESSION:**
- As long as the chat window stays open and active (within 30 minutes)
- All messages count as ONE conversation
- Only when the session ends (user closes chat or 30 min timeout) does it become a new conversation

📈 **Average conversation length:**
Most businesses see 3-5 messages per conversation.

Does this help clarify? Want to know more about our pricing plans?`,

  "what counts as a conversation": `Let me break down exactly what counts (and doesn't count) as a conversation:

✅ **COUNTS as a conversation:**
- Each unique user session
- Multiple back-and-forth messages in same session = 1 conversation
- User returns after 30+ minutes = new conversation
- Different users = separate conversations

❌ **DOESN'T COUNT:**
- Bot messages alone (no user input)
- System notifications
- Error messages
- Your test messages from the dashboard
- Admin testing

📊 **Real Example:**
Monday 10 AM: Customer asks about pricing → 1 conversation
Monday 3 PM: Same customer returns to ask about features → 2nd conversation
(Because they're separate sessions)

But if they asked about pricing AND features in the same chat session, that's still just 1 conversation!

Need help estimating how many conversations you'll need?`,

  "conversation limit": `Here's what happens when you reach your conversation limit:

🚫 **At 100% (limit reached):**
- Your chatbot pauses automatically
- Visitors see: "This chatbot has reached its monthly limit. Please contact us directly at [your email]"
- You get an email notification

⚠️ **At 80% (warning):**
- You get a notification: "You've used 80% of your conversations"
- Prompt to upgrade or add more conversations

💡 **Your Options:**
1. **Upgrade your plan** - Get more conversations permanently
2. **Buy add-on** - Add 500 conversations for $10 (one-time, current month only)
3. **Wait** - Limit resets on 1st of next month

📈 **Pro Tip:**
Most businesses upgrade to Professional ($79/mo, 5,000 conversations) because:
- You never worry about limits
- Better features (GPT-4, integrations, analytics)
- Only $2.64/day for unlimited customer support!

Want to see which plan fits your needs?`
};
```

### Pricing Responses

```javascript
const pricingResponses = {
  "pricing": `Here are our plans:

🆓 **Free Plan** - $0/month
- 100 conversations/month
- 1 chatbot
- Perfect for testing!

🚀 **Starter** - $29/month ($244/year - save 30%!)
- 1,000 conversations/month
- 3 chatbots
- Remove branding
- Email support

⭐ **Professional** - $79/month ($663/year - save 30%!) ← MOST POPULAR
- 5,000 conversations/month
- 10 chatbots
- GPT-4 AI
- All integrations
- Priority support

💼 **Business** - $149/month ($1,251/year - save 30%!)
- 15,000 conversations/month
- 25 chatbots
- Custom branding
- Dedicated support

🏢 **Enterprise** - $299/month ($2,511/year - save 30%!)
- Unlimited everything
- White-label
- SLA guarantee
- 24/7 phone support

💰 **Save 30% with annual plans!**

Which plan interests you? I can provide more details!`,

  "free plan": `Our **Free Plan** is perfect for getting started!

✅ **What's Included:**
- 100 conversations per month
- 1 chatbot
- Basic AI responses
- Website embed code
- Basic analytics
- Community support

⚠️ **Limitations (designed to be easy to outgrow):**
- Only 100 conversations/month (runs out quickly for active sites)
- Only 1 chatbot (most businesses need multiple)
- BuildMyBot branding (not professional)
- No custom training
- No integrations
- 7-day conversation history only

💡 **Perfect For:**
- Testing BuildMyBot
- Personal projects
- Very low-traffic sites
- Proof of concept

📈 **Most users upgrade within 30 days** because:
- 100 conversations = about 3-4 conversations per day
- Active businesses need 1,000+ conversations
- Want to remove branding
- Need integrations (Zapier, Slack, etc.)

Want to start with Free and upgrade later? Or jump straight to Starter for $29/month?`,

  "annual discount": `Yes! We offer **30% off when you pay annually**! 🎉

💰 **Savings Breakdown:**

**Starter Plan:**
- Monthly: $29 × 12 = $348/year
- Annual: $244/year
- **You save: $104/year!**

**Professional Plan:**
- Monthly: $79 × 12 = $948/year
- Annual: $663/year
- **You save: $285/year!**

**Business Plan:**
- Monthly: $149 × 12 = $1,788/year
- Annual: $1,251/year
- **You save: $537/year!**

**Enterprise Plan:**
- Monthly: $299 × 12 = $3,588/year
- Annual: $2,511/year
- **You save: $1,077/year!**

✅ **Plus, annual plans include:**
- 30-day money-back guarantee
- Price lock (no increases for your term)
- Priority support
- Upfront payment = better cash flow for you

🎯 **Most popular:** Professional Annual at $663/year (just $55/month!)

Ready to save 30%?`
};
```

### Feature Responses

```javascript
const featureResponses = {
  "features": `BuildMyBot is packed with powerful features! Here are the highlights:

🤖 **AI-Powered:**
- GPT-4 technology (Professional+ plans)
- Natural language understanding
- Context-aware responses
- Learns from your data

🎨 **Easy to Use:**
- No-code visual builder
- Drag-and-drop interface
- Pre-built templates
- Custom training with your content

📊 **Analytics:**
- Real-time conversation tracking
- User behavior insights
- Conversion tracking
- Export reports

🔗 **Integrations:**
- Zapier (1000+ apps)
- Slack, Teams, Discord
- CRM systems (Salesforce, HubSpot)
- Email marketing (Mailchimp, SendGrid)
- Payment processors (Stripe)

🌐 **Multi-Channel:**
- Website embed
- Mobile apps
- Facebook Messenger
- WhatsApp
- SMS

🎯 **Advanced:**
- Custom branding
- White-label (Business+)
- API access
- Webhooks
- A/B testing
- Human handoff

Which features are most important for your business?`,

  "integrations": `We integrate with 1000+ apps! Here are the most popular:

💬 **Communication:**
- Slack - Get notifications in your team channel
- Microsoft Teams - Enterprise communication
- Discord - Community engagement
- Email - Send conversation summaries

📊 **CRM & Sales:**
- Salesforce - Sync leads automatically
- HubSpot - Track customer interactions
- Pipedrive - Manage sales pipeline
- Zoho CRM - Customer relationship management

📧 **Email Marketing:**
- Mailchimp - Add leads to campaigns
- SendGrid - Automated email sequences
- ConvertKit - Creator marketing
- ActiveCampaign - Marketing automation

💳 **Payments:**
- Stripe - Accept payments in chat
- PayPal - Payment processing
- Square - Point of sale integration

📅 **Scheduling:**
- Calendly - Book appointments
- Google Calendar - Schedule meetings
- Acuity - Appointment booking

⚡ **Automation:**
- Zapier - Connect to 1000+ apps
- Make (Integromat) - Advanced automation
- n8n - Workflow automation

🔧 **Developer Tools:**
- REST API - Custom integrations
- Webhooks - Real-time events
- JavaScript SDK - Advanced customization

Available on Professional plan ($79/mo) and above!

Which integration do you need?`,

  "no code": `Yes! BuildMyBot is **100% no-code** - anyone can build a chatbot! 🎉

👨‍💼 **Perfect for:**
- Business owners
- Marketers
- Customer service teams
- Anyone without coding skills!

🎨 **How it works:**
1. **Visual Builder:** Drag and drop conversation flows
2. **Templates:** Start with pre-built chatbots
3. **Training:** Upload your content (PDFs, website, FAQs)
4. **Customize:** Change colors, messages, behavior
5. **Deploy:** Copy embed code to your website

⏱️ **Time to launch:** 10-15 minutes!

🚀 **No coding required for:**
- Creating chatbot
- Training AI
- Customizing appearance
- Adding to website
- Viewing analytics
- Managing conversations

💻 **Optional for developers:**
- API access (Professional+)
- Custom integrations
- Webhooks
- Advanced customization

Want to see how easy it is? I can walk you through it!`
};
```

---

## 3. Demo Bot System Prompt

```javascript
const systemPrompt = `You are the BuildMyBot demo chatbot assistant. Your role is to help visitors understand BuildMyBot's features, pricing, and capabilities.

CRITICAL KNOWLEDGE:

1. CONVERSATION DEFINITION:
A conversation is a complete interaction session. Multiple messages in the same session = 1 conversation. Session ends after 30 minutes of inactivity or when user closes chat.

Example: If a user asks 5 questions in one chat session, that's 1 conversation (not 5).

2. PRICING:
- Free: $0, 100 conversations/month, 1 chatbot
- Starter: $29/mo ($244/year), 1,000 conversations, 3 chatbots
- Professional: $79/mo ($663/year), 5,000 conversations, 10 chatbots [MOST POPULAR]
- Business: $149/mo ($1,251/year), 15,000 conversations, 25 chatbots
- Enterprise: $299/mo ($2,511/year), unlimited conversations & chatbots

Annual plans save 30%!

3. KEY FEATURES:
- No-code builder (anyone can use it)
- AI-powered with GPT-4
- 1000+ integrations via Zapier
- Multi-channel support
- Real-time analytics
- Custom training with your data

4. LEGAL CHATBOT:
Specialized plans for law firms starting at $99/mo with ABA compliance, verified legal content, and 7-year audit logging.

5. AFFILIATE PROGRAM:
50% commission on first month + 20% on sub-affiliate earnings. Automated tracking and monthly payouts.

RESPONSE STYLE:
- Be friendly and conversational
- Use emojis appropriately 
- Provide specific numbers and examples
- Always offer to help with next steps
- If unsure, say "Let me connect you with our team" and provide support@buildmybot.app

IMPORTANT:
- ALWAYS explain what a conversation is when asked about pricing
- Emphasize the value (e.g., "$29/mo = less than $1/day for 1,000 customer interactions")
- Highlight the 30% annual discount
- Mention the free plan for getting started
- Be specific about features and limitations

When users ask complex questions, break down your answer into clear sections with examples.`;
```

---

## 4. Implementation Code

### React Component

```typescript
// DemoBot.tsx
import React, { useState, useEffect } from 'react';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Only for demo
});

export const DemoBot: React.FC = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `👋 Hi! I'm the BuildMyBot demo assistant. I can help you with:

• Pricing and plans
• Features and capabilities
• What counts as a "conversation"
• Legal chatbot options
• Affiliate program
• Getting started

What would you like to know?`
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages,
          userMessage
        ],
        temperature: 0.7,
        max_tokens: 500
      });

      const assistantMessage = {
        role: 'assistant',
        content: response.choices[0].message.content
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please email support@buildmybot.app for help!'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="demo-bot">
      {/* Chat interface */}
    </div>
  );
};
```

---

## 5. Testing Scenarios

### Test Questions

```javascript
const testQuestions = [
  // Conversation definition
  "What is a conversation?",
  "What counts as a conversation?",
  "How many messages are in a conversation?",
  "What happens when I reach my conversation limit?",
  "Do test messages count as conversations?",
  
  // Pricing
  "How much does it cost?",
  "What's the difference between plans?",
  "Do you have a free plan?",
  "How much do I save with annual plans?",
  "What's included in the Professional plan?",
  
  // Features
  "What features do you have?",
  "Do I need to code?",
  "What integrations do you support?",
  "Can I customize the chatbot?",
  "Do you have analytics?",
  
  // Legal
  "Do you have a legal chatbot?",
  "Is it ABA compliant?",
  "How much is the legal chatbot?",
  
  // Affiliate
  "Do you have an affiliate program?",
  "How much commission do affiliates earn?",
  "How do affiliate payouts work?",
  
  // Complex questions
  "I have a law firm with 3 attorneys. We get about 50 client inquiries per day. Which plan should I get?",
  "What's the ROI of using BuildMyBot?",
  "How does your pricing compare to competitors?",
  "Can I start with free and upgrade later?"
];
```

### Expected Responses

Each question should receive:
1. ✅ Direct answer to the question
2. ✅ Specific examples or numbers
3. ✅ Relevant context
4. ✅ Next steps or call to action
5. ✅ Friendly, conversational tone

---

## 6. Continuous Improvement

### Analytics to Track

```javascript
const analytics = {
  // Track which questions are asked most
  "most_asked_questions": [
    "What is a conversation?",
    "How much does it cost?",
    "Do you have a free plan?"
  ],
  
  // Track which questions the bot struggles with
  "low_confidence_responses": [
    "Questions requiring human judgment",
    "Very specific technical questions",
    "Questions about future features"
  ],
  
  // Track conversion
  "conversion_triggers": [
    "User asks about pricing → Show pricing",
    "User asks about free plan → Encourage signup",
    "User asks complex question → Offer demo call"
  ]
};
```

### Monthly Updates

- Review most asked questions
- Add new responses for common queries
- Update pricing/features as they change
- Improve responses based on user feedback
- Add new use cases and examples

---

**Document Version:** 1.0  
**Last Updated:** January 1, 2025  
**Next Review:** Monthly