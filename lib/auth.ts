'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  phone?: string
  name?: string
  email?: string
  role: 'customer' | 'admin'
}

interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  login: (user: User) => void
  logout: () => void
  updateUser: (userData: Partial<User>) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      
      login: (user) => {
        set({ user, isAuthenticated: true })
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false })
      },
      
      updateUser: (userData) => {
        const currentUser = get().user
        if (currentUser) {
          set({ user: { ...currentUser, ...userData } })
        }
      }
    }),
    {
      name: 'auth-storage'
    }
  )
)

// Admin credentials (in production, this should be in a secure backend)
export const ADMIN_CREDENTIALS = {
  username: 'admin@moonlight',
  password: 'moonlight2024'
}

// Mock OTP service
export const sendOTP = async (phone: string): Promise<boolean> => {
  console.log(`Sending OTP to ${phone}`)
  // In production, integrate with SMS service like Twilio
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), 1000)
  })
}

export const verifyOTP = async (phone: string, otp: string): Promise<boolean> => {
  console.log(`Verifying OTP ${otp} for ${phone}`)
  // Mock verification - in production, verify with backend
  return otp === '123456'
}