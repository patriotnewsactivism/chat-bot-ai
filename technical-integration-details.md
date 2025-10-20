# Technical Integration Details for BuildMyBot Reseller Program

## Overview
This document provides detailed technical information about integrating Rewardful with the existing BuildMyBot platform to implement our two-tier reseller program with 50% vested residual income.

## Existing Technical Architecture

### Frontend
- Built with React, TypeScript, and Vite
- Uses Tailwind CSS for styling
- Implements Shadcn UI components
- Hosted on Netlify (chat-bot-ai.netlify.app)
- Color theme: Dark Royal Blue (#1e3a8a)

### Backend
- Supabase for database and authentication
- OpenAI API (GPT-4o-mini) for chat functionality
- Stripe for payment processing
- Database schema with 7 tables:
  - chatbots
  - messages
  - conversations
  - subscriptions
  - usage_logs
  - payment_methods
  - users

### Widget System
- Floating chat button implementation
- Embeddable script (widget.js)
- Multiple embedding methods (Script, iFrame, React)
- Real-time chat with streaming responses

## Rewardful Integration Points

### Frontend Integration
1. **Tracking Script**:
   ```javascript
   (function(w,r){w._rwq=r;w[r]=w[r]||function(){(w[r].q=w[r].q||[]).push(arguments)}})(window,'rewardful');
   ```
   - Add to all pages of chatforge.ai
   - Place before the closing `</head>` tag
   - No modifications needed to existing widget code

2. **Referral Capture**:
   - Modify signup flow to capture `rewardful` parameter from URL
   - Store referral information in user session
   - Pass referral data to Stripe checkout session

3. **Dashboard Access**:
   - Link to Rewardful affiliate portal from our admin dashboard
   - Implement single sign-on if possible
   - Add navigation link in our dashboard sidebar

### Backend Integration
1. **Stripe Webhook Handling**:
   - Existing webhook endpoints remain unchanged
   - Rewardful creates additional webhook endpoints in Stripe
   - No conflicts expected as each webhook serves different purposes

2. **Customer Identification**:
   - Use Stripe customer ID to link users in both systems
   - No additional PII needs to be shared
   - Existing user database structure remains unchanged

3. **Subscription Management**:
   - Existing Stripe subscription management continues as normal
   - Rewardful automatically tracks subscription events through webhooks
   - Upgrade/downgrade events are handled automatically by Rewardful

### Data Flow Diagram
```
Customer → Affiliate Link/Coupon → BuildMyBot Signup → Stripe Payment → Rewardful Webhook → Commission Tracking → Dashboard → Payout Processing
```

## Implementation Steps

### Phase 1: Account Setup
1. Create Rewardful account using chatforge.ai domain
2. Connect existing Stripe account through OAuth
3. Configure two-tier affiliate program settings
4. Set commission rates to 50% for both tiers
5. Configure cookie duration to 30 days
6. Set up attribution model (last touch)

### Phase 2: Frontend Modifications
1. Add Rewardful tracking script to all pages:
   - Main website (chatforge.ai)
   - Dashboard application
   - Widget preview pages

2. Modify signup flow to capture referral data:
   - Update React components to check for referral parameters
   - Store referral information in user session
   - Pass data to Stripe checkout

3. Create "Join Reseller Program" page:
   - Link to Rewardful affiliate registration
   - Include program benefits and commission structure
   - Add success tracking

### Phase 3: Backend Configuration
1. Verify Stripe webhook setup:
   - Confirm existing webhooks continue to function
   - Allow Rewardful to create its webhook endpoints
   - Test webhook delivery

2. Configure referral data passing:
   - Update checkout session creation to include referral metadata
   - Ensure data is properly formatted for Rewardful consumption

### Phase 4: Dashboard Integration
1. Add navigation link to affiliate portal:
   - Create new menu item in dashboard sidebar
   - Link to Rewardful affiliate login page
   - Add icon consistent with our design system

2. (Optional) Implement single sign-on:
   - If technically feasible, create seamless login experience
   - Requires coordination with Rewardful support team

### Phase 5: Testing
1. Referral tracking testing:
   - Test affiliate link attribution
   - Test coupon code attribution
   - Verify two-tier relationship creation

2. Commission calculation testing:
   - Verify 50% commission on direct referrals
   - Verify 50% commission on two-tier referrals
   - Test with different subscription tiers

3. Payout testing:
   - Verify PayPal integration
   - Verify Wise integration
   - Test payout threshold implementation

## Code Modifications Required

### Frontend Changes

1. **Main App Integration** (index.html):
   ```html
   <script>
     (function(w,r){w._rwq=r;w[r]=w[r]||function(){(w[r].q=w[r].q||[]).push(arguments)}})(window,'rewardful');
   </script>
   ```

2. **Signup Flow Modification**:
   - Add referral capture to signup component
   - Pass referral data to checkout session creation
   - Example implementation:
     ```javascript
     // In signup flow
     const urlParams = new URLSearchParams(window.location.search);
     const referral = urlParams.get('via') || urlParams.get('ref');
     
     // Pass to checkout session creation
     const checkoutSession = await createCheckoutSession({
       plan: selectedPlan,
       referral: referral
     });
     ```

3. **New Reseller Page** (/reseller):
   - Create dedicated page for reseller program
   - Include benefits information
   - Link to Rewardful registration

### Backend Changes

1. **Checkout Session Creation**:
   - Modify to include referral metadata
   - Pass data to Stripe session creation
   - Example:
     ```javascript
     // When creating Stripe checkout session
     const session = await stripe.checkout.sessions.create({
       // existing parameters...
       metadata: {
         referral: referralCode || null
       }
     });
     ```

2. **Webhook Endpoint**:
   - No changes needed to existing endpoint
   - Rewardful handles its own webhook processing

## Branding Customization in Rewardful

### Color Scheme Implementation
- Primary: Dark Royal Blue (#1e3a8a)
- Secondary: Complementary blues and grays
- Accent: White and light blue for highlights

### Logo and Branding
- Upload BuildMyBot logo to Rewardful
- Customize portal messaging to match our brand voice
- Update email templates with our branding

### Portal Customization
- Modify CSS to match our design system
- Customize dashboard widgets
- Update navigation and layout

## Security Considerations

### Data Privacy
- Only Stripe customer IDs are shared between systems
- No additional PII needs to be transmitted
- Both systems are GDPR compliant

### Authentication
- Rewardful handles affiliate authentication
- Our existing auth system remains unchanged
- Dashboard link uses secure portal access

### Fraud Prevention
- Rewardful's built-in fraud detection
- Self-referral prevention
- Activity monitoring and alerts

## Testing Strategy

### Test Accounts
1. Create test affiliate accounts
2. Generate test referral links and coupon codes
3. Create test customer accounts
4. Process test subscriptions (using Stripe test mode)

### Validation Points
1. Referral attribution accuracy
2. Commission calculation correctness
3. Two-tier relationship establishment
4. Dashboard data synchronization
5. Payout processing functionality

### Monitoring
1. Set up error tracking for referral capture
2. Monitor commission discrepancies
3. Track portal access issues
4. Verify payout delivery

## Deployment Considerations

### Staging Environment
1. Test integration on staging site first
2. Validate all tracking mechanisms
3. Confirm commission calculations
4. Test dashboard integration

### Production Deployment
1. Deploy tracking script to all pages
2. Update signup flow with referral capture
3. Launch reseller program page
4. Announce program to existing user base

### Rollback Plan
1. If issues arise, disable referral capture
2. Remove Rewardful tracking script
3. Revert signup flow modifications
4. Maintain existing functionality

## Maintenance Requirements

### Ongoing Monitoring
1. Regular review of commission reports
2. Monitor for tracking discrepancies
3. Review recruited affiliate quality
4. Address support tickets related to commissions

### Updates and Changes
1. Coordinate subscription plan changes with Rewardful
2. Update commission structures as needed
3. Modify tracking parameters if required
4. Regular platform updates

## Cost Analysis

### Rewardful Pricing
- Starting at $99/month for up to 2,500 tracked events
- Events include:
  - New referrals
  - Subscription payments
  - Commission calculations
- Should be sufficient for initial launch

### Commission Costs
- Direct cost: 50% of subscription revenue from referred customers
- Two-tier cost: 25% of subscription revenue from recruited resellers' sales
- Processing fees: Vary by payment method

### ROI Projections
- Assuming 100 active resellers each referring 2 customers:
  - 200 new subscriptions per month
  - Variable revenue based on tier selection
  - Commission costs: 50% of referred subscription revenue
  - Platform cost: $99/month

## Support Integration

### Reseller Support
1. Link to existing documentation
2. Provide direct contact for technical issues
3. Create FAQ section in reseller portal
4. Implement ticketing system through Rewardful

### Customer Support
1. Maintain existing support channels
2. Coordinate with reseller support for affiliate issues
3. Update knowledge base with reseller program information

## Troubleshooting Guide

### Common Issues
1. **Referral Not Tracking**:
   - Verify affiliate link format
   - Check cookie duration settings
   - Confirm Stripe webhook delivery

2. **Commission Calculation Errors**:
   - Review subscription tier mapping
   - Verify two-tier relationships
   - Check for refund impacts

3. **Payout Processing Delays**:
   - Verify payout threshold status
   - Check payment method configuration
   - Confirm Rewardful account status

### Debugging Steps
1. Use Rewardful's debugging tools
2. Check Stripe webhook logs
3. Review customer attribution in dashboard
4. Contact Rewardful support for platform issues

## Future Enhancements

### Potential Improvements
1. Deeper dashboard integration
2. Custom analytics reporting
3. Automated performance emails
4. Enhanced recruitment tools

### Scalability Considerations
1. Rewardful pricing tiers for growth
2. Additional tracking requirements
3. Performance optimization
4. Advanced fraud detection