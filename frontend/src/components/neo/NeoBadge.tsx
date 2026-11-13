import React from 'react';
import { cn } from '@/shared/helpers/utils';

export type NeoBadgeVariant =
  | 'yellow'
  | 'pink'
  | 'mint'
  | 'sky'
  | 'orange'
  | 'red'
  | 'black'
  | 'white'
  | 'cream';

export type NeoBadgeRotation =
  | 'flat'
  | 'rotate-left'
  | 'rotate-right'
  | 'rotate-hard-left'
  | 'rotate-hard-right';

export interface NeoBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: NeoBadgeVariant;
  rotate?: NeoBadgeRotation;
  size?: 'sm' | 'md' | 'lg';
  shadow?: boolean;
}

const variantStyles: Record<NeoBadgeVariant, string> = {
  yellow: 'bg-[#FFE14D] text-[#0A0A0A]',
  pink: 'bg-[#FF6B9D] text-[#0A0A0A]',
  mint: 'bg-[#4ADE80] text-[#0A0A0A]',
  sky: 'bg-[#60A5FA] text-[#0A0A0A]',
  orange: 'bg-[#FF8A3D] text-[#0A0A0A]',
  red: 'bg-[#FF4D4D] text-white',
  black: 'bg-[#0A0A0A] text-white',
  white: 'bg-white text-[#0A0A0A]',
  cream: 'bg-[#FFF8E7] text-[#0A0A0A]',
};

const rotationStyles: Record<NeoBadgeRotation, string> = {
  flat: 'rotate-0',
  'rotate-left': '-rotate-2',
  'rotate-right': 'rotate-2',
  'rotate-hard-left': '-rotate-6',
  'rotate-hard-right': 'rotate-6',
};

const sizeStyles = {
  sm: 'px-2 py-0.5 text-[10px] font-bold border-2',
  md: 'px-2.5 py-1 text-xs font-extrabold border-[2.5px]',
  lg: 'px-3 py-1.5 text-sm font-black border-[3px]',
};

export const NeoBadge: React.FC<NeoBadgeProps> = ({
  className,
  variant = 'yellow',
  rotate = 'flat',
  size = 'md',
  shadow = true,
  children,
  ...props
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 uppercase font-display border-[#0A0A0A] dark:border-slate-300 rounded-[4px] select-none tracking-wider transition-transform',
        variantStyles[variant],
        rotationStyles[rotate],
        sizeStyles[size],
        shadow && 'shadow-[2px_2px_0px_0px_#0A0A0A] dark:shadow-[2px_2px_0px_0px_#000]',
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

