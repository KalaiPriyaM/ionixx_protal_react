export default class Storage {
  setItem(key: string, value: any) {
    sessionStorage.setItem(key, JSON.stringify(value))
    
    // Also set cookie for token to work with middleware
    if (key === 'token' && typeof document !== 'undefined') {
      document.cookie = `token=${value}; path=/; max-age=86400; SameSite=Lax`
    }
  }

  getItem<T = any>(key: string): T | null {
    const value = sessionStorage.getItem(key)
    if (value) {
      try {
        return JSON.parse(value) as T
      } catch (e) {
        console.error('Parsing error in getItem:', e)
        return null
      }
    }
    return null
  }

  deleteItem(key: string) {
    sessionStorage.removeItem(key)
  }

  clearStorage() {
    sessionStorage.clear()
    
    // Also clear token cookie
    if (typeof document !== 'undefined') {
      document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    }
  }
}
