'use client'

import { useState } from 'react'

interface ShippingFormProps {
  onFormSubmit?: (data: any) => void
}

export default function ShippingForm({ onFormSubmit }: ShippingFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    contactNumber: '',
    emailAddress: '',
    preferredPaymentMethod: '',
    paymentDetails: '',
    expectedShippingDay: '',
    boxesMintCondition: '',
    damageNotes: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (isSubmitting) {
      return // Prevent double submission
    }
    
    setIsSubmitting(true)
    
    try {
      console.log('Submitting shipping form...', formData)
      
      // Submit form to API
      const response = await fetch('/api/shipping', {
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
          localStorage.setItem('pendingShippingForm', JSON.stringify(formData))
        } else if (response.status === 400) {
          errorMessage = data.details || data.error || 'Please check your form and try again.'
        }
        
        throw new Error(errorMessage)
      }

      console.log('Shipping form submitted successfully:', data)
      
      // Clear any pending form data on success
      localStorage.removeItem('pendingShippingForm')
      
      // Call callback if provided
      if (onFormSubmit) {
        onFormSubmit(formData)
      }
      
      // Reset form first
      setFormData({
        name: '',
        address: '',
        contactNumber: '',
        emailAddress: '',
        preferredPaymentMethod: '',
        paymentDetails: '',
        expectedShippingDay: '',
        boxesMintCondition: '',
        damageNotes: '',
      })
      
      // Prepare email data for owner notification
      const emailBody = data.emailData.body
      const mailtoLink = `mailto:${data.emailData.to}?subject=${encodeURIComponent(data.emailData.subject)}&body=${encodeURIComponent(emailBody)}`
      
      // Show success message first
      alert('Thank you! Your shipping details have been submitted and saved. An email will be opened with your information. Please send it to complete the process.')
      
      // Open email client using a more reliable method
      setTimeout(() => {
        const link = document.createElement('a')
        link.href = mailtoLink
        link.target = '_blank'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }, 100)
    } catch (error: any) {
      console.error('Error submitting shipping form:', error)
      
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

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden fade-in-on-scroll">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white p-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">Thank you for accepting our offer!</h2>
        <p className="text-primary-100 text-sm">Please complete the form below so we can process your shipping label.</p>
      </div>

      <div className="p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              placeholder="Enter your full name"
            />
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
              Address *
            </label>
            <textarea
              id="address"
              name="address"
              required
              rows={3}
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              placeholder="Enter your complete address"
            />
          </div>

          {/* Contact Number */}
          <div>
            <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-2">
              Contact Number *
            </label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              required
              value={formData.contactNumber}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              placeholder="+1 234 567 8900"
            />
          </div>

          {/* Email Address */}
          <div>
            <label htmlFor="emailAddress" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address (for the label) *
            </label>
            <input
              type="email"
              id="emailAddress"
              name="emailAddress"
              required
              value={formData.emailAddress}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              placeholder="your.email@example.com"
            />
          </div>

          {/* Preferred Payment Method */}
          <div>
            <label htmlFor="preferredPaymentMethod" className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Payment Method *
            </label>
            <select
              id="preferredPaymentMethod"
              name="preferredPaymentMethod"
              required
              value={formData.preferredPaymentMethod}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            >
              <option value="">Select payment method</option>
              <option value="Venmo">Venmo</option>
              <option value="Check">Check</option>
              <option value="Zelle">Zelle</option>
              <option value="CashApp">CashApp</option>
              <option value="PayPal">PayPal</option>
            </select>
          </div>

          {/* Payment Details */}
          <div>
            <label htmlFor="paymentDetails" className="block text-sm font-medium text-gray-700 mb-2">
              Payment Details (Zelle or CashApp Number) *
            </label>
            <input
              type="text"
              id="paymentDetails"
              name="paymentDetails"
              required
              value={formData.paymentDetails}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              placeholder="Enter your payment details (phone number, email, or username)"
            />
            <p className="text-sm text-gray-500 mt-2">
              For Zelle or CashApp, enter your phone number or email address
            </p>
          </div>

          {/* Expected Shipping Day */}
          <div>
            <label htmlFor="expectedShippingDay" className="block text-sm font-medium text-gray-700 mb-2">
              Expected Shipping Day *
            </label>
            <input
              type="date"
              id="expectedShippingDay"
              name="expectedShippingDay"
              required
              value={formData.expectedShippingDay}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Are all boxes in mint condition? */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Are all boxes in mint condition? *
            </label>
            <div className="flex gap-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="boxesMintCondition"
                  value="Yes"
                  required
                  checked={formData.boxesMintCondition === 'Yes'}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                />
                <span className="ml-2 text-gray-700">Yes</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="boxesMintCondition"
                  value="No"
                  required
                  checked={formData.boxesMintCondition === 'No'}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                />
                <span className="ml-2 text-gray-700">No</span>
              </label>
            </div>
          </div>

          {/* Damage Notes */}
          {formData.boxesMintCondition === 'No' && (
            <div>
              <label htmlFor="damageNotes" className="block text-sm font-medium text-gray-700 mb-2">
                Please describe any damage (rips, stains, or other issues)
              </label>
              <textarea
                id="damageNotes"
                name="damageNotes"
                rows={4}
                value={formData.damageNotes}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                placeholder="Describe any damage to the boxes..."
              />
            </div>
          )}

          {/* Important Note */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800 text-sm">
              <strong>Please note:</strong> If any boxes have rips, stains, or other damage, let us know in advance to avoid returns or deductions.
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white font-bold py-4 px-6 rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Shipping Details'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

