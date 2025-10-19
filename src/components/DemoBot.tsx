import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageSquare, Send, X } from "lucide-react";

interface Message {
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const DemoBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi! I'm a BuildMyBot demo. Ask me about our features, pricing, or how chatbots can help your business! 👋",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Features
    if (lowerMessage.includes("feature") || lowerMessage.includes("what can") || lowerMessage.includes("capabilities")) {
      return "BuildMyBot offers AI-powered chat with GPT-4o-mini, a no-code builder, easy embedding on any website, and advanced analytics. You can create intelligent chatbots in minutes without any coding! 🚀";
    }

    // Pricing
    if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("plan")) {
      return "We have 3 plans: Starter ($29/mo) for 1 bot, Professional ($99/mo) for 5 bots, and Business ($299/mo) for unlimited bots. All plans include our core features with no hidden fees! 💰";
    }

    // How it works
    if (lowerMessage.includes("how") || lowerMessage.includes("work") || lowerMessage.includes("use")) {
      return "It's super simple! 1) Sign up and create your bot 2) Train it with your content 3) Customize the design 4) Embed it on your website with one line of code. No technical skills needed! ✨";
    }

    // Benefits
    if (lowerMessage.includes("benefit") || lowerMessage.includes("help") || lowerMessage.includes("why")) {
      return "Chatbots help you engage customers 24/7, answer questions instantly, generate leads, and reduce support costs. They work while you sleep! 😴💼";
    }

    // Reseller
    if (lowerMessage.includes("reseller") || lowerMessage.includes("affiliate") || lowerMessage.includes("commission")) {
      return "Our reseller program offers 50% recurring commission on direct sales and 20% on recruited reseller sales. It's a great way to earn passive income! 💸";
    }

    // Getting started
    if (lowerMessage.includes("start") || lowerMessage.includes("sign up") || lowerMessage.includes("try")) {
      return "Ready to get started? Click 'Get Started' at the top to create your free account. You can build your first bot in under 5 minutes! 🎉";
    }

    // Support
    if (lowerMessage.includes("support") || lowerMessage.includes("help") || lowerMessage.includes("contact")) {
      return "We offer email support on all plans, priority support on Professional, and 24/7 dedicated support on Business plans. We're here to help! 🤝";
    }

    // Greeting
    if (lowerMessage.includes("hi") || lowerMessage.includes("hello") || lowerMessage.includes("hey")) {
      return "Hello! 👋 I'm here to answer your questions about BuildMyBot. Ask me about features, pricing, or how to get started!";
    }

    // Thank you
    if (lowerMessage.includes("thank") || lowerMessage.includes("thanks")) {
      return "You're welcome! Feel free to ask me anything else about BuildMyBot. Ready to create your own bot? Click 'Get Started' above! 😊";
    }

    // Default response
    return "That's a great question! I can tell you about our features, pricing, how it works, or help you get started. What would you like to know? 🤔";
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot typing and response
    setTimeout(() => {
      const botResponse: Message = {
        text: getBotResponse(inputValue),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
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
          className="h-14 w-14 rounded-full shadow-lg gradient-primary hover:scale-110 transition-transform"
        >
          <MessageSquare className="w-6 h-6 text-white" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="w-[90vw] sm:w-96 h-[500px] flex flex-col shadow-2xl">
          {/* Header */}
          <div className="gradient-primary p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
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
                      : "gradient-primary text-white"
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
            <div ref={messagesEndRef} />
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
                className="gradient-primary"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              This is a demo. Create your own bot to customize responses!
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default DemoBot;