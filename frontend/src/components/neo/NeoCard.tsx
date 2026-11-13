import React, { forwardRef } from 'react';
import { cn } from '@/shared/helpers/utils';

export type NeoCardVariant =
  | 'cream'
  | 'white'
  | 'yellow'
  | 'pink'
  | 'mint'
  | 'sky'
  | 'black';

export interface NeoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: NeoCardVariant;
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  interactive?: boolean;
  rounded?: 'none' | 'sm' | 'md';
}

const variantStyles: Record<NeoCardVariant, string> = {
  cream: 'bg-[#FFF8E7] text-[#0A0A0A] dark:bg-slate-900 dark:text-slate-100',
  white: 'bg-white text-[#0A0A0A] dark:bg-slate-900 dark:text-slate-100',
  yellow: 'bg-[#FFE14D] text-[#0A0A0A]',
  pink: 'bg-[#FF6B9D] text-[#0A0A0A]',
  mint: 'bg-[#4ADE80] text-[#0A0A0A]',
  sky: 'bg-[#60A5FA] text-[#0A0A0A]',
  black: 'bg-[#0A0A0A] text-white',
};

const shadowStyles = {
  none: 'shadow-none',
  sm: 'neo-shadow-sm',
  md: 'neo-shadow',
  lg: 'neo-shadow-lg',
};

const roundedStyles = {
  none: 'rounded-none',
  sm: 'rounded-[4px]',
  md: 'rounded-[6px]',
};

export const NeoCard = forwardRef<HTMLDivElement, NeoCardProps>(
  (
    {
      className,
      variant = 'white',
      shadow = 'md',
      interactive = false,
      rounded = 'md',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'border-[3px] border-[#0A0A0A] dark:border-slate-400 p-4 relative',
          variantStyles[variant],
          shadowStyles[shadow],
          roundedStyles[rounded],
          interactive && 'neo-press cursor-pointer',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

NeoCard.displayName = 'NeoCard';

