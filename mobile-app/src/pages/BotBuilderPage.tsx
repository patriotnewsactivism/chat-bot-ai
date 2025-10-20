import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  Save, 
  Play, 
  Settings, 
  MessageSquare,
  Zap,
  Brain,
  Globe,
  Smartphone
} from 'lucide-react'
import { useHapticFeedback } from '../hooks/useHapticFeedback'
import { BotBuilderCanvas } from '../components/bot-builder/BotBuilderCanvas'
import { BotConfigPanel } from '../components/bot-builder/BotConfigPanel'
import { TemplateSelector } from '../components/bot-builder/TemplateSelector'
import { DeploymentOptions } from '../components/bot-builder/DeploymentOptions'

type BuilderView = 'canvas' | 'config' | 'templates' | 'deploy'

export function BotBuilderPage() {
  const navigate = useNavigate()
  const { triggerHaptic } = useHapticFeedback()
  const [currentView, setCurrentView] = useState<BuilderView>('canvas')
  const [botName, setBotName] = useState('My New Bot')
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    triggerHaptic('medium')
    
    // Simulate saving
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSaving(false)
    triggerHaptic('success')
  }

  const handleTest = () => {
    triggerHaptic('medium')
    // Open test modal or navigate to test page
  }

  const viewOptions = [
    { id: 'canvas' as BuilderView, label: 'Build', icon: Zap },
    { id: 'config' as BuilderView, label: 'Configure', icon: Settings },
    { id: 'templates' as BuilderView, label: 'Templates', icon: Brain },
    { id: 'deploy' as BuilderView, label: 'Deploy', icon: Globe },
  ]

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-secondary-700">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              triggerHaptic('light')
              navigate('/home')
            }}
            className="p-2 rounded-lg hover:bg-secondary-800 transition-colors"
          >
            <ArrowLeft size={20} className="text-secondary-300" />
          </button>
          
          <div className="flex-1">
            <input
              type="text"
              value={botName}
              onChange={(e) => setBotName(e.target.value)}
              className="text-lg font-semibold text-white bg-transparent border-none outline-none"
              placeholder="Bot Name"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleTest}
            className="btn btn-ghost px-3 py-2"
          >
            <Play size={16} />
            <span className="ml-1 text-xs">Test</span>
          </button>
          
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="btn btn-primary px-3 py-2"
          >
            <Save size={16} />
            <span className="ml-1 text-xs">
              {isSaving ? 'Saving...' : 'Save'}
            </span>
          </button>
        </div>
      </div>

      {/* View Selector */}
      <div className="flex items-center space-x-1 p-4 border-b border-secondary-700">
        {viewOptions.map((option) => {
          const Icon = option.icon
          return (
            <button
              key={option.id}
              onClick={() => {
                triggerHaptic('light')
                setCurrentView(option.id)
              }}
              className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                currentView === option.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-secondary-800 text-secondary-300 hover:bg-secondary-700'
              }`}
            >
              <Icon size={16} />
              <span className="text-sm font-medium">{option.label}</span>
            </button>
          )
        })}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {currentView === 'canvas' && <BotBuilderCanvas />}
            {currentView === 'config' && <BotConfigPanel />}
            {currentView === 'templates' && <TemplateSelector />}
            {currentView === 'deploy' && <DeploymentOptions />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Quick Actions Bar */}
      <div className="flex items-center justify-around p-4 border-t border-secondary-700 bg-secondary-900/50">
        <button
          onClick={() => triggerHaptic('light')}
          className="flex flex-col items-center space-y-1 text-secondary-400 hover:text-white transition-colors"
        >
          <MessageSquare size={20} />
          <span className="text-xs">Preview</span>
        </button>
        
        <button
          onClick={() => triggerHaptic('light')}
          className="flex flex-col items-center space-y-1 text-secondary-400 hover:text-white transition-colors"
        >
          <Smartphone size={20} />
          <span className="text-xs">Mobile</span>
        </button>
        
        <button
          onClick={() => triggerHaptic('light')}
          className="flex flex-col items-center space-y-1 text-secondary-400 hover:text-white transition-colors"
        >
          <Brain size={20} />
          <span className="text-xs">AI Train</span>
        </button>
      </div>
    </div>
  )
}