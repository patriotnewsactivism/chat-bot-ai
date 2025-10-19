import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, ShoppingCart, Headphones, Users, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const Templates = () => {
  const templates = [
    {
      id: 1,
      name: "E-commerce Support Bot",
      description: "Answer product questions, track orders, and provide shopping assistance 24/7",
      icon: ShoppingCart,
      category: "E-commerce",
      uses: 2156,
      prompt: "You are a helpful e-commerce support assistant. Help customers with product questions, order tracking, and shopping assistance."
    },
    {
      id: 2,
      name: "Customer Service Bot",
      description: "Handle common support tickets and FAQs automatically",
      icon: Headphones,
      category: "Support",
      uses: 1892,
      prompt: "You are a customer service representative. Provide helpful, friendly support for common customer questions."
    },
    {
      id: 3,
      name: "Lead Qualification Bot",
      description: "Qualify leads, schedule demos, and capture contact information",
      icon: Users,
      category: "Sales",
      uses: 1567,
      prompt: "You are a sales assistant. Help qualify leads by asking relevant questions and scheduling product demos."
    },
    {
      id: 4,
      name: "Knowledge Base Bot",
      description: "Answer questions based on your documentation and help articles",
      icon: BookOpen,
      category: "Education",
      uses: 1234,
      prompt: "You are a knowledgeable assistant that helps users find information from the knowledge base."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">BuildMyBot</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Link to="/templates">
              <Button variant="ghost">Templates</Button>
            </Link>
            <Link to="/pricing">
              <Button variant="ghost">Pricing</Button>
            </Link>
            <Link to="/auth">
              <Button className="gradient-primary">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Chatbot Templates</h1>
          <p className="text-xl text-muted-foreground">Start with proven chatbot configurations</p>
        </div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {templates.map((template) => {
            const Icon = template.icon;
            return (
              <Card key={template.id} className="p-6 border-border/50 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-semibold">{template.name}</h3>
                      <Badge variant="secondary">{template.category}</Badge>
                    </div>
                    <p className="text-muted-foreground mb-4">{template.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {template.uses.toLocaleString()} uses
                      </span>
                      <Link to="/auth">
                        <Button className="gradient-primary">Use Template</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Card className="p-12 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Don't see what you need?</h2>
            <p className="text-muted-foreground mb-6">
              Create a custom chatbot from scratch with your own prompts and knowledge base
            </p>
            <Link to="/auth">
              <Button size="lg" className="gradient-primary">
                Create Custom Bot
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Templates;
