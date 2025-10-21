import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { 
  Home, 
  PlusSquare, 
  MessageSquare, 
  BarChart3, 
  User 
} from 'lucide-react'
import { useHapticFeedback } from '../../hooks/useHapticFeedback'

const navigationItems = [
  {
    name: 'Home',
    path: '/home',
    icon: Home,
  },
  {
    name: 'Build',
    path: '/builder',
    icon: PlusSquare,
  },
  {
    name: 'Bots',
    path: '/bots',
    icon: MessageSquare,
  },
  {
    name: 'Analytics',
    path: '/analytics',
    icon: BarChart3,
  },
  {
    name: 'Profile',
    path: '/profile',
    icon: User,
  },
]

export function BottomNavigation() {
  const location = useLocation()
  const { triggerHaptic } = useHapticFeedback()

  return (
    <nav className="bottom-nav">
      <div className="flex items-center justify-around h-16">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => `
                flex flex-col items-center justify-center w-full h-full transition-all duration-200
                ${isActive 
                  ? 'text-primary-400' 
                  : 'text-secondary-400 hover:text-secondary-300'
                }
              `}
              onClick={() => triggerHaptic('light')}
            >
              <div className="relative">
                <Icon 
                  size={20} 
                  className={isActive ? 'text-primary-400' : 'text-secondary-400'}
                />
                {isActive && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary-400 rounded-full" />
                )}
              </div>
              <span className="text-xs mt-1 font-medium">
                {item.name}
              </span>
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}