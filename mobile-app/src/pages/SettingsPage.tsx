import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  Bell, 
  Moon, 
  Globe, 
  Shield, 
  HelpCircle, 
  ChevronRight,
  Smartphone,
  Volume2,
  Wifi,
  Lock
} from 'lucide-react'
import { useHapticFeedback } from '../hooks/useHapticFeedback'

interface SettingItem {
  icon: React.ComponentType<any>
  label: string
  description: string
  type: 'toggle' | 'navigation' | 'selector'
  value?: boolean
  options?: string[]
  action?: string
}

const settingsGroups = [
  {
    title: 'Preferences',
    items: [
      {
        icon: Bell,
        label: 'Notifications',
        description: 'Manage push notifications',
        type: 'toggle' as const,
        value: true,
      },
      {
        icon: Moon,
        label: 'Dark Mode',
        description: 'Toggle dark theme',
        type: 'toggle' as const,
        value: true,
      },
      {
        icon: Volume2,
        label: 'Sound Effects',
        description: 'Enable haptic feedback',
        type: 'toggle' as const,
        value: true,
      },
    ],
  },
  {
    title: 'App Settings',
    items: [
      {
        icon: Globe,
        label: 'Language',
        description: 'Choose app language',
        type: 'selector' as const,
        options: ['English', 'Spanish', 'French', 'German'],
        value: 'English',
      },
      {
        icon: Smartphone,
        label: 'Mobile Data',
        description: 'Use mobile data for sync',
        type: 'toggle' as const,
        value: false,
      },
      {
        icon: Wifi,
        label: 'Auto-sync',
        description: 'Sync data automatically',
        type: 'toggle' as const,
        value: true,
      },
    ],
  },
  {
    title: 'Security & Privacy',
    items: [
      {
        icon: Lock,
        label: 'Privacy',
        description: 'Privacy settings and permissions',
        type: 'navigation' as const,
        action: 'privacy',
      },
      {
        icon: Shield,
        label: 'Security',
        description: 'Security and authentication',
        type: 'navigation' as const,
        action: 'security',
      },
    ],
  },
  {
    title: 'Support',
    items: [
      {
        icon: HelpCircle,
        label: 'Help Center',
        description: 'Get help and support',
        type: 'navigation' as const,
        action: 'help',
      },
    ],
  },
]

export function SettingsPage() {
  const navigate = useNavigate()
  const { triggerHaptic } = useHapticFeedback }
  const [settings, setSettings] = useState<Record<string, any>>(() => {
    const initialSettings: Record<string, any> = {}
    settingsGroups.forEach(group => {
      group.items.forEach(item => {
        if (item.type === 'toggle') {
          initialSettings[item.label] = item.value
        } else if (item.type === 'selector') {
          initialSettings[item.label] = item.value
        }
      })
    })
    return initialSettings
  })

  const handleToggle = (label: string) => {
    triggerHaptic('light')
    setSettings(prev => ({
      ...prev,
      [label]: !prev[label],
    }))
  }

  const handleSelector = (label: string, value: string) => {
    triggerHaptic('light')
    setSettings(prev => ({
      ...prev,
      [label]: value,
    }))
  }

  const handleNavigation = (action: string) => {
    triggerHaptic('medium')
    // Handle navigation to specific settings pages
  }

    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-secondary-700">
        <h1 className="text-2xl font-bold text-white">
          Settings
        </h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
        {settingsGroups.map((group, groupIndex) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * groupIndex }}
            className="space-y-3"
          >
            <h2 className="text-sm font-semibold text-secondary-400 uppercase tracking-wider">
              {group.title}
            </h2>
            
            <div className="space-y-2">
              {group.items.map((item, itemIndex) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 * itemIndex }}
                  >
                    {item.type === 'toggle' && (
                      <button
                        onClick={() => handleToggle(item.label)}
                        className="w-full card p-4 hover:bg-secondary-800/50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-secondary-800 rounded-lg flex items-center justify-center">
                              <Icon size={20} className="text-secondary-300" />
                            </div>
                            
                            <div className="text-left">
                              <h3 className="font-semibold text-white">
                                {item.label}
                              </h3>
                              <p className="text-sm text-secondary-400">
                                {item.description}
                              </p>
                            </div>
                          </div>
                          
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={settings[item.label] || false}
                              onChange={() => {}}
                              className="sr-only"
                            />
                            <div className={`w-12 h-6 rounded-full transition-colors ${
                              settings[item.label] ? 'bg-primary-600' : 'bg-secondary-600'
                            }`}>
                              <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                                settings[item.label] ? 'translate-x-6' : 'translate-x-0.5'
                              }`} />
                            </div>
                          </div>
                        </div>
                      </button>
                    )}
                    
                    {item.type === 'selector' && (
                      <div className="card p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-secondary-800 rounded-lg flex items-center justify-center">
                              <Icon size={20} className="text-secondary-300" />
                            </div>
                            
                            <div>
                              <h3 className="font-semibold text-white">
                                {item.label}
                              </h3>
                              <p className="text-sm text-secondary-400">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          {item.options?.map((option) => (
                            <button
                              key={option}
                              onClick={() => handleSelector(item.label, option)}
                              className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                                settings[item.label] === option
                                  ? 'bg-primary-600 text-white'
                                  : 'bg-secondary-800 text-secondary-300 hover:bg-secondary-700'
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {item.type === 'navigation' && (
                      <button
                        onClick={() => handleNavigation(item.action || '')}
                        className="w-full card p-4 hover:bg-secondary-800/50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-secondary-800 rounded-lg flex items-center justify-center">
                              <Icon size={20} className="text-secondary-300" />
                            </div>
                            
                            <div className="text-left">
                              <h3 className="font-semibold text-white">
                                {item.label}
                              </h3>
                              <p className="text-sm text-secondary-400">
                                {item.description}
                              </p>
                            </div>
                          </div>
                          
                          <ChevronRight size={16} className="text-secondary-400" />
                        </div>
                      </button>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  return (
  )
