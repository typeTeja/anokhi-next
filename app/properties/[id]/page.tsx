import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MapPin, CheckCircle2, ArrowLeft } from 'lucide-react';
import { LandingHeader } from '@/components/landing/header'
import { LandingFooter } from '@/components/landing/footer'
import PropertyLeadButton from '@/components/property-lead-button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { db } from '@/lib/db';
import { properties, propertyHighlights } from '@/lib/schema';
import { eq } from 'drizzle-orm';

interface Property {
  id: number;
  title: string;
  city: string;
  area: string;
  type: string;
  image: string | null;
  highlights: Array<{label: string, value: string}>;
}

async function getProperty(id: string): Promise<Property | null> {
  try {
    // Direct database access for static generation
    const [property, highlights] = await Promise.all([
      db.select().from(properties).where(eq(properties.id, parseInt(id))).limit(1),
      db.select({
        label: propertyHighlights.label,
        value: propertyHighlights.value,
      })
      .from(propertyHighlights)
      .where(eq(propertyHighlights.propertyId, parseInt(id)))
    ]);

    if (!property.length) return null;

    return {
      ...property[0],
      area: property[0].area || '',
      type: property[0].type || '',
      highlights,
      image: property[0].image
    };
  } catch (error) {
    console.error('Error fetching property:', error);
    return null;
  }
}

export const revalidate = 3600; // Revalidate every hour

export async function generateStaticParams() {
  try {
    // Direct database access for static generation
    const allProperties = await db.select({ id: properties.id }).from(properties);
    
    return allProperties.map((property) => ({
      id: property.id.toString(),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = await getProperty(id);
  
  if (!property) {
    return {
      title: 'Property Not Found | Anokhi Homes',
    };
  }

  return {
    title: `${property.title} | Anokhi Homes`,
    description: `Explore ${property.title} in ${property.area}, ${property.city}. Premium ${property.type} by Anokhi Homes.`,
  };
}

export default async function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = await getProperty(id);

  if (!property) {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateListing",
            "@id": `https://anokhihomes.com/properties/${property.id}`,
            "name": property.title,
            "url": `https://anokhihomes.com/properties/${property.id}`,
            "image": property.image || "https://anokhihomes.com/home-page/logo.png",
            "description": `${property.type} for sale in ${property.area}, ${property.city}. Exclusive property by Anokhi Homes.`,
            "itemOffered": {
              "@type": "Accommodation",
              "name": property.title,
              "address": {
                "@type": "PostalAddress",
                "addressLocality": property.city,
                "addressRegion": property.area,
                "addressCountry": "IN"
              },
              "category": property.type
            }
          })
        }}
      />
      
      <div className="flex flex-col min-h-screen">
        <LandingHeader />
        
        <main className="flex-grow">
          {/* Back Navigation */}
          <div className="container mx-auto px-4 py-6">
            <Link href="/properties">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Projects
              </Button>
            </Link>
          </div>

          {/* Property Hero */}
          <section className="relative min-h-[60vh] flex items-center">
            {property.image ? (
              <div className="absolute inset-0 z-0">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              </div>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5" />
            )}
            
            <div className="relative z-10 container mx-auto px-4 py-20">
              <div className="max-w-4xl">
                <Badge className="mb-4 bg-primary/90 text-accent">
                  {property.type}
                </Badge>
                <h1 className="text-4xl md:text-6xl font-heading font-black text-white mb-6">
                  {property.title}
                </h1>
                <div className="flex items-center gap-2 text-white/90 text-lg">
                  <MapPin className="w-5 h-5" />
                  <span>{property.area}, {property.city}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Property Details */}
          <section className="py-20 px-4">
            <div className="container mx-auto max-w-6xl">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl font-heading">Property Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-muted-foreground mb-2">Property Type</h4>
                          <p className="text-lg">{property.type}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-muted-foreground mb-2">Location</h4>
                          <p className="text-lg">{property.area}, {property.city}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {property.highlights && property.highlights.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-2xl font-heading">Key Highlights</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {property.highlights.map((highlight, index) => (
                            <div key={index} className="flex items-center justify-between p-4 border border-primary/10 rounded-xl">
                              <div className="flex items-center gap-3">
                                <CheckCircle2 className="w-5 h-5 text-primary" />
                                <span className="font-medium">{highlight.label}</span>
                              </div>
                              <span className="font-bold text-primary">{highlight.value}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  <Card className="sticky top-6">
                    <CardHeader>
                      <CardTitle>Interested in this property?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <PropertyLeadButtonWrapper property={property} />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>
        </main>
        
        <LandingFooter />
      </div>
    </>
  );
}

function PropertyLeadButtonWrapper({ property }: { property: Property }) {
  return (
    <PropertyLeadButton property={{ id: property.id, title: property.title }} />
  );
}
