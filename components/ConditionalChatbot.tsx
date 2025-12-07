'use client'

import { usePathname } from 'next/navigation'
import Chatbot from './Chatbot'

export default function ConditionalChatbot() {
  const pathname = usePathname()
  
  // Hide chatbot on contact page
  if (pathname === '/contact') {
    return null
  }
  
  return <Chatbot />
}

