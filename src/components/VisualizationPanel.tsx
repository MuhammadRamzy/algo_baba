import React from 'react'

interface Step {
  array: number[]
  comparing: number[]
  swapping: boolean
  current?: number
  found?: boolean
  visited?: number[]
  queue?: number[]
  stack?: number[]
  mst?: [number, number][]
  distances?: number[]
}

interface VisualizationPanelProps {
  steps: Step[]
  currentStep: number
  speed: number
  algorithm: string
}

export default function VisualizationPanel({ steps, currentStep, speed, algorithm }: VisualizationPanelProps) {
  const step = steps[currentStep] || { array: [], comparing: [], swapping: false }
  const maxValue = Math.max(...step.array)

  const renderSortingVisualization = () => (
    <div className="h-full flex items-end justify-center space-x-1">
      {step.array.map((value, index) => {
        const height = (value / maxValue) * 100
        const isComparing = step.comparing.includes(index)
        const isSwapping = isComparing && step.swapping

        return (
          <div
            key={index}
            className="w-8 transition-all duration-300 flex flex-col items-center"
            style={{ height: '100%' }}
          >
            <div 
              className="w-full"
              style={{
                height: `${height}%`,
                backgroundColor: isSwapping ? 'rgb(239, 68, 68)' : isComparing ? 'rgb(234, 179, 8)' : 'rgb(59, 130, 246)'
              }}
            />
            <span className="text-xs text-center block mt-1">{value}</span>
          </div>
        )
      })}
    </div>
  )

  const renderSearchingVisualization = () => (
    <div className="h-full flex items-center justify-center space-x-1">
      {step.array.map((value, index) => {
        const isCurrent = index === step.current
        const isFound = isCurrent && step.found

        return (
          <div
            key={index}
            className="flex flex-col items-center"
          >
            <div
              className={`w-12 h-12 flex items-center justify-center border-2 ${
                isFound ? 'border-green-500 bg-green-100' :
                isCurrent ? 'border-yellow-500 bg-yellow-100' :
                'border-blue-300 bg-blue-50'
              }`}
            >
              {value}
            </div>
            <span className="text-xs mt-1">{index}</span>
          </div>
        )
      })}
    </div>
  )

  const renderGraphVisualization = () => (
    <div className="h-full flex items-center justify-center">
      <svg width="100%" height="100%" viewBox="0 0 300 200" preserveAspectRatio="xMidYMid meet">
        {step.array.map((_, index) => {
          const x = 150 + 100 * Math.cos((2 * Math.PI * index) / step.array.length)
          const y = 100 + 80 * Math.sin((2 * Math.PI * index) / step.array.length)
          const isVisited = step.visited?.includes(index)
          const isInQueue = step.queue?.includes(index)
          const isInStack = step.stack?.includes(index)

          return (
            <g key={index}>
              <circle
                cx={x}
                cy={y}
                r="20"
                fill={isVisited ? 'rgb(134, 239, 172)' : isInQueue || isInStack ? 'rgb(253, 224, 71)' : 'rgb(147, 197, 253)'}
                stroke="rgb(30, 64, 175)"
                strokeWidth="2"
              />
              <text x={x} y={y} textAnchor="middle" dy=".3em" fill="rgb(30, 64, 175)">
                {index}
              </text>
            </g>
          )
        })}
        {step.mst && step.mst.map(([from, to], index) => {
          const x1 = 150 + 100 * Math.cos((2 * Math.PI * from) / step.array.length)
          const y1 = 100 + 80 * Math.sin((2 * Math.PI * from) / step.array.length)
          const x2 = 150 + 100 * Math.cos((2 * Math.PI * to) / step.array.length)
          const y2 = 100 + 80 * Math.sin((2 * Math.PI * to) / step.array.length)
          return (
            <line
              key={index}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="rgb(220, 38, 38)"
              strokeWidth="2"
            />
          )
        })}
      </svg>
    </div>
  )

  const renderVisualization = () => {
    switch (algorithm) {
      case 'bubbleSort':
      case 'quickSort':
      case 'mergeSort':
        return renderSortingVisualization()
      case 'linearSearch':
      case 'binarySearch':
        return renderSearchingVisualization()
      case 'bfs':
      case 'dfs':
      case 'prims':
      case 'kruskal':
      case 'dijkstra':
        return renderGraphVisualization()
      default:
        return null
    }
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      {renderVisualization()}
    </div>
  )
}