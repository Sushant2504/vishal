import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ConditionalChatbot from '@/components/ConditionalChatbot'

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'Victorious Medical - Buyback for Diabetic Supplies',
  description: 'Secure, fast, and rewarding buyback for diabetic supplies. Sell your unused test strips and supplies today!',
  keywords: 'diabetic supplies, test strips, medical buyback, sell diabetic supplies',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <ConditionalChatbot />
      </body>
    </html>
  )
}

