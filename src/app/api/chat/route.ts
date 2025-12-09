import { NextRequest, NextResponse } from 'next/server'
import { demoDocuments } from '@/lib/demo-data'

// Simple RAG-like response generation for the POC
// In production, this would use a real LLM with embeddings

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s\u0600-\u06FF]/g, ' ')
    .trim()
}

function findRelevantDocuments(query: string, locale: string, limit: number = 3) {
  const normalizedQuery = normalizeText(query)
  const queryTerms = normalizedQuery.split(/\s+/).filter(t => t.length > 1)

  const scoredDocs = demoDocuments.map(doc => {
    const titleField = locale === 'ar' ? doc.titreAr : locale === 'en' ? doc.titreEn : doc.titreFr
    const contentField = locale === 'ar' ? doc.contenuAr : locale === 'en' ? doc.contenuEn : doc.contenuFr
    const resumeField = locale === 'ar' ? doc.resumeAr : locale === 'en' ? doc.resumeEn : doc.resumeFr

    const searchableText = normalizeText(
      `${titleField} ${contentField} ${resumeField || ''} ${doc.motsCles.join(' ')}`
    )

    let score = 0
    queryTerms.forEach(term => {
      if (normalizeText(titleField).includes(term)) score += 10
      if (doc.motsCles.some(k => normalizeText(k).includes(term))) score += 5
      if (searchableText.includes(term)) score += 1
    })

    return { doc, score, title: titleField, content: contentField, resume: resumeField }
  })

  return scoredDocs
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
}

function generateResponse(query: string, relevantDocs: ReturnType<typeof findRelevantDocuments>, locale: string): string {
  if (relevantDocs.length === 0) {
    const noResultMessages = {
      ar: 'عذراً، لم أجد معلومات محددة حول هذا الموضوع في قاعدة البيانات القانونية. يرجى تجربة صياغة أخرى للسؤال أو استشارة مختص قانوني.',
      fr: "Désolé, je n'ai pas trouvé d'informations spécifiques sur ce sujet dans la base de données juridique. Veuillez essayer une autre formulation ou consulter un professionnel du droit.",
      en: "Sorry, I couldn't find specific information on this topic in the legal database. Please try a different phrasing or consult a legal professional."
    }
    return noResultMessages[locale as keyof typeof noResultMessages] || noResultMessages.fr
  }

  // Generate a response based on the found documents
  const introMessages = {
    ar: 'بناءً على النصوص القانونية المتوفرة، إليك المعلومات المتعلقة بسؤالك:\n\n',
    fr: 'Selon les textes juridiques disponibles, voici les informations relatives à votre question :\n\n',
    en: 'Based on the available legal texts, here is the information related to your question:\n\n'
  }

  let response = introMessages[locale as keyof typeof introMessages] || introMessages.fr

  relevantDocs.forEach((item, index) => {
    const excerpt = item.resume || item.content.substring(0, 300)
    response += `${index + 1}. **${item.title}**\n`
    response += `   ${excerpt}...\n\n`
  })

  const disclaimerMessages = {
    ar: '\n⚠️ هذه المعلومات إرشادية. للحصول على استشارة قانونية دقيقة، يرجى التواصل مع مختص.',
    fr: '\n⚠️ Ces informations sont fournies à titre indicatif. Pour un conseil juridique précis, veuillez consulter un professionnel.',
    en: '\n⚠️ This information is provided for guidance only. For accurate legal advice, please consult a professional.'
  }

  response += disclaimerMessages[locale as keyof typeof disclaimerMessages] || disclaimerMessages.fr

  return response
}

export async function POST(request: NextRequest) {
  try {
    const { message, locale = 'fr', sessionId } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Find relevant documents
    const relevantDocs = findRelevantDocuments(message, locale)

    // Generate response
    const response = generateResponse(message, relevantDocs, locale)

    // Format sources
    const sources = relevantDocs.map(item => ({
      documentId: item.doc.id,
      titre: item.title,
      type: item.doc.type,
      numero: item.doc.numero,
      excerpt: (item.resume || item.content).substring(0, 150) + '...'
    }))

    return NextResponse.json({
      response,
      sources,
      sessionId: sessionId || `session-${Date.now()}`
    })
  } catch {
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}
