import React, { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/shared/helpers/utils';

export type NeoButtonVariant =
  | 'yellow'
  | 'pink'
  | 'mint'
  | 'sky'
  | 'orange'
  | 'red'
  | 'white'
  | 'black'
  | 'cream';

export type NeoButtonSize = 'sm' | 'md' | 'lg' | 'icon' | 'icon-sm';

export interface NeoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: NeoButtonVariant;
  size?: NeoButtonSize;
  isLoading?: boolean;
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  rounded?: 'none' | 'sm' | 'md';
}

const variantStyles: Record<NeoButtonVariant, string> = {
  yellow: 'bg-[#FFE14D] text-[#0A0A0A] hover:bg-[#fed726]',
  pink: 'bg-[#FF6B9D] text-[#0A0A0A] hover:bg-[#ff558f]',
  mint: 'bg-[#4ADE80] text-[#0A0A0A] hover:bg-[#34d399]',
  sky: 'bg-[#60A5FA] text-[#0A0A0A] hover:bg-[#3b82f6]',
  orange: 'bg-[#FF8A3D] text-[#0A0A0A] hover:bg-[#ff771f]',
  red: 'bg-[#FF4D4D] text-white hover:bg-[#f83333]',
  white: 'bg-white text-[#0A0A0A] dark:bg-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700',
  black: 'bg-[#0A0A0A] text-white hover:bg-neutral-900',
  cream: 'bg-[#FFF8E7] text-[#0A0A0A] hover:bg-[#fef4d1]',
};

const sizeStyles: Record<NeoButtonSize, string> = {
  sm: 'min-h-[36px] px-3 py-1.5 text-xs font-bold',
  md: 'min-h-[44px] px-4 py-2.5 text-sm font-extrabold', // 44px mobile touch target
  lg: 'min-h-[52px] px-6 py-3.5 text-base font-extrabold',
  icon: 'h-11 w-11 p-0 flex items-center justify-center',
  'icon-sm': 'h-9 w-9 p-0 flex items-center justify-center',
};

const shadowStyles = {
  none: 'shadow-none',
  sm: 'neo-shadow-sm neo-press-sm',
  md: 'neo-shadow neo-press',
  lg: 'neo-shadow-lg neo-press',
};

const roundedStyles = {
  none: 'rounded-none',
  sm: 'rounded-[4px]',
  md: 'rounded-[6px]',
};

export const NeoButton = forwardRef<HTMLButtonElement, NeoButtonProps>(
  (
    {
      className,
      variant = 'yellow',
      size = 'md',
      isLoading = false,
      shadow = 'md',
      fullWidth = false,
      rounded = 'md',
      disabled,
      children,
      type = 'button',
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center gap-2 uppercase tracking-wide cursor-pointer select-none font-display',
          'border-[3px] border-[#0A0A0A] dark:border-slate-400',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFE14D] focus-visible:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
          variantStyles[variant],
          sizeStyles[size],
          shadowStyles[shadow],
          roundedStyles[rounded],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-current" />
            <span>Loading...</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

NeoButton.displayName = 'NeoButton';

