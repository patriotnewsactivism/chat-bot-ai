import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Zap, Brain, BarChart3, ArrowRight, CheckCircle2, Globe, Menu, X, Sparkles, Users, DollarSign, Rocket, Crown, Building, Headphones, ShoppingCart, Star, Shield, Layers, Smartphone, Monitor, Code, Database, Lock, TrendingUp, Award, Target, Infinity } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import DemoBot from "@/components/DemoBot";

const IndexEnhanced = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Advanced AI Engine",
      description: "GPT-4 powered conversations with contextual understanding and real-time learning capabilities.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Layers className="w-8 h-8" />,
      title: "Visual Bot Builder",
      description: "Drag-and-drop interface with industry-specific templates. No coding required.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Multi-Channel Deployment",
      description: "Deploy to 12+ platforms including websites, social media, and messaging apps.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Real-Time Analytics",
      description: "Comprehensive dashboard with performance metrics and business intelligence.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Enterprise Security",
      description: "Bank-grade encryption with GDPR, HIPAA, and SOC2 compliance.",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "White-Label Ready",
      description: "Complete reseller ecosystem with 50% commission structure.",
      gradient: "from-pink-500 to-rose-500"
    }
  ];

  const stats = [
    { number: "99.9%", label: "Uptime", icon: <TrendingUp className="w-6 h-6" /> },
    { number: "50+", label: "Integrations", icon: <Layers className="w-6 h-6" /> },
    { number: "12+", label: "Platforms", icon: <Globe className="w-6 h-6" /> },
    { number: "50%", label: "Commission", icon: <DollarSign className="w-6 h-6" /> }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechCorp",
      content: "BuildMyBot transformed our customer engagement. 300% increase in conversions!",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face"
    },
    {
      name: "Michael Chen",
      role: "CEO",
      company: "StartupXYZ",
      content: "The reseller program generated $50K in the first month. Incredible ROI!",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face"
    },
    {
      name: "Emily Rodriguez",
      role: "Agency Owner",
      company: "Digital Solutions",
      content: "White-label capabilities allowed us to offer premium AI services to all our clients.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollY > 50 
          ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-b border-slate-200/50 dark:border-slate-700/50 shadow-lg' 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-75"></div>
              <img src="/IMG_1486.jpeg" alt="BuildMyBot Logo" className="relative w-12 h-12 rounded-xl object-contain bg-white p-1" />
            </div>
            <div>
              <span className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">BuildMyBot</span>
              <div className="text-xs text-slate-500 font-medium">AI-Powered Platform</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <a href="#features" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">Features</a>
            <a href="#templates" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">Templates</a>
            <a href="#pricing" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">Pricing</a>
            <Link to="/affiliates" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">Affiliates</Link>
            <Link to="/auth">
              <Button variant="ghost" className="text-slate-600 hover:text-blue-600 font-semibold">
                Login
              </Button>
            </Link>
            <Link to="/auth">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Sign Up Free
              </Button>
            </Link>
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden">
            <Button variant="ghost" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-xl">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-b border-slate-200/50 shadow-xl">
            <div className="container mx-auto px-4 py-6 space-y-4">
              <a href="#features" className="block py-3 text-slate-600 hover:text-blue-600 font-medium" onClick={() => setMobileMenuOpen(false)}>Features</a>
              <a href="#templates" className="block py-3 text-slate-600 hover:text-blue-600 font-medium" onClick={() => setMobileMenuOpen(false)}>Templates</a>
              <a href="#pricing" className="block py-3 text-slate-600 hover:text-blue-600 font-medium" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
              <Link to="/affiliates" className="block py-3 text-slate-600 hover:text-blue-600 font-medium" onClick={() => setMobileMenuOpen(false)}>Affiliates</Link>
              <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold">
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/30 to-purple-600/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/30 to-pink-600/30 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 border border-blue-200/50 dark:border-blue-700/50 mb-8">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              #1 AI Chatbot Platform
            </span>
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">NEW</Badge>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent">
              Build Your Bot,
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Your Way
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto mb-12 leading-relaxed">
            Create powerful AI chatbots without coding. Perfect for businesses, creators, and 
            <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> resellers earning 50% commission</span>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <Link to="/auth">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-xl h-16 px-12 rounded-2xl font-bold shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105">
                <Rocket className="w-6 h-6 mr-3" />
                Start Building Free
              </Button>
            </Link>
            <Link to="/templates">
              <Button variant="outline" size="lg" className="text-xl h-16 px-12 rounded-2xl font-semibold border-2 border-slate-300 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300">
                <Globe className="w-6 h-6 mr-3" />
                View Templates
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white mb-4 mx-auto">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-slate-600 dark:text-slate-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-blue-200 mb-6">
              <Star className="w-4 h-4 mr-2" />
              Premium Features
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-slate-900 to-blue-900 dark:from-white dark:to-blue-100 bg-clip-text text-transparent">
                Everything You Need to Build
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Amazing Chatbots
              </span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              From simple Q&A bots to complex AI assistants, we've got you covered with enterprise-grade features.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group p-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 rounded-3xl">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-green-200 mb-6">
              <Award className="w-4 h-4 mr-2" />
              Customer Success
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-blue-900 dark:from-white dark:to-blue-100 bg-clip-text text-transparent">
              Trusted by Industry Leaders
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-0 shadow-xl rounded-3xl">
                <div className="flex items-center mb-6">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-16 h-16 rounded-full mr-4" />
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">{testimonial.name}</div>
                    <div className="text-slate-600 dark:text-slate-400">{testimonial.role}</div>
                    <div className="text-sm text-blue-600 font-medium">{testimonial.company}</div>
                  </div>
                </div>
                <p className="text-slate-700 dark:text-slate-300 italic leading-relaxed">"{testimonial.content}"</p>
                <div className="flex text-yellow-400 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reseller Program Section */}
      <section id="reseller" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <Badge className="bg-white/20 text-white border-white/30 mb-6">
              <Users className="w-4 h-4 mr-2" />
              Partner Program
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              50% Recurring Reseller
              <br />
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Commissions
              </span>
            </h2>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              Join our reseller program and earn vested residual income. Earn 50% on your direct sales and 20% on sales from resellers you recruit. 
              As customers continue their subscriptions, you continue earning commissions.
            </p>
          </div>

          <Card className="p-12 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl">
            <div className="grid lg:grid-cols-3 gap-12 items-center">
              <div className="lg:col-span-2 space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl p-3">
                      <CheckCircle2 className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-2 text-white">Sign Up</h4>
                      <p className="text-blue-100">Join our reseller program in minutes with no upfront costs</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl p-3">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-2 text-white">Promote</h4>
                      <p className="text-blue-100">Share your unique referral link and marketing materials</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl p-3">
                      <DollarSign className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-2 text-white">Earn</h4>
                      <p className="text-blue-100">Receive 50% commission on all referred subscriptions</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl p-3">
                      <Infinity className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-2 text-white">Scale</h4>
                      <p className="text-blue-100">Recruit other resellers and earn 20% on their sales</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-3xl p-8 text-center text-white shadow-2xl">
                <div className="text-7xl md:text-8xl font-bold mb-4">50%</div>
                <div className="text-2xl font-bold mb-2">Recurring Commission</div>
                <div className="text-orange-100 mb-8">On direct sales</div>
                <Button asChild className="w-full bg-white text-orange-600 hover:bg-gray-100 py-6 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <a href="/affiliates">
                    <Crown className="w-6 h-6 mr-3" />
                    Join Program
                  </a>
                </Button>
                <div className="mt-6 text-sm text-orange-100">
                  + 20% on indirect referrals
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-blue-900 dark:from-white dark:to-blue-100 bg-clip-text text-transparent">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-12 max-w-2xl mx-auto">
            Join thousands of businesses already using BuildMyBot to engage customers and drive growth.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/auth">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-xl h-16 px-12 rounded-2xl font-bold shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105">
                <Rocket className="w-6 h-6 mr-3" />
                Start Your Free Trial
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="outline" size="lg" className="text-xl h-16 px-12 rounded-2xl font-semibold border-2 border-slate-300 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Demo Bot */}
      <DemoBot />
    </div>
  );
};

export default IndexEnhanced;