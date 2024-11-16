'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, SkipForward, SkipBack, RefreshCw, Github } from 'lucide-react'
import ControlPanel from './ControlPanel'
import VisualizationPanel from './VisualizationPanel'
import AlgorithmDetails from './AlgorithmDetails'
import algorithmDetails from '../data/algorithmDetails.json'
import { bubbleSort } from '../algorithms/sorting/bubbleSort'
import { quickSort } from '../algorithms/sorting/quickSort'
import { mergeSort } from '../algorithms/sorting/mergeSort'
import { linearSearch } from '../algorithms/searching/linearSearch'
import { binarySearch } from '../algorithms/searching/binarySearch'
import { bfs } from '../algorithms/graph/bfs'
import { dfs } from '../algorithms/graph/dfs'
import { prims } from '../algorithms/graph/prims'
import { kruskal } from '../algorithms/graph/kruskal'
import { dijkstra } from '../algorithms/graph/dijkstra'

const algorithms = {
  bubbleSort,
  quickSort,
  mergeSort,
  linearSearch,
  binarySearch,
  bfs,
  dfs,
  prims,
  kruskal,
  dijkstra,
}

export default function AlgoBaba() {
  const [selectedAlgo, setSelectedAlgo] = useState<keyof typeof algorithms>('bubbleSort')
  const [array, setArray] = useState<number[]>([])
  const [arraySize, setArraySize] = useState(10)
  const [steps, setSteps] = useState<any[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [speed, setSpeed] = useState(500)
  const [showDetails, setShowDetails] = useState(false)
  const [customInput, setCustomInput] = useState('')
  const [searchValue, setSearchValue] = useState(0)
  const [controlPosition, setControlPosition] = useState({ x: 20, y: window.innerHeight - 100 })
  const [isAdvancedEdit, setIsAdvancedEdit] = useState(false)

  useEffect(() => {
    generateNewArray()
  }, [arraySize])

  useEffect(() => {
    if (array.length > 0) {
      setSteps(algorithms[selectedAlgo](array, searchValue))
      setCurrentStep(0)
      setPlaying(false)
    }
  }, [selectedAlgo, array, searchValue])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (playing && currentStep < steps.length - 1) {
      timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1)
      }, speed)
    } else if (currentStep === steps.length - 1) {
      setPlaying(false)
    }
    return () => clearTimeout(timer)
  }, [playing, currentStep, steps, speed])

  const generateNewArray = () => {
    if (customInput) {
      const newArray = customInput.split(',').map(Number).filter(n => !isNaN(n))
      setArray(newArray)
    } else {
      const newArray = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 100) + 1)
      setArray(newArray)
    }
  }

  const handlePlay = () => setPlaying(true)
  const handlePause = () => setPlaying(false)
  const handleNext = () => currentStep < steps.length - 1 && setCurrentStep(prev => prev + 1)
  const handlePrev = () => currentStep > 0 && setCurrentStep(prev => prev - 1)

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">AlgoBaba</h1>
        <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
          <Github className="h-6 w-6" />
        </a>
      </header>
      <div className="flex-grow flex flex-col lg:flex-row gap-4">
        <ControlPanel
          selectedAlgo={selectedAlgo}
          setSelectedAlgo={setSelectedAlgo}
          arraySize={arraySize}
          setArraySize={setArraySize}
          generateNewArray={generateNewArray}
          speed={speed}
          setSpeed={setSpeed}
          algorithmDetails={algorithmDetails}
          setShowDetails={setShowDetails}
          customInput={customInput}
          setCustomInput={setCustomInput}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          isAdvancedEdit={isAdvancedEdit}
          setIsAdvancedEdit={setIsAdvancedEdit}
        />
        <Card className="flex-grow bg-white shadow-md">
          <CardContent className="p-6">
            <VisualizationPanel
              steps={steps}
              currentStep={currentStep}
              speed={speed}
              algorithm={selectedAlgo}
            />
          </CardContent>
        </Card>
      </div>
      <div 
        className="fixed p-4 bg-white shadow-lg rounded-lg cursor-move"
        style={{
          left: `${controlPosition.x}px`,
          top: `${controlPosition.y}px`,
        }}
        draggable
        onDragEnd={(e) => {
          setControlPosition({ x: e.clientX, y: e.clientY })
        }}
      >
        <div className="flex justify-center space-x-2">
          <Button onClick={handlePrev} disabled={currentStep === 0} variant="outline" size="icon">
            <SkipBack className="h-4 w-4" />
          </Button>
          <Button onClick={playing ? handlePause : handlePlay} variant="outline" size="icon">
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button onClick={handleNext} disabled={currentStep === steps.length - 1} variant="outline" size="icon">
            <SkipForward className="h-4 w-4" />
          </Button>
          <Button onClick={generateNewArray} variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
        <div className="text-center mt-2 text-sm text-gray-500">
          Step {currentStep + 1} of {steps.length}
        </div>
      </div>
      {showDetails && (
        <AlgorithmDetails
          algorithm={selectedAlgo}
          details={algorithmDetails[selectedAlgo]}
          onClose={() => setShowDetails(false)}
        />
      )}
    </div>
  )
}