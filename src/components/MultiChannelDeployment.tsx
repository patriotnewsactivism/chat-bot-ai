import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Globe, 
  MessageCircle, 
  Phone, 
  Mail, 
  Smartphone, 
  Monitor,
  CheckCircle,
  Settings,
  Copy,
  ExternalLink,
  Zap,
  Users,
  BarChart3,
  Wifi,
  WifiOff
} from 'lucide-react';

interface Channel {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  status: 'connected' | 'disconnected' | 'pending';
  users: number;
  messages: number;
  category: 'web' | 'social' | 'messaging' | 'voice' | 'mobile';
}

interface DeploymentStats {
  totalChannels: number;
  activeChannels: number;
  totalUsers: number;
  totalMessages: number;
}

const MultiChannelDeployment: React.FC = () => {
  const [activeTab, setActiveTab] = useState('channels');
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);

  const channels: Channel[] = [
    // Web Channels
    {
      id: 'website',
      name: 'Website Widget',
      icon: <Globe className="h-5 w-5" />,
      description: 'Embed chatbot directly on your website',
      status: 'connected',
      users: 2847,
      messages: 15420,
      category: 'web'
    },
    {
      id: 'wordpress',
      name: 'WordPress Plugin',
      icon: <Monitor className="h-5 w-5" />,
      description: 'Easy WordPress integration',
      status: 'connected',
      users: 1205,
      messages: 6830,
      category: 'web'
    },
    
    // Social Media
    {
      id: 'facebook',
      name: 'Facebook Messenger',
      icon: <MessageCircle className="h-5 w-5" />,
      description: 'Connect to Facebook Messenger',
      status: 'connected',
      users: 3421,
      messages: 18950,
      category: 'social'
    },
    {
      id: 'instagram',
      name: 'Instagram DM',
      icon: <MessageCircle className="h-5 w-5" />,
      description: 'Respond to Instagram direct messages',
      status: 'pending',
      users: 0,
      messages: 0,
      category: 'social'
    },
    {
      id: 'twitter',
      name: 'Twitter/X',
      icon: <MessageCircle className="h-5 w-5" />,
      description: 'Handle Twitter mentions and DMs',
      status: 'disconnected',
      users: 0,
      messages: 0,
      category: 'social'
    },
    
    // Messaging Apps
    {
      id: 'whatsapp',
      name: 'WhatsApp Business',
      icon: <Phone className="h-5 w-5" />,
      description: 'WhatsApp Business API integration',
      status: 'connected',
      users: 5632,
      messages: 28470,
      category: 'messaging'
    },
    {
      id: 'telegram',
      name: 'Telegram Bot',
      icon: <MessageCircle className="h-5 w-5" />,
      description: 'Deploy as Telegram bot',
      status: 'connected',
      users: 892,
      messages: 4250,
      category: 'messaging'
    },
    {
      id: 'slack',
      name: 'Slack App',
      icon: <MessageCircle className="h-5 w-5" />,
      description: 'Internal team communication',
      status: 'disconnected',
      users: 0,
      messages: 0,
      category: 'messaging'
    },
    
    // Mobile
    {
      id: 'ios',
      name: 'iOS App SDK',
      icon: <Smartphone className="h-5 w-5" />,
      description: 'Native iOS app integration',
      status: 'pending',
      users: 0,
      messages: 0,
      category: 'mobile'
    },
    {
      id: 'android',
      name: 'Android SDK',
      icon: <Smartphone className="h-5 w-5" />,
      description: 'Native Android app integration',
      status: 'disconnected',
      users: 0,
      messages: 0,
      category: 'mobile'
    },
    
    // Voice
    {
      id: 'alexa',
      name: 'Amazon Alexa',
      icon: <Phone className="h-5 w-5" />,
      description: 'Voice assistant integration',
      status: 'disconnected',
      users: 0,
      messages: 0,
      category: 'voice'
    },
    {
      id: 'google-assistant',
      name: 'Google Assistant',
      icon: <Phone className="h-5 w-5" />,
      description: 'Google Assistant actions',
      status: 'disconnected',
      users: 0,
      messages: 0,
      category: 'voice'
    }
  ];

  const stats: DeploymentStats = {
    totalChannels: channels.length,
    activeChannels: channels.filter(c => c.status === 'connected').length,
    totalUsers: channels.reduce((sum, c) => sum + c.users, 0),
    totalMessages: channels.reduce((sum, c) => sum + c.messages, 0)
  };

  const getStatusIcon = (status: Channel['status']) => {
    switch (status) {
      case 'connected':
        return <Wifi className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <div className="h-4 w-4 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />;
      case 'disconnected':
        return <WifiOff className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: Channel['status']) => {
    switch (status) {
      case 'connected':
        return <Badge className="bg-green-100 text-green-800">Connected</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'disconnected':
        return <Badge variant="secondary">Disconnected</Badge>;
    }
  };

  const getCategoryChannels = (category: Channel['category']) => {
    return channels.filter(c => c.category === category);
  };

  const toggleChannel = (channelId: string) => {
    setSelectedChannels(prev => 
      prev.includes(channelId) 
        ? prev.filter(id => id !== channelId)
        : [...prev, channelId]
    );
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Globe className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Multi-Channel Deployment</h1>
              <p className="text-muted-foreground">Deploy your chatbot across 12+ platforms</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Global Settings
            </Button>
            <Button>
              <Zap className="h-4 w-4 mr-2" />
              Deploy All
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="border-b border-border p-6 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Globe className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Channels</p>
              <p className="text-xl font-bold">{stats.totalChannels}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Channels</p>
              <p className="text-xl font-bold">{stats.activeChannels}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Users</p>
              <p className="text-xl font-bold">{stats.totalUsers.toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <BarChart3 className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Messages</p>
              <p className="text-xl font-bold">{stats.totalMessages.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="channels">All Channels</TabsTrigger>
            <TabsTrigger value="web">Web & Mobile</TabsTrigger>
            <TabsTrigger value="social">Social Media</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>

          {/* All Channels */}
          <TabsContent value="channels" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {channels.map((channel) => (
                <Card key={channel.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        {channel.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold">{channel.name}</h3>
                        <p className="text-sm text-muted-foreground">{channel.description}</p>
                      </div>
                    </div>
                    {getStatusIcon(channel.status)}
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Status</span>
                      {getStatusBadge(channel.status)}
                    </div>
                    
                    {channel.status === 'connected' && (
                      <>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Users</span>
                          <span className="font-medium">{channel.users.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Messages</span>
                          <span className="font-medium">{channel.messages.toLocaleString()}</span>
                        </div>
                      </>
                    )}
                    
                    <div className="flex gap-2 pt-2">
                      {channel.status === 'connected' ? (
                        <>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Settings className="h-3 w-3 mr-1" />
                            Configure
                          </Button>
                          <Button variant="outline" size="sm">
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </>
                      ) : (
                        <Button size="sm" className="flex-1">
                          {channel.status === 'pending' ? 'Complete Setup' : 'Connect'}
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Web & Mobile */}
          <TabsContent value="web" className="mt-6">
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Website Integration</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {getCategoryChannels('web').map((channel) => (
                    <Card key={channel.id} className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            {channel.icon}
                          </div>
                          <div>
                            <h4 className="font-medium">{channel.name}</h4>
                            <p className="text-sm text-muted-foreground">{channel.description}</p>
                          </div>
                        </div>
                        {getStatusBadge(channel.status)}
                      </div>
                      
                      {channel.status === 'connected' && (
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Embed Code</span>
                            <Button variant="ghost" size="sm">
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                          <code className="text-xs bg-white p-2 rounded border block">
                            {`<script src="https://buildmybot.app/widget.js" data-bot-id="${channel.id}"></script>`}
                          </code>
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Mobile Apps</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {getCategoryChannels('mobile').map((channel) => (
                    <Card key={channel.id} className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-green-100 rounded-lg">
                            {channel.icon}
                          </div>
                          <div>
                            <h4 className="font-medium">{channel.name}</h4>
                            <p className="text-sm text-muted-foreground">{channel.description}</p>
                          </div>
                        </div>
                        {getStatusBadge(channel.status)}
                      </div>
                      
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full">
                          Download SDK
                        </Button>
                        <Button variant="outline" className="w-full">
                          View Documentation
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Social Media */}
          <TabsContent value="social" className="mt-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getCategoryChannels('social').concat(getCategoryChannels('messaging')).map((channel) => (
                  <Card key={channel.id} className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          {channel.icon}
                        </div>
                        <div>
                          <h4 className="font-medium">{channel.name}</h4>
                          <p className="text-sm text-muted-foreground">{channel.description}</p>
                        </div>
                      </div>
                      {getStatusIcon(channel.status)}
                    </div>
                    
                    <div className="space-y-3">
                      {getStatusBadge(channel.status)}
                      
                      {channel.status === 'connected' && (
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Users</p>
                            <p className="font-semibold">{channel.users.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Messages</p>
                            <p className="font-semibold">{channel.messages.toLocaleString()}</p>
                          </div>
                        </div>
                      )}
                      
                      <Button 
                        variant={channel.status === 'connected' ? 'outline' : 'default'} 
                        className="w-full"
                      >
                        {channel.status === 'connected' ? 'Manage' : 'Connect'}
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Integrations */}
          <TabsContent value="integrations" className="mt-6">
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Voice Assistants</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {getCategoryChannels('voice').map((channel) => (
                    <div key={channel.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-100 rounded-lg">
                          {channel.icon}
                        </div>
                        <div>
                          <h4 className="font-medium">{channel.name}</h4>
                          <p className="text-sm text-muted-foreground">{channel.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(channel.status)}
                        <Button variant="outline" size="sm">
                          Setup
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">API & Webhooks</h3>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">REST API</h4>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Integrate with any platform using our REST API
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Copy className="h-3 w-3 mr-1" />
                        Copy API Key
                      </Button>
                      <Button variant="outline" size="sm">
                        Documentation
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Webhooks</h4>
                      <Badge variant="secondary">Configure</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Receive real-time notifications for events
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      Setup Webhooks
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MultiChannelDeployment;