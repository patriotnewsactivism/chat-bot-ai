import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageSquare, Zap, Brain, BarChart3, ArrowRight, CheckCircle2, Globe, Menu, X, Sparkles, Users, DollarSign, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import DemoBot from "@/components/DemoBot";

const IndexEnhanced = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Updated Logo Path */}
            <img src="/IMG_1486.jpeg" alt="BuildMyBot Logo" className="w-10 h-10 rounded-lg object-contain" />
            <span className="font-bold text-xl">BuildMyBot</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-foreground/80 hover:text-primary transition-colors">
              Features
            </a>
            <a href="#templates" className="text-foreground/80 hover:text-primary transition-colors">
              Templates
            </a>
            <a href="#pricing" className="text-foreground/80 hover:text-primary transition-colors">
              Pricing
            </a>
            <a href="#reseller" className="text-foreground/80 hover:text-primary transition-colors">
              Reseller
            </a>
            <Link to="/auth">
              <Button className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary/90 hover:to-primary-glow/90 text-primary-foreground">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center">
            <Button variant="ghost" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-lg hover:bg-primary/10">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border/20 bg-background/95 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
              <a href="#features" className="py-2" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-base py-3">Features</Button>
              </a>
              <a href="#templates" className="py-2" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-base py-3">Templates</Button>
              </a>
              <a href="#pricing" className="py-2" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-base py-3">Pricing</Button>
              </a>
              <a href="#reseller" className="py-2" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-base py-3">Reseller</Button>
              </a>
              <Link to="/auth" className="py-2" onClick={() => setMobileMenuOpen(false)}>
                <Button className="bg-gradient-to-r from-primary to-primary-glow w-full text-base py-3">Get Started</Button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      {/* Suggestion: Add a background image or subtle pattern here */}
      <section className="container mx-auto px-4 pt-20 pb-32">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-in">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
            <Zap className="w-5 h-5 text-primary" />
            <span className="text-base font-medium">AI-Powered Customer Engagement</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Build Your Bot,
            <br />
            <span className="bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">
              Your Way
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto px-4">
            Create powerful AI chatbots without coding. Perfect for businesses, creators, and resellers.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <Link to="/auth">
              <Button size="lg" className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary/90 hover:to-primary-glow/90 text-primary-foreground text-xl h-14 px-10 w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300">
                Start Free Trial
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
            </Link>
            {/* Suggestion: Make this link to a demo video or interactive demo section */}
            <Button size="lg" variant="outline" className="text-xl h-14 px-10 w-full sm:w-auto border-2">
              View Demo
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-8 text-base text-muted-foreground">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span>Deploy anywhere</span>
            </div>
          </div>
        </div>
      </section>

      {/* Suggestion: Add a section here with a large screenshot/GIF of the product */}

      {/* Features Grid */}
      <section id="features" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features Made Simple</h2>
          <p className="text-lg md:text-xl text-muted-foreground px-4">Everything you need to engage customers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Suggestion: Replace Lucide icons with custom illustrations if desired */}
          <Card className="p-8 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 bg-gradient-to-br from-background to-primary/5 rounded-xl">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center mb-6">
              <Brain className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-3">AI-Powered Chat</h3>
            <p className="text-muted-foreground mb-4">
              Leverage cutting-edge GPT-4o-mini to create intelligent chatbots that understand and respond to customer inquiries with remarkable accuracy.
            </p>
            <a href="#" className="flex items-center text-primary font-medium hover:underline">
              <span>Learn more</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </Card>

          <Card className="p-8 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 bg-gradient-to-br from-background to-primary/5 rounded-xl">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center mb-6">
              <Globe className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-3">No-Code Builder</h3>
            <p className="text-muted-foreground mb-4">
              Create sophisticated chatbots with our intuitive drag-and-drop interface. No technical skills required - just your vision and our platform.
            </p>
            <a href="#" className="flex items-center text-primary font-medium hover:underline">
              <span>Learn more</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </Card>

          <Card className="p-8 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 bg-gradient-to-br from-background to-primary/5 rounded-xl">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center mb-6">
              <BarChart3 className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-3">Easy Embedding</h3>
            <p className="text-muted-foreground mb-4">
              Deploy your chatbot anywhere with our simple embed system. Choose from script, iframe, or React component options for seamless integration.
            </p>
            <a href="#" className="flex items-center text-primary font-medium hover:underline">
              <span>Learn more</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </Card>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="container mx-auto px-4 py-16 bg-muted/10 rounded-xl my-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready-Made Templates</h2>
          <p className="text-lg md:text-xl text-muted-foreground px-4">Start with proven solutions for your industry</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            { title: "E-commerce", icon: <DollarSign className="w-6 h-6" />, description: "Boost sales with product recommendations and order assistance" },
            { title: "Customer Support", icon: <MessageSquare className="w-6 h-6" />, description: "Reduce support tickets with automated FAQ responses" },
            { title: "Lead Generation", icon: <Users className="w-6 h-6" />, description: "Capture leads and schedule demos automatically" },
            { title: "Knowledge Base", icon: <Brain className="w-6 h-6" />, description: "Share information and answer questions intelligently" }
          ].map((template, idx) => (
            <Card key={idx} className="p-6 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg bg-gradient-to-br from-background to-primary/5 rounded-xl">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center mb-4 text-primary-foreground">
                {template.icon}
              </div>
              <h3 className="text-lg font-bold mb-2">{template.title}</h3>
              <p className="text-muted-foreground text-sm">{template.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Reseller Program */}
      <section id="reseller" className="container mx-auto px-4 py-20">
        {/* ... (Reseller section remains the same) ... */}
         <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary">Partner Program</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">50% Recurring Reseller Commissions</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
              Join our reseller program and earn vested residual income. Earn 50% on your direct sales and 20% on sales from resellers you recruit. As customers continue their subscriptions, you continue earning commissions.
            </p>
          </div>

          <Card className="p-8 bg-gradient-to-br from-background to-primary/5 border-border/50 rounded-xl">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-2/3">
                <h3 className="text-2xl font-bold mb-6">How It Works</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start">
                    <div className="bg-gradient-to-br from-primary to-primary-glow rounded-full p-2 mt-1 mr-4">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Sign Up</h4>
                      <p className="text-muted-foreground">Join our reseller program in minutes with no upfront costs</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    {/* Assuming teal color for checkmarks */}
                    <div className="bg-teal-500 rounded-full p-2 mt-1 mr-4">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Promote</h4>
                      <p className="text-muted-foreground">Share your unique referral link with your audience</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                     <div className="bg-teal-500 rounded-full p-2 mt-1 mr-4">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Earn</h4>
                      <p className="text-muted-foreground">Receive 50% commission on all referred subscriptions</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                     <div className="bg-teal-500 rounded-full p-2 mt-1 mr-4">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Scale</h4>
                      <p className="text-muted-foreground">Recruit other resellers and earn 20% on their sales</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:w-1/3 bg-gradient-to-br from-primary to-primary-glow rounded-xl p-8 text-white text-center w-full">
                <p className="text-5xl md:text-6xl font-bold mb-3">50%</p>
                <p className="text-xl mb-2">Recurring Commission</p>
                <p className="text-primary-foreground/80 mb-6">On direct sales</p>
                {/* Ensure this link points to your reseller sign-up */}
                <Button asChild className="w-full bg-white text-primary hover:bg-gray-100 py-6 text-lg font-bold">
                  <a href="https://buildmybot.app/affiliates">Join Program</a>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Use Cases */}
      <section id="use-cases" className="container mx-auto px-4 py-16">
        {/* ... (Use Cases section remains the same) ... */}
         <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Perfect for Every Business</h2>
          <p className="text-lg md:text-xl text-muted-foreground px-4">From startups to enterprises</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
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
            <Card key={idx} className="p-6 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg bg-gradient-to-br from-background to-primary/5 rounded-xl">
              <h3 className="text-lg font-bold mb-2">{useCase.title}</h3>
              <p className="text-muted-foreground">{useCase.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container mx-auto px-4 py-16">
        {/* ... (Pricing section remains the same) ... */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg md:text-xl text-muted-foreground px-4">Choose the plan that fits your needs. All plans include our core chatbot features with no hidden fees.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              name: "Starter",
              price: "$29",
              description: "Perfect for small businesses and individuals",
              features: ["1 Chatbot", "100 Conversations/month", "Basic Analytics", "Email Support"],
              popular: false
            },
            {
              name: "Professional",
              price: "$99",
              description: "Ideal for growing businesses and teams",
              features: ["5 Chatbots", "1,000 Conversations/month", "Advanced Analytics", "Priority Support", "Custom Branding"],
              popular: true
            },
            {
              name: "Business",
              price: "$299",
              description: "For large organizations with complex needs",
              features: ["Unlimited Chatbots", "10,000 Conversations/month", "Advanced Analytics & Reports", "24/7 Dedicated Support", "Team Collaboration", "API Access"],
              popular: false
            }
          ].map((plan, idx) => (
            <Card key={idx} className={`p-8 border rounded-xl relative transition-all duration-300 ${plan.popular ? "border-2 border-primary shadow-xl scale-105" : "border-border hover:border-primary/50"} bg-gradient-to-br from-background to-primary/5`}>
              {plan.popular && (
                <div className="absolute -top-3 right-4 bg-gradient-to-r from-primary to-primary-glow text-primary-foreground px-4 py-1 rounded-lg font-bold text-sm shadow-lg">
                  MOST POPULAR
                </div>
              )}
              <h3 className="text-2xl font-bold mb-3">{plan.name}</h3>
              <p className="text-5xl font-bold mb-3 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">{plan.price}<span className="text-xl font-normal text-muted-foreground">/month</span></p>
              <p className="text-muted-foreground mb-6">{plan.description}</p>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIdx) => (
                  <li key={featureIdx} className="flex items-center">
                    <CheckCircle2 className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              {/* Point Button to /auth or signup page */}
              <Button asChild className={`w-full py-6 text-lg font-bold ${plan.popular ? "bg-gradient-to-r from-primary to-primary-glow hover:from-primary/90 hover:to-primary-glow/90 shadow-lg" : "border-2 border-primary bg-background text-primary hover:bg-primary hover:text-primary-foreground"}`}>
                 <Link to="/auth">Get Started</Link>
              </Button>
            </Card>
          ))}
        </div>
      </section>

      {/* Suggestion: Add a Testimonials or Customer Logos section here */}

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-gradient-to-br from-primary to-primary-glow p-8 md:p-16 text-center text-primary-foreground rounded-2xl shadow-2xl">
          <div className="max-w-3xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-8 h-8 text-primary-foreground" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Build Your Bot?
            </h2>
            <p className="text-lg md:text-xl mb-8 px-4 max-w-2xl mx-auto">
              Join thousands of businesses and creators who are revolutionizing customer engagement with BuildMyBot.
            </p>
            <Link to="/auth">
              <Button size="lg" variant="secondary" className="text-lg md:text-xl h-14 md:h-16 px-8 md:px-12 bg-white text-primary hover:bg-gray-100 font-bold rounded-xl shadow-lg">
                Start Free Trial
                <Rocket className="w-5 h-5 md:w-6 md:h-6 ml-3" />
              </Button>
            </Link>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              {/* Updated Logo Path */}
              <img src="/IMG_1486.jpeg" alt="BuildMyBot Logo" className="w-8 h-8 rounded-lg object-contain" />
              <span className="font-bold text-xl">BuildMyBot</span>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              © 2025 BuildMyBot. All rights reserved.
            </p>
            {/* Suggestion: Add links to Privacy Policy, Terms of Service */}
          </div>
        </div>
      </footer>

      {/* Demo Bot */}
      <DemoBot />
    </div>
  );
};

export default IndexEnhanced;