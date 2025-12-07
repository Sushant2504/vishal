'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

export default function Home() {
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    // Intersection Observer for scroll animations
    observerRef.current = new IntersectionObserver(
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
    elements.forEach((el) => observerRef.current?.observe(el))

    return () => {
      elements.forEach((el) => observerRef.current?.unobserve(el))
    }
  }, [])

  return (
    <div>
      {/* Hero Section with Opening Lines - Reduced Height */}
      <section className="relative min-h-[400px] md:min-h-[450px] flex items-center justify-center bg-gradient-to-br from-primary-600 to-primary-800 text-white overflow-hidden -mb-4">
        <div className="absolute inset-0 bg-black/20"></div>
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-primary-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
        <div className="relative z-10 container-custom px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left animate-fade-in-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                Secure & Simple Buyback for Your Extra Diabetic Supplies
              </h1>
              <div className="space-y-3 mb-6 text-base sm:text-lg">
                <p className="flex items-center gap-3 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  <span className="text-primary-200 text-xl">✓</span>
                  <span>Exclusive Deals & Added Bonuses for Your Extras</span>
                </p>
                <p className="flex items-center gap-3 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                  <span className="text-primary-200 text-xl">✓</span>
                  <span>Fast, Hassle-Free Process with Secure Payments</span>
                </p>
                <p className="flex items-center gap-3 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                  <span className="text-primary-200 text-xl">✓</span>
                  <span>Sell Today with Confidence & Get Paid Quickly</span>
                </p>
              </div>
              <Link href="/products" className="btn-primary text-lg inline-block animate-scale-in" style={{ animationDelay: '0.8s' }}>
                Sell Now
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 animate-fade-in-right">
              <div className="relative h-32 md:h-40 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
                <Image
                  src="/images/product_image_1.jpeg"
                  alt="Happy customer"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-32 md:h-40 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
                <Image
                  src="/images/product_image_2.jpeg"
                  alt="Satisfied customer"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-32 md:h-40 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
                <Image
                  src="/images/product_image_3.jpeg"
                  alt="Team member"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-32 md:h-40 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
                <Image
                  src="/images/product_image_4.jpeg"
                  alt="Team member"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Vision Section */}
      <section className="section-padding bg-white -mt-4">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="fade-in-on-scroll">
                <h2 className="text-3xl sm:text-4xl font-bold text-primary-700 mb-6">
                  Our Vision
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  At Victorious Medical, we believe selling your unused diabetic supplies is more than just a transaction —it&apos;s a meaningful way to make a difference. Many individuals face challenges affording the supplies they need to manage diabetes, and your surplus items can help bridge that gap. Instead of letting valuable resources go unused, you can ensure they reach those who truly need them, while earning extra cash for yourself. It&apos;s a win-win: support others, reduce waste, and unlock the full value of your supplies.
                </p>
              </div>
              <div className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-lg fade-in-on-scroll hover:scale-105 transition-transform duration-300">
                <Image
                  src="/images/about-image.jpg"
                  alt="Our Vision"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dedicated Assistants Section */}
      <section className="section-padding bg-primary-50 -mt-4">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-700 mb-6 fade-in-on-scroll">
              Turn Your Extras Into Value
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8 fade-in-on-scroll">
              Victorious Medical is committed to helping the diabetes community by offering a simple, reliable, and secure way to sell extra supplies. We understand that managing diabetes requires constant care, and sometimes supplies accumulate or go unused. That&apos;s where our buyback program steps in —providing a convenient solution that transforms surplus into opportunity.
            </p>
            <div className="relative h-64 rounded-lg overflow-hidden shadow-lg max-w-2xl mx-auto fade-in-on-scroll hover:scale-105 transition-transform duration-300">
              <Image
                src="/images/contact-image.jpg"
                alt="Support Team"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="section-padding bg-white -mt-4">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-700 mb-6 text-center fade-in-on-scroll">
              Our Mission
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8 text-center fade-in-on-scroll">
              At Victorious Medical, our mission is to reduce waste and maximize the value of unused diabetic supplies. By partnering with us, you can sell your extras with confidence, knowing they&apos;ll be redirected to those who need them most. Our streamlined buyback process is designed to be stress-free, transparent, and rewarding.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-primary-50 p-6 rounded-lg text-center fade-in-on-scroll hover:scale-105 transition-transform duration-300 hover:shadow-lg">
                <h3 className="text-xl font-bold text-primary-700 mb-3">Competitive Offers</h3>
                <p className="text-gray-700">Ensuring you get the best value</p>
              </div>
              <div className="bg-primary-50 p-6 rounded-lg text-center fade-in-on-scroll hover:scale-105 transition-transform duration-300 hover:shadow-lg" style={{ animationDelay: '0.2s' }}>
                <h3 className="text-xl font-bold text-primary-700 mb-3">Confidentiality</h3>
                <p className="text-gray-700">Protecting your privacy at every step</p>
              </div>
              <div className="bg-primary-50 p-6 rounded-lg text-center fade-in-on-scroll hover:scale-105 transition-transform duration-300 hover:shadow-lg" style={{ animationDelay: '0.4s' }}>
                <h3 className="text-xl font-bold text-primary-700 mb-3">Exceptional Service</h3>
                <p className="text-gray-700">Making the experience smooth and professional</p>
              </div>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mt-8 text-center fade-in-on-scroll">
              Together, we can create a positive impact on both the community and the environment by giving unused supplies a second life.
            </p>
          </div>
        </div>
      </section>

      {/* How We Help Section */}
      <section className="section-padding bg-primary-50 -mt-4">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-lg fade-in-on-scroll hover:scale-105 transition-transform duration-300">
                <Image
                  src="/images/about-image.jpg"
                  alt="How We Help"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="fade-in-on-scroll">
                <h2 className="text-3xl sm:text-4xl font-bold text-primary-700 mb-6">
                  How We Help
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our friendly virtual assistants make the selling process effortless. They&apos;ll guide you through each step —providing clear instructions, answering questions, and assisting with packaging and shipping. With Victorious Medical, turning your unused supplies into cash is quick, secure, and hassle-free.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

