'use client'

import Link from 'next/link'
import { useEffect } from 'react'

export default function PaymentMethods() {
  useEffect(() => {
    // Add scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = document.querySelectorAll('.fade-in-on-scroll')
    elements.forEach((el) => observer.observe(el))

    return () => {
      elements.forEach((el) => observer.unobserve(el))
    }
  }, [])
  return (
    <div className="section-padding bg-gradient-to-b from-primary-50 to-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <Link href="/products" className="text-primary-600 hover:text-primary-700 mb-6 inline-block">
            ← Back to Products
          </Link>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-primary-700 mb-6 text-center">
            Payment Methods
          </h1>
          
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8 fade-in-on-scroll">
            <p className="text-lg text-gray-700 mb-8 text-center">
              We make selling your extra diabetic supplies simple and stress-free with fast and secure payments. Choose the option that works best for you:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/payment" className="fade-in-on-scroll">
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-lg text-white hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-4xl">🛒</div>
                    <h3 className="text-xl font-bold">Amazon Pay</h3>
                  </div>
                  <p className="text-orange-100">Pay securely with your Amazon account</p>
                </div>
              </Link>

              <Link href="/payment" className="fade-in-on-scroll">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-lg text-white hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-4xl">💳</div>
                    <h3 className="text-xl font-bold">Google Pay</h3>
                  </div>
                  <p className="text-blue-100">Quick and secure payment with Google Pay</p>
                </div>
              </Link>

              <Link href="/payment" className="fade-in-on-scroll">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-lg text-white hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-4xl">💎</div>
                    <h3 className="text-xl font-bold">Razorpay</h3>
                  </div>
                  <p className="text-purple-100">Secure payment gateway powered by Razorpay</p>
                </div>
              </Link>
              <Link href="/payment" className="fade-in-on-scroll">
                <div className="bg-primary-50 p-6 rounded-lg hover:scale-105 transition-transform duration-300 hover:shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-primary-500 rounded-full p-3">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-primary-700">Fast Payment within 24 Hours</h3>
                  </div>
                  <p className="text-gray-700">Get paid quickly and securely</p>
                </div>
              </Link>

              <Link href="/payment" className="fade-in-on-scroll">
                <div className="bg-primary-50 p-6 rounded-lg hover:scale-105 transition-transform duration-300 hover:shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-primary-500 rounded-full p-3">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-primary-700">Cash App</h3>
                  </div>
                  <p className="text-gray-700">Instant payment via Cash App</p>
                </div>
              </Link>

              <Link href="/payment" className="fade-in-on-scroll">
                <div className="bg-primary-50 p-6 rounded-lg hover:scale-105 transition-transform duration-300 hover:shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-primary-500 rounded-full p-3">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-primary-700">Venmo</h3>
                  </div>
                  <p className="text-gray-700">Quick and easy Venmo payments</p>
                </div>
              </Link>

              <Link href="/payment" className="fade-in-on-scroll">
                <div className="bg-primary-50 p-6 rounded-lg hover:scale-105 transition-transform duration-300 hover:shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-primary-500 rounded-full p-3">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-primary-700">Zelle</h3>
                  </div>
                  <p className="text-gray-700">Direct bank transfer via Zelle</p>
                </div>
              </Link>

              <Link href="/payment" className="fade-in-on-scroll">
                <div className="bg-primary-50 p-6 rounded-lg hover:scale-105 transition-transform duration-300 hover:shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-primary-500 rounded-full p-3">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-primary-700">PayPal</h3>
                  </div>
                  <p className="text-gray-700">Secure PayPal payments</p>
                </div>
              </Link>

              <Link href="/payment" className="fade-in-on-scroll">
                <div className="bg-primary-50 p-6 rounded-lg hover:scale-105 transition-transform duration-300 hover:shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-primary-500 rounded-full p-3">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-primary-700">Cheque</h3>
                  </div>
                  <p className="text-gray-700">
                    <Link href="/contact" className="text-primary-600 hover:text-primary-700 underline">
                      Learn More
                    </Link>
                  </p>
                </div>
              </Link>
            </div>
            
            <div className="mt-8 p-6 bg-primary-100 rounded-lg text-center fade-in-on-scroll hover:scale-105 transition-transform duration-300">
              <p className="text-xl font-bold text-primary-700">
                No delays, no hassle — just quick and reliable payments straight to you.
              </p>
            </div>
            
            <div className="mt-8 text-center fade-in-on-scroll">
              <Link href="/payment" className="btn-primary text-lg inline-block">
                Try Demo Payment Options
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

