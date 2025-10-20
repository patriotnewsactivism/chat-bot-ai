import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Building, Users, Target, ArrowRight, Check } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface OnboardingData {
  email: string;
  password: string;
  name: string;
  businessName: string;
  industry: string;
  companySize: string;
  website: string;
  useCase: string;
  goals: string[];
  phone: string;
}

const industries = [
  "Technology/SaaS",
  "E-commerce/Retail",
  "Healthcare",
  "Real Estate",
  "Restaurant/Food Service",
  "Education",
  "Finance/Insurance",
  "Legal",
  "Manufacturing",
  "Consulting",
  "Media/Entertainment",
  "Non-Profit",
  "Other"
];

const companySizes = [
  "1-10 employees",
  "11-50 employees", 
  "51-200 employees",
  "201-500 employees",
  "500+ employees"
];

const useCases = [
  { id: "customer-support", label: "Customer Support", icon: "🎧", description: "Handle common questions and support tickets" },
  { id: "lead-generation", label: "Lead Generation", icon: "🎯", description: "Qualify leads and capture contact information" },
  { id: "knowledge-base", label: "Knowledge Base", icon: "📚", description: "Answer questions based on documentation" },
  { id: "sales-assistant", label: "Sales Assistant", icon: "💼", description: "Help with product questions and purchasing" },
  { id: "appointment-booking", label: "Appointment Booking", icon: "📅", description: "Schedule meetings and appointments" },
  { id: "general-info", label: "General Information", icon: "ℹ️", description: "Provide basic business information" }
];

const goals = [
  "Reduce customer service costs",
  "Improve response times",
  "Generate more leads",
  "Increase customer satisfaction",
  "Provide 24/7 support",
  "Scale customer operations",
  "Reduce staff workload",
  "Improve user experience"
];

