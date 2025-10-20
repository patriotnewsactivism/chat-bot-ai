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
  Palette, 
  Code, 
  Globe, 
  Mail, 
  Smartphone, 
  Monitor, 
  Tablet, 
  Settings, 
  Eye, 
  EyeOff, 
  Download, 
  Upload, 
  Save, 
  Copy, 
  RefreshCw, 
  CheckCircle, 
  AlertCircle, 
  Zap, 
  Package, 
  Users, 
  BarChart3, 
  Lock, 
  Key, 
  Shield, 
  Crown, 
  Star, 
  Award, 
  Target, 
  TrendingUp, 
  DollarSign, 
  FileText, 
  Image, 
  Video, 
  Music, 
  Headphones, 
  Camera, 
  Brush, 
  Layers, 
  Grid3X3, 
  Maximize2, 
  Minimize2, 
  Move, 
  RotateCw, 
  FlipHorizontal, 
  FlipVertical 
} from 'lucide-react';

interface WhiteLabelConfig {
  branding: {
    companyName: string;
    productName: string;
    logo: string;
    favicon: string;
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    fontFamily: string;
    tagline: string;
    description: string;
  };
  customization: {
    customCSS: string;
    customJS: string;
    layout: 'default' | 'minimal' | 'modern' | 'classic';
    theme: 'light' | 'dark' | 'auto' | 'custom';
    animations: boolean;
    borderRadius: number;
    shadows: boolean;
    gradients: boolean;
  };
  domain: {
    customDomain: string;
    subdomain: string;
    sslEnabled: boolean;
    cdnEnabled: boolean;
    dnsRecords: Array<{ type: string; name: string; value: string }>;
  };
  features: {
    whiteLabelURL: boolean;
    customEmail: boolean;
    removeBuildMyBotBranding: boolean;
    customAnalytics: boolean;
    apiAccess: boolean;
    prioritySupport: boolean;
    dedicatedInfrastructure: boolean;
    customIntegrations: boolean;
  };
  deployment: {
    hosting: 'shared' | 'dedicated' | 'cloud' | 'onpremise';
    region: string;
    autoScaling: boolean;
    backupFrequency: string;
    monitoring: boolean;
    maintenanceMode: boolean;
  };
  billing: {
    model: 'per_user' | 'per_bot' | 'revenue_share' | 'flat_rate';
    price: number;
    currency: string;
    billingCycle: 'monthly' | 'quarterly' | 'annual';
    customPricing: boolean;
    enterpriseFeatures: boolean;
  };
}

interface ClientInstance {
  id: string;
  name: string;
  domain: string;
  status: 'active' | 'inactive' | 'suspended' | 'maintenance';
  users: number;
  bots: number;
  createdAt: string;
  lastActive: string;
  revenue: number;
  config: Partial<WhiteLabelConfig>;
}

