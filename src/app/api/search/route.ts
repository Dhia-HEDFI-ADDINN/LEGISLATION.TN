import { NextRequest, NextResponse } from 'next/server'
import { demoDocuments, demoSynonyms } from '@/lib/demo-data'

// In-memory store for the POC
const documents = [...demoDocuments.map((doc, index) => ({
  ...doc,
  vues: Math.floor(Math.random() * 1000),
  createdAt: new Date(Date.now() - index * 86400000 * 30),
  updatedAt: new Date(Date.now() - index * 86400000 * 7)
}))]

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s\u0600-\u06FF]/g, ' ')
    .trim()
}

function expandQuery(query: string, locale: string): string[] {
  const normalizedQuery = normalizeText(query)
  const synonyms = demoSynonyms.filter(syn => syn.locale === locale)
  const expanded: string[] = [normalizedQuery]

  synonyms.forEach(syn => {
    const normalizedTerms = syn.terms.map(t => normalizeText(t))
    if (normalizedTerms.some(t => t.includes(normalizedQuery) || normalizedQuery.includes(t))) {
      expanded.push(...normalizedTerms)
    }
  })

  return [...new Set(expanded)]
}

function highlightText(text: string, query: string): string {
  if (!query.trim()) return text
  const terms = query.split(/\s+/).filter(t => t.length > 1)
  let highlighted = text

  terms.forEach(term => {
    const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    highlighted = highlighted.replace(regex, '<mark>$1</mark>')
  })

  return highlighted
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q') || ''
  const locale = searchParams.get('locale') || 'fr'
  const type = searchParams.getAll('type')
  const domaine = searchParams.getAll('domaine')
  const statut = searchParams.getAll('statut')
  const dateFrom = searchParams.get('dateFrom')
  const dateTo = searchParams.get('dateTo')
  const limit = parseInt(searchParams.get('limit') || '20')
  const offset = parseInt(searchParams.get('offset') || '0')

  const normalizedQuery = normalizeText(query)
  const queryTerms = normalizedQuery.split(/\s+/).filter(t => t.length > 1)

  // Expand query with synonyms
  const expandedTerms = new Set<string>()
  queryTerms.forEach(term => {
    expandQuery(term, locale).forEach(t => expandedTerms.add(t))
  })

  let results = documents.filter(doc => {
    // Apply filters
    if (type.length && !type.includes(doc.type)) return false
    if (domaine.length && !domaine.some(d => doc.domaines.includes(d))) return false
    if (statut.length && !statut.includes(doc.statut)) return false
    if (dateFrom && new Date(doc.datePublication) < new Date(dateFrom)) return false
    if (dateTo && new Date(doc.datePublication) > new Date(dateTo)) return false

    if (!query.trim()) return true

    // Search in document content based on locale
    const titleField = locale === 'ar' ? doc.titreAr : locale === 'en' ? doc.titreEn : doc.titreFr
    const contentField = locale === 'ar' ? doc.contenuAr : locale === 'en' ? doc.contenuEn : doc.contenuFr
    const resumeField = locale === 'ar' ? doc.resumeAr : locale === 'en' ? doc.resumeEn : doc.resumeFr

    const searchableText = normalizeText(
      `${titleField} ${contentField} ${resumeField || ''} ${doc.motsCles.join(' ')} ${doc.numero}`
    )

    return Array.from(expandedTerms).some(term => searchableText.includes(term))
  })

  // Calculate relevance score and sort
  const scoredResults = results.map(doc => {
    const titleField = locale === 'ar' ? doc.titreAr : locale === 'en' ? doc.titreEn : doc.titreFr
    const resumeField = locale === 'ar' ? doc.resumeAr : locale === 'en' ? doc.resumeEn : doc.resumeFr

    let score = 0
    Array.from(expandedTerms).forEach(term => {
      if (normalizeText(titleField).includes(term)) score += 10
      if (doc.motsCles.some(k => normalizeText(k).includes(term))) score += 5
      if (resumeField && normalizeText(resumeField).includes(term)) score += 3
    })

    // Boost by recency
    const daysSincePublication = Math.floor(
      (Date.now() - new Date(doc.datePublication).getTime()) / (1000 * 60 * 60 * 24)
    )
    score += Math.max(0, 5 - daysSincePublication / 365)

    // Create highlights
    const highlights = {
      titre: query ? highlightText(titleField.substring(0, 200), query) : titleField.substring(0, 200),
      resume: resumeField
        ? (query ? highlightText(resumeField.substring(0, 300), query) : resumeField.substring(0, 300))
        : undefined
    }

    return { document: doc, score, highlights }
  })

  // Sort by score
  scoredResults.sort((a, b) => b.score - a.score)

  // Paginate
  const paginatedResults = scoredResults.slice(offset, offset + limit)

  return NextResponse.json({
    results: paginatedResults,
    total: scoredResults.length,
    query,
    expandedTerms: Array.from(expandedTerms),
    limit,
    offset
  })
}
