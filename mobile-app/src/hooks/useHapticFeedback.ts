import { useCallback } from 'react'

export function useHapticFeedback() {
  const triggerHaptic = useCallback((type: 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error') => {
    // Check if haptic feedback is supported
    if (!('vibrate' in navigator)) {
      return
    }

    const patterns = {
      light: [10],
      medium: [20],
      heavy: [40],
      success: [10, 50, 10],
      warning: [20, 30, 20],
      error: [30, 20, 30, 20, 30],
    }

    try {
      navigator.vibrate(patterns[type])
    } catch (error) {
      // Silently fail if haptic feedback is not supported
      console.debug('Haptic feedback not supported:', error)
    }
  }, [])

  return { triggerHaptic }
}