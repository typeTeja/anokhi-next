'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { X, Search, MapPin, Building2, LayoutGrid } from 'lucide-react';

export default function SearchFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const city = searchParams.get('city') || '';
  const area = searchParams.get('area') || '';
  const type = searchParams.get('type') || '';

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'all') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/properties?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push('/properties');
  };

  const hasFilters = city || area || type;

  return (
    <div className="w-full max-w-6xl mx-auto -mt-16 relative z-30 px-4">
      <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-[2.5rem] p-4 md:p-6 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] flex flex-col md:flex-row items-center gap-6">
        
        {/* City Filter */}
        <div className="w-full md:flex-1 space-y-2">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary ml-1">
            <MapPin className="w-3 h-3" />
            <span>Select City</span>
          </div>
          <Select value={city || 'all'} onValueChange={(v) => updateFilter('city', v)}>
            <SelectTrigger className="bg-zinc-50 dark:bg-zinc-800/50 border-none h-14 rounded-2xl transition-all focus:ring-2 focus:ring-primary/20 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-bold text-sm">
              <SelectValue placeholder="All Cities" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl border-primary/10 shadow-2xl">
              <SelectItem value="all" className="rounded-lg">All Cities</SelectItem>
              <SelectItem value="Hyderabad" className="rounded-lg">Hyderabad</SelectItem>
              <SelectItem value="Bangalore" className="rounded-lg">Bangalore</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-12 bg-zinc-200 dark:bg-zinc-800" />

        {/* Area Filter */}
        <div className="w-full md:flex-1 space-y-2">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary ml-1">
            <Building2 className="w-3 h-3" />
            <span>Select Area</span>
          </div>
          <Select value={area || 'all'} onValueChange={(v) => updateFilter('area', v)}>
            <SelectTrigger className="bg-zinc-50 dark:bg-zinc-800/50 border-none h-14 rounded-2xl transition-all focus:ring-2 focus:ring-primary/20 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-bold text-sm">
              <SelectValue placeholder="All Areas" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl border-primary/10 shadow-2xl">
              <SelectItem value="all" className="rounded-lg">All Areas</SelectItem>
              <SelectItem value="Kollur" className="rounded-lg">Kollur</SelectItem>
              <SelectItem value="Tukkuguda" className="rounded-lg">Tukkuguda</SelectItem>
              <SelectItem value="Gachibowli" className="rounded-lg">Gachibowli</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-12 bg-zinc-200 dark:bg-zinc-800" />

        {/* Type Filter */}
        <div className="w-full md:flex-1 space-y-2">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary ml-1">
            <LayoutGrid className="w-3 h-3" />
            <span>Category</span>
          </div>
          <Select value={type || 'all'} onValueChange={(v) => updateFilter('type', v)}>
            <SelectTrigger className="bg-zinc-50 dark:bg-zinc-800/50 border-none h-14 rounded-2xl transition-all focus:ring-2 focus:ring-primary/20 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-bold text-sm">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl border-primary/10 shadow-2xl">
              <SelectItem value="all" className="rounded-lg">All Categories</SelectItem>
              <SelectItem value="Flats" className="rounded-lg">Flats</SelectItem>
              <SelectItem value="Plots" className="rounded-lg">Plots</SelectItem>
              <SelectItem value="Commercial" className="rounded-lg">Commercial</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 w-full md:w-auto md:pl-4">
          {hasFilters && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={clearFilters}
              className="h-14 w-14 rounded-2xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all border border-zinc-200 dark:border-zinc-800 shrink-0"
              title="Clear Filters"
            >
              <X className="w-5 h-5" />
            </Button>
          )}
          <Button className="h-14 px-10 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-sm uppercase tracking-widest flex-grow md:flex-grow-0 gap-3 shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
            <Search className="w-5 h-5" />
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}
