"use client"

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { Building2, Mail, MapPin, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Locale, isRTL } from '@/i18n/config'

export default function Footer() {
  const t = useTranslations()
  const locale = useLocale() as Locale
  const rtl = isRTL(locale)
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { href: `/${locale}/documents?type=constitution`, label: t('nav.constitution') },
    { href: `/${locale}/documents?type=code`, label: t('nav.codes') },
    { href: `/${locale}/documents?type=loi`, label: t('nav.laws') },
    { href: `/${locale}/documents?type=decret`, label: t('nav.decrees') },
    { href: `/${locale}/search`, label: t('common.search') },
    { href: `/${locale}/chat`, label: t('chat.title') },
  ]

  return (
    <footer className="bg-muted/50 border-t mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className={cn(
          "grid gap-8 md:grid-cols-2 lg:grid-cols-4",
          rtl && "text-right"
        )}>
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="h-6 w-6 text-primary" />
              <span className="font-bold">SNIJ</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {t('footer.aboutText')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{t('footer.address')}</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 shrink-0" />
                <span dir="ltr">+216 71 XXX XXX</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 shrink-0" />
                <span>contact@legislation.tn</span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">{t('nav.about')}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`/${locale}/about`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/privacy`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/terms`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('footer.terms')}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/accessibility`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('footer.accessibility')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-8 border-t">
          <div className={cn(
            "flex flex-col sm:flex-row justify-between items-center gap-4",
            rtl && "sm:flex-row-reverse"
          )}>
            <p className="text-sm text-muted-foreground">
              {t('footer.copyright', { year: currentYear })}
            </p>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {locale === 'ar' ? 'الجمهورية التونسية' : locale === 'en' ? 'Tunisian Republic' : 'République Tunisienne'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
