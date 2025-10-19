import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Check, Code, Globe, ExternalLink } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface EmbedCodeGeneratorProps {
  botId: string;
}

export function EmbedCodeGenerator({ botId }: EmbedCodeGeneratorProps) {
  const [copied, setCopied] = useState(false);
  const [primaryColor, setPrimaryColor] = useState('#1e3a8a');
  const [position, setPosition] = useState('bottom-right');
  const { toast } = useToast();

  const baseUrl = window.location.origin;
  const widgetUrl = `${baseUrl}/widget/${botId}`;

  const generateEmbedCode = () => {
    return `<!-- BuildMyBot Widget -->
<script>
  window.BuildMyBotConfig = {
    botId: '${botId}',
    primaryColor: '${primaryColor}',
    position: '${position}'
  };
</script>
<script src="${baseUrl}/widget.js"></script>`;
  };

  const generateIframeCode = () => {
    return `<!-- BuildMyBot iFrame -->
<iframe 
  src="${widgetUrl}"
  width="400"
  height="600"
  frameborder="0"
  style="border: none; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);"
></iframe>`;
  };

  const generateReactCode = () => {
    return `// React Component
import React from 'react';

export function ChatWidget() {
  return (
    <iframe
      src="${widgetUrl}"
      width="400"
      height="600"
      style={{
        border: 'none',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
      }}
    />
  );
}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Embed code copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Embed Your Chatbot</h2>
        <p className="text-muted-foreground">
          Add your chatbot to any website using the code below
        </p>
      </div>

      {/* Customization Options */}
      <div className="mb-6 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="primaryColor">Primary Color</Label>
            <div className="flex gap-2">
              <Input
                id="primaryColor"
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="w-20 h-10"
              />
              <Input
                type="text"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                placeholder="#6366f1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="position">Widget Position</Label>
            <select
              id="position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="w-full h-10 px-3 rounded-md border border-input bg-background"
            >
              <option value="bottom-right">Bottom Right</option>
              <option value="bottom-left">Bottom Left</option>
              <option value="top-right">Top Right</option>
              <option value="top-left">Top Left</option>
            </select>
          </div>
        </div>
      </div>

      {/* Preview Link */}
      <div className="mb-6 p-4 bg-muted rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium mb-1">Widget Preview URL</p>
            <p className="text-sm text-muted-foreground">{widgetUrl}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(widgetUrl, '_blank')}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Preview
          </Button>
        </div>
      </div>

      {/* Embed Code Tabs */}
      <Tabs defaultValue="script" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="script">
            <Code className="w-4 h-4 mr-2" />
            Script
          </TabsTrigger>
          <TabsTrigger value="iframe">
            <Globe className="w-4 h-4 mr-2" />
            iFrame
          </TabsTrigger>
          <TabsTrigger value="react">
            <Code className="w-4 h-4 mr-2" />
            React
          </TabsTrigger>
        </TabsList>

        <TabsContent value="script" className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Add this code before the closing &lt;/body&gt; tag on your website
            </p>
            <div className="relative">
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{generateEmbedCode()}</code>
              </pre>
              <Button
                size="sm"
                variant="outline"
                className="absolute top-2 right-2"
                onClick={() => copyToClipboard(generateEmbedCode())}
              >
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="iframe" className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Embed as an iframe anywhere on your page
            </p>
            <div className="relative">
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{generateIframeCode()}</code>
              </pre>
              <Button
                size="sm"
                variant="outline"
                className="absolute top-2 right-2"
                onClick={() => copyToClipboard(generateIframeCode())}
              >
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="react" className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Use this React component in your application
            </p>
            <div className="relative">
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{generateReactCode()}</code>
              </pre>
              <Button
                size="sm"
                variant="outline"
                className="absolute top-2 right-2"
                onClick={() => copyToClipboard(generateReactCode())}
              >
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Installation Instructions */}
      <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
        <h3 className="font-semibold mb-2">📝 Installation Instructions</h3>
        <ol className="text-sm space-y-2 text-muted-foreground">
          <li>1. Copy the embed code above</li>
          <li>2. Paste it into your website's HTML</li>
          <li>3. The chatbot will appear automatically</li>
          <li>4. Customize colors and position as needed</li>
        </ol>
      </div>
    </Card>
  );
}