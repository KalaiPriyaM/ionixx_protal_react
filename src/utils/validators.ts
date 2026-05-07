import { ValidationError, ValidationResult, JsonValidationResult, XmlValidationResult } from '@/types'

export const validateJson = (content: string): JsonValidationResult => {
  const errors: ValidationError[] = []
  
  if (!content.trim()) {
    return {
      isValid: false,
      errors: [{ line: 1, column: 1, message: 'Empty content', type: 'syntax' }],
    }
  }

  try {
    const parsed = JSON.parse(content)
    return {
      isValid: true,
      errors: [],
      parsed,
      content,
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    
    // Try to extract line and column from error message
    const lineMatch = errorMessage.match(/position (\d+)/)
    const line = lineMatch ? parseInt(lineMatch[1]) : 1
    
    // Simple column estimation based on position
    const lines = content.substring(0, line).split('\n')
    const column = lines[lines.length - 1].length + 1
    
    errors.push({
      line,
      column,
      message: errorMessage,
      type: 'syntax',
    })

    return {
      isValid: false,
      errors,
      content,
    }
  }
}

export const validateXml = (content: string): XmlValidationResult => {
  const errors: ValidationError[] = []
  
  if (!content.trim()) {
    return {
      isValid: false,
      errors: [{ line: 1, column: 1, message: 'Empty content', type: 'syntax' }],
    }
  }

  try {
    const parser = new DOMParser()
    const parsed = parser.parseFromString(content, 'text/xml')
    
    // Check for parsing errors
    const parseError = parsed.querySelector('parsererror')
    if (parseError) {
      const errorText = parseError.textContent || 'XML parsing error'
      const lineMatch = errorText.match(/line (\d+)/)
      const columnMatch = errorText.match(/column (\d+)/)
      
      errors.push({
        line: lineMatch ? parseInt(lineMatch[1]) : 1,
        column: columnMatch ? parseInt(columnMatch[1]) : 1,
        message: errorText,
        type: 'syntax',
      })

      return {
        isValid: false,
        errors,
        content,
      }
    }

    // Check for unclosed tags
    const openTags: string[] = []
    const lines = content.split('\n')
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      const tagMatches = line.match(/<\/?[^>]+>/g) || []
      
      for (const tag of tagMatches) {
        if (tag.startsWith('</')) {
          // Closing tag
          const tagName = tag.slice(2, -1).split(' ')[0]
          const lastOpenTag = openTags.pop()
          if (lastOpenTag !== tagName) {
            errors.push({
              line: i + 1,
              column: line.indexOf(tag) + 1,
              message: `Mismatched closing tag: expected </${lastOpenTag}>, found </${tagName}>`,
              type: 'semantic',
            })
          }
        } else if (!tag.endsWith('/>')) {
          // Opening tag (not self-closing)
          const tagName = tag.slice(1, -1).split(' ')[0]
          openTags.push(tagName)
        }
      }
    }

    if (openTags.length > 0) {
      errors.push({
        line: lines.length,
        column: 1,
        message: `Unclosed tag: <${openTags[openTags.length - 1]}>`,
        type: 'semantic',
      })
    }

    return {
      isValid: errors.length === 0,
      errors,
      parsed,
      content,
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown XML parsing error'
    errors.push({
      line: 1,
      column: 1,
      message: errorMessage,
      type: 'syntax',
    })

    return {
      isValid: false,
      errors,
      content,
    }
  }
}
