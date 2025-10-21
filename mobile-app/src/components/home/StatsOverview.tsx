import React from 'react'
import { motion } from 'framer-motion'
import { MessageSquare, Users, TrendingUp, Zap } from 'lucide-react'

const stats = [
  {
    icon: MessageSquare,
    label: 'Total Bots',
    value: '12',
    change: '+2 this week',
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
  },
  {
    icon: Users,
    label: 'Total Users',
    value: '1.2K',
    change: '+15% this month',
    color: 'text-green-400',
    bgColor: 'bg-green-400/10',
  },
  {
    icon: TrendingUp,
    label: 'Conversations',
    value: '8.5K',
    change: '+23% this week',
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/10',
  },
  {
    icon: Zap,
    label: 'Response Rate',
    value: '98%',
    change: '+2% improvement',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-400/10',
  },
]

export function StatsOverview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="space-y-3"
    >
      <h2 className="text-lg font-semibold text-white mb-3">
        Performance Overview
      </h2>
      
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.05 * index }}
              className="card"
            >
              <div className={`w-8 h-8 ${stat.bgColor} rounded-lg flex items-center justify-center mb-2`}>
                <Icon size={16} className={stat.color} />
              </div>
              <p className="text-2xl font-bold text-white mb-1">
                {stat.value}
              </p>
              <p className="text-xs text-secondary-400 mb-1">
                {stat.label}
              </p>
              <p className="text-xs text-green-400">
                {stat.change}
              </p>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}