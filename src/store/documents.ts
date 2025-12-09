import { create } from 'zustand'
import { demoDocuments, demoUsers, demoSynonyms } from '@/lib/demo-data'

// In-memory data store for POC
export interface Document {
  id: string
  type: string
  numero: string
  titreAr: string
  titreFr: string
  titreEn: string
  datePublication: Date
  dateApplication?: Date | null
  jortNumero?: string | null
  jortAnnee?: number | null
  jortPage?: number | null
  domaines: string[]
  ministere?: string | null
  contenuAr: string
  contenuFr: string
  contenuEn: string
  resumeAr?: string | null
  resumeFr?: string | null
  resumeEn?: string | null
  pdfOriginal?: string | null
  pdfConsolide?: string | null
  motsCles: string[]
  statut: string
  vues: number
  createdAt: Date
  updatedAt: Date
}

export interface User {
  id: string
  email: string
  password: string
  nom: string
  prenom: string
  role: 'admin' | 'contributeur' | 'validateur' | 'utilisateur'
  active: boolean
}

export interface Synonym {
  id: string
  terms: string[]
  locale: string
}

interface DocumentStore {
  documents: Document[]
  users: User[]
  synonyms: Synonym[]
  searchLogs: { query: string; timestamp: Date }[]

  // Document operations
  getDocuments: () => Document[]
  getDocumentById: (id: string) => Document | undefined
  getDocumentsByType: (type: string) => Document[]
  searchDocuments: (query: string, locale: string, filters?: {
    type?: string[]
    domaine?: string[]
    dateFrom?: Date
    dateTo?: Date
    statut?: string[]
  }) => Document[]
  addDocument: (doc: Omit<Document, 'id' | 'vues' | 'createdAt' | 'updatedAt'>) => Document
  updateDocument: (id: string, updates: Partial<Document>) => Document | undefined
  deleteDocument: (id: string) => boolean
  incrementViews: (id: string) => void

  // User operations
  getUsers: () => User[]
  getUserByEmail: (email: string) => User | undefined
  authenticateUser: (email: string, password: string) => User | null

  // Synonym operations
  getSynonyms: (locale: string) => Synonym[]
  expandQuery: (query: string, locale: string) => string[]

  // Statistics
  getStatistics: () => {
    totalDocuments: number
    documentsByType: Record<string, number>
    documentsByDomain: Record<string, number>
    recentDocuments: number
    searchesToday: number
  }

  // Search logging
  logSearch: (query: string) => void
}

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s\u0600-\u06FF]/g, ' ')
    .trim()
}

