"use client"

import PropertyForm from '@/components/property-form';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function EditPropertyDashboardPage() {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Link href="/dashboard/properties" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-2 transition-colors">
            <ChevronLeft className="size-4 mr-1" /> Back to Properties
          </Link>
          <h1 className="text-3xl font-heading font-bold text-foreground">Edit Property</h1>
          <p className="text-muted-foreground">Update the property details in the system.</p>
        </div>
      </div>

      <div className="max-w-4xl">
        <PropertyForm />
      </div>
    </div>
  );
}
