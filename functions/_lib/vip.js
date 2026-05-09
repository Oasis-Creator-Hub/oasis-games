// MUST stay in sync with assets/klever-controller.js (KleverController.VIP_TIERS).
export const VIP_TIERS = [
  { min: 0,    level: 0,    name: 'Visitor',  color: '#7a7a7a', glyph: '·' },
  { min: 1,    level: 1,    name: 'Bronze',   color: '#cd7f32', glyph: '●' },
  { min: 5,    level: 5,    name: 'Silver',   color: '#c0c0c0', glyph: '◆' },
  { min: 10,   level: 10,   name: 'Gold',     color: '#ffd700', glyph: '★' },
  { min: 50,   level: 50,   name: 'Platinum', color: '#e5e4e2', glyph: '✦' },
  { min: 100,  level: 100,  name: 'Diamond',  color: '#b9f2ff', glyph: '♦' },
  { min: 500,  level: 500,  name: 'Obsidian', color: '#3d2b56', glyph: '⬢' },
  { min: 1000, level: 1000, name: 'Founder',  color: '#c084fc', glyph: '♛' },
];

export function levelFor(spent) {
  return Math.floor((spent || 0) / 100);
}

export function tierFor(spent) {
  let t = VIP_TIERS[0];
  for (const x of VIP_TIERS) if ((spent || 0) >= x.min) t = x;
  return t;
}

export function nextTierFor(spent) {
  for (const x of VIP_TIERS) if (x.min > (spent || 0)) return x;
  return null;
}
