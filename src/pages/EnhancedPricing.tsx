import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, MessageSquare, Loader2, Crown, Zap, Shield, Users, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { StripeService, getPlanFeatures, getPlanLimits, canCreateChatbot, getUpgradeOptions } from "@/api/stripe";

const EnhancedPricing = () => {
  const [loading, setLoading] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [subscriptionStatus, setSubscriptionStatus] = useState<any>(null);
  const [usage, setUsage] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const pricingPlans = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      description: 'Perfect for trying out BuildMyBot',
      icon: MessageSquare,
      features: [
        '1 chatbot',
        '50 conversations/month',
        'Basic analytics',
        'BuildMyBot branding',
        'Community support',
        'Standard templates'
      ],
      limits: {
        chatbots: 1,
        conversations: 50
      },
      popular: false,
      color: 'from-gray-500 to-gray-600'
    },
    {
      id: 'starter',
      name: 'Starter',
      price: '$29',
      description: 'Great for small businesses and startups',
      icon: Zap,
      features: [
        '3 chatbots',
        '1,000 conversations/month',
        'Advanced analytics',
        'Remove BuildMyBot branding',
        'Email support',
        'Custom widget colors',
        'Basic integrations',
        'Priority templates'
      ],
      limits: {
        chatbots: 3,
        conversations: 1000
      },
      popular: true,
      color: 'from-blue-500 to-blue-600',
      originalPrice: '$49'
    },
    {
      id: 'pro',
      name: 'Professional',
      price: '$69',
      description: 'Ideal for growing businesses',
      icon: Crown,
      features: [
        '10 chatbots',
        '10,000 conversations/month',
        'All integrations',
        'Priority support',
        'Custom domain',
        'API access',
        'Team collaboration (3 seats)',
        'Advanced analytics',
        'Custom training data',
        'Multi-language support'
      ],
      limits: {
        chatbots: 10,
        conversations: 10000
      },
      popular: false,
      color: 'from-purple-500 to-purple-600',
      originalPrice: '$99'
    },
    {
      id: 'business',
      name: 'Business',
      price: '$199',
      description: 'For large teams and enterprises',
      icon: Shield,
      features: [
        '50 chatbots',
        '50,000 conversations/month',
        'White-label option',
        'Dedicated support',
        'SLA guarantee',
        'Advanced security',
        'Team collaboration (10 seats)',
        'Custom AI training',
        'Advanced integrations',
        'HIPAA compliance available',
        'Custom contracts'
      ],
      limits: {
        chatbots: 50,
        conversations: 50000
      },
      popular: false,
      color: 'from-orange-500 to-orange-600',
      originalPrice: '$299'
    }
  ];

  useEffect(() => {
    checkUserStatus();
  }, []);

  const checkUserStatus = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session) {
      setUser(session.user);
      
      try {
        const status = await StripeService.getSubscriptionStatus(session.user.id);
        setSubscriptionStatus(status);
        
        const usageStats = await StripeService.getUsageStats(session.user.id);
        setUsage(usageStats.usage);
      } catch (error) {
        console.error('Error fetching user status:', error);
      }
    }
  };

  const handleSubscribe = async (planId: string) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to subscribe to a plan",
      });
      navigate('/auth');
      return;
    }

    if (planId === 'free') {
      navigate('/dashboard');
      return;
    }

    setLoading(planId);

    try {
      await StripeService.createCheckoutSession({
        priceId: getPriceId(planId),
        userId: user.id,
        customerEmail: user.email,
        successUrl: `${window.location.origin}/dashboard?success=true`,
        cancelUrl: `${window.location.origin}/pricing?canceled=true`,
        metadata: {
          planId,
        },
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to start checkout process",
        variant: "destructive"
      });
      setLoading(null);
    }
  };

  const handleManageSubscription = async () => {
    if (!user || !subscriptionStatus?.customerId) return;

    try {
      await StripeService.createPortalSession({
        customerId: subscriptionStatus.customerId,
        returnUrl: `${window.location.origin}/pricing`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to open subscription management",
        variant: "destructive"
      });
    }
  };

  const getPriceId = (planId: string) => {
    const priceIds: Record<string, string> = {
      starter: process.env.VITE_STRIPE_STARTNER_PRICE_ID || 'price_starter',
      pro: process.env.VITE_STRIPE_PRO_PRICE_ID || 'price_pro',
      business: process.env.VITE_STRIPE_BUSINESS_PRICE_ID || 'price_business',
    };
    return priceIds[planId];
  };

  const isCurrentPlan = (planId: string) => {
    return subscriptionStatus?.planId === planId && subscriptionStatus?.status === 'active';
  };

  const isUpgrade = (planId: string) => {
    if (!subscriptionStatus?.planId) return true;
    const planOrder = ['free', 'starter', 'pro', 'business'];
    const currentIndex = planOrder.indexOf(subscriptionStatus.planId);
    const newIndex = planOrder.indexOf(planId);
    return newIndex > currentIndex;
  };

  const getUsagePercentage = (planId: string) => {
    if (!usage || !subscriptionStatus?.planId) return 0;
    
    const plan = pricingPlans.find(p => p.id === planId);
    if (!plan) return 0;
    
    const conversationsUsage = usage.find((u: any) => u.metric === 'conversations')?.total || 0;
    return Math.min((conversationsUsage / plan.limits.conversations) * 100, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link to="/" className="flex items-center space-x-2">
              <MessageSquare className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">BuildMyBot</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <Button variant="outline" onClick={handleManageSubscription}>
                    Manage Subscription
                  </Button>
                  <Button onClick={() => navigate('/dashboard')}>
                    Go to Dashboard
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" onClick={() => navigate('/auth')}>
                    Sign In
                  </Button>
                  <Button onClick={() => navigate('/auth')}>
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-green-100 text-green-800">
            🎉 Limited Time: 30% OFF Annual Plans
          </Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect plan for your business. Start free and scale as you grow.
          </p>
        </div>

        {/* Current Plan Alert */}
        {subscriptionStatus && (
          <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-900">
                  Current Plan: <span className="capitalize">{subscriptionStatus.planId}</span>
                </p>
                <p className="text-sm text-blue-700">
                  Status: <span className="capitalize">{subscriptionStatus.status}</span>
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={handleManageSubscription}>
                Manage Plan
              </Button>
            </div>
          </div>
        )}

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {pricingPlans.map((plan) => {
            const Icon = plan.icon;
            const current = isCurrentPlan(plan.id);
            const upgrade = isUpgrade(plan.id);
            
            return (
              <Card
                key={plan.id}
                className={`relative overflow-hidden ${
                  current ? 'ring-2 ring-blue-600' : ''
                } ${plan.popular ? 'scale-105 shadow-xl' : 'shadow-lg'}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 text-xs font-semibold">
                    MOST POPULAR
                  </div>
                )}
                
                {current && (
                  <div className="absolute top-0 left-0 right-0 bg-green-500 text-white px-3 py-1 text-xs font-semibold text-center">
                    CURRENT PLAN
                  </div>
                )}

                <div className={`p-6 bg-gradient-to-br ${plan.color} text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    <Icon className="w-8 h-8" />
                    {plan.originalPrice && (
                      <span className="text-sm line-through opacity-75">{plan.originalPrice}</span>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline mb-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="ml-2 text-sm opacity-90">/month</span>
                  </div>
                  <p className="text-sm opacity-90">{plan.description}</p>
                </div>

                <div className="p-6">
                  {/* Usage indicator for current plan */}
                  {current && usage && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Usage this month</span>
                        <span>{Math.round(getUsagePercentage(plan.id))}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${getUsagePercentage(plan.id)}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${
                      current
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        : plan.popular
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                        : ''
                    }`}
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={loading === plan.id || current}
                  >
                    {loading === plan.id ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : current ? (
                      'Current Plan'
                    ) : upgrade ? (
                      <>
                        Upgrade Now
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    ) : (
                      'Get Started'
                    )}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Features Comparison */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Feature Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Feature</th>
                  <th className="text-center py-3 px-4">Free</th>
                  <th className="text-center py-3 px-4">Starter</th>
                  <th className="text-center py-3 px-4">Professional</th>
                  <th className="text-center py-3 px-4">Business</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">Chatbots</td>
                  <td className="text-center py-3 px-4">1</td>
                  <td className="text-center py-3 px-4">3</td>
                  <td className="text-center py-3 px-4">10</td>
                  <td className="text-center py-3 px-4">50</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Monthly Conversations</td>
                  <td className="text-center py-3 px-4">50</td>
                  <td className="text-center py-3 px-4">1,000</td>
                  <td className="text-center py-3 px-4">10,000</td>
                  <td className="text-center py-3 px-4">50,000</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Custom Branding</td>
                  <td className="text-center py-3 px-4">❌</td>
                  <td className="text-center py-3 px-4">✅</td>
                  <td className="text-center py-3 px-4">✅</td>
                  <td className="text-center py-3 px-4">✅</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">API Access</td>
                  <td className="text-center py-3 px-4">❌</td>
                  <td className="text-center py-3 px-4">❌</td>
                  <td className="text-center py-3 px-4">✅</td>
                  <td className="text-center py-3 px-4">✅</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Team Collaboration</td>
                  <td className="text-center py-3 px-4">❌</td>
                  <td className="text-center py-3 px-4">❌</td>
                  <td className="text-center py-3 px-4">3 seats</td>
                  <td className="text-center py-3 px-4">10 seats</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Priority Support</td>
                  <td className="text-center py-3 px-4">❌</td>
                  <td className="text-center py-3 px-4">❌</td>
                  <td className="text-center py-3 px-4">✅</td>
                  <td className="text-center py-3 px-4">✅</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="text-left">
              <h3 className="font-semibold mb-2">Can I change plans anytime?</h3>
              <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
            </div>
            <div className="text-left">
              <h3 className="font-semibold mb-2">What happens if I exceed my limits?</h3>
              <p className="text-gray-600">You'll be notified when approaching limits. You can upgrade anytime or wait for monthly reset.</p>
            </div>
            <div className="text-left">
              <h3 className="font-semibold mb-2">Do you offer refunds?</h3>
              <p className="text-gray-600">We offer a 14-day money-back guarantee for all paid plans.</p>
            </div>
            <div className="text-left">
              <h3 className="font-semibold mb-2">Is my data secure?</h3>
              <p className="text-gray-600">Yes, we use enterprise-grade security and are GDPR compliant.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedPricing;