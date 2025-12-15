'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, Tag, Percent } from 'lucide-react'
import { api } from '@/lib/api'

export default function AdminOffers() {
  const [offers, setOffers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newOffer, setNewOffer] = useState({
    title: '', discount: '', type: 'percentage', code: '', validUntil: ''
  })

  useEffect(() => {
    fetchOffers()
  }, [])

  const fetchOffers = async () => {
    try {
      const data = await api.getOffers()
      setOffers(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Failed to fetch offers:', error)
      setOffers([])
    }
    setLoading(false)
  }

  const handleAddOffer = async () => {
    try {
      const offerData = {
        ...newOffer,
        discount: parseInt(newOffer.discount),
        validUntil: new Date(newOffer.validUntil)
      }
      await api.createOffer(offerData)
      setShowAddForm(false)
      setNewOffer({ title: '', discount: '', type: 'percentage', code: '', validUntil: '' })
      fetchOffers() // Refresh list
    } catch (error) {
      console.error('Failed to add offer:', error)
    }
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-luxury text-4xl font-bold mb-2">
              Special{' '}
              <span className="bg-gradient-to-r from-luxury-rosegold to-luxury-gold dark:from-luxury-gold dark:to-yellow-400 bg-clip-text text-transparent">
                Offers
              </span>
            </h1>
            <p className="text-gray-600 dark:text-gray-300">Manage discounts and promotions</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-luxury-rosegold to-luxury-gold dark:from-luxury-gold dark:to-yellow-400 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 hover:shadow-lg transition-all"
          >
            <Plus className="w-5 h-5" />
            <span>Create Offer</span>
          </button>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {loading ? (
            <div className="col-span-full text-center py-8 text-gray-500">
              Loading offers...
            </div>
          ) : offers.length === 0 ? (
            <div className="col-span-full text-center py-8 text-gray-500">
              No offers created yet. Create your first offer!
            </div>
          ) : Array.isArray(offers) && offers.map((offer) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-luxury-black rounded-2xl p-6 luxury-shadow dark:dark-luxury-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  {offer.type === 'percentage' ? (
                    <Percent className="w-5 h-5 text-luxury-rosegold dark:text-luxury-gold" />
                  ) : (
                    <Tag className="w-5 h-5 text-luxury-rosegold dark:text-luxury-gold" />
                  )}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    offer.status === 'Active' ? 'bg-green-100 text-green-800' :
                    offer.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {offer.status}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button className="p-1 text-blue-600 hover:bg-blue-100 rounded">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-red-600 hover:bg-red-100 rounded">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h3 className="font-semibold text-lg mb-2">{offer.title}</h3>
              <p className="text-2xl font-bold text-luxury-rosegold dark:text-luxury-gold mb-2">
                {offer.type === 'percentage' ? `${offer.discount}% OFF` : `₹${offer.discount} OFF`}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Code: {offer.code}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Valid until: {new Date(offer.validUntil).toLocaleDateString()}</p>
              <p className="text-sm font-medium">Used: {offer.usedCount} times</p>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-luxury-black rounded-2xl p-6 luxury-shadow dark:dark-luxury-shadow">
            <h3 className="font-semibold text-lg mb-2">Flash Sale</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Create time-limited offers</p>
            <button className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold">
              Create Flash Sale
            </button>
          </div>
          <div className="bg-white dark:bg-luxury-black rounded-2xl p-6 luxury-shadow dark:dark-luxury-shadow">
            <h3 className="font-semibold text-lg mb-2">Bundle Deals</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Combo product offers</p>
            <button className="w-full bg-purple-500 text-white py-2 rounded-lg font-semibold">
              Create Bundle
            </button>
          </div>
          <div className="bg-white dark:bg-luxury-black rounded-2xl p-6 luxury-shadow dark:dark-luxury-shadow">
            <h3 className="font-semibold text-lg mb-2">Loyalty Rewards</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Customer loyalty program</p>
            <button className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold">
              Setup Rewards
            </button>
          </div>
        </div>

        {/* Add Offer Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-luxury-black rounded-2xl p-6 w-full max-w-md"
            >
              <h3 className="font-semibold text-xl mb-4">Create New Offer</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Offer Title"
                  value={newOffer.title}
                  onChange={(e) => setNewOffer({...newOffer, title: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-luxury-darkgray"
                />
                <div className="flex space-x-2">
                  <select
                    value={newOffer.type}
                    onChange={(e) => setNewOffer({...newOffer, type: e.target.value})}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-luxury-darkgray"
                  >
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed Amount</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Discount Value"
                    value={newOffer.discount}
                    onChange={(e) => setNewOffer({...newOffer, discount: e.target.value})}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-luxury-darkgray"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Coupon Code"
                  value={newOffer.code}
                  onChange={(e) => setNewOffer({...newOffer, code: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-luxury-darkgray"
                />
                <input
                  type="date"
                  placeholder="Valid Until"
                  value={newOffer.validUntil}
                  onChange={(e) => setNewOffer({...newOffer, validUntil: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-luxury-darkgray"
                />
              </div>
              <div className="flex space-x-4 mt-6">
                <button
                  onClick={handleAddOffer}
                  className="flex-1 bg-gradient-to-r from-luxury-rosegold to-luxury-gold text-white py-2 rounded-lg font-semibold"
                >
                  Create Offer
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 border border-gray-300 py-2 rounded-lg font-semibold"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}