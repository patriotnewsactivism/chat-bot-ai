import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Calendar, 
  TrendingUp, 
  MessageSquare, 
  Users, 
  BarChart3,
  Download,
  Filter
} from 'lucide-react'
import { useHapticFeedback } from '../hooks/useHapticFeedback'
import { MetricCard } from '../components/analytics/MetricCard'
import { ChartContainer } from '../components/analytics/ChartContainer'
import { TimeRangeSelector } from '../components/analytics/TimeRangeSelector'

const metrics = [
  {
    title: 'Total Conversations',
    value: '12,543',
    change: '+23%',
    trend: 'up' as const,
    icon: MessageSquare,
    color: 'blue',
  },
  {
    title: 'Active Users',
    value: '3,421',
    change: '+15%',
    trend: 'up' as const,
    icon: Users,
    color: 'green',
  },
  {
    title: 'Satisfaction Rate',
    value: '4.8',
    change: '+0.3',
    trend: 'up' as const,
    icon: BarChart3,
    color: 'yellow',
  },
  {
    title: 'Response Time',
    value: '1.2s',
    change: '-0.5s',
    trend: 'down' as const,
    icon: TrendingUp,
    color: 'purple',
  },
]

const chartData = [
  { name: 'Mon', conversations: 120, users: 80 },
  { name: 'Tue', conversations: 150, users: 95 },
  { name: 'Wed', conversations: 180, users: 110 },
  { name: 'Thu', conversations: 220, users: 130 },
  { name: 'Fri', conversations: 280, users: 160 },
  { name: 'Sat', conversations: 320, users: 180 },
  { name: 'Sun', conversations: 290, users: 170 },
]

export function AnalyticsPage() {
  const { triggerHaptic } = useHapticFeedback()
  const [timeRange, setTimeRange] = useState('7d')
  const [selectedMetric, setSelectedMetric] = useState('conversations')

  const handleExport = () => {
    triggerHaptic('medium')
    // Export analytics data
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-secondary-700">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-white">
            Analytics
          </h1>
          
          <button
            onClick={handleExport}
            className="btn btn-ghost px-3 py-2"
          >
            <Download size={16} />
            <span className="ml-1 text-xs">Export</span>
          </button>
        </div>

        {/* Time Range Selector */}
        <TimeRangeSelector
          value={timeRange}
          onChange={setTimeRange}
        />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
        {/* Metrics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 gap-4"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.05 * index }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                triggerHaptic('light')
                setSelectedMetric(metric.title.toLowerCase().replace(' ', ''))
              }}
            >
              <MetricCard
                metric={metric}
                isSelected={selectedMetric === metric.title.toLowerCase().replace(' ', '')}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Chart Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          <h2 className="text-lg font-semibold text-white">
            Performance Overview
          </h2>
          
          <ChartContainer
            data={chartData}
            selectedMetric={selectedMetric}
          />
        </motion.div>

        {/* Top Bots */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-4"
        >
          <h2 className="text-lg font-semibold text-white">
            Top Performing Bots
          </h2>
          
          <div className="space-y-3">
            {[
              { name: 'Customer Support Bot', conversations: 3421, satisfaction: 4.8 },
              { name: 'Sales Assistant', conversations: 2856, satisfaction: 4.6 },
              { name: 'FAQ Bot', conversations: 1923, satisfaction: 4.4 },
            ].map((bot, index) => (
              <motion.div
                key={bot.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.05 * index }}
                className="card"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-white mb-1">
                      {bot.name}
                    </h3>
                    <p className="text-sm text-secondary-400">
                      {bot.conversations.toLocaleString()} conversations
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-yellow-400">
                      <span className="text-sm font-medium">⭐ {bot.satisfaction}</span>
                    </div>
                    <p className="text-xs text-secondary-400">Rating</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gradient-to-r from-primary-600/20 to-accent-600/20 rounded-2xl p-4 border border-primary-600/30"
        >
          <h3 className="font-semibold text-white mb-2">
            📊 Key Insights
          </h3>
          <ul className="space-y-2 text-sm text-secondary-300">
            <li>• Conversation volume increased by 23% this week</li>
            <li>• Customer satisfaction improved to 4.8/5.0</li>
            <li>• Response time reduced by 40% after AI optimization</li>
            <li>• Peak activity occurs between 2-4 PM daily</li>
          </ul>
        </motion.div>
      </div>
    </div>
  )
}