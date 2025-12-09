'use client'

import Image from 'next/image'
import Link from 'next/link'

const allProducts = [
  { id: 1, name: 'FreeStyle 50ct Retail', code: 'NDC 99073-0120-50', image: '/images/product_image_1.jpeg' },
  { id: 2, name: 'Accu-Chek Aviva Plus 50ct Retail', code: 'NDC 65702-0407-10', image: '/images/product_image_2.jpeg' },
  { id: 3, name: 'Contour Next 100ct Retail', code: 'NDC 0193-7312-21', image: '/images/product_image_3.jpeg' },
  { id: 4, name: 'Dexcom G7 Sensor', code: 'STP-AT-012', image: '/images/product_image_4.jpeg' },
  { id: 5, name: 'Dexcom G6 Sensor 3 Pack', code: 'REF STS-OE-003', image: '/images/product_image_1.jpeg' },
  { id: 6, name: 'Dexcom G6 Transmitter Kit', code: 'NDC 08627-0016-01', image: '/images/product_image_2.jpeg' },
  { id: 7, name: 'Omnipod 5 (Purple Box)', code: 'NDC 08508-3000-21', image: '/images/product_image_3.jpeg' },
  { id: 8, name: 'Freestyle Libre 3 Plus', code: '', image: '/images/product_image_4.jpeg' },
  { id: 9, name: 'Minimed Mio Advance', code: 'MMT-242', image: '/images/product_image_1.jpeg' },
]

export default function ProductsBuy() {
  return (
    <div className="section-padding bg-gradient-to-b from-primary-50 to-white">
      <div className="container-custom">
        <h1 className="text-4xl sm:text-5xl font-bold text-primary-700 mb-3 text-center">
          Buy Products
        </h1>
        <p className="text-lg text-gray-700 text-center mb-6">
          Browse our complete catalog of diabetic supplies
        </p>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allProducts.map((product, index) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden fade-in-on-scroll hover:shadow-xl transition-all duration-300 hover:scale-105"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-48 bg-gray-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-primary-700 mb-2">{product.name}</h3>
                  {product.code && (
                    <p className="text-sm text-gray-600 mb-4">{product.code}</p>
                  )}
                  <Link
                    href="/contact"
                    className="block w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-lg text-center transition-colors duration-300"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

