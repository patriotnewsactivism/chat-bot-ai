import React from 'react'
import { motion } from 'framer-motion'

interface BotStatusProps {
  status: 'active' | 'inactive' | 'training'
}

export function BotStatus({ status }: BotStatusProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'active':
        return {
          color: 'bg-green-400',
          textColor: 'text-green-400',
          bgColor: 'bg-green-400/20',
          label: 'Active',
          pulse: true,
        }
      case 'inactive':
        return {
          color: 'bg-gray-400',
          textColor: 'text-gray-400',
          bgColor: 'bg-gray-400/20',
          label: 'Inactive',
          pulse: false,
        }
      case 'training':
        return {
          color: 'bg-yellow-400',
          textColor: 'text-yellow-400',
          bgColor: 'bg-yellow-400/20',
          label: 'Training',
          pulse: true,
        }
      default:
        return {
          color: 'bg-gray-400',
          textColor: 'text-gray-400',
          bgColor: 'bg-gray-400/20',
          label: 'Unknown',
          pulse: false,
        }
    }
  }

  const config = getStatusConfig()

  return (
    <div className="flex items-center space-x-1">
      <div className="relative">
        <div className={`w-2 h-2 rounded-full ${config.color}`} />
        {config.pulse && (
          <motion.div
            className={`absolute inset-0 w-2 h-2 rounded-full ${config.color}`}
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </div>
      <span className={`text-xs font-medium ${config.textColor}`}>
        {config.label}
      </span>
    </div>
  )
}