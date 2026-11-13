'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '@/shared/helpers/utils';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastItem {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
}

interface ToastContextType {
  toast: (item: Omit<ToastItem, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const typeStyles: Record<ToastType, { bg: string; icon: React.ReactNode }> = {
  success: {
    bg: 'bg-[#4ADE80] text-[#0A0A0A]',
    icon: <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-[#0A0A0A]" />,
  },
  error: {
    bg: 'bg-[#FF4D4D] text-white',
    icon: <AlertCircle className="w-5 h-5 flex-shrink-0 text-white" />,
  },
  warning: {
    bg: 'bg-[#FFE14D] text-[#0A0A0A]',
    icon: <AlertTriangle className="w-5 h-5 flex-shrink-0 text-[#0A0A0A]" />,
  },
  info: {
    bg: 'bg-[#60A5FA] text-[#0A0A0A]',
    icon: <Info className="w-5 h-5 flex-shrink-0 text-[#0A0A0A]" />,
  },
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    ({ type, title, message, duration = 4000 }: Omit<ToastItem, 'id'>) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast: ToastItem = { id, type, title, message, duration };
      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ toast, removeToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none p-2 sm:p-0">
        {toasts.map((t) => (
          <div
            key={t.id}
            role="alert"
            className={cn(
              'pointer-events-auto flex items-start gap-3 p-3.5 rounded-[6px]',
              'border-[3px] border-[#0A0A0A] dark:border-slate-300',
              'neo-shadow font-display',
              typeStyles[t.type].bg
            )}
          >
            {typeStyles[t.type].icon}
            <div className="flex-1 text-left">
              {t.title && (
                <div className="font-black text-xs uppercase tracking-wider mb-0.5">
                  {t.title}
                </div>
              )}
              <div className="text-xs font-bold leading-relaxed">{t.message}</div>
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className="p-1 -mr-1 -mt-1 hover:opacity-75 cursor-pointer"
              aria-label="Dismiss toast"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export function useNeoToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useNeoToast must be used within a ToastProvider');
  }
  return context;
}

