"use client"

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { Menu, X, Search, User, Globe, ChevronDown, Home, ExternalLink, Users, Shield, Briefcase, Factory, Heart, Wallet, Building2, TreePine, Stethoscope, GraduationCap, Car, Cpu, FileText, BookOpen, Scale, Gavel, ScrollText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Locale, localeNames, isRTL } from '@/i18n/config'

// Drapeau tunisien
function TunisiaFlag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 40" className={className} aria-label="Drapeau de la Tunisie">
      {/* Fond rouge */}
      <rect width="60" height="40" fill="#E70013" rx="3" ry="3"/>
      {/* Cercle blanc central */}
      <circle cx="30" cy="20" r="12" fill="white"/>
      {/* Cercle rouge pour le croissant */}
      <circle cx="30" cy="20" r="9" fill="#E70013"/>
      {/* Croissant - cercle blanc décalé */}
      <circle cx="32" cy="20" r="7.5" fill="white"/>
      {/* Étoile rouge */}
      <polygon
        points="30,11 31.5,16 37,16 32.5,19 34,24 30,21 26,24 27.5,19 23,16 28.5,16"
        fill="#E70013"
      />
    </svg>
  )
}

// Logo LégiTunisie avec drapeau
function LegiTunisieLogo({ className, locale = 'fr' }: { className?: string; locale?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <TunisiaFlag className="h-8 w-12 rounded shadow-md" />
      <div>
        <div className="font-bold text-xl leading-tight text-white tracking-wide">
          {locale === 'ar' ? 'تشريع تونس' : 'LégiTunisie'}
        </div>
        <div className="text-[10px] text-white/70 leading-tight uppercase tracking-wider">
          {locale === 'ar'
            ? 'خدمة نشر القانون التونسي'
            : locale === 'en'
              ? 'Tunisian Law Publication Service'
              : 'Service de diffusion du droit tunisien'}
        </div>
      </div>
    </div>
  )
}

// Logo arabe avec drapeau
function LegiTunisieLogoArabic({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3 flex-row-reverse", className)}>
      <TunisiaFlag className="h-8 w-12 rounded shadow-md" />
      <div className="text-right">
        <div className="font-bold text-xl leading-tight text-white">
          تشريع تونس
        </div>
        <div className="text-[10px] text-white/70 leading-tight">
          خدمة نشر القانون التونسي
        </div>
      </div>
    </div>
  )
}

// Thématiques juridiques pour le menu
const legalThemes = [
  { id: 'civil', icon: Users, color: 'bg-blue-600' },
  { id: 'penal', icon: Shield, color: 'bg-red-600' },
  { id: 'commercial', icon: Briefcase, color: 'bg-amber-600' },
  { id: 'travail', icon: Factory, color: 'bg-green-600' },
  { id: 'famille', icon: Heart, color: 'bg-pink-600' },
  { id: 'fiscal', icon: Wallet, color: 'bg-purple-600' },
  { id: 'administratif', icon: Building2, color: 'bg-indigo-600' },
  { id: 'environnement', icon: TreePine, color: 'bg-emerald-600' },
  { id: 'sante', icon: Stethoscope, color: 'bg-cyan-600' },
  { id: 'education', icon: GraduationCap, color: 'bg-orange-600' },
  { id: 'transport', icon: Car, color: 'bg-slate-600' },
  { id: 'numerique', icon: Cpu, color: 'bg-violet-600' },
]

// Types de documents
const documentTypes = [
  { id: 'constitution', icon: ScrollText },
  { id: 'code', icon: BookOpen },
  { id: 'loi', icon: Scale },
  { id: 'decret', icon: FileText },
  { id: 'jurisprudence', icon: Gavel },
]

