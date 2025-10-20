import React, { useState, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  Upload, 
  FileText, 
  Database, 
  Zap, 
  TrendingUp,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Settings,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';

interface TrainingData {
  id: string;
  name: string;
  type: 'document' | 'qa' | 'conversation';
  status: 'processing' | 'completed' | 'failed';
  accuracy: number;
  size: string;
  uploadedAt: string;
}

interface ModelMetrics {
  accuracy: number;
  responseTime: number;
  confidence: number;
  trainingProgress: number;
  totalQueries: number;
  successRate: number;
}

const AITrainingCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);

  const [trainingData, setTrainingData] = useState<TrainingData[]>([
    {
      id: '1',
      name: 'Product Catalog.pdf',
      type: 'document',
      status: 'completed',
      accuracy: 94,
      size: '2.3 MB',
      uploadedAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Customer FAQ Dataset',
      type: 'qa',
      status: 'completed',
      accuracy: 89,
      size: '1.1 MB',
      uploadedAt: '2024-01-14'
    },
    {
      id: '3',
      name: 'Support Conversations',
      type: 'conversation',
      status: 'processing',
      accuracy: 0,
      size: '5.7 MB',
      uploadedAt: '2024-01-16'
    }
  ]);

  const [metrics, setMetrics] = useState<ModelMetrics>({
    accuracy: 92,
    responseTime: 1.2,
    confidence: 87,
    trainingProgress: 75,
    totalQueries: 15420,
    successRate: 94
  });

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const newData: TrainingData = {
          id: Date.now().toString(),
          name: file.name,
          type: 'document',
          status: 'processing',
          accuracy: 0,
          size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
          uploadedAt: new Date().toISOString().split('T')[0]
        };
        setTrainingData(prev => [...prev, newData]);
      });
    }
  }, []);

  const startTraining = useCallback(() => {
    setIsTraining(true);
    setTrainingProgress(0);
    
    const interval = setInterval(() => {
      setTrainingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsTraining(false);
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 500);
  }, []);

  const getStatusIcon = (status: TrainingData['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'processing':
        return <div className="h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getTypeIcon = (type: TrainingData['type']) => {
    switch (type) {
      case 'document':
        return <FileText className="h-4 w-4" />;
      case 'qa':
        return <Database className="h-4 w-4" />;
      case 'conversation':
        return <Brain className="h-4 w-4" />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Brain className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">AI Training Center</h1>
              <p className="text-muted-foreground">Train and optimize your chatbot's intelligence</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="px-3 py-1">
              Model v2.1
            </Badge>
            <Button 
              onClick={startTraining}
              disabled={isTraining}
              className="px-6"
            >
              {isTraining ? (
                <>
                  <Pause className="h-4 w-4 mr-2" />
                  Training...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Start Training
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Training Progress */}
      {isTraining && (
        <div className="bg-blue-50 border-b border-blue-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-900">Training in Progress</span>
            <span className="text-sm text-blue-700">{Math.round(trainingProgress)}%</span>
          </div>
          <Progress value={trainingProgress} className="h-2" />
        </div>
      )}

      <div className="flex-1 p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="upload">Data Upload</TabsTrigger>
            <TabsTrigger value="training">Training Sets</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Data Upload Tab */}
          <TabsContent value="upload" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload Training Data
                </h3>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg font-medium mb-2">Drop files here or click to upload</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Supports PDF, TXT, CSV, JSON files up to 10MB
                    </p>
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.txt,.csv,.json"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <Button asChild>
                      <label htmlFor="file-upload" className="cursor-pointer">
                        Select Files
                      </label>
                    </Button>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Manual Q&A Entry
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="question">Question</Label>
                    <Input 
                      id="question"
                      placeholder="Enter a question your bot should answer..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="answer">Answer</Label>
                    <Textarea 
                      id="answer"
                      placeholder="Provide the ideal response..."
                      rows={4}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1">
                      Add Q&A Pair
                    </Button>
                    <Button variant="outline">
                      Bulk Import
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Training Sets Tab */}
          <TabsContent value="training" className="mt-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Training Datasets</h3>
                <Button variant="outline">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
              <div className="space-y-4">
                {trainingData.map((data) => (
                  <div key={data.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        {getTypeIcon(data.type)}
                      </div>
                      <div>
                        <h4 className="font-medium">{data.name}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{data.size}</span>
                          <span>Uploaded: {data.uploadedAt}</span>
                          <Badge variant="outline" className="capitalize">
                            {data.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {data.status === 'completed' && (
                        <div className="text-right">
                          <div className="text-sm font-medium">{data.accuracy}% Accuracy</div>
                          <div className="text-xs text-muted-foreground">Training Complete</div>
                        </div>
                      )}
                      {getStatusIcon(data.status)}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Model Accuracy</p>
                    <p className="text-2xl font-bold">{metrics.accuracy}%</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Response Time</p>
                    <p className="text-2xl font-bold">{metrics.responseTime}s</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Zap className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Confidence Score</p>
                    <p className="text-2xl font-bold">{metrics.confidence}%</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Brain className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Training Progress
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Overall Progress</span>
                      <span>{metrics.trainingProgress}%</span>
                    </div>
                    <Progress value={metrics.trainingProgress} />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Total Queries</p>
                      <p className="font-semibold">{metrics.totalQueries.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Success Rate</p>
                      <p className="font-semibold">{metrics.successRate}%</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Training Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Product Catalog training completed</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Processing FAQ dataset</p>
                      <p className="text-xs text-muted-foreground">In progress</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Model optimization completed</p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
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
                  Training Configuration
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="learning-rate">Learning Rate</Label>
                    <Input id="learning-rate" type="number" defaultValue="0.001" step="0.0001" />
                  </div>
                  <div>
                    <Label htmlFor="batch-size">Batch Size</Label>
                    <Input id="batch-size" type="number" defaultValue="32" />
                  </div>
                  <div>
                    <Label htmlFor="epochs">Training Epochs</Label>
                    <Input id="epochs" type="number" defaultValue="100" />
                  </div>
                  <Button className="w-full">
                    Save Configuration
                  </Button>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Model Management</h3>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Current Model: v2.1</span>
                      <Badge variant="secondary">Active</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Trained on 15,420 conversations with 92% accuracy
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      Export Model
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Create Backup
                    </Button>
                  </div>
                  <Button variant="destructive" className="w-full">
                    Reset Training Data
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AITrainingCenter;