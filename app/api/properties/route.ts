import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { properties, propertyHighlights } from '@/lib/schema';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { desc, eq, and, like } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get('city');
    const area = searchParams.get('area');
    const type = searchParams.get('type');
    const search = searchParams.get('search');

    const filters = [];
    if (city) filters.push(eq(properties.city, city));
    if (area) filters.push(eq(properties.area, area));
    if (type) filters.push(eq(properties.type, type));
    if (search) filters.push(like(properties.title, `%${search}%`));

    const props = await db.select()
      .from(properties)
      .where(filters.length > 0 ? and(...filters) : undefined)
      .orderBy(desc(properties.createdAt));

    // Fetch highlights separately to avoid MariaDB incompatibility with LATERAL JOIN
    const allProperties = await Promise.all(
      props.map(async (prop) => {
        const highlights = await db.select({
          label: propertyHighlights.label,
          value: propertyHighlights.value,
        })
        .from(propertyHighlights)
        .where(eq(propertyHighlights.propertyId, prop.id));
        
        return { ...prop, highlights };
      })
    );

    const response = NextResponse.json(allProperties);
    // Add caching headers for static generation
    response.headers.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    return response;
  } catch (error: unknown) {
    console.error('Error fetching properties:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

interface Highlight {
  label: string;
  value: string;
}

export async function POST(req: NextRequest) {
  try {
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

    const [result] = await db.insert(properties).values({
      title,
      city,
      area,
      type,
      image: imagePath,
    }).$returningId();

    const propertyId = result.id;

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

    return NextResponse.json({ id: propertyId, title, city, area, type, image: imagePath }, { status: 201 });
  } catch (error: unknown) {
    console.error('Error creating property:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
