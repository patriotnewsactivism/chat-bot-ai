# BuildMyBot Affiliate/Reseller Program Documentation

## 📋 PROGRAM OVERVIEW

The BuildMyBot Affiliate/Reseller Program is a comprehensive two-tier revenue sharing system designed to reward partners for bringing new customers to our platform. This document outlines the technical implementation, tracking mechanisms, and commission structure.

## 🎯 TWO-TIER COMMISSION STRUCTURE

### Direct Referrals (50% Commission)
- Partners earn 50% of the subscription payment for every customer they directly refer
- Applies to all subscription tiers (Starter, Professional, Business)
- Commission is calculated on the actual subscription amount (after any discounts)

### Indirect Referrals (20% Commission)
- Partners earn 20% of the commission that their referrals earn
- This is 20% of the 50% commission, not 20% of the subscription payment
- Example: If your referral earns $50 commission, you earn $10 (20% of $50)

### Volume Bonuses (Up to 10%)
- Additional bonuses for high-volume partners
- Tier 1: 10+ active referrals - 2% bonus
- Tier 2: 25+ active referrals - 5% bonus
- Tier 3: 50+ active referrals - 10% bonus

## 🔧 TECHNICAL IMPLEMENTATION

### Rewardful Integration
BuildMyBot uses Rewardful as our affiliate tracking platform. The integration is implemented through:

1. **Tracking Script**: 
```html
<script src="https://rwdcdn.com/js/v1/rewardful.js" data-rewardful="YOUR_REWARDFUL_ID"></script>
```

2. **Conversion Tracking**:
```javascript
Rewardful('convert', { email: 'customer@example.com' });
```

3. **Referral Links**:
Partners receive unique referral links in the format:
`https://buildmybot.app/affiliates?via=PARTNER_ID`

### Stripe Integration
All subscription payments are processed through Stripe with:
- Customer portal for subscription management
- Webhook handling for payment events
- Automatic commission calculation
- Payout scheduling through Rewardful

## 📊 TRACKING AND REPORTING

### Real-Time Dashboard
Partners have access to a comprehensive dashboard showing:
- Total referrals and active customers
- Commission earnings (current and historical)
- Tier 2 referrals and indirect earnings
- Performance metrics and conversion rates
- Marketing materials and resources

### Data Points Tracked
1. Referral link clicks
2. Sign-ups through referral links
3. Subscription conversions
4. Payment processing
5. Commission calculations
6. Payout status

## 💰 COMMISSION CALCULATION EXAMPLES

### Example 1: Direct Referral
- Customer signs up for Professional plan ($99/month)
- Direct partner earns: $99 × 50% = $49.50/month

### Example 2: Indirect Referral
- Tier 1 partner refers customer to Tier 2 partner
- Customer signs up for Business plan ($299/month)
- Tier 2 partner earns: $299 × 50% = $149.50/month
- Tier 1 partner earns: $149.50 × 20% = $29.90/month

### Example 3: Volume Bonus
- Partner has 30 active referrals
- Monthly commissions total $2,000
- Volume bonus (5%): $2,000 × 5% = $100
- Total earnings: $2,000 + $100 = $2,100

## 🛠️ PARTNER ONBOARDING

### Registration Process
1. Visit buildmybot.app/affiliates
2. Click "Join Program"
3. Complete partner registration form
4. Receive unique affiliate ID
5. Access partner dashboard and marketing materials

### Dashboard Features
- Performance analytics
- Commission tracking
- Referral management
- Marketing resources
- Payout information
- Support documentation

## 📈 PERFORMANCE METRICS

### Conversion Tracking
- Referral click-through rates
- Sign-up conversion rates
- Subscription conversion rates
- Customer lifetime value
- Churn rate monitoring

### Partner Tiers
- Bronze: 0-9 active referrals
- Silver: 10-24 active referrals
- Gold: 25-49 active referrals
- Platinum: 50+ active referrals

Each tier has different benefits and support levels.

## 🎁 SPECIAL OFFERS

### Annual Subscription Discount
- All referred customers receive 30% off annual subscriptions
- This increases the value proposition for partners
- Higher conversion rates expected for annual plans

### Partner Resources
- Marketing materials library
- Email templates
- Social media content
- Presentation decks
- Technical documentation

## 🔍 IMPLEMENTATION DETAILS

### Frontend Integration
The referral program is integrated into:
- Homepage "Join Program" button
- Dedicated affiliate landing page
- Partner dashboard
- Registration flow

### Backend Integration
- Supabase database tracking
- Stripe webhook processing
- Rewardful API integration
- Commission calculation engine

