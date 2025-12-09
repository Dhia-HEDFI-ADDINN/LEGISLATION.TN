"use client"

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, Search, User, Globe, Building2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Locale, localeNames, isRTL } from '@/i18n/config'

export default function Header() {
  const t = useTranslations()
  const locale = useLocale() as Locale
  const pathname = usePathname()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [langMenuOpen, setLangMenuOpen] = useState(false)

  const rtl = isRTL(locale)

  const switchLocale = (newLocale: Locale) => {
    const segments = pathname.split('/')
    segments[1] = newLocale
    router.push(segments.join('/'))
    setLangMenuOpen(false)
  }

  const navLinks = [
    { href: `/${locale}`, label: t('nav.home') },
    { href: `/${locale}/documents?type=constitution`, label: t('nav.constitution') },
    { href: `/${locale}/documents?type=code`, label: t('nav.codes') },
    { href: `/${locale}/documents?type=loi`, label: t('nav.laws') },
    { href: `/${locale}/documents?type=decret`, label: t('nav.decrees') },
    { href: `/${locale}/documents?type=jurisprudence`, label: t('nav.jurisprudence') },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <Building2 className="h-8 w-8 text-primary" />
            <div className={cn("hidden sm:block", rtl && "text-right")}>
              <div className="font-bold text-lg leading-tight">SNIJ</div>
              <div className="text-xs text-muted-foreground leading-tight">
                {locale === 'ar' ? 'المنظومة الوطنية' : locale === 'en' ? 'Legal Portal' : 'Portail Juridique'}
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  pathname === link.href && "bg-accent text-accent-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Search button */}
            <Link href={`/${locale}/search`}>
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
            </Link>

            {/* Language switcher */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setLangMenuOpen(!langMenuOpen)}
              >
                <Globe className="h-5 w-5" />
              </Button>
              {langMenuOpen && (
                <>
                  <div
                    className="fixed inset-0"
                    onClick={() => setLangMenuOpen(false)}
                  />
                  <div className={cn(
                    "absolute top-full mt-2 w-32 bg-background border rounded-md shadow-lg py-1",
                    rtl ? "left-0" : "right-0"
                  )}>
                    {(['ar', 'fr', 'en'] as Locale[]).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => switchLocale(lang)}
                        className={cn(
                          "w-full px-4 py-2 text-sm text-left hover:bg-accent",
                          locale === lang && "bg-accent font-medium",
                          lang === 'ar' && "text-right"
                        )}
                        dir={lang === 'ar' ? 'rtl' : 'ltr'}
                      >
                        {localeNames[lang]}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* User menu */}
            <Link href={`/${locale}/auth`}>
              <Button variant="outline" size="sm" className="hidden sm:flex">
                <User className="h-4 w-4 mr-2" />
                {t('common.login')}
              </Button>
            </Link>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                    "hover:bg-accent hover:text-accent-foreground",
                    pathname === link.href && "bg-accent text-accent-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={`/${locale}/chat`}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 text-sm font-medium rounded-md hover:bg-accent"
              >
                {t('chat.title')}
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
