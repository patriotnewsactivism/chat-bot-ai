# Rewardful Implementation Plan for BuildMyBot

## Overview
This document details the implementation plan for integrating Rewardful with BuildMyBot to create a two-tier affiliate program with the following commission structure:
- 50% recurring commission on direct sales
- 20% recurring commission on sales from recruited resellers

## Platform Selection Rationale
Rewardful was chosen for the following reasons:
- Purpose-built for Stripe-powered SaaS businesses
- Direct Stripe integration for subscription payment tracking
- Native support for recurring commissions
- Two-tier affiliate program capabilities
- API access for custom integrations
- Automated payout processing via PayPal/Wise
- Cost-effective pricing for our scale

## Implementation Steps

### 1. Account Setup
- Create Rewardful account at https://app.getrewardful.com/signup
- Complete registration and verification process
- Select appropriate pricing plan based on projected affiliate revenue

### 2. Stripe Integration
- Connect BuildMyBot's Stripe account to Rewardful
- Configure webhook endpoints in Stripe dashboard
- Verify event capture for:
  - Subscription creation
  - Subscription updates
  - Subscription cancellations
  - Payment success
  - Payment failures
  - Refunds

### 3. Commission Structure Configuration
- Set up direct referral commission rate: 50%
- Set up two-tier referral commission rate: 20%
- Configure attribution model (recommended: last-click with 30-day cookie)
- Define commission eligibility criteria
- Set up refund handling policies

### 4. Landing Page Updates
- Update the broken "Join Program" link in both versions:
  - React component: `chat-bot-ai/src/pages/IndexEnhanced.tsx`
  - HTML version: `chat-bot-ai/buildmybot-landing-page-enhanced.html`
- Add Rewardful JavaScript tracking snippet to the reseller program page
- Implement referral link generator for new resellers

### 5. Referral Tracking Implementation
- Add Rewardful script to capture referral events
- Implement conversion tracking on successful signups
- Set up tracking for subscription payments
- Configure two-tier referral identification

### 6. Dashboard Configuration
- Customize affiliate dashboard appearance
- Set up performance reporting
- Configure commission tracking display
- Enable reseller recruitment metrics

### 7. Payout Setup
- Configure PayPal and Wise as payout methods
- Set up payout schedule (monthly recommended)
- Test payout export functionality
- Verify tax compliance settings

### 8. API Integration (Optional Advanced Features)
- Integrate Rewardful REST API for:
  - Programmatic affiliate creation
  - Custom commission adjustments
  - Advanced reporting
  - Dashboard integrations

### 9. Testing
- Test direct referral commission tracking
- Test two-tier referral commission tracking
- Verify refund handling works correctly
- Test dashboard access for affiliates
- Validate payout export functionality

### 10. Launch Preparation
- Create marketing materials for the reseller program
- Prepare email announcement to existing customers
- Set up support documentation for resellers
- Configure performance monitoring

## Technical Requirements

### Frontend Modifications
- Update "Join Program" button links to point to Rewardful signup
- Add Rewardful JavaScript tracking snippet
- Implement referral conversion tracking

### Backend Considerations
- Ensure Stripe webhook events are properly configured
- Verify subscription and payment event handling
- Test integration with existing authentication system

### Dashboard Features
- Affiliate performance tracking
- Commission history display
- Referral link generator
- Recruitment metrics for two-tier program

## Timeline
1. Account Setup: 1-2 days
2. Stripe Integration: 2-3 days
3. Commission Configuration: 1 day
4. Landing Page Updates: 1 day
5. Referral Tracking Implementation: 2-3 days
6. Dashboard Configuration: 2 days
7. Payout Setup: 1-2 days
8. API Integration (if needed): 3-5 days
9. Testing: 2-3 days
10. Launch Preparation: 2-3 days

Total estimated implementation time: 12-20 days

## Cost Considerations
- Rewardful pricing starts at $49/month for up to $7,500/month affiliate revenue
- As BuildMyBot is in early stages, this pricing tier should be sufficient
- Transaction fees may apply depending on volume
- Payout processing fees from PayPal/Wise not included

## Next Steps
1. Create Rewardful account
2. Begin Stripe integration process
3. Update landing page links as outlined in this document
4. Configure commission structures
5. Test implementation with sample referrals