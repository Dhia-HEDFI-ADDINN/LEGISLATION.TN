"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { Search, Filter, X, FileText, Calendar, ChevronDown, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { Locale, isRTL } from '@/i18n/config'

interface SearchResult {
  document: {
    id: string
    type: string
    numero: string
    titreAr: string
    titreFr: string
    titreEn: string
    datePublication: string
    domaines: string[]
    statut: string
    motsCles: string[]
    resumeAr?: string
    resumeFr?: string
    resumeEn?: string
  }
  score: number
  highlights?: {
    titre?: string
    resume?: string
  }
}

const documentTypes = ['constitution', 'loi', 'decret', 'arrete', 'code', 'circulaire', 'jurisprudence']
const domains = [
  'droit_constitutionnel', 'droit_administratif', 'droit_civil', 'droit_commercial',
  'droit_penal', 'droit_fiscal', 'droit_travail', 'droit_social', 'fonction_publique'
]
const statuses = ['en_vigueur', 'abroge', 'modifie']

export default function SearchPage() {
  const t = useTranslations()
  const locale = useLocale() as Locale
  const router = useRouter()
  const searchParams = useSearchParams()
  const rtl = isRTL(locale)

  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [results, setResults] = useState<SearchResult[]>([])
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  // Filters
  const [selectedTypes, setSelectedTypes] = useState<string[]>(
    searchParams.getAll('type')
  )
  const [selectedDomains, setSelectedDomains] = useState<string[]>([])
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
  const [sortBy, setSortBy] = useState('relevance')

  useEffect(() => {
    const initialType = searchParams.get('type')
    if (initialType) {
      setSelectedTypes([initialType])
    }
    performSearch()
  }, [])

  const performSearch = async () => {
    setIsLoading(true)

    const params = new URLSearchParams()
    if (query) params.set('q', query)
    params.set('locale', locale)
    selectedTypes.forEach(t => params.append('type', t))
    selectedDomains.forEach(d => params.append('domaine', d))
    selectedStatuses.forEach(s => params.append('statut', s))

    try {
      const response = await fetch(`/api/search?${params.toString()}`)
      const data = await response.json()
      setResults(data.results || [])
      setTotal(data.total || 0)
    } catch (error) {
      console.error('Search error:', error)
      setResults([])
      setTotal(0)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    performSearch()
  }

  const getTitle = (doc: SearchResult['document']) => {
    switch (locale) {
      case 'ar': return doc.titreAr
      case 'en': return doc.titreEn
      default: return doc.titreFr
    }
  }

  const getResume = (doc: SearchResult['document']) => {
    switch (locale) {
      case 'ar': return doc.resumeAr
      case 'en': return doc.resumeEn
      default: return doc.resumeFr
    }
  }

  const clearFilters = () => {
    setSelectedTypes([])
    setSelectedDomains([])
    setSelectedStatuses([])
  }

  const hasFilters = selectedTypes.length > 0 || selectedDomains.length > 0 || selectedStatuses.length > 0

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="text-2xl font-bold mb-6">{t('search.title')}</h1>

        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className={cn(
                "absolute top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground",
                rtl ? "right-3" : "left-3"
              )} />
              <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('home.searchPlaceholder')}
                className={cn("h-12", rtl ? "pr-10" : "pl-10")}
              />
            </div>
            <Button type="submit" size="lg" disabled={isLoading}>
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : t('common.search')}
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              {t('common.filter')}
              <ChevronDown className={cn("h-4 w-4 ml-2", showFilters && "rotate-180")} />
            </Button>

            {hasFilters && (
              <Button type="button" variant="ghost" size="sm" onClick={clearFilters}>
                <X className="h-4 w-4 mr-1" />
                {locale === 'ar' ? 'مسح الفلاتر' : locale === 'en' ? 'Clear filters' : 'Effacer les filtres'}
              </Button>
            )}
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <Card>
              <CardContent className="p-4 grid md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    {t('search.filters.documentType')}
                  </label>
                  <Select
                    value={selectedTypes[0] || ''}
                    onChange={(e) => setSelectedTypes(e.target.value ? [e.target.value] : [])}
                  >
                    <option value="">{t('common.all')}</option>
                    {documentTypes.map(type => (
                      <option key={type} value={type}>
                        {t(`documentTypes.${type}`)}
                      </option>
                    ))}
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    {t('search.filters.domain')}
                  </label>
                  <Select
                    value={selectedDomains[0] || ''}
                    onChange={(e) => setSelectedDomains(e.target.value ? [e.target.value] : [])}
                  >
                    <option value="">{t('common.all')}</option>
                    {domains.map(domain => (
                      <option key={domain} value={domain}>
                        {t(`domains.${domain}`)}
                      </option>
                    ))}
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    {t('search.filters.status')}
                  </label>
                  <Select
                    value={selectedStatuses[0] || ''}
                    onChange={(e) => setSelectedStatuses(e.target.value ? [e.target.value] : [])}
                  >
                    <option value="">{t('common.all')}</option>
                    {statuses.map(status => (
                      <option key={status} value={status}>
                        {t(`documentStatus.${status}`)}
                      </option>
                    ))}
                  </Select>
                </div>
              </CardContent>
            </Card>
          )}
        </form>
      </div>

      {/* Results */}
      <div className="max-w-4xl mx-auto">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : results.length > 0 ? (
          <>
            <div className="mb-4 text-sm text-muted-foreground">
              {t('common.resultsCount', { count: total })}
            </div>

            <div className="space-y-4">
              {results.map((result) => (
                <Link
                  key={result.document.id}
                  href={`/${locale}/documents/${result.document.id}`}
                >
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <Badge variant="secondary">
                              {t(`documentTypes.${result.document.type}`)}
                            </Badge>
                            <Badge
                              variant={result.document.statut === 'en_vigueur' ? 'success' : 'outline'}
                            >
                              {t(`documentStatus.${result.document.statut}`)}
                            </Badge>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(result.document.datePublication).toLocaleDateString(
                                locale === 'ar' ? 'ar-TN' : locale === 'en' ? 'en-US' : 'fr-TN'
                              )}
                            </span>
                          </div>

                          <h3
                            className="font-semibold mb-2 line-clamp-2"
                            dangerouslySetInnerHTML={{
                              __html: result.highlights?.titre || getTitle(result.document)
                            }}
                          />

                          {(result.highlights?.resume || getResume(result.document)) && (
                            <p
                              className="text-sm text-muted-foreground line-clamp-2"
                              dangerouslySetInnerHTML={{
                                __html: result.highlights?.resume || getResume(result.document) || ''
                              }}
                            />
                          )}

                          {result.document.motsCles.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-1">
                              {result.document.motsCles.slice(0, 4).map((keyword, idx) => (
                                <span
                                  key={idx}
                                  className="text-xs px-2 py-0.5 bg-muted rounded"
                                >
                                  {keyword}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">{t('search.noResultsMessage')}</p>
          </div>
        )}
      </div>
    </div>
  )
}
