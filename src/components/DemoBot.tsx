import React, { useState } from 'react';
import { Send, Bot, User, Info } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Message {
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface DemoBotProps {
  onUpgradeClick?: () => void;
}

export const DemoBot: React.FC<DemoBotProps> = ({ onUpgradeClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: `👋 Hi! I'm the BuildMyBot demo assistant. I can help you with:

• Pricing and plans
• What counts as a conversation
• Features and capabilities
• Legal chatbot options
• Affiliate program
• Getting started

What would you like to know?`,
      isBot: true,
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showUpgradeSuggestion, setShowUpgradeSuggestion] = useState(false);

  const systemPrompt = `You are the BuildMyBot demo chatbot assistant. Your role is to help visitors understand BuildMyBot's features, pricing, and capabilities.

CRITICAL KNOWLEDGE:

1. CONVERSATION DEFINITION:
A conversation is a complete interaction session. Multiple messages in the same session = 1 conversation. Session ends after 30 minutes of inactivity or when user closes chat.

Example: If a user asks 5 questions in one chat session, that's 1 conversation (not 5).

2. PRICING:
- Free: $0/month, 100 conversations/month, 1 chatbot
- Starter: $29/month ($244/year), 1,000 conversations, 3 chatbots
- Professional: $79/month ($663/year), 5,000 conversations, 10 chatbots [MOST POPULAR]
- Business: $149/month ($1,251/year), 15,000 conversations, 25 chatbots
- Enterprise: $299/month ($2,511/year), unlimited conversations & chatbots

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
- Be specific about features and limitations`;

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Conversation Definition
    if (lowerMessage.includes("conversation") && 
        (lowerMessage.includes("what") || lowerMessage.includes("count") || lowerMessage.includes("how many"))) {
      return `Great question! 

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

Want to see how many conversations your business might need?`;
    }

    // Pricing
    if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("plan")) {
      return `Here are our plans:

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

Which plan interests you? I can provide more details!`;
    }

    // Features
    if (lowerMessage.includes("feature") || lowerMessage.includes("what can") || lowerMessage.includes("capabilities")) {
      return `BuildMyBot offers powerful features:

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

Which features are most important for your business?`;
    }

    // How it works
    if (lowerMessage.includes("how") || lowerMessage.includes("work") || lowerMessage.includes("use")) {
      return `It's super simple! 1) Sign up and create your bot 2) Train it with your content 3) Customize the design 4) Embed it on your website with one line of code. No technical skills needed! ✨`;
    }

    // Benefits
    if (lowerMessage.includes("benefit") || lowerMessage.includes("help") || lowerMessage.includes("why")) {
      return `Chatbots help you engage customers 24/7, answer questions instantly, generate leads, and reduce support costs. They work while you sleep! 😴📊`;
    }

    // Reseller/Affiliate
    if (lowerMessage.includes("reseller") || lowerMessage.includes("affiliate") || lowerMessage.includes("commission")) {
      return `Our reseller program offers 50% recurring commission on direct sales and 20% on recruited reseller sales. It's a great way to earn passive income! 💰`;
    }

    // Getting started
    if (lowerMessage.includes("start") || lowerMessage.includes("sign up") || lowerMessage.includes("try")) {
      return `Ready to get started? Click 'Get Started' at the top to create your free account. You can build your first bot in under 5 minutes! 🎉`;
    }

    // Greeting
    if (lowerMessage.includes("hi") || lowerMessage.includes("hello") || lowerMessage.includes("hey")) {
      return `Hello! 👋 I'm here to answer your questions about BuildMyBot. Ask me about features, pricing, or how to get started!`;
    }

    // Thank you
    if (lowerMessage.includes("thank") || lowerMessage.includes("thanks")) {
      return `You're welcome! Feel free to ask me anything else about BuildMyBot. Ready to create your own bot? Click 'Get Started' above! 😊`;
    }

    // Default response
    return `That's a great question! I can tell you about our features, pricing, how it works, or help you get started. What would you like to know? 🤔`;
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot typing and response
    setTimeout(() => {
      const botResponse: Message = {
        text: getBotResponse(inputValue),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);

      // Check if response suggests upgrade
      if (botResponse.text.toLowerCase().includes('upgrade') || 
          botResponse.text.toLowerCase().includes('limit') ||
          botResponse.text.toLowerCase().includes('professional')) {
        // Show upgrade suggestion after a delay
        setTimeout(() => {
          setShowUpgradeSuggestion(true);
        }, 2000);
      }
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full shadow-lg bg-primary hover:scale-110 transition-transform"
        >
          <Bot className="w-6 h-6 text-white" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="w-[90vw] sm:w-96 h-[500px] flex flex-col shadow-2xl">
          {/* Header */}
          <div className="bg-primary p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">BuildMyBot Demo</h3>
                <p className="text-white/80 text-xs">Try me out!</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.isBot
                      ? "bg-white border border-border"
                      : "bg-primary text-white"
                  }`}
                >
                  <p className={`text-sm ${message.isBot ? "text-foreground" : "text-white"}`}>
                    {message.text}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-border rounded-lg p-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={(el) => el && el.scrollIntoView({ behavior: 'smooth' })} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="bg-primary"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              This is a demo. Create your own bot to customize responses!
            </p>
          </div>

          {/* Upgrade Suggestion */}
          {showUpgradeSuggestion && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 m-4 rounded">
              <div className="flex">
                <Info className="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-yellow-800 mb-1">
                    Want to unlock more features?
                  </p>
                  <p className="text-yellow-700">
                    Check out our Professional plan for unlimited conversations and advanced features.
                  </p>
                  <button
                    onClick={onUpgradeClick}
                    className="mt-2 text-sm font-medium text-yellow-800 hover:text-yellow-900 underline"
                  >
                    View Pricing Plans
                  </button>
                </div>
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

export default DemoBot;