export const useDocumentStore = create<DocumentStore>((set, get) => ({
  documents: demoDocuments.map((doc, index) => ({
    ...doc,
    vues: Math.floor(Math.random() * 1000),
    createdAt: new Date(Date.now() - index * 86400000 * 30),
    updatedAt: new Date(Date.now() - index * 86400000 * 7)
  })),

  users: demoUsers.map(user => ({
    ...user,
    active: true
  })),

  synonyms: demoSynonyms.map((syn, index) => ({
    ...syn,
    id: `syn-${index}`
  })),

  searchLogs: [],

  getDocuments: () => get().documents,

  getDocumentById: (id: string) => {
    return get().documents.find(doc => doc.id === id)
  },

  getDocumentsByType: (type: string) => {
    return get().documents.filter(doc => doc.type === type)
  },

  searchDocuments: (query: string, locale: string, filters) => {
    const normalizedQuery = normalizeText(query)
    const queryTerms = normalizedQuery.split(/\s+/).filter(t => t.length > 1)

    // Expand query with synonyms
    const expandedTerms = new Set<string>()
    queryTerms.forEach(term => {
      expandedTerms.add(term)
      get().expandQuery(term, locale).forEach(t => expandedTerms.add(t))
    })

    let results = get().documents.filter(doc => {
      // Apply filters
      if (filters?.type?.length && !filters.type.includes(doc.type)) return false
      if (filters?.domaine?.length && !filters.domaine.some(d => doc.domaines.includes(d))) return false
      if (filters?.statut?.length && !filters.statut.includes(doc.statut)) return false
      if (filters?.dateFrom && doc.datePublication < filters.dateFrom) return false
      if (filters?.dateTo && doc.datePublication > filters.dateTo) return false

      if (!query.trim()) return true

      // Search in document content
      const titleField = locale === 'ar' ? doc.titreAr : locale === 'en' ? doc.titreEn : doc.titreFr
      const contentField = locale === 'ar' ? doc.contenuAr : locale === 'en' ? doc.contenuEn : doc.contenuFr
      const resumeField = locale === 'ar' ? doc.resumeAr : locale === 'en' ? doc.resumeEn : doc.resumeFr

      const searchableText = normalizeText(
        `${titleField} ${contentField} ${resumeField || ''} ${doc.motsCles.join(' ')} ${doc.numero}`
      )

      return Array.from(expandedTerms).some(term => searchableText.includes(term))
    })

    // Sort by relevance (count of matching terms)
    results.sort((a, b) => {
      const titleA = locale === 'ar' ? a.titreAr : locale === 'en' ? a.titreEn : a.titreFr
      const titleB = locale === 'ar' ? b.titreAr : locale === 'en' ? b.titreEn : b.titreFr

      const scoreA = Array.from(expandedTerms).reduce((score, term) =>
        score + (normalizeText(titleA).includes(term) ? 3 : 0) +
        (a.motsCles.some(k => normalizeText(k).includes(term)) ? 2 : 0)
      , 0)

      const scoreB = Array.from(expandedTerms).reduce((score, term) =>
        score + (normalizeText(titleB).includes(term) ? 3 : 0) +
        (b.motsCles.some(k => normalizeText(k).includes(term)) ? 2 : 0)
      , 0)

      return scoreB - scoreA
    })

    return results
  },

  addDocument: (doc) => {
    const newDoc: Document = {
      ...doc,
      id: `doc-${Date.now()}`,
      vues: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    set(state => ({ documents: [...state.documents, newDoc] }))
    return newDoc
  },

  updateDocument: (id, updates) => {
    let updatedDoc: Document | undefined
    set(state => ({
      documents: state.documents.map(doc => {
        if (doc.id === id) {
          updatedDoc = { ...doc, ...updates, updatedAt: new Date() }
          return updatedDoc
        }
        return doc
      })
    }))
    return updatedDoc
  },

  deleteDocument: (id) => {
    const exists = get().documents.some(doc => doc.id === id)
    if (exists) {
      set(state => ({
        documents: state.documents.filter(doc => doc.id !== id)
      }))
    }
    return exists
  },

  incrementViews: (id) => {
    set(state => ({
      documents: state.documents.map(doc =>
        doc.id === id ? { ...doc, vues: doc.vues + 1 } : doc
      )
    }))
  },

  getUsers: () => get().users,

  getUserByEmail: (email) => {
    return get().users.find(user => user.email === email)
  },

  authenticateUser: (email, password) => {
    const user = get().users.find(u => u.email === email && u.password === password && u.active)
    return user || null
  },

  getSynonyms: (locale) => {
    return get().synonyms.filter(syn => syn.locale === locale)
  },

  expandQuery: (query, locale) => {
    const normalizedQuery = normalizeText(query)
    const synonyms = get().getSynonyms(locale)
    const expanded: string[] = []

    synonyms.forEach(syn => {
      const normalizedTerms = syn.terms.map(t => normalizeText(t))
      if (normalizedTerms.some(t => t.includes(normalizedQuery) || normalizedQuery.includes(t))) {
        expanded.push(...normalizedTerms)
      }
    })

    return expanded
  },

  getStatistics: () => {
    const docs = get().documents
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const documentsByType: Record<string, number> = {}
    const documentsByDomain: Record<string, number> = {}

    docs.forEach(doc => {
      documentsByType[doc.type] = (documentsByType[doc.type] || 0) + 1
      doc.domaines.forEach(domain => {
        documentsByDomain[domain] = (documentsByDomain[domain] || 0) + 1
      })
    })

    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    const recentDocuments = docs.filter(d => d.createdAt > thirtyDaysAgo).length

    const searchesToday = get().searchLogs.filter(log => log.timestamp >= today).length

    return {
      totalDocuments: docs.length,
      documentsByType,
      documentsByDomain,
      recentDocuments,
      searchesToday
    }
  },

  logSearch: (query) => {
    set(state => ({
      searchLogs: [...state.searchLogs, { query, timestamp: new Date() }]
    }))
  }
}))

// Export singleton for server-side usage
let serverStore: DocumentStore | null = null

export function getServerStore(): DocumentStore {
  if (!serverStore) {
    // Create a server-side instance
    serverStore = useDocumentStore.getState()
  }
  return serverStore
}
