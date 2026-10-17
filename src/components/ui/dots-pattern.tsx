'use client';

import { cn } from '@/utils/styling';

interface DotsPatternBgProps {
  className?: string;
  dotSize?: number;
  dotGap?: number;
  color?: string;
  opacity?: number;
}

export default function DotsPattern({
  className = '',
  dotSize = 6,
  dotGap = 18,
  color = '#FFFFFF',
  opacity = 1
}: DotsPatternBgProps) {
  const patternSize = dotSize + dotGap;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${patternSize}" height="${patternSize}"><rect width="${dotSize}" height="${dotSize}" fill="${color}"/></svg>`;

  const patternStyle = {
    backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svg)}")`,
    backgroundSize: `${patternSize}px ${patternSize}px`,
    backgroundPosition: 'center',
    backgroundRepeat: 'repeat',
    opacity
  };

  return (
    <div
      className={cn(
        'absolute inset-0 w-full h-full pointer-events-none',
        className
      )}
      style={patternStyle}
      aria-hidden="true"
    />
  );
}
