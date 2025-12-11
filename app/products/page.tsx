'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Six unique products
const mainProducts = [
  { id: 1, name: 'Dexcom G7 Sensor', code: 'STP-AT-012', image: '/images/dexcom-g7.png' },
  { id: 2, name: 'Omnipod 5 Pods', code: 'NDC 08508-3000-21', image: '/images/product_image_2.jpeg' },
  { id: 3, name: 'FreeStyle Libre 3 Plus', code: '', image: '/images/product_image_3.jpeg' },
  { id: 4, name: 'Dexcom G6', code: 'STP-AT-012', image: '/images/product-5.png' },
  { id: 5, name: 'Omnipod Dash Pods', code: 'NDC 08508-3000-21', image: '/images/product-6.png' },
  { id: 6, name: 'Dexcom G7 Sensor Pack', code: 'STP-AT-012', image: '/images/dexcom-g7.png' },
]

export default function Products() {
  const router = useRouter()

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

  const handleSellNow = (productId: number, productName: string) => {
    // Store selected product in sessionStorage
    sessionStorage.setItem('selectedProduct', JSON.stringify({ id: productId, name: productName }))
    // Redirect to shipping form page
    router.push('/products/sell')
  }

  return (
    <div className="section-padding bg-gradient-to-b from-primary-50 to-white">
      <div className="container-custom">
        <h1 className="text-4xl sm:text-5xl font-bold text-primary-700 mb-3 text-center">
          Our Products
        </h1>
        <p className="text-lg text-gray-700 text-center mb-6">
          Explore a wide range of products and many more! Just reach out with what you need and get it with ease.
        </p>


        <div className="max-w-6xl mx-auto mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mainProducts.map((product, index) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden fade-in-on-scroll hover:shadow-xl transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-48 md:h-64 bg-gray-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary-700 mb-2">{product.name}</h3>
                  <button
                    onClick={() => handleSellNow(product.id, product.name)}
                    className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                  >
                    Sell Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

