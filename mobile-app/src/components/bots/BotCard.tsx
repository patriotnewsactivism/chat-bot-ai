import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageSquare, 
  TrendingUp, 
  MoreVertical, 
  Play, 
  Pause, 
  Edit, 
  Trash2, 
  BarChart3,
  Star
} from 'lucide-react'
import { BotStatus } from './BotStatus'

interface BotCardProps {
  bot: {
    id: string
    name: string
    description: string
    status: 'active' | 'inactive' | 'training'
    conversations: number
    satisfaction: number
    lastActive: string
    trend: string
    category: string
  }
  onAction: (action: string) => void
  onTap: () => void
}

export function BotCard({ bot, onAction, onTap }: BotCardProps) {
  const [showActions, setShowActions] = useState(false)

  const handleAction = (action: string, e: React.MouseEvent) => {
    e.stopPropagation()
    onAction(action)
    setShowActions(false)
  }

  const actions = [
    { id: 'toggle', icon: bot.status === 'active' ? Pause : Play, label: bot.status === 'active' ? 'Pause' : 'Start' },
    { id: 'edit', icon: Edit, label: 'Edit' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'delete', icon: Trash2, label: 'Delete' },
  ]

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={onTap}
      className="card cursor-pointer active:bg-secondary-800/50 transition-colors relative"
    >
      {/* Main Content */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-semibold text-white">
              {bot.name}
            </h3>
            <BotStatus status={bot.status} />
          </div>
          
          <p className="text-sm text-secondary-400 mb-2 line-clamp-2">
            {bot.description}
          </p>
          
          <div className="flex items-center space-x-3 text-xs text-secondary-400">
            <span className="px-2 py-1 bg-secondary-800 rounded-full">
              {bot.category}
            </span>
            <span>{bot.lastActive}</span>
          </div>
        </div>

        {/* Action Menu */}
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation()
              setShowActions(!showActions)
            }}
            className="p-2 rounded-lg hover:bg-secondary-700 transition-colors"
          >
            <MoreVertical size={16} className="text-secondary-400" />
          </button>

          <AnimatePresence>
            {showActions && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-12 w-48 bg-secondary-800 border border-secondary-700 rounded-xl shadow-xl z-50"
              >
                {actions.map((action) => {
                  const Icon = action.icon
                  return (
                    <button
                      key={action.id}
                      onClick={(e) => handleAction(action.id, e)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-secondary-700 transition-colors first:rounded-t-xl last:rounded-b-xl ${
                        action.id === 'delete' ? 'text-red-400 hover:bg-red-400/10' : 'text-white'
                      }`}
                    >
                      <Icon size={16} />
                      <span className="text-sm">{action.label}</span>
                    </button>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 pt-3 border-t border-secondary-700">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 text-blue-400 mb-1">
            <MessageSquare size={12} />
            <span className="text-sm font-medium">{bot.conversations.toLocaleString()}</span>
          </div>
          <p className="text-xs text-secondary-400">Conversations</p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 text-yellow-400 mb-1">
            <Star size={12} />
            <span className="text-sm font-medium">{bot.satisfaction}</span>
          </div>
          <p className="text-xs text-secondary-400">Satisfaction</p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 text-green-400 mb-1">
            <TrendingUp size={12} />
            <span className="text-sm font-medium">{bot.trend}</span>
          </div>
          <p className="text-xs text-secondary-400">Growth</p>
        </div>
      </div>
    </motion.div>
  )
}