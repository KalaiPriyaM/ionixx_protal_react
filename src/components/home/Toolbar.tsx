import React from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/toggle'
import { cn } from '@/utils/cn'
import { TOGGLE_OPTIONS } from '@/constants'
import { ToggleOptions, Mode } from '@/types'
import { RefreshCw, CheckCircle, Search } from 'lucide-react'

interface ToolbarProps {
  mode: Mode
  toggles: ToggleOptions
  onToggleChange: (toggleId: string) => void
  onValidate: () => void
  onCompare: () => void
  isLoading: boolean
  canValidate: boolean
  canCompare: boolean
  className?: string
}

export const Toolbar: React.FC<ToolbarProps> = ({
  mode,
  toggles,
  onToggleChange,
  onValidate,
  onCompare,
  isLoading,
  canValidate,
  canCompare,
  className,
}) => {
  const isValidationMode = mode.includes('validate')
  const isCompareMode = mode.includes('compare')

  // Define which toggles to show for each mode
  const getTogglesForMode = (mode: Mode) => {
    switch (mode) {
      case 'json-validate':
      case 'xml-validate':
        return [] // No toggles for validation modes
      case 'json-compare':
        return TOGGLE_OPTIONS // All 3 toggles for JSON Compare
      case 'xml-compare':
      case 'text-compare':
        return TOGGLE_OPTIONS.filter(toggle => 
          toggle.id === 'ignoreWhitespace' || toggle.id === 'caseSensitive'
        ) // Only 2 toggles for XML Compare and Text Compare
      default:
        return []
    }
  }

  const availableToggles = getTogglesForMode(mode)

  return (
    <div className={cn('flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0', className)}>
      {availableToggles.length > 0 && (
        <div className="flex flex-wrap gap-6">
          {availableToggles.map((toggle) => (
            <div key={toggle.id} className="flex items-center space-x-3">
              <Switch
                id={toggle.id}
                checked={toggles[toggle.id as keyof ToggleOptions]}
                onCheckedChange={() => onToggleChange(toggle.id)}
              />
              <Label htmlFor={toggle.id} className="text-sm font-medium cursor-pointer">
                {toggle.label}
              </Label>
            </div>
          ))}
        </div>
      )}

      <div className={cn('flex space-x-3', availableToggles.length === 0 && 'ml-auto')}>
        {isValidationMode && (
          <Button
            onClick={onValidate}
            disabled={!canValidate || isLoading}
            className="bg-gradient-to-r from-blue-500 via-violet-400 to-purple-500 hover:from-blue-600 hover:via-violet-500 hover:to-purple-600"
          >
            {isLoading ? (
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <CheckCircle className="mr-2 h-4 w-4" />
            )}
            Validate
          </Button>
        )}

        {isCompareMode && (
          <Button
            onClick={onCompare}
            disabled={!canCompare || isLoading}
            className="bg-gradient-to-r from-blue-500 via-violet-400 to-purple-500 hover:from-blue-600 hover:via-violet-500 hover:to-purple-600"
          >
            {isLoading ? (
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Search className="mr-2 h-4 w-4" />
            )}
            Compare
          </Button>
        )}
      </div>
    </div>
  )
}
