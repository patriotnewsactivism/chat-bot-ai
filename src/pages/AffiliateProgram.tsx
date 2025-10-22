import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Award, 
  Target, 
  Zap, 
  Shield, 
  Globe, 
  BarChart3,
  CheckCircle,
  Star,
  ArrowRight,
  Calculator,
  Gift,
  Crown,
  Rocket,
  Phone,
  Mail,
  MessageSquare,
  Headphones,
  HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const AffiliateProgram = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    website: '',
    audience: '',
    experience: ''
  });

  const tiers = [
    {
      name: 'Standard Affiliate',
      commission: '20%',
      description: 'Perfect for content creators and bloggers',
      features: [
        '20% recurring commission',
        '30-day cookie duration',
        'Standard affiliate support',
        'Basic marketing materials',
        'Monthly performance reports'
      ],
      popular: false
    },
    {
      name: 'Premium Partner',
      commission: '30%',
      description: 'Ideal for agencies and established affiliates',
      features: [
        '30% recurring commission',
        '60-day cookie duration',
        'Priority affiliate support',
        'Premium marketing materials',
        'Custom landing pages',
        'Quarterly strategy calls',
        'Early access to features'
      ],
      popular: true
    },
    {
      name: 'Enterprise Reseller',
      commission: '40%',
      description: 'For large organizations and resellers',
      features: [
        '40% recurring commission',
        '90-day cookie duration',
        'Dedicated account manager',
        'White-label options',
        'Custom commission structures',
        'API access for integration',
        'Co-marketing opportunities',
        'Exclusive beta access'
      ],
      popular: false
    }
  ];

  const benefits = [
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: 'Generous Commissions',
      description: 'Earn up to 40% recurring revenue from every customer you refer.'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Long-Term Revenue',
      description: 'Get paid every month for as long as your referred customers stay active.'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Reliable Tracking',
      description: 'Advanced tracking system ensures you get credit for every referral.'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Quick Payouts',
      description: 'Monthly payouts via PayPal, wire transfer, or direct deposit.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Dedicated Support',
      description: 'Personal affiliate manager to help you maximize your earnings.'
    },
    {
      icon: <Gift className="w-8 h-8" />,
      title: 'Performance Bonuses',
      description: 'Earn extra rewards for hitting specific performance milestones.'
    }
  ];

  const stats = [
    { value: '$2.5M+', label: 'Paid to Affiliates' },
    { value: '10K+', label: 'Active Partners' },
    { value: '50K+', label: 'Customers Referred' },
    { value: '95%', label: 'Satisfaction Rate' }
  ];

  const testimonials = [
    {
      name: "Alex Thompson",
      role: "Tech Blogger",
      content: "The BuildMyBot affiliate program has been my highest-earning partnership. The 30% recurring commission is fantastic.",
      earnings: "$45,000+ in 12 months"
    },
    {
      name: "Sarah Chen",
      role: "Marketing Agency Owner",
      content: "As an agency partner, we love the white-label options and custom commissions. It's a perfect addition to our service offerings.",
      earnings: "$120,000+ in 18 months"
    },
    {
      name: "Michael Rodriguez",
      role: "Content Creator",
      content: "The support and marketing materials make it easy to promote. Best affiliate program I've worked with.",
      earnings: "$28,000+ in 8 months"
    }
  ];

  const marketingTools = [
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'Real-Time Analytics',
      description: 'Track clicks, conversions, and earnings in your personalized dashboard.'
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Custom Links',
      description: 'Create unique tracking links for different campaigns and platforms.'
    },
    {
      icon: <Crown className="w-6 h-6" />,
      title: 'Premium Creatives',
      description: 'Access to banners, email templates, and social media content.'
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: 'Promotional Tools',
      description: 'Special offers, discount codes, and seasonal promotions to boost conversions.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Affiliate application:', formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <Badge className="mb-4 bg-white/20 text-white hover:bg-white/20">
              <DollarSign className="w-4 h-4 mr-2" />
              Join 10,000+ Partners Worldwide
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Partner with BuildMyBot
              <span className="block text-transparent bg-clip-text bg-yellow-300">
                Earn Recurring Revenue
              </span>
            </h1>
            
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Join our affiliate program and earn up to 40% recurring commission for every customer you refer. 
              BuildMyBot is the leading AI chatbot platform trusted by thousands of businesses.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 text-lg px-8 py-6">
                Apply Now - Start Earning
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-6">
                <Calculator className="w-5 h-5 mr-2" />
                Calculate Earnings
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-yellow-300">{stat.value}</div>
                <div className="text-sm text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Why Join Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Partner with BuildMyBot?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide everything you need to succeed as our partner
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="p-8 hover:shadow-lg transition-shadow border-0 shadow-sm">
                <div className="w-16 h-16 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white mb-6">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Commission Tiers */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Partnership Level
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Select the tier that best matches your audience and business model
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {tiers.map((tier, index) => (
              <Card key={index} className={`p-8 ${tier.popular ? 'ring-2 ring-blue-600 shadow-xl' : 'shadow-sm'}`}>
                {tier.popular && (
                  <div className="text-center mb-4">
                    <Badge className="bg-blue-600 text-white">Most Popular</Badge>
                  </div>
                )}
                <div className="text-center mb-8">
                  <div className="text-4xl font-bold text-gray-900 mb-2">{tier.commission}</div>
                  <div className="text-sm text-gray-600 mb-2">Recurring Commission</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{tier.name}</h3>
                  <p className="text-gray-600">{tier.description}</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full ${tier.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-900 hover:bg-gray-800'}`}
                >
                  Apply Now
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Marketing Tools */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional marketing tools to maximize your conversion rates
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {marketingTools.map((tool, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white mb-4">
                  {tool.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{tool.title}</h3>
                <p className="text-sm text-gray-600">{tool.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Success Stories from Our Partners
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how affiliates are earning with BuildMyBot
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-green-600">{testimonial.earnings}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Ready to Start Earning?
            </h2>
            <p className="text-xl text-gray-600">
              Apply to join our affiliate program today
            </p>
          </div>

          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="company">Company Name</Label>
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Your Company LLC"
                  />
                </div>
                
                <div>
                  <Label htmlFor="website">Website/Social Media *</Label>
                  <Input
                    id="website"
                    name="website"
                    type="url"
                    required
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="https://yourwebsite.com"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="audience">Describe Your Audience *</Label>
                <textarea
                  id="audience"
                  name="audience"
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.audience}
                  onChange={handleInputChange}
                  placeholder="Who will you be promoting BuildMyBot to? (e.g., small business owners, marketers, developers)"
                />
              </div>

              <div>
                <Label htmlFor="experience">Marketing Experience</Label>
                <select
                  id="experience"
                  name="experience"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.experience}
                  onChange={handleInputChange}
                >
                  <option value="">Select your experience level</option>
                  <option value="beginner">Beginner (Just starting)</option>
                  <option value="intermediate">Intermediate (Some experience)</option>
                  <option value="advanced">Advanced (Professional marketer)</option>
                  <option value="agency">Agency/Enterprise</option>
                </select>
              </div>

              <div className="text-center">
                <Button type="submit" size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Submit Application
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <p className="text-sm text-gray-500 mt-4">
                  We'll review your application within 3-5 business days
                </p>
              </div>
            </form>
          </Card>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Have Questions About Our Program?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Our affiliate team is here to help you succeed
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8" />
                </div>
                <h3 className="font-semibold mb-2">Phone Support</h3>
                <p className="text-blue-100">1-800-BOT-PART</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8" />
                </div>
                <h3 className="font-semibold mb-2">Email Support</h3>
                <p className="text-blue-100">affiliates@buildmybot.com</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8" />
                </div>
                <h3 className="font-semibold mb-2">Live Chat</h3>
                <p className="text-blue-100">Available 24/7</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AffiliateProgram;