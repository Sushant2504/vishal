'use client'

import { useState } from 'react'

interface PaymentSectionProps {
  amount?: string
  onPaymentComplete?: () => void
}

export default function PaymentSection({ amount = '150.00', onPaymentComplete }: PaymentSectionProps) {
  const [selectedPayment, setSelectedPayment] = useState<string>('')
  const [showPaymentDetails, setShowPaymentDetails] = useState(false)
  const [paymentData, setPaymentData] = useState({
    name: '',
    email: '',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    upiId: '',
  })

  const paymentMethods = [
    {
      id: 'amazon-pay',
      name: 'Amazon Pay',
      icon: '🛒',
      color: 'from-orange-500 to-orange-600',
      description: 'Pay securely with your Amazon account',
      isBest: true,
      badge: 'Most Popular',
    },
    {
      id: 'google-pay',
      name: 'Google Pay',
      icon: '💳',
      color: 'from-blue-500 to-blue-600',
      description: 'Quick and secure payment with Google Pay',
      isBest: true,
      badge: 'Recommended',
    },
    {
      id: 'razorpay',
      name: 'Razorpay',
      icon: '💎',
      color: 'from-purple-500 to-purple-600',
      description: 'Secure payment gateway powered by Razorpay',
      isBest: true,
      badge: 'Fastest',
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: '💳',
      color: 'from-gray-600 to-gray-700',
      description: 'Visa, Mastercard, Amex, and more',
      isBest: false,
    },
    {
      id: 'upi',
      name: 'UPI',
      icon: '📱',
      color: 'from-green-500 to-green-600',
      description: 'Pay using UPI apps like PhonePe, Paytm',
      isBest: false,
    },
    {
      id: 'cash-on-delivery',
      name: 'Cash on Delivery',
      icon: '💰',
      color: 'from-yellow-500 to-yellow-600',
      description: 'Pay when you receive your order',
      isBest: false,
    },
  ]

  const bestPaymentMethods = paymentMethods.filter(m => m.isBest)
  const otherPaymentMethods = paymentMethods.filter(m => !m.isBest)

  const handlePaymentSelect = (methodId: string) => {
    setSelectedPayment(methodId)
    setShowPaymentDetails(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Payment method selected: ${paymentMethods.find(m => m.id === selectedPayment)?.name}. In production, this would process the payment.`)
    if (onPaymentComplete) {
      onPaymentComplete()
    }
  }

  return (
    <div className="mt-12 bg-white rounded-2xl shadow-2xl overflow-hidden fade-in-on-scroll">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white p-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">Complete Your Payment</h2>
        <p className="text-primary-100 text-sm">Secure and fast payment processing</p>
      </div>

      <div className="p-6 md:p-8">
        {/* Order Summary */}
        <div className="bg-primary-50 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-bold text-primary-700 mb-4">Order Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-700">Subtotal</span>
              <span className="font-semibold">${amount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Shipping</span>
              <span className="font-semibold text-green-600">Free</span>
            </div>
            <div className="border-t border-primary-200 pt-2 mt-2">
              <div className="flex justify-between">
                <span className="text-lg font-bold text-primary-700">Total</span>
                <span className="text-2xl font-bold text-primary-700">${amount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods Grid */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Select Payment Method</h3>
          <p className="text-gray-600 mb-6">Choose from our recommended payment options</p>
          
          {/* Best Payment Options */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <h4 className="text-lg font-semibold text-primary-700">Best Payment Options</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {bestPaymentMethods.map((method, index) => (
                <button
                  key={method.id}
                  onClick={() => handlePaymentSelect(method.id)}
                  className={`relative p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                    selectedPayment === method.id
                      ? 'border-primary-500 bg-primary-50 shadow-lg ring-2 ring-primary-300'
                      : 'border-primary-300 bg-gradient-to-br from-white to-primary-50 hover:border-primary-400'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Best Badge */}
                  {method.badge && (
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
                      ⭐ {method.badge}
                    </div>
                  )}
                  
                  <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${method.color} rounded-bl-2xl flex items-center justify-center text-2xl shadow-lg`}>
                    {method.icon}
                  </div>
                  <div className="pr-16">
                    <h4 className="text-xl font-bold text-gray-800 mb-2">{method.name}</h4>
                    <p className="text-sm text-gray-600">{method.description}</p>
                  </div>
                  {selectedPayment === method.id && (
                    <div className="absolute top-4 right-4">
                      <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center shadow-md">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Other Payment Options */}
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Other Payment Options</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {otherPaymentMethods.map((method, index) => (
                <button
                  key={method.id}
                  onClick={() => handlePaymentSelect(method.id)}
                  className={`relative p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                    selectedPayment === method.id
                      ? 'border-primary-500 bg-primary-50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-primary-300'
                  }`}
                  style={{ animationDelay: `${(index + bestPaymentMethods.length) * 0.1}s` }}
                >
                  <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${method.color} rounded-bl-2xl flex items-center justify-center text-2xl`}>
                    {method.icon}
                  </div>
                  <div className="pr-16">
                    <h4 className="text-xl font-bold text-gray-800 mb-2">{method.name}</h4>
                    <p className="text-sm text-gray-600">{method.description}</p>
                  </div>
                  {selectedPayment === method.id && (
                    <div className="absolute top-4 right-4">
                      <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Payment Details Form */}
        {showPaymentDetails && selectedPayment && (
          <div className="bg-gray-50 rounded-xl p-6 md:p-8 fade-in-on-scroll">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              {paymentMethods.find(m => m.id === selectedPayment)?.name} Details
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Common Fields */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={paymentData.name}
                    onChange={(e) => setPaymentData({ ...paymentData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={paymentData.email}
                    onChange={(e) => setPaymentData({ ...paymentData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={paymentData.phone}
                  onChange={(e) => setPaymentData({ ...paymentData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="+1 234 567 8900"
                />
              </div>

              {/* Card Payment Fields */}
              {selectedPayment === 'card' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={19}
                      value={paymentData.cardNumber}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim()
                        setPaymentData({ ...paymentData, cardNumber: value })
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={5}
                        value={paymentData.expiryDate}
                        onChange={(e) => {
                          let value = e.target.value.replace(/\D/g, '')
                          if (value.length >= 2) {
                            value = value.slice(0, 2) + '/' + value.slice(2, 4)
                          }
                          setPaymentData({ ...paymentData, expiryDate: value })
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV *
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={4}
                        value={paymentData.cvv}
                        onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value.replace(/\D/g, '') })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* UPI Payment Field */}
              {selectedPayment === 'upi' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    UPI ID *
                  </label>
                  <input
                    type="text"
                    required
                    value={paymentData.upiId}
                    onChange={(e) => setPaymentData({ ...paymentData, upiId: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="yourname@paytm"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Supported: PhonePe, Paytm, Google Pay, BHIM UPI
                  </p>
                </div>
              )}

              {/* Cash on Delivery - No additional fields */}
              {selectedPayment === 'cash-on-delivery' && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-yellow-800">
                    <strong>Note:</strong> You will pay cash when you receive your order. Please keep exact change ready.
                  </p>
                </div>
              )}

              {/* Amazon Pay / Google Pay / Razorpay - Show as integrated */}
              {(selectedPayment === 'amazon-pay' || selectedPayment === 'google-pay' || selectedPayment === 'razorpay') && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                  <div className="text-4xl mb-4">
                    {selectedPayment === 'amazon-pay' && '🛒'}
                    {selectedPayment === 'google-pay' && '💳'}
                    {selectedPayment === 'razorpay' && '💎'}
                  </div>
                  <p className="text-blue-800 font-semibold mb-2">
                    You will be redirected to {paymentMethods.find(m => m.id === selectedPayment)?.name} for secure payment
                  </p>
                  <p className="text-sm text-blue-600">
                    Your payment details are secure and encrypted
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white font-bold py-4 px-6 rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Pay ${amount} Now
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Security Badge */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>Secure Payment</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>SSL Encrypted</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Fast Processing</span>
          </div>
        </div>
      </div>
    </div>
  )
}

