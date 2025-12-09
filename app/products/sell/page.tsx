'use client'

import ShippingForm from '@/components/ShippingForm'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ProductsSell() {
  const router = useRouter()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.1 }
    )
    const elements = document.querySelectorAll('.fade-in-on-scroll')
    elements.forEach((el) => observer.observe(el))

    setTimeout(() => {
      const shippingSection = document.getElementById('shipping-section')
      shippingSection?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)

    return () => {
      elements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  const handleFormSubmit = () => {
    // After successful submission, go back to products
    router.push('/products')
  }

  return (
    <div className="section-padding bg-gradient-to-b from-primary-50 to-white">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white p-6 sm:p-8">
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">Shipping Details</h1>
              <p className="text-primary-100 text-sm sm:text-base">
                Thank you for accepting our offer! Please complete the form below so we can process your shipping label.
              </p>
            </div>

            <div id="shipping-section" className="p-6 sm:p-8">
              <ShippingForm onFormSubmit={handleFormSubmit} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

