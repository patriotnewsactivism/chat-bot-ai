const API_BASE_URL = '/api';

export interface Chatbot {
  id: string;
  userId: string;
  name: string;
  description?: string;
  template?: string;
  status?: string;
  config?: any;
  knowledgeBase?: any;
  widgetSettings?: any;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Message {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt?: Date;
}

export interface Conversation {
  id: string;
  chatbotId: string;
  sessionId: string;
  visitorId?: string;
  status?: string;
  createdAt?: Date;
}

class ApiClient {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  async getChatbots(userId: string): Promise<Chatbot[]> {
    return this.request<Chatbot[]>(`/chatbots?userId=${userId}`);
  }

  async getChatbot(id: string): Promise<Chatbot> {
    return this.request<Chatbot>(`/chatbots/${id}`);
  }

  async createChatbot(data: Partial<Chatbot>): Promise<Chatbot> {
    return this.request<Chatbot>('/chatbots', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateChatbot(id: string, data: Partial<Chatbot>): Promise<Chatbot> {
    return this.request<Chatbot>(`/chatbots/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteChatbot(id: string): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>(`/chatbots/${id}`, {
      method: 'DELETE',
    });
  }

  async getConversations(chatbotId: string): Promise<Conversation[]> {
    return this.request<Conversation[]>(`/conversations/${chatbotId}`);
  }

  async getMessages(conversationId: string): Promise<Message[]> {
    return this.request<Message[]>(`/messages/${conversationId}`);
  }

  async sendChatMessage(data: {
    chatbotId: string;
    conversationId?: string;
    message: string;
    visitorId: string;
  }): Promise<{ message: string; conversationId: string }> {
    return this.request<{ message: string; conversationId: string }>('/chat', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export const apiClient = new ApiClient();
