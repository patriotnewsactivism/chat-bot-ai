-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  plan_id TEXT NOT NULL,
  plan_name TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('active', 'canceled', 'past_due', 'trialing', 'incomplete')),
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  cancel_at_period_end BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create usage tracking table
CREATE TABLE IF NOT EXISTS usage_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  chatbot_id UUID REFERENCES chatbots(id) ON DELETE CASCADE,
  period_start TIMESTAMP WITH TIME ZONE NOT NULL,
  period_end TIMESTAMP WITH TIME ZONE NOT NULL,
  conversations_count INTEGER DEFAULT 0,
  messages_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create payment methods table
CREATE TABLE IF NOT EXISTS payment_methods (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_payment_method_id TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL,
  last4 TEXT,
  brand TEXT,
  exp_month INTEGER,
  exp_year INTEGER,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_customer ON subscriptions(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_usage_logs_user ON usage_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_usage_logs_period ON usage_logs(period_start, period_end);
CREATE INDEX IF NOT EXISTS idx_payment_methods_user ON payment_methods(user_id);

-- Enable Row Level Security
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_methods ENABLE ROW LEVEL SECURITY;

-- Create policies for subscriptions
CREATE POLICY "Users can view their own subscriptions"
  ON subscriptions FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own subscriptions"
  ON subscriptions FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own subscriptions"
  ON subscriptions FOR UPDATE
  USING (user_id = auth.uid());

-- Create policies for usage_logs
CREATE POLICY "Users can view their own usage logs"
  ON usage_logs FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own usage logs"
  ON usage_logs FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- Create policies for payment_methods
CREATE POLICY "Users can view their own payment methods"
  ON payment_methods FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own payment methods"
  ON payment_methods FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own payment methods"
  ON payment_methods FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own payment methods"
  ON payment_methods FOR DELETE
  USING (user_id = auth.uid());

-- Function to get current usage for a user
CREATE OR REPLACE FUNCTION get_current_usage(p_user_id UUID)
RETURNS TABLE (
  conversations_count BIGINT,
  messages_count BIGINT,
  chatbots_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(DISTINCT c.session_id)::BIGINT as conversations_count,
    COUNT(m.id)::BIGINT as messages_count,
    COUNT(DISTINCT cb.id)::BIGINT as chatbots_count
  FROM chatbots cb
  LEFT JOIN conversations c ON c.chatbot_id = cb.id 
    AND c.started_at >= date_trunc('month', CURRENT_TIMESTAMP)
  LEFT JOIN messages m ON m.chatbot_id = cb.id 
    AND m.created_at >= date_trunc('month', CURRENT_TIMESTAMP)
  WHERE cb.user_id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user has reached limits
CREATE OR REPLACE FUNCTION check_usage_limits(p_user_id UUID)
RETURNS TABLE (
  within_limits BOOLEAN,
  chatbots_used INTEGER,
  chatbots_limit INTEGER,
  conversations_used INTEGER,
  conversations_limit INTEGER
) AS $$
DECLARE
  v_plan_id TEXT;
  v_chatbots_limit INTEGER;
  v_conversations_limit INTEGER;
  v_chatbots_used INTEGER;
  v_conversations_used INTEGER;
BEGIN
  -- Get user's plan
  SELECT plan_id INTO v_plan_id
  FROM subscriptions
  WHERE user_id = p_user_id AND status = 'active'
  ORDER BY created_at DESC
  LIMIT 1;
  
  -- Default to free plan if no subscription
  v_plan_id := COALESCE(v_plan_id, 'free');
  
  -- Set limits based on plan
  CASE v_plan_id
    WHEN 'free' THEN
      v_chatbots_limit := 1;
      v_conversations_limit := 50;
    WHEN 'starter' THEN
      v_chatbots_limit := 3;
      v_conversations_limit := 1000;
    WHEN 'pro' THEN
      v_chatbots_limit := 10;
      v_conversations_limit := 10000;
    WHEN 'business' THEN
      v_chatbots_limit := 50;
      v_conversations_limit := 50000;
    ELSE
      v_chatbots_limit := 1;
      v_conversations_limit := 50;
  END CASE;
  
  -- Get current usage
  SELECT 
    COUNT(DISTINCT cb.id)::INTEGER,
    COUNT(DISTINCT c.session_id)::INTEGER
  INTO v_chatbots_used, v_conversations_used
  FROM chatbots cb
  LEFT JOIN conversations c ON c.chatbot_id = cb.id 
    AND c.started_at >= date_trunc('month', CURRENT_TIMESTAMP)
  WHERE cb.user_id = p_user_id;
  
  -- Return results
  RETURN QUERY SELECT 
    (v_chatbots_used < v_chatbots_limit AND v_conversations_used < v_conversations_limit) as within_limits,
    v_chatbots_used as chatbots_used,
    v_chatbots_limit as chatbots_limit,
    v_conversations_used as conversations_used,
    v_conversations_limit as conversations_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update subscription status
CREATE OR REPLACE FUNCTION update_subscription_status()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update timestamp
CREATE TRIGGER trigger_update_subscription_timestamp
BEFORE UPDATE ON subscriptions
FOR EACH ROW
EXECUTE FUNCTION update_subscription_status();