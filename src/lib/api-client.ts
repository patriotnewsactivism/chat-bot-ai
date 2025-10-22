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

export interface User {
  id: string;
  email: string;
  name?: string;
  businessName?: string;
  subscriptionStatus?: string;
  referralCode?: string;
}

class ApiClient {
  private getAuthToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const token = this.getAuthToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options?.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Token expired or invalid
        this.logout();
        window.location.href = '/auth';
      }
      const error = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // Auth methods
  async register(data: {
    email: string;
    password: string;
    name?: string;
    businessName?: string;
    industry?: string;
    companySize?: string;
    website?: string;
    useCase?: string;
    phone?: string;
  }): Promise<{ user: User; token: string }> {
    const result = await this.request<{ user: User; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    // Store token and user
    localStorage.setItem('auth_token', result.token);
    localStorage.setItem('user', JSON.stringify(result.user));
    
    return result;
  }

  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    const result = await this.request<{ user: User; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    // Store token and user
    localStorage.setItem('auth_token', result.token);
    localStorage.setItem('user', JSON.stringify(result.user));
    
    return result;
  }

  async verify(): Promise<{ user: User }> {
    return this.request<{ user: User }>('/auth/verify');
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  }

  getStoredUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  isAuthenticated(): boolean {
    return !!this.getAuthToken();
  }

  // Chatbot methods
  async getChatbots(): Promise<Chatbot[]> {
    return this.request<Chatbot[]>('/chatbots');
  }

  async getChatbot(id: string): Promise<Chatbot> {
    return this.request<Chatbot>(`/chatbots/${id}`);
  }

  async createChatbot(data: {
    name: string;
    description?: string;
    template?: string;
    config?: any;
    knowledgeBase?: any;
    widgetSettings?: any;
  }): Promise<Chatbot> {
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