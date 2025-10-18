import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Save, ArrowLeft } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const BotConfig = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [bot, setBot] = useState({
    name: '',
    description: '',
    system_prompt: '',
    knowledge_base: ''
  });

  useEffect(() => {
    checkAuth();
  }, [id]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/auth');
      return;
    }
    if (id) {
      fetchBot();
    }
  };

  const fetchBot = async () => {
    try {
      const { data, error } = await supabase
        .from('chatbots')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      
      setBot({
        name: data.name,
        description: data.description || '',
        system_prompt: data.system_prompt,
        knowledge_base: data.knowledge_base || ''
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load chatbot",
        variant: "destructive"
      });
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('chatbots')
        .update(bot)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Chatbot updated successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update chatbot",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
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
              <Button variant="ghost">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Configure Chatbot</h1>
          <p className="text-muted-foreground">Customize your AI assistant's behavior and knowledge</p>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Chatbot Name</Label>
                <Input
                  id="name"
                  value={bot.name}
                  onChange={(e) => setBot({ ...bot, name: e.target.value })}
                  placeholder="My Helpful Assistant"
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={bot.description}
                  onChange={(e) => setBot({ ...bot, description: e.target.value })}
                  placeholder="A brief description of what your chatbot does"
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">AI Configuration</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="system_prompt">System Prompt</Label>
                <Textarea
                  id="system_prompt"
                  value={bot.system_prompt}
                  onChange={(e) => setBot({ ...bot, system_prompt: e.target.value })}
                  placeholder="You are a helpful AI assistant that..."
                  rows={6}
                  className="resize-none"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Define how your chatbot should behave and respond to users
                </p>
              </div>
              
              <div>
                <Label htmlFor="knowledge_base">Knowledge Base</Label>
                <Textarea
                  id="knowledge_base"
                  value={bot.knowledge_base}
                  onChange={(e) => setBot({ ...bot, knowledge_base: e.target.value })}
                  placeholder="Add your company information, FAQs, product details..."
                  rows={10}
                  className="resize-none"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Add information your chatbot should know about. This helps it answer questions accurately.
                </p>
              </div>
            </div>
          </Card>

          <div className="flex items-center justify-between">
            <Link to="/dashboard">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button 
              onClick={handleSave} 
              disabled={saving}
              className="gradient-primary"
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BotConfig;
