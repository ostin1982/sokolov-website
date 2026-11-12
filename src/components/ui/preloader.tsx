'use client';

import { useEffect, useState } from 'react';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let intervalId: number | undefined;
    let hideTimeoutId: number | undefined;
    let currentProgress = 0;
    let isLoaded = document.readyState === 'complete';

    setIsVisible(true);

    const advanceProgress = () => {
      if (!isLoaded && currentProgress >= 90) {
        return;
      }

      currentProgress = Math.min(currentProgress + 5, isLoaded ? 100 : 90);
      setProgress(currentProgress);

      if (currentProgress === 100) {
        if (intervalId !== undefined) {
          window.clearInterval(intervalId);
        }

        hideTimeoutId = window.setTimeout(() => setIsVisible(false), 300);
      }
    };

    intervalId = window.setInterval(advanceProgress, 30);
    const handleLoad = () => {
      isLoaded = true;
    };
    window.addEventListener('load', handleLoad, { once: true });

    return () => {
      if (intervalId !== undefined) {
        window.clearInterval(intervalId);
      }
      if (hideTimeoutId !== undefined) {
        window.clearTimeout(hideTimeoutId);
      }
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  const percentage = Math.round(progress);

  return (
    <div
      role="progressbar"
      aria-label="Загрузка сайта"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percentage}
      className="pointer-events-none fixed inset-x-0 top-0 z-100 h-svh w-full overflow-hidden bg-black transition-opacity duration-300 motion-reduce:transition-none"
    >
      <div className="flex w-75 flex-col items-center justify-center gap-6 bg-inherit mx-auto h-full md:w-100">
        <span className="bg-black px-1 text-[1.75rem] leading-3 text-white">
          {percentage} %
        </span>
        <div className="h-1 w-full bg-white-20">
          <div
            className="h-full bg-green transition-[width] duration-150 ease-out motion-reduce:transition-none"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
