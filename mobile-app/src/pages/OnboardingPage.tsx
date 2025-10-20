import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, Check, Zap, MessageSquare, BarChart3, Globe } from 'lucide-react'
import { useHapticFeedback } from '../hooks/useHapticFeedback'

interface OnboardingPageProps {
  onComplete: () => void
}

const onboardingSteps = [
  {
    id: 'welcome',
    title: 'Welcome to BuildMyBot',
    description: 'Create powerful AI chatbots for your business in minutes, not weeks.',
    icon: Zap,
    color: 'bg-primary-600',
  },
  {
    id: 'build',
    title: 'Build with Ease',
    description: 'Our visual drag-and-drop builder makes creating bots intuitive and fun.',
    icon: MessageSquare,
    color: 'bg-blue-600',
  },
  {
    id: 'analytics',
    title: 'Track Performance',
    description: 'Monitor your bots with real-time analytics and insights.',
    icon: BarChart3,
    color: 'bg-green-600',
  },
  {
    id: 'deploy',
    title: 'Deploy Anywhere',
    description: 'Publish your bots to websites, apps, and messaging platforms.',
    icon: Globe,
    color: 'bg-purple-600',
  },
]

export function OnboardingPage({ onComplete }: OnboardingPageProps) {
  const { triggerHaptic } = useHapticFeedback()
  const [currentStep, setCurrentStep] = useState(0)
  const [isCompleting, setIsCompleting] = useState(false)

  const handleNext = () => {
    triggerHaptic('light')
    
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handlePrevious = () => {
    triggerHaptic('light')
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = async () => {
    setIsCompleting(true)
    triggerHaptic('success')
    
    // Simulate completion process
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    localStorage.setItem('hasOnboarded', 'true')
    onComplete()
  }

  const handleSkip = () => {
    triggerHaptic('medium')
    localStorage.setItem('hasOnboarded', 'true')
    onComplete()
  }

  const currentStepData = onboardingSteps[currentStep]
  const Icon = currentStepData.icon

  return (
    <div className="mobile-container flex flex-col h-full">
      {/* Skip Button */}
      <div className="flex justify-end p-4">
        <button
          onClick={handleSkip}
          className="text-secondary-400 hover:text-white transition-colors text-sm font-medium"
        >
          Skip
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="text-center max-w-sm"
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`w-24 h-24 ${currentStepData.color} rounded-3xl flex items-center justify-center mx-auto mb-8`}
            >
              <Icon size={40} className="text-white" />
            </motion.div>

            {/* Text Content */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-3xl font-bold text-white mb-4"
            >
              {currentStepData.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg text-secondary-300 mb-12 leading-relaxed"
            >
              {currentStepData.description}
            </motion.p>
          </motion.div>
        </AnimatePresence>

        {/* Progress Indicators */}
        <div className="flex space-x-2 mb-8">
          {onboardingSteps.map((_, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentStep
                  ? 'w-8 bg-primary-400'
                  : index < currentStep
                  ? 'w-2 bg-primary-600'
                  : 'w-2 bg-secondary-600'
              }`}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center space-x-4 w-full max-w-sm">
          {currentStep > 0 && (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrevious}
              disabled={isCompleting}
              className="btn btn-ghost flex-1 px-6 py-3"
            >
              <ChevronLeft size={16} />
              <span>Previous</span>
            </motion.button>
          )}

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            disabled={isCompleting}
            className={`btn btn-primary flex-1 px-6 py-3 ${
              currentStep === 0 ? 'ml-auto' : ''
            }`}
          >
            {isCompleting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                />
                <span className="ml-2">Setting up...</span>
              </>
            ) : currentStep === onboardingSteps.length - 1 ? (
              <>
                <Check size={16} />
                <span className="ml-2">Get Started</span>
              </>
            ) : (
              <>
                <span>Next</span>
                <ChevronRight size={16} />
              </>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  )
}