'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, Calendar, Eye } from 'lucide-react'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { api } from '@/lib/api'

export default function AdminContacts() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedContact, setSelectedContact] = useState(null)

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      const data = await api.getContacts()
      setContacts(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Failed to fetch contacts:', error)
      setContacts([])
    }
    setLoading(false)
  }

  const updateContactStatus = async (id: string, status: string) => {
    try {
      await api.updateContactStatus(id, status)
      fetchContacts()
    } catch (error) {
      console.error('Failed to update contact status:', error)
    }
  }

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="font-luxury text-4xl font-bold mb-2">
              Contact{' '}
              <span className="bg-gradient-to-r from-luxury-rosegold to-luxury-gold dark:from-luxury-gold dark:to-yellow-400 bg-clip-text text-transparent">
                Messages
              </span>
            </h1>
            <p className="text-gray-600 dark:text-gray-300">Customer inquiries and messages</p>
          </div>

          <div className="bg-white dark:bg-luxury-black rounded-2xl luxury-shadow dark:dark-luxury-shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-luxury-darkgray">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Name</th>
                    <th className="px-6 py-4 text-left font-semibold">Email</th>
                    <th className="px-6 py-4 text-left font-semibold">Subject</th>
                    <th className="px-6 py-4 text-left font-semibold">Date</th>
                    <th className="px-6 py-4 text-left font-semibold">Status</th>
                    <th className="px-6 py-4 text-left font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                        Loading messages...
                      </td>
                    </tr>
                  ) : contacts.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                        No messages yet. Messages will appear here when customers contact you.
                      </td>
                    </tr>
                  ) : contacts.map((contact) => (
                    <tr key={contact._id} className="border-t border-gray-200 dark:border-gray-700">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-luxury-rosegold/10 dark:bg-luxury-gold/10 rounded-full flex items-center justify-center">
                            <Mail className="w-5 h-5 text-luxury-rosegold dark:text-luxury-gold" />
                          </div>
                          <span className="font-medium">{contact.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">{contact.email}</td>
                      <td className="px-6 py-4">{contact.subject}</td>
                      <td className="px-6 py-4 text-gray-500">
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          contact.status === 'New' ? 'bg-blue-100 text-blue-800' :
                          contact.status === 'Read' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {contact.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setSelectedContact(contact)
                              if (contact.status === 'New') {
                                updateContactStatus(contact._id, 'Read')
                              }
                            }}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <select
                            onChange={(e) => updateContactStatus(contact._id, e.target.value)}
                            className="text-sm border border-gray-300 rounded px-2 py-1"
                            value={contact.status}
                          >
                            <option value="New">New</option>
                            <option value="Read">Read</option>
                            <option value="Replied">Replied</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Message Details Modal */}
          {selectedContact && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-luxury-black rounded-2xl p-6 w-full max-w-lg"
              >
                <h3 className="font-semibold text-xl mb-4">Message Details</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium">From: {selectedContact.name}</p>
                    <p className="text-gray-600">{selectedContact.email}</p>
                    {selectedContact.phone && (
                      <p className="text-gray-600">{selectedContact.phone}</p>
                    )}
                  </div>
                  <div>
                    <p className="font-medium">Subject: {selectedContact.subject}</p>
                  </div>
                  <div>
                    <p className="font-medium mb-2">Message:</p>
                    <p className="text-gray-600 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                      {selectedContact.message}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500">
                    Received: {new Date(selectedContact.createdAt).toLocaleString()}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedContact(null)}
                  className="w-full mt-6 bg-gray-200 dark:bg-gray-700 py-2 rounded-lg font-semibold"
                >
                  Close
                </button>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}