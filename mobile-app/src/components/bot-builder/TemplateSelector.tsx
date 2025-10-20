import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Star, Clock, Users } from 'lucide-react'
import { useHapticFeedback } from '../../hooks/useHapticFeedback'

const templates = [
  {
    id: 'customer-support',
    name: 'Customer Support',
    description: 'Handle customer inquiries and support tickets',
    category: 'Support',
    icon: '🎧',
    rating: 4.8,
    uses: '12.5K',
    difficulty: 'Beginner',
    features: ['FAQ handling', 'Ticket creation', 'Live chat handoff'],
  },
  {
    id: 'sales-assistant',
    name: 'Sales Assistant',
    description: 'Help customers with product recommendations',
    category: 'Sales',
    icon: '💼',
    rating: 4.7,
    uses: '8.3K',
    difficulty: 'Intermediate',
    features: ['Product recommendations', 'Lead qualification', 'Demo scheduling'],
  },
  {
    id: 'faq-bot',
    name: 'FAQ Bot',
    description: 'Answer frequently asked questions',
    category: 'General',
    icon: '❓',
    rating: 4.6,
    uses: '15.2K',
    difficulty: 'Beginner',
    features: ['Knowledge base', 'Quick replies', 'Search functionality'],
  },
  {
    id: 'lead-qualifier',
    name: 'Lead Qualifier',
    description: 'Qualify leads and schedule demos',
    category: 'Sales',
    icon: '🎯',
    rating: 4.5,
    uses: '6.7K',
    difficulty: 'Advanced',
    features: ['Lead scoring', 'Calendar integration', 'CRM sync'],
  },
  {
    id: 'appointment-scheduler',
    name: 'Appointment Scheduler',
    description: 'Book and manage appointments',
    category: 'Scheduling',
    icon: '📅',
    rating: 4.7,
    uses: '9.1K',
    difficulty: 'Intermediate',
    features: ['Calendar sync', 'Reminders', 'Rescheduling'],
  },
  {
    id: 'ecommerce-assistant',
    name: 'E-commerce Assistant',
    description: 'Help with shopping and orders',
    category: 'E-commerce',
    icon: '🛒',
    rating: 4.8,
    uses: '11.3K',
    difficulty: 'Intermediate',
    features: ['Product search', 'Order tracking', 'Recommendations'],
  },
]

const categories = ['All', 'Support', 'Sales', 'General', 'Scheduling', 'E-commerce']
const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced']

export function TemplateSelector() {
  const { triggerHaptic } = useHapticFeedback()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedDifficulty, setSelectedDifficulty] = useState('All')
  const [showFilters, setShowFilters] = useState(false)

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === 'All' || template.difficulty === selectedDifficulty
    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const handleSelectTemplate = (templateId: string) => {
    triggerHaptic('medium')
    // Handle template selection
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-400/20 text-green-400'
      case 'Intermediate': return 'bg-yellow-400/20 text-yellow-400'
      case 'Advanced': return 'bg-red-400/20 text-red-400'
      default: return 'bg-secondary-400/20 text-secondary-400'
    }
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-secondary-700">
        <h2 className="text-xl font-bold text-white mb-4">
          Choose a Template
        </h2>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
          <input
            type="text"
            placeholder="Search templates..."
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

        {/* Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3"
          >
            <div>
              <label className="block text-xs font-medium text-secondary-400 mb-2">
                Category
              </label>
              <div className="flex space-x-2 overflow-x-auto no-scrollbar">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      triggerHaptic('light')
                      setSelectedCategory(category)
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                      selectedCategory === category
                        ? 'bg-primary-600 text-white'
                        : 'bg-secondary-800 text-secondary-300 hover:bg-secondary-700'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-secondary-400 mb-2">
                Difficulty
              </label>
              <div className="flex space-x-2 overflow-x-auto no-scrollbar">
                {difficulties.map((difficulty) => (
                  <button
                    key={difficulty}
                    onClick={() => {
                      triggerHaptic('light')
                      setSelectedDifficulty(difficulty)
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                      selectedDifficulty === difficulty
                        ? 'bg-primary-600 text-white'
                        : 'bg-secondary-800 text-secondary-300 hover:bg-secondary-700'
                    }`}
                  >
                    {difficulty}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Templates Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        {filteredTemplates.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-white mb-2">
              No templates found
            </h3>
            <p className="text-secondary-400">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 * index }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelectTemplate(template.id)}
                className="card cursor-pointer active:bg-secondary-800/50 transition-colors"
              >
                <div className="flex items-start space-x-3">
                  <div className="text-3xl">
                    {template.icon}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-white">
                        {template.name}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(template.difficulty)}`}>
                        {template.difficulty}
                      </span>
                    </div>
                    
                    <p className="text-sm text-secondary-400 mb-2">
                      {template.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3 text-xs text-secondary-400">
                        <div className="flex items-center space-x-1">
                          <Star size={12} className="text-yellow-400" />
                          <span>{template.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users size={12} />
                          <span>{template.uses}</span>
                        </div>
                      </div>
                      
                      <span className="text-xs text-primary-400">
                        {template.category}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {template.features.slice(0, 3).map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-secondary-800 rounded text-xs text-secondary-300"
                        >
                          {feature}
                        </span>
                      ))}
                      {template.features.length > 3 && (
                        <span className="px-2 py-1 bg-secondary-800 rounded text-xs text-secondary-300">
                          +{template.features.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}