---
title: "Automated Affiliate Tracking System"
version: "1.0"
purpose: "Complete automation for affiliate tracking, commissions, and reporting"
---

# Automated Affiliate Tracking System

## Overview

This document outlines the comprehensive automated affiliate tracking system for BuildMyBot, designed to handle all aspects of affiliate management, commission tracking, and reporting for both you (the business owner) and your resellers/affiliates.

---

## 1. System Architecture

### 1.1 Components

```
┌─────────────────────────────────────────────────────────────┐
│                    Affiliate Dashboard                       │
│  (Reseller View - Real-time Stats & Earnings)               │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                  Admin Dashboard                             │
│  (Owner View - All Affiliates, Payouts, Analytics)          │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────┐
│              Tracking & Attribution Engine                   │
│  - Cookie tracking (90-day)                                  │
│  - First-click attribution                                   │
│  - Cross-device tracking                                     │
│  - Fraud detection                                           │
└─────────────────────┬───────────────────────────────────────┘
                      │
        ┌─────────────┼─────────────┐
        │             │             │
┌───────▼──────┐ ┌───▼────────┐ ┌─▼──────────────┐
│  Commission  │ │  Payment   │ │   Reporting    │
│  Calculator  │ │  Processor │ │    Engine      │
│              │ │            │ │                │
│ - Tier 1     │ │ - Stripe   │ │ - Real-time    │
│ - Tier 2     │ │ - PayPal   │ │ - Analytics    │
│ - Bonuses    │ │ - ACH      │ │ - Exports      │
└──────────────┘ └────────────┘ └────────────────┘
        │             │             │
        └─────────────┼─────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                    Database Layer                            │
│  - Affiliates                                                │
│  - Referrals                                                 │
│  - Commissions                                               │
│  - Payouts                                                   │
│  - Analytics                                                 │
└──────────────────────────────────────────────────────────────┘
```

### 1.2 Technology Stack

**Recommended Platform: Rewardful**
- Integrated with Stripe for automatic commission tracking
- Built-in affiliate dashboard
- Automated payouts
- Two-tier commission support
- Real-time analytics
- API for custom integrations

**Alternative: Custom Solution**
- Backend: Python/Node.js
- Database: PostgreSQL
- Payment: Stripe Connect
- Analytics: Mixpanel or Amplitude
- Hosting: AWS or Google Cloud

---

## 2. Affiliate Tracking Features

### 2.1 Automatic Tracking

**What Gets Tracked Automatically:**

1. **Click Tracking:**
   - Every click on affiliate link
   - Source (email, social, website, etc.)
   - Device type and browser
   - Geographic location
   - Timestamp

2. **Conversion Tracking:**
   - Signup conversions
   - Trial-to-paid conversions
   - Upgrade conversions
   - Renewal tracking
   - Churn tracking

3. **Revenue Tracking:**
   - Initial payment amount
   - Recurring payment amounts
   - Upgrades and downgrades
   - Refunds and chargebacks
   - Lifetime value per customer

4. **Commission Tracking:**
   - Tier 1 commissions (50% of first month)
   - Tier 2 commissions (20% of sub-affiliate earnings)
   - Bonus commissions
   - Pending commissions
   - Paid commissions

### 2.2 Attribution System

**Cookie-Based Tracking:**
```javascript
// Automatic cookie placement on affiliate link click
function trackAffiliateClick(affiliateId, campaignId) {
  // Set cookie with 90-day expiration
  document.cookie = `affiliate_id=${affiliateId}; max-age=7776000; path=/; secure; samesite=strict`;
  document.cookie = `campaign_id=${campaignId}; max-age=7776000; path=/; secure; samesite=strict`;
  document.cookie = `click_timestamp=${Date.now()}; max-age=7776000; path=/; secure; samesite=strict`;
  
  // Track click event
  fetch('/api/affiliate/track-click', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      affiliate_id: affiliateId,
      campaign_id: campaignId,
      referrer: document.referrer,
      user_agent: navigator.userAgent,
      timestamp: Date.now()
    })
  });
}
```

