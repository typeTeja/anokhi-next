'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { CheckCircle2 } from 'lucide-react';

interface ThankYouPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ThankYouPopup({ isOpen, onClose }: ThankYouPopupProps) {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen) {
      setCountdown(10);
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            onClose();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOpen, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] text-center p-10">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary animate-bounce">
            <CheckCircle2 className="size-12" />
          </div>
          <DialogHeader className="space-y-2">
            <DialogTitle className="text-3xl font-heading font-bold text-center">Thank You!</DialogTitle>
            <DialogDescription className="text-lg text-center">
              Your inquiry has been successfully submitted. Our team will contact you shortly.
            </DialogDescription>
          </DialogHeader>
          <div className="text-sm text-muted-foreground pt-4">
            Closing in {countdown} seconds...
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
