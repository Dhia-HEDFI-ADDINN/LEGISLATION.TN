import { NextResponse } from 'next/server'
import { demoDocuments } from '@/lib/demo-data'

export async function GET() {
  const documents = demoDocuments

  // Calculate statistics
  const documentsByType: Record<string, number> = {}
  const documentsByDomain: Record<string, number> = {}
  const documentsByYear: Record<number, number> = {}

  documents.forEach(doc => {
    // By type
    documentsByType[doc.type] = (documentsByType[doc.type] || 0) + 1

    // By domain
    doc.domaines.forEach(domain => {
      documentsByDomain[domain] = (documentsByDomain[domain] || 0) + 1
    })

    // By year
    const year = new Date(doc.datePublication).getFullYear()
    documentsByYear[year] = (documentsByYear[year] || 0) + 1
  })

  // Status distribution
  const documentsByStatus: Record<string, number> = {}
  documents.forEach(doc => {
    documentsByStatus[doc.statut] = (documentsByStatus[doc.statut] || 0) + 1
  })

  // Recent documents (last 30 days)
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  const recentDocuments = documents.filter(
    d => new Date(d.datePublication) > thirtyDaysAgo
  ).length

  // Most viewed (simulated)
  const mostViewed = documents
    .map(doc => ({
      id: doc.id,
      titre: doc.titreFr,
      type: doc.type,
      vues: Math.floor(Math.random() * 1000)
    }))
    .sort((a, b) => b.vues - a.vues)
    .slice(0, 5)

  return NextResponse.json({
    totalDocuments: documents.length,
    documentsByType,
    documentsByDomain,
    documentsByYear,
    documentsByStatus,
    recentDocuments,
    mostViewed,
    // Simulated daily statistics
    dailyStats: {
      searches: Math.floor(Math.random() * 500) + 100,
      pageViews: Math.floor(Math.random() * 2000) + 500,
      uniqueVisitors: Math.floor(Math.random() * 300) + 50,
      chatQueries: Math.floor(Math.random() * 100) + 20
    }
  })
}