**First-Click Attribution:**
- First affiliate to refer a customer gets credit
- Prevents commission disputes
- Fair and transparent

**Cross-Device Tracking:**
- Email-based identification
- Account linking
- Ensures proper attribution across devices

### 2.3 Fraud Prevention

**Automated Fraud Detection:**

1. **Self-Referral Detection:**
   - IP address matching
   - Email domain matching
   - Payment method matching
   - Automatic flagging and review

2. **Click Fraud Detection:**
   - Unusual click patterns
   - Bot detection
   - Geographic anomalies
   - Velocity checks

3. **Chargeback Monitoring:**
   - Automatic commission reversal
   - Affiliate account flagging
   - Pattern analysis

**Implementation:**
```python
# fraud_detection.py
class FraudDetectionService:
    async def check_referral(self, referral_data):
        """Check referral for fraud indicators"""
        fraud_score = 0
        flags = []
        
        # Check 1: Self-referral
        if await self.is_self_referral(referral_data):
            fraud_score += 50
            flags.append('self_referral')
        
        # Check 2: Suspicious IP
        if await self.is_suspicious_ip(referral_data['ip_address']):
            fraud_score += 30
            flags.append('suspicious_ip')
        
        # Check 3: Velocity check
        if await self.check_velocity(referral_data['affiliate_id']):
            fraud_score += 20
            flags.append('high_velocity')
        
        # Check 4: Payment method
        if await self.is_suspicious_payment(referral_data['payment_method']):
            fraud_score += 40
            flags.append('suspicious_payment')
        
        return {
            'fraud_score': fraud_score,
            'flags': flags,
            'action': 'block' if fraud_score >= 70 else 'review' if fraud_score >= 40 else 'approve'
        }
```

---

## 3. Commission Calculation & Automation

### 3.1 Automatic Commission Calculation

**Tier 1 Commissions (Direct Referrals):**
```python
# commission_calculator.py
class CommissionCalculator:
    def calculate_tier1_commission(self, subscription):
        """Calculate Tier 1 commission (50% of first month)"""
        base_amount = subscription.first_month_payment
        commission_rate = 0.50
        
        commission = {
            'affiliate_id': subscription.affiliate_id,
            'customer_id': subscription.customer_id,
            'subscription_id': subscription.id,
            'tier': 1,
            'base_amount': base_amount,
            'commission_rate': commission_rate,
            'commission_amount': base_amount * commission_rate,
            'status': 'pending',
            'earned_date': datetime.utcnow(),
            'payout_date': datetime.utcnow() + timedelta(days=30)  # 30-day hold
        }
        
        return commission
```

**Tier 2 Commissions (Sub-Affiliate Earnings):**
```python
def calculate_tier2_commission(self, tier1_commission):
    """Calculate Tier 2 commission (20% of sub-affiliate's commission)"""
    parent_affiliate_id = self.get_parent_affiliate(tier1_commission.affiliate_id)
    
    if not parent_affiliate_id:
        return None
    
    commission = {
        'affiliate_id': parent_affiliate_id,
        'sub_affiliate_id': tier1_commission.affiliate_id,
        'customer_id': tier1_commission.customer_id,
        'tier': 2,
        'base_amount': tier1_commission.commission_amount,
        'commission_rate': 0.20,
        'commission_amount': tier1_commission.commission_amount * 0.20,
        'status': 'pending',
        'earned_date': datetime.utcnow(),
        'payout_date': datetime.utcnow() + timedelta(days=30)
    }
    
    return commission
```

