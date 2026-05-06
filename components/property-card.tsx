'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Building2, CheckCircle2 } from 'lucide-react';
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

  return (
    <>
      <Card className="h-full border-primary/10 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl flex flex-col overflow-hidden bg-card hover:-translate-y-1 group">
        {/* Thumbnail */}
        <div className="relative aspect-[16/10] overflow-hidden">
          {property.image ? (
            <Image
              src={property.image}
              alt={property.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full bg-muted/30 flex items-center justify-center text-muted-foreground/20">
              <Building2 className="w-16 h-16" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground font-bold shadow-lg border-none px-3 py-1">
            {property.type}
          </Badge>
        </div>

        <CardHeader className="pb-3 space-y-2">
          <CardTitle className="text-2xl font-heading font-bold line-clamp-1 group-hover:text-primary transition-colors duration-300">
            {property.title}
          </CardTitle>
          <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
            <div className="p-1 rounded-md bg-primary/5 text-primary">
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <span>{property.area}, {property.city}</span>
          </div>
        </CardHeader>

        <CardContent className="flex-grow pt-2">
          <div className="grid grid-cols-1 gap-3">
            {property.highlights?.map((highlight, index) => (
              <div key={index} className="flex items-center justify-between text-sm py-1.5 border-b border-primary/5 last:border-0">
                <span className="text-muted-foreground flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-primary/60" />
                  {highlight.label}
                </span>
                <span className="font-bold text-foreground/90">{highlight.value}</span>
              </div>
            ))}
          </div>
        </CardContent>

        <CardFooter className="pt-6 pb-6 border-t border-primary/5 bg-gradient-to-b from-transparent to-primary/[0.03] dark:to-primary/[0.05]">
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="w-full font-bold h-12 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all rounded-xl"
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
    </>
  );
}
