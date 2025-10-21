import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { MessageSquare, TrendingUp, MoreVertical } from 'lucide-react'
import { useHapticFeedback } from '../../hooks/useHapticFeedback'

const recentBots = [
  {
    id: '1',
    name: 'Customer Support Bot',
    status: 'active',
    conversations: 234,
    satisfaction: 4.8,
    lastActive: '2 hours ago',
    trend: '+12%',
  },
  {
    id: '2',
    name: 'Sales Assistant',
    status: 'active',
    conversations: 156,
    satisfaction: 4.6,
    lastActive: '5 hours ago',
    trend: '+8%',
  },
  {
    id: '3',
    name: 'FAQ Bot',
    status: 'training',
    conversations: 89,
    satisfaction: 4.2,
    lastActive: '1 day ago',
    trend: '+5%',
  },
]

export function RecentBots() {
  const navigate = useNavigate()
  const { triggerHaptic } = useHapticFeedback()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="space-y-3"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">
          Recent Bots
        </h2>
        <button
          onClick={() => {
            triggerHaptic('light')
            navigate('/bots')
          }}
          className="text-primary-400 text-sm font-medium"
        >
          View All
        </button>
      </div>

      <div className="space-y-3">
        {recentBots.map((bot, index) => (
          <motion.div
            key={bot.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.05 * index }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              triggerHaptic('light')
              navigate(`/bots/${bot.id}`)
            }}
            className="card cursor-pointer active:bg-secondary-800/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-white mb-1">
                  {bot.name}
                </h3>
                <div className="flex items-center space-x-2 text-xs text-secondary-400">
                  <span className={`px-2 py-1 rounded-full ${
                    bot.status === 'active' 
                      ? 'bg-green-400/20 text-green-400' 
                      : 'bg-yellow-400/20 text-yellow-400'
                  }`}>
                    {bot.status}
                  </span>
                  <span>{bot.lastActive}</span>
                </div>
              </div>
              
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  triggerHaptic('light')
                }}
                className="p-1 rounded-lg hover:bg-secondary-700 transition-colors"
              >
                <MoreVertical size={16} className="text-secondary-400" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <div className="flex items-center justify-center space-x-1 text-blue-400 mb-1">
                  <MessageSquare size={12} />
                  <span className="text-xs font-medium">{bot.conversations}</span>
                </div>
                <p className="text-xs text-secondary-400">Chats</p>
              </div>
              
              <div>
                <div className="flex items-center justify-center space-x-1 text-yellow-400 mb-1">
                  <span className="text-xs font-medium">⭐ {bot.satisfaction}</span>
                </div>
                <p className="text-xs text-secondary-400">Rating</p>
              </div>
              
              <div>
                <div className="flex items-center justify-center space-x-1 text-green-400 mb-1">
                  <TrendingUp size={12} />
                  <span className="text-xs font-medium">{bot.trend}</span>
                </div>
                <p className="text-xs text-secondary-400">Growth</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}