import { cn } from '@/utils/styling';
import { IconProps } from './types';

export function IconArrow({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
      className={cn('inline-block align-middle', className)}
    >
      <path
        strokeWidth="1.5"
        d="M4.5 2.8125h10.125v10.125M14.625 2.8125 2.8125 14.625"
      />
    </svg>
  );
}
