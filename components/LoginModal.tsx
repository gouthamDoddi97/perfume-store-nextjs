'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Phone, Lock, User } from 'lucide-react'
import { useAuthStore, ADMIN_CREDENTIALS, sendOTP, verifyOTP } from '@/lib/auth'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [loginType, setLoginType] = useState<'customer' | 'admin'>('customer')
  const [step, setStep] = useState<'phone' | 'otp' | 'admin'>('phone')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [adminCredentials, setAdminCredentials] = useState({ username: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const { login } = useAuthStore()

  const handleCustomerLogin = async () => {
    if (step === 'phone') {
      if (!phone || phone.length !== 10) {
        setError('Please enter a valid 10-digit mobile number')
        return
      }
      setLoading(true)
      try {
        await sendOTP(phone)
        setStep('otp')
        setError('')
      } catch (err) {
        setError('Failed to send OTP. Please try again.')
      }
      setLoading(false)
    } else if (step === 'otp') {
      if (!otp || otp.length !== 6) {
        setError('Please enter a valid 6-digit OTP')
        return
      }
      setLoading(true)
      try {
        const isValid = await verifyOTP(phone, otp)
        if (isValid) {
          login({
            id: phone,
            phone: phone,
            role: 'customer'
          })
          onClose()
          resetForm()
        } else {
          setError('Invalid OTP. Please try again.')
        }
      } catch (err) {
        setError('Failed to verify OTP. Please try again.')
      }
      setLoading(false)
    }
  }

  const handleAdminLogin = () => {
    if (!adminCredentials.username || !adminCredentials.password) {
      setError('Please enter both username and password')
      return
    }
    
    if (adminCredentials.username === ADMIN_CREDENTIALS.username && 
        adminCredentials.password === ADMIN_CREDENTIALS.password) {
      login({
        id: 'admin',
        name: 'Admin',
        role: 'admin'
      })
      onClose()
      resetForm()
    } else {
      setError('Invalid admin credentials')
    }
  }

  const resetForm = () => {
    setStep('phone')
    setPhone('')
    setOtp('')
    setAdminCredentials({ username: '', password: '' })
    setError('')
    setLoading(false)
  }

  const handleClose = () => {
    onClose()
    resetForm()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="bg-white dark:bg-luxury-black rounded-2xl w-full max-w-md luxury-shadow dark:dark-luxury-shadow"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-luxury text-2xl font-bold">Login</h2>
                <button onClick={handleClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Login Type Selector */}
              <div className="flex mb-6 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => {setLoginType('customer'); setStep('phone'); setError('')}}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    loginType === 'customer' 
                      ? 'bg-white dark:bg-luxury-black shadow-sm' 
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  Customer
                </button>
                <button
                  onClick={() => {setLoginType('admin'); setStep('admin'); setError('')}}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    loginType === 'admin' 
                      ? 'bg-white dark:bg-luxury-black shadow-sm' 
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  Admin
                </button>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Customer Login */}
              {loginType === 'customer' && (
                <div className="space-y-4">
                  {step === 'phone' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium mb-2">Mobile Number</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="tel"
                            placeholder="Enter 10-digit mobile number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-luxury-darkgray"
                          />
                        </div>
                      </div>
                      <button
                        onClick={handleCustomerLogin}
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-luxury-rosegold to-luxury-gold dark:from-luxury-gold dark:to-yellow-400 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
                      >
                        {loading ? 'Sending OTP...' : 'Send OTP'}
                      </button>
                    </>
                  )}

                  {step === 'otp' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium mb-2">Enter OTP</label>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          OTP sent to +91 {phone}
                        </p>
                        <input
                          type="text"
                          placeholder="Enter 6-digit OTP"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-luxury-darkgray text-center text-lg tracking-widest"
                        />
                        <p className="text-xs text-gray-500 mt-2">Demo OTP: 123456</p>
                      </div>
                      <button
                        onClick={handleCustomerLogin}
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-luxury-rosegold to-luxury-gold dark:from-luxury-gold dark:to-yellow-400 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
                      >
                        {loading ? 'Verifying...' : 'Verify OTP'}
                      </button>
                      <button
                        onClick={() => setStep('phone')}
                        className="w-full text-gray-600 dark:text-gray-400 py-2 text-sm"
                      >
                        Change mobile number
                      </button>
                    </>
                  )}
                </div>
              )}

              {/* Admin Login */}
              {loginType === 'admin' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Username</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Admin username"
                        value={adminCredentials.username}
                        onChange={(e) => setAdminCredentials({...adminCredentials, username: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-luxury-darkgray"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="password"
                        placeholder="Admin password"
                        value={adminCredentials.password}
                        onChange={(e) => setAdminCredentials({...adminCredentials, password: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-luxury-darkgray"
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleAdminLogin}
                    className="w-full bg-gradient-to-r from-luxury-rosegold to-luxury-gold dark:from-luxury-gold dark:to-yellow-400 text-white py-3 rounded-lg font-semibold"
                  >
                    Login as Admin
                  </button>
                  <p className="text-xs text-gray-500 text-center">
                    Demo: admin@moonlight / moonlight2024
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}