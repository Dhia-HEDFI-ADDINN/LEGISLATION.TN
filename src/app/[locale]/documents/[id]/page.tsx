"use client"

import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import {
  ArrowLeft, Calendar, Building, Download, Star, Bell,
  Share2, Printer, FileText, ExternalLink, Loader2, ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
  dateApplication?: string
  jortNumero?: string
  jortAnnee?: number
  jortPage?: number
  domaines: string[]
  ministere?: string
  contenuAr: string
  contenuFr: string
  contenuEn: string
  resumeAr?: string
  resumeFr?: string
  resumeEn?: string
  pdfOriginal?: string
  pdfConsolide?: string
  motsCles: string[]
  statut: string
  vues: number
}

export default function DocumentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const t = useTranslations()
  const locale = useLocale() as Locale
  const rtl = isRTL(locale)

  const [document, setDocument] = useState<Document | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    fetchDocument()
  }, [id])

  const fetchDocument = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/documents/${id}`)
      if (response.ok) {
        const data = await response.json()
        setDocument(data)
      }
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

  if (!document) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h1 className="text-xl font-semibold mb-2">
          {locale === 'ar' ? 'الوثيقة غير موجودة' : locale === 'en' ? 'Document not found' : 'Document non trouvé'}
        </h1>
        <Link href={`/${locale}/documents`}>
          <Button variant="outline">
            <ArrowLeft className={cn("h-4 w-4 mr-2", rtl && "rotate-180")} />
            {t('common.back')}
          </Button>
        </Link>
      </div>
    )
  }

  const getTitle = () => locale === 'ar' ? document.titreAr : locale === 'en' ? document.titreEn : document.titreFr
  const getContent = () => locale === 'ar' ? document.contenuAr : locale === 'en' ? document.contenuEn : document.contenuFr
  const getResume = () => locale === 'ar' ? document.resumeAr : locale === 'en' ? document.resumeEn : document.resumeFr

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href={`/${locale}`} className="hover:text-foreground">{t('nav.home')}</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href={`/${locale}/documents`} className="hover:text-foreground">
          {locale === 'ar' ? 'الوثائق' : locale === 'en' ? 'Documents' : 'Documents'}
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground truncate max-w-[200px]">{document.numero}</span>
      </nav>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <Badge variant="secondary">
                {t(`documentTypes.${document.type}`)}
              </Badge>
              <Badge variant={document.statut === 'en_vigueur' ? 'success' : 'warning'}>
                {t(`documentStatus.${document.statut}`)}
              </Badge>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold mb-4">{getTitle()}</h1>

            {/* Actions */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Star className={cn("h-4 w-4 mr-2", isFavorite && "fill-yellow-500 text-yellow-500")} />
                {isFavorite ? t('document.removeFromFavorites') : t('document.addToFavorites')}
              </Button>
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                {t('document.createAlert')}
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                {t('common.share')}
              </Button>
              <Button variant="outline" size="sm" onClick={() => window.print()}>
                <Printer className="h-4 w-4 mr-2" />
                {t('common.print')}
              </Button>
            </div>
          </div>

          {/* Content Tabs */}
          <Tabs defaultValue="content" className="w-full">
            <TabsList>
              <TabsTrigger value="content">{t('document.content')}</TabsTrigger>
              {getResume() && <TabsTrigger value="summary">{t('document.summary')}</TabsTrigger>}
            </TabsList>

            <TabsContent value="content">
              <Card>
                <CardContent className="p-6">
                  <div
                    className={cn("prose prose-sm max-w-none", rtl && "text-right")}
                    style={{ whiteSpace: 'pre-wrap' }}
                  >
                    {getContent()}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {getResume() && (
              <TabsContent value="summary">
                <Card>
                  <CardContent className="p-6">
                    <p className={cn(rtl && "text-right")}>{getResume()}</p>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Metadata */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t('document.title')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <dt className="text-sm text-muted-foreground">{t('document.number')}</dt>
                <dd className="font-medium">{document.numero}</dd>
              </div>

              <div>
                <dt className="text-sm text-muted-foreground">{t('document.type')}</dt>
                <dd className="font-medium">{t(`documentTypes.${document.type}`)}</dd>
              </div>

              <div>
                <dt className="text-sm text-muted-foreground">{t('document.publicationDate')}</dt>
                <dd className="font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(document.datePublication).toLocaleDateString(
                    locale === 'ar' ? 'ar-TN' : locale === 'en' ? 'en-US' : 'fr-TN'
                  )}
                </dd>
              </div>

              {document.dateApplication && (
                <div>
                  <dt className="text-sm text-muted-foreground">{t('document.applicationDate')}</dt>
                  <dd className="font-medium">
                    {new Date(document.dateApplication).toLocaleDateString(
                      locale === 'ar' ? 'ar-TN' : locale === 'en' ? 'en-US' : 'fr-TN'
                    )}
                  </dd>
                </div>
              )}

              {document.jortNumero && (
                <div>
                  <dt className="text-sm text-muted-foreground">{t('document.jort')}</dt>
                  <dd className="font-medium">
                    N° {document.jortNumero} - {document.jortAnnee}
                    {document.jortPage && `, p. ${document.jortPage}`}
                  </dd>
                </div>
              )}

              {document.ministere && (
                <div>
                  <dt className="text-sm text-muted-foreground">{t('document.ministry')}</dt>
                  <dd className="font-medium flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    {document.ministere}
                  </dd>
                </div>
              )}

              <div>
                <dt className="text-sm text-muted-foreground">{t('document.domain')}</dt>
                <dd className="flex flex-wrap gap-1 mt-1">
                  {document.domaines.map((domain, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {t(`domains.${domain}`)}
                    </Badge>
                  ))}
                </dd>
              </div>
            </CardContent>
          </Card>

          {/* Download */}
          {(document.pdfOriginal || document.pdfConsolide) && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('document.downloadPdf')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {document.pdfOriginal && (
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    PDF Original
                  </Button>
                )}
                {document.pdfConsolide && (
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    PDF Consolidé
                  </Button>
                )}
              </CardContent>
            </Card>
          )}

          {/* Keywords */}
          {document.motsCles.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('document.keywords')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {document.motsCles.map((keyword, idx) => (
                    <Link
                      key={idx}
                      href={`/${locale}/search?q=${encodeURIComponent(keyword)}`}
                    >
                      <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                        {keyword}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
