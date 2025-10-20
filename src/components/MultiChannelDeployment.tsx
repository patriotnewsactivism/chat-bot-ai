import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Globe, 
  MessageSquare, 
  Smartphone, 
  Mail, 
  Phone, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,  
  Telegram, 
  Slack, 
  Discord, 
  Code, 
  Settings, 
  CheckCircle, 
  AlertCircle, 
  Copy, 
  Download, 
  Upload,
  Zap,
  Shield,
  Users,
  BarChart3,
  Eye,
  EyeOff,
  Link,
  QrCode,
  Share2,
  Plus,
  Trash2,
  Edit3
} from 'lucide-react';

interface Channel {
  id: string;
  name: string;
  type: 'website' | 'mobile' | 'social' | 'messaging' | 'email' | 'voice' | 'api';
  icon: any;
  status: 'active' | 'inactive' | 'error';
  config: any;
  metrics: {
    conversations: number;
    users: number;
    satisfaction: number;
  };
  deployed: boolean;
  lastDeployed?: string;
}

interface DeploymentConfig {
  botId: string;
  channels: Channel[];
  globalSettings: {
    branding: {
      primaryColor: string;
      secondaryColor: string;
      logo: string;
      position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
      showBranding: boolean;
    };
    behavior: {
      proactiveChat: boolean;
      welcomeMessage: string;
      awayMessage: string;
      businessHours: {
        enabled: boolean;
        timezone: string;
        hours: Array<{ day: string; open: string; close: string }>;
      };
      escalation: {
        enabled: boolean;
        email: string;
        phone: string;
        fallback: boolean;
      };
    };
    security: {
      rateLimit: boolean;
      encryption: boolean;
      dataRetention: number;
      gdprCompliant: boolean;
    };
  };
}