### Security Measures
- GDPR compliant data handling
- Secure referral link generation
- Encrypted commission tracking
- Role-based access control

## 📞 SUPPORT

### Partner Support
- Dedicated partner success team
- Technical integration assistance
- Marketing strategy consultation
- Performance optimization guidance

### Contact Information
- Email: partners@buildmybot.app
- Partner Portal: buildmybot.app/affiliates
- Documentation: buildmybot.app/affiliate-docs

## 📊 REVENUE PROJECTIONS

### Monthly Earnings Model
- 10 Starter plan referrals: $145/month
- 5 Professional plan referrals: $247.50/month
- 2 Business plan referrals: $299/month
- **Total Monthly Revenue**: $691.50
- **Direct Commission**: $345.75
- **Indirect Commission** (20% of network): $69.15
- **Volume Bonus** (if applicable): $34.58
- **Total Monthly Earnings**: $449.48

### Annual Projections
- **Gross Revenue**: $8,300+ annually
- **Net Commission**: $4,500+ annually
- **Indirect Earnings**: $900+ annually
- **Total Annual Earnings**: $5,400+ annually

## 🚀 SCALING STRATEGIES

### Network Building
- Encourage partners to build their own referral networks
- Provide tools for partner recruitment
- Offer training on effective promotion strategies
- Create community forums for partner collaboration

### Performance Optimization
- A/B testing for marketing materials
- Conversion rate optimization
- Customer success programs
- Retention strategies

### Technology Enhancements
- Advanced tracking capabilities
- Automated commission processing
- Enhanced dashboard features
- API integrations for partners

## 📋 LEGAL AND COMPLIANCE

### Terms and Conditions
- 30-day cookie tracking
- 14-day commission reversal window
- Fraud detection and prevention
- Compliance with FTC guidelines

### Payment Terms
- Monthly payouts on the 15th
- Minimum payout threshold: $50
- Payment methods: Bank transfer, PayPal
- Tax reporting for partners

### Data Privacy
- GDPR compliance
- CCPA compliance
- Data retention policies
- Partner data access rights

## 🎯 SUCCESS METRICS

### Key Performance Indicators
- Number of active partners
- Monthly recurring revenue from referrals
- Conversion rates from referral traffic
- Average commission per partner
- Partner retention rates

### Growth Targets
- Q1: 50 active partners
- Q2: 125 active partners
- Q3: 250 active partners
- Q4: 500 active partners

## 🛠️ TECHNICAL SPECIFICATIONS

### Integration Points
1. **Homepage**: Referral link and "Join Program" button
2. **Registration**: Affiliate ID tracking
3. **Payment Processing**: Stripe webhook integration
4. **Dashboard**: Real-time commission tracking
5. **Marketing**: Resource library access

### API Endpoints
- `/api/affiliate/register` - Partner registration
- `/api/affiliate/commissions` - Commission tracking
- `/api/affiliate/referrals` - Referral management
- `/api/affiliate/payouts` - Payout processing

### Database Schema
- `affiliates` table - Partner information
- `referrals` table - Customer tracking
- `commissions` table - Earnings calculation
- `payouts` table - Payment processing

## 📦 DELIVERABLES

### For Partners
- Unique affiliate dashboard access
- Marketing materials library
- Performance analytics
- Commission tracking
- Payout management

### For Customers
- Seamless referral experience
- Automatic discount application
- Clear value proposition
- Professional platform access

## 📈 ROI CALCULATION

### Partner Investment
- Time: 2-5 hours/week for promotion
- Cost: $0 (no upfront investment required)

### Expected Returns
- Month 1: $100-500
- Month 3: $500-1,500
- Month 6: $1,000-3,000
- Year 1: $5,000-15,000

### Break-even Analysis
- Average partner breaks even in 2-4 weeks
- High-performing partners break even in 1-2 weeks

## 🏆 PARTNER BENEFITS

### Bronze Tier (0-9 referrals)
- 50% direct commission
- 20% indirect commission
- Basic marketing materials
- Email support

### Silver Tier (10-24 referrals)
- 50% direct commission
- 20% indirect commission
- Enhanced marketing materials
- Priority email support
- Monthly webinars

### Gold Tier (25-49 referrals)
- 50% direct commission
- 20% indirect commission
- Premium marketing materials
- Dedicated account manager
- Advanced training resources
- Co-branded materials

### Platinum Tier (50+ referrals)
- 50% direct commission
- 20% indirect commission
- Exclusive marketing materials
- Personal account manager
- Custom training programs
- Co-branded campaigns
- Early access to features

---
*BuildMyBot - Build Your Bot, Your Way*
*Partners@buildmybot.app | buildmybot.app/affiliates*