import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Save, Upload, Brain, Settings, Play } from 'lucide-react'
import { useHapticFeedback } from '../../hooks/useHapticFeedback'

export function BotConfigPanel() {
  const { triggerHaptic } = useHapticFeedback()
  const [config, setConfig] = useState({
    name: 'My New Bot',
    description: 'A helpful AI assistant',
    personality: 'friendly',
    language: 'english',
    responseTime: 'fast',
    knowledgeBase: '',
    welcomeMessage: 'Hello! How can I help you today?',
    errorMessage: 'Sorry, I didn\'t understand that. Could you please rephrase?',
  })

  const handleSave = () => {
    triggerHaptic('success')
    // Save configuration
  }

  const handleTest = () => {
    triggerHaptic('medium')
    // Test bot configuration
  }

  const handleUpload = () => {
    triggerHaptic('light')
    // Upload knowledge base
  }

  return (
    <div className="h-full overflow-y-auto p-4 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        {/* Basic Information */}
        <div className="card p-4">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Settings size={20} className="mr-2 text-primary-400" />
            Basic Information
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-secondary-300 mb-2">
                Bot Name
              </label>
              <input
                type="text"
                value={config.name}
                onChange={(e) => setConfig({ ...config, name: e.target.value })}
                className="input"
                placeholder="Enter bot name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-secondary-300 mb-2">
                Description
              </label>
              <textarea
                value={config.description}
                onChange={(e) => setConfig({ ...config, description: e.target.value })}
                className="input min-h-[80px] resize-none"
                placeholder="Describe your bot's purpose"
              />
            </div>
          </div>
        </div>

        {/* Personality Settings */}
        <div className="card p-4">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Brain size={20} className="mr-2 text-primary-400" />
            Personality
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-secondary-300 mb-2">
                Personality Type
              </label>
              <select
                value={config.personality}
                onChange={(e) => setConfig({ ...config, personality: e.target.value })}
                className="input"
              >
                <option value="friendly">Friendly</option>
                <option value="professional">Professional</option>
                <option value="casual">Casual</option>
                <option value="formal">Formal</option>
                <option value="enthusiastic">Enthusiastic</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-secondary-300 mb-2">
                Language
              </label>
              <select
                value={config.language}
                onChange={(e) => setConfig({ ...config, language: e.target.value })}
                className="input"
              >
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
                <option value="german">German</option>
                <option value="chinese">Chinese</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-secondary-300 mb-2">
                Response Speed
              </label>
              <select
                value={config.responseTime}
                onChange={(e) => setConfig({ ...config, responseTime: e.target.value })}
                className="input"
              >
                <option value="instant">Instant</option>
                <option value="fast">Fast</option>
                <option value="normal">Normal</option>
                <option value="thoughtful">Thoughtful</option>
              </select>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="card p-4">
          <h3 className="text-lg font-semibold text-white mb-4">
            Custom Messages
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-secondary-300 mb-2">
                Welcome Message
              </label>
              <textarea
                value={config.welcomeMessage}
                onChange={(e) => setConfig({ ...config, welcomeMessage: e.target.value })}
                className="input min-h-[80px] resize-none"
                placeholder="First message users see"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-secondary-300 mb-2">
                Error Message
              </label>
              <textarea
                value={config.errorMessage}
                onChange={(e) => setConfig({ ...config, errorMessage: e.target.value })}
                className="input min-h-[80px] resize-none"
                placeholder="Message when bot doesn't understand"
              />
            </div>
          </div>
        </div>

        {/* Knowledge Base */}
        <div className="card p-4">
          <h3 className="text-lg font-semibold text-white mb-4">
            Knowledge Base
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-secondary-300 mb-2">
                Upload Documents
              </label>
              <div className="border-2 border-dashed border-secondary-600 rounded-xl p-8 text-center">
                <Upload size={32} className="text-secondary-400 mx-auto mb-3" />
                <p className="text-secondary-300 mb-2">
                  Drop files here or tap to upload
                </p>
                <p className="text-xs text-secondary-400">
                  PDF, DOC, TXT files up to 10MB
                </p>
                <button
                  onClick={handleUpload}
                  className="mt-4 btn btn-secondary"
                >
                  Choose Files
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={handleTest}
            className="flex-1 btn btn-secondary"
          >
            <Test size={16} />
            <span className="ml-2">Test Bot</span>
          </button>
          
          <button
            onClick={handleSave}
            className="flex-1 btn btn-primary"
          >
            <Save size={16} />
            <span className="ml-2">Save Config</span>
          </button>
        </div>
      </motion.div>
    </div>
  )
}