import React from 'react'
import { motion } from 'framer-motion'
import { 
  Zap, 
  TrendingUp, 
  MessageSquare, 
  Users, 
  ArrowRight,
  Plus,
  BarChart3,
  Star
} from 'lucide-react'
import { useHapticFeedback } from '../hooks/useHapticFeedback'
import { QuickActions } from '../components/home/QuickActions'
import { RecentBots } from '../components/home/RecentBots'
import { StatsOverview } from '../components/home/StatsOverview'

export function HomePage() {
  const { triggerHaptic } = useHapticFeedback()

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Build AI bots in minutes',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10',
    },
    {
      icon: MessageSquare,
      title: 'Smart Conversations',
      description: 'Advanced AI technology',
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
    },
    {
      icon: Users,
      title: 'Multi-Platform',
      description: 'Deploy anywhere',
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
    },
    {
      icon: TrendingUp,
      title: 'Analytics',
      description: 'Track performance',
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10',
    },
  ]

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back! 👋
        </h1>
        <p className="text-secondary-400">
          Ready to build amazing AI bots today?
        </p>
      </motion.div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Stats Overview */}
      <StatsOverview />

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-2 gap-4"
      >
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              whileTap={{ scale: 0.95 }}
              onClick={() => triggerHaptic('light')}
              className="card cursor-pointer"
            >
              <div className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-3`}>
                <Icon size={24} className={feature.color} />
              </div>
              <h3 className="font-semibold text-white mb-1">
                {feature.title}
              </h3>
              <p className="text-sm text-secondary-400">
                {feature.description}
              </p>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Recent Bots */}
      <RecentBots />

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-6 text-center"
      >
        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Star size={32} className="text-white" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">
          Go Premium
        </h2>
        <p className="text-white/80 mb-4 text-sm">
          Unlock unlimited bots, advanced analytics, and priority support
        </p>
        <button
          onClick={() => triggerHaptic('medium')}
          className="bg-white text-primary-600 px-6 py-3 rounded-xl font-semibold flex items-center justify-center mx-auto space-x-2 active:scale-95 transition-transform"
        >
          <span>Upgrade Now</span>
          <ArrowRight size={16} />
        </button>
      </motion.div>
    </div>
  )
}