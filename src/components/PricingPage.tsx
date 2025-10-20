import React, { useState } from 'react';
import { Check, X, Info, Star } from 'lucide-react';

interface PricingPlan {
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  annualSavings: number;
  conversations: number;
  chatbots: number;
  features: string[];
  limitations?: string[];
  isPopular?: boolean;
  isFree?: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    name: "Free",
    monthlyPrice: 0,
    annualPrice: 0,
    annualSavings: 0,
    conversations: 100,
    chatbots: 1,
    features: [
      "1 chatbot",
      "100 conversations per month",
      "Basic AI responses",
      "Website embed code",
      "Basic analytics",
      "Community support",
      "BuildMyBot branding"
    ],
    limitations: [
      "Only 100 conversations/month",
      "Only 1 chatbot",
      "BuildMyBot branding required",
      "No custom training",
      "No integrations",
      "7-day conversation history only"
    ],
    isFree: true
  },
  {
    name: "Starter",
    monthlyPrice: 29,
    annualPrice: 244,
    annualSavings: 104,
    conversations: 1000,
    chatbots: 3,
    features: [
      "3 chatbots",
      "1,000 conversations per month",
      "Advanced AI responses",
      "Custom training",
      "Remove branding",
      "Email support",
      "30-day conversation history",
      "Basic integrations"
    ],
    isPopular: false
  },
  {
    name: "Professional",
    monthlyPrice: 79,
    annualPrice: 663,
    annualSavings: 285,
    conversations: 5000,
    chatbots: 10,
    features: [
      "10 chatbots",
      "5,000 conversations per month",
      "Advanced AI with GPT-4",
      "Custom training & knowledge base",
      "Priority support",
      "Advanced analytics",
      "All integrations (Zapier, Slack, etc.)",
      "90-day conversation history",
      "API access"
    ],
    isPopular: true
  },
  {
    name: "Business",
    monthlyPrice: 149,
    annualPrice: 1251,
    annualSavings: 537,
    conversations: 15000,
    chatbots: 25,
    features: [
      "25 chatbots",
      "15,000 conversations per month",
      "Custom branding",
      "Dedicated support",
      "Advanced analytics & reporting",
      "Team collaboration",
      "Unlimited conversation history",
      "White-label option",
      "Priority API access"
    ]
  },
  {
    name: "Enterprise",
    monthlyPrice: 299,
    annualPrice: 2511,
    annualSavings: 1077,
    conversations: 0, // Unlimited
    chatbots: 0, // Unlimited
    features: [
      "Unlimited chatbots",
      "Unlimited conversations",
      "Full white-label",
      "SLA guarantee",
      "Custom integrations",
      "Dedicated account manager",
      "Custom AI training",
      "On-premise deployment option",
      "24/7 phone support"
    ]
  }
];

const legalPlans: PricingPlan[] = [
  {
    name: "Legal Starter",
    monthlyPrice: 99,
    annualPrice: 831,
    annualSavings: 357,
    conversations: 2000,
    chatbots: 5,
    features: [
      "Legal compliance features",
      "1 jurisdiction",
      "Verified legal content",
      "ABA compliance",
      "Email support"
    ],
    isPopular: false
  },
  {
    name: "Legal Professional",
    monthlyPrice: 199,
    annualPrice: 1671,
    annualSavings: 717,
    conversations: 5000,
    chatbots: 10,
    features: [
      "Multi-jurisdiction support",
      "Document automation",
      "Practice management integration",
      "Priority support",
      "7-year audit logging"
    ],
    isPopular: true
  },
  {
    name: "Legal Business",
    monthlyPrice: 399,
    annualPrice: 3351,
    annualSavings: 1437,
    conversations: 15000,
    chatbots: 25,
    features: [
      "Custom legal database",
      "Multi-attorney access",
      "Dedicated support",
      "Custom compliance features"
    ]
  },
  {
    name: "Legal Enterprise",
    monthlyPrice: 799,
    annualPrice: 6711,
    annualSavings: 2877,
    conversations: 0, // Unlimited
    chatbots: 0, // Unlimited
    features: [
      "White-label",
      "Custom SLA",
      "API access",
      "On-premise option"
    ]
  }
];

