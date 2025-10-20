import React from 'react'
import { useHapticFeedback } from '../../hooks/useHapticFeedback'

interface TimeRangeSelectorProps {
  value: string
  onChange: (value: string) => void
}

const timeRanges = [
  { value: '24h', label: '24H' },
  { value: '7d', label: '7D' },
  { value: '30d', label: '30D' },
  { value: '90d', label: '90D' },
]

export function TimeRangeSelector({ value, onChange }: TimeRangeSelectorProps) {
  const { triggerHaptic } = useHapticFeedback()

  return (
    <div className="flex items-center space-x-2 bg-secondary-800/50 rounded-xl p-1">
      {timeRanges.map((range) => (
        <button
          key={range.value}
          onClick={() => {
            triggerHaptic('light')
            onChange(range.value)
          }}
          className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
            value === range.value
              ? 'bg-primary-600 text-white'
              : 'text-secondary-400 hover:text-white hover:bg-secondary-700'
          }`}
        >
          {range.label}
        </button>
      ))}
    </div>
  )
}