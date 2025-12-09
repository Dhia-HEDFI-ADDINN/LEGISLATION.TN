"use client"

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { Send, Bot, User, FileText, AlertCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { Locale, isRTL } from '@/i18n/config'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  sources?: {
    documentId: string
    titre: string
    type: string
    numero: string
    excerpt: string
  }[]
  timestamp: Date
}

export default function ChatPage() {
  const t = useTranslations()
  const locale = useLocale() as Locale
  const searchParams = useSearchParams()
  const rtl = isRTL(locale)

  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const exampleQuestions = [
    t('chat.examples.q1'),
    t('chat.examples.q2'),
    t('chat.examples.q3'),
  ]

  useEffect(() => {
    // Check for initial query from URL
    const initialQuery = searchParams.get('q')
    if (initialQuery && messages.length === 0) {
      handleSendMessage(initialQuery)
    }
  }, [searchParams])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || input.trim()
    if (!text || isLoading) return

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          locale,
          sessionId
        })
      })

      const data = await response.json()

      if (!sessionId && data.sessionId) {
        setSessionId(data.sessionId)
      }

      const assistantMessage: Message = {
        id: `msg-${Date.now()}-assistant`,
        role: 'assistant',
        content: data.response,
        sources: data.sources,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage: Message = {
        id: `msg-${Date.now()}-error`,
        role: 'assistant',
        content: locale === 'ar'
          ? 'عذراً، حدث خطأ. يرجى المحاولة مرة أخرى.'
          : locale === 'en'
            ? 'Sorry, an error occurred. Please try again.'
            : 'Désolé, une erreur s\'est produite. Veuillez réessayer.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Bot className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold mb-2">{t('chat.title')}</h1>
          <p className="text-muted-foreground">{t('chat.disclaimer')}</p>
        </div>

        {/* Chat Container */}
        <Card className="min-h-[500px] flex flex-col">
          <CardContent className="flex-1 p-0 flex flex-col">
            {/* Messages Area */}
            <ScrollArea className="flex-1 p-4">
              {messages.length === 0 ? (
                <div className={cn("py-8 text-center", rtl && "font-arabic")}>
                  <p className="text-muted-foreground mb-6">{t('chat.welcome')}</p>

                  <div className="space-y-2">
                    <p className="text-sm font-medium mb-3">{t('chat.examples.title')}</p>
                    {exampleQuestions.map((question, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(question)}
                        className="block w-full text-left p-3 rounded-lg bg-muted hover:bg-muted/80 text-sm transition-colors"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex gap-3 chat-message",
                        message.role === 'user' && (rtl ? "flex-row" : "flex-row-reverse")
                      )}
                    >
                      <div className={cn(
                        "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                        message.role === 'user' ? "bg-primary text-primary-foreground" : "bg-muted"
                      )}>
                        {message.role === 'user' ? (
                          <User className="h-4 w-4" />
                        ) : (
                          <Bot className="h-4 w-4" />
                        )}
                      </div>

                      <div className={cn(
                        "flex-1 max-w-[80%]",
                        message.role === 'user' && "text-right"
                      )}>
                        <div className={cn(
                          "inline-block p-4 rounded-lg",
                          message.role === 'user'
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        )}>
                          <div className="whitespace-pre-wrap text-sm">
                            {message.content}
                          </div>
                        </div>

                        {/* Sources */}
                        {message.sources && message.sources.length > 0 && (
                          <div className="mt-3 space-y-2">
                            <p className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                              <FileText className="h-3 w-3" />
                              {t('chat.sources')}
                            </p>
                            {message.sources.map((source, idx) => (
                              <Link
                                key={idx}
                                href={`/${locale}/documents/${source.documentId}`}
                                className="block"
                              >
                                <div className="p-2 rounded border bg-background hover:bg-muted/50 transition-colors text-sm">
                                  <div className="font-medium text-primary">
                                    {source.titre}
                                  </div>
                                  <div className="text-xs text-muted-foreground mt-1">
                                    {source.excerpt}
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        <Bot className="h-4 w-4" />
                      </div>
                      <div className="bg-muted p-4 rounded-lg">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          {t('chat.thinking')}
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              )}
            </ScrollArea>

            {/* Input Area */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t('chat.placeholder')}
                  className="min-h-[60px] resize-none"
                  disabled={isLoading}
                />
                <Button
                  onClick={() => handleSendMessage()}
                  disabled={!input.trim() || isLoading}
                  size="icon"
                  className="h-[60px] w-[60px]"
                >
                  <Send className={cn("h-5 w-5", rtl && "rotate-180")} />
                </Button>
              </div>

              <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                <AlertCircle className="h-3 w-3" />
                {t('chat.disclaimer')}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
