'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/shared/helpers/utils';

export interface NeoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
}

const maxWidthStyles = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
};

export const NeoModal: React.FC<NeoModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  maxWidth = 'md',
  className,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-[2px] transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          'relative w-full z-10 font-display',
          'bg-[#FFF8E7] dark:bg-slate-900 text-[#0A0A0A] dark:text-slate-100',
          'border-[3px] border-[#0A0A0A] dark:border-slate-300 rounded-[8px]',
          'neo-shadow-lg',
          'max-h-[90vh] flex flex-col',
          maxWidthStyles[maxWidth],
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b-[3px] border-[#0A0A0A] dark:border-slate-300 bg-[#FFE14D] text-[#0A0A0A] rounded-t-[5px]">
          <div className="font-black text-lg uppercase tracking-wider flex items-center gap-2">
            {title}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center bg-white border-[2.5px] border-[#0A0A0A] rounded-[4px] shadow-[2px_2px_0px_#0A0A0A] hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-[#0A0A0A]" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {children}
        </div>

        {/* Optional Footer */}
        {footer && (
          <div className="p-4 border-t-[3px] border-[#0A0A0A] dark:border-slate-300 bg-white/50 dark:bg-slate-950/50 flex items-center justify-end gap-3 rounded-b-[5px]">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

