import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Copy, Check } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface TimeComplexity {
  best: string
  average: string
  worst: string
}

interface AlgorithmDetailsProps {
  algorithm: string
  details: {
    name: string
    category: string
    description: string
    timeComplexity: TimeComplexity
    spaceComplexity: string
    advantages: string[]
    disadvantages: string[]
    pseudoCode: string
    sampleCode: Record<string, string>
  }
  onClose: () => void
}

export default function AlgorithmDetails({ algorithm, details, onClose }: AlgorithmDetailsProps) {
  const [selectedLanguage, setSelectedLanguage] = useState(Object.keys(details.sampleCode)[0])
  const [copiedPseudo, setCopiedPseudo] = useState(false)
  const [copiedSample, setCopiedSample] = useState(false)

  const handleCopy = async (text: string, type: 'pseudo' | 'sample') => {
    try {
      await navigator.clipboard.writeText(text)
      if (type === 'pseudo') {
        setCopiedPseudo(true)
        setTimeout(() => setCopiedPseudo(false), 2000)
      } else {
        setCopiedSample(true)
        setTimeout(() => setCopiedSample(false), 2000)
      }
    } catch (err) {
      console.error('Failed to copy text:', err)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white">
        <CardHeader className="sticky top-0 bg-white z-10 border-b">
          <CardTitle className="flex justify-between items-center">
            <div>
              <span className="text-2xl">{details.name}</span>
              <span className="ml-2 text-sm text-gray-500">({details.category})</span>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="whitespace-pre-line text-gray-700">{details.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Time Complexity</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Best Case:</span> {details.timeComplexity.best}</p>
                  <p><span className="font-medium">Average Case:</span> {details.timeComplexity.average}</p>
                  <p><span className="font-medium">Worst Case:</span> {details.timeComplexity.worst}</p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Space Complexity</h3>
                <p>{details.spaceComplexity}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Advantages</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {details.advantages.map((advantage, index) => (
                    <li key={index} className="text-gray-700">{advantage}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Disadvantages</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {details.disadvantages.map((disadvantage, index) => (
                    <li key={index} className="text-gray-700">{disadvantage}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">Pseudocode</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(details.pseudoCode, 'pseudo')}
                  className="h-8 px-2"
                >
                  {copiedPseudo ? (
                    <Check className="h-4 w-4 mr-1" />
                  ) : (
                    <Copy className="h-4 w-4 mr-1" />
                  )}
                  {copiedPseudo ? 'Copied!' : 'Copy'}
                </Button>
              </div>
              <SyntaxHighlighter 
                language="plaintext" 
                style={vscDarkPlus} 
                className="rounded-md"
                customStyle={{ fontSize: '0.9em' }}
              >
                {details.pseudoCode}
              </SyntaxHighlighter>
            </div>

            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                <div className="w-full sm:w-auto">
                  <label htmlFor="language-select" className="block text-sm font-medium mb-1">
                    Select Language:
                  </label>
                  <select
                    id="language-select"
                    className="w-full sm:w-48 border border-gray-300 rounded-md p-2 bg-white"
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                  >
                    {Object.keys(details.sampleCode).map((lang) => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(details.sampleCode[selectedLanguage], 'sample')}
                  className="h-8 px-2"
                >
                  {copiedSample ? (
                    <Check className="h-4 w-4 mr-1" />
                  ) : (
                    <Copy className="h-4 w-4 mr-1" />
                  )}
                  {copiedSample ? 'Copied!' : 'Copy'}
                </Button>
              </div>
              <SyntaxHighlighter 
                language={selectedLanguage.toLowerCase()} 
                style={vscDarkPlus} 
                className="rounded-md"
                customStyle={{ fontSize: '0.9em' }}
              >
                {details.sampleCode[selectedLanguage]}
              </SyntaxHighlighter>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}