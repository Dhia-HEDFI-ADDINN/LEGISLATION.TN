export type Locale = 'ar' | 'fr' | 'en'

export type DocumentType =
  | 'constitution'
  | 'loi'
  | 'decret'
  | 'arrete'
  | 'code'
  | 'circulaire'
  | 'jurisprudence'

export type DocumentStatus = 'en_vigueur' | 'abroge' | 'modifie'

export type LegalDomain =
  | 'droit_constitutionnel'
  | 'droit_administratif'
  | 'droit_civil'
  | 'droit_commercial'
  | 'droit_penal'
  | 'droit_fiscal'
  | 'droit_travail'
  | 'droit_social'
  | 'fonction_publique'
  | 'droit_environnement'
  | 'droit_financier'

export interface LocalizedText {
  ar: string
  fr: string
  en: string
}

export interface JORTReference {
  numero: string
  annee: number
  page?: number
}

export interface DocumentLink {
  documentId: string
  relation: 'modifie' | 'modifie_par' | 'abroge' | 'abroge_par' | 'reference'
}

export interface LegalDocument {
  id: string
  type: DocumentType
  numero: string
  titre: LocalizedText
  datePublication: Date
  dateApplication?: Date
  jort?: JORTReference
  domaines: LegalDomain[]
  ministere?: string
  contenu: LocalizedText
  resume?: LocalizedText
  fichiers?: {
    pdfOriginal?: string
    pdfConsolide?: string
  }
  liens?: DocumentLink[]
  motsCles: string[]
  statut: DocumentStatus
  createdAt: Date
  updatedAt: Date
}

export interface SearchFilters {
  type?: DocumentType[]
  domaine?: LegalDomain[]
  dateFrom?: Date
  dateTo?: Date
  statut?: DocumentStatus[]
  ministere?: string
  query?: string
}

export interface SearchResult {
  document: LegalDocument
  score: number
  highlights?: {
    titre?: string
    contenu?: string
  }
}

export interface User {
  id: string
  email: string
  nom: string
  prenom: string
  role: 'admin' | 'contributeur' | 'validateur' | 'utilisateur'
  favoris: string[]
  alertes: string[]
  createdAt: Date
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  sources?: {
    documentId: string
    titre: string
    excerpt: string
  }[]
  timestamp: Date
}

export interface Statistics {
  totalDocuments: number
  documentsByType: Record<DocumentType, number>
  documentsByDomain: Record<string, number>
  recentDocuments: number
  searchesToday: number
}
