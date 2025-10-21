import React from 'react'
import { Outlet } from 'react-router-dom'
import { BottomNavigation } from '../navigation/BottomNavigation'
import { TopNavigation } from '../navigation/TopNavigation'

interface MobileLayoutProps {
  children?: React.ReactNode
}

export function MobileLayout({ children }: MobileLayoutProps) {
  return (
    <div className="mobile-container">
      <TopNavigation />
      
      <main className="flex-1 pb-20 safe-area-inset-bottom">
        <div className="min-h-full">
          {children || <Outlet />}
        </div>
      </main>
      
      <BottomNavigation />
    </div>
  )
}