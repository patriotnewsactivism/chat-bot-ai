import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Globe, Smartphone, MessageSquare, Code, Check, Copy, ExternalLink } from 'lucide-react'
import { useHapticFeedback } from '../../hooks/useHapticFeedback'

const deploymentPlatforms = [
  {
    id: 'website',
    name: 'Website',
    description: 'Embed on your website with a simple snippet',
    icon: Globe,
    color: 'bg-blue-600',
    features: ['Widget embed', 'Custom styling', 'Mobile responsive'],
    difficulty: 'Easy',
  },
  {
    id: 'mobile-app',
    name: 'Mobile App',
    description: 'Integrate into iOS and Android apps',
    icon: Smartphone,
    color: 'bg-green-600',
    features: ['Native SDK', 'Offline support', 'Push notifications'],
    difficulty: 'Medium',
  },
  {
    id: 'messaging',
    name: 'Messaging Apps',
    description: 'Connect to WhatsApp, Telegram, and more',
    icon: MessageSquare,
    color: 'bg-purple-600',
    features: ['Multi-platform', 'Rich media', 'Quick replies'],
    difficulty: 'Easy',
  },
  {
    id: 'api',
    name: 'API Integration',
    description: 'Connect via REST API for custom solutions',
    icon: Code,
    color: 'bg-orange-600',
    features: ['Full control', 'Custom logic', 'Webhooks'],
    difficulty: 'Advanced',
  },
]

export function DeploymentOptions() {
  const { triggerHaptic } = useHapticFeedback }
  const [selectedPlatform, setSelectedPlatform] = useState('website')
  const [showCode, setShowCode] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleDeploy = () => {
    triggerHaptic('success')
    // Handle deployment
  }

  const handleCopyCode = () => {
    triggerHaptic('light')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getEmbedCode = () => {
    switch (selectedPlatform) {
      case 'website':
        return `<script src="https://buildmybot.app/widget.js" data-bot-id="your-bot-id"></script>`
      case 'api':
        return `curl -X POST https://api.buildmybot.app/v1/chat \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"message": "Hello", "bot_id": "your-bot-id"}'`
      default:
        return '// Integration code will be provided'
    }
  }

  const selectedPlatformData = deploymentPlatforms.find(p => p.id === selectedPlatform)
  const Icon = selectedPlatformData?.icon || Globe

  return (    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-secondary-700">
        <h2 className="text-xl font-bold text-white mb-2">
          Deploy Your Bot
        </h2>
        <p className="text-sm text-secondary-400">
          Choose where you want to deploy your AI bot
        </p>
      </div>

      {/* Platform Selection */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Platform Grid */}
        <div className="grid grid-cols-2 gap-3">
          {deploymentPlatforms.map((platform) => {
            const PlatformIcon = platform.icon
            return (
              <motion.button
                key={platform.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  triggerHaptic('light')
                  setSelectedPlatform(platform.id)
                  setShowCode(false)
                }}
                className={`card p-4 text-left transition-all ${
                  selectedPlatform === platform.id
                    ? 'border-primary-600 bg-primary-600/10'
                    : 'border-secondary-700 hover:border-secondary-600'
                }`}
              >
                <div className={`w-10 h-10 ${platform.color} rounded-lg flex items-center justify-center mb-3`}>
                  <PlatformIcon size={20} className="text-white" />
                </div>
                
                <h3 className="font-semibold text-white mb-1">
                  {platform.name}
                </h3>
                
                <p className="text-xs text-secondary-400 mb-2">
                  {platform.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    platform.difficulty === 'Easy' ? 'bg-green-400/20 text-green-400' :
                    platform.difficulty === 'Medium' ? 'bg-yellow-400/20 text-yellow-400' :
                    'bg-red-400/20 text-red-400'
                  }`}>
                    {platform.difficulty}
                  </span>
                  
                  {selectedPlatform === platform.id && (
                    <Check size={16} className="text-primary-400" />
                  )}
                </div>
              </motion.button>
            )
          })}
        </div>

        {/* Platform Details */}
        {selectedPlatformData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="card p-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-12 h-12 ${selectedPlatformData.color} rounded-xl flex items-center justify-center`}>
                  <Icon size={24} className="text-white" />
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {selectedPlatformData.name}
                  </h3>
                  <p className="text-sm text-secondary-400">
                    {selectedPlatformData.description}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-white">Features:</h4>
                <div className="space-y-2">
                  {selectedPlatformData.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Check size={16} className="text-green-400" />
                      <span className="text-sm text-secondary-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Code Section */}
            {(selectedPlatform === 'website' || selectedPlatform === 'api') && (
              <div className="card p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-white">Integration Code</h4>
                  <button
                    onClick={() => setShowCode(!showCode)}
                    className="btn btn-ghost px-3 py-1 text-xs"
                  >
                    {showCode ? 'Hide' : 'Show'} Code
                  </button>
                </div>

                {showCode && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-3"
                  >
                    <div className="bg-secondary-900 rounded-lg p-3 relative">
                      <pre className="text-xs text-secondary-300 overflow-x-auto">
                        {getEmbedCode()}
                      </pre>
                      
                      <button
                        onClick={handleCopyCode}
                        className="absolute top-2 right-2 p-1 rounded bg-secondary-700 hover:bg-secondary-600 transition-colors"
                      >
                        {copied ? (
                          <Check size={14} className="text-green-400" />
                        ) : (
                          <Copy size={14} className="text-secondary-400" />
                        )}
                      </button>
                    </div>
                    
                    <p className="text-xs text-secondary-400">
                      Copy this code and add it to your {selectedPlatform === 'website' ? 'website' : 'application'}
                    </p>
                  </motion.div>
                )}
              </div>
            )}

            {/* Deployment Actions */}
            <div className="space-y-3">
              <button
                onClick={handleDeploy}
                className="w-full btn btn-primary"
              >
                <ExternalLink size={16} />
                <span className="ml-2">Deploy to {selectedPlatformData.name}</span>
              </button>
              
              <button className="w-full btn btn-secondary">
                View Documentation
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
