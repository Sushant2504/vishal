'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import PaymentSection from '@/components/PaymentSection'
import Link from 'next/link'

function ProductPaymentContent() {
  const searchParams = useSearchParams()
  const productId = searchParams.get('product')
  const [selectedProduct, setSelectedProduct] = useState<{ id: number; name: string } | null>(null)

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

  useEffect(() => {
    // Get selected product from URL or sessionStorage
    if (productId) {
      const product = products.find(p => p.id === parseInt(productId))
      if (product) {
        setSelectedProduct({ id: product.id, name: product.name })
      }
    } else {
      const storedProduct = sessionStorage.getItem('selectedProduct')
      if (storedProduct) {
        try {
          setSelectedProduct(JSON.parse(storedProduct))
        } catch (e) {
          console.error('Error parsing selected product:', e)
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId])

  return (
    <div className="section-padding bg-gradient-to-b from-primary-50 to-white min-h-screen">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <Link href="/products" className="text-primary-600 hover:text-primary-700 mb-6 inline-block fade-in-on-scroll">
            ← Back to Products
          </Link>

          {selectedProduct && (
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8 fade-in-on-scroll">
              <h2 className="text-2xl font-bold text-primary-700 mb-4">Selected Product</h2>
              <div className="flex items-center space-x-4">
                <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center">
                  <span className="text-2xl">📦</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{selectedProduct.name}</h3>
                  <p className="text-gray-600">
                    {products.find(p => p.id === selectedProduct.id)?.code || 'Product Code: N/A'}
                  </p>
                </div>
              </div>
            </div>
          )}

          <PaymentSection amount="150.00" />
        </div>
      </div>
    </div>
  )
}

export default function ProductPayment() {
  return (
    <Suspense fallback={
      <div className="section-padding bg-gradient-to-b from-primary-50 to-white min-h-screen">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    }>
      <ProductPaymentContent />
    </Suspense>
  )
}

