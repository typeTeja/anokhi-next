'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Building2, CheckCircle2, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import LeadModal from './lead-modal';

interface Highlight {
  label: string;
  value: string;
}

interface Property {
  id: number;
  title: string;
  city: string;
  area: string;
  type: string;
  image: string | null;
  highlights: Highlight[];
}

export default function PropertyCard({ property }: { property: Property }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Structured Data for SEO
  const jsonLd = {
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
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <Card className="h-[750px] border-primary/10 hover:border-primary/30 transition-all duration-700 hover:shadow-[0_32px_64px_-16px_rgba(var(--primary-rgb),0.15)] flex flex-col overflow-hidden bg-card hover:-translate-y-2 group relative">
        {/* Thumbnail Section */}
        <div className="relative h-68 overflow-hidden shrink-0">
          {property.image ? (
            <Image
              src={property.image}
              alt={property.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-muted/20 flex items-center justify-center text-muted-foreground/10">
              <Building2 className="w-20 h-20" />
            </div>
          )}
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
          
          {/* Status Badge */}
          <Badge className="absolute top-5 left-5 bg-primary/90 backdrop-blur-md text-accent font-black tracking-widest uppercase text-[10px] shadow-2xl border-none px-4 py-1.5 rounded-full">
            {property.type}
          </Badge>
        </div>

        {/* Content Section */}
        <div className="flex flex-col p-6 space-y-6 flex-grow overflow-hidden">
          <CardHeader className="p-0 space-y-2 shrink-0">
            <CardTitle className="text-2xl md:text-3xl font-heading font-black tracking-tight line-clamp-1 group-hover:text-primary transition-colors duration-500">
              {property.title}
            </CardTitle>
            <p className="text-muted-foreground text-sm font-medium flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-primary/60" />
              {property.area}, <span className="text-primary/70">{property.city}</span>
            </p>
          </CardHeader>

          {/* Highlights Section */}
          <div className="flex-grow flex flex-col space-y-2 min-h-0">
            <div className="flex items-center justify-between shrink-0">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/80">Key Highlights</span>
              {property.highlights && property.highlights.length > 4 && (
                <span className="text-[10px] font-bold text-primary/60 bg-primary/5 px-2 py-0.5 rounded-full border border-primary/5">
                  +{property.highlights.length - 4} More
                </span>
              )}
            </div>
            
            <div className="flex-grow overflow-hidden relative group/scroll">
              <div className="h-[180px] overflow-y-auto pr-1 custom-scrollbar scroll-smooth">
                <div className="grid grid-cols-1 gap-1.5 pb-12">
                  {property.highlights && property.highlights.length > 0 ? (
                    property.highlights.map((highlight, index) => (
                      <div 
                        key={index} 
                        className="flex items-center justify-between text-[14px] py-2 px-3 rounded-xl bg-primary/[0.01] hover:bg-primary/[0.08] transition-all"
                      >
                        <span className="text-muted-foreground flex items-center gap-2 font-medium uppercase tracking-tight">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary/60" />
                          {highlight.label}
                        </span>
                        <span className="font-bold text-foreground/80">{highlight.value}</span>
                      </div>
                    ))
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-muted-foreground/30 italic text-[11px] py-8">
                      No highlights available
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Section */}
        <CardFooter className=" shrink-0 mt-auto flex items-center">
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="w-full font-black h-16 bg-primary hover:bg-primary/90 text-accent shadow-2xl shadow-primary/20 hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all rounded-[1.5rem] text-xs uppercase tracking-[0.2em] gap-3"
          >
            Express Interest
          </Button>
        </CardFooter>
      </Card>

      <LeadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        property={{ id: property.id, title: property.title }} 
      />

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: transparent;
          border-radius: 10px;
        }
        .group\/scroll:hover .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(var(--primary-rgb), 0.2);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(var(--primary-rgb), 0.4) !important;
        }
      `}</style>
    </>
  );
}
