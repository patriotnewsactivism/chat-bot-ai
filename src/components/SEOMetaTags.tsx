import React from 'react';
import { Helmet } from 'react-helmet';

interface SEOMetaTagsProps {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  ogImage?: string;
  ogType?: string;
  twitterImage?: string;
  noIndex?: boolean;
}

export const SEOMetaTags: React.FC<SEOMetaTagsProps> = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage = "/og-image.png",
  ogType = "website",
  twitterImage = "/twitter-image.png",
  noIndex = false
}) => {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow"} />
      <meta name="language" content="English" />
      <meta name="author" content="BuildMyBot" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="BuildMyBot" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={twitterImage} />
      <meta name="twitter:site" content="@buildmybotai" />
      <meta name="twitter:creator" content="@buildmybotai" />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#3498db" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="BuildMyBot" />
      
      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "BuildMyBot",
          "alternateName": "BuildMyBot.app",
          "url": "https://buildmybot.app",
          "logo": "https://buildmybot.app/logo.png",
          "description": "AI-powered chatbot builder for businesses. Create intelligent chatbots for customer service, lead generation, and support without coding.",
          "foundingDate": "2024",
          "contactPoint": {
            "@type": "ContactPoint",
            "email": "support@buildmybot.app",
            "contactType": "Customer Service",
            "areaServed": "Worldwide",
            "availableLanguage": ["English"]
          },
          "sameAs": [
            "https://twitter.com/buildmybotai",
            "https://linkedin.com/company/buildmybot",
            "https://facebook.com/buildmybot"
          ],
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "US"
          }
        })}
      </script>
      
      {/* Breadcrumb Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://buildmybot.app"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Pricing",
              "item": "https://buildmybot.app/pricing"
            }
          ]
        })}
      </script>
    </Helmet>
  );
};

// Pre-defined SEO configurations for common pages
export const homePageSEO = {
  title: "BuildMyBot - AI Chatbot Builder for Business | No Code Required",
  description: "Create intelligent AI chatbots for your business in minutes. No coding required. Free plan available. Automate customer service, generate leads, and boost engagement with BuildMyBot.",
  keywords: ["AI chatbot", "chatbot builder", "customer service chatbot", "AI chat", "chatbot software", "no code chatbot", "business chatbot", "website chatbot", "AI customer service"],
  canonicalUrl: "https://buildmybot.app",
  ogImage: "/og-image.png",
  twitterImage: "/twitter-image.png"
};

export const pricingPageSEO = {
  title: "Pricing - BuildMyBot | Free AI Chatbot Plans Starting at $0",
  description: "BuildMyBot pricing plans start free with 100 conversations/month. Upgrade to Starter ($29), Professional ($79), Business ($149), or Enterprise ($299). 30% off annual plans.",
  keywords: ["chatbot pricing", "AI chatbot cost", "free chatbot", "chatbot plans", "affordable chatbot", "chatbot subscription", "AI chatbot pricing", "business chatbot cost"],
  canonicalUrl: "https://buildmybot.app/pricing",
  ogImage: "/og-pricing.png",
  twitterImage: "/twitter-pricing.png"
};

export const legalChatbotPageSEO = {
  title: "Legal AI Chatbot | Compliant Chatbot for Law Firms - BuildMyBot",
  description: "AI chatbot for law firms and legal professionals. ABA compliant, GDPR ready, with verified legal content. Automate client intake, provide legal information, and streamline operations.",
  keywords: ["legal chatbot", "AI for lawyers", "law firm chatbot", "legal AI", "attorney chatbot", "legal tech", "client intake automation", "ABA compliant chatbot"],
  canonicalUrl: "https://buildmybot.app/legal-chatbot",
  ogImage: "/og-legal-chatbot.png",
  twitterImage: "/twitter-legal-chatbot.png"
};

export const featuresPageSEO = {
  title: "Features - BuildMyBot | AI Chatbot Features & Capabilities",
  description: "Explore BuildMyBot's powerful features: AI-powered responses, no-code builder, multi-channel support, custom training, analytics, integrations, and 24/7 support.",
  keywords: ["chatbot features", "AI chatbot capabilities", "chatbot integrations", "chatbot analytics", "custom chatbot", "no-code chatbot", "AI chatbot features", "business chatbot features"],
  canonicalUrl: "https://buildmybot.app/features",
  ogImage: "/og-features.png",
  twitterImage: "/twitter-features.png"
};

// FAQ Schema Generator
export const generateFAQSchema = (faqs: { question: string; answer: string }[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq, index) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

// Pricing Schema Generator
export const generatePricingSchema = (plans: any[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "BuildMyBot Pricing Plans",
    "description": "AI chatbot pricing plans with free and paid options",
    "offers": {
      "@type": "AggregateOffer",
      "lowPrice": "0",
      "highPrice": "299",
      "priceCurrency": "USD",
      "offers": plans.map(plan => ({
        "@type": "Offer",
        "name": plan.name,
        "price": plan.isAnnual ? plan.annualPrice : plan.monthlyPrice,
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "description": `${plan.conversations} conversations per month, ${plan.chatbots} chatbots`
      }))
    }
  };
};

export default SEOMetaTags;