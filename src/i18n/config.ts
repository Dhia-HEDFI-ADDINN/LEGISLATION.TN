export const locales = ['ar', 'fr', 'en'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'fr'

export const localeNames: Record<Locale, string> = {
  ar: 'العربية',
  fr: 'Français',
  en: 'English'
}

export const localeDirections: Record<Locale, 'ltr' | 'rtl'> = {
  ar: 'rtl',
  fr: 'ltr',
  en: 'ltr'
}

export function isRTL(locale: Locale): boolean {
  return localeDirections[locale] === 'rtl'
}
