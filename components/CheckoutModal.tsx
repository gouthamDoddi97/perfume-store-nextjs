'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MapPin, User, Mail, Phone } from 'lucide-react'
import { useAuthStore } from '@/lib/auth'
import { useCartStore } from '@/lib/store'

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
}

interface CustomerInfo {
  name: string
  email: string
  address: string
  city: string
  pincode: string
  state: string
}

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { user } = useAuthStore()
  const { items, getTotalPrice, clearCart } = useCartStore()
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: user?.name || '',
    email: user?.email || '',
    address: '',
    city: '',
    pincode: '',
    state: ''
  })
  const [loading, setLoading] = useState(false)

  const subtotal = getTotalPrice()
  const shipping = subtotal > 2999 ? 0 : 199
  const total = subtotal + shipping

  const handlePlaceOrder = async () => {
    if (!customerInfo.name || !customerInfo.address || !customerInfo.city || !customerInfo.pincode) {
      alert('Please fill all required fields')
      return
    }

    setLoading(true)
    
    try {
      const orderData = {
        customer: {
          phone: user?.phone,
          ...customerInfo
        },
        items: items.map(item => ({
          productId: item.id,
          name: item.name,
          size: item.size,
          price: item.price,
          quantity: item.quantity
        })),
        subtotal: subtotal,
        shipping: shipping,
        total: total
      }

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      })

      const result = await response.json()
      
      if (response.ok) {
        alert(`Order placed successfully! Order ID: ${result.orderId}`)
        clearCart()
        onClose()
      } else {
        alert('Failed to place order. Please try again.')
      }
    } catch (error) {
      console.error('Order placement failed:', error)
      alert('Failed to place order. Please try again.')
    }
    
    setLoading(false)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="bg-white dark:bg-luxury-black rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto luxury-shadow dark:dark-luxury-shadow"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-luxury text-2xl font-bold">Checkout</h2>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Customer Information */}
                <div>
                  <h3 className="font-semibold text-lg mb-4">Delivery Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name *</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          value={customerInfo.name}
                          onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-luxury-darkgray"
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="email"
                          value={customerInfo.email}
                          onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-luxury-darkgray"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="tel"
                          value={user?.phone || ''}
                          disabled
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-800"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Address *</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                        <textarea
                          value={customerInfo.address}
                          onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-luxury-darkgray h-20"
                          placeholder="Enter your complete address"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">City *</label>
                        <input
                          type="text"
                          value={customerInfo.city}
                          onChange={(e) => setCustomerInfo({...customerInfo, city: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-luxury-darkgray"
                          placeholder="City"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Pincode *</label>
                        <input
                          type="text"
                          value={customerInfo.pincode}
                          onChange={(e) => setCustomerInfo({...customerInfo, pincode: e.target.value.replace(/\D/g, '').slice(0, 6)})}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-luxury-darkgray"
                          placeholder="Pincode"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">State</label>
                      <input
                        type="text"
                        value={customerInfo.state}
                        onChange={(e) => setCustomerInfo({...customerInfo, state: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-luxury-darkgray"
                        placeholder="State"
                      />
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <div>
                  <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
                  <div className="bg-gray-50 dark:bg-luxury-darkgray rounded-lg p-4 space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {item.size} × {item.quantity}
                          </p>
                        </div>
                        <p className="font-semibold">₹{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    ))}
                    
                    <div className="border-t border-gray-200 dark:border-gray-600 pt-4 space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>₹{subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span className={shipping === 0 ? 'text-green-500' : ''}>
                          {shipping === 0 ? 'Free' : `₹${shipping}`}
                        </span>
                      </div>
                      <div className="flex justify-between font-bold text-lg border-t border-gray-200 dark:border-gray-600 pt-2">
                        <span>Total</span>
                        <span className="text-luxury-rosegold dark:text-luxury-gold">
                          ₹{total.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    className="w-full mt-6 bg-gradient-to-r from-luxury-rosegold to-luxury-gold dark:from-luxury-gold dark:to-yellow-400 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
                  >
                    {loading ? 'Placing Order...' : `Place Order - ₹${total.toLocaleString()}`}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}