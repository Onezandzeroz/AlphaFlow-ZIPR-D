'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslation } from '@/lib/use-translation';
import { useAuthStore } from '@/lib/auth-store';
import { useSubscriptionPlansStore } from '@/lib/subscription-plans-store';
import {
  X,
  ArrowRight,
  ShieldCheck,
  Lock,
  Check,
  Zap,
  Gift,
  Star,
} from 'lucide-react';

// ─── Plan definitions ──────────────────────────────────────────────────

interface PlanFeature {
  da: string;
  en: string;
}

interface Plan {
  id: string;
  name: string;
  priceDa: string;
  priceEn: string;
  priceUnitDa?: string;
  priceUnitEn?: string;
  savingsDa?: string;
  savingsEn?: string;
  descDa: string;
  descEn: string;
  features: PlanFeature[];
  limitDa?: string;
  limitEn?: string;
  bindDa: string;
  bindEn: string;
  ctaDa: string;
  ctaEn: string;
  popular?: boolean;
  badgeDa?: string;
  badgeEn?: string;
  isFree?: boolean;
}

const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    priceDa: '0 kr.',
    priceEn: '0 kr.',
    priceUnitDa: '60 dage',
    priceUnitEn: '60 days',
    descDa: 'Periodevist behov for bogføring f.eks. opstartsvirksomhed',
    descEn: 'Periodic bookkeeping needs, e.g. startups',
    features: [
      { da: 'Fulgt bogføringssystem m. AI-afstemning', en: 'Full accounting w/ AI reconciliation' },
      { da: 'Fakturering', en: 'Invoicing' },
      { da: 'Momsindberetning', en: 'VAT reporting' },
      { da: 'Bilagsupload & OCR-scanning', en: 'Receipt upload & OCR scanning' },
      { da: 'Bankintegration', en: 'Bank integration' },
    ],
    limitDa: '',
    limitEn: '',
    bindDa: 'Ingen',
    bindEn: 'None',
    ctaDa: 'Prøv gratis nu',
    ctaEn: 'Try free now',
    isFree: true,
  },
  {
    id: 'monthly',
    name: 'Månedlig',
    priceDa: '129 kr./md.',
    priceEn: '129 kr./mo.',
    descDa: 'Godt i gang med virksomheden og ønsker stabil drift',
    descEn: 'Growing business wanting stable operations',
    features: [
      { da: 'Ingen begrænsninger', en: 'No limitations' },
      { da: 'Fuldt AI-drevet bogføring', en: 'Full AI-powered bookkeeping' },
      { da: 'Rådgivnings AI-Agent', en: 'Advisory AI agent' },
      { da: 'Revisoradgang', en: 'Auditor access' },
      { da: 'Mail & chat support', en: 'Mail & chat support' },
    ],
    bindDa: 'Ingen binding',
    bindEn: 'No commitment',
    ctaDa: 'Vælg månedlig',
    ctaEn: 'Choose monthly',
  },
  {
    id: 'annual',
    name: 'Årlig',
    priceDa: '99 kr./md.',
    priceEn: '99 kr./mo.',
    priceUnitDa: '(1.188 kr./år)',
    priceUnitEn: '(1,188 kr./yr)',
    savingsDa: 'Spar 360 kr./år',
    savingsEn: 'Save 360 kr./yr',
    descDa: 'Stabil drift med blikket rette fremad',
    descEn: 'Stable operations, looking ahead',
    features: [
      { da: '23 % rabat', en: '23% discount' },
      { da: 'Prioriteret support', en: 'Priority support' },
      { da: 'Stabil pris i 12 måneder', en: 'Fixed price 12 months' },
      { da: 'AI-Agent m. fuld indblik (Din digitale Revisor)', en: 'AI agent full insight (Digital Auditor)' },
    ],
    bindDa: '12 måneder',
    bindEn: '12 months',
    ctaDa: 'Vælg årlig',
    ctaEn: 'Choose annual',
    popular: true,
    badgeDa: 'ANBEFALET',
    badgeEn: 'RECOMMENDED',
  },
  {
    id: '2year',
    name: '2-årig',
    priceDa: '89 kr./md.',
    priceEn: '89 kr./mo.',
    priceUnitDa: '(2.136 kr./24 md.)',
    priceUnitEn: '(2,136 kr./24 mo.)',
    savingsDa: 'Spar 960 kr.',
    savingsEn: 'Save 960 kr.',
    descDa: 'Stabil drift — spar mest muligt langsigtet',
    descEn: 'Stable ops — maximize long-term savings',
    features: [
      { da: '31 % rabat', en: '31% discount' },
      { da: 'Prioriteret + hurtigere support', en: 'Priority + faster support' },
      { da: 'Hurtigere feature-requests', en: 'Faster feature requests' },
    ],
    bindDa: '24 måneder',
    bindEn: '24 months',
    ctaDa: 'Vælg 2-årig',
    ctaEn: 'Choose 2-year',
  },
  {
    id: '3year',
    name: '3-årig',
    priceDa: '79 kr./md.',
    priceEn: '79 kr./mo.',
    priceUnitDa: '(2.844 kr./36 md.)',
    priceUnitEn: '(2,844 kr./36 mo.)',
    savingsDa: 'Spar 1.800 kr.',
    savingsEn: 'Save 1,800 kr.',
    descDa: 'Størst rabat & eksklusiv adgang',
    descEn: 'Best discount & exclusive access',
    features: [
      { da: '39 % rabat', en: '39% discount' },
      { da: 'Højeste prioritet på support', en: 'Highest priority support' },
      { da: 'Eksklusive kommende AI-moduler', en: 'Exclusive upcoming AI modules' },
    ],
    bindDa: '36 måneder',
    bindEn: '36 months',
    ctaDa: 'Vælg 3-årig',
    ctaEn: 'Choose 3-year',
  },
];

