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
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  Users, 
  Building, 
  Settings, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  BarChart3, 
  Lock, 
  Key, 
  UserCheck, 
  Database, 
  Globe, 
  Cpu, 
  HardDrive, 
  Wifi, 
  Zap, 
  TrendingUp, 
  Download, 
  Upload, 
  RefreshCw, 
  Eye, 
  EyeOff, 
  Copy, 
  Trash2, 
  Plus, 
  Edit3, 
  Save, 
  X, 
  Search, 
  Filter, 
  Calendar, 
  FileText, 
  Mail, 
  Phone, 
  MapPin, 
  Award, 
  Star, 
  Target, 
  Flag, 
  Bell, 
  Volume2 
} from 'lucide-react';

interface EnterpriseSettings {
  organization: {
    name: string;
    domain: string;
    industry: string;
    size: string;
    address: string;
    phone: string;
    logo: string;
  };
  security: {
    sso: {
      enabled: boolean;
      provider: 'saml' | 'oauth' | 'ldap';
      config: any;
    };
    mfa: {
      required: boolean;
      methods: string[];
    };
    encryption: {
      atRest: boolean;
      inTransit: boolean;
      keyRotation: number;
    };
    compliance: {
      gdpr: boolean;
      hipaa: boolean;
      soc2: boolean;
      iso27001: boolean;
    };
    audit: {
      enabled: boolean;
      retention: number;
      alerts: boolean;
    };
  };
  infrastructure: {
    hosting: 'cloud' | 'onpremise' | 'hybrid';
    region: string;
    backup: {
      enabled: boolean;
      frequency: string;
      retention: number;
    };
    monitoring: {
      uptime: boolean;
      performance: boolean;
      security: boolean;
    };
    scaling: {
      auto: boolean;
      minInstances: number;
      maxInstances: number;
    };
  };
  billing: {
    plan: 'enterprise';
    users: number;
    bots: number;
    apiCalls: number;
    storage: number;
    customPricing: boolean;
    contactEmail: string;
  };
}

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'developer' | 'analyst' | 'viewer';
  department: string;
  lastActive: string;
  status: 'active' | 'inactive' | 'suspended';
  permissions: string[];
  mfaEnabled: boolean;
}

interface SecurityAlert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  timestamp: string;
  resolved: boolean;
  assignedTo?: string;
}

