import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-primary-700 text-white">
      <div className="container-custom section-padding">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo and Company Info */}
          <div>
            <Link href="/" className="flex items-center space-x-3 mb-4">
              <Image
                src="/images/victorious-logo.png"
                alt="Victorious Medical Logo"
                width={150}
                height={60}
                className="h-auto w-auto"
              />
            </Link>
            <p className="text-primary-200 text-sm">
              Secure, fast, and rewarding buyback for diabetic supplies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link
                href="/"
                className="block text-primary-200 hover:text-white transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="block text-primary-200 hover:text-white transition-colors duration-200"
              >
                About Us
              </Link>
              <Link
                href="/products"
                className="block text-primary-200 hover:text-white transition-colors duration-200"
              >
                Products
              </Link>
              <Link
                href="/contact"
                className="block text-primary-200 hover:text-white transition-colors duration-200"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <div className="space-y-2 text-sm text-primary-200">
              <p>743 Findlay Avenue</p>
              <p>Los Angeles, CA 90022</p>
              <p>
                <a href="tel:+15624157294" className="hover:text-white transition-colors">
                  +1 562-415-7294
                </a>
              </p>
              <p>
                <a href="mailto:victoriousmedicalbuyback1@gmail.com" className="hover:text-white transition-colors break-all">
                  victoriousmedicalbuyback1@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-600 pt-8 text-center">
          <p className="text-primary-200 text-sm">
            &copy; {new Date().getFullYear()} Victorious Medical. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

