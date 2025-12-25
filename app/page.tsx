'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

export default function Home() {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const paymentStrip = [
    { src: '/images/photo-1.jpeg', label: 'Cash App • $300 sent' },
    { src: '/images/photo-2.jpeg', label: 'PayPal • $405 sent' },
    { src: '/images/photo-3.jpeg', label: 'PayPal • $1,670 sent' },
    { src: '/images/photo-4.jpeg', label: 'Cash App • $3,450 sent' },
    { src: '/images/photo-6.jpeg', label: 'PayPal • $525 sent' },
    { src: '/images/photo-7.jpeg', label: 'PayPal • confirmed payout' },
  ]

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
      {/* Payment Proof Strip (top) */}
      <section className="bg-white/90 backdrop-blur border-b border-primary-100">
        <div className="relative overflow-hidden container-custom py-8">
          <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
          <div className="flex gap-8 animate-strip items-center min-h-[320px]">
            {[...paymentStrip, ...paymentStrip].map((item, idx) => (
              <div
                key={`${item.src}-${idx}`}
                className="flex flex-col items-center gap-4 px-7 py-7 bg-white shadow-md border border-primary-100 rounded-2xl min-w-[300px]"
              >
                <div className="relative h-40 w-40 overflow-hidden rounded-2xl border border-primary-100 bg-white">
                  <Image src={item.src} alt={item.label} fill className="object-cover" sizes="180px" />
                </div>
                <div className="text-lg font-semibold text-primary-800 text-center whitespace-nowrap">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
        <style jsx>{`
          @keyframes strip-scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-strip {
            width: max-content;
            animation: strip-scroll 20s linear infinite;
            padding: 6px 0;
          }
        `}</style>
      </section>

      {/* Payment Confidence Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-4 fade-in-on-scroll">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary-600">Join our happy clients and get paid through</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-primary-800">Seamless Payments. Faster Care.</h2>
              <p className="text-lg text-gray-700">
                At Victorious Medical Bupack, we make payments simple and secure so your supplies move without delay.
                Choose the method that fits your lifestyle and let us handle the rest.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {['CashApp', 'Venmo', 'Zelle', 'PayPal', 'Cash', 'Wire / Certified Cheque'].map((method) => (
                  <div
                    key={method}
                    className="flex items-center gap-2 rounded-lg border border-primary-100 bg-primary-50 px-3 py-2 text-primary-800 text-sm font-medium shadow-sm"
                  >
                    <span className="text-primary-600">✓</span>
                    <span>{method}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <p className="text-gray-700">
                  Reliable processing for digital wallets and traditional payments, with bank-grade security for high-volume accounts.
                </p>
                <p className="text-gray-700">
                  Flexible terms for facilities and individuals, handled with privacy and transparency by our finance team.
                </p>
              </div>
            </div>
            <div className="fade-in-on-scroll">
              <div className="rounded-2xl border border-primary-100 bg-primary-50 p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-primary-800 mb-2">Payment Confirmation</h3>
                <p className="text-gray-700 mb-4">
                  Every payout is confirmed and tracked. You&apos;ll know the moment funds are sent—no guesswork.
                </p>
                <div className="grid gap-3 text-sm text-gray-800">
                  <div className="rounded-lg bg-white p-3 border border-primary-100 shadow-sm">
                    <div className="font-semibold text-primary-700">Mobile Apps</div>
                    <div>CashApp • Venmo • Zelle</div>
                  </div>
                  <div className="rounded-lg bg-white p-3 border border-primary-100 shadow-sm">
                    <div className="font-semibold text-primary-700">Digital Wallets</div>
                    <div>PayPal for secure, encrypted checkout</div>
                  </div>
                  <div className="rounded-lg bg-white p-3 border border-primary-100 shadow-sm">
                    <div className="font-semibold text-primary-700">Traditional Options</div>
                    <div>Cash • Certified Cheques • Bank wires for bulk/wholesale</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section with People Images - Extracted from PDF */}
      <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 text-white overflow-hidden -mb-4">
        <div className="container-custom px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center md:text-left animate-fade-in-left">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                Turn Your Unused Supplies Into Cash
              </h2>
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
            {/* Success Stories Images */}
            <div className="grid grid-cols-2 gap-3 md:gap-4 lg:gap-5 animate-fade-in-right">
              <div className="relative aspect-[4/3] md:aspect-[5/4] max-h-60 md:max-h-64 lg:max-h-72 rounded-2xl overflow-hidden shadow-2xl hover:scale-105 hover:-translate-y-1 transition-all duration-300 border-2 border-white/25 hover:border-white/50 bg-white/10">
                <Image
                  src="/images/exchange-hero-alt.jpg"
                  alt="Exchange your diabetic supplies into cash"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="relative aspect-[4/3] md:aspect-[5/4] max-h-60 md:max-h-64 lg:max-h-72 rounded-2xl overflow-hidden shadow-2xl hover:scale-105 hover:-translate-y-1 transition-all duration-300 border-2 border-white/25 hover:border-white/50 bg-white/10">
                <Image
                  src="/images/suplements.png"
                  alt="Extra supplies buyback"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="relative aspect-[4/3] md:aspect-[5/4] max-h-60 md:max-h-64 lg:max-h-72 rounded-2xl overflow-hidden shadow-2xl hover:scale-105 hover:-translate-y-1 transition-all duration-300 border-2 border-white/25 hover:border-white/50 bg-white/10">
                <Image
                  src="/images/banner-1.jpeg"
                  alt="Victorious Medical Banner"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="relative aspect-[4/3] md:aspect-[5/4] max-h-60 md:max-h-64 lg:max-h-72 rounded-2xl overflow-hidden shadow-2xl hover:scale-105 hover:-translate-y-1 transition-all duration-300 border-2 border-white/25 hover:border-white/50 bg-white/10">
                <Image
                  src="/images/exchange.png"
                  alt="Exchange your diabetic supplies for cash"
                  fill
                  className="object-cover"
                  priority
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
                  src="/images/home-6.png"
                  alt="Teamwork and Support"
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

      {/* Our Team Section */}
      <section className="section-padding bg-white -mt-4">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-700 mb-6 text-center fade-in-on-scroll">
              Our Professional Team
            </h2>
            <div className="relative h-64 md:h-96 rounded-lg overflow-hidden shadow-lg max-w-3xl mx-auto fade-in-on-scroll hover:scale-105 transition-transform duration-300">
              <Image
                src="/images/home-7.png"
                alt="Our Professional Team"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mt-6 text-center fade-in-on-scroll">
              Our dedicated team of professionals is committed to providing you with the best service and ensuring a smooth, secure transaction process.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

