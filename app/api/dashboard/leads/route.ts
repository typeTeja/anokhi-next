import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { leads, properties } from '@/lib/schema';
import { desc, eq } from 'drizzle-orm';

export async function GET() {
  try {
    const allLeads = await db.select({
      id: leads.id,
      propertyId: leads.propertyId,
      name: leads.name,
      email: leads.email,
      phone: leads.phone,
      createdAt: leads.createdAt,
      propertyTitle: properties.title,
    })
    .from(leads)
    .leftJoin(properties, eq(leads.propertyId, properties.id))
    .orderBy(desc(leads.createdAt));

    return NextResponse.json(allLeads);
  } catch (error: unknown) {
    console.error('Error fetching leads:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
