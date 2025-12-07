import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'About Us - Victorious Medical',
  description: 'Learn about Victorious Medical and our mission to provide secure buyback services for diabetic supplies.',
}

export default function About() {
  return (
    <div className="section-padding">
      <div className="container-custom">
        {/* Meet Victorious Medical Section */}
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-primary-700 mb-4 text-center">
            Meet Victorious Medical
          </h1>
          
          <div className="bg-white rounded-lg shadow-lg p-8 mb-4">
            <div className="mb-6">
              <Image
                src="/images/about-image.jpg"
                alt="About Victorious Medical"
                width={800}
                height={400}
                className="w-full h-auto rounded-lg"
              />
            </div>
            
            <div className="space-y-6 text-lg text-gray-700">
                <p className="leading-relaxed">
                At Victorious Medical, we are dedicated to offering a trusted buyback service exclusively for individuals managing diabetes. Our mission is to provide a straightforward and stress-free solution for those wishing to sell their unused diabetic supplies. By focusing solely on buybacks, we deliver a smooth process that emphasizes reliability, transparency, and care. We proudly support the diabetes community by helping patients reclaim value from surplus items while encouraging responsible and sustainable health care practices.
              </p>
            </div>
            
            <div className="mt-8 text-center">
              <Link href="/products" className="btn-primary text-lg inline-block">
                Explore Our Services
              </Link>
            </div>
          </div>
        </div>

        {/* Team Image Section */}
        <div className="max-w-4xl mx-auto mb-4">
          <div className="relative h-64 md:h-96 rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/images/contact-image.jpg"
              alt="Victorious Medical Team"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Personalized Support Section */}
        <div className="max-w-4xl mx-auto mb-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-700 mb-4 text-center">
            Personalized support designed for you
          </h2>
        </div>

        {/* Why Choose Victorious Medical Section */}
        <div className="max-w-4xl mx-auto mb-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-700 mb-4 text-center">
            Why Choose Victorious Medical?
          </h2>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <p className="text-lg text-gray-700 leading-relaxed">
              Victorious Medical is a premier buyback provider committed to giving diabetic patients a safe, secure, and convenient way to exchange their unused supplies for cash. With an emphasis on clarity and trust, we ensure every step —from your first inquiry to final payment —is simple and worry-free. Our highest priority is compliance and safety, so you can feel confident knowing your transactions are handled with professionalism and integrity. By combining competitive offers with attentive service, Victorious Medical helps customers recover value from their extra supplies while contributing to a more sustainable healthcare system. Whether you&apos;re clearing space at home or making use of surplus items, we&apos;re here to assist with an ethical, dependable, and customer-first approach. At Victorious Medical, we believe in empowering individuals through responsible resource management —benefiting both patients and the wider healthcare community.
            </p>
          </div>
        </div>

        {/* Benefits Section - In Circles */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-700 mb-6 text-center">
            Benefits of Working with Victorious Medical
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-full p-8 shadow-lg text-center h-64 flex flex-col items-center justify-center">
              <div className="bg-primary-100 rounded-full w-20 h-20 flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary-700 mb-3">Best Value Guaranteed</h3>
              <p className="text-gray-700">Receive top-dollar offers for your unused diabetic supplies, ensuring maximum return</p>
            </div>

            <div className="bg-white rounded-full p-8 shadow-lg text-center h-64 flex flex-col items-center justify-center">
              <div className="bg-primary-100 rounded-full w-20 h-20 flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary-700 mb-3">Instant Quote</h3>
              <p className="text-gray-700">Get a free, no-obligation estimate within minutes. Our streamlined system provides quick and accurate offers.</p>
            </div>

            <div className="bg-white rounded-full p-8 shadow-lg text-center h-64 flex flex-col items-center justify-center">
              <div className="bg-primary-100 rounded-full w-20 h-20 flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary-700 mb-3">Secure & Fast Payment</h3>
              <p className="text-gray-700">Enjoy rapid payments through your preferred method, giving you peace of mind and immediate access to funds.</p>
            </div>

            <div className="bg-white rounded-full p-8 shadow-lg text-center h-64 flex flex-col items-center justify-center">
              <div className="bg-primary-100 rounded-full w-20 h-20 flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary-700 mb-3">Friendly Support Team</h3>
              <p className="text-gray-700">Our approachable and knowledgeable virtual assistants guide you through the process, answering questions and ensuring a seamless experience.</p>
            </div>

            <div className="bg-white rounded-full p-8 shadow-lg text-center h-64 flex flex-col items-center justify-center">
              <div className="bg-primary-100 rounded-full w-20 h-20 flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary-700 mb-3">Free Shipping Provided</h3>
              <p className="text-gray-700">We cover all shipping costs. With prepaid, trackable labels, sending your supplies is safe, easy, and cost-free.</p>
            </div>

            <div className="bg-white rounded-full p-8 shadow-lg text-center h-64 flex flex-col items-center justify-center">
              <div className="bg-primary-100 rounded-full w-20 h-20 flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary-700 mb-3">Total Commitment</h3>
              <p className="text-gray-700">Victorious Medical is devoted to making your experience smooth, rewarding, and completely hassle-free.</p>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-700 mb-4 text-center">
            What Our Customers Say
          </h2>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-6">
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                ))}
              </div>
              <p className="text-2xl font-bold text-primary-700 mb-2">100% Recommend</p>
              <p className="text-gray-600">(7 reviews)</p>
            </div>
            <div className="space-y-6 mt-8">
              <div className="border-l-4 border-primary-500 pl-4">
                <p className="text-gray-700 italic">&quot;Excellent service! Fast payment and easy process.&quot;</p>
                <p className="text-sm text-gray-600 mt-2">- Satisfied Customer</p>
              </div>
              <div className="border-l-4 border-primary-500 pl-4">
                <p className="text-gray-700 italic">&quot;Great experience selling my unused supplies. Highly recommend!&quot;</p>
                <p className="text-sm text-gray-600 mt-2">- Happy Client</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

