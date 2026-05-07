import { APP_CONFIG } from '@/constants'
import { AppState, ToggleOptions, Mode } from '@/types'

export const storage = {
  get: (key: string): string | null => {
    if (typeof window === 'undefined') return null
    try {
      return localStorage.getItem(key)
    } catch (error) {
      console.warn('Failed to read from localStorage:', error)
      return null
    }
  },

  set: (key: string, value: string): void => {
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem(key, value)
    } catch (error) {
      console.warn('Failed to write to localStorage:', error)
    }
  },

  remove: (key: string): void => {
    if (typeof window === 'undefined') return
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.warn('Failed to remove from localStorage:', error)
    }
  },

  clear: (): void => {
    if (typeof window === 'undefined') return
    try {
      localStorage.clear()
    } catch (error) {
      console.warn('Failed to clear localStorage:', error)
    }
  },
}

export const loadAppState = (): Partial<AppState> => {
  const leftContent = storage.get(APP_CONFIG.storageKeys.leftContent) || ''
  const rightContent = storage.get(APP_CONFIG.storageKeys.rightContent) || ''
  const mode = (storage.get(APP_CONFIG.storageKeys.mode) as Mode) || 'json-validate'
  
  let toggles: ToggleOptions = {
    ignoreWhitespace: false,
    caseSensitive: true,
    ignoreKeyOrder: false,
  }
  
  const savedToggles = storage.get(APP_CONFIG.storageKeys.toggles)
  if (savedToggles) {
    try {
      toggles = { ...toggles, ...JSON.parse(savedToggles) }
    } catch (error) {
      console.warn('Failed to parse saved toggles:', error)
    }
  }

  return {
    leftContent,
    rightContent,
    mode,
    toggles,
  }
}

export const saveAppState = (state: Partial<AppState>): void => {
  if (state.leftContent !== undefined) {
    storage.set(APP_CONFIG.storageKeys.leftContent, state.leftContent)
  }
  if (state.rightContent !== undefined) {
    storage.set(APP_CONFIG.storageKeys.rightContent, state.rightContent)
  }
  if (state.mode !== undefined) {
    storage.set(APP_CONFIG.storageKeys.mode, state.mode)
  }
  if (state.toggles !== undefined) {
    storage.set(APP_CONFIG.storageKeys.toggles, JSON.stringify(state.toggles))
  }
}

export const clearAppState = (): void => {
  Object.values(APP_CONFIG.storageKeys).forEach(key => {
    storage.remove(key)
  })
}