export const PricingPage: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'standard' | 'legal'>('standard');

  const currentPlans = selectedCategory === 'standard' ? pricingPlans : legalPlans;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start free and scale as you grow. No hidden fees. 30-day money-back guarantee.
          </p>
          
          {/* Billing Toggle */}
          <div className="mt-8 flex justify-center">
            <div className="bg-white rounded-full p-1 shadow-lg">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  !isAnnual
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  isAnnual
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Annual (30% off)
              </button>
            </div>
          </div>
        </div>

        {/* Plan Category Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-md">
            <button
              onClick={() => setSelectedCategory('standard')}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === 'standard'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Standard Chatbots
            </button>
            <button
              onClick={() => setSelectedCategory('legal')}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === 'legal'
                  ? 'bg-green-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Legal Chatbots
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {currentPlans.map((plan) => (
            <PricingCard
              key={plan.name}
              plan={plan}
              isAnnual={isAnnual}
              isLegal={selectedCategory === 'legal'}
            />
          ))}
        </div>

        {/* Conversation Definition */}
        <div className="mt-16 bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            What Counts as a Conversation?
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-4">
              A <strong>conversation</strong> is a complete interaction session between a user and your chatbot. 
              Multiple messages within the same session count as <strong>ONE conversation</strong>.
            </p>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">Example:</h3>
              <div className="text-sm">
                <p className="mb-2"><strong>User:</strong> "What are your business hours?"</p>
                <p className="mb-2"><strong>Bot:</strong> "We're open Monday-Friday, 9 AM - 6 PM EST."</p>
                <p className="mb-2"><strong>User:</strong> "Are you open on weekends?"</p>
                <p className="mb-2"><strong>Bot:</strong> "No, we're closed on weekends."</p>
                <p className="font-semibold text-blue-700">= 1 Conversation (4 messages total)</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-green-700 mb-2">✅ Counts as 1 conversation:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>Each unique user session</li>
                  <li>Multiple messages in same session</li>
                  <li>User returns after 30+ minutes</li>
                  <li>Different users</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-red-700 mb-2">❌ Doesn't count:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>Bot messages alone</li>
                  <li>System notifications</li>
                  <li>Test messages from dashboard</li>
                  <li>Admin testing</li>
                </ul>
              </div>
            </div>

            <p className="text-gray-600 mt-4 text-sm">
              <strong>Session Timeout:</strong> A new conversation starts after 30 minutes of inactivity or when the user closes the chat window.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <FAQItem
              question="What happens if I exceed my conversation limit?"
              answer="Your chatbot will pause and show an upgrade message. You can either upgrade your plan or purchase additional conversations as a one-time add-on."
            />
            <FAQItem
              question="Do I need coding skills to use BuildMyBot?"
              answer="No! BuildMyBot is a no-code platform. You can create and customize your AI chatbot using our intuitive visual builder without any programming knowledge."
            />
            <FAQItem
              question="Can I start with the free plan and upgrade later?"
              answer="Absolutely! You can start with our free plan and upgrade anytime as your needs grow. Your data and settings will be preserved when you upgrade."
            />
            <FAQItem
              question="What is the 30-day money-back guarantee?"
              answer="If you're not satisfied with BuildMyBot for any reason, request a full refund within 30 days of purchase. Annual plans also qualify for prorated refunds after 30 days."
            />
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <a
            href="/signup"
            className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Get Started Free
            <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
          <p className="mt-4 text-sm text-gray-600">
            No credit card required. 30-day money-back guarantee.
          </p>
        </div>
      </div>
    </div>
  );
};

interface PricingCardProps {
  plan: PricingPlan;
  isAnnual: boolean;
  isLegal: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan, isAnnual, isLegal }) => {
  const currentPrice = isAnnual ? plan.annualPrice : plan.monthlyPrice;
  const displayPrice = isAnnual ? Math.round(plan.annualPrice / 12) : plan.monthlyPrice;

  return (
    <div className={`relative bg-white rounded-lg shadow-lg border-2 p-6 ${
      plan.isPopular ? 'border-blue-500 shadow-xl' : 'border-gray-200'
    } ${plan.isFree ? 'border-green-500' : ''}`}>
      {plan.isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}
      
      {plan.isFree && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Free Forever
          </span>
        </div>
      )}

      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
        
        <div className="mb-6">
          {plan.isFree ? (
            <div className="text-4xl font-bold text-green-600">FREE</div>
          ) : (
            <div>
              <div className="text-4xl font-bold text-gray-900">
                ${displayPrice}
                <span className="text-lg text-gray-500">/month</span>
              </div>
              {isAnnual && (
                <div className="text-sm text-green-600 font-medium">
                  ${plan.annualPrice}/year (Save ${plan.annualSavings})
                </div>
              )}
            </div>
          )}
          
          <div className="text-sm text-gray-600 mt-2">
            {plan.conversations === 0 ? 'Unlimited' : `${plan.conversations.toLocaleString()}`} conversations
            <br />
            {plan.chatbots === 0 ? 'Unlimited' : plan.chatbots} chatbots
          </div>
        </div>

        <ul className="space-y-3 mb-8">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>

        {plan.limitations && (
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Limitations:</h4>
            <ul className="space-y-2">
              {plan.limitations.map((limitation, index) => (
                <li key={index} className="flex items-start">
                  <X className="h-4 w-4 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-500">{limitation}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          className={`w-full py-3 px-6 rounded-md font-medium transition-colors ${
            plan.isFree
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : plan.isPopular
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
          }`}
        >
          {plan.isFree ? 'Start Free' : 'Get Started'}
        </button>
      </div>
    </div>
  );
};

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  return (
    <div className="border-b border-gray-200 pb-6">
      <h3 className="text-lg font-medium text-gray-900 mb-2">{question}</h3>
      <p className="text-gray-600">{answer}</p>
    </div>
  );
};

export default PricingPage;