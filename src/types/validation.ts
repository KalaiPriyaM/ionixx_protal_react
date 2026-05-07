export interface ValidationError {
  line: number
  column: number
  message: string
  type: 'syntax' | 'semantic'
}

export interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
  content?: string
}

export interface JsonValidationResult extends ValidationResult {
  parsed?: any
}

export interface XmlValidationResult extends ValidationResult {
  parsed?: Document
}
