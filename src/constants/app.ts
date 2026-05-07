export const APP_CONFIG = {
  name: 'IONIXX',
  title: 'Diff & Validate (Comparison and validation tool)',
  tagline: 'Comparison and validation tool',
  maxFileSize: 2 * 1024 * 1024, // 2MB
  storageKeys: {
    leftContent: 'diff-validate-left-content',
    rightContent: 'diff-validate-right-content',
    mode: 'diff-validate-mode',
    toggles: 'diff-validate-toggles',
  },
} as const

export const MODES = [
  { id: 'json-validate', label: 'JSON Validate' },
  { id: 'json-compare', label: 'JSON Compare' },
  { id: 'xml-validate', label: 'XML Validate' },
  { id: 'xml-compare', label: 'XML Compare' },
  { id: 'text-compare', label: 'Text Compare' },
]

export const TOGGLE_OPTIONS = [
  { id: 'ignoreWhitespace', label: 'Ignore Whitespace' },
  { id: 'caseSensitive', label: 'Case Sensitive' },
  { id: 'ignoreKeyOrder', label: 'Ignore Key Order' },
] as const
