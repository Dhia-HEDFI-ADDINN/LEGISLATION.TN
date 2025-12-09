"use client"

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import {
  FileText,
  Calendar,
  ArrowRight,
  Filter,
  Search,
  ChevronRight,
  ChevronDown,
  Home,
  Scale,
  BookOpen,
  Gavel,
  Building2,
  Users,
  Briefcase,
  Heart,
  Shield,
  Wallet,
  TreePine,
  GraduationCap,
  Landmark,
  Globe,
  ScrollText,
  Car,
  Stethoscope,
  Factory,
  Cpu
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Locale, isRTL } from '@/i18n/config'

// Types de documents
const documentTypes = [
  { id: 'constitution', icon: ScrollText },
  { id: 'code', icon: BookOpen },
  { id: 'loi', icon: Scale },
  { id: 'decret', icon: FileText },
  { id: 'arrete', icon: FileText },
  { id: 'circulaire', icon: FileText },
  { id: 'jurisprudence', icon: Gavel },
]

// Thématiques juridiques avec sous-catégories
const legalThemes = [
  {
    id: 'civil',
    icon: Users,
    color: 'bg-blue-600',
    subcategories: ['obligations', 'contrats', 'responsabilite', 'propriete', 'successions']
  },
  {
    id: 'penal',
    icon: Shield,
    color: 'bg-red-600',
    subcategories: ['infractions', 'procedures', 'peines', 'mineurs', 'terrorisme']
  },
  {
    id: 'commercial',
    icon: Briefcase,
    color: 'bg-amber-600',
    subcategories: ['societes', 'faillite', 'concurrence', 'consommation', 'banques']
  },
  {
    id: 'travail',
    icon: Factory,
    color: 'bg-green-600',
    subcategories: ['contrat_travail', 'licenciement', 'syndicats', 'securite_sociale', 'accidents']
  },
  {
    id: 'famille',
    icon: Heart,
    color: 'bg-pink-600',
    subcategories: ['mariage', 'divorce', 'filiation', 'tutelle', 'adoption']
  },
  {
    id: 'fiscal',
    icon: Wallet,
    color: 'bg-purple-600',
    subcategories: ['impot_revenu', 'tva', 'douanes', 'contentieux_fiscal', 'incitations']
  },
  {
    id: 'administratif',
    icon: Building2,
    color: 'bg-indigo-600',
    subcategories: ['fonction_publique', 'marches_publics', 'urbanisme', 'collectivites', 'contentieux_admin']
  },
  {
    id: 'environnement',
    icon: TreePine,
    color: 'bg-emerald-600',
    subcategories: ['pollution', 'eaux', 'forets', 'dechets', 'littoral']
  },
  {
    id: 'sante',
    icon: Stethoscope,
    color: 'bg-cyan-600',
    subcategories: ['etablissements', 'medicaments', 'professions', 'securite_sanitaire', 'bioethique']
  },
  {
    id: 'education',
    icon: GraduationCap,
    color: 'bg-orange-600',
    subcategories: ['primaire', 'secondaire', 'superieur', 'formation', 'recherche']
  },
  {
    id: 'transport',
    icon: Car,
    color: 'bg-slate-600',
    subcategories: ['routier', 'maritime', 'aerien', 'ferroviaire', 'securite_routiere']
  },
  {
    id: 'numerique',
    icon: Cpu,
    color: 'bg-violet-600',
    subcategories: ['donnees_personnelles', 'commerce_electronique', 'cybersecurite', 'startups', 'telecommunications']
  },
]

