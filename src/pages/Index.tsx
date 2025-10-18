import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageSquare, Zap, Brain, BarChart3, ArrowRight, CheckCircle2, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">ChatMaker</span>
          </div>
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

      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-32">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">AI-Powered Customer Engagement</span>
          </div>
          
          <h1 className="text-6xl font-bold leading-tight">
            Create AI Chatbots,
            <br />
            <span className="bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">
              Engage Customers
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Build intelligent chatbots that engage your customers across websites, 
            social media, and messaging platforms. No coding required.
          </p>
          
          <div className="flex items-center justify-center gap-4 pt-4">
            <Link to="/auth">
              <Button size="lg" className="gradient-primary gradient-glow text-lg h-12 px-8">
                Create Your First Bot
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg h-12 px-8">
              Watch Demo
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-6 pt-8 text-sm text-muted-foreground">
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
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Everything you need to engage customers</h2>
          <p className="text-xl text-muted-foreground">Powerful AI chatbots that work everywhere</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="p-8 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
            <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI-Powered Responses</h3>
            <p className="text-muted-foreground">
              Train your bot with your knowledge base. It learns and provides accurate answers to customer questions.
            </p>
          </Card>
          
          <Card className="p-8 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
            <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4">
              <Globe className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Deploy Anywhere</h3>
            <p className="text-muted-foreground">
              Embed on your website, integrate with social media, or connect to messaging apps instantly.
            </p>
          </Card>
          
          <Card className="p-8 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
            <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Track Performance</h3>
            <p className="text-muted-foreground">
              Monitor conversations, track engagement metrics, and improve your bot's responses over time.
            </p>
          </Card>
        </div>
      </section>

      {/* Use Cases */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Perfect for every business</h2>
          <p className="text-xl text-muted-foreground">From startups to enterprises</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
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
            <Card key={idx} className="p-6 border-border/50">
              <h3 className="text-lg font-semibold mb-2">{useCase.title}</h3>
              <p className="text-muted-foreground">{useCase.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="gradient-primary p-16 text-center">
          <h2 className="text-4xl font-bold text-primary-foreground mb-4">
            Ready to engage your customers?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Create your first AI chatbot in minutes. No coding required.
          </p>
          <Link to="/auth">
            <Button size="lg" variant="secondary" className="text-lg h-12 px-8">
              Start Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">ChatMaker</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 ChatMaker. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