**Bonus Commissions:**
```python
def calculate_bonus_commissions(self, affiliate_id, period='month'):
    """Calculate performance bonuses"""
    bonuses = []
    
    # Volume bonus: $500 for 10+ referrals in a month
    referral_count = self.get_referral_count(affiliate_id, period)
    if referral_count >= 10:
        bonuses.append({
            'type': 'volume_bonus',
            'amount': 500,
            'description': f'{referral_count} referrals in {period}'
        })
    
    # Revenue milestone bonus
    total_revenue = self.get_total_revenue(affiliate_id, period)
    if total_revenue >= 1000:
        bonus_rate = 0.05  # 5% bonus
        bonuses.append({
            'type': 'revenue_bonus',
            'amount': total_revenue * bonus_rate,
            'description': f'${total_revenue} in revenue'
        })
    
    return bonuses
```

### 3.2 Commission Lifecycle

**States:**
1. **Pending:** Commission earned but in holding period (30 days)
2. **Approved:** Holding period complete, ready for payout
3. **Paid:** Commission paid to affiliate
4. **Reversed:** Commission reversed due to refund/chargeback
5. **Disputed:** Under review for fraud or other issues

**Automatic State Transitions:**
```python
# commission_lifecycle.py
class CommissionLifecycle:
    async def process_commissions(self):
        """Automatically process commission state transitions"""
        
        # Move pending to approved after 30 days
        pending_commissions = await self.db.commissions.find({
            'status': 'pending',
            'payout_date': {'$lte': datetime.utcnow()}
        }).to_list()
        
        for commission in pending_commissions:
            await self.approve_commission(commission)
        
        # Process approved commissions for payout
        approved_commissions = await self.db.commissions.find({
            'status': 'approved',
            'payout_scheduled': True
        }).to_list()
        
        for commission in approved_commissions:
            await self.process_payout(commission)
    
    async def handle_refund(self, subscription_id):
        """Automatically reverse commissions on refund"""
        commissions = await self.db.commissions.find({
            'subscription_id': subscription_id,
            'status': {'$in': ['pending', 'approved']}
        }).to_list()
        
        for commission in commissions:
            await self.reverse_commission(commission)
```

---

## 4. Automated Payouts

### 4.1 Payout Schedule

**Automatic Monthly Payouts:**
- **Schedule:** 15th of each month
- **Minimum:** $50 threshold
- **Methods:** PayPal, Stripe, ACH
- **Currency:** USD (with automatic conversion for international)

**Payout Process:**
```python
# payout_processor.py
class PayoutProcessor:
    async def process_monthly_payouts(self):
        """Process all approved commissions for payout"""
        
        # Get all affiliates with approved commissions >= $50
        affiliates = await self.get_affiliates_for_payout()
        
        for affiliate in affiliates:
            try:
                # Calculate total payout
                total_amount = await self.calculate_total_payout(affiliate.id)
                
                if total_amount < 50:
                    continue  # Below minimum threshold
                
                # Process payment
                payout = await self.create_payout(
                    affiliate_id=affiliate.id,
                    amount=total_amount,
                    method=affiliate.payout_method
                )
                
                # Send payment
                if affiliate.payout_method == 'paypal':
                    result = await self.send_paypal_payment(affiliate, total_amount)
                elif affiliate.payout_method == 'stripe':
                    result = await self.send_stripe_payment(affiliate, total_amount)
                elif affiliate.payout_method == 'ach':
                    result = await self.send_ach_payment(affiliate, total_amount)
                
                # Update commission status
                await self.mark_commissions_paid(affiliate.id, payout.id)
                
                # Send notification
                await self.send_payout_notification(affiliate, total_amount)
                
            except Exception as e:
                logger.error(f"Payout failed for affiliate {affiliate.id}: {e}")
                await self.handle_payout_failure(affiliate, e)
```

### 4.2 Payment Methods Integration