// Données de documents classifiés (simulation)
const documentsData = [
  // Codes
  {
    id: 'code-obligations',
    type: 'code',
    theme: 'civil',
    subcategory: 'obligations',
    numero: '',
    titleFr: 'Code des Obligations et des Contrats',
    titleAr: 'مجلة الالتزامات والعقود',
    titleEn: 'Code of Obligations and Contracts',
    date: '1906-12-15',
    status: 'en_vigueur'
  },
  {
    id: 'code-penal',
    type: 'code',
    theme: 'penal',
    subcategory: 'infractions',
    numero: '',
    titleFr: 'Code Pénal',
    titleAr: 'المجلة الجزائية',
    titleEn: 'Penal Code',
    date: '1913-07-09',
    status: 'en_vigueur'
  },
  {
    id: 'code-commerce',
    type: 'code',
    theme: 'commercial',
    subcategory: 'societes',
    numero: '',
    titleFr: 'Code de Commerce',
    titleAr: 'المجلة التجارية',
    titleEn: 'Commercial Code',
    date: '2000-05-02',
    status: 'en_vigueur'
  },
  {
    id: 'code-travail',
    type: 'code',
    theme: 'travail',
    subcategory: 'contrat_travail',
    numero: '',
    titleFr: 'Code du Travail',
    titleAr: 'مجلة الشغل',
    titleEn: 'Labor Code',
    date: '1966-04-30',
    status: 'en_vigueur'
  },
  {
    id: 'code-statut-personnel',
    type: 'code',
    theme: 'famille',
    subcategory: 'mariage',
    numero: '',
    titleFr: 'Code du Statut Personnel',
    titleAr: 'مجلة الأحوال الشخصية',
    titleEn: 'Personal Status Code',
    date: '1956-08-13',
    status: 'en_vigueur'
  },
  {
    id: 'code-procedures-civiles',
    type: 'code',
    theme: 'civil',
    subcategory: 'contrats',
    numero: '',
    titleFr: 'Code de Procédure Civile et Commerciale',
    titleAr: 'مجلة المرافعات المدنية والتجارية',
    titleEn: 'Code of Civil and Commercial Procedure',
    date: '1959-09-05',
    status: 'en_vigueur'
  },
  {
    id: 'code-procedures-penales',
    type: 'code',
    theme: 'penal',
    subcategory: 'procedures',
    numero: '',
    titleFr: 'Code de Procédure Pénale',
    titleAr: 'مجلة الإجراءات الجزائية',
    titleEn: 'Code of Criminal Procedure',
    date: '1968-09-24',
    status: 'en_vigueur'
  },
  {
    id: 'code-fiscalite',
    type: 'code',
    theme: 'fiscal',
    subcategory: 'impot_revenu',
    numero: '',
    titleFr: 'Code de l\'Impôt sur le Revenu des Personnes Physiques et de l\'Impôt sur les Sociétés',
    titleAr: 'مجلة الضريبة على دخل الأشخاص الطبيعيين والضريبة على الشركات',
    titleEn: 'Personal Income Tax and Corporate Tax Code',
    date: '1989-12-30',
    status: 'en_vigueur'
  },
  {
    id: 'code-douanes',
    type: 'code',
    theme: 'fiscal',
    subcategory: 'douanes',
    numero: '',
    titleFr: 'Code des Douanes',
    titleAr: 'مجلة الديوانة',
    titleEn: 'Customs Code',
    date: '2008-07-17',
    status: 'en_vigueur'
  },
  {
    id: 'code-investissement',
    type: 'code',
    theme: 'commercial',
    subcategory: 'concurrence',
    numero: '',
    titleFr: 'Code de l\'Investissement',
    titleAr: 'مجلة الاستثمار',
    titleEn: 'Investment Code',
    date: '2016-09-30',
    status: 'en_vigueur'
  },
  // Lois
  {
    id: 'loi-2024-01',
    type: 'loi',
    theme: 'fiscal',
    subcategory: 'impot_revenu',
    numero: '2024-01',
    titleFr: 'Loi de finances pour l\'année 2024',
    titleAr: 'قانون المالية لسنة 2024',
    titleEn: 'Finance Law for 2024',
    date: '2024-01-01',
    status: 'en_vigueur'
  },
  {
    id: 'loi-2023-17',
    type: 'loi',
    theme: 'numerique',
    subcategory: 'donnees_personnelles',
    numero: '2023-17',
    titleFr: 'Loi organique relative à la protection des données personnelles',
    titleAr: 'قانون أساسي يتعلق بحماية المعطيات الشخصية',
    titleEn: 'Organic Law on Personal Data Protection',
    date: '2023-06-15',
    status: 'en_vigueur'
  },
  {
    id: 'loi-2022-42',
    type: 'loi',
    theme: 'commercial',
    subcategory: 'societes',
    numero: '2022-42',
    titleFr: 'Loi relative aux sociétés commerciales',
    titleAr: 'قانون يتعلق بالشركات التجارية',
    titleEn: 'Law on Commercial Companies',
    date: '2022-09-20',
    status: 'en_vigueur'
  },
  {
    id: 'loi-2020-38',
    type: 'loi',
    theme: 'numerique',
    subcategory: 'startups',
    numero: '2020-38',
    titleFr: 'Loi relative aux startups',
    titleAr: 'قانون يتعلق بالشركات الناشئة',
    titleEn: 'Startup Act',
    date: '2020-04-17',
    status: 'en_vigueur'
  },
  {
    id: 'loi-2019-47',
    type: 'loi',
    theme: 'environnement',
    subcategory: 'pollution',
    numero: '2019-47',
    titleFr: 'Loi relative à l\'amélioration du climat des affaires',
    titleAr: 'قانون يتعلق بتحسين مناخ الأعمال',
    titleEn: 'Law on Improving the Business Climate',
    date: '2019-05-29',
    status: 'en_vigueur'
  },
  {
    id: 'loi-2018-26',
    type: 'loi',
    theme: 'travail',
    subcategory: 'securite_sociale',
    numero: '2018-26',
    titleFr: 'Loi relative à la sécurité sociale',
    titleAr: 'قانون يتعلق بالضمان الاجتماعي',
    titleEn: 'Social Security Law',
    date: '2018-04-17',
    status: 'en_vigueur'
  },
  // Décrets
  {
    id: 'decret-2024-156',
    type: 'decret',
    theme: 'administratif',
    subcategory: 'fonction_publique',
    numero: '2024-156',
    titleFr: 'Décret fixant le régime de rémunération des agents publics',
    titleAr: 'مرسوم يحدد نظام أجور الموظفين العموميين',
    titleEn: 'Decree Setting Public Servants Remuneration System',
    date: '2024-03-15',
    status: 'en_vigueur'
  },
  {
    id: 'decret-2024-089',
    type: 'decret',
    theme: 'administratif',
    subcategory: 'marches_publics',
    numero: '2024-89',
    titleFr: 'Décret portant organisation des marchés publics',
    titleAr: 'مرسوم يتعلق بتنظيم الصفقات العمومية',
    titleEn: 'Decree on Public Procurement Organization',
    date: '2024-02-01',
    status: 'en_vigueur'
  },
  {
    id: 'decret-2023-210',
    type: 'decret',
    theme: 'environnement',
    subcategory: 'dechets',
    numero: '2023-210',
    titleFr: 'Décret relatif à la gestion des déchets',
    titleAr: 'مرسوم يتعلق بالتصرف في النفايات',
    titleEn: 'Decree on Waste Management',
    date: '2023-08-20',
    status: 'en_vigueur'
  },
  {
    id: 'decret-2023-145',
    type: 'decret',
    theme: 'sante',
    subcategory: 'medicaments',
    numero: '2023-145',
    titleFr: 'Décret fixant les prix des médicaments',
    titleAr: 'مرسوم يحدد أسعار الأدوية',
    titleEn: 'Decree Setting Medicine Prices',
    date: '2023-05-10',
    status: 'en_vigueur'
  },
  // Jurisprudence
  {
    id: 'arret-2024-1234',
    type: 'jurisprudence',
    theme: 'civil',
    subcategory: 'responsabilite',
    numero: '2024-1234',
    titleFr: 'Arrêt de la Cour de Cassation - Responsabilité civile',
    titleAr: 'قرار محكمة التعقيب - المسؤولية المدنية',
    titleEn: 'Court of Cassation Ruling - Civil Liability',
    date: '2024-02-15',
    status: 'en_vigueur'
  },
  {
    id: 'arret-2023-5678',
    type: 'jurisprudence',
    theme: 'commercial',
    subcategory: 'faillite',
    numero: '2023-5678',
    titleFr: 'Arrêt de la Cour de Cassation - Faillite et redressement',
    titleAr: 'قرار محكمة التعقيب - الإفلاس والإنقاذ',
    titleEn: 'Court of Cassation Ruling - Bankruptcy and Restructuring',
    date: '2023-11-20',
    status: 'en_vigueur'
  },
  {
    id: 'arret-admin-2024-456',
    type: 'jurisprudence',
    theme: 'administratif',
    subcategory: 'contentieux_admin',
    numero: 'TA-2024-456',
    titleFr: 'Arrêt du Tribunal Administratif - Annulation décision',
    titleAr: 'حكم المحكمة الإدارية - إلغاء قرار',
    titleEn: 'Administrative Court Ruling - Decision Annulment',
    date: '2024-01-30',
    status: 'en_vigueur'
  },
]

