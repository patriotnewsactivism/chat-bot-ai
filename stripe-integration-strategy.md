# Stripe Integration Strategy for Rewardful Reseller Program

## Overview
This document outlines the integration strategy between our existing Stripe payment system and Rewardful for the BuildMyBot reseller program.

## Current Stripe Setup
- We're already using Stripe for our subscription payments
- Our pricing tiers are:
  - Free: $0/month
  - Starter: $29/month
  - Pro: $99/month
  - Business: $299/month
- We have existing Stripe webhooks for payment processing

## Rewardful Stripe Integration

### Connection Process
1. Connect our Stripe account to Rewardful through OAuth
2. Rewardful will automatically sync with our Stripe products
3. No changes needed to our existing Stripe setup

### How It Works
- When a customer signs up through a reseller's referral link or coupon code, Rewardful tracks the referral
- Stripe processes the payment as usual
- Rewardful receives webhook notifications from Stripe about the payment
- Rewardful calculates the commission based on our configured rates
- Commissions are tracked in the Rewardful dashboard
- Payouts are processed automatically based on our schedule

### Implementation Details

#### Webhook Configuration
- Rewardful will create its own webhook endpoints in our Stripe account
- Our existing webhooks will continue to function normally
- No conflicts expected between systems

#### Referral Tracking
- Referrals will be tracked through:
  1. Affiliate links (subdomain.chatforge.ai/?via=affiliatecode)
  2. Coupon codes (promo codes generated for each reseller)
- Both methods will work with our existing signup flow

#### Customer Identification
- Customers will be identified by their Stripe customer ID
- This ID will be associated with the referring affiliate in Rewardful
- No PII concerns as we're only using the Stripe customer ID

#### Commission Calculation
- 50% of the subscription amount will be calculated automatically
- For two-tier commissions, Rewardful will track the relationship automatically
- Commissions will be calculated on each billing cycle as long as the customer remains subscribed

## Technical Requirements

### Frontend Changes
- Add Rewardful's tracking script to our website:
  ```javascript
  (function(w,r){w._rwq=r;w[r]=w[r]||function(){(w[r].q=w[r].q||[]).push(arguments)}})(window,'rewardful');
  ```
- No changes needed to our existing Stripe checkout implementation

### Backend Changes
- Our existing webhook endpoints remain unchanged
- Rewardful will handle its own webhook processing
- We may need to add a referral capture mechanism to our signup process

### Data Flow
1. Customer clicks affiliate link or uses affiliate coupon code
2. Customer completes Stripe checkout
3. Stripe sends webhook to our existing endpoint (unchanged)
4. Stripe sends webhook to Rewardful endpoint (new)
5. Rewardful calculates and tracks commission
6. Commission appears in affiliate dashboard
7. Monthly payouts processed automatically

## Testing Strategy

### Phase 1: Connection Testing
- Verify Stripe account connection to Rewardful
- Confirm product sync from Stripe to Rewardful
- Test webhook delivery from Stripe to Rewardful

### Phase 2: Referral Tracking Testing
- Test affiliate link tracking
- Test coupon code tracking
- Verify customer attribution to correct affiliate

### Phase 3: Commission Calculation Testing
- Verify 50% commission calculation
- Test two-tier commission calculation
- Confirm commissions are tracked correctly

### Phase 4: Payout Testing
- Verify payout threshold implementation
- Test PayPal/Wise integration
- Confirm monthly payout schedule

## Security Considerations
- OAuth connection between Stripe and Rewardful is secure
- No sensitive data is shared between systems
- Customer privacy is maintained through ID-based tracking only
- All communications happen over HTTPS

## Maintenance Requirements
- Monitor Rewardful dashboard for any tracking issues
- Ensure Stripe account remains connected
- Review and approve payout requests monthly
- Provide support for resellers with technical issues