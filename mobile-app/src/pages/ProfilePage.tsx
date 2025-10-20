import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Award, 
  Settings, 
  LogOut,
  ChevronRight,
  Star,
  Zap,
  Crown,
  MessageSquare
} from 'lucide-react'
import { useHapticFeedback } from '../hooks/useHapticFeedback'

const profileMenuItems = [
  {
    icon: User,
    label: 'Edit Profile',
    description: 'Update your personal information',
    action: 'edit-profile',
  },
  {
    icon: Award,
    label: 'Achievements',
    description: 'View your badges and milestones',
    action: 'achievements',
  },
  {
    icon: Settings,
    label: 'Settings',
    description: 'App preferences and configurations',
    action: 'settings',
  },
  {
    icon: Crown,
    label: 'Upgrade Plan',
    description: 'Unlock premium features',
    action: 'upgrade',
    highlight: true,
  },
]

const stats = [
  { label: 'Bots Created', value: '12', icon: Zap },
  { label: 'Total Conversations', value: '15.2K', icon: MessageSquare },
  { label: 'Success Rate', value: '98%', icon: Star },
]

export function ProfilePage() {
  const navigate = useNavigate()
  const { triggerHaptic } = useHapticFeedback()

  const handleMenuAction = (action: string) => {
    triggerHaptic('medium')
    
    switch (action) {
      case 'edit-profile':
        // Navigate to edit profile
        break
      case 'achievements':
        // Navigate to achievements
        break
      case 'settings':
        navigate('/settings')
        break
      case 'upgrade':
        // Navigate to upgrade page
        break
      default:
        break
    }
  }

  const handleLogout = () => {
    triggerHaptic('heavy')
    // Handle logout logic
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-secondary-700">
        <h1 className="text-2xl font-bold text-white">
          Profile
        </h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Profile Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 space-y-4"
        >
          {/* User Info Card */}
          <div className="card p-6 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-600 to-accent-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <User size={32} className="text-white" />
            </div>
            
            <h2 className="text-xl font-bold text-white mb-1">
              John Doe
            </h2>
            
            <p className="text-secondary-400 mb-4">
              john.doe@example.com
            </p>
            
            <div className="flex items-center justify-center space-x-2">
              <span className="px-3 py-1 bg-primary-600/20 text-primary-400 rounded-full text-sm font-medium">
                Pro Plan
              </span>
              <span className="text-secondary-400 text-sm">
                Member since Oct 2024
              </span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.05 * index }}
                  className="card p-3 text-center"
                >
                  <Icon size={20} className="text-primary-400 mx-auto mb-2" />
                  <p className="text-lg font-bold text-white mb-1">
                    {stat.value}
                  </p>
                  <p className="text-xs text-secondary-400">
                    {stat.label}
                  </p>
                </motion.div>
              )
            })}
          </div>

          {/* Menu Items */}
          <div className="space-y-2">
            {profileMenuItems.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 * index }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleMenuAction(item.action)}
                  className={`w-full card p-4 text-left hover:bg-secondary-800/50 transition-colors ${
                    item.highlight ? 'border-primary-600/30 bg-primary-600/5' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        item.highlight 
                          ? 'bg-primary-600/20' 
                          : 'bg-secondary-800'
                      }`}>
                        <Icon 
                          size={20} 
                          className={item.highlight ? 'text-primary-400' : 'text-secondary-300'} 
                        />
                      </div>
                      
                      <div>
                        <h3 className={`font-semibold ${
                          item.highlight ? 'text-primary-400' : 'text-white'
                        }`}>
                          {item.label}
                        </h3>
                        <p className="text-sm text-secondary-400">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    
                    <ChevronRight size={16} className="text-secondary-400" />
                  </div>
                </motion.button>
              )
            })}
          </div>

          {/* Logout Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className="w-full btn btn-ghost px-4 py-3 text-red-400 hover:bg-red-400/10 hover:text-red-300 transition-all"
          >
            <LogOut size={16} />
            <span className="ml-2">Log Out</span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}