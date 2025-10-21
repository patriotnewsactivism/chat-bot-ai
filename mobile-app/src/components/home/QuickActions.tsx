import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Plus, MessageSquare, BarChart3, Settings } from 'lucide-react'
import { useHapticFeedback } from '../../hooks/useHapticFeedback'

const quickActions = [
  {
    icon: Plus,
    label: 'New Bot',
    path: '/builder',
    color: 'bg-primary-600',
    description: 'Create a new AI bot',
  },
  {
    icon: MessageSquare,
    label: 'My Bots',
    path: '/bots',
    color: 'bg-secondary-600',
    description: 'Manage your bots',
  },
  {
    icon: BarChart3,
    label: 'Analytics',
    path: '/analytics',
    color: 'bg-green-600',
    description: 'View performance',
  },
  {
    icon: Settings,
    label: 'Settings',
    path: '/settings',
    color: 'bg-purple-600',
    description: 'App preferences',
  },
]

export function QuickActions() {
  const navigate = useNavigate()
  const { triggerHaptic } = useHapticFeedback()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="grid grid-cols-2 gap-3"
    >
      {quickActions.map((action, index) => {
        const Icon = action.icon
        return (
          <motion.button
            key={action.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.05 * index }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              triggerHaptic('medium')
              navigate(action.path)
            }}
            className="card p-4 text-left hover:bg-secondary-800/50 transition-colors"
          >
            <div className={`w-10 h-10 ${action.color} rounded-xl flex items-center justify-center mb-3`}>
              <Icon size={20} className="text-white" />
            </div>
            <h3 className="font-semibold text-white mb-1">
              {action.label}
            </h3>
            <p className="text-xs text-secondary-400">
              {action.description}
            </p>
          </motion.button>
        )
      })}
    </motion.div>
  )
}