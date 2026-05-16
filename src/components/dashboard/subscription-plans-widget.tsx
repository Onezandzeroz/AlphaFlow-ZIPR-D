'use client';

import { useCallback } from 'react';
import { useTranslation } from '@/lib/use-translation';
import { Lock, ShieldCheck, ArrowRight } from 'lucide-react';

// ─── Plan definitions ──────────────────────────────────────────────────

interface Plan {
  id: string;
  durationDa: string;
  durationEn: string;
  pricePerMonth: number;
  popular?: boolean;
  badgeDa?: string;
  badgeEn?: string;
}

const PLANS: Plan[] = [
  { id: '3m', durationDa: '3 MÅNEDER', durationEn: '3 MONTHS', pricePerMonth: 170 },
  { id: '6m', durationDa: '1/2 ÅR', durationEn: '1/2 YEAR', pricePerMonth: 165 },
  { id: '1y', durationDa: '1 ÅR', durationEn: '1 YEAR', pricePerMonth: 150, popular: true, badgeDa: 'MEST POPULÆR', badgeEn: 'MOST POPULAR' },
  { id: '2y', durationDa: '2 ÅR', durationEn: '2 YEARS', pricePerMonth: 135 },
];

// ─── Component ─────────────────────────────────────────────────────────

export function SubscriptionPlansWidget() {
  const { language } = useTranslation();
  const isDa = language === 'da';

  const handleSelectPlan = useCallback((_plan: Plan) => {
    // Navigate to settings > access tab where the user can upload a proof
    const targetHash = '#settings?tab=access';
    window.location.hash = targetHash;
    window.dispatchEvent(new CustomEvent('app:navigate', {
      detail: { view: 'settings', hash: targetHash },
    }));
  }, []);

  return (
    <div
      className="relative overflow-hidden rounded-2xl lg:rounded-[1.25rem]
        bg-[#0c1a33] dark:bg-[#091325] border border-[#1a2d4d]/60 dark:border-[#152240]/80
        animate-fade-in"
    >
      {/* ── Background dot grid ── */}
      <div
        className="absolute inset-0 opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* ── Decorative glow orbs ── */}
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#0d9488]/[0.07] blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-[#2dd4bf]/[0.05] blur-3xl pointer-events-none" />

      {/* ── Header ── */}
      <div className="relative pt-6 sm:pt-8 pb-4 sm:pb-5 px-5 sm:px-6 text-center">
        {/* Brand */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-[#2dd4bf] text-xs font-medium tracking-widest uppercase opacity-80">
            .TBKEY
          </span>
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
          {isDa ? 'Vælg Din Plan' : 'Choose Your Plan'}
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-white/50 max-w-md mx-auto leading-relaxed">
          {isDa
            ? 'Få fuld skrivetilladelse med et krypteret escrow-bevis'
            : 'Get full write access with an encrypted escrow proof'}
        </p>
      </div>

      {/* ── Plan cards ── */}
      <div className="relative px-3 sm:px-5 pb-6 sm:pb-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 lg:gap-4">
          {PLANS.map((plan) => {
            const isPopular = plan.popular;

            return (
              <div
                key={plan.id}
                className={`relative rounded-xl lg:rounded-2xl p-4 sm:p-5 flex flex-col items-center text-center
                  transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer group
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
                <p className={`text-xs sm:text-sm font-bold uppercase tracking-wider mb-2
                  ${isPopular ? 'text-[#f59e0b]' : 'text-[#2dd4bf]'}`}
                >
                  {isDa ? plan.durationDa : plan.durationEn}
                </p>

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
                    h-8 sm:h-9 px-3 sm:px-4 rounded-lg text-xs sm:text-sm font-semibold
                    transition-all duration-200 hover:shadow-md active:scale-[0.97]
                    ${isPopular
                      ? 'bg-[#f59e0b] hover:bg-[#d97706] text-white shadow-[#f59e0b]/20'
                      : 'bg-[#0d9488]/80 hover:bg-[#0d9488] text-white/90 hover:text-white border border-[#0d9488]/40'
                    }`}
                >
                  <span>{isDa ? 'VÆLG PLAN' : 'CHOOSE PLAN'}</span>
                  <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 opacity-70 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>
            );
          })}
        </div>

        {/* ── Bottom info bar ── */}
        <div className="mt-5 sm:mt-6 flex items-center justify-center gap-2 text-white/30 text-[10px] sm:text-xs tracking-wider">
          <Lock className="h-3 w-3" />
          <span>WEB ACCESS PROOF &middot; .TBKEY</span>
          <Lock className="h-3 w-3" />
        </div>
      </div>
    </div>
  );
}
