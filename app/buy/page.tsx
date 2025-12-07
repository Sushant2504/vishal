'use client'

import { useState, useEffect, Suspense } from 'react'
import Image from 'next/image'
import PaymentSection from '@/components/PaymentSection'
import { useSearchParams } from 'next/navigation'

function BuyContent() {
  const searchParams = useSearchParams()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    product: '',
    quantity: '',
    message: '',
  })
  const [showPayment, setShowPayment] = useState(false)

  useEffect(() => {
    // Check if we should show payment section (from product click)
    const showPaymentFromStorage = sessionStorage.getItem('showPayment')
    const selectedProduct = sessionStorage.getItem('selectedProduct')
    
    if (showPaymentFromStorage === 'true' || searchParams.get('product')) {
      // Pre-fill product if selected
      if (selectedProduct) {
        try {
          const product = JSON.parse(selectedProduct)
          setFormData(prev => ({ ...prev, product: product.id.toString() }))
        } catch (e) {
          console.error('Error parsing selected product:', e)
        }
      }
      
      // Show payment section and scroll to it
      setShowPayment(true)
      setTimeout(() => {
        const paymentSection = document.getElementById('payment-section')
        if (paymentSection) {
          paymentSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 300)
      
      // Clear the flag
      sessionStorage.removeItem('showPayment')
      sessionStorage.removeItem('selectedProduct')
    }
  }, [searchParams])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
    setShowPayment(true)
    // Scroll to payment section
    setTimeout(() => {
      const paymentSection = document.getElementById('payment-section')
      if (paymentSection) {
        paymentSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="section-padding">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-primary-700 mb-4 text-center">
            Buy Supplies
          </h1>
          <p className="text-xl text-gray-600 text-center mb-6">
            Browse and purchase diabetic supplies securely
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <Image
                  src="/images/Product image 1.jpg"
                  alt="Diabetic Supplies"
                  width={400}
                  height={300}
                  className="w-full h-auto rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold text-primary-700 mb-2">
                  Test Strips
                </h3>
                <p className="text-gray-600">
                  High-quality diabetic test strips available in various brands
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <Image
                  src="/images/Product image 3.jpg"
                  alt="Diabetic Supplies"
                  width={400}
                  height={300}
                  className="w-full h-auto rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold text-primary-700 mb-2">
                  Medical Supplies
                </h3>
                <p className="text-gray-600">
                  Complete range of diabetic care products
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-primary-700 mb-6">
                Request a Quote
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="product" className="block text-sm font-medium text-gray-700 mb-1">
                    Product Interest
                  </label>
                  <select
                    id="product"
                    name="product"
                    value={formData.product}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Select a product</option>
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
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="1"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <button type="submit" className="btn-primary w-full">
                  Continue to Payment
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Payment Section */}
        {showPayment && (
          <div id="payment-section" className="max-w-4xl mx-auto mt-6">
            <PaymentSection amount="150.00" />
          </div>
        )}
      </div>
    </div>
  )
}

export default function Buy() {
  return (
    <Suspense fallback={
      <div className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    }>
      <BuyContent />
    </Suspense>
  )
}

