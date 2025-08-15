'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Send, X, Info } from 'lucide-react'
import aiImage from "@/public/assets/c_ai.png"
import Image from 'next/image'

interface Message {
  id: string
  content: string
  sender: 'user' | 'ai'
  timestamp: Date
}

interface ClarhetAIChatProps {
  apiEndpoint?: string
  className?: string
}

const ClarhetAIChat: React.FC<ClarhetAIChatProps> = ({ 
  apiEndpoint, 
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const [showFloatingMessage, setShowFloatingMessage] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Fancy tip loop: show every 1 min for 10s
  useEffect(() => { 
    if (isOpen) return // Don't show when chat is open

    const showTip = () => {
      setShowFloatingMessage(true)
      setTimeout(() => setShowFloatingMessage(false), 10000) // Hide after 10s
    }

    // First show after 1 min
    const firstTimer = setTimeout(showTip, 60000)

    // Then every 1 min after
    const interval = setInterval(showTip, 60000)

    return () => {
      clearTimeout(firstTimer)
      clearInterval(interval)
    }
  }, [isOpen])

  // Welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        id: '1',
        content: 'Hello! 👋 I’m Clarhet AI — your strategy assistant.',
        sender: 'ai',
        timestamp: new Date()
      }])
    }
  }, [isOpen, messages.length])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()
    if (message.includes('what is clarhet')) {
      return `Clarhet is the only platform for seamless strategy development, communication, and translation into strategic actions.

🎯 Strategy Development — AI-powered tools for effective strategy creation  
💬 Communication — Seamless strategy communication across your organization  
⚡ Action Translation — Turn strategies into accountable actions`
    }
    return `Thanks for asking! I can help you explore Clarhet's AI-powered strategy platform.`
  }

  const callAIAPI = async (message: string): Promise<string> => {
    const token = localStorage.getItem("accessToken")
    if (apiEndpoint) {
      try {
        const response = await fetch(apiEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify({ message, context: "clarhet_company_assistant" }),
        })
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
        const data = await response.json()
        return data.data?.message || generateAIResponse(message)
      } catch {
        return generateAIResponse(message)
      }
    }
    return generateAIResponse(message)
  }

  const sendMessage = async () => {
    const message = inputValue.trim()
    if (!message) return

    setShowWelcome(false)
    setShowFloatingMessage(false)

    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      timestamp: new Date()
    }])
    setInputValue('')
    setIsTyping(true)

    try {
      await new Promise(r => setTimeout(r, 1000))
      const aiResponse = await callAIAPI(message)
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      }])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          {/* Floating Tip */}
          {showFloatingMessage && (
            <div className="absolute -top-16 right-0 flex flex-col items-end">
              <div className="relative animate-bounce">
                {/* Glow ring */}
                <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 blur-lg opacity-70 animate-pulse"></div>
                {/* Tooltip */}
                <div className="relative px-4 py-2 bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-500 text-white font-bold text-sm rounded-full    shadow-lg  animate-fadeInOut">
                  ✨Hey there! Need help? 
                </div>
              </div>
            </div>
          )}

          {/* Ping animations behind button */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 animate-ping opacity-20"></div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 animate-pulse opacity-30"></div>
          
          <button
            onClick={() => {
              setIsOpen(true)
              setShowFloatingMessage(false)
            }}
            className={`relative group flex items-center gap-3 px-4 py-1 text-white font-semibold rounded-full shadow-2xl transform hover:scale-110 transition-all duration-500 ease-out backdrop-blur-sm border border-white/20 ${className}`}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
              boxShadow: '0 20px 40px rgba(102, 126, 234, 0.4)'
            }}
          >
            {/* <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300">
              💬
            </div> */}
            <Image src={aiImage} alt="AI" className="w-12 h-12" />
            <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent animate-pulse font-bold text-sm tracking-wide">
              ClarhetAI
            </span>
          </button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed top-0 right-0 w-[500px] h-screen bg-white shadow-2xl border-l border-gray-200 flex flex-col z-50">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 text-white px-4 py-3 flex items-center justify-between">
            <h3 className="font-medium text-sm">ClarhetAI</h3>
            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/20 rounded">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Welcome */}
          {showWelcome && (
            <div className="bg-blue-50 border-b border-blue-100 px-4 py-3 flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-500 mt-1" />
              <div className="text-sm text-gray-700">
                <p className="font-semibold">Welcome to Clarhet AI</p>
                <ul className="list-disc list-inside mt-1">
                  <li>Understanding Clarhet and our platform</li>
                  <li>Exploring features & benefits</li>
                  <li>Learning about our strategy execution results</li>
                </ul>
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div key={message.id} className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {message.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-medium">C</div>
                )}
                <div className={`max-w-[340px] ${message.sender === 'user' ? 'order-1' : ''}`}>
                  <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-gray-200 text-gray-800'
                  }`}>
                    {message.content}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-medium">C</div>
                <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex gap-3 items-end">
              <div className="flex-1 relative">
                <textarea
                  ref={textareaRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none"
                  rows={1}
                  style={{ minHeight: '44px', maxHeight: '120px' }}
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ClarhetAIChat
