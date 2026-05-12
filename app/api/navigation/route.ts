import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { properties } from '@/lib/schema';
import { eq, isNotNull, and } from 'drizzle-orm';

export async function GET() {
  try {
    // Fetch unique cities
    const citiesResult = await db.selectDistinct({ city: properties.city })
      .from(properties)
      .where(isNotNull(properties.city));
    
    const locations: Record<string, string[]> = {};
    
    for (const { city } of citiesResult) {
      if (!city) continue;
      // Fetch unique areas for each city
      const areasResult = await db.selectDistinct({ area: properties.area })
        .from(properties)
        .where(
          and(
            eq(properties.city, city),
            isNotNull(properties.area)
          )
        );
      locations[city] = areasResult.map((a) => a.area).filter((area): area is string => area !== null);
    }

    return NextResponse.json({
      locations,
      services: ['Flats', 'Plots']
    });
  } catch (error: unknown) {
    console.error('Error fetching navigation:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