const EnhancedAuth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    email: "",
    password: "",
    name: "",
    businessName: "",
    industry: "",
    companySize: "",
    website: "",
    useCase: "",
    goals: [],
    phone: ""
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/dashboard');
      }
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate('/dashboard');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleBasicAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email: onboardingData.email,
          password: onboardingData.password,
        });
        if (error) throw error;
        toast({ title: "Welcome back!" });
      } else {
        // For signup, move to next step
        setStep(2);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBusinessInfo = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const handleUseCaseSelection = (useCaseId: string) => {
    setOnboardingData(prev => ({ ...prev, useCase: useCaseId }));
    setStep(4);
  };

  const handleGoalsSelection = (goal: string) => {
    setOnboardingData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const handleCompleteSignup = async () => {
    setLoading(true);

    try {
      // 1. Create user account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: onboardingData.email,
        password: onboardingData.password,
        options: {
          data: {
            name: onboardingData.name,
            business_name: onboardingData.businessName,
            industry: onboardingData.industry,
            company_size: onboardingData.companySize,
            website: onboardingData.website,
            use_case: onboardingData.useCase,
            goals: JSON.stringify(onboardingData.goals),
            phone: onboardingData.phone
          }
        }
      });

      if (authError) throw authError;

      // 2. Track signup analytics
      await fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'signup_completed',
          properties: {
            industry: onboardingData.industry,
            companySize: onboardingData.companySize,
            useCase: onboardingData.useCase,
            goalsCount: onboardingData.goals.length
          }
        })
      });

      toast({
        title: "Account created successfully!",
        description: "Welcome to BuildMyBot. Let's create your first chatbot."
      });

      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Error creating account",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateOnboardingData = (field: keyof OnboardingData, value: any) => {
    setOnboardingData(prev => ({ ...prev, [field]: value }));
  };

  if (isLogin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <MessageSquare className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-600 mt-2">Sign in to your BuildMyBot account</p>
          </div>

          <form onSubmit={handleBasicAuth} className="space-y-6">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={onboardingData.email}
                onChange={(e) => updateOnboardingData('email', e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={onboardingData.password}
                onChange={(e) => updateOnboardingData('password', e.target.value)}
                required
                placeholder="Enter your password"
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                Don't have an account? Sign up
              </button>
            </div>
          </form>
        </Card>
      </div>
    );
  }

  // Multi-step signup flow
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8">
        <div className="text-center mb-8">
          <MessageSquare className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900">
            {step === 1 && "Create Your Account"}
            {step === 2 && "Tell Us About Your Business"}
            {step === 3 && "What's Your Primary Use Case?"}
            {step === 4 && "What Are Your Goals?"}
          </h1>
          <p className="text-gray-600 mt-2">
            {step === 1 && "Start building intelligent chatbots in minutes"}
            {step === 2 && "Help us personalize your experience"}
            {step === 3 && "Choose how you'll use your chatbot"}
            {step === 4 && "What do you want to achieve?"}
          </p>
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  s <= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                {s < step ? <Check className="w-4 h-4" /> : s}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <form onSubmit={handleBasicAuth} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={onboardingData.name}
                  onChange={(e) => updateOnboardingData('name', e.target.value)}
                  required
                  placeholder="John Doe"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={onboardingData.email}
                  onChange={(e) => updateOnboardingData('email', e.target.value)}
                  required
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={onboardingData.password}
                onChange={(e) => updateOnboardingData('password', e.target.value)}
                required
                placeholder="Create a strong password"
                minLength={8}
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number (Optional)</Label>
              <Input
                id="phone"
                type="tel"
                value={onboardingData.phone}
                onChange={(e) => updateOnboardingData('phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating Account..." : "Continue"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                Already have an account? Sign in
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Business Information */}
        {step === 2 && (
          <form onSubmit={handleBusinessInfo} className="space-y-6">
            <div>
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                value={onboardingData.businessName}
                onChange={(e) => updateOnboardingData('businessName', e.target.value)}
                required
                placeholder="Acme Corporation"
              />
            </div>

            <div>
              <Label htmlFor="website">Website (Optional)</Label>
              <Input
                id="website"
                type="url"
                value={onboardingData.website}
                onChange={(e) => updateOnboardingData('website', e.target.value)}
                placeholder="https://example.com"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="industry">Industry</Label>
                <Select value={onboardingData.industry} onValueChange={(value) => updateOnboardingData('industry', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="companySize">Company Size</Label>
                <Select value={onboardingData.companySize} onValueChange={(value) => updateOnboardingData('companySize', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select company size" />
                  </SelectTrigger>
                  <SelectContent>
                    {companySizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                Back
              </Button>
              <Button type="submit" className="flex-1">
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </form>
        )}

        {/* Step 3: Use Case Selection */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {useCases.map((useCase) => (
                <Card
                  key={useCase.id}
                  className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                    onboardingData.useCase === useCase.id
                      ? 'ring-2 ring-blue-600 bg-blue-50'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleUseCaseSelection(useCase.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">{useCase.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{useCase.label}</h3>
                      <p className="text-sm text-gray-600 mt-1">{useCase.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Button type="button" variant="outline" onClick={() => setStep(2)} className="w-full">
              Back
            </Button>
          </div>
        )}

        {/* Step 4: Goals Selection */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-medium">What are your goals? (Select all that apply)</Label>
              <p className="text-sm text-gray-600 mt-1">This helps us recommend the best features for you</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {goals.map((goal) => (
                <div
                  key={goal}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    onboardingData.goals.includes(goal)
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleGoalsSelection(goal)}
                >
                  <div className="flex items-center space-x-2">
                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                      onboardingData.goals.includes(goal)
                        ? 'border-blue-600 bg-blue-600'
                        : 'border-gray-300'
                    }`}>
                      {onboardingData.goals.includes(goal) && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span className="text-sm">{goal}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex space-x-4">
              <Button type="button" variant="outline" onClick={() => setStep(3)} className="flex-1">
                Back
              </Button>
              <Button 
                type="button" 
                onClick={handleCompleteSignup} 
                className="flex-1"
                disabled={loading || onboardingData.goals.length === 0}
              >
                {loading ? "Creating Account..." : "Complete Setup"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default EnhancedAuth;