import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  Search, 
  Filter, 
  Plus, 
  MessageSquare, 
  TrendingUp, 
  MoreVertical,
  Play,
  Pause,
  Edit,
  Trash2
} from 'lucide-react'
import { useHapticFeedback } from '../hooks/useHapticFeedback'
import { BotCard } from '../components/bots/BotCard'
import { BotStatus } from '../components/bots/BotStatus'

interface Bot {
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

const mockBots: Bot[] = [
  {
    id: '1',
    name: 'Customer Support Bot',
    description: 'Handles customer inquiries and support tickets',
    status: 'active',
    conversations: 1234,
    satisfaction: 4.8,
    lastActive: '2 hours ago',
    trend: '+12%',
    category: 'Support',
  },
  {
    id: '2',
    name: 'Sales Assistant',
    description: 'Helps customers with product recommendations',
    status: 'active',
    conversations: 856,
    satisfaction: 4.6,
    lastActive: '5 hours ago',
    trend: '+8%',
    category: 'Sales',
  },
  {
    id: '3',
    name: 'FAQ Bot',
    description: 'Answers frequently asked questions',
    status: 'training',
    conversations: 423,
    satisfaction: 4.2,
    lastActive: '1 day ago',
    trend: '+5%',
    category: 'General',
  },
  {
    id: '4',
    name: 'Lead Qualifier',
    description: 'Qualifies leads and schedules demos',
    status: 'inactive',
    conversations: 234,
    satisfaction: 4.4,
    lastActive: '3 days ago',
    trend: '-2%',
    category: 'Sales',
  },
]

export function BotsPage() {
  const navigate = useNavigate()
  const { triggerHaptic } = useHapticFeedback()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  const categories = ['all', 'Support', 'Sales', 'General', 'Marketing']
  
  const filteredBots = mockBots.filter(bot => {
    const matchesSearch = bot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bot.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || bot.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleCreateBot = () => {
    triggerHaptic('medium')
    navigate('/builder')
  }

  const handleBotAction = (action: string, botId: string) => {
    triggerHaptic('light')
    // Handle bot actions (edit, delete, start, stop, etc.)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-secondary-700">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-white">
            My Bots
          </h1>
          
          <button
            onClick={handleCreateBot}
            className="btn btn-primary px-4 py-2"
          >
            <Plus size={16} />
            <span className="ml-2">Create</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
          <input
            type="text"
            placeholder="Search bots..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input pl-10 pr-4"
          />
          
          <button
            onClick={() => {
              triggerHaptic('light')
              setShowFilters(!showFilters)
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-lg hover:bg-secondary-700 transition-colors"
          >
            <Filter size={16} className="text-secondary-400" />
          </button>
        </div>

        {/* Category Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4"
          >
            <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    triggerHaptic('light')
                    setSelectedCategory(category)
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === category
                      ? 'bg-primary-600 text-white'
                      : 'bg-secondary-800 text-secondary-300 hover:bg-secondary-700'
                  }`}
                >
                  {category === 'all' ? 'All Bots' : category}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center">
            <p className="text-2xl font-bold text-white">{mockBots.length}</p>
            <p className="text-xs text-secondary-400">Total Bots</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-400">
              {mockBots.filter(b => b.status === 'active').length}
            </p>
            <p className="text-xs text-secondary-400">Active</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-400">
              {mockBots.reduce((sum, b) => sum + b.conversations, 0).toLocaleString()}
            </p>
            <p className="text-xs text-secondary-400">Total Chats</p>
          </div>
        </div>
      </div>

      {/* Bot List */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {filteredBots.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare size={48} className="text-secondary-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">
              No bots found
            </h3>
            <p className="text-secondary-400 mb-4">
              {searchQuery ? 'Try adjusting your search' : 'Create your first bot to get started'}
            </p>
            {!searchQuery && (
              <button
                onClick={handleCreateBot}
                className="btn btn-primary"
              >
                <Plus size={16} />
                <span className="ml-2">Create Bot</span>
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBots.map((bot, index) => (
              <motion.div
                key={bot.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 * index }}
              >
                <BotCard
                  bot={bot}
                  onAction={(action) => handleBotAction(action, bot.id)}
                  onTap={() => {
                    triggerHaptic('light')
                    navigate(`/bots/${bot.id}`)
                  }}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}