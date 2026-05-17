'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslation } from '@/lib/use-translation';
import { useAuthStore } from '@/lib/auth-store';
import {
  X,
  ArrowRight,
  ShieldCheck,
  Lock,
  Clock,
  CheckCircle2,
  Zap,
} from 'lucide-react';

// ─── Plan definitions ──────────────────────────────────────────────────
// Same plans as the pricing widget, reused here for the first-login prompt.

interface Plan {
  id: string;
  durationDa: string;
  durationEn: string;
  pricePerMonth: number;
  savingsDa?: string;
  savingsEn?: string;
  popular?: boolean;
  badgeDa?: string;
  badgeEn?: string;
}

const PLANS: Plan[] = [
  { id: '3m', durationDa: '3 MÅNEDER', durationEn: '3 MONTHS', pricePerMonth: 170 },
  { id: '6m', durationDa: '1/2 ÅR', durationEn: '1/2 YEAR', pricePerMonth: 165 },
  { id: '1y', durationDa: '1 ÅR', durationEn: '1 YEAR', pricePerMonth: 150, popular: true, badgeDa: 'MEST POPULÆR', badgeEn: 'MOST POPULAR', savingsDa: 'Spar 20%', savingsEn: 'Save 20%' },
  { id: '2y', durationDa: '2 ÅR', durationEn: '2 YEARS', pricePerMonth: 135, savingsDa: 'Spar 25%', savingsEn: 'Save 25%' },
];

const PLAN_DURATION_DAYS: Record<string, number> = {
  '3m': 90,
  '6m': 182,
  '1y': 365,
  '2y': 730,
};

// ─── Storage key ──────────────────────────────────────────────────────
const DISMISSED_KEY = 'alphaflow-plan-prompt-dismissed';

// ─── Component ─────────────────────────────────────────────────────────

/**
 * Full-screen subscription plan prompt shown to new users on first login.
 * Dark semi-transparent overlay with the same plan data as the pricing widget.
 * Users can choose a plan or dismiss the prompt.
 *
 * Conditions for showing:
 * - user.isFirstLogin is true (set during login response)
 * - Prompt has not been previously dismissed (localStorage)
 * - User is not a SuperDev
 */
