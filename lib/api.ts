// API utility functions with caching
const cache = new Map()
const CACHE_DURATION = 60000 // 1 minute

const getCachedData = (key: string) => {
  const cached = cache.get(key)
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data
  }
  return null
}

const setCachedData = (key: string, data: any) => {
  cache.set(key, { data, timestamp: Date.now() })
}

export const api = {
  // Products
  getProducts: async (filters?: {
    category?: string
    subCategory?: string
    bestSellers?: boolean
    featured?: boolean
    heroCarousel?: boolean
  }) => {
    try {
      const params = new URLSearchParams()
      if (filters?.category) params.append('category', filters.category)
      if (filters?.subCategory) params.append('subCategory', filters.subCategory)
      if (filters?.bestSellers) params.append('bestSellers', 'true')
      if (filters?.featured) params.append('featured', 'true')
      if (filters?.heroCarousel) params.append('heroCarousel', 'true')
      
      const cacheKey = `products-${params.toString()}`
      const cached = getCachedData(cacheKey)
      if (cached) return cached
      
      const res = await fetch(`/api/products?${params.toString()}`)
      const data = await res.json()
      const result = Array.isArray(data) ? data : []
      
      setCachedData(cacheKey, result)
      return result
    } catch (error) {
      console.error('API Error:', error)
      return []
    }
  },

  createProduct: async (product: any) => {
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    })
    return res.json()
  },

  getProduct: async (id: string) => {
    const res = await fetch(`/api/products/${id}`)
    return res.json()
  },

  updateProduct: async (id: string, product: any) => {
    const res = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    })
    return res.json()
  },

  deleteProduct: async (id: string) => {
    const res = await fetch(`/api/products/${id}`, {
      method: 'DELETE'
    })
    return res.json()
  },

  // Orders
  getOrders: async () => {
    const res = await fetch('/api/orders')
    return res.json()
  },

  createOrder: async (order: any) => {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order)
    })
    return res.json()
  },

  // Offers
  getOffers: async () => {
    const res = await fetch('/api/offers')
    return res.json()
  },

  createOffer: async (offer: any) => {
    const res = await fetch('/api/offers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(offer)
    })
    return res.json()
  },

  // Contact
  getContacts: async () => {
    const res = await fetch('/api/contact')
    return res.json()
  },

  createContact: async (contact: any) => {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contact)
    })
    return res.json()
  },

  updateContactStatus: async (id: string, status: string) => {
    const res = await fetch('/api/contact', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status })
    })
    return res.json()
  },

  updateOrderStatus: async (orderId: string, status: string) => {
    const res = await fetch('/api/orders', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId, status })
    })
    return res.json()
  },

  // Seed database
  seedDatabase: async () => {
    const res = await fetch('/api/admin/seed', {
      method: 'POST'
    })
    return res.json()
  }
}