# Rewardful Implementation Plan for BuildMyBot Reseller Program

## Overview
This document outlines the implementation plan for integrating Rewardful with BuildMyBot to create our reseller program with a 50% vested residual income model.

## Integration Steps

### 1. Account Setup
- Create a Rewardful account
- Connect our existing Stripe account
- Configure the two-tier affiliate program settings

### 2. Commission Structure Configuration
- Set up 50% commission on referred subscriptions
- Configure two-tier program to pay 50% on sales from recruited affiliates
- Implement vesting schedule (ongoing commissions for as long as the customer subscribes)

### 3. Dashboard Customization
- Customize the affiliate portal to match our branding
- Configure dashboard views to show:
  - Total earnings
  - Pending commissions
  - Recruitments made
  - Performance metrics

### 4. Tracking Implementation
- Implement referral link tracking
- Set up coupon code tracking (for promotional codes)
- Configure cookie duration (recommend 30 days)
- Implement attribution model (last touch)

### 5. Payout Configuration
- Set up automated payouts through PayPal or Wise
- Configure payout thresholds (recommended $25-50 minimum)
- Set payout schedule (monthly)

## Technical Integration

### Frontend Integration
- Add Rewardful tracking script to our website
- Implement referral capture in our signup flow
- Create "Join our Reseller Program" page

### Backend Integration
- Configure Stripe webhooks to communicate with Rewardful
- Set up API connections for commission tracking
- Implement referral validation mechanisms

## Customization for BuildMyBot

### Branding
- Customize the affiliate portal with our dark royal blue color scheme
- Add BuildMyBot logo and branding elements
- Create custom messaging for our resellers

### Special Considerations
- Ensure tracking works with our widget embed system
- Configure commissions to work with our tiered subscription model
- Implement tracking for free trial conversions

## Implementation Timeline
1. Week 1: Account setup and basic configuration
2. Week 2: Commission structure implementation and testing
3. Week 3: Dashboard customization and branding
4. Week 4: Full integration testing and launch preparation

## Cost Considerations
- Rewardful pricing starts at $99/month for up to 2,500 tracked events
- We should start with the basic plan and upgrade as needed
- No transaction fees (0% transaction fee model)

## Next Steps
1. Create Rewardful account
2. Begin integration process
3. Test with a small group of resellers
4. Launch publicly