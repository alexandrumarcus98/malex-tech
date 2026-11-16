/** Accent colours from the palette, cycled by list position (no content-schema change needed). */
export const ACCENTS = ['vermilion', 'sage', 'ochre'] as const;

export const accentVar = (index: number) => `var(--${ACCENTS[index % ACCENTS.length]})`;

export const pad2 = (n: number) => String(n).padStart(2, '0');

export const isoDate = (d: Date) => d.toISOString().slice(0, 10);

export const readingMinutes = (body = '') =>
  Math.max(1, Math.round(body.trim().split(/\s+/).filter(Boolean).length / 220));
