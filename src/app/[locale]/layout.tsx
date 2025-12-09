import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { locales, Locale, isRTL } from '@/i18n/config'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { cn } from '@/lib/utils'
import '../globals.css'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  const messages = await getMessages()
  const rtl = isRTL(locale as Locale)

  return (
    <html lang={locale} dir={rtl ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+Arabic:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        rtl ? "font-arabic" : "font-sans"
      )}>
        <NextIntlClientProvider messages={messages}>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  const titles = {
    ar: 'المنظومة الوطنية للمعلومات القانونية',
    fr: 'SNIJ - Portail National d\'Information Juridique',
    en: 'SNIJ - National Legal Information Portal'
  }

  const descriptions = {
    ar: 'المنظومة الوطنية للمعلومات القانونية للجمهورية التونسية - البوابة الرسمية للوصول إلى التشريعات التونسية',
    fr: 'Le Système National d\'Information Juridique de la République Tunisienne - Portail officiel d\'accès à la législation tunisienne',
    en: 'The National Legal Information System of the Tunisian Republic - Official portal for accessing Tunisian legislation'
  }

  return {
    title: {
      default: titles[locale as keyof typeof titles] || titles.fr,
      template: `%s | ${titles[locale as keyof typeof titles] || titles.fr}`
    },
    description: descriptions[locale as keyof typeof descriptions] || descriptions.fr,
  }
}
