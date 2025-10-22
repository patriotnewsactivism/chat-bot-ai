import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  MessageSquare, 
  Plus, 
  TrendingUp, 
  Users, 
  Clock, 
  BarChart3, 
  Settings, 
  Bot, 
  Activity,
  DollarSign,
  Eye,
  Edit,
  Trash2,
  Copy,
  ExternalLink,
  Zap,
  Target,
  Headphones,
  ShoppingCart,
  HelpCircle,
  BookOpen,
  Star,
  ArrowUp,
  ArrowDown,
  MoreHorizontal
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { apiClient, type Chatbot, type User } from '@/lib/api-client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [chatbots, setChatbots] = useState<Chatbot[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const userData = apiClient.getStoredUser();
        setUser(userData);
        
        const botsData = await apiClient.getChatbots();
        setChatbots(botsData);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'paused': return 'bg-gray-100 text-gray-800';
      case 'archived': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTemplateIcon = (template?: string) => {
    switch (template) {
      case 'customer-support': return <Headphones className="w-4 h-4" />;
      case 'lead-generation': return <Target className="w-4 h-4" />;
      case 'ecommerce': return <ShoppingCart className="w-4 h-4" />;
      case 'knowledge-base': return <BookOpen className="w-4 h-4" />;
      default: return <Bot className="w-4 h-4" />;
    }
  };

  const quickActions = [
    {
      title: 'Create New Bot',
      description: 'Build a new AI chatbot from scratch or template',
      icon: <Plus className="w-6 h-6" />,
      color: 'bg-blue-600',
      action: () => navigate('/bot/new')
    },
    {
      title: 'View Analytics',
      description: 'Track performance and conversation metrics',
      icon: <BarChart3 className="w-6 h-6" />,
      color: 'bg-green-600',
      action: () => navigate('/analytics')
    },
    {
      title: 'Browse Templates',
      description: 'Start with industry-proven templates',
      icon: <Star className="w-6 h-6" />,
      color: 'bg-purple-600',
      action: () => navigate('/templates')
    },
    {
      title: 'Training Center',
      description: 'Train your AI with custom knowledge',
      icon: <Zap className="w-6 h-6" />,
      color: 'bg-orange-600',
      action: () => navigate('/training')
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'conversation',
      message: 'New conversation started with Customer Support Bot',
      time: '2 minutes ago',
      icon: <MessageSquare className="w-4 h-4 text-blue-600" />
    },
    {
      id: 2,
      type: 'deployment',
      message: 'E-commerce Bot deployed to production',
      time: '1 hour ago',
      icon: <ExternalLink className="w-4 h-4 text-green-600" />
    },
    {
      id: 3,
      type: 'training',
      message: 'Knowledge base training completed for Lead Gen Bot',
      time: '3 hours ago',
      icon: <Zap className="w-4 h-4 text-purple-600" />
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name || 'User'}!</h1>
              <p className="text-gray-600">Manage your AI chatbots and track performance</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link to="/bot/new">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  New Bot
                </Button>
              </Link>
              
              <Link to="/settings">
                <Button variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Bots</p>
                <p className="text-3xl font-bold text-gray-900">{chatbots.length}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <Bot className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Conversations</p>
                <p className="text-3xl font-bold text-gray-900">2,847</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <ArrowUp className="w-3 h-3 mr-1" />
                  12% from last month
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-3xl font-bold text-gray-900">1,234</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <ArrowUp className="w-3 h-3 mr-1" />
                  8% from last month
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Satisfaction Rate</p>
                <p className="text-3xl font-bold text-gray-900">98.5%</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <ArrowUp className="w-3 h-3 mr-1" />
                  2% from last month
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Chatbots */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Your Chatbots</h2>
                <Link to="/templates">
                  <Button variant="outline" size="sm">
                    Browse Templates
                  </Button>
                </Link>
              </div>

              {chatbots.length === 0 ? (
                <div className="text-center py-12">
                  <Bot className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No chatbots yet</h3>
                  <p className="text-gray-600 mb-6">Create your first AI chatbot to get started</p>
                  <Link to="/bot/new">
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Create Your First Bot
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {chatbots.map((bot) => (
                    <Card key={bot.id} className="p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white">
                            {getTemplateIcon(bot.template)}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="font-semibold text-gray-900">{bot.name}</h3>
                              <Badge className={getStatusColor(bot.status)}>
                                {bot.status || 'draft'}
                              </Badge>
                            </div>
                            
                            {bot.description && (
                              <p className="text-sm text-gray-600 mb-3">{bot.description}</p>
                            )}
                            
                            <div className="flex items-center space-x-6 text-sm text-gray-500">
                              <div className="flex items-center">
                                <MessageSquare className="w-4 h-4 mr-1" />
                                {bot.totalConversations || 0} conversations
                              </div>
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {bot.lastUsedAt ? 'Used recently' : 'Not used yet'}
                              </div>
                            </div>
                          </div>
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => navigate(`/bot/${bot.id}`)}>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              Preview
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="w-4 h-4 mr-2" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {chatbots.length > 0 && (
                <div className="mt-6 text-center">
                  <Link to="/bot/new">
                    <Button variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Another Bot
                    </Button>
                  </Link>
                </div>
              )}
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.action}
                    className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg ${action.color} bg-opacity-10 flex items-center justify-center`}>
                        <div className={`${action.color.replace('bg-', 'text-')}`}>{action.icon}</div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{action.title}</div>
                        <div className="text-sm text-gray-600">{action.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-0.5">
                      {activity.icon}
                    </div>
                    <div>
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Getting Started */}
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Help?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Check out our guides and documentation to get the most out of BuildMyBot.
              </p>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Help Center
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Documentation
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;