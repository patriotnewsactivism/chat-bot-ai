import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, MessageSquare, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { pricingPlans } from "@/lib/stripe";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const Pricing = () => {
  const [loading, setLoading] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubscribe = async (planId: string) => {
    // Check if user is logged in
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
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
    
    // For now, just show a message since Stripe isn't fully configured
    toast({
      title: "Coming Soon!",
      description: "Payment processing will be available soon. For now, enjoy the free plan!",
    });
    
    setTimeout(() => {
      setLoading(null);
      navigate('/dashboard');
    }, 2000);
  };

  const plans = [
    {
      name: "Starter",
      price: "$0",
      description: "Perfect for testing and small projects",
      features: [
        "1 chatbot",
        "100 conversations/month",
        "Basic analytics",
        "Web deployment",
        "Community support"
      ]
    },
    {
      name: "Pro",
      price: "$49",
      description: "For growing businesses",
      features: [
        "10 chatbots",
        "5,000 conversations/month",
        "Advanced analytics",
        "Multi-channel deployment",
        "Priority support",
        "Custom branding",
        "Knowledge base integration"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations",
      features: [
        "Unlimited chatbots",
        "Unlimited conversations",
        "White-label solution",
        "Dedicated support",
        "SLA guarantee",
        "Custom AI models",
        "On-premise deployment"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">BuildMyBot</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Link to="/templates">
              <Button variant="ghost">Templates</Button>
            </Link>
            <Link to="/pricing">
              <Button variant="ghost">Pricing</Button>
            </Link>
            <Link to="/auth">
              <Button className="gradient-primary">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-muted-foreground">Choose the perfect plan for your needs</p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`p-8 border-border/50 transition-all ${
                plan.popular 
                  ? 'border-primary shadow-lg shadow-primary/20 scale-105' 
                  : 'hover:border-primary/50'
              }`}
            >
              {plan.popular && (
                <div className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-4">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.price !== "Custom" && <span className="text-muted-foreground">/month</span>}
              </div>
              <p className="text-muted-foreground mb-6">{plan.description}</p>
              
              <Button 
                className={`w-full mb-6 ${plan.popular ? 'gradient-primary' : ''}`}
                variant={plan.popular ? "default" : "outline"}
                onClick={() => handleSubscribe(plan.name.toLowerCase())}
                disabled={loading !== null}
              >
                {loading === plan.name.toLowerCase() ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  plan.price === "Custom" ? "Contact Sales" : "Start Free Trial"
                )}
              </Button>
              
              <div className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-2">How is pricing calculated?</h3>
              <p className="text-muted-foreground">
                Pricing is based on the number of conversations your chatbots handle per month. A conversation includes all messages exchanged with a single visitor.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-2">Can I upgrade or downgrade?</h3>
              <p className="text-muted-foreground">
                Yes! You can change plans at any time. Upgrades are effective immediately, and downgrades take effect at your next billing cycle.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-2">Is there a free trial?</h3>
              <p className="text-muted-foreground">
                Yes! All paid plans come with a 14-day free trial. No credit card required.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
