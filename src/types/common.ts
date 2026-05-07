export type Mode = 'json-validate' | 'json-compare' | 'xml-validate' | 'xml-compare' | 'text-compare'

export interface ToggleOptions {
  ignoreWhitespace: boolean
  caseSensitive: boolean
  ignoreKeyOrder: boolean
}

export interface FileUpload {
  name: string
  content: string
  size: number
}

export interface AppState {
  mode: Mode
  leftContent: string
  rightContent: string
  toggles: ToggleOptions
  results: any | null
  isLoading: boolean
}
