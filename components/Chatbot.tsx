'use client'

import { useState, useEffect } from 'react'

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const botpressUrl = 'https://cdn.botpress.cloud/webchat/v3.3/shareable.html?configUrl=https://files.bpcontent.cloud/2025/11/30/19/20251130193124-BDO12L1F.json'

  useEffect(() => {
    // Show button after a short delay with animation
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const toggleChat = () => {
    setIsOpen(!isOpen)
    setIsMinimized(false)
  }

  const minimizeChat = () => {
    setIsMinimized(true)
    setIsOpen(false)
  }

  if (!isVisible && !isOpen && !isMinimized) {
    return null
  }

  return (
    <>
      {/* Chat Button */}
      {!isOpen && !isMinimized && (
        <button
          onClick={toggleChat}
          className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-full shadow-2xl hover:shadow-primary-500/50 transition-all duration-500 flex items-center justify-center group ${
            isVisible ? 'animate-bounce-in opacity-100' : 'opacity-0'
          }`}
          aria-label="Open chat"
          style={{ animationDelay: '0.2s' }}
        >
          {/* Outer pulsing ring */}
          <div className="absolute inset-0 rounded-full bg-primary-500 animate-ping opacity-20" style={{ animationDuration: '2s' }}></div>
          
          {/* Inner glow effect */}
          <div className="absolute inset-0 rounded-full bg-primary-400 opacity-30 animate-pulse" style={{ animationDuration: '3s' }}></div>
          
          {/* Chat icon */}
          <div className="relative z-10 group-hover:scale-110 transition-transform duration-300">
            <svg
              className="w-6 h-6 sm:w-7 sm:h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>

          {/* Notification badge */}
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[380px] md:w-96 h-[calc(100vh-8rem)] sm:h-[550px] md:h-[600px] max-h-[600px] bg-white rounded-2xl shadow-2xl overflow-hidden animate-scale-in border border-gray-200/50 backdrop-blur-sm">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-4 flex items-center justify-between shadow-lg">
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-sm truncate">Victorious Medical</h3>
                <p className="text-xs text-primary-100 truncate">We&apos;re here to help!</p>
              </div>
            </div>
            <div className="flex items-center space-x-1.5 flex-shrink-0 ml-2">
              <button
                onClick={minimizeChat}
                className="w-8 h-8 flex items-center justify-center hover:bg-white/20 rounded-lg transition-all duration-200 hover:scale-110 active:scale-95"
                aria-label="Minimize chat"
                title="Minimize"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M20 12H4"
                  />
                </svg>
              </button>
              <button
                onClick={toggleChat}
                className="w-8 h-8 flex items-center justify-center hover:bg-white/20 rounded-lg transition-all duration-200 hover:scale-110 active:scale-95"
                aria-label="Close chat"
                title="Close"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Chat iframe */}
          <div className="h-[calc(100%-72px)] bg-gray-50">
            <iframe
              src={botpressUrl}
              className="w-full h-full border-0"
              title="Botpress Chatbot"
              allow="microphone"
              loading="lazy"
            />
          </div>
        </div>
      )}

      {/* Minimized Chat Button */}
      {isMinimized && !isOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-3 py-2 sm:px-4 sm:py-2.5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center space-x-2 animate-scale-in backdrop-blur-sm"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <span className="text-sm font-medium">Chat with us</span>
        </button>
      )}
    </>
  )
}

