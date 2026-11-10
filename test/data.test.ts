import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

import { about } from 'app/data/about';
import { experience } from 'app/data/experience';
import { header } from 'app/data/header';
import { info } from 'app/data/info';
import { main } from 'app/data/main';
import { projects } from 'app/data/projects';
import { skills } from 'app/data/skills';

const sectionIds = [about.id, projects.id, skills.id, experience.id, info.id];

function expectNonEmptyString(
  value: string | null | undefined
): asserts value is string {
  expect(typeof value).toBe('string');
  if (typeof value === 'string') expect(value.trim()).not.toBe('');
}

const expectValidUrl = (value: string | null | undefined) => {
  expectNonEmptyString(value);
  expect(() => new URL(value)).not.toThrow();
};

const expectPublicImage = (src: string, alt: string) => {
  expectNonEmptyString(alt);
  expect(src.startsWith('/')).toBe(true);
  expect(existsSync(resolve(process.cwd(), 'public', src.slice(1)))).toBe(true);
};

describe('data exports', () => {
  it('provides headings and unique IDs for all content sections', () => {
    expectNonEmptyString(main.heading);
    expectNonEmptyString(about.heading);
    expectNonEmptyString(projects.heading);
    expectNonEmptyString(skills.heading);
    expectNonEmptyString(experience.heading);
    expectNonEmptyString(info.heading);

    expect(new Set(sectionIds).size).toBe(sectionIds.length);
    sectionIds.forEach(expectNonEmptyString);
  });

  it('keeps navigation links connected to existing section IDs', () => {
    const navigationLinks = [...header, ...main.links];

    navigationLinks.forEach(({ href }) => {
      if (href.startsWith('#')) {
        expect(sectionIds).toContain(href.slice(1));
      } else {
        expectValidUrl(href);
      }
    });

    header.forEach(({ title }) => expectNonEmptyString(title));
    main.links.forEach(({ title }) => expectNonEmptyString(title));
  });

  it('contains complete project details and references existing public images', () => {
    expect(projects.information.length).toBeGreaterThan(0);

    projects.information.forEach(({ title, images, stacks, link }) => {
      expectNonEmptyString(title);
      expectPublicImage(images.src, images.alt);
      expect(stacks.length).toBeGreaterThan(0);
      stacks.forEach(({ stack }) => expectNonEmptyString(stack));
      expectValidUrl(link);
    });
  });

  it('contains usable experience and skill entries', () => {
    expect(experience.information.length).toBeGreaterThan(0);
    experience.information.forEach(({ time, company, position, stacks }) => {
      expectNonEmptyString(time);
      expectNonEmptyString(company);
      expectNonEmptyString(position);
      expect(stacks.length).toBeGreaterThan(0);
      stacks.forEach(({ stack }) => expectNonEmptyString(stack));
    });

    expect(skills.information.length).toBeGreaterThan(0);
    skills.information.forEach(({ title, description, stacks }) => {
      expectNonEmptyString(title);
      expectNonEmptyString(description);
      expect(stacks.length).toBeGreaterThan(0);
      stacks.forEach(({ stack }) => expectNonEmptyString(stack));
    });
  });

  it('contains valid profile and contact details', () => {
    expectNonEmptyString(info.name);
    expectNonEmptyString(info.position);
    expectNonEmptyString(info.offers);
    expectPublicImage(info.image.src, info.image.alt);

    info.information.forEach(({ title }) => expectNonEmptyString(title));
    info.contacts.forEach(({ title, href, text }) => {
      expectNonEmptyString(title);
      if (href) expectValidUrl(href);
      if (text) expectNonEmptyString(text);
    });
  });

  it('contains a non-empty about description', () => {
    expectNonEmptyString(about.description);
  });
});
