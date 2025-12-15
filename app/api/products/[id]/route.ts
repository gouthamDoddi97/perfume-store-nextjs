import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { Product } from '@/lib/models'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const product = await Product.findById(params.id)
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }
    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const data = await request.json()
    
    console.log('Updating product ID:', params.id)
    console.log('Update data received:', data)
    
    const product = await Product.findByIdAndUpdate(
      params.id,
      { ...data },
      { new: true, runValidators: true }
    )
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }
    
    console.log('Product updated successfully:', product)
    return NextResponse.json(product)
  } catch (error) {
    console.error('Update error:', error)
    return NextResponse.json({ 
      error: 'Failed to update product',
      details: error.message 
    }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const product = await Product.findByIdAndDelete(params.id)
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }
    
    return NextResponse.json({ message: 'Product deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }
}