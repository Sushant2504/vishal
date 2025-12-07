'use client'

import { useState, useEffect, Suspense } from 'react'
import Image from 'next/image'
import ShippingForm from '@/components/ShippingForm'
import { useSearchParams } from 'next/navigation'

function SellContent() {
  const searchParams = useSearchParams()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    productType: '',
    brand: '',
    quantity: '',
    expirationDate: '',
    condition: '',
    message: '',
  })
  const [showShippingForm, setShowShippingForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isFromProduct, setIsFromProduct] = useState(false)

  useEffect(() => {
    // Check if we should show shipping form (from product click)
    const showShippingFromStorage = sessionStorage.getItem('showShipping')
    const selectedProduct = sessionStorage.getItem('selectedProduct')
    const hasProductParam = searchParams.get('product')
    
    if (showShippingFromStorage === 'true' || hasProductParam) {
      setIsFromProduct(true)
      // Pre-fill product if selected
      if (selectedProduct) {
        try {
          const product = JSON.parse(selectedProduct)
          // Map product ID to product type value
          const productMap: { [key: number]: string } = {
            1: 'freestyle-50ct',
            2: 'accu-chek-aviva',
            3: 'contour-next',
            4: 'dexcom-g7',
            5: 'dexcom-g6-sensor',
            6: 'dexcom-g6-transmitter',
            7: 'omnipod-5',
            8: 'freestyle-libre-3',
            9: 'minimed-mio',
          }
          setFormData(prev => ({ ...prev, productType: productMap[product.id] || '' }))
        } catch (e) {
          console.error('Error parsing selected product:', e)
        }
      }
      
      // Show shipping form and scroll to it
      setShowShippingForm(true)
      // Scroll to form section instead of shipping when coming from product
      setTimeout(() => {
        const formSection = document.getElementById('sell-form-section') || document.querySelector('.bg-white.rounded-2xl')
        if (formSection) {
          formSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
      
      // Clear the flag
      sessionStorage.removeItem('showShipping')
      sessionStorage.removeItem('selectedProduct')
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (isSubmitting) {
      return // Prevent double submission
    }
    
    setIsSubmitting(true)
    
    try {
      console.log('Submitting sell form...', formData)
      
      // Submit form to API
      const response = await fetch('/api/sell', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      console.log('Response status:', response.status)
      
      const data = await response.json()

      if (!response.ok) {
        // Handle specific error cases
        let errorMessage = data.error || 'Failed to submit form'
        
        if (data.details) {
          errorMessage += `: ${data.details}`
        }
        
        // Special handling for database connection errors
        if (response.status === 503 || data.error === 'Database connection failed') {
          errorMessage = 'We\'re experiencing technical difficulties connecting to our database. Your form data is safe. Please try again in a few moments or contact us directly at victoriousmedicalbuyback1@gmail.com'
          // Store form data in localStorage for retry
          localStorage.setItem('pendingSellForm', JSON.stringify(formData))
        } else if (response.status === 400) {
          errorMessage = data.details || data.error || 'Please check your form and try again.'
        }
        
        throw new Error(errorMessage)
      }

      console.log('Form submitted successfully:', data)
      
      // Clear any pending form data on success
      localStorage.removeItem('pendingSellForm')
      
      // Show shipping form after accepting offer
      setShowShippingForm(true)
      // Scroll to shipping form
      setTimeout(() => {
        const shippingSection = document.getElementById('shipping-section')
        if (shippingSection) {
          shippingSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    } catch (error: any) {
      console.error('Error submitting form:', error)
      
      // Show user-friendly error message
      let errorMessage = 'Failed to submit form. Please try again.'
      
      if (error.message) {
        errorMessage = error.message
      } else if (error instanceof TypeError && error.message?.includes('fetch')) {
        errorMessage = 'Network error. Please check your internet connection and try again.'
      }
      
      alert(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="bg-gradient-to-b from-primary-50 via-white to-primary-50">
      {/* Hero Section - Reduced when coming from product */}
      {!isFromProduct && (
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-12">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in-up">
              Sell Your Supplies Now
            </h1>
            <p className="text-xl sm:text-2xl text-primary-100 mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Turn Your Unused Diabetic Supplies Into Cash Today!
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm sm:text-base animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <span className="text-green-300 text-xl">✓</span>
                <span>Fast Payment</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <span className="text-green-300 text-xl">✓</span>
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <span className="text-green-300 text-xl">✓</span>
                <span>Secure Process</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}

      <div className={isFromProduct ? "py-4 px-4 sm:px-6 lg:px-8" : "section-padding"}>
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Human Images Grid - Hidden when coming from product */}
            {!isFromProduct && (
            <div className="mb-4 grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="relative h-24 md:h-32 rounded-xl overflow-hidden shadow-xl hover:scale-110 transition-transform duration-300 border-2 border-primary-200">
                <Image
                  src="/images/product_image_1.jpeg"
                  alt="Team member"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-24 md:h-32 rounded-xl overflow-hidden shadow-xl hover:scale-110 transition-transform duration-300 border-2 border-primary-200">
                <Image
                  src="/images/product_image_2.jpeg"
                  alt="Team member"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-24 md:h-32 rounded-xl overflow-hidden shadow-xl hover:scale-110 transition-transform duration-300 border-2 border-primary-200">
                <Image
                  src="/images/product_image_3.jpeg"
                  alt="Team member"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-24 md:h-32 rounded-xl overflow-hidden shadow-xl hover:scale-110 transition-transform duration-300 border-2 border-primary-200">
                <Image
                  src="/images/product_image_4.jpeg"
                  alt="Team member"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            )}

            <div id="sell-form-section" className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-primary-100">
              {/* Why Sell With Us - Enhanced - Compact when from product */}
              <div className={`bg-gradient-to-r from-primary-600 to-primary-700 text-white ${isFromProduct ? 'p-4' : 'p-6'}`}>
                <h2 className={`${isFromProduct ? 'text-xl' : 'text-2xl'} font-bold ${isFromProduct ? 'mb-2' : 'mb-4'} flex items-center gap-3`}>
                  <span className={isFromProduct ? 'text-2xl' : 'text-3xl'}>💎</span>
                  Why Sell With Us?
                </h2>
                <div className={`grid ${isFromProduct ? 'grid-cols-2' : 'md:grid-cols-2'} ${isFromProduct ? 'gap-2' : 'gap-4'}`}>
                  <div className={`flex items-start ${isFromProduct ? 'gap-2' : 'gap-3'} bg-white/10 ${isFromProduct ? 'p-2' : 'p-3'} rounded-lg backdrop-blur-sm`}>
                    <span className={isFromProduct ? 'text-xl' : 'text-2xl'}>💰</span>
                    <div>
                      <h3 className={`${isFromProduct ? 'text-xs' : 'font-semibold'}`}>Competitive Prices</h3>
                      {!isFromProduct && <p className="text-sm text-primary-100">Best buyback rates in the market</p>}
                    </div>
                  </div>
                  <div className={`flex items-start ${isFromProduct ? 'gap-2' : 'gap-3'} bg-white/10 ${isFromProduct ? 'p-2' : 'p-3'} rounded-lg backdrop-blur-sm`}>
                    <span className={isFromProduct ? 'text-xl' : 'text-2xl'}>🚚</span>
                    <div>
                      <h3 className={`${isFromProduct ? 'text-xs' : 'font-semibold'}`}>Free Shipping</h3>
                      {!isFromProduct && <p className="text-sm text-primary-100">We provide shipping labels</p>}
                    </div>
                  </div>
                  <div className={`flex items-start ${isFromProduct ? 'gap-2' : 'gap-3'} bg-white/10 ${isFromProduct ? 'p-2' : 'p-3'} rounded-lg backdrop-blur-sm`}>
                    <span className={isFromProduct ? 'text-xl' : 'text-2xl'}>⚡</span>
                    <div>
                      <h3 className={`${isFromProduct ? 'text-xs' : 'font-semibold'}`}>Fast Payment</h3>
                      {!isFromProduct && <p className="text-sm text-primary-100">Quick processing & payout</p>}
                    </div>
                  </div>
                  <div className={`flex items-start ${isFromProduct ? 'gap-2' : 'gap-3'} bg-white/10 ${isFromProduct ? 'p-2' : 'p-3'} rounded-lg backdrop-blur-sm`}>
                    <span className={isFromProduct ? 'text-xl' : 'text-2xl'}>🔒</span>
                    <div>
                      <h3 className={`${isFromProduct ? 'text-xs' : 'font-semibold'}`}>Secure & Trusted</h3>
                      {!isFromProduct && <p className="text-sm text-primary-100">Your data is protected</p>}
                    </div>
                  </div>
                </div>
              </div>

              <div className={isFromProduct ? "p-4 md:p-6" : "p-6 md:p-8"}>
                <form onSubmit={handleSubmit} className={isFromProduct ? "space-y-3" : "space-y-5"}>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="productType" className="block text-sm font-semibold text-gray-700 mb-2">
                    Product Type *
                  </label>
                  <select
                    id="productType"
                    name="productType"
                    required
                    value={formData.productType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                  >
                    <option value="">Select product type</option>
                    <option value="freestyle-50ct">FreeStyle 50ct Retail (NDC 99073-0120-50)</option>
                    <option value="accu-chek-aviva">Accu-Chek Aviva Plus 50ct Retail (NDC 65702-0407-10)</option>
                    <option value="contour-next">Contour Next 100ct Retail (NDC 0193-7312-21)</option>
                    <option value="dexcom-g7">Dexcom G7 Sensor (STP-AT-012)</option>
                    <option value="dexcom-g6-sensor">Dexcom G6 Sensor 3 Pack (REF STS-OE-003)</option>
                    <option value="dexcom-g6-transmitter">Dexcom G6 Transmitter Kit (NDC 08627-0016-01)</option>
                    <option value="omnipod-5">Omnipod 5 (Purple Box) (NDC 08508-3000-21)</option>
                    <option value="freestyle-libre-3">Freestyle Libre 3 Plus</option>
                    <option value="minimed-mio">Minimed Mio Advance MMT-242</option>
                    <option value="other">Other Supplies</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="brand" className="block text-sm font-semibold text-gray-700 mb-2">
                    Brand
                  </label>
                  <input
                    type="text"
                    id="brand"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    placeholder="e.g., Accu-Chek, OneTouch"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="quantity" className="block text-sm font-semibold text-gray-700 mb-2">
                    Quantity *
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    required
                    min="1"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="expirationDate" className="block text-sm font-semibold text-gray-700 mb-2">
                    Expiration Date
                  </label>
                  <input
                    type="date"
                    id="expirationDate"
                    name="expirationDate"
                    value={formData.expirationDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="condition" className="block text-sm font-semibold text-gray-700 mb-2">
                  Condition *
                </label>
                <select
                  id="condition"
                  name="condition"
                  required
                  value={formData.condition}
                  onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                >
                  <option value="">Select condition</option>
                  <option value="new">New - Unopened</option>
                  <option value="excellent">Excellent - Opened but unused</option>
                  <option value="good">Good - Lightly used</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Additional Information
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Any additional details about your supplies..."
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>✨</span>
                    <span>Accept Offer & Continue</span>
                    <span>→</span>
                  </>
                )}
              </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping Form Section */}
        {showShippingForm && (
          <div id="shipping-section" className="max-w-4xl mx-auto mt-4">
            <ShippingForm />
          </div>
        )}
      </div>
    </div>
  )
}

export default function Sell() {
  return (
    <Suspense fallback={
      <div className="section-padding bg-gradient-to-b from-primary-50 to-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    }>
      <SellContent />
    </Suspense>
  )
}

