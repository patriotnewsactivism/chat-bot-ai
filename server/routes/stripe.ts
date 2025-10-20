import express from 'express';
import Stripe from 'stripe';
import { db } from '../db.js';
import { users, subscriptions, usage } from '../../shared/schema.js';
import { eq, and, gte, lte } from 'drizzle-orm';

const router = express.Router();
const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16',
    })
  : null;

const requireStripe = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (!stripe) {
    return res.status(503).json({ error: 'Stripe is not configured. Please add STRIPE_SECRET_KEY to enable payment functionality.' });
  }
  next();
};

// Webhook endpoint for Stripe events
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  if (!stripe) {
    return res.status(503).json({ error: 'Stripe is not configured' });
  }
  
  const sig = req.headers['stripe-signature'] as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err: any) {
    console.log(`Webhook signature verification failed.`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutSessionCompleted(session);
        break;
      }
      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoicePaymentSucceeded(invoice);
        break;
      }
      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoicePaymentFailed(invoice);
        break;
      }
      case 'customer.subscription.created': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionCreated(subscription);
        break;
      }
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdated(subscription);
        break;
      }
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(subscription);
        break;
      }
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (error) {
    console.error('Error processing webhook:', error);
    return res.status(500).send('Webhook handler failed');
  }

  res.json({ received: true });
});

// Create checkout session
router.post('/create-checkout-session', requireStripe, async (req, res) => {
  try {
    const { priceId, userId, customerEmail, successUrl, cancelUrl, metadata = {} } = req.body;

    // Get user info
    const [user] = await db.select().from(users).where(eq(users.id, userId));
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get or create Stripe customer
    let customerId = user.stripeCustomerId;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: customerEmail || user.email,
        name: user.name || user.businessName,
        metadata: {
          userId: user.id,
          businessName: user.businessName || '',
        },
      });
      customerId = customer.id;

      // Update user with Stripe customer ID
      await db.update(users).set({ stripeCustomerId: customerId }).where(eq(users.id, userId));
    }

    // Get price details
    const price = await stripe.prices.retrieve(priceId);
    const planId = metadata.planId || 'starter';

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        userId,
        planId,
        ...metadata,
      },
      subscription_data: {
        metadata: {
          userId,
          planId,
        },
      },
    });

    res.json({ id: session.id, url: session.url });
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create customer portal session
router.post('/create-portal-session', requireStripe, async (req, res) => {
  try {
    const { customerId, returnUrl } = req.body;

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    });

    res.json({ url: session.url });
  } catch (error: any) {
    console.error('Error creating portal session:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get subscription status
router.get('/subscription-status', async (req, res) => {
  try {
    const { userId } = req.query;

    const [subscription] = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, userId as string));

    if (!subscription) {
      return res.json({ status: 'free', planId: 'free' });
    }

    // Get current usage
    const currentMonth = new Date();
    const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);

    const [usageStats] = await db
      .select({
        totalConversations: db.select({ count: usage.value }).from(usage)
          .where(and(
            eq(usage.userId, userId as string),
            eq(usage.metric, 'conversations'),
            gte(usage.periodStart, startOfMonth),
            lte(usage.periodEnd, endOfMonth)
          ))
      });

    res.json({
      status: subscription.status,
      planId: subscription.planId,
      currentPeriodEnd: subscription.currentPeriodEnd,
      usage: usageStats || { totalConversations: 0 },
    });
  } catch (error: any) {
    console.error('Error getting subscription status:', error);
    res.status(500).json({ error: error.message });
  }
});