**PayPal Integration:**
```python
# paypal_integration.py
import paypalrestsdk

class PayPalPayoutService:
    def __init__(self, client_id, client_secret):
        paypalrestsdk.configure({
            "mode": "live",  # or "sandbox" for testing
            "client_id": client_id,
            "client_secret": client_secret
        })
    
    async def send_payout(self, affiliate, amount):
        """Send payout via PayPal"""
        payout = paypalrestsdk.Payout({
            "sender_batch_header": {
                "sender_batch_id": f"payout_{affiliate.id}_{datetime.utcnow().timestamp()}",
                "email_subject": "You have a payment from BuildMyBot"
            },
            "items": [{
                "recipient_type": "EMAIL",
                "amount": {
                    "value": str(amount),
                    "currency": "USD"
                },
                "receiver": affiliate.paypal_email,
                "note": f"BuildMyBot Affiliate Commission - {datetime.utcnow().strftime('%B %Y')}",
                "sender_item_id": f"commission_{affiliate.id}"
            }]
        })
        
        if payout.create():
            return {
                'success': True,
                'payout_id': payout.batch_header.payout_batch_id,
                'status': payout.batch_header.batch_status
            }
        else:
            return {
                'success': False,
                'error': payout.error
            }
```

**Stripe Connect Integration:**
```python
# stripe_integration.py
import stripe

class StripePayoutService:
    def __init__(self, api_key):
        stripe.api_key = api_key
    
    async def send_payout(self, affiliate, amount):
        """Send payout via Stripe Connect"""
        try:
            transfer = stripe.Transfer.create(
                amount=int(amount * 100),  # Convert to cents
                currency="usd",
                destination=affiliate.stripe_account_id,
                description=f"BuildMyBot Affiliate Commission - {datetime.utcnow().strftime('%B %Y')}"
            )
            
            return {
                'success': True,
                'transfer_id': transfer.id,
                'status': transfer.status
            }
        except stripe.error.StripeError as e:
            return {
                'success': False,
                'error': str(e)
            }
```

### 4.3 Payout Notifications

**Automatic Email Notifications:**
```python
# payout_notifications.py
class PayoutNotificationService:
    async def send_payout_notification(self, affiliate, amount, payout_id):
        """Send email notification about successful payout"""
        
        email_template = f"""
        <html>
        <body>
            <h2>Your BuildMyBot Commission Payment</h2>
            <p>Hi {affiliate.name},</p>
            <p>Great news! Your commission payment has been processed.</p>
            
            <div style="background: #f5f5f5; padding: 20px; margin: 20px 0;">
                <h3>Payment Details</h3>
                <p><strong>Amount:</strong> ${amount:.2f}</p>
                <p><strong>Payment Method:</strong> {affiliate.payout_method.upper()}</p>
                <p><strong>Payment ID:</strong> {payout_id}</p>
                <p><strong>Date:</strong> {datetime.utcnow().strftime('%B %d, %Y')}</p>
            </div>
            
            <p>This payment includes commissions from:</p>
            <ul>
                <li>Direct referrals (Tier 1)</li>
                <li>Sub-affiliate earnings (Tier 2)</li>
                <li>Performance bonuses</li>
            </ul>
            
            <p>View your detailed earnings report in your <a href="https://buildmybot.app/affiliate/dashboard">affiliate dashboard</a>.</p>
            
            <p>Keep up the great work!</p>
            
            <p>Best regards,<br>The BuildMyBot Team</p>
        </body>
        </html>
        """
        
        await self.send_email(
            to=affiliate.email,
            subject=f"Your ${amount:.2f} Commission Payment",
            html=email_template
        )
```

---

## 5. Affiliate Dashboard (Reseller View)

### 5.1 Real-Time Statistics

**Dashboard Features:**

1. **Earnings Overview:**
   - Total earnings (all-time)
   - Current month earnings
   - Pending commissions
   - Next payout amount
   - Payout history

2. **Performance Metrics:**
   - Total clicks
   - Conversion rate
   - Active referrals
   - Lifetime value per referral
   - Top performing campaigns

3. **Referral Management:**
   - List of all referrals
   - Referral status (trial, active, churned)
   - Revenue per referral
   - Referral timeline

4. **Sub-Affiliate Network:**
   - Number of sub-affiliates
   - Sub-affiliate performance
   - Tier 2 earnings
   - Recruitment links

