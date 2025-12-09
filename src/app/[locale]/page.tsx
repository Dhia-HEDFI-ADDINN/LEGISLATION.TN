"use client"

import { useState, useEffect } from 'react'
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
  ArrowRight,
  Sparkles,
  Shield,
  Clock,
  Users
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Locale, isRTL } from '@/i18n/config'

// Couleurs du design system tunisien - Palette améliorée
const categories = [
  { key: 'constitution', icon: ScrollText, color: 'bg-gradient-to-br from-amber-500 to-amber-600', type: 'constitution' },
  { key: 'codes', icon: BookOpen, color: 'bg-gradient-to-br from-primary to-primary/80', type: 'code' },
  { key: 'laws', icon: Scale, color: 'bg-gradient-to-br from-secondary to-secondary/80', type: 'loi' },
  { key: 'decrees', icon: FileText, color: 'bg-gradient-to-br from-rose-700 to-rose-800', type: 'decret' },
  { key: 'jurisprudence', icon: Gavel, color: 'bg-gradient-to-br from-red-700 to-red-800', type: 'jurisprudence' },
  { key: 'jort', icon: Newspaper, color: 'bg-gradient-to-br from-amber-600 to-amber-700', href: '/jort' },
  { key: 'consultation', icon: MessageSquare, color: 'bg-gradient-to-br from-slate-600 to-slate-700', href: '/consultation' },
  { key: 'statistics', icon: BarChart3, color: 'bg-gradient-to-br from-emerald-600 to-emerald-700', href: '/statistics' },
]

// Statistiques pour le Hero
const stats = [
  { key: 'documents', value: '50,000+', icon: FileText },
  { key: 'users', value: '100,000+', icon: Users },
  { key: 'updates', value: '24/7', icon: Clock },
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
    id: 'doc-circulaire-2021-fiscalite',
    titleFr: 'Circulaire n° 2021-45 relative aux mesures fiscales',
    titleAr: 'منشور عدد 45 لسنة 2021 يتعلق بالإجراءات الجبائية',
    titleEn: 'Circular No. 2021-45 on tax measures',
    type: 'circulaire',
    date: '2021-03-22'
  },
  {
    id: 'doc-arret-2022-cassation',
    titleFr: 'Arrêt de la Cour de Cassation n° 2022-1234',
    titleAr: 'قرار محكمة التعقيب عدد 1234 لسنة 2022',
    titleEn: 'Court of Cassation Ruling No. 2022-1234',
    type: 'jurisprudence',
    date: '2022-11-08'
  },
]

