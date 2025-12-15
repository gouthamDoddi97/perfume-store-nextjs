'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/auth'
import { motion } from 'framer-motion'
import { Lock } from 'lucide-react'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: 'admin' | 'customer'
}

export function ProtectedRoute({ children, requiredRole = 'customer' }: ProtectedRouteProps) {
  const { user, isAuthenticated } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/')
      return
    }

    if (requiredRole === 'admin' && user?.role !== 'admin') {
      router.push('/')
      return
    }
  }, [isAuthenticated, user, requiredRole, router])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Access Denied</h2>
          <p className="text-gray-600 dark:text-gray-300">Please login to access this page</p>
        </motion.div>
      </div>
    )
  }

  if (requiredRole === 'admin' && user?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Lock className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Admin Access Required</h2>
          <p className="text-gray-600 dark:text-gray-300">You don't have permission to access this page</p>
        </motion.div>
      </div>
    )
  }

  return <>{children}</>
}