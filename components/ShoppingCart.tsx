'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { useCartStore } from '@/lib/store'
import { useAuthStore } from '@/lib/auth'
import { CheckoutModal } from './CheckoutModal'
import { LoginModal } from './LoginModal'

export function ShoppingCart() {
  const [showCheckout, setShowCheckout] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const { items, updateQuantity, removeItem, getTotalPrice } = useCartStore()
  const { isAuthenticated } = useAuthStore()

  const subtotal = getTotalPrice()
  const shipping = subtotal > 2999 ? 0 : 199
  const total = subtotal + shipping

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Discover our amazing fragrances and add them to your cart
        </p>
        <Link href="/" className="inline-block bg-gradient-to-r from-luxury-rosegold to-luxury-gold dark:from-luxury-gold dark:to-yellow-400 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300">
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Cart Items */}
      <div className="lg:col-span-2 space-y-4">
        {items.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white dark:bg-luxury-black rounded-2xl p-6 luxury-shadow dark:dark-luxury-shadow"
          >
            <div className="flex items-center space-x-4">
              <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-gray-500 dark:text-gray-400">{item.size}</p>
                <p className="text-luxury-rosegold dark:text-luxury-gold font-semibold">
                  ₹{item.price.toLocaleString()}
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Minus size={16} />
                </button>
                
                <span className="w-8 text-center font-semibold">{item.quantity}</span>
                
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Plus size={16} />
                </button>
              </div>
              
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:text-red-700 p-2"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-1">
        <div className="bg-white dark:bg-luxury-black rounded-2xl p-6 luxury-shadow dark:dark-luxury-shadow sticky top-24">
          <h3 className="font-semibold text-xl mb-6">Order Summary</h3>
          
          <div className="space-y-4 mb-6">
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
            
            {shipping === 0 && (
              <p className="text-sm text-green-500">
                🎉 You saved ₹199 on shipping!
              </p>
            )}
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span className="text-luxury-rosegold dark:text-luxury-gold">
                  ₹{total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => isAuthenticated ? setShowCheckout(true) : setShowLogin(true)}
            className="w-full bg-gradient-to-r from-luxury-rosegold to-luxury-gold dark:from-luxury-gold dark:to-yellow-400 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 mb-4"
          >
            {isAuthenticated ? 'Proceed to Checkout' : 'Login to Checkout'}
          </button>
          
          <Link href="/" className="block w-full text-center border-2 border-luxury-rosegold dark:border-luxury-gold text-luxury-rosegold dark:text-luxury-gold py-3 rounded-xl font-semibold hover:bg-luxury-rosegold hover:text-white dark:hover:bg-luxury-gold dark:hover:text-black transition-all duration-300">
            Continue Shopping
          </Link>
        </div>
      </div>
      
      <CheckoutModal isOpen={showCheckout} onClose={() => setShowCheckout(false)} />
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </div>
  )
}