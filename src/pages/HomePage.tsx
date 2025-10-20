import React from 'react';
import { Link } from 'react-router-dom';
import { SEOMetaTags } from '../components/SEOMetaTags';
import { PricingPage } from '../components/PricingPage';
import { homePageSEO } from '../components/SEOMetaTags';

export const HomePage: React.FC = () => {
  return (
    <>
      <SEOMetaTags {...homePageSEO} />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                AI Chatbot Builder for Business
                <span className="block text-blue-200">No Code Required</span>
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-blue-100">
                Create intelligent chatbots in minutes. Start free and scale as you grow.
                Automate customer service, generate leads, and boost engagement.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/signup"
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors flex items-center justify-center"
                >
                  Start Free
                  <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
                <Link
                  to="/demo"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors flex items-center justify-center"
                >
                  Try Demo
                  <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <img
                src="/images/ai-chatbot-builder-interface-1200x630.webp"
                alt="AI chatbot builder interface showing drag-and-drop conversation flow designer"
                title="BuildMyBot - AI Chatbot Builder Interface"
                className="w-full h-auto rounded-lg shadow-2xl"
                width={600}
                height={315}
                loading="lazy"
              />
              <div className="absolute -bottom-4 -right-4 bg-white rounded-lg p-4 shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">Live Demo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features, Simple to Use
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to create intelligent chatbots that actually work for your business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* AI-Powered Responses */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI-Powered Responses</h3>
              <p className="text-gray-600">
                Advanced AI with GPT-4 technology understands context and provides intelligent, accurate responses to customer inquiries.
              </p>
            </div>

            {/* No-Code Builder */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4V2m0 6c0 1.1.9 2 2 2h2a2 2 0 002-2V4a2 2 0 00-2-2H6a2 2 0 00-2 2v2m2 4h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2m2 4h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">No-Code Builder</h3>
              <p className="text-gray-600">
                Drag-and-drop interface lets anyone create professional chatbots in minutes. No technical skills required!
              </p>
            </div>

            {/* Multi-Channel Support */}
            <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-8">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Multi-Channel Support</h3>
              <p className="text-gray-600">
                Deploy on your website, mobile apps, social media, messaging apps, and more. Reach customers wherever they are.
              </p>
            </div>

            {/* Analytics Dashboard */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-8">
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Analytics Dashboard</h3>
              <p className="text-gray-600">
                Track conversations, user behavior, conversion rates, and more. Get insights to optimize your chatbot performance.
              </p>
            </div>

            {/* Integrations */}
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-8">
              <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">1000+ Integrations</h3>
              <p className="text-gray-600">
                Connect with Zapier, Slack, CRM systems, email marketing platforms, and 1000+ other tools you already use.
              </p>
            </div>

            {/* 24/7 Support */}
            <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-8">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">24/7 Support</h3>
              <p className="text-gray-600">
                Get help whenever you need it. Our support team is available around the clock to ensure your success.
              </p>
            </div>
          </div>
        </div>

        {/* Demo Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Try It Right Now
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Ask our demo chatbot anything about BuildMyBot. See how intelligent and helpful it is!
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <DemoBot />
            </div>

            <div className="text-center mt-8">
              <p className="text-sm text-gray-600">
                This is a demo chatbot. Create your own to customize responses and branding.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Start Free, Scale as You Grow
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Choose the plan that fits your needs. Upgrade anytime as your business grows.
              </p>
            </div>

            <PricingPage />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Transform Your Customer Experience?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands of businesses using BuildMyBot to automate customer service and grow their revenue.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors flex items-center justify-center"
              >
                Start Free
                <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors flex items-center justify-center"
              >
                Contact Sales
                <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};