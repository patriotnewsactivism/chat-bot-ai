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
  Database, 
  Mail, 
  Phone, 
  Calendar, 
  ShoppingCart, 
  Users, 
  MessageSquare, 
  Zap, 
  Settings, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  BarChart3, 
  Link, 
  Unlink, 
  RefreshCw, 
  Eye, 
  EyeOff, 
  Copy, 
  Trash2, 
  Plus, 
  Edit3, 
  Save, 
  TestTube, 
  Key, 
  Shield, 
  Activity, 
  TrendingUp, 
  Download, 
  Upload, 
  Filter, 
  Search, 
  Code, 
  GitBranch, 
  Package, 
  Cloud, 
  Server, 
  Lock, 
  Unlock, 
  Wifi, 
  Smartphone, 
  Monitor, 
  Tablet 
} from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  type: 'crm' | 'helpdesk' | 'ecommerce' | 'communication' | 'analytics' | 'database' | 'api' | 'custom';
  category: string;
  description: string;
  icon: any;
  status: 'connected' | 'disconnected' | 'error' | 'pending';
  config: any;
  metrics: {
    requests: number;
    errors: number;
    lastSync: string;
    dataPoints: number;
  };
  features: string[];
  pricing?: string;
  documentation?: string;
}

interface Webhook {
  id: string;
  name: string;
  url: string;
  events: string[];
  status: 'active' | 'inactive' | 'error';
  secret: string;
  lastTriggered: string;
  successRate: number;
}

interface ApiKey {
  id: string;
  name: string;
  key: string;
  permissions: string[];
  rateLimit: number;
  expires?: string;
  lastUsed: string;
  created: string;
}

