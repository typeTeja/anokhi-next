'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import LeadModal from '@/components/lead-modal'

interface PropertyLeadButtonProps {
  property: {
    id: number;
    title: string;
  };
}

export default function PropertyLeadButton({ property }: PropertyLeadButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        className="w-full"
        size="lg"
      >
        Express Interest
      </Button>
      <LeadModal 
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        property={property}
      />
    </>
  );
}
