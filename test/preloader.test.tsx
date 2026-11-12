import { act, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import Preloader from '@/components/ui/preloader';

const readyStateDescriptor = Object.getOwnPropertyDescriptor(
  document,
  'readyState'
);

afterEach(() => {
  vi.useRealTimers();
  if (readyStateDescriptor) {
    Object.defineProperty(document, 'readyState', readyStateDescriptor);
  } else {
    Reflect.deleteProperty(document, 'readyState');
  }
});

describe('Preloader', () => {
  it('shows progress in 5% steps until the page loads, then reaches 100% and hides', () => {
    vi.useFakeTimers();
    Object.defineProperty(document, 'readyState', {
      configurable: true,
      value: 'loading'
    });

    render(<Preloader />);

    const progressbar = screen.getByRole('progressbar', {
      name: 'Загрузка сайта'
    });
    expect(progressbar.getAttribute('aria-valuenow')).toBe('0');

    act(() => {
      vi.advanceTimersByTime(30);
    });
    expect(progressbar.getAttribute('aria-valuenow')).toBe('5');

    act(() => {
      vi.advanceTimersByTime(510);
    });
    expect(progressbar.getAttribute('aria-valuenow')).toBe('90');

    act(() => {
      window.dispatchEvent(new Event('load'));
      vi.advanceTimersByTime(30);
    });
    expect(progressbar.getAttribute('aria-valuenow')).toBe('95');

    act(() => {
      vi.advanceTimersByTime(30);
    });
    expect(progressbar.getAttribute('aria-valuenow')).toBe('100');
    expect(screen.getByText('100 %')).not.toBeNull();

    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(screen.queryByRole('progressbar')).toBeNull();
  });
});
