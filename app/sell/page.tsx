'use client'

import { useState, useEffect, Suspense } from 'react'
import PaymentSection from '@/components/PaymentSection'
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
    <div className="section-padding bg-gradient-to-b from-primary-50 to-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-primary-700 mb-4 text-center">
            Sell Supplies
          </h1>
          <p className="text-xl text-gray-600 text-center mb-12">
            Fill out our form to sell your unused diabetic supplies. Fast payment guaranteed!
          </p>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-6 p-4 bg-primary-50 rounded-lg">
              <h2 className="text-lg font-semibold text-primary-700 mb-2">
                Why Sell With Us?
              </h2>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Competitive buyback prices</li>
                <li>Free shipping labels provided</li>
                <li>Fast payment processing</li>
                <li>Secure and trusted service</li>
              </ul>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
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

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="productType" className="block text-sm font-medium text-gray-700 mb-1">
                    Product Type *
                  </label>
                  <select
                    id="productType"
                    name="productType"
                    required
                    value={formData.productType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
                  <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">
                    Brand
                  </label>
                  <input
                    type="text"
                    id="brand"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    placeholder="e.g., Accu-Chek, OneTouch"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Expiration Date
                  </label>
                  <input
                    type="date"
                    id="expirationDate"
                    name="expirationDate"
                    value={formData.expirationDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">
                  Condition *
                </label>
                <select
                  id="condition"
                  name="condition"
                  required
                  value={formData.condition}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select condition</option>
                  <option value="new">New - Unopened</option>
                  <option value="excellent">Excellent - Opened but unused</option>
                  <option value="good">Good - Lightly used</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Information
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Any additional details about your supplies..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <button type="submit" className="btn-primary w-full text-lg">
                Continue to Payment
              </button>
            </form>
          </div>
        </div>

        {/* Payment Section */}
        {showPayment && (
          <div id="payment-section" className="max-w-4xl mx-auto mt-12">
            <PaymentSection amount="150.00" />
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

