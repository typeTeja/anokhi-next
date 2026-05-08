import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { leads } from '@/lib/schema';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { propertyId, name, email, phone } = body;

    if (!propertyId || !name || !email || !phone) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    await db.insert(leads).values({
      propertyId: Number(propertyId),
      name,
      email,
      phone,
    });

    return NextResponse.json({ message: 'Lead saved successfully' }, { status: 201 });
  } catch (error: unknown) {
    console.error('Error creating lead:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
