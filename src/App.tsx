import { useEffect, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { WORLDS, NOTES } from './data/worlds';
import type { World } from './data/worlds';
import { useActiveSection, useIsMobile, usePrefersReducedMotion, useScrollProgress } from './hooks/useAmbience';

const navItems = [
  { href: '#worlds', label: 'Worlds' },
  { href: '#field-notes', label: 'Field notes' },
  { href: '#signal', label: 'Transmission' },
];

function IconArrow() {
  return <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); toggleRef.current?.focus(); }
      if (e.key === 'Tab') {
        const links = document.querySelectorAll<HTMLElement>('.mobile-menu a, .mobile-menu button');
        const first = links[0]; const last = links[links.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);
  useEffect(() => { if (open) document.querySelector<HTMLElement>('.mobile-menu a')?.focus(); }, [open]);
  const close = () => setOpen(false);
  return <>
    <nav className="nav" aria-label="Main navigation">
      <a className="nav-logo" href="#top" aria-label="NEON ODYSSEY home"><span aria-hidden="true" className="logo-mark">✳</span><span>NEON<span style={{ color: 'var(--pink)' }}>//</span>ODYSSEY</span></a>
      <ul className="nav-links">{navItems.map((item) => <li key={item.href}><a href={item.href}>{item.label}</a></li>)}</ul>
      <a className="nav-contact" href="#signal">Get coordinates <span aria-hidden="true">↗</span></a>
      <button ref={toggleRef} className="burger" type="button" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'}><span>{open ? 'CLOSE' : 'MENU'}</span><span className="burger-glyph" aria-hidden="true">{open ? '×' : '☰'}</span></button>
    </nav>
    {open && <div className="mobile-menu" id="mobile-navigation" role="dialog" aria-modal="true" aria-label="Navigation menu">
      <p className="menu-kicker">CHOOSE YOUR TRAJECTORY</p>
      {navItems.map((item, i) => <a key={item.href} href={item.href} onClick={close}><span>0{i + 1}</span>{item.label}</a>)}
      <button className="menu-close" type="button" onClick={close}>Close navigation <span aria-hidden="true">×</span></button>
    </div>}
  </>;
}

