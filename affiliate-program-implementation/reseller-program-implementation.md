# BuildMyBot Reseller Program Implementation Plan

## Overview
This document outlines the implementation plan for BuildMyBot's two-tier affiliate/reseller program. The program will offer:
- 50% recurring commission on direct sales
- 20% recurring commission on sales from recruited resellers
- Integration with Stripe for subscription tracking
- Automated commission calculation and payout processing

## Platform Selection
Based on research, we recommend **Rewardful** as the implementation platform for the following reasons:
- Built specifically for Stripe-powered SaaS businesses
- Direct Stripe integration handling subscription payments, refunds, and downgrades
- Supports recurring commissions and configurable attribution models
- API available for custom integrations
- Handles automated payouts through PayPal/Wise exports
- More cost-effective for our current scale compared to Cello

## Implementation Steps

### 1. Account Setup
- Create Rewardful account
- Connect Stripe account to Rewardful
- Configure currency settings (USD)
- Set up payout methods (PayPal and Wise)

### 2. Commission Structure Configuration
- Configure 50% recurring commission for direct referrals
- Configure 20% recurring commission for indirect referrals (two-tier)
- Set up attribution model (likely last-click attribution with 30-day cookie window)
- Configure refund handling (commissions reversed on refunds)

### 3. Landing Page Integration
- Fix the broken "Join Program" link on the homepage
- Add Rewardful JavaScript snippet to the reseller program page
- Create unique referral links for each reseller
- Implement referral tracking for the two-tier system

### 4. API Integration (Optional Advanced Features)
- Use Rewardful REST API for:
  - Creating resellers programmatically
  - Retrieving referral data
  - Managing commission adjustments
  - Processing payouts

### 5. Testing
- Test direct referral commission tracking
- Test two-tier referral commission tracking
- Verify refund handling works correctly
- Test payout export functionality

### 6. Launch
- Announce program to existing customer base
- Update marketing materials with referral program information
- Create reseller dashboard access
- Implement performance tracking and reporting

## Technical Requirements

### Stripe Integration
- Ensure Stripe webhook events are properly configured
- Verify subscription, payment, and refund events are tracked
- Test with various subscription tiers and billing periods

### Website Modifications
- Update the "Join Program" link in both the React component (`IndexEnhanced.tsx`) and HTML version (`buildmybot-landing-page-enhanced.html`)
- Add proper tracking scripts to the reseller program page
- Implement referral link generator for new resellers

### Dashboard Access
- Create reseller dashboard login system
- Provide performance and commission tracking for resellers
- Enable reseller recruitment tracking

## Timeline
1. Account Setup and Configuration: 2-3 days
2. Landing Page Integration: 1-2 days
3. API Integration (if needed): 3-5 days
4. Testing: 2-3 days
5. Launch Preparation: 2-3 days
6. Program Launch: 1 day

Total estimated implementation time: 10-16 days

## Cost Considerations
- Rewardful pricing starts at $49/month for up to $7,500/month affiliate revenue
- As BuildMyBot is in early stages, this pricing tier should be sufficient
- Transaction fees may apply depending on volume
- Payout processing fees from PayPal/Wise not included

## Next Steps
1. Create Rewardful account
2. Begin Stripe integration
3. Update landing page with proper reseller program links
4. Configure commission structures
5. Test implementation with sample referrals