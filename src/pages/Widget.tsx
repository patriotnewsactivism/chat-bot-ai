import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { ChatInterface } from '@/components/ChatInterface';
import { Loader2 } from 'lucide-react';

export default function Widget() {
  const { botId } = useParams();
  const [bot, setBot] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBot();
  }, [botId]);

  const fetchBot = async () => {
    try {
      const { data, error } = await supabase
        .from('chatbots')
        .select('*')
        .eq('id', botId)
        .single();

      if (error) throw error;
      
      if (!data) {
        setError('Chatbot not found');
        return;
      }

      setBot(data);
    } catch (err) {
      console.error('Error fetching bot:', err);
      setError('Failed to load chatbot');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
          <p className="text-muted-foreground">Loading chatbot...</p>
        </div>
      </div>
    );
  }

  if (error || !bot) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-destructive mb-2">⚠️ {error || 'Chatbot not found'}</p>
          <p className="text-sm text-muted-foreground">Please check the bot ID and try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-background p-4">
      <ChatInterface
        botId={botId!}
        systemPrompt={bot.system_prompt}
        knowledgeBase={bot.knowledge_base}
      />
    </div>
  );
}