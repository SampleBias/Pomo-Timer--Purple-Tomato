import React from 'react';
import { cn } from '@/lib/utils';
interface TomatoIconProps extends React.SVGProps<SVGSVGElement> {
  isFilled?: boolean;
}
export function TomatoIcon({ isFilled = false, className, ...props }: TomatoIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        'transition-all duration-300',
        isFilled
          ? 'text-accent-primary fill-accent-primary/20'
          : 'text-muted-foreground/50',
        className
      )}
      {...props}
    >
      <path d="M13.4 2.6c-1.9.2-3.5 1.6-4.2 3.4" />
      <path d="M10 6.8c-2 .5-3.7 2-4.5 4.2" />
      <path d="M5 11.8c-1.2 2.5-1.2 5.5.2 8.2" />
      <path d="M12 21.8c2.5 0 4.8-1.2 6.2-3.2" />
      <path d="M18.2 18.6c1.6-2.3 2.2-5.2 1.5-8.1" />
      <path d="M19.8 10.5c-.2-2-1.2-3.8-2.8-5.2" />
      <path d="M17 5.2c-1.8-1.3-4-2-6.4-2-3 0-5.8 1.3-7.6 3.5" />
    </svg>
  );
}