**Dashboard Implementation:**
```typescript
// AffiliateDashboard.tsx
import React, { useState, useEffect } from 'react';
import { DollarSign, Users, TrendingUp, Link } from 'lucide-react';

export const AffiliateDashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
    // Refresh every 30 seconds
    const interval = setInterval(fetchDashboardStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardStats = async () => {
    const response = await fetch('/api/affiliate/dashboard');
    const data = await response.json();
    setStats(data);
    setLoading(false);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Affiliate Dashboard</h1>

      {/* Earnings Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<DollarSign />}
          title="Total Earnings"
          value={`$${stats.total_earnings.toFixed(2)}`}
          subtitle="All-time"
          color="green"
        />
        <StatCard
          icon={<DollarSign />}
          title="This Month"
          value={`$${stats.current_month_earnings.toFixed(2)}`}
          subtitle={`${stats.current_month_referrals} referrals`}
          color="blue"
        />
        <StatCard
          icon={<DollarSign />}
          title="Pending"
          value={`$${stats.pending_commissions.toFixed(2)}`}
          subtitle="In holding period"
          color="yellow"
        />
        <StatCard
          icon={<DollarSign />}
          title="Next Payout"
          value={`$${stats.next_payout_amount.toFixed(2)}`}
          subtitle={`On ${stats.next_payout_date}`}
          color="purple"
        />
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          icon={<Link />}
          title="Total Clicks"
          value={stats.total_clicks.toLocaleString()}
          subtitle={`${stats.conversion_rate.toFixed(2)}% conversion`}
          color="gray"
        />
        <StatCard
          icon={<Users />}
          title="Active Referrals"
          value={stats.active_referrals}
          subtitle={`${stats.total_referrals} total`}
          color="green"
        />
        <StatCard
          icon={<TrendingUp />}
          title="Avg. LTV"
          value={`$${stats.avg_ltv.toFixed(2)}`}
          subtitle="Per referral"
          color="blue"
        />
      </div>

      {/* Affiliate Links */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Your Affiliate Links</h2>
        <div className="space-y-4">
          <LinkCard
            title="Main Affiliate Link"
            url={stats.affiliate_link}
            description="Use this link to promote BuildMyBot"
          />
          <LinkCard
            title="Legal Chatbot Link"
            url={stats.legal_chatbot_link}
            description="Promote the Legal Chatbot specifically"
          />
          <LinkCard
            title="Sub-Affiliate Recruitment Link"
            url={stats.recruitment_link}
            description="Recruit sub-affiliates to earn Tier 2 commissions"
          />
        </div>
      </div>

      {/* Recent Referrals */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Recent Referrals</h2>
        <ReferralTable referrals={stats.recent_referrals} />
      </div>

      {/* Sub-Affiliate Network */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Sub-Affiliate Network</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <p className="text-gray-600">Total Sub-Affiliates</p>
            <p className="text-3xl font-bold">{stats.sub_affiliates_count}</p>
          </div>
          <div>
            <p className="text-gray-600">Their Referrals</p>
            <p className="text-3xl font-bold">{stats.sub_affiliate_referrals}</p>
          </div>
          <div>
            <p className="text-gray-600">Your Tier 2 Earnings</p>
            <p className="text-3xl font-bold text-green-600">
              ${stats.tier2_earnings.toFixed(2)}
            </p>
          </div>
        </div>
        <SubAffiliateTable subAffiliates={stats.sub_affiliates} />
      </div>
    </div>
  );
};
```

### 5.2 Marketing Tools

**Provided to Affiliates:**

1. **Tracking Links:**
   - Main affiliate link
   - Campaign-specific links
   - Product-specific links
   - Sub-affiliate recruitment link

2. **Marketing Materials:**
   - Email templates
   - Social media graphics
   - Banner ads (multiple sizes)
   - Blog post templates
   - Video scripts

3. **Analytics:**
   - Click sources
   - Conversion funnels
   - Best performing content
   - Geographic data

4. **Tools:**
   - Link shortener
   - QR code generator
   - Email signature generator
   - Social media scheduler integration

---

## 6. Admin Dashboard (Owner View)

