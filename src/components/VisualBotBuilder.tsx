import { useState, useCallback } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  Bot, 
  Settings, 
  Play, 
  Pause, 
  Save, 
  Plus, 
  Trash2, 
  Copy, 
  Download,
  Upload,
  Zap,
  Brain,
  Globe,
  Shield,
  Users,
  ShoppingCart,
  HeadphonesIcon,
  BookOpen,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Star,
  ArrowRight,
  ArrowLeft,
  Edit3,
  Eye,
  EyeOff
} from 'lucide-react';

interface BotNode {
  id: string;
  type: 'trigger' | 'message' | 'question' | 'condition' | 'action' | 'integration';
  content: string;
  config: any;
  position: { x: number; y: number };
  connections: string[];
}

interface BotFlow {
  id: string;
  name: string;
  description: string;
  nodes: BotNode[];
  settings: {
    welcomeMessage: string;
    fallbackMessage: string;
    collectEmail: boolean;
    collectPhone: boolean;
    escalationEnabled: boolean;
    businessHours: string;
    language: string;
    branding: {
      primaryColor: string;
      secondaryColor: string;
      logo: string;
      position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
    };
  };
}

const nodeTypes = [
  { type: 'trigger', icon: Zap, label: 'Trigger', color: 'bg-yellow-500' },
  { type: 'message', icon: MessageSquare, label: 'Message', color: 'bg-blue-500' },
  { type: 'question', icon: Bot, label: 'Question', color: 'bg-green-500' },
  { type: 'condition', icon: Brain, label: 'Condition', color: 'bg-purple-500' },
  { type: 'action', icon: Settings, label: 'Action', color: 'bg-orange-500' },
  { type: 'integration', icon: Globe, label: 'Integration', color: 'bg-red-500' },
];

const industryTemplates = [
  {
    id: 'ecommerce',
    name: 'E-commerce',
    icon: ShoppingCart,
    color: 'from-blue-500 to-blue-600',
    nodes: [
      {
        id: '1',
        type: 'trigger',
        content: 'Welcome! How can I help you today?',
        config: { trigger: 'website_visit' },
        position: { x: 100, y: 100 },
        connections: ['2']
      },
      {
        id: '2',
        type: 'question',
        content: 'Are you looking for products, order status, or help?',
        config: { options: ['Products', 'Order Status', 'Help'] },
        position: { x: 300, y: 100 },
        connections: ['3', '4', '5']
      }
    ]
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    icon: Shield,
    color: 'from-green-500 to-green-600',
    nodes: [
      {
        id: '1',
        type: 'trigger',
        content: 'Welcome to our medical practice. How can I assist you?',
        config: { trigger: 'website_visit', hipaa: true },
        position: { x: 100, y: 100 },
        connections: ['2']
      }
    ]
  },
  {
    id: 'restaurant',
    name: 'Restaurant',
    icon: Calendar,
    color: 'from-orange-500 to-orange-600',
    nodes: [
      {
        id: '1',
        type: 'trigger',
        content: 'Welcome! Would you like to make a reservation or see our menu?',
        config: { trigger: 'website_visit' },
        position: { x: 100, y: 100 },
        connections: ['2']
      }
    ]
  },
  {
    id: 'realestate',
    name: 'Real Estate',
    icon: MapPin,
    color: 'from-purple-500 to-purple-600',
    nodes: [
      {
        id: '1',
        type: 'trigger',
        content: 'Hello! Are you looking to buy, sell, or rent a property?',
        config: { trigger: 'website_visit' },
        position: { x: 100, y: 100 },
        connections: ['2']
      }
    ]
  }
];

