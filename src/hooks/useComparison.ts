import { useCallback } from 'react'
import { compareJson, compareXml, compareText } from '@/utils/comparers'
import { Mode, ToggleOptions } from '@/types'

export const useComparison = () => {
  const compare = useCallback((
    mode: Mode,
    leftContent: string,
    rightContent: string,
    toggles: ToggleOptions
  ) => {
    switch (mode) {
      case 'json-compare':
        return compareJson(leftContent, rightContent, toggles)
      case 'xml-compare':
        return compareXml(leftContent, rightContent, toggles)
      case 'text-compare':
        return compareText(leftContent, rightContent, toggles)
      default:
        throw new Error(`Comparison not supported for mode: ${mode}`)
    }
  }, [])

  return { compare }
}
