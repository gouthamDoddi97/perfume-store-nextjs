'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { api } from '@/lib/api'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        setSuccess(true)
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
      } else {
        alert('Failed to send message. Please try again.')
      }
    } catch (error) {
      console.error('Failed to send message:', error)
      alert('Failed to send message. Please try again.')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="font-luxury text-4xl md:text-5xl font-bold mb-4">
            Contact{' '}
            <span className="bg-gradient-to-r from-luxury-rosegold to-luxury-gold dark:from-luxury-gold dark:to-yellow-400 bg-clip-text text-transparent">
              Us
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Get in touch with us for any questions about our fragrances
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="bg-white dark:bg-luxury-black rounded-2xl p-8 luxury-shadow dark:dark-luxury-shadow">
              <h3 className="font-semibold text-xl mb-6">Get in Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-luxury-rosegold/10 dark:bg-luxury-gold/10 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-luxury-rosegold dark:text-luxury-gold" />
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-gray-600 dark:text-gray-300">+91 98765 43210</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-luxury-rosegold/10 dark:bg-luxury-gold/10 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-luxury-rosegold dark:text-luxury-gold" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600 dark:text-gray-300">info@moonlightattarperfumes.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-luxury-rosegold/10 dark:bg-luxury-gold/10 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-luxury-rosegold dark:text-luxury-gold" />
                  </div>
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-gray-600 dark:text-gray-300">
                      123 Fragrance Street<br />
                      Mumbai, Maharashtra 400001
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-luxury-black rounded-2xl p-8 luxury-shadow dark:dark-luxury-shadow"
          >
            {success ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold text-xl mb-2">Message Sent!</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Thank you for contacting us. We'll get back to you soon.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="bg-gradient-to-r from-luxury-rosegold to-luxury-gold dark:from-luxury-gold dark:to-yellow-400 text-white px-6 py-2 rounded-lg font-semibold"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="font-semibold text-xl mb-6">Send us a Message</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-luxury-darkgray"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-luxury-darkgray"
                    required
                  />
                </div>

                <input
                  type="tel"
                  placeholder="Phone Number (Optional)"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-luxury-darkgray"
                />

                <input
                  type="text"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-luxury-darkgray"
                  required
                />

                <textarea
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-luxury-darkgray h-32"
                  required
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-luxury-rosegold to-luxury-gold dark:from-luxury-gold dark:to-yellow-400 text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                  <span>{loading ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}