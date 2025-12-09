"use client"

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { Mail, MapPin, Phone, ExternalLink, Facebook, Twitter, Linkedin, Youtube, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Locale, isRTL } from '@/i18n/config'

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

  const governmentLinks = [
    {
      href: 'http://www.pm.gov.tn',
      label: locale === 'ar' ? 'رئاسة الحكومة' : locale === 'en' ? 'Presidency of the Government' : 'Présidence du Gouvernement',
    },
    {
      href: 'http://www.arp.tn',
      label: locale === 'ar' ? 'مجلس نواب الشعب' : locale === 'en' ? 'Assembly of the Representatives' : 'Assemblée des Représentants du Peuple',
    },
    {
      href: 'http://www.iort.gov.tn',
      label: locale === 'ar' ? 'المطبعة الرسمية' : locale === 'en' ? 'Official Printing Office' : 'Imprimerie Officielle',
    },
    {
      href: 'http://www.e-justice.tn',
      label: locale === 'ar' ? 'العدالة الإلكترونية' : locale === 'en' ? 'E-Justice Portal' : 'Portail E-Justice',
    },
  ]

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
  ]

  return (
    <footer className="mt-auto relative overflow-hidden">
      {/* Fond gradient premium */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-primary to-secondary" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.03%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />

      {/* Contenu */}
      <div className="relative z-10 text-white">
        {/* Section principale */}
        <div className="container mx-auto px-4 py-16">
          <div className={cn(
            "grid gap-12 md:grid-cols-2 lg:grid-cols-4",
            rtl && "text-right"
          )}>
            {/* À propos avec branding LégiTunisie */}
            <div className="lg:col-span-1">
              <div className={cn("flex items-center gap-4 mb-6", rtl && "flex-row-reverse")}>
                <TunisiaFlag className="h-10 w-16 rounded shadow-md" />
                <div>
                  <div className="font-bold text-xl tracking-wide">
                    {locale === 'ar' ? 'تشريع تونس' : 'LégiTunisie'}
                  </div>
                  <div className="text-[10px] text-white/70 uppercase tracking-wider">
                    {locale === 'ar'
                      ? 'خدمة نشر القانون التونسي'
                      : locale === 'en'
                        ? 'Tunisian Law Publication Service'
                        : 'Service de diffusion du droit tunisien'}
                  </div>
                </div>
              </div>
              <p className="text-sm text-white/70 mb-6 leading-relaxed">
                {t('footer.aboutText')}
              </p>

              {/* Réseaux sociaux */}
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
                      aria-label={social.label}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Liens rapides */}
            <div>
              <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
                <span className="w-8 h-0.5 bg-accent rounded-full" />
                {t('footer.quickLinks')}
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 hover:text-white hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-2 group"
                    >
                      <ArrowUpRight className={cn("h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity", rtl && "rotate-90")} />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sites gouvernementaux */}
            <div>
              <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
                <span className="w-8 h-0.5 bg-accent rounded-full" />
                {locale === 'ar' ? 'المواقع الحكومية' : locale === 'en' ? 'Government Sites' : 'Sites Gouvernementaux'}
              </h3>
              <ul className="space-y-3">
                {governmentLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "text-sm text-white/70 hover:text-white transition-all duration-200 inline-flex items-center gap-2 group",
                        rtl && "flex-row-reverse"
                      )}
                    >
                      {link.label}
                      <ExternalLink className="h-3 w-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
                <span className="w-8 h-0.5 bg-accent rounded-full" />
                {t('footer.contact')}
              </h3>
              <ul className="space-y-4">
                <li className={cn("flex items-start gap-3 text-sm", rtl && "flex-row-reverse")}>
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <span className="text-white/70 leading-relaxed">{t('footer.address')}</span>
                </li>
                <li className={cn("flex items-center gap-3 text-sm", rtl && "flex-row-reverse")}>
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                    <Phone className="h-4 w-4" />
                  </div>
                  <span dir="ltr" className="text-white/70 hover:text-white transition-colors">+216 71 XXX XXX</span>
                </li>
                <li className={cn("flex items-center gap-3 text-sm", rtl && "flex-row-reverse")}>
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                    <Mail className="h-4 w-4" />
                  </div>
                  <a href="mailto:contact@legitunisie.gov.tn" className="text-white/70 hover:text-white transition-colors">
                    contact@legitunisie.gov.tn
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Barre inférieure */}
        <div className="border-t border-white/10">
          <div className="container mx-auto px-4 py-6">
            <div className={cn(
              "flex flex-col md:flex-row justify-between items-center gap-4",
              rtl && "md:flex-row-reverse"
            )}>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <span>© {currentYear}</span>
                <span className="w-1 h-1 rounded-full bg-white/40" />
                <span>{locale === 'ar' ? 'تشريع تونس' : 'LégiTunisie'}</span>
                <span className="w-1 h-1 rounded-full bg-white/40" />
                <span>{locale === 'ar' ? 'الجمهورية التونسية' : locale === 'en' ? 'Republic of Tunisia' : 'République Tunisienne'}</span>
                <span className="w-1 h-1 rounded-full bg-white/40" />
                <span>{locale === 'ar' ? 'جميع الحقوق محفوظة' : locale === 'en' ? 'All rights reserved' : 'Tous droits réservés'}</span>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <Link href={`/${locale}/privacy`} className="text-white/60 hover:text-white transition-colors">
                  {t('footer.privacy')}
                </Link>
                <Link href={`/${locale}/terms`} className="text-white/60 hover:text-white transition-colors">
                  {t('footer.terms')}
                </Link>
                <Link href={`/${locale}/accessibility`} className="text-white/60 hover:text-white transition-colors">
                  {t('footer.accessibility')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
