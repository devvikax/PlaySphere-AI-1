'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/shared/helpers/utils';

export interface NeoSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  headerBadge?: React.ReactNode;
  children: React.ReactNode;
  side?: 'bottom' | 'right';
  className?: string;
}

export const NeoSheet: React.FC<NeoSheetProps> = ({
  isOpen,
  onClose,
  title,
  headerBadge,
  children,
  side = 'bottom',
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
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={cn(
          'fixed z-50 flex flex-col font-display',
          'bg-[#FFF8E7] dark:bg-slate-900 text-[#0A0A0A] dark:text-slate-100',
          'border-[3px] border-[#0A0A0A] dark:border-slate-300',
          side === 'bottom'
            ? 'inset-x-0 bottom-0 max-h-[85vh] rounded-t-[12px] neo-shadow-lg md:inset-x-auto md:right-6 md:bottom-6 md:w-[440px] md:rounded-[8px]'
            : 'inset-y-0 right-0 w-full max-w-md neo-shadow-lg',
          className
        )}
      >
        {/* Mobile handle */}
        {side === 'bottom' && (
          <div className="w-full pt-2.5 pb-1 flex justify-center md:hidden">
            <div className="w-12 h-1.5 bg-[#0A0A0A] dark:bg-slate-400 rounded-full" />
          </div>
        )}

        {/* Sheet Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b-[3px] border-[#0A0A0A] dark:border-slate-300 bg-[#FF6B9D] text-[#0A0A0A]">
          <div className="flex items-center gap-2">
            {headerBadge}
            <div className="font-black text-sm uppercase tracking-wider">
              {title}
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center bg-white border-[2.5px] border-[#0A0A0A] rounded-[4px] shadow-[2px_2px_0px_#0A0A0A] hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
            aria-label="Close sheet"
          >
            <X className="w-4 h-4 text-[#0A0A0A]" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-4 overflow-y-auto flex-1">
          {children}
        </div>
      </div>
    </div>
  );
};