### 6.1 Overview Analytics

**Key Metrics:**

1. **Program Performance:**
   - Total affiliates
   - Active affiliates
   - Total referrals
   - Total revenue from affiliates
   - Average commission per affiliate

2. **Financial Metrics:**
   - Total commissions paid
   - Pending commissions
   - Commission as % of revenue
   - ROI on affiliate program

3. **Growth Metrics:**
   - New affiliates (monthly)
   - Affiliate churn rate
   - Referral growth rate
   - Revenue growth from affiliates

**Admin Dashboard:**
```typescript
// AdminAffiliateDashboard.tsx
export const AdminAffiliateDashboard: React.FC = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Affiliate Program Management</h1>

      {/* Program Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Total Affiliates"
          value="1,247"
          change="+12%"
          trend="up"
        />
        <MetricCard
          title="Active Affiliates"
          value="892"
          change="+8%"
          trend="up"
        />
        <MetricCard
          title="Total Referrals"
          value="5,432"
          change="+15%"
          trend="up"
        />
        <MetricCard
          title="Affiliate Revenue"
          value="$127,450"
          change="+22%"
          trend="up"
        />
      </div>

      {/* Commission Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MetricCard
          title="Commissions Paid"
          value="$63,725"
          subtitle="This month"
        />
        <MetricCard
          title="Pending Commissions"
          value="$18,340"
          subtitle="In holding period"
        />
        <MetricCard
          title="Next Payout"
          value="$21,890"
          subtitle="Due in 5 days"
        />
      </div>

      {/* Top Performers */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Top Performing Affiliates</h2>
        <TopAffiliatesTable />
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <ActivityFeed />
      </div>

      {/* Payout Management */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Payout Management</h2>
        <PayoutQueue />
      </div>
    </div>
  );
};
```

### 6.2 Affiliate Management

**Admin Functions:**

1. **Affiliate Approval:**
   - Review new affiliate applications
   - Approve or reject
   - Set custom commission rates
   - Assign affiliate tiers

2. **Commission Management:**
   - Manual commission adjustments
   - Bonus commission awards
   - Commission reversals
   - Dispute resolution

3. **Payout Management:**
   - Review pending payouts
   - Approve/reject payouts
   - Manual payout processing
   - Payout history

4. **Reporting:**
   - Export affiliate data
   - Generate commission reports
   - Tax documentation (1099 forms)
   - Performance analytics

**Implementation:**
```python
# admin_affiliate_service.py
class AdminAffiliateService:
    async def approve_affiliate(self, affiliate_id, admin_id):
        """Approve affiliate application"""
        affiliate = await self.db.affiliates.find_one({'_id': affiliate_id})
        
        if not affiliate:
            raise ValueError("Affiliate not found")
        
        # Update status
        await self.db.affiliates.update_one(
            {'_id': affiliate_id},
            {
                '$set': {
                    'status': 'approved',
                    'approved_by': admin_id,
                    'approved_at': datetime.utcnow()
                }
            }
        )
        
        # Generate affiliate link
        affiliate_link = self.generate_affiliate_link(affiliate_id)
        
        # Send welcome email
        await self.send_welcome_email(affiliate, affiliate_link)
        
        # Log action
        await self.log_admin_action(
            admin_id=admin_id,
            action='affiliate_approved',
            affiliate_id=affiliate_id
        )
    
    async def adjust_commission(self, commission_id, new_amount, reason, admin_id):
        """Manually adjust commission amount"""
        commission = await self.db.commissions.find_one({'_id': commission_id})
        
        if not commission:
            raise ValueError("Commission not found")
        
        original_amount = commission['commission_amount']
        
        # Update commission
        await self.db.commissions.update_one(
            {'_id': commission_id},
            {
                '$set': {
                    'commission_amount': new_amount,
                    'adjusted': True,
                    'adjustment_reason': reason,
                    'adjusted_by': admin_id,
                    'adjusted_at': datetime.utcnow(),
                    'original_amount': original_amount
                }
            }
        )
        
        # Notify affiliate
        await self.notify_commission_adjustment(
            commission=commission,
            original_amount=original_amount,
            new_amount=new_amount,
            reason=reason
        )
        
        # Log action
        await self.log_admin_action(
            admin_id=admin_id,
            action='commission_adjusted',
            commission_id=commission_id,
            details={
                'original_amount': original_amount,
                'new_amount': new_amount,
                'reason': reason
            }
        )
```

