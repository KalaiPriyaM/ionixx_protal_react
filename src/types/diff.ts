export interface DiffResult {
  hasChanges: boolean
  added: number
  removed: number
  changed: number
  leftContent: string
  rightContent: string
  diffData?: any
}

export interface JsonDiffResult extends DiffResult {
  leftParsed?: any
  rightParsed?: any
}

export interface XmlDiffResult extends DiffResult {
  leftParsed?: Document
  rightParsed?: Document
}

export interface TextDiffResult extends DiffResult {
  diffLines: DiffLine[]
}

export interface DiffLine {
  lineNumber: number
  type: 'added' | 'removed' | 'unchanged' | 'modified'
  content: string
  leftContent?: string
  rightContent?: string
}