function OrbitScene() {
  const reduced = usePrefersReducedMotion();
  const mobile = useIsMobile();
  const [rotation, setRotation] = useState(0);
  const drag = useRef<{ x: number; rotation: number } | null>(null);
  const pointerDown = (e: ReactPointerEvent<HTMLButtonElement>) => {
    drag.current = { x: e.clientX, rotation };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const pointerMove = (e: ReactPointerEvent<HTMLButtonElement>) => {
    if (drag.current) setRotation(drag.current.rotation + (e.clientX - drag.current.x) * .35);
  };
  const pointerUp = () => { drag.current = null; };
  return <div className={`orbit-scene ${mobile ? 'is-mobile' : ''} ${reduced ? 'is-static' : ''}`} aria-label="Interactive orbital map. Drag a planet to rotate the system." role="group">
    <div className="scene-label"><span className="signal-dot" /> LIVE ATLAS <span>•</span> 4 WORLDS</div>
    <div className="orbit-glow" aria-hidden="true" />
    <div className="orbit-plane" style={{ transform: `translate(-50%, -50%) rotateX(62deg) rotateZ(${rotation}deg)` }} aria-hidden="true">
      {[0, 1, 2].map((n) => <span key={n} className={`orbit-ring ring-${n + 1}`} />)}
      {WORLDS.map((world, i) => <span key={world.id} className={`orbit-dot dot-${i}`} style={{ '--world-color': world.accent } as React.CSSProperties} />)}
    </div>
    <div className="orbit-sun" aria-hidden="true"><span>NO</span></div>
    {WORLDS.map((world, i) => <button key={world.id} type="button" className={`planet planet-${i}`} aria-label={`Orbit node ${world.num}: ${world.tag}`} onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerCancel={pointerUp} onKeyDown={(e) => { if (e.key === 'ArrowLeft') setRotation((r) => r - 15); if (e.key === 'ArrowRight') setRotation((r) => r + 15); }} style={{ '--world-color': world.accent, '--planet-delay': `${i * -.9}s` } as React.CSSProperties}><span className="planet-core" /><span className="planet-label">{world.tag}</span></button>)}
    <span className="scene-coordinate coordinate-a">N 44° 08′</span><span className="scene-coordinate coordinate-b">SECTOR 01—04</span>
    <div className="scene-reticle" aria-hidden="true">+</div>
  </div>;
}

function Hero() {
  return <header className="hero" id="top">
    <div className="hero-copy">
      <p className="eyebrow"><span className="eyebrow-line" /> AN INTERACTIVE ATLAS OF THE IMPOSSIBLE <span className="eyebrow-id">EST. ∞</span></p>
      <h1 className="hero-title"><span>NEON</span><span className="title-divider">//</span><span>ODYSSEY</span></h1>
      <p className="hero-sub">Four worlds. One strange frequency.<br className="desktop-break" /> Your cursor is the compass.</p>
      <div className="hero-cta"><a className="glossy amber" href="#worlds"><span className="wrap"><span>Enter the atlas <IconArrow /></span></span></a><a className="text-link" href="#field-notes">Explore field notes <span aria-hidden="true">↘</span></a></div>
      <div className="hero-meta"><span><i className="status-light" /> TRANSMISSION ACTIVE</span><span>01 / 04 WORLDS MAPPED</span></div>
    </div>
    <OrbitScene />
    <a className="scroll-hint" href="#worlds" aria-label="Scroll to enter the worlds"><span className="scroll-line" /><span>SCROLL TO DESCEND</span><span className="scroll-arrow" aria-hidden="true">↓</span></a>
    <div className="hero-side-note" aria-hidden="true">A LIVING ATLAS <span>✳</span> VOL. 01</div>
  </header>;
}

function WorldCard({ world, index }: { world: World; index: number }) {
  return <section className={`world world-${world.id}`} id={world.id} aria-labelledby={`${world.id}-title`} style={{ '--world-accent': world.accent } as React.CSSProperties}>
    <div className="world-index" aria-hidden="true"><span>{world.num}</span><i /></div>
    <div className="world-inner">
      <div className="world-copy"><p className="world-tag"><span className="tag-dot" /> {world.tag} <span className="world-coordinate">/ {String(41 + index)}.08° N</span></p>
        <h2 id={`${world.id}-title`}>{world.title}</h2><p>{world.body}</p><p className="world-stat">{world.stat}</p>
        <a className="world-link" href="#field-notes">Read the field notes <IconArrow /></a>
      </div>
      <div className={`world-art art-${index}`} aria-label={`Procedural illustration of ${world.title}`} role="img">
        <span className="art-orbit art-orbit-one" /><span className="art-orbit art-orbit-two" /><span className="art-orbit art-orbit-three" />
        <span className="art-core" /><span className="art-moon moon-one" /><span className="art-moon moon-two" /><span className="art-moon moon-three" />
        <span className="art-cross cross-one">+</span><span className="art-cross cross-two">✳</span>
        <span className="art-caption">FIG. {world.num} <i /> OBSERVATION / {world.tag.toUpperCase()}</span>
        <span className="art-stamp">NO<br />—<br />∞</span>
      </div>
    </div>
    <span className="world-watermark" aria-hidden="true">{world.num}</span>
  </section>;
}

function Timeline({ active }: { active: string }) {
  return <nav className="timeline" aria-label="World timeline">{WORLDS.map((w) => <a key={w.id} href={`#${w.id}`} aria-current={active === w.id ? 'location' : undefined} aria-label={`Go to ${w.tag}`} title={w.tag}><span>{w.num}</span></a>)}</nav>;
}

function FieldNotes() {
  return <section className="gallery" id="field-notes" aria-labelledby="gallery-title">
    <div className="section-heading"><div><p className="eyebrow"><span className="eyebrow-line" /> OBSERVATION LOG / 06 ENTRIES</p><h2 id="gallery-title">Field notes<span className="accent-dot">.</span></h2></div><p className="gallery-intro">Fragments collected along the way.<br />Some things refuse to be mapped.</p></div>
    <div className="cards">{NOTES.map((note) => <article className={`card card-${note.art}`} key={note.id} style={{ '--c1': note.c1, '--c2': note.c2 } as React.CSSProperties}>
      <div className={`note-art note-${note.art}`} aria-hidden="true"><span className="note-shape" /><span className="note-shape second" /><span className="note-grid" /></div>
      <span className="idx">{note.idx}</span><span className="glyph" aria-hidden="true">{note.glyph}</span>
      <div className="card-copy"><h3>{note.title}</h3><p>{note.body}</p></div>
      <span className="card-corner" aria-hidden="true">↗</span>
    </article>)}</div>
    <p className="gallery-footnote"><span>✳</span> ALL SPECIMENS GENERATED IN-SITU. NO TWO VISITS LOOK THE SAME.</p>
  </section>;
}

function Transmission() {
  return <section className="cta" id="signal" aria-labelledby="signal-title">
    <div className="cta-orbit" aria-hidden="true"><span /><span /><span /></div>
    <p className="eyebrow"><span className="eyebrow-line" /> END OF KNOWN SPACE / BEGINNING OF YOU</p>
    <h2 id="signal-title">The next world<br /><span>is yours to make.</span></h2>
    <p>Every expedition starts with a signal. This one is yours.<br />Carry the strange somewhere new.</p>
    <a className="glossy amber" href="#top"><span className="wrap"><span>Return to the stars <IconArrow /></span></span></a>
    <span className="cta-coordinates">36° 09′ 51.2″ N — YOU ARE HERE</span>
  </section>;
}

export default function App() {
  const progress = useScrollProgress();
  const reduced = usePrefersReducedMotion();
  const active = useActiveSection(WORLDS.map((world) => world.id));
  useEffect(() => {
    if (reduced) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      document.documentElement.style.setProperty('--mx', `${e.clientX}px`);
      document.documentElement.style.setProperty('--my', `${e.clientY}px`);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [reduced]);
  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <div className="grid-bg" aria-hidden="true" /><div className="noise-bg" aria-hidden="true" />{!reduced && <div className="pointer-light" aria-hidden="true" />}
    <div className="progress" role="progressbar" aria-label="Page reading progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress * 100)}><span style={{ transform: `scaleX(${progress})` }} /></div>
    <Navbar />
    <Timeline active={active} />
    <main id="main-content"><Hero /><div className="world-intro" id="worlds"><p className="eyebrow"><span className="eyebrow-line" /> FOUR WORLDS / ONE EXPEDITION</p><p className="intro-line">No map. No rules.<br /><span>Just follow the light.</span></p></div>{WORLDS.map((world, i) => <WorldCard key={world.id} world={world} index={i} />)}<FieldNotes /><Transmission /></main>
    <footer className="site"><a className="footer-logo" href="#top">NEON<span>//</span>ODYSSEY</a><span>BUILT FROM LIGHT & CURIOSITY</span><span>© MMXXV — NO FIXED ADDRESS</span><a className="back-top" href="#top" aria-label="Back to top">↑</a></footer>
    <p className="kbd-hint" aria-hidden="true">TAB TO EXPLORE <span>•</span> ENTER TO DESCEND</p>
  </>;
}