const WhiteLabelDashboard = () => {
  const [config, setConfig] = useState<WhiteLabelConfig>({
    branding: {
      companyName: 'Acme AI Solutions',
      productName: 'ChatBot Pro',
      logo: '',
      favicon: '',
      primaryColor: '#3B82F6',
      secondaryColor: '#10B981',
      accentColor: '#F59E0B',
      fontFamily: 'Inter',
      tagline: 'AI-powered conversations for your business',
      description: 'Build and deploy intelligent chatbots with our white-label platform'
    },
    customization: {
      customCSS: '',
      customJS: '',
      layout: 'modern',
      theme: 'light',
      animations: true,
      borderRadius: 8,
      shadows: true,
      gradients: true
    },
    domain: {
      customDomain: 'chat.acme.com',
      subdomain: 'acme-chat',
      sslEnabled: true,
      cdnEnabled: true,
      dnsRecords: [
        { type: 'A', name: '@', value: '192.168.1.1' },
        { type: 'CNAME', name: 'www', value: 'chat.acme.com' },
        { type: 'MX', name: '@', value: 'mail.acme.com' }
      ]
    },
    features: {
      whiteLabelURL: true,
      customEmail: true,
      removeBuildMyBotBranding: true,
      customAnalytics: true,
      apiAccess: true,
      prioritySupport: true,
      dedicatedInfrastructure: true,
      customIntegrations: true
    },
    deployment: {
      hosting: 'dedicated',
      region: 'us-west-2',
      autoScaling: true,
      backupFrequency: 'daily',
      monitoring: true,
      maintenanceMode: false
    },
    billing: {
      model: 'revenue_share',
      price: 15,
      currency: 'USD',
      billingCycle: 'monthly',
      customPricing: true,
      enterpriseFeatures: true
    }
  });

  const [clientInstances, setClientInstances] = useState<ClientInstance[]>([
    {
      id: '1',
      name: 'Acme AI Solutions',
      domain: 'chat.acme.com',
      status: 'active',
      users: 250,
      bots: 50,
      createdAt: '2024-01-01T00:00:00Z',
      lastActive: '2024-01-15T10:30:00Z',
      revenue: 12450,
      config: config
    },
    {
      id: '2',
      name: 'Global Tech Corp',
      domain: 'ai.globaltech.com',
      status: 'active',
      users: 500,
      bots: 100,
      createdAt: '2024-01-05T00:00:00Z',
      lastActive: '2024-01-15T09:45:00Z',
      revenue: 28900,
      config: { ...config, branding: { ...config.branding, companyName: 'Global Tech Corp' } }
    },
    {
      id: '3',
      name: 'StartupHub',
      domain: 'chat.startuphub.io',
      status: 'maintenance',
      users: 50,
      bots: 15,
      createdAt: '2024-01-10T00:00:00Z',
      lastActive: '2024-01-14T16:20:00Z',
      revenue: 3200,
      config: { ...config, branding: { ...config.branding, companyName: 'StartupHub' } }
    }
  ]);

  const [activeTab, setActiveTab] = useState('overview');
  const [previewMode, setPreviewMode] = useState(false);
  const [saving, setSaving] = useState(false);

  const metrics = {
    totalRevenue: 44550,
    totalClients: 3,
    totalUsers: 800,
    totalBots: 165,
    avgRevenuePerClient: 14850,
    growth: 23.5,
    uptime: 99.98,
    supportTickets: 12
  };

  const saveConfig = async () => {
    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      // Show success message
    }, 2000);
  };

  const deployInstance = (clientId: string) => {
    setClientInstances(prev => prev.map(instance =>
      instance.id === clientId
        ? { ...instance, status: 'active' as const, lastActive: new Date().toISOString() }
        : instance
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'inactive': return 'text-gray-600 bg-gray-100';
      case 'suspended': return 'text-red-600 bg-red-100';
      case 'maintenance': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const exportConfig = () => {
    const dataStr = JSON.stringify(config, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'whitelabel-config.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">White Label Dashboard</h1>
              <p className="text-gray-600">Manage your white-label AI platform</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-purple-600 border-purple-600">
                <Crown className="w-4 h-4 mr-2" />
                White Label Plan
              </Badge>
              <Button variant="outline" onClick={exportConfig}>
                <Download className="w-4 h-4 mr-2" />
                Export Config
              </Button>
              <Button onClick={saveConfig} disabled={saving}>
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Overview Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${metrics.totalRevenue.toLocaleString()}</p>
                <p className="text-xs text-green-600">+{metrics.growth}% growth</p>
              </div>
              <div className="p-3 rounded-lg bg-green-100">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Clients</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.totalClients}</p>
                <p className="text-xs text-gray-500">{metrics.totalUsers} total users</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-100">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Bots</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.totalBots}</p>
                <p className="text-xs text-gray-500">Across all clients</p>
              </div>
              <div className="p-3 rounded-lg bg-purple-100">
                <Package className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Platform Uptime</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.uptime}%</p>
                <p className="text-xs text-gray-500">{metrics.supportTickets} support tickets</p>
              </div>
              <div className="p-3 rounded-lg bg-orange-100">
                <Shield className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="branding">Branding</TabsTrigger>
            <TabsTrigger value="customization">Customization</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="deployment">Deployment</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Client Instances */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Client Instances</h3>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Client
                  </Button>
                </div>
                <div className="space-y-4">
                  {clientInstances.map((instance) => (
                    <Card key={instance.id} className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900">{instance.name}</h4>
                          <p className="text-sm text-gray-600">{instance.domain}</p>
                        </div>
                        <Badge className={getStatusColor(instance.status)}>
                          {instance.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-sm font-medium">{instance.users}</p>
                          <p className="text-xs text-gray-500">Users</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{instance.bots}</p>
                          <p className="text-xs text-gray-500">Bots</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">${instance.revenue.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">Revenue</p>
                        </div>
                      </div>
                      <div className="flex space-x-2 mt-3">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Settings className="w-4 h-4 mr-2" />
                          Configure
                        </Button>
                        {instance.status !== 'active' && (
                          <Button
                            size="sm"
                            onClick={() => deployInstance(instance.id)}
                          >
                            <Zap className="w-4 h-4 mr-2" />
                            Deploy
                          </Button>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Globe className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Domain Management</h4>
                        <p className="text-sm text-gray-600">Configure custom domains and SSL</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="w-full">
                      Manage Domains
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Code className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">API Configuration</h4>
                        <p className="text-sm text-gray-600">Set up API keys and webhooks</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="w-full">
                      Configure API
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Users className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Client Management</h4>
                        <p className="text-sm text-gray-600">Add and manage client instances</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="w-full">
                      Manage Clients
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="branding" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Brand Configuration</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Company Name</Label>
                  <Input
                    value={config.branding.companyName}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      branding: { ...prev.branding, companyName: e.target.value }
                    }))}
                  />
                </div>

                <div>
                  <Label>Product Name</Label>
                  <Input
                    value={config.branding.productName}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      branding: { ...prev.branding, productName: e.target.value }
                    }))}
                  />
                </div>

                <div>
                  <Label>Tagline</Label>
                  <Input
                    value={config.branding.tagline}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      branding: { ...prev.branding, tagline: e.target.value }
                    }))}
                  />
                </div>

                <div>
                  <Label>Font Family</Label>
                  <Select
                    value={config.branding.fontFamily}
                    onValueChange={(value) => setConfig(prev => ({
                      ...prev,
                      branding: { ...prev.branding, fontFamily: value }
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Inter">Inter</SelectItem>
                      <SelectItem value="Roboto">Roboto</SelectItem>
                      <SelectItem value="Open Sans">Open Sans</SelectItem>
                      <SelectItem value="Lato">Lato</SelectItem>
                      <SelectItem value="Montserrat">Montserrat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2">
                  <Label>Description</Label>
                  <Textarea
                    value={config.branding.description}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      branding: { ...prev.branding, description: e.target.value }
                    }))}
                    rows={3}
                  />
                </div>
              </div>

              <div className="mt-6">
                <Label>Brand Colors</Label>
                <div className="grid grid-cols-3 gap-4 mt-2">
                  <div>
                    <Label className="text-sm">Primary Color</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="color"
                        value={config.branding.primaryColor}
                        onChange={(e) => setConfig(prev => ({
                          ...prev,
                          branding: { ...prev.branding, primaryColor: e.target.value }
                        }))}
                      />
                      <Input
                        value={config.branding.primaryColor}
                        onChange={(e) => setConfig(prev => ({
                          ...prev,
                          branding: { ...prev.branding, primaryColor: e.target.value }
                        }))}
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm">Secondary Color</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="color"
                        value={config.branding.secondaryColor}
                        onChange={(e) => setConfig(prev => ({
                          ...prev,
                          branding: { ...prev.branding, secondaryColor: e.target.value }
                        }))}
                      />
                      <Input
                        value={config.branding.secondaryColor}
                        onChange={(e) => setConfig(prev => ({
                          ...prev,
                          branding: { ...prev.branding, secondaryColor: e.target.value }
                        }))}
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm">Accent Color</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="color"
                        value={config.branding.accentColor}
                        onChange={(e) => setConfig(prev => ({
                          ...prev,
                          branding: { ...prev.branding, accentColor: e.target.value }
                        }))}
                      />
                      <Input
                        value={config.branding.accentColor}
                        onChange={(e) => setConfig(prev => ({
                          ...prev,
                          branding: { ...prev.branding, accentColor: e.target.value }
                        }))}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Label>Assets</Label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <Label className="text-sm">Logo</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <Image className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Upload logo</p>
                      <Input type="file" accept="image/*" className="mt-2" />
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm">Favicon</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <Image className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Upload favicon</p>
                      <Input type="file" accept="image/*" className="mt-2" />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="customization" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Customization Options</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Layout Style</Label>
                  <Select
                    value={config.customization.layout}
                    onValueChange={(value) => setConfig(prev => ({
                      ...prev,
                      customization: { ...prev.customization, layout: value as any }
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="minimal">Minimal</SelectItem>
                      <SelectItem value="modern">Modern</SelectItem>
                      <SelectItem value="classic">Classic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Theme</Label>
                  <Select
                    value={config.customization.theme}
                    onValueChange={(value) => setConfig(prev => ({
                      ...prev,
                      customization: { ...prev.customization, theme: value as any }
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="auto">Auto</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Border Radius (px)</Label>
                  <Input
                    type="number"
                    value={config.customization.borderRadius}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      customization: { ...prev.customization, borderRadius: parseInt(e.target.value) }
                    }))}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={config.customization.animations}
                      onCheckedChange={(checked) => setConfig(prev => ({
                        ...prev,
                        customization: { ...prev.customization, animations: checked }
                      }))}
                    />
                    <Label>Enable Animations</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={config.customization.shadows}
                      onCheckedChange={(checked) => setConfig(prev => ({
                        ...prev,
                        customization: { ...prev.customization, shadows: checked }
                      }))}
                    />
                    <Label>Enable Shadows</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={config.customization.gradients}
                      onCheckedChange={(checked) => setConfig(prev => ({
                        ...prev,
                        customization: { ...prev.customization, gradients: checked }
                      }))}
                    />
                    <Label>Enable Gradients</Label>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Label>Custom CSS</Label>
                <Textarea
                  value={config.customization.customCSS}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    customization: { ...prev.customization, customCSS: e.target.value }
                  }))}
                  placeholder="/* Add custom CSS here */"
                  rows={6}
                  className="font-mono text-sm"
                />
              </div>

              <div className="mt-6">
                <Label>Custom JavaScript</Label>
                <Textarea
                  value={config.customization.customJS}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    customization: { ...prev.customization, customJS: e.target.value }
                  }))}
                  placeholder="/* Add custom JavaScript here */"
                  rows={6}
                  className="font-mono text-sm"
                />
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="clients" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Client Management</h3>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Client
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Client</th>
                      <th className="text-left py-3 px-4">Domain</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Users</th>
                      <th className="text-left py-3 px-4">Bots</th>
                      <th className="text-left py-3 px-4">Revenue</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientInstances.map((instance) => (
                      <tr key={instance.id} className="border-b">
                        <td className="py-3 px-4 font-medium">{instance.name}</td>
                        <td className="py-3 px-4">{instance.domain}</td>
                        <td className="py-3 px-4">
                          <Badge className={getStatusColor(instance.status)}>
                            {instance.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">{instance.users}</td>
                        <td className="py-3 px-4">{instance.bots}</td>
                        <td className="py-3 px-4">${instance.revenue.toLocaleString()}</td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <Button size="sm" variant="ghost">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Settings className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="deployment" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Domain Configuration</h3>
                <div className="space-y-4">
                  <div>
                    <Label>Custom Domain</Label>
                    <Input
                      value={config.domain.customDomain}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        domain: { ...prev.domain, customDomain: e.target.value }
                      }))}
                    />
                  </div>
                  <div>
                    <Label>Subdomain</Label>
                    <Input
                      value={config.domain.subdomain}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        domain: { ...prev.domain, subdomain: e.target.value }
                      }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={config.domain.sslEnabled}
                        onCheckedChange={(checked) => setConfig(prev => ({
                          ...prev,
                          domain: { ...prev.domain, sslEnabled: checked }
                        }))}
                      />
                      <Label>Enable SSL Certificate</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={config.domain.cdnEnabled}
                        onCheckedChange={(checked) => setConfig(prev => ({
                          ...prev,
                          domain: { ...prev.domain, cdnEnabled: checked }
                        }))}
                      />
                      <Label>Enable CDN</Label>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Infrastructure</h3>
                <div className="space-y-4">
                  <div>
                    <Label>Hosting Type</Label>
                    <Select
                      value={config.deployment.hosting}
                      onValueChange={(value) => setConfig(prev => ({
                        ...prev,
                        deployment: { ...prev.deployment, hosting: value as any }
                      }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="shared">Shared</SelectItem>
                        <SelectItem value="dedicated">Dedicated</SelectItem>
                        <SelectItem value="cloud">Cloud</SelectItem>
                        <SelectItem value="onpremise">On-Premise</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Region</Label>
                    <Select
                      value={config.deployment.region}
                      onValueChange={(value) => setConfig(prev => ({
                        ...prev,
                        deployment: { ...prev.deployment, region: value }
                      }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us-west-2">US West (Oregon)</SelectItem>
                        <SelectItem value="us-east-1">US East (N. Virginia)</SelectItem>
                        <SelectItem value="eu-west-1">EU West (Ireland)</SelectItem>
                        <SelectItem value="ap-southeast-1">Asia Pacific (Singapore)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Backup Frequency</Label>
                    <Select
                      value={config.deployment.backupFrequency}
                      onValueChange={(value) => setConfig(prev => ({
                        ...prev,
                        deployment: { ...prev.deployment, backupFrequency: value }
                      }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="billing" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Billing Configuration</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Billing Model</Label>
                  <Select
                    value={config.billing.model}
                    onValueChange={(value) => setConfig(prev => ({
                      ...prev,
                      billing: { ...prev.billing, model: value as any }
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="per_user">Per User</SelectItem>
                      <SelectItem value="per_bot">Per Bot</SelectItem>
                      <SelectItem value="revenue_share">Revenue Share</SelectItem>
                      <SelectItem value="flat_rate">Flat Rate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Currency</Label>
                  <Select
                    value={config.billing.currency}
                    onValueChange={(value) => setConfig(prev => ({
                      ...prev,
                      billing: { ...prev.billing, currency: value }
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="GBP">GBP - British Pound</SelectItem>
                      <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Price</Label>
                  <Input
                    type="number"
                    value={config.billing.price}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      billing: { ...prev.billing, price: parseFloat(e.target.value) }
                    }))}
                  />
                </div>

                <div>
                  <Label>Billing Cycle</Label>
                  <Select
                    value={config.billing.billingCycle}
                    onValueChange={(value) => setConfig(prev => ({
                      ...prev,
                      billing: { ...prev.billing, billingCycle: value as any }
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="annual">Annual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={config.billing.customPricing}
                    onCheckedChange={(checked) => setConfig(prev => ({
                      ...prev,
                      billing: { ...prev.billing, customPricing: checked }
                    }))}
                  />
                  <Label>Enable Custom Pricing</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={config.billing.enterpriseFeatures}
                    onCheckedChange={(checked) => setConfig(prev => ({
                      ...prev,
                      billing: { ...prev.billing, enterpriseFeatures: checked }
                    }))}
                  />
                  <Label>Enable Enterprise Features</Label>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WhiteLabelDashboard;