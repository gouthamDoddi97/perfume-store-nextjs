'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Package, ShoppingCart, Tag, BarChart3, Users, Settings, Mail, TrendingUp } from 'lucide-react'
import { api } from '@/lib/api'

const adminCards = [
  {
    title: 'Products',
    description: 'Manage inventory, add new items, update prices',
    icon: Package,
    href: '/admin/products',
    color: 'from-blue-500 to-blue-600'
  },
  {
    title: 'Orders',
    description: 'View and manage customer orders',
    icon: ShoppingCart,
    href: '/admin/orders',
    color: 'from-green-500 to-green-600'
  },
  {
    title: 'Special Offers',
    description: 'Create sales, discounts, and promotions',
    icon: Tag,
    href: '/admin/offers',
    color: 'from-purple-500 to-purple-600'
  },
  {
    title: 'Messages',
    description: 'Customer contact messages and inquiries',
    icon: BarChart3,
    href: '/admin/contacts',
    color: 'from-orange-500 to-orange-600'
  }
]

import { ProtectedRoute } from '@/components/ProtectedRoute'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    newContacts: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [products, orders, contacts] = await Promise.all([
        api.getProducts(),
        api.getOrders(),
        api.getContacts()
      ])

      const totalRevenue = Array.isArray(orders) ? orders.reduce((sum, order) => sum + (order.total || 0), 0) : 0
      const newContacts = Array.isArray(contacts) ? contacts.filter(c => c.status === 'New').length : 0
      
      setStats({
        totalProducts: Array.isArray(products) ? products.length : 0,
        totalOrders: Array.isArray(orders) ? orders.length : 0,
        totalRevenue,
        newContacts
      })
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    }
    setLoading(false)
  }

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-luxury text-4xl md:text-5xl font-bold mb-4">
            Admin{' '}
            <span className="bg-gradient-to-r from-luxury-rosegold to-luxury-gold dark:from-luxury-gold dark:to-yellow-400 bg-clip-text text-transparent">
              Dashboard
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Manage your perfume business
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {adminCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={card.href}>
                <div className="bg-white dark:bg-luxury-black rounded-2xl p-6 luxury-shadow dark:dark-luxury-shadow hover:scale-105 transition-transform duration-300">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${card.color} flex items-center justify-center mb-4`}>
                    <card.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{card.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{card.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Quick Stats */}
        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-300">Loading dashboard...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-luxury-black rounded-2xl p-6 luxury-shadow dark:dark-luxury-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Products</h3>
                  <p className="text-3xl font-bold text-luxury-rosegold dark:text-luxury-gold">{stats.totalProducts}</p>
                </div>
                <Package className="w-8 h-8 text-luxury-rosegold dark:text-luxury-gold" />
              </div>
            </div>
            <div className="bg-white dark:bg-luxury-black rounded-2xl p-6 luxury-shadow dark:dark-luxury-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Orders</h3>
                  <p className="text-3xl font-bold text-green-500">{stats.totalOrders}</p>
                </div>
                <ShoppingCart className="w-8 h-8 text-green-500" />
              </div>
            </div>
            <div className="bg-white dark:bg-luxury-black rounded-2xl p-6 luxury-shadow dark:dark-luxury-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Revenue</h3>
                  <p className="text-3xl font-bold text-blue-500">₹{stats.totalRevenue.toLocaleString()}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            <div className="bg-white dark:bg-luxury-black rounded-2xl p-6 luxury-shadow dark:dark-luxury-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg mb-2">New Messages</h3>
                  <p className="text-3xl font-bold text-orange-500">{stats.newContacts}</p>
                </div>
                <Mail className="w-8 h-8 text-orange-500" />
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
    </ProtectedRoute>
  )
}