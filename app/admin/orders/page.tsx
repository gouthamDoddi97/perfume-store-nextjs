'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Eye, Package, Truck, CheckCircle, Clock } from 'lucide-react'
import { api } from '@/lib/api'

const statusColors = {
  'Pending': 'bg-yellow-100 text-yellow-800',
  'Processing': 'bg-blue-100 text-blue-800',
  'Shipped': 'bg-purple-100 text-purple-800',
  'Delivered': 'bg-green-100 text-green-800'
}

const statusIcons = {
  'Pending': Clock,
  'Processing': Package,
  'Shipped': Truck,
  'Delivered': CheckCircle
}

export default function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState(null)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const data = await api.getOrders()
      setOrders(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Failed to fetch orders:', error)
      setOrders([])
    }
    setLoading(false)
  }

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      await api.updateOrderStatus(orderId, newStatus)
      fetchOrders() // Refresh the orders list
    } catch (error) {
      console.error('Failed to update order status:', error)
    }
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-luxury text-4xl font-bold mb-2">
            Order{' '}
            <span className="bg-gradient-to-r from-luxury-rosegold to-luxury-gold dark:from-luxury-gold dark:to-yellow-400 bg-clip-text text-transparent">
              Management
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300">Track and manage customer orders</p>
        </div>

        {/* Order Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {Object.entries(statusColors).map(([status, colorClass]) => {
            const count = Array.isArray(orders) ? orders.filter(order => order.status === status).length : 0
            const Icon = statusIcons[status]
            return (
              <div key={status} className="bg-white dark:bg-luxury-black rounded-2xl p-6 luxury-shadow dark:dark-luxury-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{status}</p>
                    <p className="text-2xl font-bold">{count}</p>
                  </div>
                  <Icon className="w-8 h-8 text-gray-400" />
                </div>
              </div>
            )
          })}
        </div>

        {/* Orders Table */}
        <div className="bg-white dark:bg-luxury-black rounded-2xl luxury-shadow dark:dark-luxury-shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-luxury-darkgray">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Order ID</th>
                  <th className="px-6 py-4 text-left font-semibold">Customer</th>
                  <th className="px-6 py-4 text-left font-semibold">Items</th>
                  <th className="px-6 py-4 text-left font-semibold">Total</th>
                  <th className="px-6 py-4 text-left font-semibold">Status</th>
                  <th className="px-6 py-4 text-left font-semibold">Date</th>
                  <th className="px-6 py-4 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                      Loading orders...
                    </td>
                  </tr>
                ) : orders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                      No orders yet. Orders will appear here when customers place them.
                    </td>
                  </tr>
                ) : orders.map((order) => (
                  <tr key={order._id} className="border-t border-gray-200 dark:border-gray-700">
                    <td className="px-6 py-4 font-medium">{order.orderId}</td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium">{order.customer.name}</p>
                        <p className="text-sm text-gray-500">{order.customer.email}</p>
                        <p className="text-sm text-gray-500">{order.customer.phone}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">{order.items.length} items</td>
                    <td className="px-6 py-4 font-semibold">₹{order.total.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <select
                          onChange={(e) => updateOrderStatus(order.orderId, e.target.value)}
                          className="text-sm border border-gray-300 rounded px-2 py-1"
                          value={order.status}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-luxury-black rounded-2xl p-6 w-full max-w-lg"
            >
              <h3 className="font-semibold text-xl mb-4">Order Details - {selectedOrder.orderId}</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-medium">Customer: {selectedOrder.customer.name}</p>
                  <p className="text-gray-600">{selectedOrder.customer.email}</p>
                  <p className="text-gray-600">{selectedOrder.customer.phone}</p>
                </div>
                <div>
                  <p className="font-medium mb-2">Address:</p>
                  <p className="text-gray-600">{selectedOrder.customer.address}</p>
                  <p className="text-gray-600">{selectedOrder.customer.city}, {selectedOrder.customer.state} - {selectedOrder.customer.pincode}</p>
                </div>
                <div>
                  <p className="font-medium mb-2">Items:</p>
                  <ul className="space-y-1">
                    {selectedOrder.items.map((item, index) => (
                      <li key={index} className="text-gray-600 flex justify-between">
                        <span>• {item.name} ({item.size})</span>
                        <span>₹{item.price} × {item.quantity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Subtotal:</span>
                  <span>₹{selectedOrder.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Shipping:</span>
                  <span>₹{selectedOrder.shipping}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Total:</span>
                  <span className="font-bold">₹{selectedOrder.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Status:</span>
                  <span className={`px-3 py-1 rounded-full text-sm ${statusColors[selectedOrder.status]}`}>
                    {selectedOrder.status}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="w-full mt-6 bg-gray-200 dark:bg-gray-700 py-2 rounded-lg font-semibold"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}