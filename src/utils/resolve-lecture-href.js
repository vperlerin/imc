// src/utils/lectures/resolve-lecture-href.js

// Grab all supported lecture files from src/assets/lectures (no subdirs; set 3rd arg true if you have subfolders)
const ctx = require.context('@/assets/lectures', false, /\.(pdf|pptx?|docx?|zip|xlsx?)$/i);

const normalizeKey = (s) =>
  String(s || '')
    .toLowerCase()
    .replace(/\.([a-z0-9]+)$/i, '')   // drop extension
    .replace(/[^a-z0-9]/g, '');       // remove all non-alnum (spaces, _, -, etc.)

// Build an index: normalizedName -> emitted URL
const ASSET_INDEX = ctx.keys().reduce((acc, key) => {
  const fileName = key.replace('./', '');     // e.g. "Almost a fireball ... .pptx"
  const url = ctx(key);                       // emitted URL from webpack
  acc[normalizeKey(fileName)] = url;
  return acc;
}, {});

// Secondary lookup: find a candidate that contains all tokens
const findFuzzy = (keyNorm) => {
  if (!keyNorm) return null;
  const tokens = keyNorm.match(/[a-z0-9]+/g) || [];
  const entries = Object.entries(ASSET_INDEX);

  // Prefer the one that includes all tokens
  const exact = entries.find(([k]) => tokens.every(t => k.includes(t)));
  if (exact) return exact[1];

  // Otherwise, take the one with the most token hits
  let best = null;
  let score = -1;
  for (const [k, url] of entries) {
    const hits = tokens.reduce((n, t) => n + (k.includes(t) ? 1 : 0), 0);
    if (hits > score) {
      score = hits;
      best = url;
    }
  }
  return score > 0 ? best : null;
};

// Public: resolve what to link to for a given data value (legacy or clean)
export const resolveLectureHref = (raw) => {
  if (!raw || typeof raw !== 'string') return null;
  if (/^https?:\/\//i.test(raw)) return raw; // external links untouched

  // Clean legacy prefixes
  const cleaned = raw
    .replace(/^\.\//, '')
    .replace(/^files\/lectures\//i, '')
    .replace(/^lectures\//i, '');

  // Try exact normalized match
  const normalized = normalizeKey(cleaned);
  if (ASSET_INDEX[normalized]) return ASSET_INDEX[normalized];

  // Try fuzzy match (handles underscores vs spaces, extra author names, etc.)
  const fuzzy = findFuzzy(normalized);
  if (fuzzy) return fuzzy;

  // Fallback to public path (works if you also copy to /public/lectures)
  return `/lectures/${cleaned}`;
};

// Optional: extract extension for badge
export const getFileExtTag = (s) => {
  const m = String(s || '').match(/\.([a-z0-9]+)(?:[?#].*)?$/i);
  return m ? m[1].toUpperCase() : null;
};