// ─── Storage key prefixes ──────────────────────────────────────────────
// Keys are made per-user by appending user.id so that each new user
// sees the prompt on their first login, even on a shared browser.
const DISMISSED_PREFIX = 'alphaflow-plan-prompt-dismissed-';
const EVER_LOGGED_PREFIX = 'alphaflow-ever-logged-';

// ─── Component ─────────────────────────────────────────────────────────

export function SubscriptionPlansPrompt() {
  const user = useAuthStore((s) => s.user);
  const { language } = useTranslation();
  const isDa = language === 'da';

  const [visible, setVisible] = useState(false);
  const [animatingIn, setAnimatingIn] = useState(false);
  const [animatingOut, setAnimatingOut] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  // Guard: ensures we only schedule the prompt once per component lifecycle.
  // Without this, React's effect cleanup would clear the timer when `user`
  // reference changes (Zustand persist re-save), causing the prompt to never appear.
  const hasScheduled = useRef(false);

  // Subscribe to external trigger store changes (fire-and-forget, no setState in effect body)
  useEffect(() => {
    const unsub = useSubscriptionPlansStore.subscribe((state) => {
      if (state.isOpen) {
        // Show immediately on external trigger — runs inside Zustand's subscribe callback,
        // which is safe from React's "set-state-in-effect" rule.
        setAnimatingIn(true);
        setVisible(true);
      }
    });
    return unsub;
  }, []);

  // Detect first-login per user via localStorage flags.
  // Keys include user.id so different users on the same browser each get
  // their own first-login prompt. The Zustand persist layer strips
  // isFirstLogin from localStorage (see auth-store.ts partialize), so we
  // track it ourselves here.
  //
  // IMPORTANT: We set the localStorage key INSIDE the effect (not in a
  // separate shouldShow callback) to avoid a race condition where the key
  // is set but the timer gets cleaned up on the next render.
  useEffect(() => {
    if (!user || hasScheduled.current) return;
    if (user.isSuperDev) return;
    if (user.isDemoCompany) return;
    if (typeof window === 'undefined') return;
    const dismissedKey = `${DISMISSED_PREFIX}${user.id}`;
    const everLoggedKey = `${EVER_LOGGED_PREFIX}${user.id}`;
    if (localStorage.getItem(dismissedKey) === 'true') return;
    if (localStorage.getItem(everLoggedKey) === 'true') return;

    // First time for this user — mark immediately so refresh won't re-trigger.
    // Do NOT return a cleanup function — we deliberately let the timer run
    // even if `user` reference changes on a subsequent render.
    localStorage.setItem(everLoggedKey, 'true');
    hasScheduled.current = true;

    const timer = setTimeout(() => {
      setAnimatingIn(true);
      setVisible(true);
    }, 800);
    // Intentionally NO cleanup returned. If we returned () => clearTimeout(timer),
    // React would call it when `user` reference changes (Zustand persist re-save),
    // killing the timer before it fires. The hasScheduled ref prevents double-scheduling.
  }, [user]);

  const dismiss = useCallback(() => {
    setAnimatingOut(true);
    setTimeout(() => {
      setVisible(false);
      setAnimatingIn(false);
      setAnimatingOut(false);
      if (user?.id) {
        localStorage.setItem(`${DISMISSED_PREFIX}${user.id}`, 'true');
      }
      useSubscriptionPlansStore.getState().dismiss();
    }, 300);
  }, [user]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlayRef.current) dismiss();
    },
    [dismiss],
  );

  const handleSelectPlan = useCallback(
    (plan: Plan) => {
      const targetHash = '#settings?tab=access';
      window.location.hash = targetHash;
      window.dispatchEvent(
        new CustomEvent('app:navigate', {
          detail: { view: 'settings', hash: targetHash },
        }),
      );
      dismiss();
    },
    [dismiss],
  );

  const handleStartTrial = useCallback(() => {
    dismiss();
  }, [dismiss]);

  useEffect(() => {
    if (!visible) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [visible, dismiss]);

  useEffect(() => {
    if (!visible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [visible]);

  if (!visible) return null;

  const t = (da: string, en: string) => (isDa ? da : en);

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className={`fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6
        bg-black/70 dark:bg-black/85 backdrop-blur-sm
        transition-opacity duration-300
        ${animatingIn && !animatingOut ? 'opacity-100' : animatingOut ? 'opacity-0' : 'opacity-0'}
      `}
    >
      <div
        className={`relative w-full
          /* Desktop: 16:9 ratio, wide enough for 5 columns */
          max-w-[1280px] aspect-[16/9]
          /* Tablet & mobile: drop ratio, allow vertical scroll */
          sm:max-w-[1280px] sm:aspect-[16/9]
          max-h-[95vh] overflow-y-auto overflow-x-hidden
          rounded-2xl shadow-2xl
          transition-all duration-300
          ${animatingIn && !animatingOut ? 'scale-100 opacity-100 translate-y-0' : animatingOut ? 'scale-95 opacity-0 translate-y-4' : 'scale-95 opacity-0 translate-y-8'}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Inner card ── */}
        <div className="relative flex flex-col h-full overflow-hidden rounded-2xl bg-[#0c1a33] dark:bg-[#091325] border border-[#1a2d4d]/60 dark:border-[#152240]/80">
          {/* Background dot grid */}
          <div
            className="absolute inset-0 opacity-[0.08] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Decorative glow orbs */}
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#0d9488]/[0.06] blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-[#2dd4bf]/[0.04] blur-3xl pointer-events-none" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-[#f59e0b]/[0.025] blur-3xl pointer-events-none" />

          {/* ── Header ── */}
          <div className="relative shrink-0 pt-5 sm:pt-6 pb-3 sm:pb-4 px-5 sm:px-8 text-center">
            {/* Close button */}
            <button
              type="button"
              onClick={dismiss}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1.5 sm:p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/60 hover:text-white transition-colors cursor-pointer"
              aria-label={t('Luk', 'Close')}
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>



            <h2 className="text-xl sm:text-2xl lg:text-[1.65rem] font-bold text-white tracking-tight leading-tight">
              {t('Velkommen til AlphaFlow', 'Welcome to AlphaFlow')}
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm lg:text-base text-white/50 max-w-2xl mx-auto leading-relaxed">
              {t(
                'Du har 2 måneders gratis adgang. Vælg en plan der passer til din virksomhed.',
                'You have 2 months of free access. Pick a plan that fits your business.',
              )}
            </p>
          </div>

          {/* ── Plan cards (5-column grid) ── */}
          <div className="relative flex-1 min-h-0 px-3 sm:px-5 lg:px-6 pb-3 sm:pb-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-2.5 lg:gap-3 h-full">
              {PLANS.map((plan) => {
                const isPopular = plan.popular;
                const isFree = plan.isFree;

                return (
                  <div
                    key={plan.id}
                    className={`relative flex flex-col rounded-xl lg:rounded-2xl p-3 sm:p-3.5 lg:p-4 text-center
                      transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer group
                      ${isPopular
                        ? 'bg-[#112240]/80 border-2 border-[#f59e0b]/80 dark:border-[#f59e0b]/60 ring-1 ring-[#f59e0b]/20 shadow-lg shadow-[#f59e0b]/5'
                        : isFree
                          ? 'bg-[#0a1628]/60 border border-[#1e3a5f]/50 dark:border-[#1a2d4d]/30 hover:border-[#2dd4bf]/30'
                          : 'bg-[#0e1f3d]/80 border border-[#1e3a5f]/60 dark:border-[#1a2d4d]/40 hover:border-[#2dd4bf]/40'
                      }`}
                    onClick={() => handleSelectPlan(plan)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleSelectPlan(plan); }}
                  >
                    {/* Popular badge */}
                    {isPopular && (
                      <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 z-10">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-[#f59e0b] text-white shadow-sm shadow-[#f59e0b]/30 whitespace-nowrap">
                          <Star className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                          {isDa ? plan.badgeDa : plan.badgeEn}
                        </span>
                      </div>
                    )}

                    {/* ── Plan name ── */}
                    <p className={`text-xs sm:text-sm lg:text-base font-bold uppercase tracking-wider
                      ${isPopular ? 'text-[#f59e0b]' : isFree ? 'text-[#2dd4bf]/70' : 'text-[#2dd4bf]'}
                    `}>
                      {plan.name}
                    </p>

                    {/* ── Price block ── */}
                    <div className="mt-1.5 sm:mt-2">
                      <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight leading-none">
                        {isDa ? plan.priceDa : plan.priceEn}
                      </p>
                      {plan.priceUnitDa && (
                        <p className="text-[10px] sm:text-xs lg:text-sm text-white/35 mt-0.5">
                          {isDa ? plan.priceUnitDa : plan.priceUnitEn}
                        </p>
                      )}
                    </div>

                    {/* ── Savings badge (always reserve height for alignment) ── */}
                    <div className="mt-1 sm:mt-1.5 h-[18px] sm:h-[22px] flex items-center justify-center">
                      {plan.savingsDa && (
                        <span className="text-[10px] sm:text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                          {isDa ? plan.savingsDa : plan.savingsEn}
                        </span>
                      )}
                    </div>

                    {/* ── Description ── */}
                    <p className="mt-2 sm:mt-2.5 text-[10px] sm:text-xs lg:text-sm text-white/45 leading-relaxed">
                      {isDa ? plan.descDa : plan.descEn}
                    </p>

                    {/* ── Features list (flex-1 fills available space) ── */}
                    <ul className="mt-2.5 sm:mt-3 flex-1 space-y-1.5 text-left">
                      {plan.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <Check className={`shrink-0 mt-0.5 h-3.5 w-3.5 sm:h-4 sm:w-4
                            ${isFree ? 'text-[#2dd4bf]/60' : isPopular ? 'text-[#f59e0b]/80' : 'text-[#2dd4bf]/80'}`}
                          />
                          <span className="text-[10px] sm:text-xs lg:text-sm text-white/55 leading-snug">
                            {isDa ? feat.da : feat.en}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* ── Binding / Limitation ── */}
                    <div className="mt-2 sm:mt-2.5 pt-2 sm:pt-2.5 border-t border-white/[0.06]">
                      <p className="text-[10px] sm:text-xs text-white/30">
                        {isDa ? `Binding: ${plan.bindDa}` : `Commitment: ${plan.bindEn}`}
                      </p>
                    </div>

                    {/* Trial badge (only on Free card, above CTA) */}
                    {isFree && (
                      <div className="mt-2 inline-flex items-center justify-center gap-1.5 mx-auto px-2.5 py-0.5 rounded-full bg-[#0d9488]/20 border border-[#0d9488]/30">
                        <Gift className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#2dd4bf]" />
                        <span className="text-[9px] sm:text-[10px] font-semibold text-[#2dd4bf] tracking-wide leading-tight">
                          {t('2 MDR. GRATIS · FULD ADGANG', '2 MOS. FREE · FULL ACCESS')}
                        </span>
                      </div>
                    )}

                    {/* ── CTA button (pinned to bottom via mt-auto) ── */}
                    <button
                      type="button"
                      className={`mt-auto w-full flex items-center justify-center gap-1.5
                        h-9 sm:h-10 lg:h-11 px-2 sm:px-3 rounded-lg text-xs sm:text-sm lg:text-base font-semibold
                        transition-all duration-200 hover:shadow-md active:scale-[0.97]
                        ${isPopular
                          ? 'bg-[#f59e0b] hover:bg-[#d97706] text-white shadow-[#f59e0b]/20'
                          : isFree
                            ? 'bg-[#0d9488]/60 hover:bg-[#0d9488]/80 text-white/80 hover:text-white border border-[#0d9488]/30'
                            : 'bg-[#0d9488]/80 hover:bg-[#0d9488] text-white/90 hover:text-white border border-[#0d9488]/40'
                        }`}
                    >
                      <span>{isDa ? plan.ctaDa : plan.ctaEn}</span>
                      <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Bottom bar ── */}
          <div className="relative shrink-0 border-t border-white/[0.06] px-5 sm:px-8 py-3 sm:py-4">
            {/* Features row */}
            <div className="flex items-center justify-center gap-3 sm:gap-5 lg:gap-6 text-white/35 text-[10px] sm:text-xs lg:text-sm">
              <div className="flex items-center gap-1">
                <Gift className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#2dd4bf]/70" />
                <span>{t('2 måneder gratis', '2 months free')}</span>
              </div>
              <div className="flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#2dd4bf]/70" />
                <span>{t('Fuld adgang', 'Full access')}</span>
              </div>
              <div className="flex items-center gap-1">
                <Zap className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#2dd4bf]/70" />
                <span>{t('Ingen binding på prøve', 'No trial commitment')}</span>
              </div>
            </div>

            {/* Bottom branding */}
            <div className="mt-2.5 sm:mt-3 flex items-center justify-center gap-2 text-white/15 text-[10px] sm:text-xs tracking-widest">
              <Lock className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
              <span>WEB ACCESS PROOF &middot; .TBKEY</span>
              <Lock className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
