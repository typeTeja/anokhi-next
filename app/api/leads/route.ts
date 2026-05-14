import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { leads, properties } from '@/lib/schema';
import { pushToCRM } from '@/lib/crm';
import { eq } from 'drizzle-orm';

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

    // Get property details for CRM
    const property = await db.select({ title: properties.title })
      .from(properties)
      .where(eq(properties.id, Number(propertyId)))
      .limit(1);

    // Push to CRM (Background task)
    pushToCRM({
      name,
      email,
      phone,
      type: 'project',
      projectName: property[0]?.title || 'Unknown Property',
    }).catch(err => console.error('Background CRM push failed:', err));

    return NextResponse.json({ message: 'Lead saved successfully' }, { status: 201 });
  } catch (error: unknown) {
    console.error('Error creating lead:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
