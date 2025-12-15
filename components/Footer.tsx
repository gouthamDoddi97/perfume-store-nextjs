'use client'

import { motion } from 'framer-motion'
import { Instagram, Mail, Phone, MapPin } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
  return (
    <footer className="bg-luxury-black dark:bg-luxury-darkgray text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3"
            >
              <Image
                src="/logo.jpg"
                alt="Moonlight Attar & Perfumes Logo"
                width={48}
                height={48}
                className="rounded-full object-cover"
              />
              <h3 className="font-luxury text-2xl font-bold bg-gradient-to-r from-luxury-gold to-yellow-400 bg-clip-text text-transparent">
                Moonlight Attar & Perfumes
              </h3>
            </motion.div>
            <p className="text-gray-300 text-sm">
              Discover your signature scent with our premium collection of luxury fragrances, attars, and oud.
            </p>
            <Link
              href="https://instagram.com/moonlight_attar_perfumes"
              target="_blank"
              className="inline-flex items-center space-x-2 text-luxury-gold hover:text-yellow-400 transition-colors"
            >
              <Instagram size={20} />
              <span>Follow us on Instagram</span>
            </Link>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-luxury-gold">Quick Links</h4>
            <div className="space-y-2 text-sm">
              <Link href="/" className="block hover:text-luxury-gold transition-colors">Home</Link>
              <Link href="/perfumes/male" className="block hover:text-luxury-gold transition-colors">Male Perfumes</Link>
              <Link href="/perfumes/female" className="block hover:text-luxury-gold transition-colors">Female Perfumes</Link>
              <Link href="/attars" className="block hover:text-luxury-gold transition-colors">Attars</Link>
              <Link href="/about" className="block hover:text-luxury-gold transition-colors">About</Link>
              <Link href="/contact" className="block hover:text-luxury-gold transition-colors">Contact</Link>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="font-semibold text-luxury-gold">Customer Service</h4>
            <div className="space-y-2 text-sm">
              <Link href="/about" className="block hover:text-luxury-gold transition-colors">About Us</Link>
              <Link href="/contact" className="block hover:text-luxury-gold transition-colors">Contact</Link>
              <Link href="/shipping" className="block hover:text-luxury-gold transition-colors">Shipping Info</Link>
              <Link href="/returns" className="block hover:text-luxury-gold transition-colors">Returns</Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-luxury-gold">Contact Info</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Mail size={16} />
                <span>info@moonlightattar.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} />
                <span>+91 XXXXX XXXXX</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={16} />
                <span>Mumbai, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 Moonlight Attar & Perfumes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}