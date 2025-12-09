"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { FileText, Calendar, ArrowRight, Loader2, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select } from '@/components/ui/select'
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
  domaines: string[]
  statut: string
  resumeAr?: string
  resumeFr?: string
  resumeEn?: string
}

const documentTypes = ['constitution', 'loi', 'decret', 'arrete', 'code', 'circulaire', 'jurisprudence']

export default function DocumentsPage() {
  const t = useTranslations()
  const locale = useLocale() as Locale
  const searchParams = useSearchParams()
  const rtl = isRTL(locale)

  const [documents, setDocuments] = useState<Document[]>([])
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedType, setSelectedType] = useState(searchParams.get('type') || '')

  useEffect(() => {
    fetchDocuments()
  }, [selectedType])

  const fetchDocuments = async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams()
      if (selectedType) params.set('type', selectedType)
      params.set('limit', '20')

      const response = await fetch(`/api/documents?${params.toString()}`)
      const data = await response.json()
      setDocuments(data.documents || [])
      setTotal(data.total || 0)
    } catch (error) {
      console.error('Fetch error:', error)
      setDocuments([])
    } finally {
      setIsLoading(false)
    }
  }

  const getTitle = (doc: Document) => {
    switch (locale) {
      case 'ar': return doc.titreAr
      case 'en': return doc.titreEn
      default: return doc.titreFr
    }
  }

  const getResume = (doc: Document) => {
    switch (locale) {
      case 'ar': return doc.resumeAr
      case 'en': return doc.resumeEn
      default: return doc.resumeFr
    }
  }

  const pageTitle = selectedType
    ? t(`documentTypes.${selectedType}`)
    : locale === 'ar' ? 'جميع الوثائق' : locale === 'en' ? 'All Documents' : 'Tous les documents'

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold">{pageTitle}</h1>
          <p className="text-muted-foreground">
            {t('common.resultsCount', { count: total })}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-muted-foreground" />
          <Select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-48"
          >
            <option value="">{t('common.all')}</option>
            {documentTypes.map(type => (
              <option key={type} value={type}>
                {t(`documentTypes.${type}`)}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {/* Documents Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : documents.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <Link key={doc.id} href={`/${locale}/documents/${doc.id}`}>
              <Card className="h-full hover:shadow-lg transition-shadow group">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary">
                      {t(`documentTypes.${doc.type}`)}
                    </Badge>
                    <Badge
                      variant={doc.statut === 'en_vigueur' ? 'success' : 'outline'}
                    >
                      {t(`documentStatus.${doc.statut}`)}
                    </Badge>
                  </div>

                  <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {getTitle(doc)}
                  </h3>

                  {getResume(doc) && (
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                      {getResume(doc)}
                    </p>
                  )}

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(doc.datePublication).toLocaleDateString(
                        locale === 'ar' ? 'ar-TN' : locale === 'en' ? 'en-US' : 'fr-TN'
                      )}
                    </span>
                    <ArrowRight className={cn("h-4 w-4 group-hover:translate-x-1 transition-transform", rtl && "rotate-180")} />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">{t('common.noResults')}</p>
        </div>
      )}
    </div>
  )
}
