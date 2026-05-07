import { loadAppState, saveAppState, clearAppState } from './storage'

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

describe('Storage Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('loadAppState', () => {
    test('should return default state when no saved data', () => {
      localStorageMock.getItem.mockReturnValue(null)
      
      const result = loadAppState()
      
      expect(result).toEqual({
        leftContent: '',
        rightContent: '',
        mode: 'json-validate',
        toggles: {
          ignoreWhitespace: false,
          caseSensitive: true,
          ignoreKeyOrder: false,
        },
      })
    })

    test('should load saved state', () => {
      localStorageMock.getItem
        .mockReturnValueOnce('{"name": "test"}') // leftContent
        .mockReturnValueOnce('{"name": "test2"}') // rightContent
        .mockReturnValueOnce('json-compare') // mode
        .mockReturnValueOnce('{"ignoreWhitespace": true, "caseSensitive": false, "ignoreKeyOrder": true}') // toggles
      
      const result = loadAppState()
      
      expect(result).toEqual({
        leftContent: '{"name": "test"}',
        rightContent: '{"name": "test2"}',
        mode: 'json-compare',
        toggles: {
          ignoreWhitespace: true,
          caseSensitive: false,
          ignoreKeyOrder: true,
        },
      })
    })

    test('should handle invalid JSON in toggles', () => {
      localStorageMock.getItem
        .mockReturnValueOnce('')
        .mockReturnValueOnce('')
        .mockReturnValueOnce('json-validate')
        .mockReturnValueOnce('invalid json')
      
      const result = loadAppState()
      
      expect(result.toggles).toEqual({
        ignoreWhitespace: false,
        caseSensitive: true,
        ignoreKeyOrder: false,
      })
    })
  })

  describe('saveAppState', () => {
    test('should save all state properties', () => {
      const state = {
        leftContent: '{"test": "data"}',
        rightContent: '{"test2": "data2"}',
        mode: 'json-compare' as const,
        toggles: {
          ignoreWhitespace: true,
          caseSensitive: false,
          ignoreKeyOrder: true,
        },
      }
      
      saveAppState(state)
      
      expect(localStorageMock.setItem).toHaveBeenCalledWith('diff-validate-left-content', '{"test": "data"}')
      expect(localStorageMock.setItem).toHaveBeenCalledWith('diff-validate-right-content', '{"test2": "data2"}')
      expect(localStorageMock.setItem).toHaveBeenCalledWith('diff-validate-mode', 'json-compare')
      expect(localStorageMock.setItem).toHaveBeenCalledWith('diff-validate-toggles', JSON.stringify(state.toggles))
    })

    test('should only save defined properties', () => {
      const state = {
        leftContent: 'test',
      }
      
      saveAppState(state)
      
      expect(localStorageMock.setItem).toHaveBeenCalledTimes(1)
      expect(localStorageMock.setItem).toHaveBeenCalledWith('diff-validate-left-content', 'test')
    })
  })

  describe('clearAppState', () => {
    test('should clear all storage keys', () => {
      clearAppState()
      
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('diff-validate-left-content')
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('diff-validate-right-content')
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('diff-validate-mode')
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('diff-validate-toggles')
    })
  })
})
