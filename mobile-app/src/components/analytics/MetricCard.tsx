import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface MetricCardProps {
  metric: {
    title: string
    value: string
    change: string
    trend: 'up' | 'down'
    icon: React.ComponentType<any>
    color: 'blue' | 'green' | 'yellow' | 'purple'
  }
  isSelected: boolean
}

export function MetricCard({ metric, isSelected }: MetricCardProps) {
  const Icon = metric.icon
  
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          bg: 'bg-blue-400/10',
          text: 'text-blue-400',
          border: 'border-blue-400/30',
        }
      case 'green':
        return {
          bg: 'bg-green-400/10',
          text: 'text-green-400',
          border: 'border-green-400/30',
        }
      case 'yellow':
        return {
          bg: 'bg-yellow-400/10',
          text: 'text-yellow-400',
          border: 'border-yellow-400/30',
        }
      case 'purple':
        return {
          bg: 'bg-purple-400/10',
          text: 'text-purple-400',
          border: 'border-purple-400/30',
        }
      default:
        return {
          bg: 'bg-secondary-400/10',
          text: 'text-secondary-400',
          border: 'border-secondary-400/30',
        }
    }
  }

  const colors = getColorClasses(metric.color)

  return (
    <motion.div
      className={`card p-4 cursor-pointer transition-all ${
        isSelected 
          ? `border-2 ${colors.border} bg-secondary-800/50` 
          : 'border-secondary-700 hover:border-secondary-600'
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 ${colors.bg} rounded-lg flex items-center justify-center`}>
          <Icon size={20} className={colors.text} />
        </div>
        
        <div className={`flex items-center space-x-1 text-sm font-medium ${
          metric.trend === 'up' ? 'text-green-400' : 'text-red-400'
        }`}>
          {metric.trend === 'up' ? (
            <TrendingUp size={14} />
          ) : (
            <TrendingDown size={14} />
          )}
          <span>{metric.change}</span>
        </div>
      </div>

      <div>
        <p className="text-2xl font-bold text-white mb-1">
          {metric.value}
        </p>
        <p className="text-xs text-secondary-400">
          {metric.title}
        </p>
      </div>
    </motion.div>
  )
}