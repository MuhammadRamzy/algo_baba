import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from 'lucide-react'

interface AlgorithmDetailsProps {
  algorithm: string
  details: {
    name: string
    description: string
    timeComplexity: string
    spaceComplexity: string
  }
  onClose: () => void
}

export default function AlgorithmDetails({ algorithm, details, onClose }: AlgorithmDetailsProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto bg-white">
        <CardHeader className="sticky top-0 bg-white z-10">
          <CardTitle className="flex justify-between items-center">
            <span>{details.name}</span>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Description</h3>
              <p>{details.description}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Time Complexity</h3>
              <p>{details.timeComplexity}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Space Complexity</h3>
              <p>{details.spaceComplexity}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}