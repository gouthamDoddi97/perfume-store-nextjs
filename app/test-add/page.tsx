'use client'

import { useState } from 'react'

export default function TestAdd() {
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const testAddProduct = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Test Product',
          category: 'Perfume',
          size: '50ml',
          price: 2999,
          stock: 10,
          description: 'Test product description'
        })
      })
      
      const data = await response.json()
      setResult(JSON.stringify(data, null, 2))
    } catch (error) {
      setResult('Error: ' + error.message)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">Test Product Addition</h1>
      
      <button
        onClick={testAddProduct}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        {loading ? 'Adding...' : 'Test Add Product'}
      </button>
      
      <pre className="bg-gray-100 p-4 rounded overflow-auto">
        {result || 'Click button to test'}
      </pre>
    </div>
  )
}