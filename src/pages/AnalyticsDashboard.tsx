import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  TrendingUp, 
  Users, 
  MessageSquare, 
  DollarSign, 
  Activity, 
  Calendar,
  Download,
  Filter,
  ArrowUp,
  ArrowDown,
  Eye,
  MousePointer,
  Target,
  Zap,
  Clock,
  Star,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  PieChart,
  LineChart,
  UserPlus,
  ShoppingCart,
  CreditCard,
  HelpCircle,
  ThumbsUp,
  ThumbsDown,
  Bot,
  Globe,
  Smartphone,
  Mail,
  Phone
} from 'lucide-react';

interface AnalyticsData {
  overview: {
    totalUsers: number;
    activeUsers: number;
    totalConversations: number;
    totalRevenue: number;
    conversionRate: number;
    satisfactionScore: number;
  };
  trends: {
    users: Array<{ date: string; value: number }>;
    conversations: Array<{ date: string; value: number }>;
    revenue: Array<{ date: string; value: number }>;
  };
  topBots: Array<{
    id: string;
    name: string;
    conversations: number;
    satisfaction: number;
    revenue: number;
  }>;
  userSegments: Array<{
    segment: string;
    count: number;
    percentage: number;
  }>;
  conversionFunnel: Array<{
    stage: string;
    count: number;
    conversionRate: number;
  }>;
  revenueBreakdown: Array<{
    source: string;
    amount: number;
    percentage: number;
  }>;
  deviceStats: Array<{
    device: string;
    sessions: number;
    percentage: number;
  }>;
  satisfactionMetrics: {
    positive: number;
    neutral: number;
    negative: number;
    totalResponses: number;
  };
  performanceMetrics: {
    avgResponseTime: number;
    uptime: number;
    errorRate: number;
    botAccuracy: number;
  };
}

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setData({
        overview: {
          totalUsers: 2847,
          activeUsers: 1923,
          totalConversations: 45682,
          totalRevenue: 127450,
          conversionRate: 18.5,
          satisfactionScore: 4.6
        },
        trends: {
          users: Array.from({ length: 30 }, (_, i) => ({
            date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            value: Math.floor(Math.random() * 100) + 50
          })),
          conversations: Array.from({ length: 30 }, (_, i) => ({
            date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            value: Math.floor(Math.random() * 500) + 200
          })),
          revenue: Array.from({ length: 30 }, (_, i) => ({
            date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            value: Math.floor(Math.random() * 2000) + 1000
          }))
        },
        topBots: [
          { id: '1', name: 'E-commerce Support', conversations: 12450, satisfaction: 4.8, revenue: 45200 },
          { id: '2', name: 'Lead Generation Bot', conversations: 8932, satisfaction: 4.5, revenue: 38100 },
          { id: '3', name: 'Customer Service', conversations: 7234, satisfaction: 4.7, revenue: 28900 },
          { id: '4', name: 'Knowledge Base', conversations: 5678, satisfaction: 4.9, revenue: 15250 }
        ],
        userSegments: [
          { segment: 'E-commerce', count: 892, percentage: 31.3 },
          { segment: 'SaaS', count: 734, percentage: 25.8 },
          { segment: 'Healthcare', count: 456, percentage: 16.0 },
          { segment: 'Real Estate', count: 342, percentage: 12.0 },
          { segment: 'Other', count: 423, percentage: 14.9 }
        ],
        conversionFunnel: [
          { stage: 'Website Visitors', count: 45678, conversionRate: 100 },
          { stage: 'Sign-ups', count: 8432, conversionRate: 18.5 },
          { stage: 'Bot Creation', count: 5621, conversionRate: 66.7 },
          { stage: 'Activation', count: 3847, conversionRate: 68.4 },
          { stage: 'Paid Conversion', count: 523, conversionRate: 13.6 }
        ],
        revenueBreakdown: [
          { source: 'Starter Plan', amount: 52300, percentage: 41.0 },
          { source: 'Professional Plan', amount: 48200, percentage: 37.8 },
          { source: 'Business Plan', amount: 26950, percentage: 21.2 }
        ],
        deviceStats: [
          { device: 'Desktop', sessions: 18234, percentage: 64.2 },
          { device: 'Mobile', sessions: 8923, percentage: 31.4 },
          { device: 'Tablet', sessions: 1289, percentage: 4.5 }
        ],
        satisfactionMetrics: {
          positive: 34256,
          neutral: 8934,
          negative: 2492,
          totalResponses: 45682
        },
        performanceMetrics: {
          avgResponseTime: 1.2,
          uptime: 99.9,
          errorRate: 0.1,
          botAccuracy: 94.3
        }
      });
      setLoading(false);
    }, 1000);
  }, [timeRange]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(num);
  };

  const MetricCard = ({ title, value, change, icon: Icon, color = 'blue' }: any) => (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change !== undefined && (
            <div className={`flex items-center mt-1 text-sm ${
              change >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {change >= 0 ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
              {Math.abs(change)}%
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg bg-${color}-100`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
      </div>
    </Card>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Activity className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-gray-600">Real-time insights into your bot performance</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              
              <Button>
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Users"
            value={formatNumber(data.overview.totalUsers)}
            change={12.5}
            icon={Users}
            color="blue"
          />
          <MetricCard
            title="Active Users"
            value={formatNumber(data.overview.activeUsers)}
            change={8.3}
            icon={Activity}
            color="green"
          />
          <MetricCard
            title="Total Conversations"
            value={formatNumber(data.overview.totalConversations)}
            change={15.7}
            icon={MessageSquare}
            color="purple"
          />
          <MetricCard
            title="Total Revenue"
            value={formatCurrency(data.overview.totalRevenue)}
            change={23.1}
            icon={DollarSign}
            color="yellow"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">User Growth</h3>
              <LineChart className="w-5 h-5 text-gray-400" />
            </div>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center text-gray-500">
                <TrendingUp className="w-8 h-8 mx-auto mb-2" />
                <p>Interactive chart visualization</p>
                <p className="text-sm">Users: {formatNumber(data.overview.totalUsers)}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Revenue Trends</h3>
              <BarChart3 className="w-5 h-5 text-gray-400" />
            </div>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center text-gray-500">
                <DollarSign className="w-8 h-8 mx-auto mb-2" />
                <p>Revenue chart visualization</p>
                <p className="text-sm">Total: {formatCurrency(data.overview.totalRevenue)}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Top Performing Bots */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Bots</h3>
            <div className="space-y-4">
              {data.topBots.map((bot, index) => (
                <div key={bot.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-blue-600">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{bot.name}</p>
                      <p className="text-sm text-gray-500">{formatNumber(bot.conversations)} conversations</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{bot.satisfaction}</span>
                    </div>
                    <p className="text-sm text-gray-500">{formatCurrency(bot.revenue)}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* User Segments */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">User Segments</h3>
            <div className="space-y-3">
              {data.userSegments.map((segment) => (
                <div key={segment.segment} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-900">{segment.segment}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{formatNumber(segment.count)}</p>
                    <p className="text-xs text-gray-500">{segment.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Conversion Funnel */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversion Funnel</h3>
            <div className="space-y-3">
              {data.conversionFunnel.map((stage, index) => (
                <div key={stage.stage} className="relative">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">{stage.stage}</span>
                    <span className="text-sm text-gray-500">{stage.conversionRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${stage.conversionRate}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{formatNumber(stage.count)} users</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Avg Response Time</span>
              <Clock className="w-4 h-4 text-gray-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{data.performanceMetrics.avgResponseTime}s</p>
            <p className="text-xs text-green-600">Excellent</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Uptime</span>
              <CheckCircle className="w-4 h-4 text-gray-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{data.performanceMetrics.uptime}%</p>
            <p className="text-xs text-green-600">Reliable</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Bot Accuracy</span>
              <Target className="w-4 h-4 text-gray-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{data.performanceMetrics.botAccuracy}%</p>
            <p className="text-xs text-green-600">High</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Error Rate</span>
              <AlertTriangle className="w-4 h-4 text-gray-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{data.performanceMetrics.errorRate}%</p>
            <p className="text-xs text-green-600">Low</p>
          </Card>
        </div>

        {/* Satisfaction Metrics */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Satisfaction</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <ThumbsUp className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{formatNumber(data.satisfactionMetrics.positive)}</p>
              <p className="text-sm text-gray-600">Positive</p>
              <p className="text-xs text-green-600">
                {((data.satisfactionMetrics.positive / data.satisfactionMetrics.totalResponses) * 100).toFixed(1)}%
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <MessageSquare className="w-8 h-8 text-yellow-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{formatNumber(data.satisfactionMetrics.neutral)}</p>
              <p className="text-sm text-gray-600">Neutral</p>
              <p className="text-xs text-yellow-600">
                {((data.satisfactionMetrics.neutral / data.satisfactionMetrics.totalResponses) * 100).toFixed(1)}%
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <ThumbsDown className="w-8 h-8 text-red-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{formatNumber(data.satisfactionMetrics.negative)}</p>
              <p className="text-sm text-gray-600">Negative</p>
              <p className="text-xs text-red-600">
                {((data.satisfactionMetrics.negative / data.satisfactionMetrics.totalResponses) * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;