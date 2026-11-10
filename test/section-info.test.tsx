import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { SectionInfo } from '@/app/[locale]/components/section-info';

const globalStyles = readFileSync(
  resolve(process.cwd(), 'src/assets/styles/global.css'),
  'utf8'
);

const getRuleDeclarations = (selector: RegExp) => {
  const rule = globalStyles.match(
    new RegExp(`${selector.source}\\s*\\{([^}]*)\\}`)
  );

  expect(rule, `Expected CSS rule "${selector}"`).not.toBeNull();
  return rule?.[1] ?? '';
};

describe('SectionInfo portrait effect', () => {
  it('renders the profile image inside the glitch portrait container', () => {
    const { container } = render(<SectionInfo />);
    const portrait = container.querySelector('.portrait-glitch');

    expect(portrait).not.toBeNull();
    expect(portrait?.querySelector('img')?.getAttribute('alt')).toBe(
      'Денис Соколов'
    );
    expect(portrait?.getAttribute('style')).toContain('/images-mock/photo.png');
    expect(screen.getByText('Денис Соколов')).toBeTruthy();
  });

  it('animates both glitch layers continuously before hover', () => {
    const topLayer = getRuleDeclarations(
      /\.portrait-glitch::before(?=\s*\{[^}]*animation:\s*portrait-glitch-top)/
    );
    const bottomLayer = getRuleDeclarations(
      /\.portrait-glitch::after(?=\s*\{[^}]*animation:\s*portrait-glitch-bottom)/
    );

    expect(topLayer).toMatch(/animation:\s*portrait-glitch-top\s+620ms/);
    expect(topLayer).toMatch(/infinite/);
    expect(bottomLayer).toMatch(/animation:\s*portrait-glitch-bottom\s+470ms/);
    expect(bottomLayer).toMatch(/infinite\s+reverse/);
  });

  it('stops and hides both glitch layers on portrait hover', () => {
    const hoverLayers = getRuleDeclarations(
      /\.portrait-glitch:hover::before,\s*\.portrait-glitch:hover::after/
    );
    const hoverPortrait = getRuleDeclarations(/\.portrait-glitch:hover/);

    expect(hoverLayers).toMatch(/animation:\s*none/);
    expect(hoverLayers).toMatch(/opacity:\s*0/);
    expect(hoverPortrait).toMatch(/box-shadow:\s*none/);
  });
});
