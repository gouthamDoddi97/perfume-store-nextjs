// Simple in-memory cache for better performance
class SimpleCache {
  private cache = new Map<string, { data: any; timestamp: number }>()
  private readonly TTL = 60000 // 1 minute

  get(key: string) {
    const item = this.cache.get(key)
    if (!item) return null
    
    if (Date.now() - item.timestamp > this.TTL) {
      this.cache.delete(key)
      return null
    }
    
    return item.data
  }

  set(key: string, data: any) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    })
  }

  clear() {
    this.cache.clear()
  }

  invalidate(pattern: string) {
    for (const key of this.cache.keys()) {
      if (key.includes(pattern)) {
        this.cache.delete(key)
      }
    }
  }
}

export const cache = new SimpleCache()