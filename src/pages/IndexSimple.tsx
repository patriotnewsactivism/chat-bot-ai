import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageSquare, Zap, Brain, BarChart3, ArrowRight, CheckCircle2, Globe, Menu, X, Sparkles, Users, DollarSign, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const IndexSimple = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/IMG_1486.jpeg" alt="BuildMyBot Logo" className="w-10 h-10 rounded-lg object-contain" />
            <span className="font-bold text-xl">BuildMyBot</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/pricing" className="text-foreground/80 hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link to="/templates" className="text-foreground/80 hover:text-foreground transition-colors">
              Templates
            </Link>
            <Link to="/analytics" className="text-foreground/80 hover:text-foreground transition-colors">
              Analytics
            </Link>
            <Link to="/auth" className="text-foreground/80 hover:text-foreground transition-colors">
              Login
            </Link>
            <Link to="/dashboard">
              <Button>Get Started</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-4 space-y-4">
              <Link to="/pricing" className="block text-foreground/80 hover:text-foreground transition-colors">
                Pricing
              </Link>
              <Link to="/templates" className="block text-foreground/80 hover:text-foreground transition-colors">
                Templates
              </Link>
              <Link to="/analytics" className="block text-foreground/80 hover:text-foreground transition-colors">
                Analytics
              </Link>
              <Link to="/auth" className="block text-foreground/80 hover:text-foreground transition-colors">
                Login
              </Link>
              <Link to="/dashboard" className="block">
                <Button className="w-full">Get Started</Button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary/10 to-secondary">
        <div className="container mx-auto px-4 text-center">
          <div className="max-width-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Build Your Bot, Your Way
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-3xl mx-auto">
              Create intelligent AI chatbots without code. Empower your business with conversational AI that engages customers 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button size="lg" className="text-lg px-8 py-6">
                  Start Building Free <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/templates">
                <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                  View Templates
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Build Amazing Chatbots
            </h2>
            <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
              From simple Q&A bots to complex AI assistants, we've got you covered.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No-Code Builder</h3>
              <p className="text-foreground/80">
                Create sophisticated chatbots with our intuitive drag-and-drop interface. No programming required.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered</h3>
              <p className="text-foreground/80">
                Leverage advanced AI models to create intelligent conversations that understand context and intent.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-foreground/80">
                Deploy your chatbots instantly with our optimized infrastructure. Scale to millions of conversations.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Analytics & Insights</h3>
              <p className="text-foreground/80">
                Track performance, understand user behavior, and optimize your chatbots with detailed analytics.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Multi-Platform</h3>
              <p className="text-foreground/80">
                Deploy across websites, mobile apps, social media, and messaging platforms with one click.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Enterprise Ready</h3>
              <p className="text-foreground/80">
                Bank-grade security, compliance features, and dedicated support for enterprise customers.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Customer Experience?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of businesses already using BuildMyBot to engage customers and drive growth.
          </p>
          <Link to="/dashboard">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              Start Your Free Trial <Rocket className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-background border-t border-border/40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <img src="/IMG_1486.jpeg" alt="BuildMyBot Logo" className="w-8 h-8 rounded-lg object-contain" />
              <span className="font-bold text-lg">BuildMyBot</span>
            </div>
            <div className="flex gap-6 text-sm text-foreground/80">
              <Link to="/pricing" className="hover:text-foreground transition-colors">
                Pricing
              </Link>
              <Link to="/templates" className="hover:text-foreground transition-colors">
                Templates
              </Link>
              <a href="https://buildmybot.app/affiliates" className="hover:text-foreground transition-colors">
                Join Program
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border/40 text-center text-sm text-foreground/60">
            © 2024 BuildMyBot. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default IndexSimple;