export function SubscriptionPlansPrompt() {
  const user = useAuthStore((s) => s.user);
  const { language } = useTranslation();
  const isDa = language === 'da';

  const [visible, setVisible] = useState(false);
  const [animatingIn, setAnimatingIn] = useState(false);
  const [animatingOut, setAnimatingOut] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Determine if we should show the prompt
  const shouldShow = useCallback(() => {
    if (!user) return false;
    if (user.isSuperDev) return false;
    if (user.isDemoCompany) return false;
    if (!user.isFirstLogin) return false;
    if (typeof window === 'undefined') return false;
    const dismissed = localStorage.getItem(DISMISSED_KEY) === 'true';
    if (dismissed) return false;
    return true;
  }, [user]);

  // Show with animation on mount
  useEffect(() => {
    if (shouldShow()) {
      // Small delay to let the dashboard render first
      const timer = setTimeout(() => {
        setAnimatingIn(true);
        setVisible(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [shouldShow]);

  const dismiss = useCallback(() => {
    setAnimatingOut(true);
    setTimeout(() => {
      setVisible(false);
      setAnimatingIn(false);
      setAnimatingOut(false);
      localStorage.setItem(DISMISSED_KEY, 'true');
    }, 300);
  }, []);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlayRef.current) dismiss();
    },
    [dismiss]
  );

  const handleSelectPlan = useCallback(
    (plan: Plan) => {
      // Navigate to settings > access tab where the user can upload a proof
      const targetHash = '#settings?tab=access';
      window.location.hash = targetHash;
      window.dispatchEvent(
        new CustomEvent('app:navigate', {
          detail: { view: 'settings', hash: targetHash },
        })
      );
      dismiss();
    },
    [dismiss]
  );

  const handleStartTrial = useCallback(() => {
    dismiss();
  }, [dismiss]);

  // Close on Escape
  useEffect(() => {
    if (!visible) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [visible, dismiss]);

  // Lock body scroll while open
  useEffect(() => {
    if (!visible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className={`fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6
        bg-black/70 dark:bg-black/85 backdrop-blur-sm
        transition-opacity duration-300
        ${animatingIn && !animatingOut ? 'opacity-100' : animatingOut ? 'opacity-0' : 'opacity-0'}
      `}
    >
      <div
        className={`relative w-full max-w-2xl lg:max-w-3xl max-h-[90vh] overflow-y-auto
          rounded-2xl shadow-2xl
          transition-all duration-300
          ${animatingIn && !animatingOut ? 'scale-100 opacity-100 translate-y-0' : animatingOut ? 'scale-95 opacity-0 translate-y-4' : 'scale-95 opacity-0 translate-y-8'}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Inner card with dark blue theme ── */}
        <div className="relative overflow-hidden rounded-2xl bg-[#0c1a33] dark:bg-[#091325] border border-[#1a2d4d]/60 dark:border-[#152240]/80">
          {/* Background dot grid */}
          <div
            className="absolute inset-0 opacity-[0.12] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Decorative glow orbs */}
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#0d9488]/[0.07] blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-[#2dd4bf]/[0.05] blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#f59e0b]/[0.03] blur-3xl pointer-events-none" />

          {/* ── Header ── */}
          <div className="relative pt-8 pb-6 px-6 sm:px-8 text-center">
            {/* Close button */}
            <button
              type="button"
              onClick={dismiss}
              className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/60 hover:text-white transition-colors cursor-pointer"
              aria-label={isDa ? 'Luk' : 'Close'}
            >
              <X className="h-5 w-5" />
            </button>

            {/* Trial badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0d9488]/20 border border-[#0d9488]/30 mb-4">
              <Clock className="h-3.5 w-3.5 text-[#2dd4bf]" />
              <span className="text-xs font-medium text-[#2dd4bf]">
                {isDa ? '60 DAGES GRATIS PRØVEPERIODE' : '60-DAY FREE TRIAL ACTIVE'}
              </span>
            </div>

            {/* Brand */}
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-[#2dd4bf] text-xs font-medium tracking-widest uppercase opacity-80">
                .TBKEY
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {isDa
                ? 'Velkommen til AlphaFlow'
                : 'Welcome to AlphaFlow'}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-white/60 max-w-lg mx-auto leading-relaxed">
              {isDa
                ? 'Du har 60 dages gratis adgang. Vælg en plan for at fortsætte med fuld skrivetilladelse efter prøveperioden.'
                : 'You have 60 days of free access. Choose a plan to continue with full write access after the trial.'}
            </p>
          </div>

          {/* ── Plan cards ── */}
          <div className="relative px-4 sm:px-6 pb-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {PLANS.map((plan) => {
                const isPopular = plan.popular;

                return (
                  <div
                    key={plan.id}
                    className={`relative rounded-xl lg:rounded-2xl p-4 sm:p-5 flex flex-col items-center text-center
                      transition-all duration-300 hover:scale-[1.03] hover:shadow-lg cursor-pointer group
                      ${isPopular
                        ? 'bg-[#112240]/80 border-2 border-[#f59e0b]/80 dark:border-[#f59e0b]/60 ring-1 ring-[#f59e0b]/20 shadow-lg shadow-[#f59e0b]/5'
                        : 'bg-[#0e1f3d]/80 border border-[#1e3a5f]/60 dark:border-[#1a2d4d]/40 hover:border-[#2dd4bf]/40'
                      }`}
                    onClick={() => handleSelectPlan(plan)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleSelectPlan(plan); }}
                  >
                    {/* Popular badge */}
                    {isPopular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-[#f59e0b] text-white shadow-sm shadow-[#f59e0b]/30 whitespace-nowrap">
                          {isDa ? plan.badgeDa : plan.badgeEn}
                        </span>
                      </div>
                    )}

                    {/* Icon */}
                    <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-xl flex items-center justify-center mb-3
                      ${isPopular
                        ? 'bg-[#f59e0b]/10'
                        : 'bg-[#2dd4bf]/10'
                      }`}
                    >
                      {isPopular ? (
                        <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6 text-[#f59e0b]" />
                      ) : (
                        <Lock className="h-5 w-5 sm:h-6 sm:w-6 text-[#2dd4bf]" />
                      )}
                    </div>

                    {/* Duration label */}
                    <p className={`text-xs sm:text-sm font-bold uppercase tracking-wider mb-1
                      ${isPopular ? 'text-[#f59e0b]' : 'text-[#2dd4bf]'}`}
                    >
                      {isDa ? plan.durationDa : plan.durationEn}
                    </p>

                    {/* Savings badge */}
                    {plan.savingsDa && (
                      <p className="text-[10px] sm:text-xs font-medium text-emerald-400 mb-2">
                        {isDa ? plan.savingsDa : plan.savingsEn}
                      </p>
                    )}

                    {/* Price */}
                    <p className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      {plan.pricePerMonth}
                      <span className="text-xs sm:text-sm font-medium text-white/50 ml-0.5">kr.</span>
                    </p>
                    <p className="text-[10px] sm:text-xs text-white/40 mt-0.5">
                      {isDa ? 'pr. md.' : 'per month'}
                    </p>

                    {/* CTA Button */}
                    <button
                      type="button"
                      className={`mt-3 sm:mt-4 w-full flex items-center justify-center gap-1.5
                        h-9 sm:h-10 px-3 sm:px-4 rounded-lg text-xs sm:text-sm font-semibold
                        transition-all duration-200 hover:shadow-md active:scale-[0.97]
                        ${isPopular
                          ? 'bg-[#f59e0b] hover:bg-[#d97706] text-white shadow-[#f59e0b]/20'
                          : 'bg-[#0d9488]/80 hover:bg-[#0d9488] text-white/90 hover:text-white border border-[#0d9488]/40'
                        }`}
                    >
                      <span>{isDa ? 'VÆLG PLAN' : 'CHOOSE PLAN'}</span>
                      <ArrowRight className="h-3.5 w-3.5 opacity-70 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Bottom: trial CTA + info ── */}
          <div className="relative border-t border-white/[0.06] px-6 sm:px-8 py-5 sm:py-6">
            {/* Start with trial button */}
            <button
              type="button"
              onClick={handleStartTrial}
              className="flex items-center justify-center gap-2 w-full h-12 px-5 rounded-xl
                bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.1] hover:border-white/[0.2]
                text-white/80 hover:text-white text-sm font-medium
                transition-all duration-200 cursor-pointer mb-4"
            >
              <Zap className="h-4 w-4" />
              <span>
                {isDa
                  ? 'Start med prøveperioden — væg plan senere'
                  : 'Start with the trial — choose a plan later'}
              </span>
            </button>

            {/* Features row */}
            <div className="flex items-center justify-center gap-4 sm:gap-6 text-white/40 text-[10px] sm:text-xs">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#2dd4bf]" />
                <span>{isDa ? '60 dage gratis' : '60 days free'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#2dd4bf]" />
                <span>{isDa ? 'Fuld adgang' : 'Full access'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#2dd4bf]" />
                <span>{isDa ? 'Ingen binding' : 'No commitment'}</span>
              </div>
            </div>

            {/* Bottom info bar */}
            <div className="mt-4 flex items-center justify-center gap-2 text-white/20 text-[10px] sm:text-xs tracking-wider">
              <Lock className="h-3 w-3" />
              <span>WEB ACCESS PROOF &middot; .TBKEY</span>
              <Lock className="h-3 w-3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
