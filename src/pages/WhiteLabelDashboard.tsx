import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Crown, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Settings, 
  Palette,
  Building,
  CreditCard,
  BarChart3,
  UserPlus,
  Globe,
  Zap,
  Star,
  Award
} from 'lucide-react';

interface Client {
  id: string;
  name: string;
  email: string;
  plan: 'starter' | 'professional' | 'enterprise';
  revenue: number;
  bots: number;
  status: 'active' | 'trial' | 'suspended';
  joinDate: string;
}

interface RevenueData {
  month: string;
  revenue: number;
  clients: number;
}

const WhiteLabelDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const clients: Client[] = [
    {
      id: '1',
      name: 'TechCorp Solutions',
      email: 'admin@techcorp.com',
      plan: 'enterprise',
      revenue: 2999,
      bots: 15,
      status: 'active',
      joinDate: '2024-01-15'
    },
    {
      id: '2',
      name: 'StartupXYZ',
      email: 'founder@startupxyz.com',
      plan: 'professional',
      revenue: 299,
      bots: 5,
      status: 'active',
      joinDate: '2024-02-01'
    },
    {
      id: '3',
      name: 'Local Business Inc',
      email: 'owner@localbiz.com',
      plan: 'starter',
      revenue: 99,
      bots: 2,
      status: 'trial',
      joinDate: '2024-02-10'
    },
    {
      id: '4',
      name: 'E-commerce Giant',
      email: 'tech@ecommerce.com',
      plan: 'enterprise',
      revenue: 4999,
      bots: 25,
      status: 'active',
      joinDate: '2024-01-08'
    }
  ];

  const revenueData: RevenueData[] = [
    { month: 'Jan', revenue: 12500, clients: 8 },
    { month: 'Feb', revenue: 18750, clients: 12 },
    { month: 'Mar', revenue: 24300, clients: 15 },
    { month: 'Apr', revenue: 31200, clients: 18 },
    { month: 'May', revenue: 28900, clients: 17 },
    { month: 'Jun', revenue: 35600, clients: 21 }
  ];

  const totalRevenue = clients.reduce((sum, client) => sum + client.revenue, 0);
  const totalClients = clients.length;
  const activeClients = clients.filter(c => c.status === 'active').length;
  const totalBots = clients.reduce((sum, client) => sum + client.bots, 0);

  const getPlanBadge = (plan: Client['plan']) => {
    switch (plan) {
      case 'starter':
        return <Badge variant="secondary">Starter</Badge>;
      case 'professional':
        return <Badge className="bg-blue-100 text-blue-800">Professional</Badge>;
      case 'enterprise':
        return <Badge className="bg-purple-100 text-purple-800">Enterprise</Badge>;
    }
  };

  const getStatusBadge = (status: Client['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'trial':
        return <Badge className="bg-yellow-100 text-yellow-800">Trial</Badge>;
      case 'suspended':
        return <Badge className="bg-red-100 text-red-800">Suspended</Badge>;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border p-6 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg">
              <Crown className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">White-Label Partner Dashboard</h1>
              <p className="text-muted-foreground">Manage your reseller business and client accounts</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-4 py-2">
              <Crown className="h-4 w-4 mr-2" />
              Premium Partner
            </Badge>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Add Client
            </Button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="border-b border-border p-6 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Revenue</p>
                <p className="text-2xl font-bold">${totalRevenue.toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-1">+23% from last month</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Clients</p>
                <p className="text-2xl font-bold">{totalClients}</p>
                <p className="text-xs text-blue-600 mt-1">{activeClients} active</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Bots</p>
                <p className="text-2xl font-bold">{totalBots}</p>
                <p className="text-xs text-purple-600 mt-1">Across all clients</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Commission Rate</p>
                <p className="text-2xl font-bold">50%</p>
                <p className="text-xs text-orange-600 mt-1">+ 20% tier 2</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="flex-1 p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="branding">Branding</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Revenue Trend
                </h3>
                <div className="space-y-4">
                  {revenueData.slice(-3).map((data, index) => (
                    <div key={data.month} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{data.month} 2024</p>
                        <p className="text-sm text-muted-foreground">{data.clients} clients</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${data.revenue.toLocaleString()}</p>
                        <p className="text-xs text-green-600">
                          {index > 0 ? '+' : ''}
                          {index > 0 ? Math.round(((data.revenue - revenueData[revenueData.length - 3 + index - 1].revenue) / revenueData[revenueData.length - 3 + index - 1].revenue) * 100) : 0}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Top Performing Clients
                </h3>
                <div className="space-y-3">
                  {clients
                    .sort((a, b) => b.revenue - a.revenue)
                    .slice(0, 4)
                    .map((client, index) => (
                      <div key={client.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium">{client.name}</p>
                            <p className="text-sm text-muted-foreground">{client.bots} bots</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${client.revenue}</p>
                          {getPlanBadge(client.plan)}
                        </div>
                      </div>
                    ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Partner Benefits
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium">50% Revenue Share</p>
                      <p className="text-sm text-muted-foreground">On all direct sales</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium">20% Tier 2 Commission</p>
                      <p className="text-sm text-muted-foreground">From referred partners</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-purple-500" />
                    <div>
                      <p className="font-medium">White-Label Rights</p>
                      <p className="text-sm text-muted-foreground">Full branding control</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-orange-500" />
                    <div>
                      <p className="font-medium">Priority Support</p>
                      <p className="text-sm text-muted-foreground">Dedicated account manager</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Button className="w-full justify-start">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Invite New Client
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Palette className="h-4 w-4 mr-2" />
                    Customize Branding
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Analytics
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Billing & Payouts
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Clients Tab */}
          <TabsContent value="clients" className="mt-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Client Management</h3>
                <div className="flex gap-2">
                  <Button variant="outline">
                    Export List
                  </Button>
                  <Button>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Client
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clients.map((client) => (
                  <Card key={client.id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold">{client.name}</h4>
                        <p className="text-sm text-muted-foreground">{client.email}</p>
                      </div>
                      {getStatusBadge(client.status)}
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Plan</span>
                        {getPlanBadge(client.plan)}
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Monthly Revenue</span>
                        <span className="font-medium">${client.revenue}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Active Bots</span>
                        <span className="font-medium">{client.bots}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Join Date</span>
                        <span className="font-medium">{client.joinDate}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4 pt-4 border-t">
                      <Button variant="outline" size="sm" className="flex-1">
                        Manage
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        Login As
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Revenue Tab */}
          <TabsContent value="revenue" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Revenue Breakdown</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="font-medium">Direct Sales (50%)</span>
                    <span className="font-bold">${Math.round(totalRevenue * 0.5).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium">Tier 2 Commission (20%)</span>
                    <span className="font-bold">${Math.round(totalRevenue * 0.2).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="font-medium">Bonuses & Incentives</span>
                    <span className="font-bold">$2,500</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Total Monthly Earnings</span>
                      <span className="text-xl font-bold text-green-600">
                        ${Math.round(totalRevenue * 0.7 + 2500).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Payout Information</h3>
                <div className="space-y-4">
                  <div>
                    <Label>Payout Method</Label>
                    <div className="mt-2 p-3 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        <span>Bank Transfer - ****1234</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label>Next Payout Date</Label>
                    <p className="text-sm text-muted-foreground mt-1">March 1st, 2024</p>
                  </div>
                  <div>
                    <Label>Payout Frequency</Label>
                    <p className="text-sm text-muted-foreground mt-1">Monthly (1st of each month)</p>
                  </div>
                  <Button className="w-full">
                    Update Payout Settings
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Branding Tab */}
          <TabsContent value="branding" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Brand Customization
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input id="company-name" placeholder="Your Company Name" />
                  </div>
                  <div>
                    <Label htmlFor="company-logo">Company Logo URL</Label>
                    <Input id="company-logo" placeholder="https://yoursite.com/logo.png" />
                  </div>
                  <div>
                    <Label htmlFor="primary-color">Primary Color</Label>
                    <div className="flex gap-2">
                      <Input id="primary-color" placeholder="#6366f1" className="flex-1" />
                      <div className="w-12 h-10 bg-indigo-500 rounded border"></div>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="custom-domain">Custom Domain</Label>
                    <Input id="custom-domain" placeholder="chatbots.yourcompany.com" />
                  </div>
                  <Button className="w-full">
                    Save Branding
                  </Button>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Brand Preview</h3>
                <div className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-indigo-500 rounded"></div>
                    <span className="font-semibold">Your Company Name</span>
                  </div>
                  <div className="bg-white p-4 rounded border">
                    <h4 className="font-medium mb-2">AI Chatbot Platform</h4>
                    <p className="text-sm text-muted-foreground">
                      Build intelligent chatbots with our white-label solution.
                    </p>
                    <div className="mt-3">
                      <Button size="sm" className="bg-indigo-500 hover:bg-indigo-600">
                        Get Started
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Partner Settings
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="partner-name">Partner Name</Label>
                    <Input id="partner-name" defaultValue="Your Partner Business" />
                  </div>
                  <div>
                    <Label htmlFor="contact-email">Contact Email</Label>
                    <Input id="contact-email" defaultValue="partner@yourcompany.com" />
                  </div>
                  <div>
                    <Label htmlFor="support-email">Support Email</Label>
                    <Input id="support-email" defaultValue="support@yourcompany.com" />
                  </div>
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input id="website" defaultValue="https://yourcompany.com" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Commission Structure</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Direct Sales Commission</span>
                      <span className="font-bold text-green-600">50%</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Earn 50% on all clients you directly refer
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Tier 2 Commission</span>
                      <span className="font-bold text-blue-600">20%</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Earn 20% on sales from partners you refer
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Volume Bonus</span>
                      <span className="font-bold text-purple-600">Up to 10%</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Additional bonus for high-volume partners
                    </p>
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

export default WhiteLabelDashboard;