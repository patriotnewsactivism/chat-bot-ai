import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageSquare, Zap, Brain, BarChart3, ArrowRight, CheckCircle2, Globe, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import DemoBot from "@/components/DemoBot";

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">BuildMyBot</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
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
          
          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center">
            <Button variant="ghost" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border/20 bg-background/95 backdrop-blur">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
              <Link to="/dashboard" className="py-2" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">Dashboard</Button>
              </Link>
              <Link to="/templates" className="py-2" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">Templates</Button>
              </Link>
              <Link to="/pricing" className="py-2" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">Pricing</Button>
              </Link>
              <Link to="/auth" className="py-2" onClick={() => setMobileMenuOpen(false)}>
                <Button className="gradient-primary w-full">Get Started</Button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-16 pb-24">
        <div className="max-w-4xl mx-auto text-center space-y-6 animate-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">AI-Powered Customer Engagement</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Build Your Bot,
            <br />
            <span className="bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">
              Your Way
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Create powerful AI chatbots without coding. Perfect for businesses, creators, and resellers.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to="/auth">
              <Button size="lg" className="gradient-primary gradient-glow text-lg h-12 px-8 w-full sm:w-auto">
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg h-12 px-8 w-full sm:w-auto">
              View Demo
            </Button>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-4 pt-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>No credit card</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>Free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>Deploy anywhere</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features Made Simple</h2>
          <p className="text-lg md:text-xl text-muted-foreground px-4">Everything you need to engage customers</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="p-6 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center mb-4">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold mb-2">AI-Powered Chat</h3>
            <p className="text-muted-foreground text-sm md:text-base">
              Leverage cutting-edge GPT-4o-mini to create intelligent chatbots that understand and respond to customer inquiries with remarkable accuracy.
            </p>
          </Card>
          
          <Card className="p-6 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center mb-4">
              <Globe className="w-5 h-5 text-primary-foreground" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold mb-2">No-Code Builder</h3>
            <p className="text-muted-foreground text-sm md:text-base">
              Create sophisticated chatbots with our intuitive drag-and-drop interface. No technical skills required - just your vision and our platform.
            </p>
          </Card>
          
          <Card className="p-6 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center mb-4">
              <BarChart3 className="w-5 h-5 text-primary-foreground" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold mb-2">Easy Embedding</h3>
            <p className="text-muted-foreground text-sm md:text-base">
              Deploy your chatbot anywhere with our simple embed system. Choose from script, iframe, or React component options for seamless integration.
            </p>
          </Card>
        </div>
      </section>

      {/* Reseller Program */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">50% Recurring Reseller Commissions</h2>
          <p className="text-lg md:text-xl text-muted-foreground text-center mb-8 px-4">
            Join our reseller program and earn vested residual income. Earn 50% on your direct sales and 20% on sales from resellers you recruit. As customers continue their subscriptions, you continue earning commissions.
          </p>
          
          <Card className="p-6">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-6 md:mb-0 md:pr-6">
                <h3 className="text-xl md:text-2xl font-bold mb-4">How It Works</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="bg-teal-500 rounded-full p-1 mt-1 mr-3">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-muted-foreground text-sm md:text-base">Sign up for our reseller program</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-teal-500 rounded-full p-1 mt-1 mr-3">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-muted-foreground text-sm md:text-base">Promote BuildMyBot with your unique referral link</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-teal-500 rounded-full p-1 mt-1 mr-3">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-muted-foreground text-sm md:text-base">Earn 50% commission on all referred subscriptions</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-teal-500 rounded-full p-1 mt-1 mr-3">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-muted-foreground text-sm md:text-base">Recruit other resellers and earn 20% on their sales</span>
                  </li>
                </ul>
              </div>
              <div className="md:w-1/3 bg-gradient-to-br from-primary to-secondary rounded-lg p-6 text-white text-center w-full">
                <p className="text-4xl md:text-5xl font-bold mb-2">50%</p>
                <p className="text-lg md:text-xl mb-4">Recurring Commission</p>
                <Button className="w-full bg-white text-primary hover:bg-gray-100 text-sm md:text-base">Join Program</Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Use Cases */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Perfect for every business</h2>
          <p className="text-lg md:text-xl text-muted-foreground px-4">From startups to enterprises</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {[
            {
              title: "E-commerce Support",
              description: "Answer product questions, help with orders, and boost sales 24/7"
            },
            {
              title: "Lead Generation",
              description: "Qualify leads, schedule demos, and capture customer information"
            },
            {
              title: "Customer Service",
              description: "Reduce support tickets by answering common questions automatically"
            },
            {
              title: "Content Engagement",
              description: "Keep visitors engaged on your blog or social media channels"
            }
          ].map((useCase, idx) => (
            <Card key={idx} className="p-5 border-border/50">
              <h3 className="text-base md:text-lg font-semibold mb-2">{useCase.title}</h3>
              <p className="text-muted-foreground text-sm md:text-base">{useCase.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="gradient-primary p-8 md:p-16 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Build Your Bot?
          </h2>
          <p className="text-base md:text-xl text-primary-foreground/90 mb-6 md:mb-8 px-4">
            Join thousands of businesses and creators who are revolutionizing customer engagement with BuildMyBot.
          </p>
          <Link to="/auth">
            <Button size="lg" variant="secondary" className="text-base md:text-lg h-10 md:h-12 px-6 md:px-8">
              Start Free Trial
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
            </Button>
          </Link>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">BuildMyBot</span>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              © 2025 BuildMyBot. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      
      {/* Demo Bot */}
      <DemoBot />
    </div>
  );
};

export default Index;