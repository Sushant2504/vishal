'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/products', label: 'Products' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <header className="bg-primary-700 text-white shadow-lg sticky top-0 z-50 animate-slide-in">
      <div className="container-custom">
        <div className="flex items-center justify-between py-2 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-primary-500 opacity-20 group-hover:opacity-30 blur-xl transition-opacity duration-300 animate-pulse-slow"></div>
              <div className="relative rounded-full overflow-hidden border-2 border-primary-300 group-hover:border-primary-200 transition-all duration-300 shadow-lg group-hover:shadow-xl animate-scale-in hover:scale-110 hover:rotate-3">
                <Image
                  src="/images/victorious-logo.png"
                  alt="Victorious Medical Logo"
                  width={50}
                  height={50}
                  className="w-12 h-12 object-cover rounded-full"
                  priority
                />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-5">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white hover:text-primary-200 font-medium text-sm uppercase tracking-wide transition-all duration-300 hover:scale-110 relative group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-200 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-3 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white hover:text-primary-200 font-medium text-sm uppercase tracking-wide transition-colors duration-200 py-1.5"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

