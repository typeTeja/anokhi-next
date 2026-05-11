'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
  X,
  Search,
  MapPin,
  Building2,
  LayoutGrid,
} from 'lucide-react';

export default function SearchFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const city = searchParams.get('city') || '';
  const area = searchParams.get('area') || '';
  const type = searchParams.get('type') || '';
  const searchParam = searchParams.get('search') || '';

  const [searchValue, setSearchValue] = useState(searchParam);

  useEffect(() => {
    setSearchValue(searchParam);
  }, [searchParam]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchValue === searchParam) return;

      const params = new URLSearchParams(searchParams.toString());
      if (searchValue.trim()) {
        params.set('search', searchValue);
      } else {
        params.delete('search');
      }

      router.push(`/properties?${params.toString()}`);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchValue, searchParam, searchParams, router]);

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
    setSearchValue('');
    router.push('/properties');
  };

  const hasFilters = city || area || type || searchParam;

  return (
    <div className="w-full max-w-6xl mx-auto -mt-16 relative z-30 px-4">
      <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-[2.5rem] p-4 md:p-6 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] flex flex-col lg:flex-row items-stretch lg:items-end gap-6">

        {/* Filters */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* City */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary ml-1">
              <MapPin className="w-5 h-5" />
              <span>Select City</span>
            </div>

            <Select
              value={city || 'all'}
              onValueChange={(v) => updateFilter('city', v)}
            >
              <SelectTrigger className="bg-zinc-50 dark:bg-zinc-800/50 border-primary h-14 rounded-2xl font-bold text-sm p-4 ">
                <SelectValue placeholder="All Cities" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                <SelectItem value="Bangalore">Bangalore</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Area */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary ml-1">
              <Building2 className="w-5 h-5" />
              <span>Select Area</span>
            </div>

            <Select
              value={area || 'all'}
              onValueChange={(v) => updateFilter('area', v)}
            >
              <SelectTrigger className="bg-zinc-50 dark:bg-zinc-800/50 border-primary h-14 rounded-2xl font-bold text-sm p-4 ">
                <SelectValue placeholder="All Areas" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All Areas</SelectItem>
                <SelectItem value="Kollur">Kollur</SelectItem>
                <SelectItem value="Tukkuguda">Tukkuguda</SelectItem>
                <SelectItem value="Gachibowli">Gachibowli</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Type */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary ml-1">
              <LayoutGrid className="w-5 h-5" />
              <span>Category</span>
            </div>

            <Select
              value={type || 'all'}
              onValueChange={(v) => updateFilter('type', v)}
            >
              <SelectTrigger className="bg-zinc-50 dark:bg-zinc-800/50 border-primary h-14 rounded-2xl font-bold text-sm p-4 ">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Flats">Flats</SelectItem>
                <SelectItem value="Plots">Plots</SelectItem>
                <SelectItem value="Commercial">Commercial</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Search */}
        <div className="flex gap-3 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />

            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search properties..."
              className="h-14 w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-background pl-12 pr-4 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            />
          </div>

          {hasFilters && (
            <Button
              variant="ghost"
              size="icon"
              onClick={clearFilters}
              className="h-14 w-14 rounded-2xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 border border-zinc-200 dark:border-zinc-800 shrink-0"
            >
              <X className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}