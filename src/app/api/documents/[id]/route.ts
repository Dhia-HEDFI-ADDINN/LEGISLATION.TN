import { NextRequest, NextResponse } from 'next/server'
import { demoDocuments } from '@/lib/demo-data'

// In-memory store for the POC
let documents = [...demoDocuments.map((doc, index) => ({
  ...doc,
  vues: Math.floor(Math.random() * 1000),
  createdAt: new Date(Date.now() - index * 86400000 * 30),
  updatedAt: new Date(Date.now() - index * 86400000 * 7)
}))]

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const document = documents.find(doc => doc.id === id)

  if (!document) {
    return NextResponse.json(
      { error: 'Document not found' },
      { status: 404 }
    )
  }

  // Increment views
  const docIndex = documents.findIndex(doc => doc.id === id)
  if (docIndex !== -1) {
    documents[docIndex] = { ...documents[docIndex], vues: documents[docIndex].vues + 1 }
  }

  return NextResponse.json(document)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const docIndex = documents.findIndex(doc => doc.id === id)

    if (docIndex === -1) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      )
    }

    documents[docIndex] = {
      ...documents[docIndex],
      ...body,
      updatedAt: new Date()
    }

    return NextResponse.json(documents[docIndex])
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const docIndex = documents.findIndex(doc => doc.id === id)

  if (docIndex === -1) {
    return NextResponse.json(
      { error: 'Document not found' },
      { status: 404 }
    )
  }

  documents = documents.filter(doc => doc.id !== id)

  return NextResponse.json({ success: true })
}
