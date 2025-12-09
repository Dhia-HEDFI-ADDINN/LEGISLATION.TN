"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { LogIn, UserPlus, Loader2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { Locale, isRTL } from '@/i18n/config'

export default function AuthPage() {
  const t = useTranslations()
  const locale = useLocale() as Locale
  const router = useRouter()
  const rtl = isRTL(locale)

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Login form
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  // Register form
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('')
  const [registerFirstName, setRegisterFirstName] = useState('')
  const [registerLastName, setRegisterLastName] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword })
      })

      const data = await response.json()

      if (!response.ok) {
        setError(t('auth.loginError'))
        return
      }

      // Redirect based on role
      if (data.user.role === 'admin' || data.user.role === 'contributeur' || data.user.role === 'validateur') {
        router.push(`/${locale}/admin`)
      } else {
        router.push(`/${locale}`)
      }
    } catch {
      setError(t('common.error'))
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    if (registerPassword !== registerConfirmPassword) {
      setError(locale === 'ar' ? 'كلمات المرور غير متطابقة' : locale === 'en' ? 'Passwords do not match' : 'Les mots de passe ne correspondent pas')
      setIsLoading(false)
      return
    }

    // For POC, just show success message
    setTimeout(() => {
      setIsLoading(false)
      alert(t('auth.registerSuccess'))
    }, 1000)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">
              <LogIn className="h-4 w-4 mr-2" />
              {t('auth.loginTitle')}
            </TabsTrigger>
            <TabsTrigger value="register">
              <UserPlus className="h-4 w-4 mr-2" />
              {t('auth.registerTitle')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>{t('auth.loginTitle')}</CardTitle>
                <CardDescription>
                  {locale === 'ar'
                    ? 'سجل دخولك للوصول إلى حسابك'
                    : locale === 'en'
                      ? 'Sign in to access your account'
                      : 'Connectez-vous pour accéder à votre compte'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  {error && (
                    <div className="p-3 rounded bg-destructive/10 text-destructive text-sm flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      {error}
                    </div>
                  )}

                  <div>
                    <label className="text-sm font-medium mb-1 block">{t('auth.email')}</label>
                    <Input
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="email@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">{t('auth.password')}</label>
                    <Input
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : t('common.login')}
                  </Button>

                  <p className="text-sm text-center text-muted-foreground">
                    <a href="#" className="text-primary hover:underline">{t('auth.forgotPassword')}</a>
                  </p>

                  {/* Demo credentials */}
                  <div className="mt-6 p-4 bg-muted rounded-lg">
                    <p className="text-sm font-medium mb-2">
                      {locale === 'ar' ? 'بيانات تجريبية:' : locale === 'en' ? 'Demo credentials:' : 'Identifiants de démonstration :'}
                    </p>
                    <div className="text-xs space-y-1 text-muted-foreground">
                      <p>Admin: admin@legislation.tn / admin123</p>
                      <p>Contributeur: contributeur@legislation.tn / contrib123</p>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>{t('auth.registerTitle')}</CardTitle>
                <CardDescription>
                  {locale === 'ar'
                    ? 'أنشئ حسابًا جديدًا للوصول إلى الميزات الإضافية'
                    : locale === 'en'
                      ? 'Create a new account to access additional features'
                      : 'Créez un compte pour accéder aux fonctionnalités supplémentaires'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister} className="space-y-4">
                  {error && (
                    <div className="p-3 rounded bg-destructive/10 text-destructive text-sm flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">{t('auth.firstName')}</label>
                      <Input
                        value={registerFirstName}
                        onChange={(e) => setRegisterFirstName(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">{t('auth.lastName')}</label>
                      <Input
                        value={registerLastName}
                        onChange={(e) => setRegisterLastName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">{t('auth.email')}</label>
                    <Input
                      type="email"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      placeholder="email@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">{t('auth.password')}</label>
                    <Input
                      type="password"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">{t('auth.confirmPassword')}</label>
                    <Input
                      type="password"
                      value={registerConfirmPassword}
                      onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : t('common.register')}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
