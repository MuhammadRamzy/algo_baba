import * as React from "react"

interface TooltipProps {
  children: React.ReactNode
  content: React.ReactNode
}

const Tooltip: React.FC<TooltipProps> & {
  Provider: React.FC<{ children: React.ReactNode }>
  Trigger: React.FC<{ children: React.ReactNode }>
  Content: React.FC<{ children: React.ReactNode }>
} = ({ children, content }) => {
  const [isVisible, setIsVisible] = React.useState(false)

  return (
    <span className="relative inline-block">
      <span
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </span>
      {isVisible && (
        <span className="absolute z-10 px-2 py-1 text-sm text-white bg-black rounded-md bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2">
          {content}
        </span>
      )}
    </span>
  )
}

Tooltip.Provider = ({ children }) => <>{children}</>
Tooltip.Trigger = ({ children }) => <>{children}</>
Tooltip.Content = ({ children }) => <>{children}</>

export { Tooltip, Tooltip as TooltipProvider, Tooltip as TooltipTrigger, Tooltip as TooltipContent }