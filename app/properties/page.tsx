import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import PropertyCard from '@/components/property-card';
import SearchFilters from '@/components/search-filters';
import { Building2, ChevronLeft, ChevronRight } from 'lucide-react';
import { LandingHeader } from '@/components/landing/header';
import { LandingFooter } from '@/components/landing/footer';
import { db } from '@/lib/db';
import { properties as propertiesSchema } from '@/lib/schema';

interface Property {
  id: number;
  title: string;
  city: string;
  area: string;
  type: string;
  image: string | null;
  highlights: Array<{ label: string, value: string }>;
}

interface PaginationData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

async function getProperties(searchParams: Record<string, string>): Promise<{ properties: Property[], pagination: PaginationData }> {
  try {
    const query = new URLSearchParams(searchParams).toString();
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/properties?${query}`, {
      // Disable cache for debugging and to ensure we get new format
      cache: 'no-store'
    });

    if (!res.ok) {
      return {
        properties: [],
        pagination: { total: 0, page: 1, limit: 9, totalPages: 0 }
      };
    }

    const data = await res.json();

    // Handle case where data might be an array (old API format)
    if (Array.isArray(data)) {
      return {
        properties: data,
        pagination: { total: data.length, page: 1, limit: 10, totalPages: 1 }
      };
    }

    return {
      properties: data.properties || [],
      pagination: data.pagination || { total: 0, page: 1, limit: 10, totalPages: 0 }
    };
  } catch (error) {
    console.error('getProperties error:', error);
    return {
      properties: [],
      pagination: { total: 0, page: 1, limit: 10, totalPages: 0 }
    };
  }
}

async function getFiltersData() {
  const allProps = await db.select({
    city: propertiesSchema.city,
    area: propertiesSchema.area,
    type: propertiesSchema.type,
  }).from(propertiesSchema);

  return allProps;
}

export const revalidate = 3600; // Revalidate every hour

export default async function Home({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  const params = await searchParams;
  const { properties, pagination } = await getProperties(params);
  const filterData = await getFiltersData();

  const createPageURL = (pageNumber: number | string) => {
    const newParams = new URLSearchParams(params);
    newParams.set('page', pageNumber.toString());
    return `/properties?${newParams.toString()}`;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <LandingHeader />
      <main className="flex-grow bg-background">
        {/* Hero Section */}
        <section className="relative min-h-[50vh] flex justify-start pt-8 pb-32 px-4 overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/our-vision/projects-hero.jpg"
              alt="Projects Hero"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20 " />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
          </div>

          <div className="max-w-6xl mx-auto relative z-10 w-full ">
            <div className="flex flex-col items-center text-center space-y-10 ">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 border border-white/10 backdrop-blur-md text-sm font-bold text-white animate-in fade-in slide-in-from-top-4 duration-700">

                <span>Anokhi&apos;s Premium Real Estate Projects</span>
              </div>

              <div className="space-y-4 max-w-4xl">
                <h1 className="text-4xl sm:text-5xl md:text-5xl font-heading font-black tracking-tight leading-[1.1] text-white">
                  Your Journey to a <br className="hidden sm:block" />
                  <span className="text-transparent bg-clip-text bg-primary">Perfect Home</span> Begins Here
                </h1>
              </div>
            </div>
          </div>
        </section>

        {/* Search & Filters Container */}
        <section className="px-4 ">
          <SearchFilters
            allProperties={filterData}
          />
        </section>

        {/* Listings Section */}
        <section className="py-20 px-4 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-primary font-bold tracking-widest uppercase text-xs">
                <div className="h-px w-8 bg-primary" />
                Available Projects
              </div>
              <h2 className="text-4xl md:text-4xl font-heading font-black text-foreground">Featured Collections</h2>
              <p className="text-muted-foreground text-md">Handpicked properties for your next big investment.</p>
            </div>
            <div className="px-6 py-2 rounded-2xl bg-primary/5 border border-primary/10 text-primary font-bold flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              {pagination.total} Results
            </div>
          </div>

          {properties.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
                {properties.map((property: Property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>

              {/* Pagination UI */}
              {pagination.totalPages > 1 && (
                <div className="mt-12 sm:mt-20 flex flex-col items-center gap-6">
                  <div className="flex items-center gap-2 sm:gap-4">
                    <Button
                      variant="outline"
                      className="rounded-xl border-primary/10 h-10 sm:h-12 px-3 sm:px-8 font-bold hover:bg-primary hover:text-primary-foreground disabled:opacity-30 transition-all flex items-center gap-2"
                      disabled={pagination.page <= 1}
                      asChild={pagination.page > 1}
                    >
                      {pagination.page > 1 ? (
                        <Link href={createPageURL(pagination.page - 1)}>
                          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                          <span className="hidden sm:inline">Previous</span>
                        </Link>
                      ) : (
                        <div className="flex items-center gap-2">
                          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                          <span className="hidden sm:inline">Previous</span>
                        </div>
                      )}
                    </Button>

                    <div className="px-3 sm:px-6 py-2 rounded-xl bg-primary/5 border border-primary/10 text-xs sm:text-sm font-medium">
                      <span className="sm:hidden">{pagination.page} / {pagination.totalPages}</span>
                      <span className="hidden sm:inline">Page <span className="text-foreground font-bold">{pagination.page}</span> of <span className="text-foreground font-bold">{pagination.totalPages}</span></span>
                    </div>

                    <Button
                      variant="outline"
                      className="rounded-xl border-primary/10 h-10 sm:h-12 px-3 sm:px-8 font-bold hover:bg-primary hover:text-primary-foreground disabled:opacity-30 transition-all flex items-center gap-2"
                      disabled={pagination.page >= pagination.totalPages}
                      asChild={pagination.page < pagination.totalPages}
                    >
                      {pagination.page < pagination.totalPages ? (
                        <Link href={createPageURL(pagination.page + 1)}>
                          <span className="hidden sm:inline">Next</span>
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </Link>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="hidden sm:inline">Next</span>
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="bg-card border border-primary/10 rounded-[3rem] p-24 text-center space-y-10 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent opacity-50" />
              <div className="relative z-10 flex flex-col items-center">
                <div className="inline-flex bg-primary/5 p-10 rounded-full ring-1 ring-primary/10 mb-6 group-hover:scale-110 transition-transform duration-500">
                  <Building2 className="w-20 h-20 text-primary/30" />
                </div>
                <div className="space-y-4 max-w-md mx-auto">
                  <h3 className="text-3xl font-heading font-black text-foreground">No projects matching your criteria</h3>
                  <p className="text-muted-foreground text-lg">We couldn&apos;t find any properties matching your current filters. Try broadening your search.</p>
                </div>
                <Button variant="outline" className="mt-8 border-primary/20 h-14 px-10 rounded-2xl hover:bg-primary hover:text-primary-foreground transition-all font-bold text-lg" asChild>
                  <Link href="/properties">Reset All Filters</Link>
                </Button>
              </div>
            </div>
          )}
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}

