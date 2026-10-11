import { useEffect, useState } from 'react';

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduced(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduced;
}

export function useIsMobile(breakpoint = 860): boolean {
  const [mobile, setMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth <= breakpoint
  );
  useEffect(() => {
    const on = () => setMobile(window.innerWidth <= breakpoint);
    window.addEventListener('resize', on, { passive: true });
    return () => window.removeEventListener('resize', on);
  }, [breakpoint]);
  return mobile;
}

export function useScrollProgress(): number {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setP(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      });
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on, { passive: true });
    return () => {
      window.removeEventListener('scroll', on);
      window.removeEventListener('resize', on);
      cancelAnimationFrame(raf);
    };
  }, []);
  return p;
}

export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? '');
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter((e): e is HTMLElement => !!e);
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const en of entries) if (en.isIntersecting) setActive(en.target.id);
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    els.forEach((e) => obs.observe(e));
    return () => obs.disconnect();
  }, [ids.join('|')]);
  return active;
}
