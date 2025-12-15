'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Database, CheckCircle, AlertCircle } from 'lucide-react'

export default function AdminSetup() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const seedDatabase = async () => {
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/admin/seed', {
        method: 'POST'
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setSuccess(true)
      } else {
        setError(data.error || 'Failed to seed database')
      }
    } catch (err) {
      setError('Connection error. Make sure MongoDB is running.')
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-luxury-cream via-luxury-rosegold/20 to-luxury-cream dark:from-luxury-black dark:via-luxury-gold/10 dark:to-luxury-darkgray">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-luxury-black rounded-2xl p-8 w-full max-w-md luxury-shadow dark:dark-luxury-shadow text-center"
      >
        <Database className="w-16 h-16 text-luxury-rosegold dark:text-luxury-gold mx-auto mb-6" />
        
        <h1 className="font-luxury text-2xl font-bold mb-4">Database Setup</h1>
        
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Initialize your database with sample products and admin user.
        </p>

        {success ? (
          <div className="space-y-4">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
            <h3 className="font-semibold text-lg text-green-600">Database Ready!</h3>
            <div className="space-y-2 text-sm">
              <p>✅ Admin user created</p>
              <p>✅ Sample products added</p>
            </div>
            <a
              href="/admin/login"
              className="inline-block bg-gradient-to-r from-luxury-rosegold to-luxury-gold text-white px-6 py-3 rounded-lg font-semibold mt-4"
            >
              Go to Admin Login
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {error && (
              <div className="flex items-center space-x-2 text-red-600 bg-red-100 p-3 rounded-lg">
                <AlertCircle className="w-5 h-5" />
                <span className="text-sm">{error}</span>
              </div>
            )}
            
            <button
              onClick={seedDatabase}
              disabled={loading}
              className="w-full bg-gradient-to-r from-luxury-rosegold to-luxury-gold text-white py-3 rounded-lg font-semibold disabled:opacity-50"
            >
              {loading ? 'Setting up...' : 'Initialize Database'}
            </button>
          </div>
        )}
      </motion.div>
    </div>
  )
}