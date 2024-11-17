import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Info, ExternalLink } from 'lucide-react'
import { Textarea } from "@/components/ui/textarea"

interface ControlPanelProps {
  selectedAlgo: string
  setSelectedAlgo: (algo: string) => void
  arraySize: number
  setArraySize: (size: number) => void
  generateNewArray: () => void
  speed: number
  setSpeed: (speed: number) => void
  algorithmDetails: Record<string, {
    name: string
    category: string
    description: string
    timeComplexity: string
    spaceComplexity: string
  }>
  setShowDetails: (show: boolean) => void
  customInput: string
  setCustomInput: (input: string) => void
  searchValue: number
  setSearchValue: (value: number) => void
  isAdvancedEdit: boolean
  setIsAdvancedEdit: (isAdvanced: boolean) => void
  steps: any[]
  setSteps: (steps: any[]) => void
}

export default function ControlPanel({
  selectedAlgo,
  setSelectedAlgo,
  arraySize,
  setArraySize,
  generateNewArray,
  speed,
  setSpeed,
  algorithmDetails,
  setShowDetails,
  customInput,
  setCustomInput,
  searchValue,
  setSearchValue,
  isAdvancedEdit,
  setIsAdvancedEdit,
  steps,
  setSteps
}: ControlPanelProps) {
  const categories = Array.from(new Set(Object.values(algorithmDetails).map(algo => algo.category)))

  const handleAdvancedEdit = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      const newSteps = JSON.parse(e.target.value)
      setSteps(newSteps)
    } catch (error) {
      console.error("Invalid JSON format")
    }
  }

  return (
    <Card className="w-80 bg-white shadow-md overflow-auto max-h-[calc(100vh-2rem)]">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Controls</span>
          <Button variant="ghost" size="icon" onClick={() => setShowDetails(true)}>
            <Info className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="algorithm">
            <AccordionTrigger>Algorithm Selection</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <Select
                    value={algorithmDetails[selectedAlgo].category}
                    onValueChange={(category) => {
                      const firstAlgoInCategory = Object.keys(algorithmDetails).find(
                        algo => algorithmDetails[algo].category === category
                      )
                      if (firstAlgoInCategory) setSelectedAlgo(firstAlgoInCategory)
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Algorithm</label>
                  <Select value={selectedAlgo} onValueChange={setSelectedAlgo}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select algorithm" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(algorithmDetails)
                        .filter(([_, algo]) => algo.category === algorithmDetails[selectedAlgo].category)
                        .map(([key, algo]) => (
                          <SelectItem key={key} value={key}>
                            {algo.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  variant="link" 
                  className="p-0 h-auto font-normal text-blue-500 flex items-center"
                  onClick={() => setShowDetails(true)}
                >
                  Learn more about this algorithm
                  <ExternalLink className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="data">
            <AccordionTrigger>Data Configuration</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                {['Sorting', 'Searching'].includes(algorithmDetails[selectedAlgo].category) && (
                  <>
                    <div>
                      <label className="text-sm font-medium">Array Size</label>
                      <Slider
                        min={5}
                        max={100}
                        step={1}
                        value={[arraySize]}
                        onValueChange={(value) => setArraySize(value[0])}
                      />
                      <div className="text-sm text-gray-500 mt-1">Current size: {arraySize}</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Custom Input</label>
                      <Input
                        value={customInput}
                        onChange={(e) => setCustomInput(e.target.value)}
                        placeholder="e.g. 5,2,8,12,1"
                      />
                    </div>
                  </>
                )}
                {['Searching'].includes(algorithmDetails[selectedAlgo].category) && (
                  <div>
                    <label className="text-sm font-medium">Search Value</label>
                    <Input
                      type="number"
                      value={searchValue}
                      onChange={(e) => setSearchValue(Number(e.target.value))}
                    />
                  </div>
                )}
                <Button onClick={generateNewArray} className="w-full">Generate New Data</Button>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="visualization">
            <AccordionTrigger>Visualization Settings</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Speed</label>
                  <Slider
                    min={100}
                    max={1000}
                    step={100}
                    value={[speed]}
                    onValueChange={(value) => setSpeed(value[0])}
                  />
                  <div className="text-sm text-gray-500 mt-1">Current speed: {speed}ms</div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={isAdvancedEdit}
                    onCheckedChange={setIsAdvancedEdit}
                  />
                  <label>Advanced Edit</label>
                </div>
                {isAdvancedEdit && (
                  <div>
                    <label className="text-sm font-medium">Edit Steps (JSON)</label>
                    <Textarea
                      value={JSON.stringify(steps, null, 2)}
                      onChange={handleAdvancedEdit}
                      rows={10}
                      className="font-mono text-sm"
                    />
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}