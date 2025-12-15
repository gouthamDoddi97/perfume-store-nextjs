import mongoose from 'mongoose'

// Product Schema
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['Attar', 'Perfume', 'Oud', 'Gift Set'],
    index: true
  },
  subCategory: {
    type: String,
    enum: ['Male', 'Female', 'Unisex', 'Traditional', 'Modern'],
    index: true
  },
  size: { type: String, required: true },
  price: { type: Number, required: true, index: true },
  originalPrice: { type: Number },
  stock: { type: Number, default: 0 },
  description: { type: String },
  image: { type: String, required: true },
  notes: [{ type: String }],
  status: { type: String, enum: ['Active', 'Inactive', 'Out of Stock'], default: 'Active', index: true },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  isBestSeller: { type: Boolean, default: false, index: true },
  isFeatured: { type: Boolean, default: false, index: true },
  isHeroCarousel: { type: Boolean, default: false, index: true }
}, {
  timestamps: true
})

// Add compound indexes for common queries
ProductSchema.index({ category: 1, status: 1 })
ProductSchema.index({ category: 1, subCategory: 1, status: 1 })
ProductSchema.index({ isBestSeller: 1, status: 1 })
ProductSchema.index({ isFeatured: 1, status: 1 })
ProductSchema.index({ isHeroCarousel: 1, status: 1 })

// Customer Schema
const CustomerSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  name: { type: String },
  email: { type: String },
  addresses: [{
    address: String,
    city: String,
    state: String,
    pincode: String,
    isDefault: { type: Boolean, default: false }
  }]
}, {
  timestamps: true
})

// Order Schema
const OrderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  customer: {
    phone: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String },
    pincode: { type: String, required: true }
  },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    size: String,
    price: Number,
    quantity: Number
  }],
  subtotal: { type: Number, required: true },
  shipping: { type: Number, default: 0 },
  total: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'], 
    default: 'Pending' 
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed'],
    default: 'Pending'
  }
}, {
  timestamps: true
})

// Offer Schema
const OfferSchema = new mongoose.Schema({
  title: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  type: { type: String, enum: ['percentage', 'fixed'], required: true },
  discount: { type: Number, required: true },
  validUntil: { type: Date, required: true },
  status: { type: String, enum: ['Active', 'Inactive', 'Expired'], default: 'Active' },
  usedCount: { type: Number, default: 0 },
  maxUses: { type: Number },
  minOrderAmount: { type: Number, default: 0 }
}, {
  timestamps: true
})

// Contact Form Schema
const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['New', 'Read', 'Replied'], default: 'New' }
}, {
  timestamps: true
})

// Review Schema
const ReviewSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  customerPhone: { type: String, required: true },
  customerName: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Approved' }
}, {
  timestamps: true
})

// Admin Schema
const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, default: 'admin' },
  lastLogin: { type: Date }
}, {
  timestamps: true
})

// Export models
export const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema)
export const Customer = mongoose.models.Customer || mongoose.model('Customer', CustomerSchema)
export const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema)
export const Offer = mongoose.models.Offer || mongoose.model('Offer', OfferSchema)
export const Contact = mongoose.models.Contact || mongoose.model('Contact', ContactSchema)
export const Review = mongoose.models.Review || mongoose.model('Review', ReviewSchema)
export const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema)