import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  priceId: string;
  interval: 'month' | 'year';
  features: string[];
  limits: {
    chatbots: number;
    conversations: number;
  };
  popular?: boolean;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    priceId: '',
    interval: 'month',
    features: [
      '1 chatbot',
      '50 conversations/month',
      'Basic analytics',
      'ChatMaker branding',
      'Community support'
    ],
    limits: {
      chatbots: 1,
      conversations: 50
    }
  },
  {
    id: 'starter',
    name: 'Starter',
    price: 29,
    priceId: 'price_starter', // Replace with actual Stripe price ID
    interval: 'month',
    features: [
      '3 chatbots',
      '1,000 conversations/month',
      'Advanced analytics',
      'Remove branding',
      'Email support',
      'Custom widget colors'
    ],
    limits: {
      chatbots: 3,
      conversations: 1000
    }
  },
  {
    id: 'pro',
    name: 'Professional',
    price: 99,
    priceId: 'price_pro', // Replace with actual Stripe price ID
    interval: 'month',
    features: [
      '10 chatbots',
      '10,000 conversations/month',
      'All integrations',
      'Priority support',
      'Custom domain',
      'API access',
      'Team collaboration (3 seats)'
    ],
    limits: {
      chatbots: 10,
      conversations: 10000
    },
    popular: true
  },
  {
    id: 'business',
    name: 'Business',
    price: 299,
    priceId: 'price_business', // Replace with actual Stripe price ID
    interval: 'month',
    features: [
      '50 chatbots',
      '50,000 conversations/month',
      'White-label option',
      'Dedicated support',
      'SLA guarantee',
      'Advanced security',
      'Team collaboration (10 seats)'
    ],
    limits: {
      chatbots: 50,
      conversations: 50000
    }
  }
];

export async function createCheckoutSession(priceId: string, userId: string) {
  try {
    // In production, this should call your backend API
    // For now, we'll redirect to Stripe Checkout directly
    const stripe = await stripePromise;
    
    if (!stripe) {
      throw new Error('Stripe failed to load');
    }

    // This is a placeholder - you need to implement the backend endpoint
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId,
        userId,
        successUrl: `${window.location.origin}/dashboard?success=true`,
        cancelUrl: `${window.location.origin}/pricing?canceled=true`,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create checkout session');
    }

    const session = await response.json();

    // Redirect to Stripe Checkout
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      throw new Error(result.error.message);
    }
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}

export async function createPortalSession(customerId: string) {
  try {
    // This should call your backend API
    const response = await fetch('/api/create-portal-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerId,
        returnUrl: `${window.location.origin}/dashboard`,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create portal session');
    }

    const session = await response.json();
    
    // Redirect to Stripe Customer Portal
    window.location.href = session.url;
  } catch (error) {
    console.error('Error creating portal session:', error);
    throw error;
  }
}

export function getPlanById(planId: string): PricingPlan | undefined {
  return pricingPlans.find(plan => plan.id === planId);
}

export function getPlanByPriceId(priceId: string): PricingPlan | undefined {
  return pricingPlans.find(plan => plan.priceId === priceId);
}