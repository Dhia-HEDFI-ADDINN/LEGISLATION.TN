"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import {
  LayoutDashboard, FileText, Users, Settings, BarChart3,
  Plus, Edit, Trash2, Eye, Search, Loader2, ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Locale, isRTL } from '@/i18n/config'

interface Document {
  id: string
  type: string
  numero: string
  titreAr: string
  titreFr: string
  titreEn: string
  datePublication: string
  statut: string
  vues: number
}

interface Statistics {
  totalDocuments: number
  documentsByType: Record<string, number>
  dailyStats: {
    searches: number
    pageViews: number
    uniqueVisitors: number
    chatQueries: number
  }
}

export default function AdminPage() {
  const t = useTranslations()
  const locale = useLocale() as Locale
  const rtl = isRTL(locale)

  const [documents, setDocuments] = useState<Document[]>([])
  const [stats, setStats] = useState<Statistics | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'dashboard' | 'documents' | 'users' | 'settings'>('dashboard')

  useEffect(() => {
    Promise.all([fetchDocuments(), fetchStatistics()])
      .finally(() => setIsLoading(false))
  }, [])

  const fetchDocuments = async () => {
    try {
      const response = await fetch('/api/documents?limit=50')
      const data = await response.json()
      setDocuments(data.documents || [])
    } catch (error) {
      console.error('Fetch error:', error)
    }
  }

  const fetchStatistics = async () => {
    try {
      const response = await fetch('/api/statistics')
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('Fetch error:', error)
    }
  }

  const getTitle = (doc: Document) => {
    switch (locale) {
      case 'ar': return doc.titreAr
      case 'en': return doc.titreEn
      default: return doc.titreFr
    }
  }

  const handleDeleteDocument = async (id: string) => {
    if (!confirm(t('admin.confirmDelete'))) return

    try {
      await fetch(`/api/documents/${id}`, { method: 'DELETE' })
      setDocuments(docs => docs.filter(d => d.id !== id))
      alert(t('admin.documentDeleted'))
    } catch (error) {
      console.error('Delete error:', error)
    }
  }

  const filteredDocuments = documents.filter(doc => {
    if (!searchQuery) return true
    const title = getTitle(doc).toLowerCase()
    const query = searchQuery.toLowerCase()
    return title.includes(query) || doc.numero.includes(query)
  })

  const sidebarItems = [
    { id: 'dashboard' as const, label: t('admin.dashboard'), icon: LayoutDashboard },
    { id: 'documents' as const, label: t('admin.documents'), icon: FileText },
    { id: 'users' as const, label: t('admin.users'), icon: Users },
    { id: 'settings' as const, label: t('admin.settings'), icon: Settings },
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="flex">
        {/* Sidebar */}
        <aside className={cn(
          "w-64 min-h-screen bg-background border-r p-4 hidden md:block",
          rtl && "border-l border-r-0"
        )}>
          <div className="mb-8">
            <h2 className="text-lg font-bold">{t('admin.title')}</h2>
          </div>

          <nav className="space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                    activeTab === item.id
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </button>
              )
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">{t('admin.dashboard')}</h1>

              {/* Stats Cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {locale === 'ar' ? 'إجمالي الوثائق' : locale === 'en' ? 'Total Documents' : 'Total Documents'}
                        </p>
                        <p className="text-2xl font-bold">{stats?.totalDocuments || 0}</p>
                      </div>
                      <FileText className="h-8 w-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {locale === 'ar' ? 'البحث اليوم' : locale === 'en' ? 'Searches Today' : 'Recherches'}
                        </p>
                        <p className="text-2xl font-bold">{stats?.dailyStats.searches || 0}</p>
                      </div>
                      <Search className="h-8 w-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {locale === 'ar' ? 'الزوار' : locale === 'en' ? 'Visitors' : 'Visiteurs'}
                        </p>
                        <p className="text-2xl font-bold">{stats?.dailyStats.uniqueVisitors || 0}</p>
                      </div>
                      <Users className="h-8 w-8 text-purple-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {locale === 'ar' ? 'استفسارات IA' : locale === 'en' ? 'AI Queries' : 'Questions IA'}
                        </p>
                        <p className="text-2xl font-bold">{stats?.dailyStats.chatQueries || 0}</p>
                      </div>
                      <BarChart3 className="h-8 w-8 text-orange-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    {locale === 'ar' ? 'إجراءات سريعة' : locale === 'en' ? 'Quick Actions' : 'Actions rapides'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex gap-4 flex-wrap">
                  <Button onClick={() => setActiveTab('documents')}>
                    <Plus className="h-4 w-4 mr-2" />
                    {t('admin.addDocument')}
                  </Button>
                  <Link href={`/${locale}/statistics`}>
                    <Button variant="outline">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      {t('admin.statistics')}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">{t('admin.documents')}</h1>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  {t('admin.addDocument')}
                </Button>
              </div>

              {/* Search */}
              <div className="relative max-w-md">
                <Search className={cn(
                  "absolute top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground",
                  rtl ? "right-3" : "left-3"
                )} />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('home.searchPlaceholder')}
                  className={cn(rtl ? "pr-10" : "pl-10")}
                />
              </div>

              {/* Documents Table */}
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className={cn("p-4 text-sm font-medium", rtl ? "text-right" : "text-left")}>
                            {t('document.title')}
                          </th>
                          <th className={cn("p-4 text-sm font-medium", rtl ? "text-right" : "text-left")}>
                            {t('document.type')}
                          </th>
                          <th className={cn("p-4 text-sm font-medium", rtl ? "text-right" : "text-left")}>
                            {t('document.status')}
                          </th>
                          <th className={cn("p-4 text-sm font-medium", rtl ? "text-right" : "text-left")}>
                            {t('document.publicationDate')}
                          </th>
                          <th className={cn("p-4 text-sm font-medium", rtl ? "text-left" : "text-right")}>
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredDocuments.map((doc) => (
                          <tr key={doc.id} className="border-b hover:bg-muted/30">
                            <td className="p-4">
                              <div className="max-w-xs truncate font-medium">{getTitle(doc)}</div>
                              <div className="text-xs text-muted-foreground">{doc.numero}</div>
                            </td>
                            <td className="p-4">
                              <Badge variant="secondary">
                                {t(`documentTypes.${doc.type}`)}
                              </Badge>
                            </td>
                            <td className="p-4">
                              <Badge variant={doc.statut === 'en_vigueur' ? 'success' : 'outline'}>
                                {t(`documentStatus.${doc.statut}`)}
                              </Badge>
                            </td>
                            <td className="p-4 text-sm">
                              {new Date(doc.datePublication).toLocaleDateString(
                                locale === 'ar' ? 'ar-TN' : locale === 'en' ? 'en-US' : 'fr-TN'
                              )}
                            </td>
                            <td className={cn("p-4", rtl ? "text-left" : "text-right")}>
                              <div className="flex items-center justify-end gap-1">
                                <Link href={`/${locale}/documents/${doc.id}`}>
                                  <Button variant="ghost" size="icon">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </Link>
                                <Button variant="ghost" size="icon">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDeleteDocument(doc.id)}
                                >
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">{t('admin.users')}</h1>
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground">
                    {locale === 'ar'
                      ? 'قسم إدارة المستخدمين (قيد التطوير)'
                      : locale === 'en'
                        ? 'User management section (under development)'
                        : 'Section de gestion des utilisateurs (en développement)'
                    }
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">{t('admin.settings')}</h1>
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground">
                    {locale === 'ar'
                      ? 'قسم الإعدادات (قيد التطوير)'
                      : locale === 'en'
                        ? 'Settings section (under development)'
                        : 'Section des paramètres (en développement)'
                    }
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
