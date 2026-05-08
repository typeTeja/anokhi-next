import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { properties, propertyHighlights, leads } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { writeFile } from 'fs/promises';
import { join } from 'path';

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

    const response = NextResponse.json({
      ...property,
      highlights
    });
    // Add caching headers for static generation
    response.headers.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    return response;
  } catch (error: unknown) {
    console.error('Error fetching property detail:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

interface Highlight {
  label: string;
  value: string;
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const propertyId = parseInt(id);

    const formData = await req.formData();
    const title = formData.get('title') as string;
    const city = formData.get('city') as string;
    const area = formData.get('area') as string;
    const type = formData.get('type') as string;
    const highlightsJson = formData.get('highlights') as string;
    const file = formData.get('image') as File | null;

    if (!title || !city) {
      return NextResponse.json({ error: 'Title and city are required' }, { status: 400 });
    }

    let imagePath = null;
    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
      const path = join(process.cwd(), 'public', 'uploads', filename);
      await writeFile(path, buffer);
      imagePath = `/uploads/${filename}`;
    }

    // Update property
    await db.update(properties)
      .set({
        title,
        city,
        area,
        type,
        ...(imagePath && { image: imagePath }),
      })
      .where(eq(properties.id, propertyId));

    // Delete existing highlights
    await db.delete(propertyHighlights).where(eq(propertyHighlights.propertyId, propertyId));

    // Add new highlights
    if (highlightsJson) {
      const highlights = JSON.parse(highlightsJson);
      if (Array.isArray(highlights)) {
        const highlightsToInsert = highlights
          .filter((h: Highlight) => h.label && h.value)
          .map((h: Highlight) => ({
            propertyId,
            label: h.label,
            value: h.value,
          }));

        if (highlightsToInsert.length > 0) {
          await db.insert(propertyHighlights).values(highlightsToInsert);
        }
      }
    }

    return NextResponse.json({ id: propertyId, title, city, area, type, image: imagePath });
  } catch (error: unknown) {
    console.error('Error updating property:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
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
    await db.delete(properties).where(eq(properties.id, propertyId));

    return NextResponse.json({ message: 'Property deleted successfully' });
  } catch (error: unknown) {
    console.error('Error deleting property:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