---

## 7. Reporting & Analytics

### 7.1 Automated Reports

**Daily Reports:**
- New affiliates
- New referrals
- Conversions
- Revenue generated
- Commissions earned

**Weekly Reports:**
- Top performing affiliates
- Conversion rate trends
- Revenue trends
- Payout summary

**Monthly Reports:**
- Comprehensive program performance
- Financial summary
- Growth metrics
- Tax documentation preparation

**Report Generation:**
```python
# report_generator.py
class ReportGenerator:
    async def generate_monthly_report(self, month, year):
        """Generate comprehensive monthly affiliate report"""
        
        # Gather data
        data = {
            'period': f"{month}/{year}",
            'total_affiliates': await self.get_total_affiliates(),
            'active_affiliates': await self.get_active_affiliates(month, year),
            'new_affiliates': await self.get_new_affiliates(month, year),
            'total_referrals': await self.get_total_referrals(month, year),
            'total_revenue': await self.get_total_revenue(month, year),
            'total_commissions': await self.get_total_commissions(month, year),
            'top_affiliates': await self.get_top_affiliates(month, year, limit=10),
            'conversion_rate': await self.get_conversion_rate(month, year),
            'avg_commission': await self.get_avg_commission(month, year)
        }
        
        # Generate PDF report
        pdf = await self.create_pdf_report(data)
        
        # Generate CSV export
        csv = await self.create_csv_export(data)
        
        # Send to admin
        await self.send_report_email(pdf, csv)
        
        return {
            'pdf': pdf,
            'csv': csv,
            'data': data
        }
```

### 7.2 Export Capabilities

**Available Exports:**

1. **Affiliate List:**
   - All affiliates with contact info
   - Performance metrics
   - Commission totals
   - Status and tier

2. **Commission Report:**
   - All commissions by period
   - Breakdown by tier
   - Status (pending, paid, reversed)
   - Affiliate details

3. **Referral Report:**
   - All referrals by affiliate
   - Customer details
   - Subscription info
   - Revenue generated

4. **Payout Report:**
   - All payouts by period
   - Payment method
   - Status
   - Transaction IDs

**Export Formats:**
- CSV
- Excel (XLSX)
- PDF
- JSON (API)

---

## 8. Integration with Rewardful

### 8.1 Rewardful Setup

**Step 1: Create Rewardful Account**
```bash
# Visit https://www.getrewardful.com/
# Sign up for account
# Connect Stripe account
```

**Step 2: Configure Commission Structure**
```javascript
// Rewardful configuration
{
  "commission_structure": {
    "tier1": {
      "type": "percentage",
      "value": 50,
      "recurring": false,
      "duration": "first_payment"
    },
    "tier2": {
      "type": "percentage",
      "value": 20,
      "recurring": true,
      "duration": "lifetime"
    }
  },
  "cookie_duration": 90,
  "minimum_payout": 50,
  "payout_schedule": "monthly"
}
```

**Step 3: Install Tracking Code**
```html
<!-- Add to your website <head> -->
<script async src='https://r.wdfl.co/rw.js' data-rewardful='YOUR-API-KEY'></script>
```