export default function HomePage() {
  const t = useTranslations()
  const locale = useLocale() as Locale
  const router = useRouter()
  const rtl = isRTL(locale)

  const [searchQuery, setSearchQuery] = useState('')
  const [searchMode, setSearchMode] = useState<'classic' | 'ai'>('classic')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

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
      {/* Hero Section - Design moderne et interactif */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Arrière-plan avec image de la Tunisie */}
        <div className="absolute inset-0">
          {/* Image de fond - Palais de Carthage / Architecture tunisienne */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?auto=format&fit=crop&w=2000&q=80')`,
            }}
          />
          {/* Overlay gradient sophistiqué */}
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/95 via-primary/90 to-secondary/95" />
          {/* Motifs décoratifs animés */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-3xl" />
          </div>
          {/* Pattern géométrique subtil */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className={cn(
            "max-w-4xl mx-auto text-center transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            rtl && "font-arabic"
          )}>
            {/* Badge officiel */}
            <div className="mb-8 flex justify-center animate-float">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-8 h-8 text-accent" fill="currentColor">
                    <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="3"/>
                    <path d="M50 12 C28 12 12 30 12 50 C12 78 32 88 50 88 C44 76 40 62 50 50 C60 38 56 22 50 12 Z" />
                    <polygon points="68,38 72,50 84,50 74,58 78,70 68,62 58,70 62,58 52,50 64,50" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-white font-semibold text-sm">
                    {locale === 'ar' ? 'رئاسة الحكومة' : 'Présidence du Gouvernement'}
                  </div>
                  <div className="text-white/70 text-xs">
                    {locale === 'ar' ? 'الجمهورية التونسية' : 'République Tunisienne'}
                  </div>
                </div>
              </div>
            </div>

            {/* Titre principal avec effet */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white drop-shadow-lg">
              <span className="block">
                {locale === 'ar'
                  ? 'المنظومة الوطنية'
                  : locale === 'en'
                    ? 'National Legal'
                    : 'Système National'
                }
              </span>
              <span className="block text-accent mt-2">
                {locale === 'ar'
                  ? 'للإعلام القانوني'
                  : locale === 'en'
                    ? 'Information System'
                    : 'd\'Information Juridique'
                }
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 mb-4 font-light">
              {locale === 'ar'
                ? 'البوابة الوطنية للتشريع التونسي'
                : locale === 'en'
                  ? 'Tunisia\'s National Legislation Portal'
                  : 'Portail National de la Législation Tunisienne'
              }
            </p>

            <p className="text-base text-white/70 mb-10 max-w-2xl mx-auto">
              {locale === 'ar'
                ? 'الوصول المجاني والمباشر إلى جميع النصوص القانونية التونسية: الدستور، القوانين، المراسيم، والاجتهاد القضائي'
                : locale === 'en'
                  ? 'Free and direct access to all Tunisian legal texts: Constitution, Laws, Decrees, and Jurisprudence'
                  : 'Accès gratuit et direct à tous les textes juridiques tunisiens : Constitution, Lois, Décrets et Jurisprudence'
              }
            </p>

            {/* Search Box amélioré */}
            <form onSubmit={handleSearch} className="bg-white/95 backdrop-blur-lg text-foreground rounded-2xl shadow-2xl p-6 md:p-8 border border-white/20 transform hover:scale-[1.01] transition-all duration-300">
              <div className="flex flex-col gap-5">
                <div className="relative group">
                  <Search className={cn(
                    "absolute top-1/2 -translate-y-1/2 h-6 w-6 text-primary/60 group-focus-within:text-primary transition-colors duration-200",
                    rtl ? "right-4" : "left-4"
                  )} />
                  <Input
                    type="text"
                    placeholder={t('home.searchPlaceholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={cn(
                      "h-14 text-lg rounded-xl border-2 border-muted focus:border-primary transition-all duration-200",
                      rtl ? "pr-12 pl-4" : "pl-12 pr-4"
                    )}
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name="searchMode"
                        checked={searchMode === 'classic'}
                        onChange={() => setSearchMode('classic')}
                        className="w-5 h-5 accent-primary"
                      />
                      <Search className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="text-sm font-medium">{t('home.searchMode.classic')}</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name="searchMode"
                        checked={searchMode === 'ai'}
                        onChange={() => setSearchMode('ai')}
                        className="w-5 h-5 accent-primary"
                      />
                      <Sparkles className="h-4 w-4 text-accent group-hover:text-primary transition-colors" />
                      <span className="text-sm font-medium">{t('home.searchMode.ai')}</span>
                      <span className="text-[10px] px-2 py-0.5 bg-accent/20 text-accent-foreground rounded-full font-semibold">
                        {locale === 'ar' ? 'جديد' : 'NEW'}
                      </span>
                    </label>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl px-8"
                  >
                    {t('common.search')}
                    <ArrowRight className={cn("h-5 w-5 ml-2", rtl && "rotate-180 mr-2 ml-0")} />
                  </Button>
                </div>
              </div>
            </form>

            {/* Statistiques */}
            <div className="mt-12 grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div
                    key={stat.key}
                    className={cn(
                      "text-center p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 transition-all duration-500",
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                    )}
                    style={{ transitionDelay: `${(index + 1) * 200}ms` }}
                  >
                    <Icon className="w-6 h-6 mx-auto mb-2 text-accent" />
                    <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-white/70">
                      {locale === 'ar'
                        ? stat.key === 'documents' ? 'وثيقة' : stat.key === 'users' ? 'مستخدم' : 'تحديث مستمر'
                        : locale === 'en'
                          ? stat.key === 'documents' ? 'Documents' : stat.key === 'users' ? 'Users' : 'Updates'
                          : stat.key === 'documents' ? 'Documents' : stat.key === 'users' ? 'Utilisateurs' : 'Mises à jour'
                      }
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white/60 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Categories Grid - Design amélioré */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              {locale === 'ar' ? 'استكشف التشريعات' : locale === 'en' ? 'Explore Legislation' : 'Explorez la Législation'}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {locale === 'ar'
                ? 'تصفح جميع أنواع النصوص القانونية المتاحة على المنصة'
                : locale === 'en'
                  ? 'Browse all types of legal texts available on the platform'
                  : 'Parcourez tous les types de textes juridiques disponibles sur la plateforme'
              }
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category) => {
              const Icon = category.icon
              const href = category.href
                ? `/${locale}${category.href}`
                : `/${locale}/documents?type=${category.type}`

              return (
                <Link key={category.key} href={href}>
                  <Card className="h-full hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group border-2 border-transparent hover:border-primary/20 overflow-hidden">
                    <CardContent className="p-6 flex flex-col items-center text-center relative">
                      {/* Effet de brillance au hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                      <div className={cn(
                        "w-16 h-16 rounded-2xl flex items-center justify-center mb-4 text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300",
                        category.color
                      )}>
                        <Icon className="h-8 w-8" />
                      </div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {t(`home.categories.${category.key}`)}
                      </h3>
                      <ArrowRight className={cn(
                        "h-4 w-4 mt-2 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300",
                        rtl && "rotate-180"
                      )} />
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Recent Publications - Design amélioré */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        {/* Fond décoratif */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">{t('home.latestPublications')}</h2>
              <p className="text-muted-foreground">
                {locale === 'ar'
                  ? 'أحدث النصوص القانونية المنشورة'
                  : locale === 'en'
                    ? 'Latest published legal texts'
                    : 'Les derniers textes juridiques publiés'
                }
              </p>
            </div>
            <Link href={`/${locale}/documents`}>
              <Button variant="outline" className="group border-2 hover:border-primary hover:bg-primary hover:text-white transition-all duration-300">
                {t('home.viewAll')}
                <ArrowRight className={cn("h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform", rtl && "rotate-180 mr-2 ml-0 group-hover:-translate-x-1")} />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {recentDocuments.map((doc) => (
              <Link key={doc.id} href={`/${locale}/documents/${doc.id}`}>
                <Card className="h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group border-l-4 border-l-transparent hover:border-l-primary overflow-hidden">
                  <CardContent className="p-6 relative">
                    {/* Indicateur de document */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full" />

                    <div className="flex items-center gap-2 mb-4">
                      <span className={cn(
                        "text-xs font-semibold px-3 py-1.5 rounded-full",
                        doc.type === 'decret' && 'bg-primary/10 text-primary',
                        doc.type === 'circulaire' && 'bg-accent/20 text-accent-foreground',
                        doc.type === 'jurisprudence' && 'bg-secondary/10 text-secondary'
                      )}>
                        {t(`documentTypes.${doc.type}`)}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date(doc.date).toLocaleDateString(
                          locale === 'ar' ? 'ar-TN' : locale === 'en' ? 'en-US' : 'fr-TN'
                        )}
                      </span>
                    </div>

                    <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors mb-3">
                      {getDocumentTitle(doc)}
                    </h3>

                    <div className="flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      {locale === 'ar' ? 'قراءة المزيد' : locale === 'en' ? 'Read more' : 'Lire plus'}
                      <ArrowRight className={cn("h-4 w-4 ml-1", rtl && "rotate-180 mr-1 ml-0")} />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AI Assistant Promo - Design moderne */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-secondary via-primary to-secondary relative overflow-hidden">
        {/* Motifs décoratifs */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/30 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-white/10 backdrop-blur-xl border-white/20 overflow-hidden shadow-2xl">
              <CardContent className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                  {/* Animation Bot */}
                  <div className="flex-shrink-0 relative">
                    <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-accent via-accent to-amber-400 flex items-center justify-center shadow-2xl animate-float">
                      <Sparkles className="absolute top-2 right-2 h-5 w-5 text-white animate-pulse" />
                      <Bot className="h-16 w-16 text-white" />
                    </div>
                    {/* Cercles animés */}
                    <div className="absolute -inset-4 border-2 border-white/20 rounded-full animate-ping opacity-20" />
                    <div className="absolute -inset-8 border border-white/10 rounded-full animate-pulse" />
                  </div>

                  <div className={cn("flex-1 text-center md:text-left", rtl && "md:text-right")}>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/20 text-accent mb-4">
                      <Sparkles className="h-4 w-4" />
                      <span className="text-sm font-semibold">
                        {locale === 'ar' ? 'مدعوم بالذكاء الاصطناعي' : locale === 'en' ? 'AI-Powered' : 'Propulsé par l\'IA'}
                      </span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">{t('chat.title')}</h2>

                    <p className="text-white/80 mb-6 text-lg leading-relaxed">
                      {locale === 'ar'
                        ? 'اطرح أسئلتك القانونية بلغة طبيعية واحصل على إجابات دقيقة ومفصلة مع الإشارة المباشرة إلى المصادر القانونية الرسمية'
                        : locale === 'en'
                          ? 'Ask your legal questions in natural language and get accurate, detailed answers with direct references to official legal sources'
                          : 'Posez vos questions juridiques en langage naturel et obtenez des réponses précises et détaillées avec références directes aux sources légales officielles'
                      }
                    </p>

                    <div className="flex flex-wrap gap-3 mb-8 justify-center md:justify-start">
                      {[
                        { icon: Shield, text: locale === 'ar' ? 'موثوق' : locale === 'en' ? 'Reliable' : 'Fiable' },
                        { icon: Clock, text: locale === 'ar' ? 'فوري' : locale === 'en' ? 'Instant' : 'Instantané' },
                        { icon: FileText, text: locale === 'ar' ? 'مصادر رسمية' : locale === 'en' ? 'Official Sources' : 'Sources Officielles' },
                      ].map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 text-white/90 text-sm">
                          <feature.icon className="h-4 w-4" />
                          {feature.text}
                        </div>
                      ))}
                    </div>

                    <Link href={`/${locale}/chat`}>
                      <Button
                        size="lg"
                        className="bg-white text-primary hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl px-8"
                      >
                        <Bot className="h-5 w-5 mr-2" />
                        {locale === 'ar' ? 'جرب المساعد الآن' : locale === 'en' ? 'Try the assistant now' : 'Essayer l\'assistant maintenant'}
                        <ArrowRight className={cn("h-5 w-5 ml-2", rtl && "rotate-180 mr-2 ml-0")} />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

    </div>
  )
}
