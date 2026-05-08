import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

interface Highlight {
  label: string;
  value: string;
}

interface PropertyDetailsProps {
  property: {
    title: string;
    city: string;
    highlights: Highlight[];
  };
}

export default function PropertyDetails({ property }: PropertyDetailsProps) {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight">
          {property.title}
        </h1>
        <div className="flex items-center gap-2 text-muted-foreground text-lg">
          <MapPin className="w-5 h-5 text-primary" />
          <span>{property.city}</span>
        </div>
      </div>

      <Card className="border-primary/10 shadow-lg overflow-hidden bg-card/50 backdrop-blur-md">
        <CardHeader className="bg-primary/5 border-b border-primary/10">
          <CardTitle className="text-2xl font-heading flex items-center gap-3">
            <span className="w-2 h-8 bg-primary rounded-full"></span>
            Property Highlights
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-primary/5">
            {property.highlights.length > 0 ? (
              property.highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6 hover:bg-primary/5 transition-colors group"
                >
                  <span className="text-muted-foreground font-medium group-hover:text-foreground transition-colors">
                    {highlight.label}
                  </span>
                  <span className="text-lg font-semibold text-foreground sm:text-right">
                    {highlight.value}
                  </span>
                </div>
              ))
            ) : (
              <div className="p-12 text-center text-muted-foreground">
                No highlights available for this property.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
