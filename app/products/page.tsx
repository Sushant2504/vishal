'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const products = [
  { id: 1, name: 'FreeStyle 50ct Retail', code: 'NDC 99073-0120-50' },
  { id: 2, name: 'Accu-Chek Aviva Plus 50ct Retail', code: 'NDC 65702-0407-10' },
  { id: 3, name: 'Contour Next 100ct Retail', code: 'NDC 0193-7312-21' },
  { id: 4, name: 'Dexcom G7 Sensor', code: 'STP-AT-012' },
  { id: 5, name: 'Dexcom G6 Sensor 3 Pack', code: 'REF STS-OE-003' },
  { id: 6, name: 'Dexcom G6 Transmitter Kit', code: 'NDC 08627-0016-01 (REF STT-OE-001)' },
  { id: 7, name: 'Omnipod 5 (Purple Box)', code: 'NDC 08508-3000-21' },
  { id: 8, name: 'Freestyle Libre 3 Plus', code: '' },
  { id: 9, name: 'Minimed Mio Advance', code: 'MMT-242' },
]

export default function Products() {
  const router = useRouter()
  const [selectedOption, setSelectedOption] = useState<'buy' | 'sell' | null>(null)

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

  const handleProductClick = (productId: number, productName: string) => {
    // Store selected product in sessionStorage
    sessionStorage.setItem('selectedProduct', JSON.stringify({ id: productId, name: productName }))
    
    // Redirect directly to payment page
    router.push(`/products/payment?product=${productId}`)
  }

  return (
    <div className="section-padding bg-gradient-to-b from-primary-50 to-white">
      <div className="container-custom">
        <h1 className="text-4xl sm:text-5xl font-bold text-primary-700 mb-12 text-center">
          Choose an Option
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {/* Buy Supplies Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <div className="h-48 bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
              <Image
                src="/images/Product image 1.jpg"
                alt="Buy Supplies"
                width={300}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8">
              <h2 className="text-2xl font-bold text-primary-700 mb-4">Buy Supplies</h2>
              <p className="text-gray-600 mb-6">
                Browse and purchase diabetic supplies securely. Find the products you need at competitive prices.
              </p>
              <button 
                onClick={() => setSelectedOption('buy')}
                className="btn-primary inline-block w-full text-center"
              >
                Shop Now
              </button>
            </div>
          </div>

          {/* Sell Supplies Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <div className="h-48 bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
              <Image
                src="/images/Product image 2.jpg"
                alt="Sell Supplies"
                width={300}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8">
              <h2 className="text-2xl font-bold text-primary-700 mb-4">Sell Supplies</h2>
              <p className="text-gray-600 mb-6">
                Sell your unused diabetic supplies. Get competitive prices, free shipping, and fast payment.
              </p>
              <button 
                onClick={() => setSelectedOption('sell')}
                className="btn-primary inline-block w-full text-center"
              >
                Sell Now
              </button>
            </div>
          </div>
        </div>

        {/* Products List Section */}
        <div className="max-w-6xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-700 mb-8 text-center">
            Our Products
          </h2>
          <p className="text-lg text-gray-700 text-center mb-12">
            Explore a wide range of products and many more! Just reach out with what you need and get it with ease.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <button
                key={product.id}
                onClick={() => handleProductClick(product.id, product.name)}
                className="bg-white rounded-full p-6 shadow-lg hover:shadow-xl transition-all duration-300 aspect-square flex flex-col items-center justify-center text-center fade-in-on-scroll hover:scale-110 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-primary-100 rounded-full w-20 h-20 flex items-center justify-center mb-4">
                  <Image
                    src="/images/Product image 1.jpg"
                    alt={product.name}
                    width={60}
                    height={60}
                    className="rounded-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-primary-700 mb-2 text-sm">{product.name}</h3>
                {product.code && (
                  <p className="text-xs text-gray-600">{product.code}</p>
                )}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

