import { validateJson, validateXml } from './validators'

describe('JSON Validator', () => {
  test('should validate valid JSON', () => {
    const validJson = '{"name": "test", "value": 123}'
    const result = validateJson(validJson)
    
    expect(result.isValid).toBe(true)
    expect(result.errors).toHaveLength(0)
    expect(result.parsed).toEqual({ name: 'test', value: 123 })
  })

  test('should catch invalid JSON with trailing comma', () => {
    const invalidJson = '{"name": "test", "value": 123,}'
    const result = validateJson(invalidJson)
    
    expect(result.isValid).toBe(false)
    expect(result.errors).toHaveLength(1)
    expect(result.errors[0].message).toContain('Expected double-quoted property name')
  })

  test('should catch missing closing brace', () => {
    const invalidJson = '{"name": "test", "value": 123'
    const result = validateJson(invalidJson)
    
    expect(result.isValid).toBe(false)
    expect(result.errors).toHaveLength(1)
    expect(result.errors[0].message).toContain('Expected \',\' or \'}\'')
  })

  test('should catch unquoted key', () => {
    const invalidJson = '{name: "test", "value": 123}'
    const result = validateJson(invalidJson)
    
    expect(result.isValid).toBe(false)
    expect(result.errors).toHaveLength(1)
    expect(result.errors[0].message).toContain('Expected property name')
  })

  test('should handle empty content', () => {
    const result = validateJson('')
    
    expect(result.isValid).toBe(false)
    expect(result.errors).toHaveLength(1)
    expect(result.errors[0].message).toBe('Empty content')
  })
})

describe('XML Validator', () => {
  test('should validate valid XML', () => {
    const validXml = '<root><item>test</item></root>'
    const result = validateXml(validXml)
    
    expect(result.isValid).toBe(true)
    expect(result.errors).toHaveLength(0)
    expect(result.parsed).toBeDefined()
  })

  test('should catch mismatched tags', () => {
    const invalidXml = '<root><item>test</wrong></root>'
    const result = validateXml(invalidXml)
    
    expect(result.isValid).toBe(false)
    expect(result.errors.length).toBeGreaterThan(0)
  })

  test('should catch unclosed tags', () => {
    const invalidXml = '<root><item>test</root>'
    const result = validateXml(invalidXml)
    
    expect(result.isValid).toBe(false)
    expect(result.errors.length).toBeGreaterThan(0)
  })

  test('should handle empty content', () => {
    const result = validateXml('')
    
    expect(result.isValid).toBe(false)
    expect(result.errors).toHaveLength(1)
    expect(result.errors[0].message).toBe('Empty content')
  })
})
