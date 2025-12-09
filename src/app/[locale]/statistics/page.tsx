"use client"

import { useState, useEffect } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { BarChart3, FileText, Search, Users, TrendingUp, Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Locale, isRTL } from '@/i18n/config'

interface Statistics {
  totalDocuments: number
  documentsByType: Record<string, number>
  documentsByDomain: Record<string, number>
  documentsByStatus: Record<string, number>
  recentDocuments: number
  mostViewed: { id: string; titre: string; type: string; vues: number }[]
  dailyStats: {
    searches: number
    pageViews: number
    uniqueVisitors: number
    chatQueries: number
  }
}

export default function StatisticsPage() {
  const t = useTranslations()
  const locale = useLocale() as Locale
  const rtl = isRTL(locale)

  const [stats, setStats] = useState<Statistics | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchStatistics()
  }, [])

  const fetchStatistics = async () => {
    try {
      const response = await fetch('/api/statistics')
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('Fetch error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!stats) {
    return null
  }

  const statCards = [
    {
      title: locale === 'ar' ? 'إجمالي الوثائق' : locale === 'en' ? 'Total Documents' : 'Total Documents',
      value: stats.totalDocuments,
      icon: FileText,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      title: locale === 'ar' ? 'عمليات البحث اليوم' : locale === 'en' ? 'Searches Today' : 'Recherches aujourd\'hui',
      value: stats.dailyStats.searches,
      icon: Search,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      title: locale === 'ar' ? 'الزوار الفريدون' : locale === 'en' ? 'Unique Visitors' : 'Visiteurs uniques',
      value: stats.dailyStats.uniqueVisitors,
      icon: Users,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    },
    {
      title: locale === 'ar' ? 'استفسارات المساعد' : locale === 'en' ? 'Chat Queries' : 'Questions IA',
      value: stats.dailyStats.chatQueries,
      icon: TrendingUp,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10'
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <BarChart3 className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-bold">
          {locale === 'ar' ? 'الإحصائيات' : locale === 'en' ? 'Statistics' : 'Statistiques'}
        </h1>
      </div>

      {/* Summary Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <Card key={idx}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold">{stat.value.toLocaleString()}</p>
                  </div>
                  <div className={cn("p-3 rounded-full", stat.bgColor)}>
                    <Icon className={cn("h-6 w-6", stat.color)} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Documents by Type */}
        <Card>
          <CardHeader>
            <CardTitle>
              {locale === 'ar' ? 'الوثائق حسب النوع' : locale === 'en' ? 'Documents by Type' : 'Documents par type'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(stats.documentsByType).map(([type, count]) => {
                const percentage = Math.round((count / stats.totalDocuments) * 100)
                return (
                  <div key={type}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">{t(`documentTypes.${type}`)}</span>
                      <span className="text-sm font-medium">{count}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Documents by Domain */}
        <Card>
          <CardHeader>
            <CardTitle>
              {locale === 'ar' ? 'الوثائق حسب المجال' : locale === 'en' ? 'Documents by Domain' : 'Documents par domaine'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(stats.documentsByDomain).slice(0, 6).map(([domain, count]) => {
                const percentage = Math.round((count / stats.totalDocuments) * 100)
                return (
                  <div key={domain}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">{t(`domains.${domain}`)}</span>
                      <span className="text-sm font-medium">{count}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full transition-all"
                        style={{ width: `${Math.min(percentage * 2, 100)}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Most Viewed Documents */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>
              {locale === 'ar' ? 'الوثائق الأكثر مشاهدة' : locale === 'en' ? 'Most Viewed Documents' : 'Documents les plus consultés'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className={cn("py-2 text-sm font-medium text-muted-foreground", rtl ? "text-right" : "text-left")}>
                      {t('document.title')}
                    </th>
                    <th className={cn("py-2 text-sm font-medium text-muted-foreground", rtl ? "text-right" : "text-left")}>
                      {t('document.type')}
                    </th>
                    <th className={cn("py-2 text-sm font-medium text-muted-foreground", rtl ? "text-left" : "text-right")}>
                      {locale === 'ar' ? 'المشاهدات' : locale === 'en' ? 'Views' : 'Vues'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {stats.mostViewed.map((doc) => (
                    <tr key={doc.id} className="border-b last:border-0">
                      <td className="py-3 text-sm">{doc.titre}</td>
                      <td className="py-3">
                        <span className="text-xs px-2 py-1 bg-muted rounded">
                          {t(`documentTypes.${doc.type}`)}
                        </span>
                      </td>
                      <td className={cn("py-3 text-sm font-medium", rtl ? "text-left" : "text-right")}>
                        {doc.vues.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
