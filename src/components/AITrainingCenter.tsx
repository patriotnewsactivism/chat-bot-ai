import { useState, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Brain, 
  Upload, 
  FileText, 
  Globe, 
  Database, 
  Zap, 
  Target, 
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Clock,
  BarChart3,
  Settings,
  Play,
  Pause,
  RotateCcw,
  Download,
  Trash2,
  Plus,
  Eye,
  EyeOff,
  MessageSquare,
  Users,
  Star,
  ThumbsUp,
  ThumbsDown,
  Filter,
  Search,
  RefreshCw,
  Cpu,
  Network,
  BookOpen,
  GraduationCap,
  Award,
  Lightbulb,
  Sparkles
} from 'lucide-react';

interface TrainingDocument {
  id: string;
  name: string;
  type: 'pdf' | 'website' | 'text' | 'faq' | 'api' | 'csv' | 'json';
  size: number;
  status: 'uploading' | 'processing' | 'indexed' | 'failed';
  progress: number;
  chunks: number;
  accuracy: number;
  lastTrained: string;
  source: string;
  tags: string[];
}

interface TrainingModel {
  id: string;
  name: string;
  type: 'general' | 'industry' | 'custom';
  accuracy: number;
  responses: number;
  satisfaction: number;
  lastUpdated: string;
  status: 'training' | 'ready' | 'deployed' | 'error';
  trainingData: string[];
  parameters: {
    temperature: number;
    maxTokens: number;
    topP: number;
    frequencyPenalty: number;
    presencePenalty: number;
  };
}

interface TrainingMetrics {
  totalDocuments: number;
  indexedChunks: number;
  averageAccuracy: number;
  trainingProgress: number;
  modelPerformance: {
    responseTime: number;
    accuracy: number;
    satisfaction: number;
    escalationRate: number;
  };
  recentActivity: Array<{
    id: string;
    action: string;
    timestamp: string;
    status: 'success' | 'error' | 'pending';
  }>;
}