const AdvancedIntegrations = () => {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: '1',
      name: 'Salesforce',
      type: 'crm',
      category: 'CRM & Sales',
      description: 'Connect your CRM to sync customer data and conversations',
      icon: Users,
      status: 'connected',
      config: {
        apiKey: '...',
        instanceUrl: 'https://acme.my.salesforce.com',
        username: 'api@acme.com',
        syncFrequency: 'realtime',
        fields: ['contacts', 'leads', 'opportunities', 'cases']
      },
      metrics: {
        requests: 12450,
        errors: 23,
        lastSync: '2024-01-15T10:30:00Z',
        dataPoints: 8934
      },
      features: ['Contact Sync', 'Lead Capture', 'Conversation Logging', 'Deal Tracking']
    },
    {
      id: '2',
      name: 'Zendesk',
      type: 'helpdesk',
      category: 'Customer Support',
      description: 'Integrate with your helpdesk to create and update tickets',
      icon: MessageSquare,
      status: 'connected',
      config: {
        subdomain: 'acme',
        apiKey: '...',
        email: 'support@acme.com',
        autoCreateTickets: true,
        escalationRules: true
      },
      metrics: {
        requests: 8932,
        errors: 12,
        lastSync: '2024-01-15T09:45:00Z',
        dataPoints: 5678
      },
      features: ['Ticket Creation', 'Agent Handoff', 'Knowledge Base Sync', 'SLA Tracking']
    },
    {
      id: '3',
      name: 'Shopify',
      type: 'ecommerce',
      category: 'E-commerce',
      description: 'Connect your store for product recommendations and order tracking',
      icon: ShoppingCart,
      status: 'disconnected',
      config: {
        shopUrl: 'acme.myshopify.com',
        accessToken: '...',
        webhookSecret: '...',
        syncProducts: true,
        syncOrders: true
      },
      metrics: {
        requests: 0,
        errors: 0,
        lastSync: '',
        dataPoints: 0
      },
      features: ['Product Catalog', 'Order Status', 'Inventory Sync', 'Customer Data']
    },
    {
      id: '4',
      name: 'Slack',
      type: 'communication',
      category: 'Team Collaboration',
      description: 'Get notifications and manage bots from Slack',
      icon: MessageSquare,
      status: 'connected',
      config: {
        botToken: 'xoxb-...',
        channelId: '#support',
        notifications: true,
        commands: true
      },
      metrics: {
        requests: 3456,
        errors: 2,
        lastSync: '2024-01-15T11:15:00Z',
        dataPoints: 1234
      },
      features: ['Notifications', 'Commands', 'Analytics', 'Team Collaboration']
    }
  ]);

  const [webhooks, setWebhooks] = useState<Webhook[]>([
    {
      id: '1',
      name: 'Conversation Events',
      url: 'https://api.acme.com/webhooks/bot-events',
      events: ['conversation.started', 'conversation.ended', 'message.received'],
      status: 'active',
      secret: 'whsec_...',
      lastTriggered: '2024-01-15T10:30:00Z',
      successRate: 98.5
    },
    {
      id: '2',
      name: 'Lead Generation',
      url: 'https://crm.acme.com/webhooks/leads',
      events: ['lead.captured', 'contact.created'],
      status: 'active',
      secret: 'whsec_...',
      lastTriggered: '2024-01-15T09:45:00Z',
      successRate: 99.2
    }
  ]);

  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: '1',
      name: 'Production API Key',
      key: 'bmb_prod_...',
      permissions: ['read', 'write', 'admin'],
      rateLimit: 10000,
      expires: '2025-01-15T00:00:00Z',
      lastUsed: '2024-01-15T10:30:00Z',
      created: '2024-01-01T00:00:00Z'
    },
    {
      id: '2',
      name: 'Testing API Key',
      key: 'bmb_test_...',
      permissions: ['read', 'write'],
      rateLimit: 1000,
      lastUsed: '2024-01-14T15:45:00Z',
      created: '2024-01-10T00:00:00Z'
    }
  ]);

  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('integrations');
  const [testingConnection, setTestingConnection] = useState<string | null>(null);

  const availableIntegrations = [
    {
      type: 'crm',
      name: 'HubSpot',
      description: 'Inbound marketing, sales, and service software',
      icon: Database,
      features: ['Contact Sync', 'Deal Tracking', 'Marketing Automation']
    },
    {
      type: 'crm',
      name: 'Pipedrive',
      description: 'Sales-focused CRM software',
      icon: TrendingUp,
      features: ['Lead Management', 'Deal Pipeline', 'Activity Tracking']
    },
    {
      type: 'helpdesk',
      name: 'Freshdesk',
      description: 'Customer support software',
      icon: MessageSquare,
      features: ['Ticket Management', 'Knowledge Base', 'Multi-channel Support']
    },
    {
      type: 'helpdesk',
      name: 'Intercom',
      description: 'Customer messaging platform',
      icon: MessageSquare,
      features: ['Live Chat', 'Support Tickets', 'Customer Engagement']
    },
    {
      type: 'ecommerce',
      name: 'WooCommerce',
      description: 'WordPress e-commerce plugin',
      icon: ShoppingCart,
      features: ['Product Sync', 'Order Management', 'Customer Data']
    },
    {
      type: 'ecommerce',
      name: 'Magento',
      description: 'Open-source e-commerce platform',
      icon: ShoppingCart,
      features: ['Catalog Sync', 'Order Tracking', 'Inventory Management']
    },
    {
      type: 'communication',
      name: 'Microsoft Teams',
      description: 'Team collaboration platform',
      icon: Users,
      features: ['Notifications', 'Commands', 'Meeting Integration']
    },
    {
      type: 'communication',
      name: 'Discord',
      description: 'Community communication platform',
      icon: MessageSquare,
      features: ['Server Notifications', 'Bot Commands', 'Community Management']
    },
    {
      type: 'analytics',
      name: 'Google Analytics',
      description: 'Web analytics service',
      icon: BarChart3,
      features: ['Conversation Tracking', 'User Behavior', 'Conversion Analytics']
    },
    {
      type: 'analytics',
      name: 'Mixpanel',
      description: 'Product analytics platform',
      icon: BarChart3,
      features: ['Event Tracking', 'User Segmentation', 'Funnel Analysis']
    },
    {
      type: 'database',
      name: 'PostgreSQL',
      description: 'Open-source relational database',
      icon: Database,
      features: ['Data Storage', 'Query Interface', 'Real-time Sync']
    },
    {
      type: 'database',
      name: 'MongoDB',
      description: 'NoSQL document database',
      icon: Database,
      features: ['Document Storage', 'Flexible Schema', 'Scalable Architecture']
    }
  ];

  const connectIntegration = (integration: any) => {
    const newIntegration: Integration = {
      id: Date.now().toString(),
      name: integration.name,
      type: integration.type,
      category: getCategoryName(integration.type),
      description: integration.description,
      icon: integration.icon,
      status: 'pending',
      config: {},
      metrics: {
        requests: 0,
        errors: 0,
        lastSync: '',
        dataPoints: 0
      },
      features: integration.features
    };

    setIntegrations(prev => [...prev, newIntegration]);
    setSelectedIntegration(newIntegration.id);
  };

  const testConnection = async (integrationId: string) => {
    setTestingConnection(integrationId);
    
    // Simulate connection test
    setTimeout(() => {
      setIntegrations(prev => prev.map(integration =>
        integration.id === integrationId
          ? {
              ...integration,
              status: Math.random() > 0.2 ? 'connected' : 'error',
              metrics: {
                ...integration.metrics,
                lastSync: new Date().toISOString()
              }
            }
          : integration
      ));
      setTestingConnection(null);
    }, 2000);
  };

  const disconnectIntegration = (integrationId: string) => {
    setIntegrations(prev => prev.map(integration =>
      integration.id === integrationId
        ? { ...integration, status: 'disconnected' as const }
        : integration
    ));
  };

  const createWebhook = () => {
    const newWebhook: Webhook = {
      id: Date.now().toString(),
      name: 'New Webhook',
      url: '',
      events: [],
      status: 'inactive',
      secret: `whsec_${Math.random().toString(36).substring(2, 15)}`,
      lastTriggered: '',
      successRate: 0
    };

    setWebhooks(prev => [...prev, newWebhook]);
  };

  const createApiKey = () => {
    const newApiKey: ApiKey = {
      id: Date.now().toString(),
      name: 'New API Key',
      key: `bmb_${Math.random().toString(36).substring(2, 15)}`,
      permissions: ['read'],
      rateLimit: 1000,
      lastUsed: '',
      created: new Date().toISOString()
    };

    setApiKeys(prev => [...prev, newApiKey]);
  };

  const getCategoryName = (type: string) => {
    const categories: Record<string, string> = {
      crm: 'CRM & Sales',
      helpdesk: 'Customer Support',
      ecommerce: 'E-commerce',
      communication: 'Team Collaboration',
      analytics: 'Analytics & Reporting',
      database: 'Database & Storage',
      api: 'API & Custom',
      custom: 'Custom Integration'
    };
    return categories[type] || 'Other';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
      case 'active':
        return 'text-green-600 bg-green-100';
      case 'disconnected':
      case 'inactive':
        return 'text-gray-600 bg-gray-100';
      case 'error':
        return 'text-red-600 bg-red-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Advanced Integrations</h1>
              <p className="text-gray-600">Connect your favorite tools and automate workflows</p>
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
                <Plus className="w-4 h-4 mr-2" />
                Add Integration
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
            <TabsTrigger value="api">API Keys</TabsTrigger>
            <TabsTrigger value="custom">Custom</TabsTrigger>
          </TabsList>

          <TabsContent value="integrations" className="space-y-6">
            {/* Connected Integrations */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Connected Integrations</h3>
                <Badge variant="outline">
                  {integrations.filter(i => i.status === 'connected').length} active
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {integrations.map((integration) => {
                  const Icon = integration.icon;
                  return (
                    <Card key={integration.id} className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <Icon className="w-5 h-5 text-gray-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{integration.name}</h4>
                            <p className="text-xs text-gray-500">{integration.category}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(integration.status)}>
                          {integration.status}
                        </Badge>
                      </div>

                      <p className="text-sm text-gray-600 mb-4">{integration.description}</p>

                      {integration.status === 'connected' && (
                        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <span className="text-gray-500">Requests:</span>
                              <span className="ml-1 font-medium">{integration.metrics.requests.toLocaleString()}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Errors:</span>
                              <span className="ml-1 font-medium text-red-600">{integration.metrics.errors}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Data Points:</span>
                              <span className="ml-1 font-medium">{integration.metrics.dataPoints.toLocaleString()}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Success Rate:</span>
                              <span className="ml-1 font-medium text-green-600">
                                {((1 - integration.metrics.errors / integration.metrics.requests) * 100).toFixed(1)}%
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          onClick={() => setSelectedIntegration(integration.id)}
                        >
                          <Settings className="w-4 h-4 mr-2" />
                          Configure
                        </Button>
                        
                        {integration.status === 'connected' ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => disconnectIntegration(integration.id)}
                          >
                            <Unlink className="w-4 h-4" />
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => testConnection(integration.id)}
                            disabled={testingConnection === integration.id}
                          >
                            {testingConnection === integration.id ? (
                              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <Link className="w-4 h-4" />
                            )}
                          </Button>
                        )}
                      </div>
                    </Card>
                  );
                })}
              </div>
            </Card>

            {/* Available Integrations */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Integrations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {availableIntegrations.map((integration, index) => {
                  const Icon = integration.icon;
                  const isConnected = integrations.some(i => i.name === integration.name);
                  
                  return (
                    <Card
                      key={index}
                      className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                        isConnected ? 'opacity-50' : ''
                      }`}
                      onClick={() => !isConnected && connectIntegration(integration)}
                    >
                      <div className="text-center">
                        <Icon className="w-8 h-8 text-gray-600 mx-auto mb-3" />
                        <h4 className="font-semibold text-gray-900 mb-1">{integration.name}</h4>
                        <p className="text-xs text-gray-600 mb-3">{integration.description}</p>
                        <Button
                          size="sm"
                          disabled={isConnected}
                          className="w-full"
                        >
                          {isConnected ? 'Connected' : 'Connect'}
                        </Button>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="webhooks" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Webhooks</h3>
                <Button onClick={createWebhook}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Webhook
                </Button>
              </div>

              <div className="space-y-4">
                {webhooks.map((webhook) => (
                  <Card key={webhook.id} className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900">{webhook.name}</h4>
                        <p className="text-sm text-gray-600 font-mono">{webhook.url}</p>
                      </div>
                      <Badge className={getStatusColor(webhook.status)}>
                        {webhook.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <Label>Events</Label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {webhook.events.map((event, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {event}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Label>Success Rate</Label>
                        <p className="font-semibold">{webhook.successRate}%</p>
                      </div>
                      <div>
                        <Label>Last Triggered</Label>
                        <p className="text-sm text-gray-600">
                          {webhook.lastTriggered ? new Date(webhook.lastTriggered).toLocaleString() : 'Never'}
                        </p>
                      </div>
                      <div>
                        <Label>Secret</Label>
                        <p className="text-sm font-mono">••••••••</p>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <TestTube className="w-4 h-4 mr-2" />
                        Test
                      </Button>
                      <Button size="sm" variant="outline">
                        <Copy className="w-4 h-4 mr-2" />
                        Copy URL
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit3 className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="api" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">API Keys</h3>
                <Button onClick={createApiKey}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create API Key
                </Button>
              </div>

              <div className="space-y-4">
                {apiKeys.map((apiKey) => (
                  <Card key={apiKey.id} className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900">{apiKey.name}</h4>
                        <p className="text-sm font-mono text-gray-600">{apiKey.key}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">
                          {apiKey.rateLimit.toLocaleString()} req/hour
                        </Badge>
                        {apiKey.expires && (
                          <Badge variant="outline">
                            Expires: {new Date(apiKey.expires).toLocaleDateString()}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <Label>Permissions</Label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {apiKey.permissions.map((permission, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {permission}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Label>Last Used</Label>
                        <p className="text-sm text-gray-600">
                          {apiKey.lastUsed ? new Date(apiKey.lastUsed).toLocaleString() : 'Never'}
                        </p>
                      </div>
                      <div>
                        <Label>Created</Label>
                        <p className="text-sm text-gray-600">
                          {new Date(apiKey.created).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <Label>Status</Label>
                        <Badge className="text-green-600 bg-green-100">Active</Badge>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Key
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit3 className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Regenerate
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>

            {/* API Documentation */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">API Documentation</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Quick Start</h4>
                <pre className="text-sm bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
{`curl -X POST https://api.buildmybot.app/v1/chat \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "botId": "your-bot-id",
    "message": "Hello, bot!",
    "userId": "user-123"
  }'`}
                </pre>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="custom" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Custom Integration Builder</h3>
              <p className="text-gray-600 mb-6">Build custom integrations using our REST API and webhooks</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Integration Name</Label>
                  <Input placeholder="My Custom Integration" />
                </div>
                <div>
                  <Label>Integration Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="api">REST API</SelectItem>
                      <SelectItem value="webhook">Webhook</SelectItem>
                      <SelectItem value="database">Database</SelectItem>
                      <SelectItem value="file">File Import/Export</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label>Description</Label>
                  <Textarea placeholder="Describe your custom integration..." rows={3} />
                </div>
                <div className="md:col-span-2">
                  <Label>Authentication</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select authentication method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="apikey">API Key</SelectItem>
                      <SelectItem value="oauth">OAuth 2.0</SelectItem>
                      <SelectItem value="basic">Basic Auth</SelectItem>
                      <SelectItem value="bearer">Bearer Token</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-6">
                <Button>
                  <Code className="w-4 h-4 mr-2" />
                  Create Custom Integration
                </Button>
              </div>
            </Card>

            {/* Integration Templates */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Integration Templates</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4">
                  <div className="text-center">
                    <Database className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">Database Sync</h4>
                    <p className="text-sm text-gray-600 mb-3">Sync conversation data with your database</p>
                    <Button size="sm" variant="outline">Use Template</Button>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="text-center">
                    <Mail className="w-8 h-8 text-green-600 mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">Email Notifications</h4>
                    <p className="text-sm text-gray-600 mb-3">Send email alerts for important events</p>
                    <Button size="sm" variant="outline">Use Template</Button>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="text-center">
                    <BarChart3 className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">Analytics Pipeline</h4>
                    <p className="text-sm text-gray-600 mb-3">Stream data to analytics platforms</p>
                    <Button size="sm" variant="outline">Use Template</Button>
                  </div>
                </Card>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdvancedIntegrations;