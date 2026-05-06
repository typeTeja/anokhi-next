import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { properties, propertyHighlights, leads } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const propertyId = parseInt(id);

    const [property] = await db.select()
      .from(properties)
      .where(eq(properties.id, propertyId))
      .limit(1);

    if (!property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    const highlights = await db.select({
      label: propertyHighlights.label,
      value: propertyHighlights.value,
    })
    .from(propertyHighlights)
    .where(eq(propertyHighlights.propertyId, propertyId));

    return NextResponse.json({
      ...property,
      highlights
    });
  } catch (error: any) {
    console.error('Error fetching property detail:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const propertyId = parseInt(id);

    // Delete associated data first
    await db.delete(propertyHighlights).where(eq(propertyHighlights.propertyId, propertyId));
    await db.delete(leads).where(eq(leads.propertyId, propertyId));
    
    // Delete the property
    const [result] = await db.delete(properties).where(eq(properties.id, propertyId));

    return NextResponse.json({ message: 'Property deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting property:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
