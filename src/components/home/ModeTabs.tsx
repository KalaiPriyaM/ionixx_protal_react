import React from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'
import { MODES } from '@/constants'
import { Mode } from '@/types'

interface ModeTabsProps {
  activeMode: Mode
  onModeChange: (mode: Mode) => void
  className?: string
}

export const ModeTabs: React.FC<ModeTabsProps> = ({
  activeMode,
  onModeChange,
  className,
}) => {
  return (
    <div className={cn('flex space-x-1 bg-gray-100 p-1 rounded-lg', className)}>
      {MODES.map((mode) => (
        <Button
          key={mode.id}
          variant="ghost"
          size="sm"
          onClick={() => onModeChange(mode.id as Mode)}
          className={cn(
            'flex-1 rounded-md transition-colors',
            activeMode === mode.id
              ? 'bg-purple-600 text-white shadow-sm hover:bg-purple-700 hover:text-white'
              : 'bg-white text-gray-700 hover:bg-purple-100'
          )}
        >
          {mode.label}
        </Button>
      ))}
    </div>
  )
}
