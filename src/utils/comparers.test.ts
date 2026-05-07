import { compareJson, compareXml, compareText } from './comparers'

describe('JSON Comparer', () => {
  test('should detect no changes for identical JSON', () => {
    const json1 = '{"name": "John", "age": 30}'
    const json2 = '{"name": "John", "age": 30}'
    const toggles = { ignoreWhitespace: false, caseSensitive: true, ignoreKeyOrder: false }
    
    const result = compareJson(json1, json2, toggles)
    
    expect(result.hasChanges).toBe(false)
    expect(result.added).toBe(0)
    expect(result.removed).toBe(0)
    expect(result.changed).toBe(0)
  })

  test('should detect changes correctly', () => {
    const json1 = '{"name": "John", "age": 30}'
    const json2 = '{"name": "John", "age": 31}'
    const toggles = { ignoreWhitespace: false, caseSensitive: true, ignoreKeyOrder: false }
    
    const result = compareJson(json1, json2, toggles)
    
    expect(result.hasChanges).toBe(true)
    expect(result.changed).toBe(1) // Only age changed
    expect(result.added).toBe(0)
    expect(result.removed).toBe(0)
  })

  test('should ignore key order when toggle is enabled', () => {
    const json1 = '{"name": "John", "age": 30}'
    const json2 = '{"age": 30, "name": "John"}'
    const toggles = { ignoreWhitespace: false, caseSensitive: true, ignoreKeyOrder: true }
    
    const result = compareJson(json1, json2, toggles)
    
    expect(result.hasChanges).toBe(false)
  })

  test('should detect additions', () => {
    const json1 = '{"name": "John"}'
    const json2 = '{"name": "John", "age": 30}'
    const toggles = { ignoreWhitespace: false, caseSensitive: true, ignoreKeyOrder: false }
    
    const result = compareJson(json1, json2, toggles)
    
    expect(result.hasChanges).toBe(true)
    expect(result.added).toBe(1)
  })
})

describe('XML Comparer', () => {
  test('should detect no changes for identical XML', () => {
    const xml1 = '<user><name>John</name><age>30</age></user>'
    const xml2 = '<user><name>John</name><age>30</age></user>'
    const toggles = { ignoreWhitespace: false, caseSensitive: true, ignoreKeyOrder: false }
    
    const result = compareXml(xml1, xml2, toggles)
    
    expect(result.hasChanges).toBe(false)
  })

  test('should detect changes in XML content', () => {
    const xml1 = '<user><name>John</name><age>30</age></user>'
    const xml2 = '<user><name>John</name><age>31</age></user>'
    const toggles = { ignoreWhitespace: false, caseSensitive: true, ignoreKeyOrder: false }
    
    const result = compareXml(xml1, xml2, toggles)
    
    expect(result.hasChanges).toBe(true)
  })

  test('should ignore whitespace when toggle is enabled', () => {
    const xml1 = '<user><name>John</name><age>30</age></user>'
    const xml2 = '<user>  <name>John</name>  <age>30</age>  </user>'
    const toggles = { ignoreWhitespace: true, caseSensitive: true, ignoreKeyOrder: false }
    
    const result = compareXml(xml1, xml2, toggles)
    
    expect(result.hasChanges).toBe(false)
  })
})

describe('Text Comparer', () => {
  test('should detect no changes for identical text', () => {
    const text1 = 'Hello World'
    const text2 = 'Hello World'
    const toggles = { ignoreWhitespace: false, caseSensitive: true, ignoreKeyOrder: false }
    
    const result = compareText(text1, text2, toggles)
    
    expect(result.hasChanges).toBe(false)
    expect(result.added).toBe(0)
    expect(result.removed).toBe(0)
    expect(result.changed).toBe(0)
  })

  test('should detect line changes', () => {
    const text1 = 'Hello World\nLine 2'
    const text2 = 'Hello Universe\nLine 2'
    const toggles = { ignoreWhitespace: false, caseSensitive: true, ignoreKeyOrder: false }
    
    const result = compareText(text1, text2, toggles)
    
    expect(result.hasChanges).toBe(true)
    expect(result.added).toBe(1)
    expect(result.removed).toBe(1)
    expect(result.changed).toBe(0) // No changed lines, just added/removed
  })

  test('should ignore case when toggle is disabled', () => {
    const text1 = 'Hello World'
    const text2 = 'hello world'
    const toggles = { ignoreWhitespace: false, caseSensitive: false, ignoreKeyOrder: false }
    
    const result = compareText(text1, text2, toggles)
    
    expect(result.hasChanges).toBe(false)
  })

  test('should ignore whitespace when toggle is enabled', () => {
    const text1 = 'Hello    World'
    const text2 = 'Hello World'
    const toggles = { ignoreWhitespace: true, caseSensitive: true, ignoreKeyOrder: false }
    
    const result = compareText(text1, text2, toggles)
    
    expect(result.hasChanges).toBe(false)
  })
})
