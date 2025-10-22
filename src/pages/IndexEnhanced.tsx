import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Zap, Brain, BarChart3, ArrowRight, CheckCircle2, Globe, Menu, X, Sparkles, Users, DollarSign, Rocket, Crown, Building, Headphones, ShoppingCart, Star, Shield, Layers, Smartphone, Monitor, Code, Database, Lock, TrendingUp, Award, Target, Infinity, LogOut, User, Play, Check, ChevronRight, Mail, Phone, MapPin, BookOpen } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import DemoBot from "@/components/DemoBot";
import { apiClient } from "@/lib/api-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import heroBg from "@/assets/images/hero-bg.jpg";
import featuresBg from "@/assets/images/features-bg.jpg";
import dashboardPreview from "@/assets/images/dashboard-preview.png";

const IndexEnhanced = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status
    const authenticated = apiClient.isAuthenticated();
    setIsAuthenticated(authenticated);
    if (authenticated) {
      setUser(apiClient.getStoredUser());
    }
  }, []);

  const handleLogout = () => {
    apiClient.logout();
    setIsAuthenticated(false);
    setUser(null);
    navigate('/');
  };

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Advanced AI Engine",
      description: "Powered by cutting-edge language models with human-like conversation capabilities and context awareness.",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: <Layers className="w-8 h-8" />,
      title: "Visual Bot Builder",
      description: "Drag-and-drop interface to design conversational flows without writing a single line of code.",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Knowledge Base Integration",
      description: "Train your AI on your documents, website content, and frequently asked questions.",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Multi-Channel Deployment",
      description: "Deploy your chatbots across websites, mobile apps, social media, and messaging platforms.",
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Advanced Analytics",
      description: "Real-time insights into conversations, user satisfaction, and conversion metrics.",
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Enterprise Security",
      description: "Bank-level encryption, SOC2 compliance, and comprehensive data protection.",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50"
    }
  ];

  const templates = [
    { name: "Customer Support", industry: "All Industries", users: "12.5K+", icon: <Headphones className="w-6 h-6" /> },
    { name: "Lead Generation", industry: "Sales & Marketing", users: "8.7K+", icon: <Target className="w-6 h-6" /> },
    { name: "E-commerce Assistant", industry: "Retail", users: "6.2K+", icon: <ShoppingCart className="w-6 h-6" /> },
    { name: "Knowledge Base", industry: "Information Services", users: "4.8K+", icon: <BookOpen className="w-6 h-6" /> },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO at TechStart",
      company: "TechStart Solutions",
      content: "BuildMyBot transformed our customer support. Response times decreased by 80% while customer satisfaction increased by 45%.",
      avatar: "SJ",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Marketing Director",
      company: "Growth Labs",
      content: "The lead generation bot we created helped us capture 3x more qualified leads. The ROI was visible within the first month.",
      avatar: "MC",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "E-commerce Manager",
      company: "Fashion Forward",
      content: "Our AI assistant handles 70% of customer inquiries automatically, allowing our team to focus on complex issues.",
      avatar: "ER",
      rating: 5
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "$29",
      period: "month",
      description: "Perfect for small businesses and startups",
      features: [
        "Up to 3 chatbots",
        "1,000 conversations/month",
        "Basic templates",
        "Email support",
        "Standard analytics"
      ],
      cta: "Start Free Trial",
      popular: false
    },
    {
      name: "Professional",
      price: "$79",
      period: "month",
      description: "Ideal for growing businesses with high volume",
      features: [
        "Unlimited chatbots",
        "10,000 conversations/month",
        "Advanced templates",
        "Priority support",
        "Advanced analytics",
        "Custom integrations",
        "Knowledge base training"
      ],
      cta: "Most Popular",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "Tailored solutions for large organizations",
      features: [
        "Everything in Professional",
        "Unlimited conversations",
        "Dedicated account manager",
        "Custom AI training",
        "White-label options",
        "SLA guarantee",
        "On-premise deployment"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  const stats = [
    { value: "50K+", label: "Active Chatbots", description: "Built and deployed worldwide" },
    { value: "2M+", label: "Conversations Monthly", description: "Powered by our AI engine" },
    { value: "98%", label: "Customer Satisfaction", description: "Average rating across all bots" },
    { value: "24/7", label: "AI Support", description: "Always available to help your customers" }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundImage: `url(${heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl">BuildMyBot</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="#templates" className="text-gray-600 hover:text-gray-900 transition-colors">Templates</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
              <Link to="/affiliate-program" className="text-gray-600 hover:text-gray-900 transition-colors">Affiliate Program</Link>
              <Link to="/reseller" className="text-gray-600 hover:text-gray-900 transition-colors">Partners</Link>
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>{user?.name || user?.email}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/analytics')}>
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Analytics
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Link to="/auth">
                    <Button variant="ghost">Sign In</Button>
                  </Link>
                  <Link to="/auth">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      Get Started Free
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-200">
            <div className="px-4 py-4 space-y-3">
              <a href="#features" className="block text-gray-600 hover:text-gray-900">Features</a>
              <a href="#templates" className="block text-gray-600 hover:text-gray-900">Templates</a>
              <a href="#pricing" className="block text-gray-600 hover:text-gray-900">Pricing</a>
              <Link to="/affiliate-program" className="block text-gray-600 hover:text-gray-900">Affiliate Program</Link>
              <Link to="/reseller" className="block text-gray-600 hover:text-gray-900">Partners</Link>
              <div className="pt-4 space-y-2">
                {isAuthenticated ? (
                  <>
                    <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/dashboard')}>
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Dashboard
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/auth" className="block">
                      <Button variant="ghost" className="w-full justify-start">Sign In</Button>
                    </Link>
                    <Link to="/auth" className="block">
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        Get Started Free
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <Badge className="mb-6 bg-purple-100 text-purple-800 hover:bg-purple-100">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Customer Conversations
            </Badge>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
              Build Intelligent
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Chatbots in Minutes
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Transform your customer experience with AI-powered chatbots that understand, engage, and convert. 
              No coding required—just powerful results.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/auth">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-6">
                  Start Building Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>

            <p className="text-sm text-gray-500">
              ✓ No credit card required ✓ 14-day free trial ✓ Cancel anytime
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm font-medium text-gray-700 mt-1">{stat.label}</div>
                <div className="text-xs text-gray-500 mt-1">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              See It in Action
            </h2>
            <p className="text-xl text-gray-600">
              Experience the power of AI conversations firsthand
            </p>
          </div>
          <DemoBot />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundImage: `url(${featuresBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful features designed to help you create exceptional customer experiences
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-8 hover:shadow-lg transition-shadow border-0 shadow-sm">
                <div className={`w-16 h-16 rounded-lg ${feature.bgColor} flex items-center justify-center mb-6`}>
                  <div className={feature.color}>{feature.icon}</div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Start with Proven Templates
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from industry-specific templates designed by experts
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {templates.map((template, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white">
                    {template.icon}
                  </div>
                  <Badge variant="secondary">{template.users} users</Badge>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{template.name}</h3>
                <p className="text-sm text-gray-600">{template.industry}</p>
                <div className="mt-4 text-blue-600 font-medium text-sm group-hover:text-blue-700">
                  Use Template <ChevronRight className="w-4 h-4 inline ml-1" />
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/templates">
              <Button variant="outline" size="lg">
                View All Templates
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Loved by Businesses Worldwide
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See what our customers have to say about their experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                    <div className="text-xs text-gray-500">{testimonial.company}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the perfect plan for your business needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`p-8 ${plan.popular ? 'ring-2 ring-blue-600 shadow-xl' : 'shadow-sm'}`}>
                {plan.popular && (
                  <div className="text-center mb-4">
                    <Badge className="bg-blue-600 text-white">Most Popular</Badge>
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-gray-900 mb-1">
                    {plan.price}
                    {plan.period && <span className="text-lg text-gray-600">/{plan.period}</span>}
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/auth">
                  <Button className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-900 hover:bg-gray-800'}`}>
                    {plan.cta}
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Customer Conversations?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of businesses using AI to delight their customers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6">
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-6">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl text-white">BuildMyBot</span>
              </div>
              <p className="text-sm">
                Building intelligent conversational experiences for businesses worldwide.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><Link to="/templates" className="hover:text-white transition-colors">Templates</Link></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><Link to="/analytics" className="hover:text-white transition-colors">Analytics</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/affiliate-program" className="hover:text-white transition-colors">Affiliate Program</Link></li>
                <li><Link to="/reseller" className="hover:text-white transition-colors">Partners</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link to="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link to="/api" className="hover:text-white transition-colors">API</Link></li>
                <li><Link to="/status" className="hover:text-white transition-colors">Status</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2024 BuildMyBot. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default IndexEnhanced;