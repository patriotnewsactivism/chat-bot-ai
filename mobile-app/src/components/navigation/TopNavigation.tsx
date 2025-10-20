import React from 'react'
import { useLocation } from 'react-router-dom'
import { Bell, Settings, Menu } from 'lucide-react'
import { useHapticFeedback } from '../../hooks/useHapticFeedback'

interface TopNavigationProps {
  title?: string
  showMenu?: boolean
  showNotifications?: boolean
  showSettings?: boolean
  onMenuClick?: () => void
}

export function TopNavigation({ 
  title,
  showMenu = true,
  showNotifications = true,
  showSettings = true,
  onMenuClick
}: TopNavigationProps) {
  const location = useLocation()
  const { triggerHaptic } = useHapticFeedback()

  const getPageTitle = () => {
    if (title) return title
    
    const pathTitles: Record<string, string> = {
      '/home': 'Home',
      '/builder': 'Bot Builder',
      '/bots': 'My Bots',
      '/analytics': 'Analytics',
      '/profile': 'Profile',
      '/settings': 'Settings',
    }
    
    return pathTitles[location.pathname] || 'BuildMyBot'
  }

  return (
    <header className="top-nav safe-area-inset-top">
      <div className="flex items-center justify-between h-14 px-4">
        <div className="flex items-center space-x-3">
          {showMenu && (
            <button
              onClick={() => {
                triggerHaptic('light')
                onMenuClick?.()
              }}
              className="p-2 rounded-lg hover:bg-secondary-800 transition-colors"
            >
              <Menu size={20} className="text-secondary-300" />
            </button>
          )}
          
          <h1 className="text-lg font-semibold text-white">
            {getPageTitle()}
          </h1>
        </div>

        <div className="flex items-center space-x-2">
          {showNotifications && (
            <button
              onClick={() => triggerHaptic('light')}
              className="relative p-2 rounded-lg hover:bg-secondary-800 transition-colors"
            >
              <Bell size={20} className="text-secondary-300" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          )}
          
          {showSettings && (
            <button
              onClick={() => triggerHaptic('light')}
              className="p-2 rounded-lg hover:bg-secondary-800 transition-colors"
            >
              <Settings size={20} className="text-secondary-300" />
            </button>
          )}
        </div>
      </div>
    </header>
  )
}