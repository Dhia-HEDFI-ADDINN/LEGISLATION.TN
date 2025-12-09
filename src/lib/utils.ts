import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string, locale: string = 'fr'): string {
  const d = new Date(date)
  return d.toLocaleDateString(locale === 'ar' ? 'ar-TN' : locale === 'en' ? 'en-US' : 'fr-TN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function highlightText(text: string, query: string): string {
  if (!query.trim()) return text
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  return text.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-800">$1</mark>')
}

export function truncateText(text: string, maxLength: number = 200): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function getDocumentTypeLabel(type: string, locale: string): string {
  const labels: Record<string, Record<string, string>> = {
    loi: { ar: 'قانون', fr: 'Loi', en: 'Law' },
    decret: { ar: 'مرسوم', fr: 'Décret', en: 'Decree' },
    arrete: { ar: 'قرار', fr: 'Arrêté', en: 'Order' },
    code: { ar: 'مجلة', fr: 'Code', en: 'Code' },
    circulaire: { ar: 'منشور', fr: 'Circulaire', en: 'Circular' },
    jurisprudence: { ar: 'اجتهاد قضائي', fr: 'Jurisprudence', en: 'Case Law' },
    constitution: { ar: 'دستور', fr: 'Constitution', en: 'Constitution' }
  }
  return labels[type]?.[locale] || type
}

export function getStatusLabel(status: string, locale: string): string {
  const labels: Record<string, Record<string, string>> = {
    en_vigueur: { ar: 'ساري المفعول', fr: 'En vigueur', en: 'In force' },
    abroge: { ar: 'ملغى', fr: 'Abrogé', en: 'Repealed' },
    modifie: { ar: 'معدّل', fr: 'Modifié', en: 'Amended' }
  }
  return labels[status]?.[locale] || status
}
