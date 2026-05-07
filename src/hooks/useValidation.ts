import { useCallback } from 'react'
import { validateJson, validateXml } from '@/utils/validators'
import { Mode } from '@/types'

export const useValidation = () => {
  const validate = useCallback((mode: Mode, content: string) => {
    switch (mode) {
      case 'json-validate':
        return validateJson(content)
      case 'xml-validate':
        return validateXml(content)
      default:
        throw new Error(`Validation not supported for mode: ${mode}`)
    }
  }, [])

  return { validate }
}
