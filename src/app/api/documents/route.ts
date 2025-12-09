import { NextRequest, NextResponse } from 'next/server'
import { demoDocuments } from '@/lib/demo-data'

// In-memory store for the POC
let documents = [...demoDocuments.map((doc, index) => ({
  ...doc,
  vues: Math.floor(Math.random() * 1000),
  createdAt: new Date(Date.now() - index * 86400000 * 30),
  updatedAt: new Date(Date.now() - index * 86400000 * 7)
}))]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')
  const limit = parseInt(searchParams.get('limit') || '10')
  const offset = parseInt(searchParams.get('offset') || '0')

  let filteredDocs = documents

  if (type) {
    filteredDocs = documents.filter(doc => doc.type === type)
  }

  // Sort by date (most recent first)
  filteredDocs.sort((a, b) =>
    new Date(b.datePublication).getTime() - new Date(a.datePublication).getTime()
  )

  const paginatedDocs = filteredDocs.slice(offset, offset + limit)

  return NextResponse.json({
    documents: paginatedDocs,
    total: filteredDocs.length,
    limit,
    offset
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const newDoc = {
      ...body,
      id: `doc-${Date.now()}`,
      vues: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    documents.push(newDoc)

    return NextResponse.json(newDoc, { status: 201 })
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    )
  }
}
