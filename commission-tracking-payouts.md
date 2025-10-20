# Commission Tracking and Payout Mechanisms for BuildMyBot Reseller Program

## Overview
This document details how commissions will be tracked and paid out in our reseller program through Rewardful, implementing our 50% vested residual income model.

## Commission Tracking

### Direct Referrals
- When a customer signs up through a reseller's referral link or coupon code, the relationship is recorded in Rewardful
- 50% of the customer's subscription payment is allocated as commission
- Commissions are tracked in real-time as payments are processed through Stripe
- Each billing cycle, commissions are recalculated and added to the reseller's balance

### Two-Tier Referrals
- When a reseller recruits another reseller, that relationship is recorded
- When the recruited reseller makes a sale, 50% of their commission (25% of the subscription payment) is allocated to the recruiting reseller
- These commissions are also tracked in real-time

### Vesting Schedule
- Commissions vest immediately upon payment processing
- Resellers earn commissions for as long as the referred customer maintains an active subscription
- If a customer cancels their subscription, commission tracking stops
- If a customer downgrades their plan, future commissions are calculated based on the new plan
- If a customer upgrades their plan, future commissions are calculated based on the new plan

### Refund Handling
- If a customer receives a refund, the associated commission is reversed
- This ensures we only pay commissions on actual revenue received
- Both direct and two-tier commissions are subject to reversal on refunds

## Payout Mechanisms

### Payout Threshold
- Minimum payout threshold: $25 (resellers must earn at least $25 before being eligible for payout)
- Threshold ensures cost-effective processing of payments
- Balance accumulates until threshold is met

### Payout Schedule
- Monthly payouts on the 15th of each month
- Commissions earned in the previous month are paid out
- Automatic processing through Rewardful's payout system

### Payout Methods
1. PayPal:
   - Most popular method for affiliates
   - Automatic mass payout feature
   - Quick processing (1-3 business days)

2. Wise (formerly TransferWise):
   - International bank transfers
   - Lower fees for international payments
   - Support for multiple currencies

### Payout Process
1. On the 1st of each month, Rewardful calculates commissions earned in the previous month
2. Resellers who have met the payout threshold are identified
3. Payouts are automatically processed through the selected payment method
4. Resellers receive email notification of payment processing
5. Payment appears in reseller's account within 1-5 business days depending on method

## Tracking Accuracy

### Attribution Model
- Last-touch attribution: The last affiliate to refer a customer gets credit for the sale
- Cookie duration: 30 days
- Coupon code priority: If both a referral link and coupon code are used, the coupon code takes precedence

### Data Synchronization
- Real-time synchronization with Stripe
- Instant commission calculation upon payment processing
- Automatic handling of subscription changes (upgrades, downgrades, cancellations)

### Dispute Resolution
- Detailed transaction history available in dashboard
- Resellers can view all referrals and associated commissions
- Support ticket system for commission disputes

## Reporting Features

### For Resellers
- Real-time dashboard showing earnings
- Detailed transaction history
- Monthly earnings summaries
- Year-to-date earnings reports
- Performance comparisons

### For Admin
- Total commission liability tracking
- Reseller performance analytics
- Payout history and processing status
- Refund impact on commissions
- Program growth metrics

## Tax Considerations

### For Resellers
- Resellers are responsible for their own tax reporting
- Rewardful provides tax documents for larger payouts
- 1099-MISC forms issued for US resellers earning over $600/year

### For BuildMyBot
- Commissions are treated as marketing expenses
- No additional tax liabilities for us beyond the commission payments
- Rewardful handles tax documentation for larger payments

## Fraud Prevention

### Self-Referral Detection
- Automatic detection of self-referrals
- Prevention of resellers earning commissions on their own purchases

### Duplicate Account Detection
- Detection of multiple accounts attempting to game the system
- Prevention of fraudulent commission claims

### Activity Monitoring
- Unusual referral patterns are flagged
- Support for manual review of suspicious activity

## Integration with Existing Systems

### Database
- No changes required to our existing Supabase database
- Rewardful maintains its own database of affiliate relationships
- Stripe customer IDs are used to link data between systems

### Analytics
- Commission data will be available in Rewardful's analytics dashboard
- Can be exported for integration with our existing analytics systems
- Monthly reports can be automatically generated

## Cost Management

### Rewardful Pricing
- Starting at $99/month for up to 2,500 tracked events
- Events include:
  - New referrals
  - Subscription payments
  - Commission calculations
- Should be sufficient for our initial launch

### Commission Costs
- Direct cost: 50% of subscription revenue from referred customers
- Additional platform cost: Rewardful subscription
- Processing fees: Vary by payment method (PayPal/Wise)

### Revenue Projections
- Assuming 100 resellers each referring 2 customers per month:
  - 200 new subscriptions per month
  - Variable commission costs based on subscription tiers chosen
  - Rewardful platform cost: $99/month
  - Payment processing fees: Variable based on payout method

## Implementation Timeline

### Phase 1: Setup (Week 1)
- Configure commission rates in Rewardful
- Set up attribution model
- Configure cookie duration

### Phase 2: Testing (Week 2)
- Test commission tracking accuracy
- Verify two-tier commission calculations
- Confirm refund handling

### Phase 3: Payout Configuration (Week 3)
- Set up PayPal integration
- Configure Wise integration
- Test payout processing

### Phase 4: Monitoring (Ongoing)
- Monitor commission tracking accuracy
- Review and optimize attribution settings
- Handle reseller support requests