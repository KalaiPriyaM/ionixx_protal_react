import { copyToClipboard, downloadFile } from './formatters'

// Mock navigator.clipboard
Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: jest.fn(),
  },
  writable: true,
})

// Mock document.execCommand
Object.defineProperty(document, 'execCommand', {
  value: jest.fn(),
  writable: true,
})

// Mock URL.createObjectURL and URL.revokeObjectURL
Object.defineProperty(URL, 'createObjectURL', {
  value: jest.fn(() => 'mock-url'),
  writable: true,
})

Object.defineProperty(URL, 'revokeObjectURL', {
  value: jest.fn(),
  writable: true,
})

describe('Formatter Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    
    // Reset navigator.clipboard mock
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: jest.fn(),
      },
      writable: true,
    })
    
    // Reset document.execCommand mock
    Object.defineProperty(document, 'execCommand', {
      value: jest.fn(),
      writable: true,
    })
  })

  describe('copyToClipboard', () => {
    test('should copy text to clipboard', async () => {
      const text = 'test content'
      
      await copyToClipboard(text)
      
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(text)
    })

    test('should handle clipboard errors gracefully', async () => {
      const text = 'test content'
      
      // Mock clipboard API to be undefined (fallback to execCommand)
      Object.defineProperty(navigator, 'clipboard', {
        value: undefined,
        writable: true,
      })
      
      // Mock execCommand to return false (simulate failure)
      ;(document.execCommand as jest.Mock).mockReturnValue(false)
      
      const result = await copyToClipboard(text)
      
      expect(result).toBe(false)
      expect(document.execCommand).toHaveBeenCalledWith('copy')
    })
  })

  describe('downloadFile', () => {
    test('should create and download file', () => {
      const content = 'test content'
      const filename = 'test.txt'
      const mimeType = 'text/plain'
      
      // Mock document.createElement and click
      const mockLink = {
        href: '',
        download: '',
        click: jest.fn(),
      }
      const createElementSpy = jest.spyOn(document, 'createElement').mockReturnValue(mockLink as any)
      const appendChildSpy = jest.spyOn(document.body, 'appendChild').mockImplementation()
      const removeChildSpy = jest.spyOn(document.body, 'removeChild').mockImplementation()
      
      downloadFile(content, filename, mimeType)
      
      expect(URL.createObjectURL).toHaveBeenCalledWith(expect.any(Blob))
      expect(createElementSpy).toHaveBeenCalledWith('a')
      expect(mockLink.href).toBe('mock-url')
      expect(mockLink.download).toBe(filename)
      expect(mockLink.click).toHaveBeenCalled()
      expect(appendChildSpy).toHaveBeenCalledWith(mockLink)
      expect(removeChildSpy).toHaveBeenCalledWith(mockLink)
      expect(URL.revokeObjectURL).toHaveBeenCalledWith('mock-url')
      
      createElementSpy.mockRestore()
      appendChildSpy.mockRestore()
      removeChildSpy.mockRestore()
    })

    test('should use default filename and mime type', () => {
      const content = 'test content'
      
      const mockLink = {
        href: '',
        download: '',
        click: jest.fn(),
      }
      const createElementSpy = jest.spyOn(document, 'createElement').mockReturnValue(mockLink as any)
      const appendChildSpy = jest.spyOn(document.body, 'appendChild').mockImplementation()
      const removeChildSpy = jest.spyOn(document.body, 'removeChild').mockImplementation()
      
      downloadFile(content)
      
      expect(createElementSpy).toHaveBeenCalledWith('a')
      // The download property should be set by the function
      expect(mockLink.download).toBe('download.txt')
      
      createElementSpy.mockRestore()
      appendChildSpy.mockRestore()
      removeChildSpy.mockRestore()
    })
  })
})
