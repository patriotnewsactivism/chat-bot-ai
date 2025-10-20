import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'

interface PullToRefreshProps {
  children: React.ReactNode
  onRefresh: () => Promise<void>
  threshold?: number
}

export function PullToRefresh({ children, onRefresh, threshold = 80 }: PullToRefreshProps) {
  const [isPulling, setIsPulling] = useState(false)
  const [pullDistance, setPullDistance] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const startY = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    if (window.scrollY === 0) {
      startY.current = e.touches[0].clientY
      setIsPulling(true)
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isPulling || isRefreshing) return

    const currentY = e.touches[0].clientY
    const distance = currentY - startY.current

    if (distance > 0 && window.scrollY === 0) {
      e.preventDefault()
      setPullDistance(Math.min(distance * 0.5, threshold * 1.5))
    }
  }

  const handleTouchEnd = async () => {
    if (!isPulling) return

    setIsPulling(false)

    if (pullDistance >= threshold && !isRefreshing) {
      setIsRefreshing(true)
      setPullDistance(threshold)

      try {
        await onRefresh()
      } finally {
        setIsRefreshing(false)
        setPullDistance(0)
      }
    } else {
      setPullDistance(0)
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Pull to Refresh Indicator */}
      <motion.div
        className="absolute top-0 left-0 right-0 flex items-center justify-center pointer-events-none"
        style={{ height: Math.max(0, pullDistance) }}
        initial={false}
      >
        <div className="flex flex-col items-center">
          <motion.div
            animate={{
              rotate: isRefreshing ? 360 : 0,
              scale: pullDistance >= threshold ? 1.2 : 1,
            }}
            transition={{
              rotate: isRefreshing ? { duration: 1, repeat: Infinity, ease: 'linear' } : { duration: 0.2 },
              scale: { duration: 0.2 },
            }}
            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
              pullDistance >= threshold
                ? 'border-primary-400 bg-primary-400/20'
                : 'border-secondary-400 bg-secondary-400/20'
            }`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{ color: pullDistance >= threshold ? '#60a5fa' : '#94a3b8' }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </motion.div>
          
          {pullDistance >= threshold && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-primary-400 mt-2"
            >
              {isRefreshing ? 'Refreshing...' : 'Release to refresh'}
            </motion.p>
          )}
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ transform: `translateY(${Math.max(0, pullDistance)}px)` }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {children}
      </motion.div>
    </div>
  )
}