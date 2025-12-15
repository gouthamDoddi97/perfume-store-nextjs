'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Lock, User, Eye, EyeOff } from 'lucide-react'
import { useAuthStore, ADMIN_CREDENTIALS } from '@/lib/auth'
import Image from 'next/image'

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuthStore()
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!credentials.username || !credentials.password) {
      setError('Please enter both username and password')
      return
    }

    setLoading(true)
    setError('')

    setTimeout(() => {
      if (credentials.username === ADMIN_CREDENTIALS.username && 
          credentials.password === ADMIN_CREDENTIALS.password) {
        login({
          id: 'admin',
          name: 'Admin',
          role: 'admin'
        })
        router.push('/admin')
      } else {
        setError('Invalid username or password')
      }
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-luxury-cream via-luxury-rosegold/20 to-luxury-cream dark:from-luxury-black dark:via-luxury-gold/10 dark:to-luxury-darkgray">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-luxury-black rounded-2xl p-8 w-full max-w-md luxury-shadow dark:dark-luxury-shadow"
      >
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Image
              src="/logo.jpg"
              alt="Moonlight Attar Perfumes"
              width={50}
              height={50}
              className="rounded-full object-cover"
            />
            <h1 className="font-luxury text-xl font-bold bg-gradient-to-r from-luxury-rosegold to-luxury-gold dark:from-luxury-gold dark:to-yellow-400 bg-clip-text text-transparent">
              Admin Panel
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Access your dashboard</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-luxury-darkgray"
                placeholder="Enter username"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-luxury-darkgray"
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-luxury-rosegold to-luxury-gold dark:from-luxury-gold dark:to-yellow-400 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
          >
            {loading ? 'Signing In...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-sm font-medium mb-2">Demo Credentials:</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">Username: admin@moonlight</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">Password: moonlight2024</p>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => router.push('/')}
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-luxury-rosegold transition-colors"
          >
            ← Back to Website
          </button>
        </div>
      </motion.div>
    </div>
  )
}