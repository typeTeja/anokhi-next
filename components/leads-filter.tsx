'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function LeadsFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentType = searchParams.get('type') || 'project';

  const handleTypeChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('type', value);
    router.push(`/dashboard/leads?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground">Filter by:</span>
      <Select value={currentType} onValueChange={handleTypeChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="project">Project Leads</SelectItem>
          <SelectItem value="contact">Contact Leads</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
