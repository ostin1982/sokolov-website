import { cn } from '@/utils/styling';
import { IconProps } from './types';

export function IconChevron({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('inline-block align-middle', className)}
    >
      <path d="M3.5 7.75L12 16.25L20.5 7.75" strokeWidth="1.5" />
    </svg>
  );
}
