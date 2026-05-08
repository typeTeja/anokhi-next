import Link from "next/link"
import PropertyCard from "@/components/property-card"
import { Button } from "@/components/ui/button"
import { db } from '@/lib/db';
import { properties, propertyHighlights } from '@/lib/schema';
import { desc, eq } from 'drizzle-orm';

interface ProjectProperty {
  id: number;
  title: string;
  city: string;
  area: string | null;
  type: string | null;
  image: string | null;
  highlights: Array<{label: string, value: string}>;
  createdAt: Date | null;
}

interface Property {
  id: number;
  title: string;
  city: string;
  area: string;
  type: string;
  image: string | null;
  highlights: Array<{label: string, value: string}>;
  createdAt: Date | null;
}

async function getLatestProjects() {
  try {
    // Direct database access for static generation
    const props = await db.select()
      .from(properties)
      .orderBy(desc(properties.createdAt))
      .limit(3);

    // Fetch highlights for each property
    const allProperties = await Promise.all(
      props.map(async (prop) => {
        const highlights = await db.select({
          label: propertyHighlights.label,
          value: propertyHighlights.value,
        })
        .from(propertyHighlights)
        .where(eq(propertyHighlights.propertyId, prop.id));
        
        return { 
          ...prop, 
          area: prop.area || '', 
          type: prop.type || '',
          highlights 
        };
      })
    );

    // Transform to match PropertyCard interface
    return allProperties.map((prop): Property => ({
      id: prop.id,
      title: prop.title,
      city: prop.city,
      area: prop.area || '',
      type: prop.type || '',
      image: prop.image,
      highlights: prop.highlights,
      createdAt: prop.createdAt
    }));
  } catch (error) {
    console.error('Error fetching latest projects:', error);
    return [];
  }
}

export async function LandingProjects() {
  const latestProjects = await getLatestProjects();

  return (
    <section id="projects" className="py-20 px-4 md:px-20 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h3 className="text-primary font-semibold uppercase tracking-widest text-sm italic">Best Advice</h3>
          <h2 className="text-4xl font-heading font-bold text-gray-900 uppercase">
            Our Projects
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our latest premium real estate developments and investment opportunities
          </p>
        </div>
        
        {/* Projects Grid */}
        {latestProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {latestProjects.map((project: Property) => (
              <PropertyCard key={project.id} property={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No projects available at the moment.</p>
          </div>
        )}
        
        {/* View All Button */}
        <div className="flex justify-center pt-8">
          <Link href="/properties">
            <Button className="bg-primary hover:bg-primary/90 text-accent px-10 py-6 rounded-2xl text-lg font-medium transition-all shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95">
              View All Projects
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
