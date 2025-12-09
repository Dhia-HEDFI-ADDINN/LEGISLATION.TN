# SNIJ - Portail National d'Information Juridique

<div align="center">

![SNIJ Logo](https://img.shields.io/badge/SNIJ-Portail%20Juridique-blue?style=for-the-badge)

**Système National d'Information Juridique de la République Tunisienne**

[Français](#français) | [العربية](#العربية) | [English](#english)

</div>

---

## Français

### 📋 Description

Le SNIJ (Système National d'Information Juridique) est un portail web permettant l'accès à l'information juridique tunisienne, incluant :
- La Constitution
- Les codes en vigueur
- Les textes législatifs et réglementaires
- La jurisprudence
- Les circulaires
- Le Journal Officiel (JORT)

### 🚀 Fonctionnalités Principales

#### Recherche Intelligente
- ✅ Recherche par mots-clés avec support multilingue (AR/FR/EN)
- ✅ Assistant juridique IA (chatbot) avec citations des sources
- ✅ Suggestions et auto-complétion
- ✅ Filtres avancés (type, date, domaine, statut)
- ✅ Gestion des synonymes juridiques

#### Interface Publique (Front-Office)
- ✅ Page d'accueil avec accès aux rubriques principales
- ✅ Interface de recherche simple et avancée
- ✅ Affichage des résultats avec surbrillance
- ✅ Consultation des documents juridiques
- ✅ Support trilingue complet avec RTL pour l'arabe

#### Administration (Back-Office)
- ✅ Authentification sécurisée
- ✅ Gestion des documents juridiques (CRUD)
- ✅ Tableau de bord de supervision
- ✅ Statistiques d'utilisation

### 🛠️ Stack Technique

| Composant | Technologie |
|-----------|-------------|
| Frontend | Next.js 15, React 19, TypeScript |
| Styling | Tailwind CSS 4 |
| i18n | next-intl (AR/FR/EN + RTL) |
| Base de données | PostgreSQL + Prisma (optionnel) |
| Recherche | Full-text search intégré |
| IA | RAG simplifié pour le POC |
| Déploiement | Docker, Docker Compose |

### 📦 Installation

#### Prérequis
- Node.js 20+
- npm ou yarn
- Docker (optionnel)

#### Installation locale

```bash
# Cloner le repository
git clone https://github.com/votre-repo/legislation.tn.git
cd legislation.tn

# Installer les dépendances
npm install

# Copier les variables d'environnement
cp .env.example .env

# Lancer en mode développement
npm run dev
```

L'application sera disponible sur http://localhost:3000

#### Déploiement avec Docker

```bash
# Build et lancement avec Docker Compose
docker-compose up -d

# Pour le développement
docker-compose -f docker-compose.dev.yml up
```

### 📁 Structure du Projet

```
legislation.tn/
├── src/
│   ├── app/
│   │   ├── [locale]/           # Pages localisées (ar/fr/en)
│   │   │   ├── page.tsx        # Page d'accueil
│   │   │   ├── search/         # Recherche
│   │   │   ├── documents/      # Liste et détail documents
│   │   │   ├── chat/           # Assistant IA
│   │   │   ├── admin/          # Back-office
│   │   │   ├── auth/           # Authentification
│   │   │   └── statistics/     # Statistiques
│   │   └── api/                # Routes API REST
│   │       ├── documents/      # CRUD documents
│   │       ├── search/         # Recherche
│   │       ├── chat/           # IA conversationnelle
│   │       └── auth/           # Authentification
│   ├── components/
│   │   ├── ui/                 # Composants UI réutilisables
│   │   └── layout/             # Header, Footer
│   ├── lib/                    # Utilitaires et données démo
│   ├── messages/               # Traductions (ar.json, fr.json, en.json)
│   ├── i18n/                   # Configuration i18n
│   └── types/                  # Types TypeScript
├── prisma/                     # Schéma base de données
├── docker-compose.yml          # Configuration Docker
└── README.md
```

### 🔐 Identifiants de Démonstration

| Rôle | Email | Mot de passe |
|------|-------|--------------|
| Admin | admin@legislation.tn | admin123 |
| Contributeur | contributeur@legislation.tn | contrib123 |
| Validateur | validateur@legislation.tn | valid123 |

### 📊 API Endpoints

| Endpoint | Méthode | Description |
|----------|---------|-------------|
| `/api/documents` | GET | Liste des documents |
| `/api/documents` | POST | Créer un document |
| `/api/documents/[id]` | GET | Détail d'un document |
| `/api/documents/[id]` | PUT | Modifier un document |
| `/api/documents/[id]` | DELETE | Supprimer un document |
| `/api/search` | GET | Recherche de documents |
| `/api/chat` | POST | Assistant IA |
| `/api/auth/login` | POST | Connexion |
| `/api/auth/logout` | POST | Déconnexion |
| `/api/statistics` | GET | Statistiques |

### ✅ Critères de Validation

- [x] Recherche fonctionnelle avec résultats pertinents
- [x] IA opérationnelle avec citation des sources
- [x] Interface multilingue AR/FR/EN avec RTL
- [x] Affichage des documents avec navigation
- [x] Back-office pour gestion des documents
- [x] Temps de réponse < 3 secondes

---

## العربية

### 📋 الوصف

المنظومة الوطنية للمعلومات القانونية (SNIJ) هي بوابة إلكترونية تتيح الوصول إلى المعلومات القانونية التونسية:
- الدستور
- المجلات القانونية
- النصوص التشريعية والترتيبية
- فقه القضاء
- المناشير
- الرائد الرسمي للجمهورية التونسية

### 🚀 الميزات الرئيسية

- ✅ بحث ذكي متعدد اللغات (عربي/فرنسي/إنجليزي)
- ✅ مساعد قانوني آلي (ذكاء اصطناعي)
- ✅ واجهة مستخدم تدعم الكتابة من اليمين إلى اليسار
- ✅ لوحة تحكم للإدارة

### 📦 التثبيت

```bash
# تثبيت المتطلبات
npm install

# تشغيل التطبيق
npm run dev
```

---

## English

### 📋 Description

SNIJ (National Legal Information System) is a web portal providing access to Tunisian legal information:
- Constitution
- Legal Codes
- Legislative and Regulatory Texts
- Case Law
- Circulars
- Official Gazette (JORT)

### 🚀 Key Features

- ✅ Intelligent multilingual search (AR/FR/EN)
- ✅ AI-powered legal assistant with source citations
- ✅ Full RTL support for Arabic
- ✅ Administrative dashboard

### 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Visit http://localhost:3000

---

## 📄 License

This project is developed for the Tunisian Government - Ministry of Technology and Communication.

## 🤝 Contributing

For questions or contributions, please contact the project team.

---

<div align="center">

**République Tunisienne - Ministère des Technologies de la Communication**

© 2024-2025 - Tous droits réservés

</div>
