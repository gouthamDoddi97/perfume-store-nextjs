import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { Order, Customer } from '@/lib/models'

export async function GET() {
  try {
    await connectDB()
    const orders = await Order.find().sort({ createdAt: -1 }).populate('items.productId')
    return NextResponse.json(orders)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const data = await request.json()
    
    const orderId = `ORD-${Date.now()}`
    
    await Customer.findOneAndUpdate(
      { phone: data.customer.phone },
      {
        phone: data.customer.phone,
        name: data.customer.name,
        email: data.customer.email,
        $push: {
          addresses: {
            address: data.customer.address,
            city: data.customer.city,
            state: data.customer.state,
            pincode: data.customer.pincode
          }
        }
      },
      { upsert: true, new: true }
    )
    
    const order = new Order({
      orderId,
      ...data
    })
    
    await order.save()
    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB()
    const { orderId, status } = await request.json()
    
    const order = await Order.findOneAndUpdate(
      { orderId },
      { status },
      { new: true }
    )
    
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }
    
    return NextResponse.json(order)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
  }
}