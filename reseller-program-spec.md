# Reseller Program Specification for BuildMyBot

## Overview
This document outlines the technical specification for implementing a reseller program for BuildMyBot with a 50% vested residual income model. This program will allow resellers to earn commissions not only on their direct sales but also on the ongoing subscription payments from customers they refer.

## Business Requirements
1. Resellers earn 50% commission on all subscription payments from customers they directly refer
2. Resellers earn 50% commission on all subscription payments from customers referred by resellers they recruited (two-tier system)
3. Commissions should be tracked and paid automatically through our existing Stripe integration
4. Resellers should have access to a dashboard showing their referrals, earnings, and vesting status
5. The program should be cost-effective to implement and maintain

## Technical Requirements
1. Integration with existing Stripe payment system
2. Referral tracking mechanism that can handle multiple levels
3. Commission calculation engine with vesting schedule
4. Reseller registration and management system
5. Dashboard for resellers to view their earnings and referrals
6. Automated payout system

## Platform Evaluation Summary

### Rewardful
- Pros:
  - Seamless Stripe integration
  - Built-in two-tier affiliate program support
  - User-friendly portal for affiliates
  - Automated PayPal/Wise mass payouts
  - Powerful API for customization
  - Easy setup (under 15 minutes)
  - No transaction fees
- Cons:
  - Monthly subscription cost
  - May require some customization for our specific vesting model

### Reditus
- Pros:
  - SaaS-focused affiliate platform
  - Zero-cost setup until affiliates generate $1,000+ MRR
  - Built-in marketplace for recruiting affiliates
  - Robust analytics and performance tracking
- Cons:
  - Less clear information about two-tier program support
  - Smaller user base than Rewardful

### Post Affiliate Pro
- Pros:
  - Comprehensive affiliate management features
  - Strong tracking capabilities
  - Flexible commission structures
- Cons:
  - More complex setup
  - Higher cost structure
  - Less modern UI/UX

## Recommendation
Based on our evaluation, Rewardful is the best platform for implementing our reseller program. Its seamless Stripe integration, built-in two-tier support, and automated payout features align perfectly with our requirements. The platform is specifically designed for SaaS businesses and offers the flexibility we need to implement our 50% vested residual income model.