const MultiChannelDeployment = () => {
  const [config, setConfig] = useState<DeploymentConfig>({
    botId: '1',
    channels: [
      {
        id: '1',
        name: 'Website Widget',
        type: 'website',
        icon: Globe,
        status: 'active',
        config: {
          domain: 'example.com',
          position: 'bottom-right',
          colors: { primary: '#3B82F6', secondary: '#10B981' },
          proactive: true,
          delay: 5000
        },
        metrics: {
          conversations: 1247,
          users: 892,
          satisfaction: 4.6
        },
        deployed: true,
        lastDeployed: '2024-01-15T10:30:00Z'
      },
      {
        id: '2',
        name: 'Facebook Messenger',
        type: 'social',
        icon: Facebook,
        status: 'active',
        config: {
          pageId: '123456789',
          accessToken: '...',
          webhookUrl: 'https://api.buildmybot.app/webhook/facebook'
        },
        metrics: {
          conversations: 892,
          users: 567,
          satisfaction: 4.4
        },
        deployed: true,
        lastDeployed: '2024-01-14T15:45:00Z'
      },
      {
         metrics: {
          conversations: 0,
          users: 0,
          satisfaction: 0
        },
        deployed: false
      },
      {
        id: '4',
        name: 'Slack Bot',
        type: 'messaging',
        icon: Slack,
        status: 'inactive',
        config: {
          workspaceId: 'T12345678',
          botToken: 'xoxb-...',
          signingSecret: '...'
        },
        metrics: {
          conversations: 0,
          users: 0,
          satisfaction: 0
        },
        deployed: false
      }
    ],
    globalSettings: {
      branding: {
        primaryColor: '#3B82F6',
        secondaryColor: '#10B981',
        logo: '',
        position: 'bottom-right',
        showBranding: false
      },
      behavior: {
        proactiveChat: true,
        welcomeMessage: 'Hello! How can I help you today?',
        awayMessage: 'Sorry, we are currently offline. Please leave a message.',
        businessHours: {
          enabled: true,
          timezone: 'America/New_York',
          hours: [
            { day: 'Monday', open: '09:00', close: '17:00' },
            { day: 'Tuesday', open: '09:00', close: '17:00' },
            { day: 'Wednesday', open: '09:00', close: '17:00' },
            { day: 'Thursday', open: '09:00', close: '17:00' },
            { day: 'Friday', open: '09:00', close: '17:00' },
            { day: 'Saturday', open: '10:00', close: '14:00' },
            { day: 'Sunday', open: 'closed', close: 'closed' }
          ]
        },
        escalation: {
          enabled: true,
          email: 'support@example.com',
          phone: '+1234567890',
          fallback: true
        }
      },
      security: {
        rateLimit: true,
        encryption: true,
        dataRetention: 365,
        gdprCompliant: true
      }
    }
  });

  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [deploying, setDeploying] = useState<string | null>(null);

  const availableChannels = [
    { type: 'website', name: 'Website Widget', icon: Globe, description: 'Embed on your website' },
    { type: 'mobile', name: 'Mobile App SDK', icon: Smartphone, description: 'Integrate into iOS/Android apps' },
    { type: 'social', name: 'Facebook Messenger', icon: Facebook, description: 'Connect Facebook page' },
    { type: 'social', name: 'Instagram DMs', icon: Instagram, description: 'Automate Instagram messages' },
    { type: 'social', name: 'Twitter DMs', icon: Twitter, description: 'Handle Twitter conversations' },
    { type: 'messaging', name: 'WhatsApp Business', icon: Whatsapp, description: 'Business WhatsApp integration' },
    { type: 'messaging', name: 'Telegram Bot', icon: Telegram, description: 'Create Telegram bot' },
    { type: 'messaging', name: 'Slack Bot', icon: Slack, description: 'Internal team communication' },
    { type: 'messaging', name: 'Discord Bot', icon: Discord, description: 'Community server bot' },
    { type: 'email', name: 'Email Auto-responder', icon: Mail, description: 'Automated email responses' },
    { type: 'voice', name: 'Phone IVR', icon: Phone, description: 'Voice call automation' },
    { type: 'api', name: 'Custom API', icon: Code, description: 'REST API integration' }
  ];

  const deployChannel = async (channelId: string) => {
    setDeploying(channelId);
    
    // Simulate deployment
    setTimeout(() => {
      setConfig(prev => ({
        ...prev,
        channels: prev.channels.map(channel =>
          channel.id === channelId
            ? {
                ...channel,
                status: 'active',
                deployed: true,
                lastDeployed: new Date().toISOString(),
                metrics: {
                  conversations: Math.floor(Math.random() * 100),
                  users: Math.floor(Math.random() * 50),
                  satisfaction: 4.0 + Math.random()
                }
              }
            : channel
        )
      }));
      setDeploying(null);
    }, 2000);
  };

  const addChannel = (channelType: any) => {
    const newChannel: Channel = {
      id: Date.now().toString(),
      name: channelType.name,
      type: channelType.type,
      icon: channelType.icon,
      status: 'inactive',
      config: {},
      metrics: {
        conversations: 0,
        users: 0,
        satisfaction: 0
      },
      deployed: false
    };

    setConfig(prev => ({
      ...prev,
      channels: [...prev.channels, newChannel]
    }));
    setSelectedChannel(newChannel.id);
  };

  const removeChannel = (channelId: string) => {
    setConfig(prev => ({
      ...prev,
      channels: prev.channels.filter(channel => channel.id !== channelId)
    }));
    setSelectedChannel(null);
  };

  const generateEmbedCode = (channel: Channel) => {
    if (channel.type === 'website') {
      return `<script src="https://cdn.buildmybot.app/widget.js" data-bot-id="${config.botId}"></script>`;
    }
    return '';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'inactive': return 'text-gray-600 bg-gray-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Multi-Channel Deployment</h1>
              <p className="text-gray-600">Deploy your bot across multiple platforms</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Config
              </Button>
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Import Config
              </Button>
              <Button>
                <Zap className="w-4 h-4 mr-2" />
                Deploy All
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Channels List */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Active Channels</h3>
                <Badge variant="outline">
                  {config.channels.filter(c => c.deployed).length} / {config.channels.length} deployed
                </Badge>
              </div>

              <div className="space-y-4">
                {config.channels.map((channel) => {
                  const Icon = channel.icon;
                  return (
                    <Card
                      key={channel.id}
                      className={`p-4 cursor-pointer transition-all ${
                        selectedChannel === channel.id ? 'ring-2 ring-blue-500' : ''
                      }`}
                      onClick={() => setSelectedChannel(channel.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                            <Icon className="w-6 h-6 text-gray-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{channel.name}</h4>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge className={getStatusColor(channel.status)}>
                                {channel.status}
                              </Badge>
                              {channel.deployed && (
                                <span className="text-xs text-gray-500">
                                  Deployed {new Date(channel.lastDeployed || '').toLocaleDateString()}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <div className="text-right mr-4">
                            <p className="text-sm font-medium">{channel.metrics.conversations}</p>
                            <p className="text-xs text-gray-500">conversations</p>
                          </div>
                          
                          {channel.deployed ? (
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-2" />
                              View
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                deployChannel(channel.id);
                              }}
                              disabled={deploying === channel.id}
                            >
                              {deploying === channel.id ? (
                                <>
                                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2" />
                                  Deploying...
                                </>
                              ) : (
                                <>
                                  <Zap className="w-4 h-4 mr-2" />
                                  Deploy
                                </>
                              )}
                            </Button>
                          )}
                        </div>
                      </div>

                      {channel.deployed && (
                        <div className="mt-4 pt-4 border-t grid grid-cols-3 gap-4 text-center">
                          <div>
                            <p className="text-sm font-medium">{channel.metrics.users}</p>
                            <p className="text-xs text-gray-500">Users</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">{channel.metrics.conversations}</p>
                            <p className="text-xs text-gray-500">Conversations</p>
                          </div>
                          <div>
                            <div className="flex items-center justify-center space-x-1">
                              <span className="text-sm font-medium">{channel.metrics.satisfaction}</span>
                              <span className="text-xs text-gray-500">⭐</span>
                            </div>
                            <p className="text-xs text-gray-500">Satisfaction</p>
                          </div>
                        </div>
                      )}
                    </Card>
                  );
                })}
              </div>

              {/* Add New Channel */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Channel</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {availableChannels.map((channel) => {
                    const Icon = channel.icon;
                    const isAdded = config.channels.some(c => c.type === channel.type && c.name === channel.name);
                    
                    return (
                      <Button
                        key={`${channel.type}-${channel.name}`}
                        variant={isAdded ? "outline" : "default"}
                        size="sm"
                        className="h-auto p-3 flex flex-col items-center space-y-2"
                        onClick={() => !isAdded && addChannel(channel)}
                        disabled={isAdded}
                      >
                        <Icon className="w-6 h-6" />
                        <span className="text-xs text-center">{channel.name}</span>
                        {isAdded && <CheckCircle className="w-3 h-3 text-green-600" />}
                      </Button>
                    );
                  })}
                </div>
              </div>
            </Card>
          </div>

          {/* Channel Configuration */}
          <div className="lg:col-span-1">
            {selectedChannel ? (
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Channel Configuration</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedChannel(null)}
                  >
                    ×
                  </Button>
                </div>

                {(() => {
                  const channel = config.channels.find(c => c.id === selectedChannel);
                  if (!channel) return null;

                  return (
                    <Tabs defaultValue="settings" className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="settings">Settings</TabsTrigger>
                        <TabsTrigger value="embed">Embed</TabsTrigger>
                        <TabsTrigger value="analytics">Analytics</TabsTrigger>
                      </TabsList>

                      <TabsContent value="settings" className="space-y-4">
                        <div>
                          <Label>Channel Name</Label>
                          <Input
                            value={channel.name}
                            onChange={(e) => {
                              setConfig(prev => ({
                                ...prev,
                                channels: prev.channels.map(c =>
                                  c.id === selectedChannel ? { ...c, name: e.target.value } : c
                                )
                              }));
                            }}
                          />
                        </div>

                        <div>
                          <Label>Status</Label>
                          <Select
                            value={channel.status}
                            onValueChange={(value) => {
                              setConfig(prev => ({
                                ...prev,
                                channels: prev.channels.map(c =>
                                  c.id === selectedChannel ? { ...c, status: value as any } : c
                                )
                              }));
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="inactive">Inactive</SelectItem>
                              <SelectItem value="error">Error</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {channel.type === 'website' && (
                          <>
                            <div>
                              <Label>Domain</Label>
                              <Input
                                value={channel.config.domain || ''}
                                onChange={(e) => {
                                  setConfig(prev => ({
                                    ...prev,
                                    channels: prev.channels.map(c =>
                                      c.id === selectedChannel
                                        ? { ...c, config: { ...c.config, domain: e.target.value } }
                                        : c
                                    )
                                  }));
                                }}
                                placeholder="example.com"
                              />
                            </div>

                            <div>
                              <Label>Widget Position</Label>
                              <Select
                                value={channel.config.position || 'bottom-right'}
                                onValueChange={(value) => {
                                  setConfig(prev => ({
                                    ...prev,
                                    channels: prev.channels.map(c =>
                                      c.id === selectedChannel
                                        ? { ...c, config: { ...c.config, position: value } }
                                        : c
                                    )
                                  }));
                                }}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="bottom-right">Bottom Right</SelectItem>
                                  <SelectItem value="bottom-left">Bottom Left</SelectItem>
                                  <SelectItem value="top-right">Top Right</SelectItem>
                                  <SelectItem value="top-left">Top Left</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </>
                        )}

                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Copy className="w-4 h-4 mr-2" />
                            Duplicate
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 text-red-600"
                            onClick={() => removeChannel(selectedChannel)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Remove
                          </Button>
                        </div>
                      </TabsContent>

                      <TabsContent value="embed" className="space-y-4">
                        {channel.type === 'website' && (
                          <>
                            <div>
                              <Label>Embed Code</Label>
                              <Textarea
                                value={generateEmbedCode(channel)}
                                readOnly
                                rows={4}
                                className="font-mono text-xs"
                              />
                            </div>
                            <Button variant="outline" className="w-full">
                              <Copy className="w-4 h-4 mr-2" />
                              Copy Code
                            </Button>
                          </>
                        )}

                        <div>
                          <Label>Webhook URL</Label>
                          <Input
                            value={channel.config.webhookUrl || ''}
                            readOnly
                          />
                        </div>

                        <Button variant="outline" className="w-full">
                          <QrCode className="w-4 h-4 mr-2" />
                          Generate QR Code
                        </Button>
                      </TabsContent>

                      <TabsContent value="analytics" className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <p className="text-2xl font-bold">{channel.metrics.conversations}</p>
                            <p className="text-sm text-gray-600">Total Conversations</p>
                          </div>
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <p className="text-2xl font-bold">{channel.metrics.users}</p>
                            <p className="text-sm text-gray-600">Unique Users</p>
                          </div>
                        </div>

                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <p className="text-2xl font-bold">{channel.metrics.satisfaction} ⭐</p>
                          <p className="text-sm text-gray-600">Average Satisfaction</p>
                        </div>

                        <Button variant="outline" className="w-full">
                          <BarChart3 className="w-4 h-4 mr-2" />
                          View Detailed Analytics
                        </Button>
                      </TabsContent>
                    </Tabs>
                  );
                })()}
              </Card>
            ) : (
              <Card className="p-6">
                <div className="text-center text-gray-500">
                  <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Select a channel to configure</p>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Global Settings */}
        <Card className="p-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Global Settings</h3>
          
          <Tabs defaultValue="branding" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="branding">Branding</TabsTrigger>
              <TabsTrigger value="behavior">Behavior</TabsTrigger>
              <TabsTrigger value="escalation">Escalation</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            <TabsContent value="branding" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Primary Color</Label>
                  <Input
                    type="color"
                    value={config.globalSettings.branding.primaryColor}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      globalSettings: {
                        ...prev.globalSettings,
                        branding: { ...prev.globalSettings.branding, primaryColor: e.target.value }
                      }
                    }))}
                  />
                </div>
                <div>
                  <Label>Secondary Color</Label>
                  <Input
                    type="color"
                    value={config.globalSettings.branding.secondaryColor}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      globalSettings: {
                        ...prev.globalSettings,
                        branding: { ...prev.globalSettings.branding, secondaryColor: e.target.value }
                      }
                    }))}
                  />
                </div>
              </div>

              <div>
                <Label>Default Widget Position</Label>
                <Select
                  value={config.globalSettings.branding.position}
                  onValueChange={(value) => setConfig(prev => ({
                    ...prev,
                    globalSettings: {
                      ...prev.globalSettings,
                      branding: { ...prev.globalSettings.branding, position: value as any }
                    }
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bottom-right">Bottom Right</SelectItem>
                    <SelectItem value="bottom-left">Bottom Left</SelectItem>
                    <SelectItem value="top-right">Top Right</SelectItem>
                    <SelectItem value="top-left">Top Left</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={config.globalSettings.branding.showBranding}
                  onCheckedChange={(checked) => setConfig(prev => ({
                    ...prev,
                    globalSettings: {
                      ...prev.globalSettings,
                      branding: { ...prev.globalSettings.branding, showBranding: checked }
                    }
                  }))}
                />
                <Label>Show "Powered by BuildMyBot" branding</Label>
              </div>
            </TabsContent>

            <TabsContent value="behavior" className="space-y-4">
              <div>
                <Label>Welcome Message</Label>
                <Textarea
                  value={config.globalSettings.behavior.welcomeMessage}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    globalSettings: {
                      ...prev.globalSettings,
                      behavior: { ...prev.globalSettings.behavior, welcomeMessage: e.target.value }
                    }
                  }))}
                  rows={3}
                />
              </div>

              <div>
                <Label>Away Message</Label>
                <Textarea
                  value={config.globalSettings.behavior.awayMessage}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    globalSettings: {
                      ...prev.globalSettings,
                      behavior: { ...prev.globalSettings.behavior, awayMessage: e.target.value }
                    }
                  }))}
                  rows={3}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={config.globalSettings.behavior.proactiveChat}
                  onCheckedChange={(checked) => setConfig(prev => ({
                    ...prev,
                    globalSettings: {
                      ...prev.globalSettings,
                      behavior: { ...prev.globalSettings.behavior, proactiveChat: checked }
                    }
                  }))}
                />
                <Label>Enable proactive chat</Label>
              </div>
            </TabsContent>

            <TabsContent value="escalation" className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={config.globalSettings.escalation.enabled}
                  onCheckedChange={(checked) => setConfig(prev => ({
                    ...prev,
                    globalSettings: {
                      ...prev.globalSettings,
                      escalation: { ...prev.globalSettings.escalation, enabled: checked }
                    }
                  }))}
                />
                <Label>Enable human escalation</Label>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Escalation Email</Label>
                  <Input
                    type="email"
                    value={config.globalSettings.escalation.email}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      globalSettings: {
                        ...prev.globalSettings,
                        escalation: { ...prev.globalSettings.escalation, email: e.target.value }
                      }
                    }))}
                  />
                </div>
                <div>
                  <Label>Escalation Phone</Label>
                  <Input
                    type="tel"
                    value={config.globalSettings.escalation.phone}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      globalSettings: {
                        ...prev.globalSettings,
                        escalation: { ...prev.globalSettings.escalation, phone: e.target.value }
                      }
                    }))}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="security" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={config.globalSettings.security.rateLimit}
                    onCheckedChange={(checked) => setConfig(prev => ({
                      ...prev,
                      globalSettings: {
                        ...prev.globalSettings,
                        security: { ...prev.globalSettings.security, rateLimit: checked }
                      }
                    }))}
                  />
                  <Label>Enable rate limiting</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    checked={config.globalSettings.security.encryption}
                    onCheckedChange={(checked) => setConfig(prev => ({
                      ...prev,
                      globalSettings: {
                        ...prev.globalSettings,
                        security: { ...prev.globalSettings.security, encryption: checked }
                      }
                    }))}
                  />
                  <Label>Enable end-to-end encryption</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    checked={config.globalSettings.security.gdprCompliant}
                    onCheckedChange={(checked) => setConfig(prev => ({
                      ...prev,
                      globalSettings: {
                        ...prev.globalSettings,
                        security: { ...prev.globalSettings.security, gdprCompliant: checked }
                      }
                    }))}
                  />
                  <Label>GDPR compliant</Label>
                </div>
              </div>

              <div>
                <Label>Data Retention (days)</Label>
                <Input
                  type="number"
                  value={config.globalSettings.security.dataRetention}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    globalSettings: {
                      ...prev.globalSettings,
                      security: { ...prev.globalSettings.security, dataRetention: parseInt(e.target.value) }
                    }
                  }))}
                />
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default MultiChannelDeployment;
