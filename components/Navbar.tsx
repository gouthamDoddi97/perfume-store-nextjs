'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import { Search, ShoppingBag, User, Menu, X, Sun, Moon, ChevronDown, LogOut } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useCartStore } from '@/lib/store'
import { useAuthStore } from '@/lib/auth'
import { SearchModal } from './SearchModal'
import { LoginModal } from './LoginModal'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isPerfumesOpen, setIsPerfumesOpen] = useState(false)
  const [mobilePerfumesOpen, setMobilePerfumesOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const totalItems = useCartStore((state) => state.getTotalItems())
  const { user, isAuthenticated, logout } = useAuthStore()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <nav className="sticky top-0 z-50 glass-effect border-b border-luxury-rosegold/20 dark:border-luxury-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <Image
                src="/logo.jpg"
                alt="Moonlight Attar & Perfumes Logo"
                width={40}
                height={40}
                className="rounded-full object-cover w-8 h-8 sm:w-10 sm:h-10"
                priority
              />
              <div className="font-luxury font-bold bg-gradient-to-r from-luxury-rosegold to-luxury-gold dark:from-luxury-gold dark:to-yellow-400 bg-clip-text text-transparent">
                <span className="text-lg sm:text-xl md:text-2xl">
                  Moonlight
                </span>
                <span className="hidden sm:inline text-lg sm:text-xl md:text-2xl">
                  {' '}Attar & Perfumes
                </span>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hover:text-luxury-rosegold dark:hover:text-luxury-gold transition-colors">
              Home
            </Link>
            <div className="relative">
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setIsPerfumesOpen(!isPerfumesOpen)
                }}
                className="flex items-center space-x-1 hover:text-luxury-rosegold dark:hover:text-luxury-gold transition-colors"
              >
                <span>Perfumes</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isPerfumesOpen ? 'rotate-180' : ''}`} />
              </button>
              {isPerfumesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-luxury-black rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50"
                >
                  <Link 
                    href="/perfumes/male" 
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-t-lg"
                    onClick={() => setIsPerfumesOpen(false)}
                  >
                    Male Perfumes
                  </Link>
                  <Link 
                    href="/perfumes/female" 
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-b-lg"
                    onClick={() => setIsPerfumesOpen(false)}
                  >
                    Female Perfumes
                  </Link>
                </motion.div>
              )}
            </div>
            <Link href="/attars" className="hover:text-luxury-rosegold dark:hover:text-luxury-gold transition-colors">
              Attars
            </Link>
            <Link href="/about" className="hover:text-luxury-rosegold dark:hover:text-luxury-gold transition-colors">
              About
            </Link>
            <Link href="/contact" className="hover:text-luxury-rosegold dark:hover:text-luxury-gold transition-colors">
              Contact
            </Link>
            {user?.role === 'admin' && (
              <Link href="/admin" className="hover:text-luxury-rosegold dark:hover:text-luxury-gold transition-colors text-sm bg-luxury-rosegold/10 dark:bg-luxury-gold/10 px-3 py-1 rounded-full">
                Admin
              </Link>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full hover:bg-luxury-rosegold/10 dark:hover:bg-luxury-gold/10 transition-colors"
            >
              {mounted ? (theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />) : <div className="w-5 h-5" />}
            </button>
            
            <Search 
              className="w-5 h-5 cursor-pointer hover:text-luxury-rosegold dark:hover:text-luxury-gold transition-colors" 
              onClick={() => setIsSearchOpen(true)}
            />
            {isAuthenticated ? (
              <div className="relative group">
                <div className="flex items-center space-x-2 cursor-pointer">
                  <User className="w-5 h-5 hover:text-luxury-rosegold dark:hover:text-luxury-gold transition-colors" />
                  {user?.phone && (
                    <span className="text-sm hidden sm:block">{user.phone}</span>
                  )}
                </div>
                <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-luxury-black rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <button
                    onClick={logout}
                    className="w-full flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            ) : (
              <User 
                className="w-5 h-5 cursor-pointer hover:text-luxury-rosegold dark:hover:text-luxury-gold transition-colors" 
                onClick={() => setIsLoginOpen(true)}
              />
            )}
            
            <Link href="/cart" className="relative">
              <ShoppingBag className="w-5 h-5 cursor-pointer hover:text-luxury-rosegold dark:hover:text-luxury-gold transition-colors" />
              {mounted && totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-luxury-rosegold dark:bg-luxury-gold text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-4 space-y-4"
          >
            <Link href="/" className="block hover:text-luxury-rosegold dark:hover:text-luxury-gold transition-colors" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <div className="space-y-2">
              <button
                onClick={() => setMobilePerfumesOpen(!mobilePerfumesOpen)}
                className="flex items-center justify-between w-full hover:text-luxury-rosegold dark:hover:text-luxury-gold transition-colors font-medium"
              >
                <span>Perfumes</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobilePerfumesOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobilePerfumesOpen && (
                <div className="ml-4 space-y-2">
                  <Link href="/perfumes/male" className="block text-sm hover:text-luxury-rosegold dark:hover:text-luxury-gold transition-colors" onClick={() => setIsOpen(false)}>
                    Male Perfumes
                  </Link>
                  <Link href="/perfumes/female" className="block text-sm hover:text-luxury-rosegold dark:hover:text-luxury-gold transition-colors" onClick={() => setIsOpen(false)}>
                    Female Perfumes
                  </Link>
                </div>
              )}
            </div>
            <Link href="/attars" className="block hover:text-luxury-rosegold dark:hover:text-luxury-gold transition-colors" onClick={() => setIsOpen(false)}>
              Attars
            </Link>
            <Link href="/about" className="block hover:text-luxury-rosegold dark:hover:text-luxury-gold transition-colors" onClick={() => setIsOpen(false)}>
              About
            </Link>
            <Link href="/contact" className="block hover:text-luxury-rosegold dark:hover:text-luxury-gold transition-colors" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
            {user?.role === 'admin' && (
              <Link href="/admin" className="block hover:text-luxury-rosegold dark:hover:text-luxury-gold transition-colors font-medium" onClick={() => setIsOpen(false)}>
                Admin Panel
              </Link>
            )}
            {isAuthenticated ? (
              <button
                onClick={() => {logout(); setIsOpen(false)}}
                className="block hover:text-luxury-rosegold dark:hover:text-luxury-gold transition-colors font-medium text-left"
              >
                Logout ({user?.phone || 'Admin'})
              </button>
            ) : (
              <button
                onClick={() => {setIsLoginOpen(true); setIsOpen(false)}}
                className="block hover:text-luxury-rosegold dark:hover:text-luxury-gold transition-colors font-medium text-left"
              >
                Login
              </button>
            )}
          </motion.div>
        )}
      </div>
      
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </nav>
  )
}