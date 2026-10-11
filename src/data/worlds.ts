export interface World {
  id: string;
  num: string;
  tag: string;
  title: string;
  body: string;
  stat: string;
  accent: string;
}

export const WORLDS: World[] = [
  {
    id: 'ember',
    num: '01',
    tag: 'Sector Ember',
    title: 'The Amber Furnace',
    body: 'A cathedral of slow fire. Molten rings orbit a patient sun, each pass etching new geometry into the dark. Stand still long enough and the furnace begins to hum in your frequency.',
    stat: 'TEMP 2,470° — ROTATION 0.31 rev/h — HUE BIAS #ffbe0b',
    accent: 'var(--amber)',
  },
  {
    id: 'bloom',
    num: '02',
    tag: 'Sector Bloom',
    title: 'The Neon Reef',
    body: 'Coral made of light. Every node is a colony that blooms when your pointer drifts near, folding color into the void like ink in water. Silence here is not empty — it is charged.',
    stat: 'LUMEN 9.4 klx — DRIFT 12 nm/s — HUE BIAS #ff006e',
    accent: 'var(--pink)',
  },
  {
    id: 'violet',
    num: '03',
    tag: 'Sector Violet',
    title: 'The Ultraviolet Fold',
    body: 'Space bends politely here. Three moons share one orbit and refuse to collide, because in this fold, distance is a matter of opinion. Follow the azure current to the far rim.',
    stat: 'CURVATURE 0.87 — TIDAL LOCK: NONE — HUE BIAS #8338ec',
    accent: 'var(--violet)',
  },
  {
    id: 'azure',
    num: '04',
    tag: 'Sector Azure',
    title: 'The Deep Signal',
    body: 'The last world hums in blue. A single beacon broadcasts the coordinates of every world you have crossed, waiting for a traveler fluent enough in light to answer.',
    stat: 'SIGNAL 88.6 MHz — LATENCY ∞ — HUE BIAS #3a86ff',
    accent: 'var(--azure)',
  },
];

export interface Note {
  id: string;
  idx: string;
  glyph: string;
  title: string;
  body: string;
  c1: string;
  c2: string;
  art: string;
}

export const NOTES: Note[] = [
  { id: 'n1', idx: 'FIG.01', glyph: '◎', title: 'Ring Study IV', body: 'Concentric interference of two amber orbits, sampled at dawn cycle.', c1: '#3a1e00', c2: '#ffbe0b', art: 'rings' },
  { id: 'n2', idx: 'FIG.02', glyph: '⬡', title: 'Bloom Lattice', body: 'Hexagonal colonies of the Neon Reef, photographed mid-pulse.', c1: '#3d0020', c2: '#ff006e', art: 'hex' },
  { id: 'n3', idx: 'FIG.03', glyph: '◇', title: 'Fold Contour', body: 'Topography of the Ultraviolet Fold — three moons, one shadow.', c1: '#22004a', c2: '#8338ec', art: 'diamond' },
  { id: 'n4', idx: 'FIG.04', glyph: '≋', title: 'Signal Wake', body: 'Waveform residue of the Deep Signal, translated to visible spectrum.', c1: '#001a4a', c2: '#3a86ff', art: 'waves' },
  { id: 'n5', idx: 'FIG.05', glyph: '✳', title: 'Ember Seed', body: 'Germinating spark from the Furnace core. Do not handle without gloves.', c1: '#3d1000', c2: '#fb5607', art: 'burst' },
  { id: 'n6', idx: 'FIG.06', glyph: '◐', title: 'Pearl Eclipse', body: 'Pearl moon occluding the beacon — the only true silence on record.', c1: '#2a0033', c2: '#ffe7ff', art: 'eclipse' },
];
