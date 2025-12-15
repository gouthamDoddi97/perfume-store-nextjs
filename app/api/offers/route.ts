import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { Offer } from '@/lib/models'

export async function GET() {
  try {
    await connectDB()
    const offers = await Offer.find().sort({ createdAt: -1 })
    return NextResponse.json(offers)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch offers' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const data = await request.json()
    
    const offer = new Offer(data)
    await offer.save()
    
    return NextResponse.json(offer, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create offer' }, { status: 500 })
  }
}