const VisualBotBuilder = () => {
  const [botFlow, setBotFlow] = useState<BotFlow>({
    id: '1',
    name: 'New Bot Flow',
    description: 'Describe your bot flow',
    nodes: [],
    settings: {
      welcomeMessage: 'Hello! How can I help you today?',
      fallbackMessage: "I'm sorry, I don't understand. Let me connect you with a human.",
      collectEmail: true,
      collectPhone: false,
      escalationEnabled: true,
      businessHours: '9-5 Mon-Fri',
      language: 'en',
      branding: {
        primaryColor: '#3B82F6',
        secondaryColor: '#10B981',
        logo: '',
        position: 'bottom-right'
      }
    }
  });

  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [isPreview, setIsPreview] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const addNode = useCallback((type: string) => {
    const newNode: BotNode = {
      id: Date.now().toString(),
      type: type as any,
      content: '',
      config: {},
      position: { x: Math.random() * 400 + 100, y: Math.random() * 300 + 100 },
      connections: []
    };

    setBotFlow(prev => ({
      ...prev,
      nodes: [...prev.nodes, newNode]
    }));
  }, []);

  const updateNode = useCallback((nodeId: string, updates: Partial<BotNode>) => {
    setBotFlow(prev => ({
      ...prev,
      nodes: prev.nodes.map(node => 
        node.id === nodeId ? { ...node, ...updates } : node
      )
    }));
  }, []);

  const deleteNode = useCallback((nodeId: string) => {
    setBotFlow(prev => ({
      ...prev,
      nodes: prev.nodes.filter(node => node.id !== nodeId)
    }));
    setSelectedNode(null);
  }, []);

  const loadTemplate = useCallback((templateId: string) => {
    const template = industryTemplates.find(t => t.id === templateId);
    if (template) {
      setBotFlow(prev => ({
        ...prev,
        name: `${template.name} Bot`,
        nodes: template.nodes,
        settings: {
          ...prev.settings,
          welcomeMessage: template.nodes[0]?.content || prev.settings.welcomeMessage
        }
      }));
      setSelectedTemplate(templateId);
    }
  }, []);

  const saveBot = useCallback(() => {
    // Save to backend
    console.log('Saving bot:', botFlow);
    // Show success message
  }, [botFlow]);

  const exportBot = useCallback(() => {
    const dataStr = JSON.stringify(botFlow, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `${botFlow.name.replace(/\s+/g, '_')}_flow.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }, [botFlow]);

  const importBot = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target?.result as string);
          setBotFlow(imported);
        } catch (error) {
          console.error('Error importing bot:', error);
        }
      };
      reader.readAsText(file);
    }
  }, []);

  const renderNode = (node: BotNode) => {
    const nodeType = nodeTypes.find(nt => nt.type === node.type);
    const Icon = nodeType?.icon || Bot;
    const isSelected = selectedNode === node.id;

    return (
      <Card
        key={node.id}
        className={`absolute cursor-move transition-all ${
          isSelected ? 'ring-2 ring-blue-500 shadow-lg' : 'shadow-md hover:shadow-lg'
        } ${nodeType?.color} text-white`}
        style={{
          left: `${node.position.x}px`,
          top: `${node.position.y}px`,
          minWidth: '200px'
        }}
        onClick={() => setSelectedNode(node.id)}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Icon className="w-4 h-4" />
              <span className="font-semibold text-sm">{nodeType?.label}</span>
            </div>
            <div className="flex space-x-1">
              <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-white hover:bg-white/20">
                <Copy className="w-3 h-3" />
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                className="h-6 w-6 p-0 text-white hover:bg-red-600"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteNode(node.id);
                }}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
          <p className="text-sm opacity-90 line-clamp-2">{node.content || 'Click to edit...'}</p>
        </div>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Visual Bot Builder</h1>
              <Badge variant="outline" className="text-green-600 border-green-600">
                {isPreview ? 'Preview Mode' : 'Edit Mode'}
              </Badge>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsPreview(!isPreview)}
              >
                {isPreview ? <Edit3 className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                {isPreview ? 'Edit' : 'Preview'}
              </Button>
              
              <Button variant="outline" size="sm" onClick={exportBot}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              
              <Button variant="outline" size="sm" asChild>
                <label className="cursor-pointer">
                  <Upload className="w-4 h-4 mr-2" />
                  Import
                  <input
                    type="file"
                    accept=".json"
                    className="hidden"
                    onChange={importBot}
                  />
                </label>
              </Button>
              
              <Button onClick={saveBot}>
                <Save className="w-4 h-4 mr-2" />
                Save Bot
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-screen pt-16">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r overflow-y-auto">
          {/* Templates */}
          <div className="p-4 border-b">
            <h3 className="font-semibold text-gray-900 mb-3">Industry Templates</h3>
            <div className="grid grid-cols-2 gap-2">
              {industryTemplates.map((template) => {
                const Icon = template.icon;
                return (
                  <Button
                    key={template.id}
                    variant={selectedTemplate === template.id ? "default" : "outline"}
                    size="sm"
                    className={`h-auto p-3 flex flex-col items-center space-y-1 ${
                      selectedTemplate === template.id ? '' : `bg-gradient-to-r ${template.color} text-white`
                    }`}
                    onClick={() => loadTemplate(template.id)}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="text-xs">{template.name}</span>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Node Types */}
          <div className="p-4 border-b">
            <h3 className="font-semibold text-gray-900 mb-3">Add Nodes</h3>
            <div className="space-y-2">
              {nodeTypes.map((nodeType) => {
                const Icon = nodeType.icon;
                return (
                  <Button
                    key={nodeType.type}
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => addNode(nodeType.type)}
                  >
                    <div className={`w-4 h-4 rounded ${nodeType.color} mr-2`} />
                    <Icon className="w-4 h-4 mr-2" />
                    {nodeType.label}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Settings */}
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Bot Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bot Name
                </label>
                <Input
                  value={botFlow.name}
                  onChange={(e) => setBotFlow(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter bot name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <Textarea
                  value={botFlow.description}
                  onChange={(e) => setBotFlow(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your bot's purpose"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Welcome Message
                </label>
                <Textarea
                  value={botFlow.settings.welcomeMessage}
                  onChange={(e) => setBotFlow(prev => ({
                    ...prev,
                    settings: { ...prev.settings, welcomeMessage: e.target.value }
                  }))}
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Language
                </label>
                <Select
                  value={botFlow.settings.language}
                  onValueChange={(value) => setBotFlow(prev => ({
                    ...prev,
                    settings: { ...prev.settings, language: value }
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="zh">Chinese</SelectItem>
                    <SelectItem value="ja">Japanese</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={botFlow.settings.collectEmail}
                    onChange={(e) => setBotFlow(prev => ({
                      ...prev,
                      settings: { ...prev.settings, collectEmail: e.target.checked }
                    }))}
                  />
                  <span className="text-sm text-gray-700">Collect Email</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={botFlow.settings.collectPhone}
                    onChange={(e) => setBotFlow(prev => ({
                      ...prev,
                      settings: { ...prev.settings, collectPhone: e.target.checked }
                    }))}
                  />
                  <span className="text-sm text-gray-700">Collect Phone</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={botFlow.settings.escalationEnabled}
                    onChange={(e) => setBotFlow(prev => ({
                      ...prev,
                      settings: { ...prev.settings, escalationEnabled: e.target.checked }
                    }))}
                  />
                  <span className="text-sm text-gray-700">Enable Escalation</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 relative bg-gray-100 overflow-hidden">
          {isPreview ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Card className="w-96 max-h-[600px]">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Bot Preview</h3>
                    <Button size="sm" variant="outline" onClick={() => setIsPreview(false)}>
                      <EyeOff className="w-4 h-4 mr-2" />
                      Exit Preview
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm">{botFlow.settings.welcomeMessage}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Input placeholder="Type your message..." />
                      <Button size="sm">
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ) : (
            <div className="relative w-full h-full">
              {/* Grid Background */}
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }} />
              
              {/* Nodes */}
              {botFlow.nodes.map(renderNode)}
              
              {/* Empty State */}
              {botFlow.nodes.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Bot className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">
                      Start Building Your Bot
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Add nodes from the sidebar or choose an industry template
                    </p>
                    <div className="flex space-x-2 justify-center">
                      {industryTemplates.slice(0, 3).map((template) => {
                        const Icon = template.icon;
                        return (
                          <Button
                            key={template.id}
                            variant="outline"
                            size="sm"
                            onClick={() => loadTemplate(template.id)}
                          >
                            <Icon className="w-4 h-4 mr-2" />
                            {template.name}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Properties Panel */}
        {selectedNode && (
          <div className="w-80 bg-white border-l overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Node Properties</h3>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setSelectedNode(null)}
                >
                  ×
                </Button>
              </div>
              
              {(() => {
                const node = botFlow.nodes.find(n => n.id === selectedNode);
                if (!node) return null;

                return (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Content
                      </label>
                      <Textarea
                        value={node.content}
                        onChange={(e) => updateNode(node.id, { content: e.target.value })}
                        placeholder="Enter node content..."
                        rows={4}
                      />
                    </div>

                    {node.type === 'question' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Response Options (one per line)
                        </label>
                        <Textarea
                          value={node.config.options?.join('\n') || ''}
                          onChange={(e) => updateNode(node.id, {
                            config: { ...node.config, options: e.target.value.split('\n').filter(Boolean) }
                          })}
                          placeholder="Option 1\nOption 2\nOption 3"
                          rows={4}
                        />
                      </div>
                    )}

                    {node.type === 'condition' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Condition Type
                        </label>
                        <Select
                          value={node.config.conditionType || 'contains'}
                          onValueChange={(value) => updateNode(node.id, {
                            config: { ...node.config, conditionType: value }
                          })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="contains">Contains</SelectItem>
                            <SelectItem value="equals">Equals</SelectItem>
                            <SelectItem value="starts_with">Starts With</SelectItem>
                            <SelectItem value="ends_with">Ends With</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {node.type === 'action' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Action Type
                        </label>
                        <Select
                          value={node.config.actionType || 'send_email'}
                          onValueChange={(value) => updateNode(node.id, {
                            config: { ...node.config, actionType: value }
                          })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="send_email">Send Email</SelectItem>
                            <SelectItem value="create_ticket">Create Ticket</SelectItem>
                            <SelectItem value="escalate">Escalate to Human</SelectItem>
                            <SelectItem value="schedule_meeting">Schedule Meeting</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Position
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          type="number"
                          value={node.position.x}
                          onChange={(e) => updateNode(node.id, {
                            position: { ...node.position, x: parseInt(e.target.value) || 0 }
                          })}
                          placeholder="X"
                        />
                        <Input
                          type="number"
                          value={node.position.y}
                          onChange={(e) => updateNode(node.id, {
                            position: { ...node.position, y: parseInt(e.target.value) || 0 }
                          })}
                          placeholder="Y"
                        />
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisualBotBuilder;