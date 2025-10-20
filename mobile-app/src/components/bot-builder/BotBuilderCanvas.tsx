import React, { useState, useRef } from 'react'
import { motion, PanInfo } from 'framer-motion'
import { Plus, MessageSquare, ArrowRight, Settings, Trash2 } from 'lucide-react'
import { useHapticFeedback } from '../../hooks/useHapticFeedback'

interface BotNode {
  id: string
  type: 'message' | 'question' | 'action' | 'condition'
  content: string
  position: { x: number; y: number }
  connections: string[]
}

interface Connection {
  from: string
  to: string
}

export function BotBuilderCanvas() {
  const { triggerHaptic } = useHapticFeedback()
  const [nodes, setNodes] = useState<BotNode[]>([
    {
      id: '1',
      type: 'message',
      content: 'Hello! How can I help you today?',
      position: { x: 50, y: 100 },
      connections: ['2'],
    },
    {
      id: '2',
      type: 'question',
      content: 'What would you like to know?',
      position: { x: 50, y: 250 },
      connections: [],
    },
  ])
  
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const canvasRef = useRef<HTMLDivElement>(null)

  const handleNodeDrag = (nodeId: string, info: PanInfo) => {
    setNodes(prev => prev.map(node => 
      node.id === nodeId 
        ? { ...node, position: { x: node.position.x + info.delta.x, y: node.position.y + info.delta.y } }
        : node
    ))
  }

  const handleNodeTap = (nodeId: string) => {
    triggerHaptic('light')
    setSelectedNode(nodeId === selectedNode ? null : nodeId)
  }

  const addNode = (type: BotNode['type']) => {
    triggerHaptic('medium')
    const newNode: BotNode = {
      id: Date.now().toString(),
      type,
      content: `New ${type} node`,
      position: { x: 50, y: 400 },
      connections: [],
    }
    setNodes(prev => [...prev, newNode])
  }

  const deleteNode = (nodeId: string) => {
    triggerHaptic('heavy')
    setNodes(prev => prev.filter(node => node.id !== nodeId))
    setSelectedNode(null)
  }

  const getNodeIcon = (type: BotNode['type']) => {
    switch (type) {
      case 'message': return MessageSquare
      case 'question': return Settings
      case 'action': return ArrowRight
      case 'condition': return Settings
      default: return MessageSquare
    }
  }

  const getNodeColor = (type: BotNode['type']) => {
    switch (type) {
      case 'message': return 'bg-blue-600'
      case 'question': return 'bg-purple-600'
      case 'action': return 'bg-green-600'
      case 'condition': return 'bg-yellow-600'
      default: return 'bg-secondary-600'
    }
  }

  return (
    <div className="h-full flex flex-col">
      {/* Canvas Header */}
      <div className="flex items-center justify-between p-4 border-b border-secondary-700">
        <h3 className="text-lg font-semibold text-white">
          Bot Flow Builder
        </h3>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => addNode('message')}
            className="btn btn-ghost px-3 py-2 text-xs"
          >
            <Plus size={16} />
            <span className="ml-1">Message</span>
          </button>
          
          <button
            onClick={() => addNode('question')}
            className="btn btn-ghost px-3 py-2 text-xs"
          >
            <Plus size={16} />
            <span className="ml-1">Question</span>
          </button>
        </div>
      </div>

      {/* Canvas Area */}
      <div 
        ref={canvasRef}
        className="flex-1 relative overflow-auto bg-gradient-to-br from-secondary-900 to-secondary-950"
        style={{ minHeight: '600px' }}
      >
        {/* Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" style={{
            backgroundImage: 'radial-gradient(circle, #475569 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }} />
        </div>

        {/* Nodes */}
        {nodes.map((node) => {
          const Icon = getNodeIcon(node.type)
          return (
            <motion.div
              key={node.id}
              drag
              dragMomentum={false}
              dragElastic={0}
              onDrag={(_, info) => handleNodeDrag(node.id, info)}
              onDragStart={() => triggerHaptic('light')}
              onDragEnd={() => triggerHaptic('light')}
              onTap={() => handleNodeTap(node.id)}
              initial={false}
              animate={{
                scale: selectedNode === node.id ? 1.05 : 1,
                zIndex: selectedNode === node.id ? 10 : 1,
              }}
              whileTap={{ scale: 0.95 }}
              className={`absolute w-32 p-3 rounded-xl shadow-lg cursor-move ${getNodeColor(node.type)} ${
                selectedNode === node.id ? 'ring-2 ring-white' : ''
              }`}
              style={{
                left: `${node.position.x}px`,
                top: `${node.position.y}px`,
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon size={16} className="text-white" />
                {selectedNode === node.id && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteNode(node.id)
                    }}
                    className="p-1 rounded bg-red-500 hover:bg-red-600 transition-colors"
                  >
                    <Trash2 size={12} className="text-white" />
                  </button>
                )}
              </div>
              
              <p className="text-xs text-white font-medium line-clamp-3">
                {node.content}
              </p>
              
              {/* Connection Points */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rounded-full border-2 border-current" />
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rounded-full border-2 border-current" />
            </motion.div>
          )
        })}

        {/* Connections */}
        <svg className="absolute inset-0 pointer-events-none" style={{ width: '100%', height: '100%' }}>
          {nodes.map((node) =>
            node.connections.map((targetId) => {
              const targetNode = nodes.find(n => n.id === targetId)
              if (!targetNode) return null
              
              return (
                <line
                  key={`${node.id}-${targetId}`}
                  x1={node.position.x + 64}
                  y1={node.position.y + 80}
                  x2={targetNode.position.x + 64}
                  y2={targetNode.position.y}
                  stroke="#475569"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
              )
            })
          )}
        </svg>
      </div>

      {/* Bottom Toolbar */}
      <div className="flex items-center justify-around p-4 border-t border-secondary-700 bg-secondary-900/50">
        <button
          onClick={() => triggerHaptic('light')}
          className="flex flex-col items-center space-y-1 text-secondary-400 hover:text-white transition-colors"
        >
          <Plus size={20} />
          <span className="text-xs">Add Node</span>
        </button>
        
        <button
          onClick={() => triggerHaptic('light')}
          className="flex flex-col items-center space-y-1 text-secondary-400 hover:text-white transition-colors"
        >
          <ArrowRight size={20} />
          <span className="text-xs">Connect</span>
        </button>
        
        <button
          onClick={() => triggerHaptic('light')}
          className="flex flex-col items-center space-y-1 text-secondary-400 hover:text-white transition-colors"
        >
          <Settings size={20} />
          <span className="text-xs">Settings</span>
        </button>
      </div>
    </div>
  )
}