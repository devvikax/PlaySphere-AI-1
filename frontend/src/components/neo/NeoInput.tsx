import React, { forwardRef } from 'react';
import { cn } from '@/shared/helpers/utils';

export interface NeoInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  mono?: boolean;
}

export const NeoInput = forwardRef<HTMLInputElement, NeoInputProps>(
  ({ className, label, error, helperText, mono = false, disabled, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5 font-display text-left">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-black uppercase tracking-wider text-[#0A0A0A] dark:text-slate-200">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          className={cn(
            'w-full min-h-[44px] px-3.5 py-2.5 text-sm font-bold',
            'bg-white dark:bg-slate-900 text-[#0A0A0A] dark:text-slate-100',
            'border-[3px] border-[#0A0A0A] dark:border-slate-400 rounded-[6px]',
            'neo-shadow-sm',
            'focus:outline-none focus:border-[#0A0A0A] focus:shadow-[4px_4px_0px_0px_#FFE14D] dark:focus:shadow-[4px_4px_0px_0px_#FFE14D]',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            mono && 'font-mono tracking-wider',
            error && 'border-[#FF4D4D] focus:shadow-[4px_4px_0px_0px_#FF4D4D]',
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-xs font-black uppercase text-[#FF4D4D] tracking-wide">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

NeoInput.displayName = 'NeoInput';

export interface NeoTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  mono?: boolean;
}

export const NeoTextarea = forwardRef<HTMLTextAreaElement, NeoTextareaProps>(
  ({ className, label, error, helperText, mono = false, disabled, id, rows = 3, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5 font-display text-left">
        {label && (
          <label htmlFor={textareaId} className="block text-xs font-black uppercase tracking-wider text-[#0A0A0A] dark:text-slate-200">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          disabled={disabled}
          rows={rows}
          className={cn(
            'w-full px-3.5 py-2.5 text-sm font-bold',
            'bg-white dark:bg-slate-900 text-[#0A0A0A] dark:text-slate-100',
            'border-[3px] border-[#0A0A0A] dark:border-slate-400 rounded-[6px]',
            'neo-shadow-sm',
            'focus:outline-none focus:border-[#0A0A0A] focus:shadow-[4px_4px_0px_0px_#FFE14D]',
            'disabled:opacity-50 disabled:cursor-not-allowed resize-y',
            mono && 'font-mono tracking-wider',
            error && 'border-[#FF4D4D] focus:shadow-[4px_4px_0px_0px_#FF4D4D]',
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-xs font-black uppercase text-[#FF4D4D] tracking-wide">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

NeoTextarea.displayName = 'NeoTextarea';

