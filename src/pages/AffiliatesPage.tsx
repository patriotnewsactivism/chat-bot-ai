import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, DollarSign, CheckCircle2, Target, Infinity, Crown, 
  TrendingUp, Award, Rocket, ArrowRight, Star, Shield, 
  BarChart3, Zap, Globe, MessageSquare
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const AffiliatesPage = () => {
  const [email, setEmail] = useState("");

  const benefits = [
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "50% Recurring Commission",
      description: "Earn 50% on every subscription payment from your direct referrals, month after month.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <Infinity className="w-8 h-8" />,
      title: "Two-Tier Structure",
      description: "Earn 20% commission on sales from affiliates you recruit. Build passive income streams.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Vested Residual Income",
      description: "As long as customers stay subscribed, you keep earning. Build long-term recurring revenue.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Volume Bonuses",
      description: "Unlock up to 10% additional bonuses when you hit volume milestones.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Real-Time Tracking",
      description: "Monitor your referrals, commissions, and payouts in your dedicated dashboard.",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Marketing Support",
      description: "Get access to banners, landing pages, email templates, and promotional materials.",
      gradient: "from-pink-500 to-rose-500"
    }
  ];

  const commissionExamples = [
    {
      plan: "Starter Plan",
      price: "$29/month",
      directCommission: "$14.50/month",
      indirectCommission: "$2.90/month",
      clients: 24,
      annualEarnings: "$4,176"
    },
    {
      plan: "Professional Plan",
      price: "$99/month",
      directCommission: "$49.50/month",
      indirectCommission: "$9.90/month",
      clients: 12,
      annualEarnings: "$7,128"
    },
    {
      plan: "Business Plan",
      price: "$299/month",
      directCommission: "$149.50/month",
      indirectCommission: "$29.90/month",
      clients: 6,
      annualEarnings: "$10,764"
    }
  ];

  const steps = [
    {
      number: "1",
      title: "Sign Up Free",
      description: "Create your affiliate account in under 2 minutes. No upfront costs or commitments.",
      icon: <CheckCircle2 className="w-6 h-6" />
    },
    {
      number: "2",
      title: "Get Your Links",
      description: "Receive your unique referral links and access marketing materials instantly.",
      icon: <Globe className="w-6 h-6" />
    },
    {
      number: "3",
      title: "Promote & Share",
      description: "Share BuildMyBot with your audience using our proven marketing resources.",
      icon: <MessageSquare className="w-6 h-6" />
    },
    {
      number: "4",
      title: "Earn Commissions",
      description: "Get paid 50% recurring commissions on all successful referrals, every month.",
      icon: <DollarSign className="w-6 h-6" />
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to auth page with affiliate signup
    window.location.href = "/auth?type=affiliate";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-lg border-b border-slate-200/50 shadow-lg">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-75"></div>
              <img src="/IMG_1486.jpeg" alt="BuildMyBot Logo" className="relative w-12 h-12 rounded-xl object-contain bg-white p-1" />
            </div>
            <div>
              <span className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">BuildMyBot</span>
              <div className="text-xs text-slate-500 font-medium">Affiliate Program</div>
            </div>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link to="/auth">
              <Button variant="ghost" className="text-slate-600 hover:text-blue-600 font-semibold">
                Login
              </Button>
            </Link>
            <Link to="/auth">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg">
                Join Now
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 opacity-5"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 mb-6 px-6 py-2 text-lg">
              <Users className="w-5 h-5 mr-2" />
              Affiliate & Reseller Program
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Earn <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">50% Recurring</span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Commissions</span> for Life
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join the most lucrative AI chatbot affiliate program. Earn vested residual income with 50% commissions on direct sales and 20% on indirect referrals.
            </p>

            {/* Email Signup Form */}
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-12">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email to get started"
                  className="flex-1 px-6 py-4 rounded-xl border-2 border-slate-300 focus:border-blue-500 focus:outline-none text-lg"
                  required
                />
                <Button 
                  type="submit"
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <Crown className="w-6 h-6 mr-2" />
                  Join Free Now
                </Button>
              </div>
              <p className="text-sm text-slate-500 mt-4">No credit card required • Start earning in minutes</p>
            </form>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">50%</div>
                <div className="text-slate-600 font-medium">Direct Commission</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">20%</div>
                <div className="text-slate-600 font-medium">Indirect Commission</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">$26K+</div>
                <div className="text-slate-600 font-medium">Avg Annual Earnings</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">∞</div>
                <div className="text-slate-600 font-medium">Recurring Revenue</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Join Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Affiliate Program</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              The most rewarding affiliate program in the AI chatbot industry with industry-leading commissions and support.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-slate-100">
                <div className={`bg-gradient-to-br ${benefit.gradient} rounded-2xl p-4 w-16 h-16 flex items-center justify-center mb-6 text-white`}>
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{benefit.title}</h3>
                <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Commission Examples */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Real Commission</span> Examples
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              See exactly how much you can earn with our transparent commission structure.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {commissionExamples.map((example, index) => (
              <Card key={index} className="p-8 bg-white hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{example.plan}</h3>
                  <div className="text-3xl font-bold text-blue-600 mb-4">{example.price}</div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-slate-600">Direct Commission</span>
                    <span className="font-bold text-green-600">{example.directCommission}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-slate-600">Indirect Commission</span>
                    <span className="font-bold text-purple-600">{example.indirectCommission}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-slate-600">Example Clients</span>
                    <span className="font-bold">{example.clients}</span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 text-center">
                  <div className="text-sm text-slate-600 mb-1">Annual Earnings</div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {example.annualEarnings}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-lg text-slate-600 mb-6">
              <strong>Total Potential:</strong> With just 42 clients across all tiers, earn <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">$26,482+</span> annually
            </p>
            <p className="text-slate-500">Plus 20% on indirect referrals for unlimited earning potential!</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              How It <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Works</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Start earning in 4 simple steps. No technical knowledge required.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="p-8 h-full hover:shadow-xl transition-all duration-300 border-2 border-slate-100">
                  <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-full w-16 h-16 flex items-center justify-center text-white text-2xl font-bold mb-6 mx-auto">
                    {step.number}
                  </div>
                  <div className="text-center">
                    <div className="flex justify-center mb-4 text-blue-600">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                    <p className="text-slate-600">{step.description}</p>
                  </div>
                </Card>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-blue-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 via-purple-900 to-pink-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to Start <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Earning?</span>
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
            Join thousands of affiliates already earning recurring commissions with BuildMyBot. No risk, no upfront costs.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/auth?type=affiliate">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-xl h-16 px-12 rounded-2xl font-bold shadow-2xl hover:shadow-white/25 transition-all duration-300 transform hover:scale-105">
                <Crown className="w-6 h-6 mr-3" />
                Join Affiliate Program
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" size="lg" className="text-xl h-16 px-12 rounded-2xl font-semibold border-2 border-white text-white hover:bg-white/10 transition-all duration-300">
                Learn More About BuildMyBot
              </Button>
            </Link>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-blue-100">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>No Credit Card Required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>Start Earning Today</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>Free Marketing Materials</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <img src="/IMG_1486.jpeg" alt="BuildMyBot Logo" className="w-10 h-10 rounded-lg" />
            <span className="font-bold text-xl">BuildMyBot Affiliates</span>
          </div>
          <p className="text-slate-400 mb-6">
            The most rewarding AI chatbot affiliate program
          </p>
          <div className="flex items-center justify-center gap-8 text-sm text-slate-400">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            <a href="mailto:affiliates@buildmybot.app" className="hover:text-white transition-colors">Contact</a>
          </div>
          <div className="mt-8 text-sm text-slate-500">
            © 2025 BuildMyBot. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AffiliatesPage;