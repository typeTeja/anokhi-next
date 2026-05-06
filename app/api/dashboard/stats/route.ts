import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { properties, leads } from '@/lib/schema';
import { count, desc, eq } from 'drizzle-orm';

export async function GET() {
  try {
    const [propertyCount] = await db.select({ value: count() }).from(properties);
    const [leadCount] = await db.select({ value: count() }).from(leads);
    
    // Get recent leads with property details
    const recentLeads = await db.select({
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
    .orderBy(desc(leads.createdAt))
    .limit(5);

    return NextResponse.json({
      totalProperties: propertyCount.value,
      totalLeads: leadCount.value,
      recentLeads: recentLeads
    });
  } catch (error: unknown) {
    console.error('Error fetching dashboard stats:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
