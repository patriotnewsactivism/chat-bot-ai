import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface ChartContainerProps {
  data: Array<{
    name: string
    conversations: number
    users: number
  }>
  selectedMetric: string
}

export function ChartContainer({ data, selectedMetric }: ChartContainerProps) {
  const getChartData = () => {
    switch (selectedMetric) {
      case 'conversations':
        return data.map(item => ({
          name: item.name,
          value: item.conversations,
        }))
      case 'users':
        return data.map(item => ({
          name: item.name,
          value: item.users,
        }))
      default:
        return data.map(item => ({
          name: item.name,
          value: item.conversations,
        }))
    }
  }

  const chartData = getChartData()

  return (
    <div className="card p-4">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis 
              dataKey="name" 
              stroke="#64748b"
              fontSize={12}
            />
            <YAxis 
              stroke="#64748b"
              fontSize={12}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '8px',
                color: '#f8fafc',
              }}
              labelStyle={{ color: '#94a3b8' }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: '#3b82f6', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 pt-4 border-t border-secondary-700">
        <div className="flex items-center justify-between text-sm">
          <span className="text-secondary-400">
            {selectedMetric === 'conversations' ? 'Total Conversations' : 'Active Users'}
          </span>
          <span className="text-white font-medium">
            {chartData.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  )
}