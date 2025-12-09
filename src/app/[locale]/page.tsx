"use client"

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import {
  Search,
  BookOpen,
  Scale,
  FileText,
  Gavel,
  Newspaper,
  MessageSquare,
  BarChart3,
  ScrollText,
  Bot,
  ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Locale, isRTL } from '@/i18n/config'

const categories = [
  { key: 'constitution', icon: ScrollText, color: 'bg-amber-500', type: 'constitution' },
  { key: 'codes', icon: BookOpen, color: 'bg-blue-500', type: 'code' },
  { key: 'laws', icon: Scale, color: 'bg-green-500', type: 'loi' },
  { key: 'decrees', icon: FileText, color: 'bg-purple-500', type: 'decret' },
  { key: 'jurisprudence', icon: Gavel, color: 'bg-red-500', type: 'jurisprudence' },
  { key: 'jort', icon: Newspaper, color: 'bg-orange-500', href: '/jort' },
  { key: 'consultation', icon: MessageSquare, color: 'bg-teal-500', href: '/consultation' },
  { key: 'statistics', icon: BarChart3, color: 'bg-indigo-500', href: '/statistics' },
]

const recentDocuments = [
  {
    id: 'doc-decret-2020-investissement',
    titleFr: 'Décret n° 2020-310 relatif à l\'incitation à l\'investissement',
    titleAr: 'مرسوم عدد 310 لسنة 2020 يتعلق بتحفيز الاستثمار',
    titleEn: 'Decree No. 2020-310 on investment incentives',
    type: 'decret',
    date: '2020-05-15'
  },
  {
    id: 'doc-circulaire-2023-administration',
    titleFr: 'Circulaire n° 2023-15 relative à la simplification des procédures administratives',
    titleAr: 'منشور عدد 15 لسنة 2023 حول تبسيط الإجراءات الإدارية',
    titleEn: 'Circular No. 2023-15 on simplification of administrative procedures',
    type: 'circulaire',
    date: '2023-03-15'
  },
  {
    id: 'doc-jurisprudence-ta-2022',
    titleFr: 'Arrêt du Tribunal Administratif n° 1234 de 2022',
    titleAr: 'قرار المحكمة الإدارية عدد 1234 لسنة 2022',
    titleEn: 'Administrative Court Decision No. 1234 of 2022',
    type: 'jurisprudence',
    date: '2022-06-15'
  }
]

export default function HomePage() {
  const t = useTranslations()
  const locale = useLocale() as Locale
  const router = useRouter()
  const rtl = isRTL(locale)

  const [searchQuery, setSearchQuery] = useState('')
  const [searchMode, setSearchMode] = useState<'classic' | 'ai'>('classic')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    if (searchMode === 'ai') {
      router.push(`/${locale}/chat?q=${encodeURIComponent(searchQuery)}`)
    } else {
      router.push(`/${locale}/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const getDocumentTitle = (doc: typeof recentDocuments[0]) => {
    switch (locale) {
      case 'ar': return doc.titleAr
      case 'en': return doc.titleEn
      default: return doc.titleFr
    }
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className={cn("max-w-3xl mx-auto text-center", rtl && "font-arabic")}>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {locale === 'ar'
                ? 'المنظومة الوطنية للمعلومات القانونية'
                : locale === 'en'
                  ? 'National Legal Information System'
                  : 'Portail National d\'Information Juridique'
              }
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              {locale === 'ar'
                ? 'البوابة الرسمية للوصول إلى التشريعات التونسية'
                : locale === 'en'
                  ? 'Official portal for accessing Tunisian legislation'
                  : 'Portail officiel d\'accès à la législation tunisienne'
              }
            </p>

            {/* Search Box */}
            <form onSubmit={handleSearch} className="bg-background rounded-xl shadow-lg p-4 md:p-6">
              <div className="flex flex-col gap-4">
                <div className="relative">
                  <Search className={cn(
                    "absolute top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground",
                    rtl ? "right-3" : "left-3"
                  )} />
                  <Input
                    type="text"
                    placeholder={t('home.searchPlaceholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={cn("h-12 text-lg", rtl ? "pr-10 pl-4" : "pl-10 pr-4")}
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="searchMode"
                        checked={searchMode === 'classic'}
                        onChange={() => setSearchMode('classic')}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">{t('home.searchMode.classic')}</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="searchMode"
                        checked={searchMode === 'ai'}
                        onChange={() => setSearchMode('ai')}
                        className="w-4 h-4"
                      />
                      <Bot className="h-4 w-4" />
                      <span className="text-sm">{t('home.searchMode.ai')}</span>
                    </label>
                  </div>

                  <Button type="submit" size="lg">
                    {t('common.search')}
                    <ArrowRight className={cn("h-4 w-4", rtl && "rotate-180")} />
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category) => {
              const Icon = category.icon
              const href = category.href
                ? `/${locale}${category.href}`
                : `/${locale}/documents?type=${category.type}`

              return (
                <Link key={category.key} href={href}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <div className={cn(
                        "w-14 h-14 rounded-full flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform",
                        category.color
                      )}>
                        <Icon className="h-7 w-7" />
                      </div>
                      <h3 className="font-semibold">
                        {t(`home.categories.${category.key}`)}
                      </h3>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Recent Publications */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">{t('home.latestPublications')}</h2>
            <Link href={`/${locale}/documents`}>
              <Button variant="outline">
                {t('home.viewAll')}
                <ArrowRight className={cn("h-4 w-4 ml-2", rtl && "rotate-180 mr-2 ml-0")} />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {recentDocuments.map((doc) => (
              <Link key={doc.id} href={`/${locale}/documents/${doc.id}`}>
                <Card className="h-full hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={cn(
                        "text-xs font-medium px-2 py-1 rounded",
                        doc.type === 'decret' && 'bg-purple-100 text-purple-700',
                        doc.type === 'circulaire' && 'bg-teal-100 text-teal-700',
                        doc.type === 'jurisprudence' && 'bg-red-100 text-red-700'
                      )}>
                        {t(`documentTypes.${doc.type}`)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(doc.date).toLocaleDateString(
                          locale === 'ar' ? 'ar-TN' : locale === 'en' ? 'en-US' : 'fr-TN'
                        )}
                      </span>
                    </div>
                    <h3 className="font-medium line-clamp-2">{getDocumentTitle(doc)}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AI Assistant Promo */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot className="h-10 w-10 text-primary" />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl font-bold mb-2">{t('chat.title')}</h2>
                  <p className="text-muted-foreground mb-4">
                    {locale === 'ar'
                      ? 'اطرح أسئلتك القانونية واحصل على إجابات فورية مع الإشارة إلى المصادر القانونية'
                      : locale === 'en'
                        ? 'Ask your legal questions and get instant answers with references to legal sources'
                        : 'Posez vos questions juridiques et obtenez des réponses instantanées avec références aux sources légales'
                    }
                  </p>
                  <Link href={`/${locale}/chat`}>
                    <Button>
                      {locale === 'ar' ? 'جرب المساعد الآن' : locale === 'en' ? 'Try the assistant now' : 'Essayer l\'assistant'}
                      <ArrowRight className={cn("h-4 w-4 ml-2", rtl && "rotate-180 mr-2 ml-0")} />
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
