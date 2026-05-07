import { useState, useEffect, useCallback } from 'react'
import { AppState, Mode, ToggleOptions } from '@/types'
import { loadAppState, saveAppState, clearAppState } from '@/lib/storage'

export const useAppState = () => {
  const [state, setState] = useState<AppState>(() => ({
    mode: 'json-validate',
    leftContent: '',
    rightContent: '',
    toggles: {
      ignoreWhitespace: false,
      caseSensitive: true,
      ignoreKeyOrder: false,
    },
    results: null,
    isLoading: false,
  }))

  // Load saved state on mount
  useEffect(() => {
    const savedState = loadAppState()
    setState(prev => ({ ...prev, ...savedState }))
  }, [])

  // Save state when it changes
  useEffect(() => {
    saveAppState(state)
  }, [state])

  const updateMode = useCallback((mode: Mode) => {
    setState(prev => ({ ...prev, mode }))
  }, [])

  const updateLeftContent = useCallback((content: string) => {
    setState(prev => ({ ...prev, leftContent: content }))
  }, [])

  const updateRightContent = useCallback((content: string) => {
    setState(prev => ({ ...prev, rightContent: content }))
  }, [])

  const updateToggles = useCallback((toggles: Partial<ToggleOptions>) => {
    setState(prev => ({ ...prev, toggles: { ...prev.toggles, ...toggles } }))
  }, [])

  const setResults = useCallback((results: AppState['results']) => {
    setState(prev => ({ ...prev, results }))
  }, [])

  const setLoading = useCallback((isLoading: boolean) => {
    setState(prev => ({ ...prev, isLoading }))
  }, [])

  const clearAll = useCallback(() => {
    clearAppState()
    setState({
      mode: 'json-validate',
      leftContent: '',
      rightContent: '',
      toggles: {
        ignoreWhitespace: false,
        caseSensitive: true,
        ignoreKeyOrder: false,
      },
      results: null,
      isLoading: false,
    })
  }, [])

  return {
    state,
    updateMode,
    updateLeftContent,
    updateRightContent,
    updateToggles,
    setResults,
    setLoading,
    clearAll,
  }
}
