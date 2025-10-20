import React, { useState, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  Plus, 
  Settings, 
  Trash2, 
  Save, 
  Play, 
  ArrowRight,
  Bot,
  User,
  Zap,
  Brain,
  ShoppingCart,
  Headphones,
  Building,
  Stethoscope
} from 'lucide-react';

interface BotNode {
  id: string;
  type: 'trigger' | 'response' | 'condition' | 'action';
  title: string;
  content: string;
  position: { x: number; y: number };
  connections: string[];
}

interface Template {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  nodes: BotNode[];
}

const VisualBotBuilder: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [nodes, setNodes] = useState<BotNode[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const templates: Template[] = [
    {
      id: 'ecommerce',
      name: 'E-commerce Assistant',
      description: 'Product recommendations, order tracking, and customer support',
      icon: <ShoppingCart className="h-6 w-6" />,
      category: 'Sales',
      nodes: [
        {
          id: '1',
          type: 'trigger',
          title: 'Welcome Message',
          content: 'Hi! I\'m here to help you find the perfect product. What are you looking for today?',
          position: { x: 100, y: 100 },
          connections: ['2', '3']
        },
        {
          id: '2',
          type: 'response',
          title: 'Product Search',
          content: 'Let me search our catalog for you...',
          position: { x: 300, y: 150 },
          connections: ['4']
        },
        {
          id: '3',
          type: 'response',
          title: 'Order Status',
          content: 'I can help you track your order. Please provide your order number.',
          position: { x: 300, y: 50 },
          connections: ['5']
        }
      ]
    },
    {
      id: 'healthcare',
      name: 'Healthcare Assistant',
      description: 'Appointment scheduling, symptom checker, and health information',
      icon: <Stethoscope className="h-6 w-6" />,
      category: 'Healthcare',
      nodes: [
        {
          id: '1',
          type: 'trigger',
          title: 'Health Greeting',
          content: 'Welcome to our healthcare assistant. How can I help you today?',
          position: { x: 100, y: 100 },
          connections: ['2', '3']
        },
        {
          id: '2',
          type: 'response',
          title: 'Book Appointment',
          content: 'I\'ll help you schedule an appointment. What type of service do you need?',
          position: { x: 300, y: 150 },
          connections: []
        }
      ]
    },
    {
      id: 'support',
      name: 'Customer Support',
      description: 'FAQ handling, ticket creation, and escalation management',
      icon: <Headphones className="h-6 w-6" />,
      category: 'Support',
      nodes: [
        {
          id: '1',
          type: 'trigger',
          title: 'Support Welcome',
          content: 'Hi! I\'m your support assistant. What issue can I help you resolve?',
          position: { x: 100, y: 100 },
          connections: ['2', '3']
        }
      ]
    },
    {
      id: 'realestate',
      name: 'Real Estate Agent',
      description: 'Property search, viewing scheduling, and market information',
      icon: <Building className="h-6 w-6" />,
      category: 'Real Estate',
      nodes: [
        {
          id: '1',
          type: 'trigger',
          title: 'Property Inquiry',
          content: 'Looking for your dream home? I can help you find properties that match your criteria.',
          position: { x: 100, y: 100 },
          connections: ['2']
        }
      ]
    }
  ];

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template.id);
    setNodes(template.nodes);
  };

  const addNode = useCallback((type: BotNode['type']) => {
    const newNode: BotNode = {
      id: Date.now().toString(),
      type,
      title: `New ${type}`,
      content: '',
      position: { x: Math.random() * 400 + 100, y: Math.random() * 300 + 100 },
      connections: []
    };
    setNodes(prev => [...prev, newNode]);
  }, []);

  const updateNode = useCallback((id: string, updates: Partial<BotNode>) => {
    setNodes(prev => prev.map(node => 
      node.id === id ? { ...node, ...updates } : node
    ));
  }, []);

  const deleteNode = useCallback((id: string) => {
    setNodes(prev => prev.filter(node => node.id !== id));
    setSelectedNode(null);
  }, []);

  const getNodeIcon = (type: BotNode['type']) => {
    switch (type) {
      case 'trigger': return <Zap className="h-4 w-4" />;
      case 'response': return <MessageSquare className="h-4 w-4" />;
      case 'condition': return <Brain className="h-4 w-4" />;
      case 'action': return <Settings className="h-4 w-4" />;
      default: return <Bot className="h-4 w-4" />;
    }
  };

  const getNodeColor = (type: BotNode['type']) => {
    switch (type) {
      case 'trigger': return 'bg-green-100 border-green-300 text-green-800';
      case 'response': return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'condition': return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'action': return 'bg-purple-100 border-purple-300 text-purple-800';
      default: return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Bot className="h-6 w-6 text-primary" />
            Visual Bot Builder
          </h1>
          <Badge variant="secondary">Drag & Drop Interface</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setIsPreviewMode(!isPreviewMode)}>
            <Play className="h-4 w-4 mr-2" />
            {isPreviewMode ? 'Edit Mode' : 'Preview'}
          </Button>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save Bot
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Template Sidebar */}
        <div className="w-80 border-r border-border p-4 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">Industry Templates</h2>
          <div className="space-y-3">
            {templates.map((template) => (
              <Card 
                key={template.id}
                className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                  selectedTemplate === template.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => handleTemplateSelect(template)}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    {template.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{template.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {template.description}
                    </p>
                    <Badge variant="outline" className="mt-2">
                      {template.category}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Node Tools */}
          <div className="mt-8">
            <h3 className="text-md font-semibold mb-3">Add Components</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => addNode('trigger')}
                className="flex flex-col h-auto py-3"
              >
                <Zap className="h-4 w-4 mb-1" />
                Trigger
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => addNode('response')}
                className="flex flex-col h-auto py-3"
              >
                <MessageSquare className="h-4 w-4 mb-1" />
                Response
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => addNode('condition')}
                className="flex flex-col h-auto py-3"
              >
                <Brain className="h-4 w-4 mb-1" />
                Condition
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => addNode('action')}
                className="flex flex-col h-auto py-3"
              >
                <Settings className="h-4 w-4 mb-1" />
                Action
              </Button>
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 relative bg-gray-50 overflow-auto">
          <div className="absolute inset-0 p-4">
            {nodes.map((node) => (
              <Card
                key={node.id}
                className={`absolute w-64 p-4 cursor-move border-2 ${getNodeColor(node.type)} ${
                  selectedNode === node.id ? 'ring-2 ring-primary' : ''
                }`}
                style={{
                  left: node.position.x,
                  top: node.position.y
                }}
                onClick={() => setSelectedNode(node.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getNodeIcon(node.type)}
                    <span className="font-medium text-sm">{node.type.toUpperCase()}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNode(node.id);
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
                <h4 className="font-medium mb-2">{node.title}</h4>
                <p className="text-sm text-muted-foreground">{node.content}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Properties Panel */}
        {selectedNode && (
          <div className="w-80 border-l border-border p-4 overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Node Properties</h2>
            {(() => {
              const node = nodes.find(n => n.id === selectedNode);
              if (!node) return null;

              return (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={node.title}
                      onChange={(e) => updateNode(node.id, { title: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      value={node.content}
                      onChange={(e) => updateNode(node.id, { content: e.target.value })}
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label>Node Type</Label>
                    <div className={`p-3 rounded-lg ${getNodeColor(node.type)}`}>
                      <div className="flex items-center gap-2">
                        {getNodeIcon(node.type)}
                        <span className="font-medium">{node.type.toUpperCase()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
};

export default VisualBotBuilder;