const AITrainingCenter = () => {
  const [documents, setDocuments] = useState<TrainingDocument[]>([
    {
      id: '1',
      name: 'Product Catalog.pdf',
      type: 'pdf',
      size: 2048576,
      status: 'indexed',
      progress: 100,
      chunks: 156,
      accuracy: 94.5,
      lastTrained: '2024-01-15T10:30:00Z',
      source: 'upload',
      tags: ['products', 'catalog', 'pricing']
    },
    {
      id: '2',
      name: 'FAQ Database',
      type: 'faq',
      size: 524288,
      status: 'processing',
      progress: 75,
      chunks: 89,
      accuracy: 91.2,
      lastTrained: '2024-01-14T15:45:00Z',
      source: 'api',
      tags: ['faq', 'support', 'common-questions']
    },
    {
      id: '3',
      name: 'Company Website',
      type: 'website',
      size: 1048576,
      status: 'indexed',
      progress: 100,
      chunks: 234,
      accuracy: 96.8,
      lastTrained: '2024-01-13T09:20:00Z',
      source: 'scrape',
      tags: ['website', 'company', 'about']
    }
  ]);

  const [models, setModels] = useState<TrainingModel[]>([
    {
      id: '1',
      name: 'E-commerce Assistant',
      type: 'industry',
      accuracy: 94.5,
      responses: 12450,
      satisfaction: 4.6,
      lastUpdated: '2024-01-15T10:30:00Z',
      status: 'deployed',
      trainingData: ['Product Catalog.pdf', 'FAQ Database', 'Company Website'],
      parameters: {
        temperature: 0.7,
        maxTokens: 500,
        topP: 0.9,
        frequencyPenalty: 0.1,
        presencePenalty: 0.1
      }
    },
    {
      id: '2',
      name: 'Customer Support Bot',
      type: 'custom',
      accuracy: 91.2,
      responses: 8932,
      satisfaction: 4.4,
      lastUpdated: '2024-01-14T15:45:00Z',
      status: 'ready',
      trainingData: ['Support Tickets', 'Knowledge Base'],
      parameters: {
        temperature: 0.5,
        maxTokens: 300,
        topP: 0.8,
        frequencyPenalty: 0.2,
        presencePenalty: 0.1
      }
    }
  ]);

  const [metrics, setMetrics] = useState<TrainingMetrics>({
    totalDocuments: 24,
    indexedChunks: 3847,
    averageAccuracy: 93.8,
    trainingProgress: 78,
    modelPerformance: {
      responseTime: 1.2,
      accuracy: 94.2,
      satisfaction: 4.5,
      escalationRate: 8.3
    },
    recentActivity: [
      { id: '1', action: 'Document indexed: Product Catalog.pdf', timestamp: '2024-01-15T10:30:00Z', status: 'success' },
      { id: '2', action: 'Model training completed', timestamp: '2024-01-15T09:45:00Z', status: 'success' },
      { id: '3', action: 'Website scraping started', timestamp: '2024-01-15T09:30:00Z', status: 'pending' },
      { id: '4', action: 'API sync failed', timestamp: '2024-01-15T08:15:00Z', status: 'error' }
    ]
  });

  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [trainingActive, setTrainingActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const newDoc: TrainingDocument = {
          id: Date.now().toString(),
          name: file.name,
          type: file.type.includes('pdf') ? 'pdf' : 'text',
          size: file.size,
          status: 'uploading',
          progress: 0,
          chunks: 0,
          accuracy: 0,
          lastTrained: new Date().toISOString(),
          source: 'upload',
          tags: []
        };

        setDocuments(prev => [...prev, newDoc]);

        // Simulate upload progress
        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          setDocuments(prev => prev.map(doc =>
            doc.id === newDoc.id
              ? { ...doc, progress, status: progress === 100 ? 'processing' : 'uploading' }
              : doc
          ));

          if (progress === 100) {
            clearInterval(interval);
            setTimeout(() => {
              setDocuments(prev => prev.map(doc =>
                doc.id === newDoc.id
                  ? {
                      ...doc,
                      status: 'indexed',
                      chunks: Math.floor(Math.random() * 200) + 50,
                      accuracy: 90 + Math.random() * 10
                    }
                  : doc
              ));
            }, 2000);
          }
        }, 200);
      });
    }
  }, []);

  const startTraining = useCallback(() => {
    setTrainingActive(true);
    
    // Simulate training progress
    let progress = metrics.trainingProgress;
    const interval = setInterval(() => {
      progress += 2;
      setMetrics(prev => ({
        ...prev,
        trainingProgress: Math.min(progress, 100)
      }));

      if (progress >= 100) {
        clearInterval(interval);
        setTrainingActive(false);
        setMetrics(prev => ({
          ...prev,
          modelPerformance: {
            ...prev.modelPerformance,
            accuracy: Math.min(prev.modelPerformance.accuracy + 0.5, 99),
            satisfaction: Math.min(prev.modelPerformance.satisfaction + 0.1, 5)
          }
        }));
      }
    }, 100);
  }, [metrics.trainingProgress]);

  const deployModel = useCallback((modelId: string) => {
    setModels(prev => prev.map(model =>
      model.id === modelId
        ? { ...model, status: 'deployed' as const, lastUpdated: new Date().toISOString() }
        : model
    ));
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'indexed':
      case 'ready':
      case 'deployed':
      case 'success':
        return 'text-green-600 bg-green-100';
      case 'processing':
      case 'training':
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'failed':
      case 'error':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes >= 1048576) return (bytes / 1048576).toFixed(1) + ' MB';
    if (bytes >= 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return bytes + ' B';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AI Training Center</h1>
              <p className="text-gray-600">Train and optimize your AI models with custom data</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Models
              </Button>
              <Button onClick={startTraining} disabled={trainingActive}>
                {trainingActive ? (
                  <>
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2" />
                    Training...
                  </>
                ) : (
                  <>
                    <Brain className="w-4 h-4 mr-2" />
                    Start Training
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
                <p className="text-sm font-medium text-gray-600">Total Documents</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.totalDocuments}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-100">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Indexed Chunks</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.indexedChunks.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-lg bg-green-100">
                <Database className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Accuracy</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.averageAccuracy}%</p>
              </div>
              <div className="p-3 rounded-lg bg-purple-100">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Model Performance</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.modelPerformance.satisfaction}⭐</p>
              </div>
              <div className="p-3 rounded-lg bg-yellow-100">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Training Progress */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Training Progress</h3>
            <Badge className={trainingActive ? 'text-yellow-600 bg-yellow-100' : 'text-green-600 bg-green-100'}>
              {trainingActive ? 'Training' : 'Ready'}
            </Badge>
          </div>
          <Progress value={metrics.trainingProgress} className="mb-2" />
          <p className="text-sm text-gray-600">{metrics.trainingProgress}% complete</p>
        </Card>

        <Tabs defaultValue="documents" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="models">Models</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="documents" className="space-y-6">
            {/* Upload Section */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Training Data</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-900 mb-2">Drop files here or click to upload</p>
                <p className="text-sm text-gray-600 mb-4">Support for PDF, TXT, CSV, JSON, and FAQ files</p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.txt,.csv,.json,.md"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <Button asChild>
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Plus className="w-4 h-4 mr-2" />
                    Select Files
                  </label>
                </Button>
              </div>
            </Card>

            {/* Documents List */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Training Documents</h3>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {documents.map((doc) => (
                  <Card key={doc.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          {doc.type === 'pdf' && <FileText className="w-5 h-5 text-red-600" />}
                          {doc.type === 'website' && <Globe className="w-5 h-5 text-blue-600" />}
                          {doc.type === 'faq' && <MessageSquare className="w-5 h-5 text-green-600" />}
                          {doc.type === 'api' && <Database className="w-5 h-5 text-purple-600" />}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{doc.name}</h4>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-sm text-gray-500">{formatFileSize(doc.size)}</span>
                            <span className="text-sm text-gray-500">{doc.chunks} chunks</span>
                            <span className="text-sm text-gray-500">{doc.accuracy.toFixed(1)}% accuracy</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(doc.status)}>
                          {doc.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {doc.status === 'processing' && (
                      <div className="mt-4">
                        <Progress value={doc.progress} className="h-2" />
                        <p className="text-xs text-gray-600 mt-1">Processing... {doc.progress}%</p>
                      </div>
                    )}

                    {doc.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1">
                        {doc.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="models" className="space-y-6">
            {/* Models List */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">AI Models</h3>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Model
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {models.map((model) => (
                  <Card key={model.id} className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900">{model.name}</h4>
                        <Badge variant="outline" className="mt-1">
                          {model.type}
                        </Badge>
                      </div>
                      <Badge className={getStatusColor(model.status)}>
                        {model.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-lg font-bold">{model.accuracy}%</p>
                        <p className="text-xs text-gray-600">Accuracy</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-lg font-bold">{model.responses.toLocaleString()}</p>
                        <p className="text-xs text-gray-600">Responses</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">Satisfaction</span>
                        <span className="text-sm">{model.satisfaction}⭐</span>
                      </div>
                      <Progress value={(model.satisfaction / 5) * 100} className="h-2" />
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => setSelectedModel(model.id)}
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Configure
                      </Button>
                      {model.status === 'ready' && (
                        <Button
                          size="sm"
                          className="flex-1"
                          onClick={() => deployModel(model.id)}
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
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            {/* Performance Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Model Performance</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Response Time</span>
                      <span className="text-sm">{metrics.modelPerformance.responseTime}s</span>
                    </div>
                    <Progress value={(1 - metrics.modelPerformance.responseTime / 5) * 100} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Accuracy</span>
                      <span className="text-sm">{metrics.modelPerformance.accuracy}%</span>
                    </div>
                    <Progress value={metrics.modelPerformance.accuracy} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Satisfaction</span>
                      <span className="text-sm">{metrics.modelPerformance.satisfaction}⭐</span>
                    </div>
                    <Progress value={(metrics.modelPerformance.satisfaction / 5) * 100} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Escalation Rate</span>
                      <span className="text-sm">{metrics.modelPerformance.escalationRate}%</span>
                    </div>
                    <Progress value={100 - metrics.modelPerformance.escalationRate} className="h-2" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {metrics.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.status === 'success' ? 'bg-green-500' :
                        activity.status === 'error' ? 'bg-red-500' : 'bg-yellow-500'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(activity.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            {/* Training Settings */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Training Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Training Frequency</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">Real-time</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="manual">Manual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Model Version</Label>
                  <Select defaultValue="latest">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="latest">Latest</SelectItem>
                      <SelectItem value="stable">Stable</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Chunk Size</Label>
                  <Input type="number" defaultValue="1000" />
                </div>

                <div>
                  <Label>Overlap Size</Label>
                  <Input type="number" defaultValue="200" />
                </div>
              </div>
            </Card>

            {/* Advanced Settings */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Advanced Settings</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>Temperature (0-1)</Label>
                    <Input type="number" step="0.1" min="0" max="1" defaultValue="0.7" />
                  </div>
                  <div>
                    <Label>Max Tokens</Label>
                    <Input type="number" defaultValue="500" />
                  </div>
                  <div>
                    <Label>Top P (0-1)</Label>
                    <Input type="number" step="0.1" min="0" max="1" defaultValue="0.9" />
                  </div>
                  <div>
                    <Label>Frequency Penalty</Label>
                    <Input type="number" step="0.1" min="0" max="2" defaultValue="0.1" />
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AITrainingCenter;