// Cancel subscription
router.post('/cancel-subscription', requireStripe, async (req, res) => {
  try {
    const { subscriptionId } = req.body;

    const subscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    });

    // Update database
    await db
      .update(subscriptions)
      .set({ 
        status: 'canceled',
        canceledAt: new Date(),
      })
      .where(eq(subscriptions.stripeSubscriptionId, subscriptionId));

    res.json({ subscription });
  } catch (error: any) {
    console.error('Error canceling subscription:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update subscription
router.post('/update-subscription', requireStripe, async (req, res) => {
  try {
    const { subscriptionId, priceId } = req.body;

    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    
    const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
      items: [{
        id: subscription.items.data[0].id,
        price: priceId,
      }],
      proration_behavior: 'create_prorations',
    });

    // Update database
    const newPlanId = priceId.includes('starter') ? 'starter' : 
                     priceId.includes('pro') ? 'pro' : 
                     priceId.includes('business') ? 'business' : 'free';

    await db
      .update(subscriptions)
      .set({ 
        planId: newPlanId,
        stripePriceId: priceId,
        updatedAt: new Date(),
      })
      .where(eq(subscriptions.stripeSubscriptionId, subscriptionId));

    res.json({ subscription: updatedSubscription });
  } catch (error: any) {
    console.error('Error updating subscription:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get usage stats
router.get('/usage-stats', async (req, res) => {
  try {
    const { userId } = req.query;

    const currentMonth = new Date();
    const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);

    const usageStats = await db
      .select({
        metric: usage.metric,
        total: db.select({ sum: usage.value }).from(usage)
          .where(and(
            eq(usage.userId, userId as string),
            gte(usage.periodStart, startOfMonth),
            lte(usage.periodEnd, endOfMonth)
          ))
      })
      .from(usage)
      .where(and(
        eq(usage.userId, userId as string),
        gte(usage.periodStart, startOfMonth),
        lte(usage.periodEnd, endOfMonth)
      ))
      .groupBy(usage.metric);

    res.json({ usage: usageStats });
  } catch (error: any) {
    console.error('Error getting usage stats:', error);
    res.status(500).json({ error: error.message });
  }
});

// Webhook handlers
async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.userId;
  const planId = session.metadata?.planId;
  const customerId = session.customer as string;

  if (!userId || !planId) return;

  // Get subscription details
  const subscription = await stripe.subscriptions.retrieve(session.subscription as string);

  // Create or update subscription in database
  await db.insert(subscriptions).values({
    userId,
    planId,
    status: subscription.status,
    currentPeriodStart: new Date(subscription.current_period_start * 1000),
    currentPeriodEnd: new Date(subscription.current_period_end * 1000),
    stripeSubscriptionId: subscription.id,
    stripePriceId: subscription.items.data[0].price.id,
    stripeCustomerId: customerId,
  }).onConflictDoUpdate({
    target: subscriptions.userId,
    set: {
      planId,
      status: subscription.status,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      stripeSubscriptionId: subscription.id,
      stripePriceId: subscription.items.data[0].price.id,
      updatedAt: new Date(),
    },
  });

  // Update user subscription status
  await db.update(users).set({ 
    subscriptionStatus: subscription.status 
  }).where(eq(users.id, userId));

  console.log(`Checkout session completed for user ${userId}, plan ${planId}`);
}

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  const subscriptionId = invoice.subscription as string;
  
  // Update subscription status if needed
  await db
    .update(subscriptions)
    .set({ status: 'active' })
    .where(eq(subscriptions.stripeSubscriptionId, subscriptionId));

  console.log(`Invoice payment succeeded for subscription ${subscriptionId}`);
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  const subscriptionId = invoice.subscription as string;
  
  // Update subscription status
  await db
    .update(subscriptions)
    .set({ status: 'past_due' })
    .where(eq(subscriptions.stripeSubscriptionId, subscriptionId));

  console.log(`Invoice payment failed for subscription ${subscriptionId}`);
}

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  const userId = subscription.metadata?.userId;
  const planId = subscription.metadata?.planId;

  if (!userId || !planId) return;

  await db.insert(subscriptions).values({
    userId,
    planId,
    status: subscription.status,
    currentPeriodStart: new Date(subscription.current_period_start * 1000),
    currentPeriodEnd: new Date(subscription.current_period_end * 1000),
    stripeSubscriptionId: subscription.id,
    stripePriceId: subscription.items.data[0].price.id,
    stripeCustomerId: subscription.customer as string,
  });

  console.log(`Subscription created for user ${userId}, plan ${planId}`);
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const userId = subscription.metadata?.userId;
  const planId = subscription.metadata?.planId;

  if (!userId || !planId) return;

  await db
    .update(subscriptions)
    .set({
      status: subscription.status,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      updatedAt: new Date(),
    })
    .where(eq(subscriptions.stripeSubscriptionId, subscription.id));

  console.log(`Subscription updated for user ${userId}, plan ${planId}`);
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const userId = subscription.metadata?.userId;

  if (!userId) return;

  await db
    .update(subscriptions)
    .set({ 
      status: 'canceled',
      updatedAt: new Date(),
    })
    .where(eq(subscriptions.stripeSubscriptionId, subscription.id));

  await db.update(users).set({ 
    subscriptionStatus: 'canceled' 
  }).where(eq(users.id, userId));

  console.log(`Subscription deleted for user ${userId}`);
}

export default router;