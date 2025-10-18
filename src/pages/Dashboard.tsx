import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, MessageSquare, Settings, Trash2, ShoppingCart, Headphones, Users, BookOpen, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface Chatbot {
  id: string;
  name: string;
  description: string;
  status: string;
  created_at: string;
}

const botTemplates = [
  {
    id: "ecommerce",
    name: "E-commerce Support",
    description: "Answer product questions, track orders, and provide shopping assistance 24/7",
    icon: ShoppingCart,
    systemPrompt: "You are a helpful e-commerce support assistant. Help customers with product questions, order tracking, returns, and shopping assistance. Be friendly, professional, and always aim to solve customer problems quickly.",
    knowledgeBase: "Common FAQs:\n- Free shipping on orders over $50\n- 30-day return policy\n- Orders ship within 1-2 business days"
  },
  {
    id: "support",
    name: "Customer Service",
    description: "Handle common support tickets and FAQs automatically",
    icon: Headphones,
    systemPrompt: "You are a customer service representative. Provide helpful, friendly support for common customer questions. If you can't solve an issue, guide the customer to contact human support.",
    knowledgeBase: "Support hours: Monday-Friday 9AM-6PM EST\nSupport email: support@company.com\nSupport phone: 1-800-SUPPORT"
  },
  {
    id: "sales",
    name: "Lead Qualification",
    description: "Qualify leads, schedule demos, and capture contact information",
    icon: Users,
    systemPrompt: "You are a sales assistant. Help qualify leads by asking relevant questions about their needs, company size, and use case. Be professional and enthusiastic. Your goal is to schedule a product demo with qualified prospects.",
    knowledgeBase: "Demo scheduling link: calendly.com/demo\nPricing tiers: Starter ($29/mo), Professional ($99/mo), Enterprise (custom)\nIdeal customer: Teams of 10+ looking to improve customer engagement"
  },
  {
    id: "knowledge",
    name: "Knowledge Base",
    description: "Answer questions based on your documentation",
    icon: BookOpen,
    systemPrompt: "You are a knowledgeable assistant that helps users find information from the knowledge base. Provide clear, accurate answers and cite relevant sections when possible.",
    knowledgeBase: "Add your documentation, help articles, and frequently asked questions here. The AI will use this information to answer user queries."
  }
];

const Dashboard = () => {
  const [chatbots, setChatbots] = useState<Chatbot[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/auth');
      return;
    }
    setUser(session.user);
    fetchChatbots();
  };

  const fetchChatbots = async () => {
    try {
      const { data, error } = await supabase
        .from('chatbots')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setChatbots(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load chatbots",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteChatbot = async (id: string) => {
    if (!confirm('Are you sure you want to delete this chatbot?')) return;

    try {
      const { error } = await supabase
        .from('chatbots')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Chatbot deleted successfully"
      });
      fetchChatbots();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete chatbot",
        variant: "destructive"
      });
    }
  };

  const createBotFromTemplate = async (template: typeof botTemplates[0]) => {
    if (!user) return;
    setCreating(true);

    try {
      const { data, error } = await supabase
        .from('chatbots')
        .insert({
          name: template.name,
          description: template.description,
          system_prompt: template.systemPrompt,
          knowledge_base: template.knowledgeBase,
          user_id: user.id
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success!",
        description: `${template.name} bot created successfully`,
      });
      navigate(`/bot/${data.id}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create chatbot",
        variant: "destructive"
      });
    } finally {
      setCreating(false);
    }
  };

  const createNewBot = async () => {
    if (!user) return;
    setCreating(true);

    try {
      const { data, error } = await supabase
        .from('chatbots')
        .insert({
          name: 'New Chatbot',
          description: 'A helpful assistant',
          system_prompt: 'You are a helpful AI assistant that helps customers with their questions.',
          user_id: user.id
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Chatbot created successfully"
      });
      navigate(`/bot/${data.id}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create chatbot",
        variant: "destructive"
      });
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">ChatMaker</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="ghost" data-testid="nav-dashboard">Dashboard</Button>
            </Link>
            <Link to="/templates">
              <Button variant="ghost" data-testid="nav-templates">Templates</Button>
            </Link>
            <Link to="/pricing">
              <Button variant="ghost" data-testid="nav-pricing">Pricing</Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Your Chatbots</h1>
            <p className="text-muted-foreground">Create and manage your AI chatbots</p>
          </div>
          <Button onClick={createNewBot} disabled={creating} className="gradient-primary" data-testid="button-create-custom">
            <Plus className="w-5 h-5 mr-2" />
            {creating ? "Creating..." : "Create Custom Bot"}
          </Button>
        </div>

        {/* Quick Start Templates - Show when user has 0-2 bots */}
        {chatbots.length < 3 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-bold">Quick Start Templates</h2>
              <Badge variant="secondary">Popular</Badge>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {botTemplates.map((template) => {
                const Icon = template.icon;
                return (
                  <Card 
                    key={template.id} 
                    className="p-6 border-border/50 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10 cursor-pointer"
                    data-testid={`template-${template.id}`}
                  >
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <h3 className="font-semibold mb-2">{template.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {template.description}
                      </p>
                      <Button 
                        onClick={() => createBotFromTemplate(template)}
                        disabled={creating}
                        size="sm" 
                        className="w-full gradient-primary"
                        data-testid={`button-use-${template.id}`}
                      >
                        {creating ? "Creating..." : "Use Template"}
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Chatbots Grid */}
        {chatbots.length === 0 ? (
          <Card className="p-16 text-center" data-testid="empty-state">
            <MessageSquare className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-2xl font-semibold mb-2">No chatbots yet</h3>
            <p className="text-muted-foreground mb-6">
              Choose a template above to get started in seconds, or create a custom chatbot
            </p>
          </Card>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-6">Your Bots</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {chatbots.map((bot) => (
                <Card key={bot.id} className="p-6 border-border/50 hover:border-primary/50 transition-all" data-testid={`bot-card-${bot.id}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      bot.status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
                    }`} data-testid={`status-${bot.id}`}>
                      {bot.status}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2" data-testid={`text-name-${bot.id}`}>{bot.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2" data-testid={`text-description-${bot.id}`}>
                    {bot.description}
                  </p>
                  
                  <div className="flex items-center gap-2">
                    <Link to={`/bot/${bot.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full" data-testid={`button-configure-${bot.id}`}>
                        <Settings className="w-4 h-4 mr-2" />
                        Configure
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteChatbot(bot.id)}
                      data-testid={`button-delete-${bot.id}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
