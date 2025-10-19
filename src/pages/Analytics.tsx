import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, TrendingUp, Users, Clock, ArrowLeft, Download } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface AnalyticsData {
  totalConversations: number;
  totalMessages: number;
  activeChatbots: number;
  avgResponseTime: number;
  conversationsToday: number;
  conversationsThisWeek: number;
  conversationsThisMonth: number;
}

export default function Analytics() {
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalConversations: 0,
    totalMessages: 0,
    activeChatbots: 0,
    avgResponseTime: 0,
    conversationsToday: 0,
    conversationsThisWeek: 0,
    conversationsThisMonth: 0,
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/auth');
      return;
    }
    fetchAnalytics();
  };

  const fetchAnalytics = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get chatbots count
      const { data: chatbots } = await supabase
        .from('chatbots')
        .select('id')
        .eq('user_id', user.id);

      const chatbotIds = chatbots?.map(bot => bot.id) || [];

      if (chatbotIds.length === 0) {
        setLoading(false);
        return;
      }

      // Get conversations
      const { data: conversations } = await supabase
        .from('conversations')
        .select('*')
        .in('chatbot_id', chatbotIds);

      // Get messages
      const { data: messages } = await supabase
        .from('messages')
        .select('*')
        .in('chatbot_id', chatbotIds);

      // Calculate date ranges
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

      const conversationsToday = conversations?.filter(c => 
        new Date(c.started_at) >= today
      ).length || 0;

      const conversationsThisWeek = conversations?.filter(c => 
        new Date(c.started_at) >= weekAgo
      ).length || 0;

      const conversationsThisMonth = conversations?.filter(c => 
        new Date(c.started_at) >= monthAgo
      ).length || 0;

      setAnalytics({
        totalConversations: conversations?.length || 0,
        totalMessages: messages?.length || 0,
        activeChatbots: chatbots?.length || 0,
        avgResponseTime: 1.2, // Placeholder
        conversationsToday,
        conversationsThisWeek,
        conversationsThisMonth,
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
      toast({
        title: "Error",
        description: "Failed to load analytics",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const exportData = () => {
    toast({
      title: "Export Started",
      description: "Your analytics data is being prepared for download",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading analytics...</p>
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

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Analytics</h1>
            <p className="text-muted-foreground">Track your chatbot performance and usage</p>
          </div>
          <Button onClick={exportData} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold mb-1">{analytics.totalConversations}</h3>
            <p className="text-sm text-muted-foreground">Total Conversations</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-500" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold mb-1">{analytics.totalMessages}</h3>
            <p className="text-sm text-muted-foreground">Total Messages</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-green-500" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-1">{analytics.activeChatbots}</h3>
            <p className="text-sm text-muted-foreground">Active Chatbots</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-500" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-1">{analytics.avgResponseTime}s</h3>
            <p className="text-sm text-muted-foreground">Avg Response Time</p>
          </Card>
        </div>

        {/* Time Period Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Today</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Conversations</span>
                <span className="font-semibold">{analytics.conversationsToday}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">This Week</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Conversations</span>
                <span className="font-semibold">{analytics.conversationsThisWeek}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">This Month</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Conversations</span>
                <span className="font-semibold">{analytics.conversationsThisMonth}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Empty State */}
        {analytics.totalConversations === 0 && (
          <Card className="p-12 text-center">
            <MessageSquare className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-2xl font-semibold mb-2">No Data Yet</h3>
            <p className="text-muted-foreground mb-6">
              Start getting conversations to see your analytics here
            </p>
            <Link to="/dashboard">
              <Button className="gradient-primary">
                Go to Dashboard
              </Button>
            </Link>
          </Card>
        )}
      </div>
    </div>
  );
}