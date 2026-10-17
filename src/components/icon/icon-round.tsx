import { cn } from '@/utils/styling';
import { IconProps } from './types';

export function IconRound({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 25 25"
      className={cn('inline-block align-middle', className)}
    >
      <circle
        cx="13"
        cy="12.625"
        r="8"
        stroke="#00de5f"
        strokeWidth="2"
        opacity=".4"
      />
      <circle cx="13" cy="12.625" r="4" fill="#00de5f" />
    </svg>
  );
}
