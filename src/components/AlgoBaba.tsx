'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, SkipForward, SkipBack, RefreshCw, Github, ChevronsLeft, ChevronsRight, Maximize, Minimize } from 'lucide-react'
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
  const [controlPosition, setControlPosition] = useState('bottom')
  const [isAdvancedEdit, setIsAdvancedEdit] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const visualizationRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFullscreen) {
        switch (e.key) {
          case ' ':
            e.preventDefault()
            setPlaying(prev => !prev)
            break
          case 'ArrowLeft':
            handlePrev()
            break
          case 'ArrowRight':
            handleNext()
            break
          case 'Home':
            handleFirst()
            break
          case 'End':
            handleLast()
            break
          case 'r':
            generateNewArray()
            break
          case 'Escape':
            setIsFullscreen(false)
            break
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isFullscreen, playing, currentStep, steps])

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
  const handleFirst = () => setCurrentStep(0)
  const handleLast = () => setCurrentStep(steps.length - 1)

  const handleDrag = (e: React.DragEvent) => {
    if (visualizationRef.current) {
      const rect = visualizationRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      const threshold = 50 // pixels from the edge

      if (y < threshold) setControlPosition('top')
      else if (y > rect.height - threshold) setControlPosition('bottom')
      else if (x < threshold) setControlPosition('left')
      else if (x > rect.width - threshold) setControlPosition('right')
      else setControlPosition('center')
    }
  }

  const getControlStyles = () => {
    const baseStyles = "absolute p-4 bg-white shadow-lg rounded-lg cursor-move"
    switch (controlPosition) {
      case 'top':
        return `${baseStyles} top-4 left-1/2 transform -translate-x-1/2 flex`
      case 'bottom':
        return `${baseStyles} bottom-4 left-1/2 transform -translate-x-1/2 flex`
      case 'left':
        return `${baseStyles} left-4 top-1/2 transform -translate-y-1/2 flex-col`
      case 'right':
        return `${baseStyles} right-4 top-1/2 transform -translate-y-1/2 flex-col`
      default:
        return `${baseStyles} top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex`
    }
  }

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      visualizationRef.current?.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
    setIsFullscreen(!isFullscreen)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">AlgoBaba</h1>
        <a href="https://github.com/MuhammadRamzy" target="_blank" rel="noopener noreferrer">
          <Github className="h-6 w-6" />
        </a>
      </header>
      <div className="flex-grow flex gap-4">
        {!isFullscreen && (
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
            steps={steps}
            setSteps={setSteps}
          />
        )}
        <Card className="flex-grow bg-white shadow-md relative" ref={visualizationRef}>
          <CardContent className="p-6 h-full">
            <VisualizationPanel
              steps={steps}
              currentStep={currentStep}
              speed={speed}
              algorithm={selectedAlgo}
            />
            <div className={getControlStyles()} draggable onDragEnd={handleDrag}>
              <Button onClick={handleFirst} variant="outline" size="icon" title="First Step (Home)">
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button onClick={handlePrev} disabled={currentStep === 0} variant="outline" size="icon" title="Previous Step (Left Arrow)">
                <SkipBack className="h-4 w-4" />
              </Button>
              <Button onClick={playing ? handlePause : handlePlay} variant="outline" size="icon" title="Play/Pause (Space)">
                {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button onClick={handleNext} disabled={currentStep === steps.length - 1} variant="outline" size="icon" title="Next Step (Right Arrow)">
                <SkipForward className="h-4 w-4" />
              </Button>
              <Button onClick={handleLast} variant="outline" size="icon" title="Last Step (End)">
                <ChevronsRight className="h-4 w-4" />
              </Button>
              <Button onClick={generateNewArray} variant="outline" size="icon" title="Generate New Array (R)">
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button onClick={toggleFullscreen} variant="outline" size="icon" title="Toggle Fullscreen (Esc)">
                {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
              </Button>
              <div className="text-center mt-2 text-sm text-gray-500">
                Step {currentStep + 1} of {steps.length}
              </div>
            </div>
          </CardContent>
        </Card>
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