export default function DocumentsPage() {
  const t = useTranslations()
  const locale = useLocale() as Locale
  const searchParams = useSearchParams()
  const rtl = isRTL(locale)

  const [selectedType, setSelectedType] = useState(searchParams.get('type') || '')
  const [selectedTheme, setSelectedTheme] = useState(searchParams.get('theme') || '')
  const [selectedSubcategory, setSelectedSubcategory] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedThemes, setExpandedThemes] = useState<string[]>(['civil'])

  // Labels localisés
  const getLocalizedText = (fr: string, ar: string, en: string) => {
    switch (locale) {
      case 'ar': return ar
      case 'en': return en
      default: return fr
    }
  }

  // Labels pour les thèmes
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

  // Labels pour les sous-catégories
  const subcategoryLabels: Record<string, { fr: string; ar: string; en: string }> = {
    // Civil
    obligations: { fr: 'Obligations', ar: 'الالتزامات', en: 'Obligations' },
    contrats: { fr: 'Contrats', ar: 'العقود', en: 'Contracts' },
    responsabilite: { fr: 'Responsabilité', ar: 'المسؤولية', en: 'Liability' },
    propriete: { fr: 'Propriété', ar: 'الملكية', en: 'Property' },
    successions: { fr: 'Successions', ar: 'الميراث', en: 'Inheritance' },
    // Pénal
    infractions: { fr: 'Infractions', ar: 'الجرائم', en: 'Offenses' },
    procedures: { fr: 'Procédures', ar: 'الإجراءات', en: 'Procedures' },
    peines: { fr: 'Peines', ar: 'العقوبات', en: 'Penalties' },
    mineurs: { fr: 'Mineurs', ar: 'الأحداث', en: 'Minors' },
    terrorisme: { fr: 'Terrorisme', ar: 'الإرهاب', en: 'Terrorism' },
    // Commercial
    societes: { fr: 'Sociétés', ar: 'الشركات', en: 'Companies' },
    faillite: { fr: 'Faillite', ar: 'الإفلاس', en: 'Bankruptcy' },
    concurrence: { fr: 'Concurrence', ar: 'المنافسة', en: 'Competition' },
    consommation: { fr: 'Consommation', ar: 'الاستهلاك', en: 'Consumer' },
    banques: { fr: 'Banques', ar: 'البنوك', en: 'Banks' },
    // Travail
    contrat_travail: { fr: 'Contrat de travail', ar: 'عقد الشغل', en: 'Employment Contract' },
    licenciement: { fr: 'Licenciement', ar: 'الطرد', en: 'Dismissal' },
    syndicats: { fr: 'Syndicats', ar: 'النقابات', en: 'Unions' },
    securite_sociale: { fr: 'Sécurité sociale', ar: 'الضمان الاجتماعي', en: 'Social Security' },
    accidents: { fr: 'Accidents du travail', ar: 'حوادث الشغل', en: 'Work Accidents' },
    // Famille
    mariage: { fr: 'Mariage', ar: 'الزواج', en: 'Marriage' },
    divorce: { fr: 'Divorce', ar: 'الطلاق', en: 'Divorce' },
    filiation: { fr: 'Filiation', ar: 'النسب', en: 'Filiation' },
    tutelle: { fr: 'Tutelle', ar: 'الولاية', en: 'Guardianship' },
    adoption: { fr: 'Adoption', ar: 'التبني', en: 'Adoption' },
    // Fiscal
    impot_revenu: { fr: 'Impôt sur le revenu', ar: 'ضريبة الدخل', en: 'Income Tax' },
    tva: { fr: 'TVA', ar: 'الأداء على القيمة المضافة', en: 'VAT' },
    douanes: { fr: 'Douanes', ar: 'الديوانة', en: 'Customs' },
    contentieux_fiscal: { fr: 'Contentieux fiscal', ar: 'النزاعات الجبائية', en: 'Tax Litigation' },
    incitations: { fr: 'Incitations fiscales', ar: 'الحوافز الجبائية', en: 'Tax Incentives' },
    // Administratif
    fonction_publique: { fr: 'Fonction publique', ar: 'الوظيفة العمومية', en: 'Public Service' },
    marches_publics: { fr: 'Marchés publics', ar: 'الصفقات العمومية', en: 'Public Procurement' },
    urbanisme: { fr: 'Urbanisme', ar: 'التعمير', en: 'Urban Planning' },
    collectivites: { fr: 'Collectivités locales', ar: 'الجماعات المحلية', en: 'Local Government' },
    contentieux_admin: { fr: 'Contentieux administratif', ar: 'النزاعات الإدارية', en: 'Administrative Litigation' },
    // Environnement
    pollution: { fr: 'Pollution', ar: 'التلوث', en: 'Pollution' },
    eaux: { fr: 'Ressources en eau', ar: 'الموارد المائية', en: 'Water Resources' },
    forets: { fr: 'Forêts', ar: 'الغابات', en: 'Forests' },
    dechets: { fr: 'Déchets', ar: 'النفايات', en: 'Waste' },
    littoral: { fr: 'Littoral', ar: 'الشريط الساحلي', en: 'Coastal' },
    // Santé
    etablissements: { fr: 'Établissements de santé', ar: 'المؤسسات الصحية', en: 'Healthcare Facilities' },
    medicaments: { fr: 'Médicaments', ar: 'الأدوية', en: 'Medicines' },
    professions: { fr: 'Professions de santé', ar: 'المهن الصحية', en: 'Health Professions' },
    securite_sanitaire: { fr: 'Sécurité sanitaire', ar: 'السلامة الصحية', en: 'Health Security' },
    bioethique: { fr: 'Bioéthique', ar: 'الأخلاقيات الحيوية', en: 'Bioethics' },
    // Numérique
    donnees_personnelles: { fr: 'Données personnelles', ar: 'المعطيات الشخصية', en: 'Personal Data' },
    commerce_electronique: { fr: 'Commerce électronique', ar: 'التجارة الإلكترونية', en: 'E-commerce' },
    cybersecurite: { fr: 'Cybersécurité', ar: 'الأمن السيبراني', en: 'Cybersecurity' },
    startups: { fr: 'Startups', ar: 'الشركات الناشئة', en: 'Startups' },
    telecommunications: { fr: 'Télécommunications', ar: 'الاتصالات', en: 'Telecommunications' },
  }

  // Labels pour les types
  const typeLabels: Record<string, { fr: string; ar: string; en: string }> = {
    constitution: { fr: 'Constitution', ar: 'الدستور', en: 'Constitution' },
    code: { fr: 'Codes', ar: 'المجلات', en: 'Codes' },
    loi: { fr: 'Lois', ar: 'القوانين', en: 'Laws' },
    decret: { fr: 'Décrets', ar: 'المراسيم', en: 'Decrees' },
    arrete: { fr: 'Arrêtés', ar: 'القرارات', en: 'Orders' },
    circulaire: { fr: 'Circulaires', ar: 'المناشير', en: 'Circulars' },
    jurisprudence: { fr: 'Jurisprudence', ar: 'الاجتهاد القضائي', en: 'Case Law' },
  }

  const getThemeLabel = (themeId: string) => {
    const label = themeLabels[themeId]
    return label ? getLocalizedText(label.fr, label.ar, label.en) : themeId
  }

  const getSubcategoryLabel = (subcatId: string) => {
    const label = subcategoryLabels[subcatId]
    return label ? getLocalizedText(label.fr, label.ar, label.en) : subcatId
  }

  const getTypeLabel = (typeId: string) => {
    const label = typeLabels[typeId]
    return label ? getLocalizedText(label.fr, label.ar, label.en) : typeId
  }

  const getDocTitle = (doc: typeof documentsData[0]) => {
    switch (locale) {
      case 'ar': return doc.titleAr
      case 'en': return doc.titleEn
      default: return doc.titleFr
    }
  }

  // Filtrer les documents
  const filteredDocuments = useMemo(() => {
    return documentsData.filter(doc => {
      const matchesType = !selectedType || doc.type === selectedType
      const matchesTheme = !selectedTheme || doc.theme === selectedTheme
      const matchesSubcat = !selectedSubcategory || doc.subcategory === selectedSubcategory
      const matchesSearch = !searchQuery ||
        doc.titleFr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.titleAr.includes(searchQuery) ||
        doc.titleEn.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesType && matchesTheme && matchesSubcat && matchesSearch
    })
  }, [selectedType, selectedTheme, selectedSubcategory, searchQuery])

  // Toggle theme expansion
  const toggleTheme = (themeId: string) => {
    setExpandedThemes(prev =>
      prev.includes(themeId)
        ? prev.filter(id => id !== themeId)
        : [...prev, themeId]
    )
  }

  // Clear filters
  const clearFilters = () => {
    setSelectedType('')
    setSelectedTheme('')
    setSelectedSubcategory('')
    setSearchQuery('')
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-2">
          <div className={cn("flex items-center gap-2 text-sm text-muted-foreground", rtl && "flex-row-reverse")}>
            <Link href={`/${locale}`} className="flex items-center gap-1 hover:text-foreground transition-colors">
              <Home className="h-4 w-4" />
            </Link>
            <ChevronRight className={cn("h-4 w-4", rtl && "rotate-180")} />
            <span className="text-foreground font-medium">
              {getLocalizedText('Documents', 'الوثائق', 'Documents')}
            </span>
            {selectedTheme && (
              <>
                <ChevronRight className={cn("h-4 w-4", rtl && "rotate-180")} />
                <span className="text-foreground">{getThemeLabel(selectedTheme)}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Navigation par thèmes */}
          <aside className="lg:col-span-1">
            {/* Recherche */}
            <div className="mb-6">
              <div className="relative">
                <Search className={cn("absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground", rtl ? "right-3" : "left-3")} />
                <Input
                  type="text"
                  placeholder={getLocalizedText('Rechercher...', 'بحث...', 'Search...')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={cn("h-10", rtl ? "pr-10" : "pl-10")}
                />
              </div>
            </div>

            {/* Types de documents */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Filter className="h-4 w-4" />
                {getLocalizedText('Type de document', 'نوع الوثيقة', 'Document Type')}
              </h3>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedType('')}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                    !selectedType ? "bg-primary text-white" : "hover:bg-muted"
                  )}
                >
                  {getLocalizedText('Tous les types', 'جميع الأنواع', 'All types')}
                </button>
                {documentTypes.map(type => {
                  const Icon = type.icon
                  return (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2",
                        selectedType === type.id ? "bg-primary text-white" : "hover:bg-muted",
                        rtl && "flex-row-reverse text-right"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {getTypeLabel(type.id)}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Thématiques */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                {getLocalizedText('Thématiques', 'المواضيع', 'Themes')}
              </h3>
              <div className="space-y-1">
                <button
                  onClick={() => { setSelectedTheme(''); setSelectedSubcategory(''); }}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                    !selectedTheme ? "bg-secondary text-white" : "hover:bg-muted"
                  )}
                >
                  {getLocalizedText('Toutes les thématiques', 'جميع المواضيع', 'All themes')}
                </button>

                {legalThemes.map(theme => {
                  const Icon = theme.icon
                  const isExpanded = expandedThemes.includes(theme.id)
                  const isSelected = selectedTheme === theme.id

                  return (
                    <div key={theme.id}>
                      <button
                        onClick={() => {
                          setSelectedTheme(theme.id)
                          setSelectedSubcategory('')
                          toggleTheme(theme.id)
                        }}
                        className={cn(
                          "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2",
                          isSelected ? "bg-secondary text-white" : "hover:bg-muted",
                          rtl && "flex-row-reverse text-right"
                        )}
                      >
                        <div className={cn("w-6 h-6 rounded flex items-center justify-center text-white", theme.color)}>
                          <Icon className="h-3.5 w-3.5" />
                        </div>
                        <span className="flex-1">{getThemeLabel(theme.id)}</span>
                        <ChevronDown className={cn(
                          "h-4 w-4 transition-transform",
                          isExpanded && "rotate-180",
                          isSelected && "text-white"
                        )} />
                      </button>

                      {/* Sous-catégories */}
                      {isExpanded && (
                        <div className={cn("mt-1 space-y-0.5", rtl ? "mr-6" : "ml-6")}>
                          {theme.subcategories.map(subcat => (
                            <button
                              key={subcat}
                              onClick={() => {
                                setSelectedTheme(theme.id)
                                setSelectedSubcategory(subcat)
                              }}
                              className={cn(
                                "w-full text-left px-3 py-1.5 rounded text-sm transition-colors",
                                selectedSubcategory === subcat ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                              )}
                            >
                              {getSubcategoryLabel(subcat)}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </aside>

          {/* Main content */}
          <main className="lg:col-span-3">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold">
                  {selectedTheme
                    ? getThemeLabel(selectedTheme)
                    : selectedType
                      ? getTypeLabel(selectedType)
                      : getLocalizedText('Tous les documents', 'جميع الوثائق', 'All Documents')
                  }
                  {selectedSubcategory && ` - ${getSubcategoryLabel(selectedSubcategory)}`}
                </h1>
                <p className="text-muted-foreground text-sm mt-1">
                  {filteredDocuments.length} {getLocalizedText('document(s) trouvé(s)', 'وثيقة', 'document(s) found')}
                </p>
              </div>

              {(selectedType || selectedTheme || searchQuery) && (
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  {getLocalizedText('Effacer les filtres', 'مسح المرشحات', 'Clear filters')}
                </Button>
              )}
            </div>

            {/* Documents Grid */}
            {filteredDocuments.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-4">
                {filteredDocuments.map((doc) => {
                  const theme = legalThemes.find(t => t.id === doc.theme)
                  const ThemeIcon = theme?.icon || FileText

                  return (
                    <Link key={doc.id} href={`/${locale}/documents/${doc.id}`}>
                      <Card className="h-full hover:shadow-lg hover:border-primary/30 transition-all group">
                        <CardContent className="p-5">
                          <div className="flex items-start gap-3">
                            <div className={cn(
                              "w-10 h-10 rounded-lg flex items-center justify-center text-white shrink-0",
                              theme?.color || "bg-gray-500"
                            )}>
                              <ThemeIcon className="h-5 w-5" />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2 flex-wrap">
                                <span className="text-xs font-medium px-2 py-0.5 rounded bg-secondary/10 text-secondary">
                                  {getTypeLabel(doc.type)}
                                </span>
                                {doc.numero && (
                                  <span className="text-xs text-muted-foreground">
                                    n° {doc.numero}
                                  </span>
                                )}
                              </div>

                              <h3 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors mb-2">
                                {getDocTitle(doc)}
                              </h3>

                              <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {new Date(doc.date).toLocaleDateString(
                                    locale === 'ar' ? 'ar-TN' : locale === 'en' ? 'en-US' : 'fr-TN'
                                  )}
                                </span>
                                <ArrowRight className={cn(
                                  "h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity",
                                  rtl && "rotate-180"
                                )} />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-16">
                <FileText className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground mb-2">
                  {getLocalizedText('Aucun document trouvé', 'لم يتم العثور على وثائق', 'No documents found')}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {getLocalizedText(
                    'Essayez de modifier vos critères de recherche',
                    'حاول تعديل معايير البحث',
                    'Try adjusting your search criteria'
                  )}
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  {getLocalizedText('Réinitialiser', 'إعادة تعيين', 'Reset')}
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
