import { loadStripe } from '@stripe/stripe-js';
import { pricingPlans } from '@/lib/stripe';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export interface CreateCheckoutSessionParams {
  priceId: string;
  userId: string;
  customerEmail?: string;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
}

export interface CreatePortalSessionParams {
  customerId: string;
  returnUrl: string;
}

export class StripeService {
  static async createCheckoutSession(params: CreateCheckoutSessionParams) {
    try {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create checkout session');
      }

      const session = await response.json();
      
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe failed to load');
      }

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      return session;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw error;
    }
  }

  static async createPortalSession(params: CreatePortalSessionParams) {
    try {
      const response = await fetch('/api/stripe/create-portal-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create portal session');
      }

      const session = await response.json();
      window.location.href = session.url;
      
      return session;
    } catch (error) {
      console.error('Error creating portal session:', error);
      throw error;
    }
  }

  static async getSubscriptionStatus(userId: string) {
    try {
      const response = await fetch(`/api/stripe/subscription-status?userId=${userId}`);
      
      if (!response.ok) {
        throw new Error('Failed to get subscription status');
      }

      return await response.json();
    } catch (error) {
      console.error('Error getting subscription status:', error);
      throw error;
    }
  }

  static async cancelSubscription(subscriptionId: string) {
    try {
      const response = await fetch('/api/stripe/cancel-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subscriptionId }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to cancel subscription');
      }

      return await response.json();
    } catch (error) {
      console.error('Error canceling subscription:', error);
      throw error;
    }
  }

  static async updateSubscription(subscriptionId: string, priceId: string) {
    try {
      const response = await fetch('/api/stripe/update-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subscriptionId, priceId }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update subscription');
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating subscription:', error);
      throw error;
    }
  }

  static async getUsageStats(userId: string) {
    try {
      const response = await fetch(`/api/stripe/usage-stats?userId=${userId}`);
      
      if (!response.ok) {
        throw new Error('Failed to get usage stats');
      }

      return await response.json();
    } catch (error) {
      console.error('Error getting usage stats:', error);
      throw error;
    }
  }
}

// Helper functions for pricing
export function getPlanFeatures(planId: string) {
  const plan = pricingPlans.find(p => p.id === planId);
  return plan?.features || [];
}

export function getPlanLimits(planId: string) {
  const plan = pricingPlans.find(p => p.id === planId);
  return plan?.limits || { chatbots: 1, conversations: 50 };
}

export function canCreateChatbot(currentPlan: string, currentChatbots: number): boolean {
  const limits = getPlanLimits(currentPlan);
  return currentChatbots < limits.chatbots;
}

export function canHaveMoreConversations(currentPlan: string, currentConversations: number): boolean {
  const limits = getPlanLimits(currentPlan);
  return currentConversations < limits.conversations;
}

export function getUpgradeOptions(currentPlanId: string) {
  const currentPlanIndex = pricingPlans.findIndex(p => p.id === currentPlanId);
  return pricingPlans.slice(currentPlanIndex + 1);
}

export function calculateProratedAmount(
  currentPlanId: string,
  newPlanId: string,
  daysRemaining: number
): number {
  const currentPlan = pricingPlans.find(p => p.id === currentPlanId);
  const newPlan = pricingPlans.find(p => p.id === newPlanId);
  
  if (!currentPlan || !newPlan) return 0;
  
  const dailyRate = (newPlan.price - currentPlan.price) / 30;
  return Math.max(0, dailyRate * daysRemaining);
}