**Step 4: API Integration**
```python
# rewardful_integration.py
import requests

class RewardfulAPI:
    def __init__(self, api_key):
        self.api_key = api_key
        self.base_url = "https://api.getrewardful.com/v1"
        self.headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
    
    async def create_affiliate(self, email, first_name, last_name):
        """Create new affiliate in Rewardful"""
        response = requests.post(
            f"{self.base_url}/affiliates",
            headers=self.headers,
            json={
                "email": email,
                "first_name": first_name,
                "last_name": last_name
            }
        )
        return response.json()
    
    async def get_affiliate_stats(self, affiliate_id):
        """Get affiliate statistics"""
        response = requests.get(
            f"{self.base_url}/affiliates/{affiliate_id}/stats",
            headers=self.headers
        )
        return response.json()
    
    async def create_referral(self, affiliate_id, customer_id, amount):
        """Create referral manually"""
        response = requests.post(
            f"{self.base_url}/referrals",
            headers=self.headers,
            json={
                "affiliate_id": affiliate_id,
                "customer_id": customer_id,
                "amount": amount
            }
        )
        return response.json()
```

### 8.2 Webhook Integration

**Rewardful Webhooks:**
```python
# rewardful_webhooks.py
from fastapi import FastAPI, Request
import hmac
import hashlib

app = FastAPI()

@app.post("/webhooks/rewardful")
async def handle_rewardful_webhook(request: Request):
    """Handle Rewardful webhook events"""
    
    # Verify webhook signature
    signature = request.headers.get("X-Rewardful-Signature")
    body = await request.body()
    
    if not verify_signature(signature, body):
        return {"error": "Invalid signature"}, 401
    
    # Parse event
    event = await request.json()
    event_type = event.get("type")
    
    # Handle different event types
    if event_type == "referral.created":
        await handle_referral_created(event["data"])
    elif event_type == "referral.converted":
        await handle_referral_converted(event["data"])
    elif event_type == "commission.created":
        await handle_commission_created(event["data"])
    elif event_type == "commission.paid":
        await handle_commission_paid(event["data"])
    
    return {"status": "success"}

def verify_signature(signature, body):
    """Verify Rewardful webhook signature"""
    secret = os.getenv("REWARDFUL_WEBHOOK_SECRET")
    expected = hmac.new(
        secret.encode(),
        body,
        hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(signature, expected)
```

---

## 9. Mobile App Integration

### 9.1 Affiliate Mobile App

**Features:**
- Real-time earnings dashboard
- Push notifications for new referrals
- Quick link sharing
- Performance analytics
- Payout tracking

**React Native Implementation:**
```typescript
// AffiliateApp.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Share } from 'react-native';
import { useAffiliateStats } from './hooks/useAffiliateStats';

export const AffiliateApp: React.FC = () => {
  const { stats, loading } = useAffiliateStats();

  const shareAffiliateLink = async () => {
    try {
      await Share.share({
        message: `Check out BuildMyBot! ${stats.affiliate_link}`,
        url: stats.affiliate_link,
        title: 'BuildMyBot - AI Chatbot Platform'
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Earnings</Text>
      <Text style={styles.earnings}>${stats.total_earnings}</Text>
      
      <TouchableOpacity onPress={shareAffiliateLink} style={styles.shareButton}>
        <Text style={styles.shareButtonText}>Share Your Link</Text>
      </TouchableOpacity>
    </View>
  );
};
```

---

## 10. Conclusion

This automated affiliate tracking system provides:

✅ **Complete Automation** - From tracking to payouts
✅ **Real-Time Visibility** - For both you and affiliates
✅ **Fraud Prevention** - Automated detection and prevention
✅ **Accurate Attribution** - 90-day cookie tracking
✅ **Automatic Payouts** - Monthly scheduled payments
✅ **Comprehensive Reporting** - All metrics tracked and reported
✅ **Two-Tier Support** - Full sub-affiliate network management
✅ **Mobile Access** - Dashboard available on all devices
✅ **API Integration** - Connect with existing systems
✅ **Scalable** - Handles unlimited affiliates and referrals

**Next Steps:**
1. Choose platform (Rewardful recommended)
2. Configure commission structure
3. Set up tracking code
4. Create affiliate dashboard
5. Launch affiliate program
6. Monitor and optimize

---

**Document Version:** 1.0  
**Last Updated:** January 1, 2025  
**Platform:** Rewardful (recommended) or Custom Solution