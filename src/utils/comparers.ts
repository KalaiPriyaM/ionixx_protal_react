import * as diff from 'diff'
import * as jsondiffpatch from 'jsondiffpatch'
import { DiffResult, JsonDiffResult, XmlDiffResult, TextDiffResult, DiffLine, ToggleOptions } from '@/types'

export const compareJson = (
  leftContent: string,
  rightContent: string,
  toggles: ToggleOptions
): JsonDiffResult => {
  try {
    const leftParsed = JSON.parse(leftContent)
    const rightParsed = JSON.parse(rightContent)
    
    let leftToCompare = leftParsed
    let rightToCompare = rightParsed
    
    // Apply toggles
    if (toggles.ignoreKeyOrder) {
      leftToCompare = sortObjectKeys(leftToCompare)
      rightToCompare = sortObjectKeys(rightToCompare)
    }
    
    const diffData = jsondiffpatch.diff(leftToCompare, rightToCompare)
    const hasChanges = diffData !== undefined
    
    if (!hasChanges) {
      return {
        hasChanges: false,
        added: 0,
        removed: 0,
        changed: 0,
        leftContent,
        rightContent,
        leftParsed,
        rightParsed,
      }
    }
    
    // Count changes
    const changes = countJsonChanges(diffData)
    
    return {
      hasChanges: true,
      added: changes.added,
      removed: changes.removed,
      changed: changes.changed,
      leftContent,
      rightContent,
      diffData,
      leftParsed,
      rightParsed,
    }
  } catch (error) {
    return {
      hasChanges: true,
      added: 0,
      removed: 0,
      changed: 1,
      leftContent,
      rightContent,
    }
  }
}

export const compareXml = (
  leftContent: string,
  rightContent: string,
  toggles: ToggleOptions
): XmlDiffResult => {
  try {
    const leftParser = new DOMParser()
    const rightParser = new DOMParser()
    const leftParsed = leftParser.parseFromString(leftContent, 'text/xml')
    const rightParsed = rightParser.parseFromString(rightContent, 'text/xml')
    
    const leftNormalized = normalizeXml(leftParsed, toggles)
    const rightNormalized = normalizeXml(rightParsed, toggles)
    
    const diffData = jsondiffpatch.diff(leftNormalized, rightNormalized)
    const hasChanges = diffData !== undefined
    
    if (!hasChanges) {
      return {
        hasChanges: false,
        added: 0,
        removed: 0,
        changed: 0,
        leftContent,
        rightContent,
        leftParsed,
        rightParsed,
      }
    }
    
    const changes = countJsonChanges(diffData)
    
    return {
      hasChanges: true,
      added: changes.added,
      removed: changes.removed,
      changed: changes.changed,
      leftContent,
      rightContent,
      diffData,
      leftParsed,
      rightParsed,
    }
  } catch (error) {
    return {
      hasChanges: true,
      added: 0,
      removed: 0,
      changed: 1,
      leftContent,
      rightContent,
    }
  }
}

export const compareText = (
  leftContent: string,
  rightContent: string,
  toggles: ToggleOptions
): TextDiffResult => {
  let leftToCompare = leftContent
  let rightToCompare = rightContent
  
  // Apply toggles
  if (toggles.ignoreWhitespace) {
    leftToCompare = leftContent.replace(/\s+/g, ' ').trim()
    rightToCompare = rightContent.replace(/\s+/g, ' ').trim()
  }
  
  if (!toggles.caseSensitive) {
    leftToCompare = leftToCompare.toLowerCase()
    rightToCompare = rightToCompare.toLowerCase()
  }
  
  const diffResult = diff.diffLines(leftToCompare, rightToCompare)
  const diffLines: DiffLine[] = []
  let lineNumber = 1
  let added = 0
  let removed = 0
  let changed = 0
  
  for (const part of diffResult) {
    const lines = part.value.split('\n')
    for (let i = 0; i < lines.length - 1; i++) {
      const line = lines[i]
      let type: DiffLine['type'] = 'unchanged'
      
      if (part.added) {
        type = 'added'
        added++
      } else if (part.removed) {
        type = 'removed'
        removed++
      }
      
      diffLines.push({
        lineNumber,
        type,
        content: line,
      })
      
      lineNumber++
    }
  }
  
  return {
    hasChanges: added > 0 || removed > 0,
    added,
    removed,
    changed,
    leftContent: leftToCompare,
    rightContent: rightToCompare,
    diffLines,
  }
}

// Helper functions
const sortObjectKeys = (obj: any): any => {
  if (obj === null || typeof obj !== 'object' || Array.isArray(obj)) {
    return obj
  }
  
  const sorted: any = {}
  const keys = Object.keys(obj).sort()
  
  for (const key of keys) {
    sorted[key] = sortObjectKeys(obj[key])
  }
  
  return sorted
}

const countJsonChanges = (diffData: any): { added: number; removed: number; changed: number } => {
  let added = 0
  let removed = 0
  let changed = 0
  
  const countChanges = (obj: any, path: string = ''): void => {
    if (Array.isArray(obj)) {
      // jsondiffpatch uses arrays to represent changes
      // [oldValue, newValue] means changed
      // [newValue] means added
      // [oldValue, 0, newValue] means array item changed
      if (obj.length === 2 && obj[0] !== 0 && obj[1] !== 0) {
        // This is a change: [oldValue, newValue]
        changed++
      } else if (obj.length === 1) {
        // This is an addition: [newValue]
        added++
      } else if (obj.length === 3 && obj[1] === 0) {
        // This is an array item change: [oldValue, 0, newValue]
        changed++
      } else {
        // Recursively check array items
        for (const item of obj) {
          if (typeof item === 'object' && item !== null) {
            countChanges(item, path)
          }
        }
      }
    } else if (typeof obj === 'object' && obj !== null) {
      // Check object properties
      for (const [key, value] of Object.entries(obj)) {
        if (Array.isArray(value)) {
          countChanges(value, `${path}.${key}`)
        } else if (typeof value === 'object' && value !== null) {
          countChanges(value, `${path}.${key}`)
        }
      }
    }
  }
  
  countChanges(diffData)
  return { added, removed, changed }
}

const normalizeXml = (doc: Document, toggles: ToggleOptions): any => {
  const normalize = (node: Node): any => {
    if (node.nodeType === Node.TEXT_NODE) {
      let text = node.textContent || ''
      if (toggles.ignoreWhitespace) {
        text = text.replace(/\s+/g, ' ').trim()
      }
      if (!toggles.caseSensitive) {
        text = text.toLowerCase()
      }
      return text
    }
    
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element
      const result: any = {
        _tag: element.tagName,
      }
      
      // Add attributes
      if (element.attributes.length > 0) {
        result._attributes = {}
        for (let i = 0; i < element.attributes.length; i++) {
          const attr = element.attributes[i]
          result._attributes[attr.name] = attr.value
        }
      }
      
      // Add children
      const children: any[] = []
      for (let i = 0; i < element.childNodes.length; i++) {
        const child = element.childNodes[i]
        const normalized = normalize(child)
        if (normalized !== null && normalized !== '') {
          children.push(normalized)
        }
      }
      
      if (children.length > 0) {
        result._children = children
      }
      
      return result
    }
    
    return null
  }
  
  return normalize(doc.documentElement)
}