export default function Header() {
  const t = useTranslations()
  const locale = useLocale() as Locale
  const pathname = usePathname()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [langMenuOpen, setLangMenuOpen] = useState(false)
  const [droitMenuOpen, setDroitMenuOpen] = useState(false)
  const droitMenuRef = useRef<HTMLDivElement>(null)

  const rtl = isRTL(locale)

  // Fermer le menu droit national quand on clique en dehors
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (droitMenuRef.current && !droitMenuRef.current.contains(event.target as Node)) {
        setDroitMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Labels localisés pour les thèmes
  const themeLabels: Record<string, { fr: string; ar: string; en: string }> = {
    civil: { fr: 'Droit civil', ar: 'القانون المدني', en: 'Civil Law' },
    penal: { fr: 'Droit pénal', ar: 'القانون الجزائي', en: 'Criminal Law' },
    commercial: { fr: 'Droit commercial', ar: 'القانون التجاري', en: 'Commercial Law' },
    travail: { fr: 'Droit du travail', ar: 'قانون الشغل', en: 'Labor Law' },
    famille: { fr: 'Droit de la famille', ar: 'قانون الأسرة', en: 'Family Law' },
    fiscal: { fr: 'Droit fiscal', ar: 'القانون الجبائي', en: 'Tax Law' },
    administratif: { fr: 'Droit administratif', ar: 'القانون الإداري', en: 'Administrative Law' },
    environnement: { fr: 'Droit de l\'environnement', ar: 'قانون البيئة', en: 'Environmental Law' },
    sante: { fr: 'Droit de la santé', ar: 'قانون الصحة', en: 'Health Law' },
    education: { fr: 'Droit de l\'éducation', ar: 'قانون التعليم', en: 'Education Law' },
    transport: { fr: 'Droit des transports', ar: 'قانون النقل', en: 'Transport Law' },
    numerique: { fr: 'Droit du numérique', ar: 'القانون الرقمي', en: 'Digital Law' },
  }

  // Labels pour les types de documents
  const typeLabels: Record<string, { fr: string; ar: string; en: string }> = {
    constitution: { fr: 'Constitution', ar: 'الدستور', en: 'Constitution' },
    code: { fr: 'Codes', ar: 'المجلات', en: 'Codes' },
    loi: { fr: 'Lois', ar: 'القوانين', en: 'Laws' },
    decret: { fr: 'Décrets', ar: 'المراسيم', en: 'Decrees' },
    jurisprudence: { fr: 'Jurisprudence', ar: 'الاجتهاد القضائي', en: 'Case Law' },
  }

  const getLocalizedText = (labels: { fr: string; ar: string; en: string }) => {
    switch (locale) {
      case 'ar': return labels.ar
      case 'en': return labels.en
      default: return labels.fr
    }
  }

  const switchLocale = (newLocale: Locale) => {
    const segments = pathname.split('/')
    segments[1] = newLocale
    router.push(segments.join('/'))
    setLangMenuOpen(false)
  }

  // Navigation principale style Légifrance
  const mainNavLinks = [
    { href: `/${locale}/droit-international`, label: locale === 'ar' ? 'القانون الدولي' : locale === 'en' ? 'International Law' : 'Droit international' },
    { href: `/${locale}/documents?type=jurisprudence`, label: locale === 'ar' ? 'الاجتهاد القضائي' : locale === 'en' ? 'Case Law' : 'Jurisprudence' },
    { href: `/${locale}/jort`, label: locale === 'ar' ? 'الرائد الرسمي' : locale === 'en' ? 'Official Journal' : 'JORT' },
    { href: `/${locale}/actualites`, label: locale === 'ar' ? 'الأخبار' : locale === 'en' ? 'News' : 'Actualités' },
  ]

  return (
    <>
      {/* Header principal - Style Légifrance avec couleurs tunisiennes */}
      <header className="bg-secondary text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo LégiTunisie */}
            <Link href={`/${locale}`} className="flex items-center gap-3 group">
              {locale === 'ar' ? (
                <LegiTunisieLogoArabic className="transition-transform duration-300 group-hover:scale-105" />
              ) : (
                <LegiTunisieLogo className="transition-transform duration-300 group-hover:scale-105" locale={locale} />
              )}
            </Link>

            {/* Actions droite */}
            <div className="flex items-center gap-4">
              {/* Language switcher */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  className="flex items-center gap-1 text-white hover:bg-white/10 transition-all duration-200"
                >
                  <Globe className="h-4 w-4" />
                  <span className="text-xs uppercase font-medium">{locale}</span>
                  <ChevronDown className={cn("h-3 w-3 transition-transform duration-200", langMenuOpen && "rotate-180")} />
                </Button>
                {langMenuOpen && (
                  <>
                    <div className="fixed inset-0" onClick={() => setLangMenuOpen(false)} />
                    <div className={cn(
                      "absolute top-full mt-2 w-40 bg-white text-foreground border rounded-lg shadow-xl py-1 z-50",
                      rtl ? "left-0" : "right-0"
                    )}>
                      {(['ar', 'fr', 'en'] as Locale[]).map((lang) => (
                        <button
                          key={lang}
                          onClick={() => switchLocale(lang)}
                          className={cn(
                            "w-full px-4 py-2 text-sm text-left hover:bg-secondary/10 transition-colors flex items-center gap-2",
                            locale === lang && "bg-secondary/10 font-medium",
                            lang === 'ar' && "text-right flex-row-reverse"
                          )}
                          dir={lang === 'ar' ? 'rtl' : 'ltr'}
                        >
                          <span className="w-5 h-5 rounded bg-secondary/20 flex items-center justify-center text-[10px] font-bold uppercase">
                            {lang.slice(0, 2)}
                          </span>
                          {localeNames[lang]}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Connexion */}
              <Link href={`/${locale}/auth`}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden sm:flex text-white hover:bg-white/10"
                >
                  <User className="h-4 w-4 mr-2" />
                  {t('common.login')}
                </Button>
              </Link>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-white hover:bg-white/10"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Barre de navigation principale */}
        <nav className="hidden lg:block bg-secondary/80 border-t border-white/10">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-1">
              {/* Accueil */}
              <Link
                href={`/${locale}`}
                className={cn(
                  "flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors",
                  "hover:bg-white/10",
                  pathname === `/${locale}` && "bg-white/10"
                )}
              >
                <Home className="h-4 w-4" />
                {locale === 'ar' ? 'الرئيسية' : locale === 'en' ? 'Home' : 'Accueil'}
              </Link>

              {/* Menu Droit National avec dropdown */}
              <div className="relative" ref={droitMenuRef}>
                <button
                  onClick={() => setDroitMenuOpen(!droitMenuOpen)}
                  className={cn(
                    "flex items-center gap-1 px-4 py-3 text-sm font-medium transition-colors",
                    "hover:bg-white/10",
                    (pathname.includes('/documents') || droitMenuOpen) && "bg-white/10"
                  )}
                >
                  {locale === 'ar' ? 'القانون الوطني' : locale === 'en' ? 'National Law' : 'Droit national'}
                  <ChevronDown className={cn("h-4 w-4 transition-transform", droitMenuOpen && "rotate-180")} />
                </button>

                {/* Mega Menu Droit National */}
                {droitMenuOpen && (
                  <div className={cn(
                    "absolute top-full left-0 mt-0 w-[800px] bg-white text-foreground rounded-b-lg shadow-2xl z-50 border border-t-0",
                    rtl && "left-auto right-0"
                  )}>
                    <div className="p-6">
                      {/* Types de documents */}
                      <div className="mb-6">
                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                          {locale === 'ar' ? 'أنواع الوثائق' : locale === 'en' ? 'Document Types' : 'Types de documents'}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {documentTypes.map(type => {
                            const Icon = type.icon
                            return (
                              <Link
                                key={type.id}
                                href={`/${locale}/documents?type=${type.id}`}
                                onClick={() => setDroitMenuOpen(false)}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 hover:bg-primary hover:text-white transition-colors text-sm"
                              >
                                <Icon className="h-4 w-4" />
                                {getLocalizedText(typeLabels[type.id])}
                              </Link>
                            )
                          })}
                        </div>
                      </div>

                      {/* Thématiques juridiques */}
                      <div>
                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                          {locale === 'ar' ? 'المواضيع القانونية' : locale === 'en' ? 'Legal Themes' : 'Thématiques juridiques'}
                        </h4>
                        <div className="grid grid-cols-3 gap-2">
                          {legalThemes.map(theme => {
                            const Icon = theme.icon
                            return (
                              <Link
                                key={theme.id}
                                href={`/${locale}/documents?theme=${theme.id}`}
                                onClick={() => setDroitMenuOpen(false)}
                                className={cn(
                                  "flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm group",
                                  rtl && "flex-row-reverse"
                                )}
                              >
                                <div className={cn("w-7 h-7 rounded flex items-center justify-center text-white shrink-0", theme.color)}>
                                  <Icon className="h-4 w-4" />
                                </div>
                                <span className="group-hover:text-primary transition-colors">
                                  {getLocalizedText(themeLabels[theme.id])}
                                </span>
                              </Link>
                            )
                          })}
                        </div>
                      </div>

                      {/* Lien voir tout */}
                      <div className="mt-4 pt-4 border-t">
                        <Link
                          href={`/${locale}/documents`}
                          onClick={() => setDroitMenuOpen(false)}
                          className="flex items-center gap-2 text-sm text-primary hover:underline"
                        >
                          {locale === 'ar' ? 'عرض جميع الوثائق' : locale === 'en' ? 'View all documents' : 'Voir tous les documents'}
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Liens de navigation */}
              {mainNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-3 text-sm font-medium transition-colors",
                    "hover:bg-white/10",
                    pathname.startsWith(link.href.split('?')[0]) && "bg-white/10"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden border-t border-white/10 bg-secondary/95 max-h-[80vh] overflow-y-auto">
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col gap-1">
                <Link
                  href={`/${locale}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 text-sm font-medium hover:bg-white/10 rounded-lg"
                >
                  <Home className="h-4 w-4" />
                  {locale === 'ar' ? 'الرئيسية' : locale === 'en' ? 'Home' : 'Accueil'}
                </Link>

                {/* Section Droit National */}
                <div className="py-2">
                  <div className="px-4 py-2 text-xs font-semibold text-white/50 uppercase tracking-wider">
                    {locale === 'ar' ? 'القانون الوطني' : locale === 'en' ? 'National Law' : 'Droit national'}
                  </div>

                  {/* Types de documents */}
                  <div className="flex flex-wrap gap-1 px-4 mb-3">
                    {documentTypes.slice(0, 4).map(type => {
                      const Icon = type.icon
                      return (
                        <Link
                          key={type.id}
                          href={`/${locale}/documents?type=${type.id}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-white/10 hover:bg-white/20 transition-colors text-xs"
                        >
                          <Icon className="h-3.5 w-3.5" />
                          {getLocalizedText(typeLabels[type.id])}
                        </Link>
                      )
                    })}
                  </div>

                  {/* Thématiques */}
                  <div className="grid grid-cols-2 gap-1 px-2">
                    {legalThemes.slice(0, 6).map(theme => {
                      const Icon = theme.icon
                      return (
                        <Link
                          key={theme.id}
                          href={`/${locale}/documents?theme=${theme.id}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-2 px-2 py-2 rounded hover:bg-white/10 transition-colors text-sm"
                        >
                          <div className={cn("w-6 h-6 rounded flex items-center justify-center text-white shrink-0", theme.color)}>
                            <Icon className="h-3 w-3" />
                          </div>
                          <span className="text-xs truncate">{getLocalizedText(themeLabels[theme.id])}</span>
                        </Link>
                      )
                    })}
                  </div>

                  <Link
                    href={`/${locale}/documents`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 mt-2 text-xs text-white/70 hover:text-white"
                  >
                    {locale === 'ar' ? 'عرض الكل...' : locale === 'en' ? 'View all...' : 'Voir tout...'}
                  </Link>
                </div>

                {/* Autres liens */}
                {mainNavLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 text-sm font-medium hover:bg-white/10 rounded-lg"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        )}
      </header>
    </>
  )
}
