'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, Search, Filter, DollarSign, Image as ImageIcon, Star } from 'lucide-react'
import Image from 'next/image'
import { api } from '@/lib/api'
import { QuickEdit } from '@/components/QuickEdit'
import { ImageManager } from '@/components/ImageManager'

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [quickEditProduct, setQuickEditProduct] = useState(null)
  const [imageEditProduct, setImageEditProduct] = useState(null)
  const [newProduct, setNewProduct] = useState({
    name: '', category: '', subCategory: '', size: '', price: '', stock: '', description: '', notes: ''
  })

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const data = await api.getProducts()
      setProducts(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Failed to fetch products:', error)
      setProducts([])
    }
    setLoading(false)
  }

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.category || !newProduct.size || !newProduct.price || !newProduct.stock) {
      alert('Please fill all required fields')
      return
    }
    
    try {
      const productData = {
        ...newProduct,
        price: parseInt(newProduct.price),
        stock: parseInt(newProduct.stock),
        notes: newProduct.notes.split(',').map(note => note.trim()),
        image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop'
      }
      
      console.log('Adding product:', productData)
      const result = await api.createProduct(productData)
      console.log('Product added:', result)
      
      if (result.error) {
        alert('Error: ' + result.error)
      } else {
        alert('Product added successfully!')
        setShowAddForm(false)
        setNewProduct({ name: '', category: '', subCategory: '', size: '', price: '', stock: '', description: '', notes: '' })
        fetchProducts()
      }
    } catch (error) {
      console.error('Failed to add product:', error)
      alert('Failed to add product: ' + error.message)
    }
  }

  const handleEdit = (productId) => {
    const product = products.find(p => p._id === productId)
    if (product) {
      setEditingProduct(product)
      setNewProduct({
        name: product.name,
        category: product.category,
        size: product.size,
        price: product.price.toString(),
        stock: product.stock.toString(),
        description: product.description || '',
        notes: product.notes ? product.notes.join(', ') : ''
      })
    }
  }

  const handleUpdate = async () => {
    try {
      const productData = {
        ...newProduct,
        price: parseInt(newProduct.price),
        stock: parseInt(newProduct.stock),
        notes: newProduct.notes.split(',').map(note => note.trim())
      }
      await api.updateProduct(editingProduct._id, productData)
      setEditingProduct(null)
      setNewProduct({ name: '', category: '', size: '', price: '', stock: '', description: '', notes: '' })
      fetchProducts()
    } catch (error) {
      console.error('Failed to update product:', error)
    }
  }

  const handleDelete = async (productId) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await api.deleteProduct(productId)
        fetchProducts()
      } catch (error) {
        console.error('Failed to delete product:', error)
      }
    }
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-luxury text-4xl font-bold mb-2">
              Product{' '}
              <span className="bg-gradient-to-r from-luxury-rosegold to-luxury-gold dark:from-luxury-gold dark:to-yellow-400 bg-clip-text text-transparent">
                Management
              </span>
            </h1>
            <p className="text-gray-600 dark:text-gray-300">Manage your perfume inventory</p>
          </div>
          <button
            onClick={() => window.location.href = '/admin/products/add'}
            className="bg-gradient-to-r from-luxury-rosegold to-luxury-gold dark:from-luxury-gold dark:to-yellow-400 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 hover:shadow-lg transition-all"
          >
            <Plus className="w-5 h-5" />
            <span>Add Product</span>
          </button>
        </div>

        {/* Search and Filter */}
        <div className="bg-white dark:bg-luxury-black rounded-2xl p-6 luxury-shadow dark:dark-luxury-shadow mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-luxury-darkgray"
              />
            </div>
            <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-luxury-darkgray">
              <option>All Categories</option>
              <option>Perfume</option>
              <option>Attar</option>
              <option>Oud</option>
            </select>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white dark:bg-luxury-black rounded-2xl luxury-shadow dark:dark-luxury-shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-luxury-darkgray">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Product</th>
                  <th className="px-6 py-4 text-left font-semibold">Category</th>
                  <th className="px-6 py-4 text-left font-semibold">Price</th>
                  <th className="px-6 py-4 text-left font-semibold">Stock</th>
                  <th className="px-6 py-4 text-left font-semibold">Status</th>
                  <th className="px-6 py-4 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                      Loading products...
                    </td>
                  </tr>
                ) : products.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                      No products found. Add your first product!
                    </td>
                  </tr>
                ) : Array.isArray(products) && products.map((product) => (
                  <tr key={product._id} className="border-t border-gray-200 dark:border-gray-700">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={50}
                          height={50}
                          className="rounded-lg object-cover"
                        />
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{product.name}</span>
                            {product.isBestSeller && (
                              <Star className="w-4 h-4 text-yellow-500 fill-current" title="Best Seller" />
                            )}
                            {product.isFeatured && (
                              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Featured</span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">{product.size}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{product.category}</td>
                    <td className="px-6 py-4 font-semibold">₹{product.price.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        product.stock > 10 ? 'bg-green-100 text-green-800' :
                        product.stock > 0 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {product.stock} units
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        product.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-1">
                        <button 
                          onClick={() => setImageEditProduct(product)}
                          className="p-2 text-purple-600 hover:bg-purple-100 rounded-lg"
                          title="Change Image"
                        >
                          <ImageIcon className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => setQuickEditProduct(product)}
                          className="p-2 text-green-600 hover:bg-green-100 rounded-lg"
                          title="Quick Edit Price & Stock"
                        >
                          <DollarSign className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleEdit(product._id)}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg"
                          title="Edit Product"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(product._id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add/Edit Product Modal */}
        {(showAddForm || editingProduct) && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-luxury-black rounded-2xl p-6 w-full max-w-md"
            >
              <h3 className="font-semibold text-xl mb-4">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Product Name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-luxury-darkgray"
                />
                <select
                  value={newProduct.category}
                  onChange={(e) => {
                    const newCategory = e.target.value
                    setNewProduct({
                      ...newProduct, 
                      category: newCategory,
                      subCategory: newCategory === 'Perfume' ? 'Male' : 
                                 newCategory === 'Attar' ? 'Traditional' : 'Unisex'
                    })
                  }}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-luxury-darkgray"
                >
                  <option value="">Select Category</option>
                  <option value="Perfume">Perfume</option>
                  <option value="Attar">Attar</option>
                  <option value="Oud">Oud</option>
                  <option value="Gift Set">Gift Set</option>
                </select>
                <input
                  type="text"
                  placeholder="Size (e.g., 50ml, 12ml)"
                  value={newProduct.size}
                  onChange={(e) => setNewProduct({...newProduct, size: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-luxury-darkgray"
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-luxury-darkgray"
                />
                <input
                  type="number"
                  placeholder="Stock Quantity"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-luxury-darkgray"
                />
                <textarea
                  placeholder="Description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-luxury-darkgray h-20"
                />
                <select
                  value={newProduct.subCategory}
                  onChange={(e) => setNewProduct({...newProduct, subCategory: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-luxury-darkgray"
                >
                  {newProduct.category === 'Perfume' && (
                    <>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Unisex">Unisex</option>
                    </>
                  )}
                  {newProduct.category === 'Attar' && (
                    <>
                      <option value="Traditional">Traditional</option>
                      <option value="Modern">Modern</option>
                      <option value="Unisex">Unisex</option>
                    </>
                  )}
                  {(newProduct.category === 'Oud' || newProduct.category === 'Gift Set') && (
                    <>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Unisex">Unisex</option>
                    </>
                  )}
                </select>
                <input
                  type="text"
                  placeholder="Fragrance Notes (comma separated)"
                  value={newProduct.notes}
                  onChange={(e) => setNewProduct({...newProduct, notes: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-luxury-darkgray"
                />
              </div>
              <div className="flex space-x-4 mt-6">
                <button
                  onClick={editingProduct ? handleUpdate : handleAddProduct}
                  className="flex-1 bg-gradient-to-r from-luxury-rosegold to-luxury-gold text-white py-2 rounded-lg font-semibold"
                >
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
                <button
                  onClick={() => {
                    setShowAddForm(false)
                    setEditingProduct(null)
                    setNewProduct({ name: '', category: '', subCategory: '', size: '', price: '', stock: '', description: '', notes: '' })
                  }}
                  className="flex-1 border border-gray-300 py-2 rounded-lg font-semibold"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Quick Edit Modal */}
        {quickEditProduct && (
          <QuickEdit
            product={quickEditProduct}
            onClose={() => setQuickEditProduct(null)}
            onUpdate={fetchProducts}
          />
        )}

        {/* Image Manager Modal */}
        {imageEditProduct && (
          <ImageManager
            product={imageEditProduct}
            onClose={() => setImageEditProduct(null)}
            onUpdate={fetchProducts}
          />
        )}
      </div>
    </div>
  )
}