const EnterpriseDashboard = () => {
  const [settings, setSettings] = useState<EnterpriseSettings>({
    organization: {
      name: 'Acme Corporation',
      domain: 'acme.com',
      industry: 'Technology',
      size: '1000-5000',
      address: '123 Business Ave, San Francisco, CA 94105',
      phone: '+1 (555) 123-4567',
      logo: ''
    },
    security: {
      sso: {
        enabled: true,
        provider: 'saml',
        config: {
          issuer: 'https://sso.acme.com',
          cert: '-----BEGIN CERTIFICATE-----\n...\n-----END CERTIFICATE-----'
        }
      },
      mfa: {
        required: true,
        methods: ['totp', 'sms', 'email']
      },
      encryption: {
        atRest: true,
        inTransit: true,
        keyRotation: 90
      },
      compliance: {
        gdpr: true,
        hipaa: false,
        soc2: true,
        iso27001: true
      },
      audit: {
        enabled: true,
        retention: 365,
        alerts: true
      }
    },
    infrastructure: {
      hosting: 'cloud',
      region: 'us-west-2',
      backup: {
        enabled: true,
        frequency: 'daily',
        retention: 30
      },
      monitoring: {
        uptime: true,
        performance: true,
        security: true
      },
      scaling: {
        auto: true,
        minInstances: 2,
        maxInstances: 10
      }
    },
    billing: {
      plan: 'enterprise',
      users: 250,
      bots: 50,
      apiCalls: 10000000,
      storage: 5000,
      customPricing: true,
      contactEmail: 'enterprise@acme.com'
    }
  });

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@acme.com',
      role: 'admin',
      department: 'IT',
      lastActive: '2024-01-15T10:30:00Z',
      status: 'active',
      permissions: ['all'],
      mfaEnabled: true
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@acme.com',
      role: 'manager',
      department: 'Customer Service',
      lastActive: '2024-01-15T09:45:00Z',
      status: 'active',
      permissions: ['bots:read', 'bots:write', 'analytics:read'],
      mfaEnabled: true
    },
    {
      id: '3',
      name: 'Mike Chen',
      email: 'mike.chen@acme.com',
      role: 'developer',
      department: 'Engineering',
      lastActive: '2024-01-14T16:20:00Z',
      status: 'active',
      permissions: ['bots:read', 'bots:write', 'api:read', 'api:write'],
      mfaEnabled: false
    }
  ]);

  const [securityAlerts, setSecurityAlerts] = useState<SecurityAlert[]>([
    {
      id: '1',
      type: 'critical',
      title: 'Unusual login activity detected',
      description: 'Multiple failed login attempts from unknown IP address',
      timestamp: '2024-01-15T08:30:00Z',
      resolved: false,
      assignedTo: 'security@acme.com'
    },
    {
      id: '2',
      type: 'warning',
      title: 'SSL certificate expiring soon',
      description: 'SSL certificate for api.acme.com expires in 7 days',
      timestamp: '2024-01-15T07:15:00Z',
      resolved: false
    },
    {
      id: '3',
      type: 'info',
      title: 'Scheduled maintenance',
      description: 'System maintenance scheduled for this weekend',
      timestamp: '2024-01-14T18:00:00Z',
      resolved: true
    }
  ]);

  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);

  const metrics = {
    users: {
      total: 250,
      active: 198,
      newThisMonth: 12,
      mfaEnabled: 187
    },
    bots: {
      total: 50,
      active: 47,
      totalConversations: 124567,
      avgSatisfaction: 4.6
    },
    security: {
      uptime: 99.98,
      incidents: 2,
      resolvedIncidents: 45,
      auditLogs: 1234567
    },
    performance: {
      avgResponseTime: 1.2,
      apiCalls: 8234567,
      errorRate: 0.02,
      dataProcessed: '2.3TB'
    }
  };

  const saveSettings = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Show success message
    }, 2000);
  };

  const inviteTeamMember = () => {
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: 'New User',
      email: 'new.user@acme.com',
      role: 'viewer',
      department: 'General',
      lastActive: new Date().toISOString(),
      status: 'active',
      permissions: ['bots:read'],
      mfaEnabled: false
    };
    setTeamMembers(prev => [...prev, newMember]);
  };

  const resolveAlert = (alertId: string) => {
    setSecurityAlerts(prev => prev.map(alert =>
      alert.id === alertId ? { ...alert, resolved: true } : alert
    ));
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'info': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'text-purple-600 bg-purple-100';
      case 'manager': return 'text-blue-600 bg-blue-100';
      case 'developer': return 'text-green-600 bg-green-100';
      case 'analyst': return 'text-orange-600 bg-orange-100';
      case 'viewer': return 'text-gray-600 bg-gray-100';
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
              <h1 className="text-2xl font-bold text-gray-900">Enterprise Dashboard</h1>
              <p className="text-gray-600">Manage your organization's AI infrastructure</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-green-600 border-green-600">
                <Shield className="w-4 h-4 mr-2" />
                Enterprise Plan
              </Badge>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button onClick={saveSettings} disabled={loading}>
                {loading ? (
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
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.users.active}</p>
                <p className="text-xs text-green-600">+{metrics.users.newThisMonth} this month</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-100">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Bots</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.bots.active}</p>
                <p className="text-xs text-gray-500">{metrics.bots.totalConversations.toLocaleString()} conversations</p>
              </div>
              <div className="p-3 rounded-lg bg-green-100">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">System Uptime</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.security.uptime}%</p>
                <p className="text-xs text-gray-500">{metrics.security.incidents} incidents</p>
              </div>
              <div className="p-3 rounded-lg bg-purple-100">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">API Calls</p>
                <p className="text-2xl font-bold text-gray-900">{(metrics.performance.apiCalls / 1000000).toFixed(1)}M</p>
                <p className="text-xs text-gray-500">{metrics.performance.avgResponseTime}s avg response</p>
              </div>
              <div className="p-3 rounded-lg bg-orange-100">
                <Zap className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Security Alerts */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Security Alerts</h3>
            <Badge variant="outline">
              {securityAlerts.filter(a => !a.resolved).length} active
            </Badge>
          </div>
          <div className="space-y-3">
            {securityAlerts.slice(0, 3).map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    alert.type === 'critical' ? 'bg-red-500' :
                    alert.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`} />
                  <div>
                    <p className="font-medium text-gray-900">{alert.title}</p>
                    <p className="text-sm text-gray-600">{alert.description}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(alert.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getAlertColor(alert.type)}>
                    {alert.type}
                  </Badge>
                  {!alert.resolved && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => resolveAlert(alert.id)}
                    >
                      Resolve
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Organization Info</h3>
                <div className="space-y-4">
                  <div>
                    <Label>Organization Name</Label>
                    <Input
                      value={settings.organization.name}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        organization: { ...prev.organization, name: e.target.value }
                      }))}
                    />
                  </div>
                  <div>
                    <Label>Domain</Label>
                    <Input
                      value={settings.organization.domain}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        organization: { ...prev.organization, domain: e.target.value }
                      }))}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Industry</Label>
                      <Select
                        value={settings.organization.industry}
                        onValueChange={(value) => setSettings(prev => ({
                          ...prev,
                          organization: { ...prev.organization, industry: value }
                        }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Company Size</Label>
                      <Select
                        value={settings.organization.size}
                        onValueChange={(value) => setSettings(prev => ({
                          ...prev,
                          organization: { ...prev.organization, size: value }
                        }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-50">1-50</SelectItem>
                          <SelectItem value="51-200">51-200</SelectItem>
                          <SelectItem value="201-1000">201-1000</SelectItem>
                          <SelectItem value="1000-5000">1000-5000</SelectItem>
                          <SelectItem value="5000+">5000+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage Statistics</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">User Licenses</span>
                      <span className="text-sm">{settings.billing.users} used</span>
                    </div>
                    <Progress value={(settings.billing.users / 500) * 100} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Bot Instances</span>
                      <span className="text-sm">{settings.billing.bots} used</span>
                    </div>
                    <Progress value={(settings.billing.bots / 100) * 100} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">API Calls</span>
                      <span className="text-sm">{(metrics.performance.apiCalls / 1000000).toFixed(1)}M / 10M</span>
                    </div>
                    <Progress value={(metrics.performance.apiCalls / 10000000) * 100} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Storage</span>
                      <span className="text-sm">{(metrics.performance.dataProcessed.replace('TB', '') * 1000).toFixed(0)}GB / {settings.billing.storage}GB</span>
                    </div>
                    <Progress value={46} className="h-2" />
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Team Members</h3>
                <Button onClick={inviteTeamMember}>
                  <Plus className="w-4 h-4 mr-2" />
                  Invite Member
                </Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Name</th>
                      <th className="text-left py-3 px-4">Email</th>
                      <th className="text-left py-3 px-4">Role</th>
                      <th className="text-left py-3 px-4">Department</th>
                      <th className="text-left py-3 px-4">Last Active</th>
                      <th className="text-left py-3 px-4">MFA</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamMembers.map((member) => (
                      <tr key={member.id} className="border-b">
                        <td className="py-3 px-4 font-medium">{member.name}</td>
                        <td className="py-3 px-4">{member.email}</td>
                        <td className="py-3 px-4">
                          <Badge className={getRoleColor(member.role)}>
                            {member.role}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">{member.department}</td>
                        <td className="py-3 px-4">
                          {new Date(member.lastActive).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          {member.mfaEnabled ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <X className="w-4 h-4 text-red-600" />
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={
                            member.status === 'active' ? 'text-green-600 bg-green-100' :
                            member.status === 'inactive' ? 'text-gray-600 bg-gray-100' :
                            'text-red-600 bg-red-100'
                          }>
                            {member.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <Button size="sm" variant="ghost">
                              <Edit3 className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Trash2 className="w-4 h-4" />
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

          <TabsContent value="security" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Authentication</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Single Sign-On (SSO)</Label>
                      <p className="text-sm text-gray-600">Enable SSO for centralized authentication</p>
                    </div>
                    <Switch
                      checked={settings.security.sso.enabled}
                      onCheckedChange={(checked) => setSettings(prev => ({
                        ...prev,
                        security: {
                          ...prev.security,
                          sso: { ...prev.security.sso, enabled: checked }
                        }
                      }))}
                    />
                  </div>
                  
                  {settings.security.sso.enabled && (
                    <div>
                      <Label>SSO Provider</Label>
                      <Select
                        value={settings.security.sso.provider}
                        onValueChange={(value) => setSettings(prev => ({
                          ...prev,
                          security: {
                            ...prev.security,
                            sso: { ...prev.security.sso, provider: value as any }
                          }
                        }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="saml">SAML 2.0</SelectItem>
                          <SelectItem value="oauth">OAuth 2.0</SelectItem>
                          <SelectItem value="ldap">LDAP</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Multi-Factor Authentication</Label>
                      <p className="text-sm text-gray-600">Require MFA for all users</p>
                    </div>
                    <Switch
                      checked={settings.security.mfa.required}
                      onCheckedChange={(checked) => setSettings(prev => ({
                        ...prev,
                        security: {
                          ...prev.security,
                          mfa: { ...prev.security.mfa, required: checked }
                        }
                      }))}
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Protection</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Encryption at Rest</Label>
                      <p className="text-sm text-gray-600">Encrypt stored data</p>
                    </div>
                    <Switch
                      checked={settings.security.encryption.atRest}
                      onCheckedChange={(checked) => setSettings(prev => ({
                        ...prev,
                        security: {
                          ...prev.security,
                          encryption: { ...prev.security.encryption, atRest: checked }
                        }
                      }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Encryption in Transit</Label>
                      <p className="text-sm text-gray-600">Encrypt data during transmission</p>
                    </div>
                    <Switch
                      checked={settings.security.encryption.inTransit}
                      onCheckedChange={(checked) => setSettings(prev => ({
                        ...prev,
                        security: {
                          ...prev.security,
                          encryption: { ...prev.security.encryption, inTransit: checked }
                        }
                      }))}
                    />
                  </div>

                  <div>
                    <Label>Key Rotation (days)</Label>
                    <Input
                      type="number"
                      value={settings.security.encryption.keyRotation}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        security: {
                          ...prev.security,
                          encryption: { ...prev.security.encryption, keyRotation: parseInt(e.target.value) }
                        }
                      }))}
                    />
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="infrastructure" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Infrastructure Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Hosting Type</Label>
                  <Select
                    value={settings.infrastructure.hosting}
                    onValueChange={(value) => setSettings(prev => ({
                      ...prev,
                      infrastructure: { ...prev.infrastructure, hosting: value as any }
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cloud">Cloud</SelectItem>
                      <SelectItem value="onpremise">On-Premise</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Region</Label>
                  <Select
                    value={settings.infrastructure.region}
                    onValueChange={(value) => setSettings(prev => ({
                      ...prev,
                      infrastructure: { ...prev.infrastructure, region: value }
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

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Auto Scaling</Label>
                    <p className="text-sm text-gray-600">Automatically adjust resources</p>
                  </div>
                  <Switch
                    checked={settings.infrastructure.scaling.auto}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      infrastructure: {
                        ...prev.infrastructure,
                        scaling: { ...prev.infrastructure.scaling, auto: checked }
                      }
                    }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Backup Enabled</Label>
                    <p className="text-sm text-gray-600">Automated backup system</p>
                  </div>
                  <Switch
                    checked={settings.infrastructure.backup.enabled}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      infrastructure: {
                        ...prev.infrastructure,
                        backup: { ...prev.infrastructure.backup, enabled: checked }
                      }
                    }))}
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Contact Email</Label>
                  <Input
                    type="email"
                    value={settings.billing.contactEmail}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      billing: { ...prev.billing, contactEmail: e.target.value }
                    }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Custom Pricing</Label>
                    <p className="text-sm text-gray-600">Enterprise pricing plan</p>
                  </div>
                  <Switch
                    checked={settings.billing.customPricing}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      billing: { ...prev.billing, customPricing: checked }
                    }))}
                  />
                </div>

                <div>
                  <Label>User Licenses</Label>
                  <Input
                    type="number"
                    value={settings.billing.users}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      billing: { ...prev.billing, users: parseInt(e.target.value) }
                    }))}
                  />
                </div>

                <div>
                  <Label>Bot Instances</Label>
                  <Input
                    type="number"
                    value={settings.billing.bots}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      billing: { ...prev.billing, bots: parseInt(e.target.value) }
                    }))}
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Standards</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { key: 'gdpr', label: 'GDPR Compliance', description: 'General Data Protection Regulation' },
                  { key: 'hipaa', label: 'HIPAA Compliance', description: 'Health Insurance Portability and Accountability Act' },
                  { key: 'soc2', label: 'SOC 2 Compliance', description: 'Service Organization Control 2' },
                  { key: 'iso27001', label: 'ISO 27001', description: 'Information Security Management' }
                ].map((standard) => (
                  <div key={standard.key} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <Label className="text-base font-medium">{standard.label}</Label>
                      <p className="text-sm text-gray-600">{standard.description}</p>
                    </div>
                    <Switch
                      checked={settings.security.compliance[standard.key as keyof typeof settings.security.compliance]}
                      onCheckedChange={(checked) => setSettings(prev => ({
                        ...prev,
                        security: {
                          ...prev.security,
                          compliance: {
                            ...prev.security.compliance,
                            [standard.key]: checked
                          }
                        }
                      }))}
                    />
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EnterpriseDashboard;