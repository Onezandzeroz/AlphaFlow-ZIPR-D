'use client';

import { useCallback } from 'react';
import { useTranslation } from '@/lib/use-translation';
import {
  Lock,
  ShieldCheck,
  Star,
  ArrowRight,
  Check,
  Zap,
  HeadphonesIcon,
  Sparkles,
  Gift,
  Bot,
} from 'lucide-react';

// ─── Plan definitions ──────────────────────────────────────────────────

interface PlanFeature {
  textDa: string;
  textEn: string;
  highlight?: boolean;
}

interface Plan {
  id: string;
  nameDa: string;
  nameEn: string;
  descDa: string;
  descEn: string;
  priceDa: string;
  priceEn: string;
  subtitleDa: string;
  subtitleEn: string;
  popular?: boolean;
  badgeDa?: string;
  badgeEn?: string;
  savingsDa?: string;
  savingsEn?: string;
  discount?: string;
  features: PlanFeature[];
  ctaDa: string;
  ctaEn: string;
  free?: boolean;
}

const PLANS: Plan[] = [
  {
    id: 'free',
    nameDa: 'Free / Prøve',
    nameEn: 'Free / Trial',
    descDa: 'Løsningen for jer som har periodevist behov for bogføring f.eks. opstartsvirksomhed',
    descEn: 'For businesses with periodic bookkeeping needs, e.g. startups',
    priceDa: '0 kr.',
    priceEn: '0 kr.',
    subtitleDa: '2 måneder gratis',
    subtitleEn: '2 months free',
    features: [
      { textDa: 'Fuldt bogføringssystem med AI-drevet afstemning', textEn: 'Full bookkeeping system with AI reconciliation' },
      { textDa: 'Fakturering', textEn: 'Invoicing' },
      { textDa: 'Rådgivnings AI-Agent', textEn: 'Advisory AI Agent' },
      { textDa: 'Momsindberetning', textEn: 'VAT reporting' },
      { textDa: 'Revisoradgang', textEn: 'Auditor access' },
      { textDa: 'Bilagsupload & OCR-scanning', textEn: 'Receipt upload & OCR scanning' },
      { textDa: 'Bankintegration', textEn: 'Bank integration' },
      { textDa: 'Mail & chat support', textEn: 'Email & chat support' },
    ],
    ctaDa: 'Prøv gratis nu',
    ctaEn: 'Try free now',
    free: true,
  },
  {
    id: 'monthly',
    nameDa: 'Månedlig',
    nameEn: 'Monthly',
    descDa: 'Pakken til jer som er godt i gang med virksomheden og ønsker stabil drift',
    descEn: 'For businesses getting started and wanting stable operations',
    priceDa: '129 kr./md.',
    priceEn: '129 kr./mo.',
    subtitleDa: 'Ingen binding',
    subtitleEn: 'No commitment',
    features: [
      { textDa: 'Alt fra Free +', textEn: 'Everything in Free +', highlight: true },
      { textDa: 'Fuldt AI-drevet bogføring', textEn: 'Full AI-driven bookkeeping' },
      { textDa: 'Ubegrænset brug', textEn: 'Unlimited usage' },
    ],
    ctaDa: 'Vælg månedlig',
    ctaEn: 'Choose monthly',
  },
  {
    id: 'annual',
    nameDa: 'Årlig',
    nameEn: 'Annual',
    descDa: 'Planen for jer som er godt i gang med virksomheden og ønsker stabil drift rette fremad',
    descEn: 'For established businesses wanting stable operations going forward',
    priceDa: '99 kr./md.',
    priceEn: '99 kr./mo.',
    subtitleDa: '1.188 kr./år',
    subtitleEn: '1,188 kr./yr',
    popular: true,
    badgeDa: 'ANBEFALET',
    badgeEn: 'RECOMMENDED',
    savingsDa: 'Spar 360 kr./år',
    savingsEn: 'Save 360 kr./yr',
    discount: '23 %',
    features: [
      { textDa: 'Alt fra Månedlig +', textEn: 'Everything in Monthly +', highlight: true },
      { textDa: 'Ingen begrænsninger', textEn: 'No limitations' },
      { textDa: 'Prioriteret support', textEn: 'Priority support' },
      { textDa: 'Prioriteret support + hurtigere svar', textEn: 'Priority support + faster response' },
    ],
    ctaDa: 'Vælg årlig',
    ctaEn: 'Choose annual',
  },
  {
    id: 'biennial',
    nameDa: '2-årig',
    nameEn: '2-Year',
    descDa: 'Løsningen for jer som har stabil drift og gerne vil spare mest muligt',
    descEn: 'For businesses with stable operations looking to save the most',
    priceDa: '89 kr./md.',
    priceEn: '89 kr./mo.',
    subtitleDa: '2.136 kr./24 md.',
    subtitleEn: '2,136 kr./24 mo.',
    savingsDa: 'Spar 960 kr.',
    savingsEn: 'Save 960 kr.',
    discount: '31 %',
    features: [
      { textDa: 'Alt fra Årlig +', textEn: 'Everything in Annual +', highlight: true },
      { textDa: 'Eksklusive kommende AI-moduler', textEn: 'Exclusive upcoming AI modules' },
      { textDa: 'Rådgivnings AI-Agent (Din digitale Revisor)', textEn: 'Advisory AI Agent (Your Digital Auditor)' },
    ],
    ctaDa: 'Vælg 2-årig',
    ctaEn: 'Choose 2-year',
  },
  {
    id: 'triennial',
    nameDa: '3-årig',
    nameEn: '3-Year',
    descDa: 'Løsningen for jer som har stabil drift og vil spare mest muligt langsigtet',
    descEn: 'For stable businesses looking to maximise long-term savings',
    priceDa: '79 kr./md.',
    priceEn: '79 kr./mo.',
    subtitleDa: '2.844 kr./36 md.',
    subtitleEn: '2,844 kr./36 mo.',
    savingsDa: 'Spar 1.800 kr.',
    savingsEn: 'Save 1,800 kr.',
    discount: '39 %',
    features: [
      { textDa: 'Alt fra 2-årig +', textEn: 'Everything in 2-Year +', highlight: true },
      { textDa: 'Højeste prioritet på support', textEn: 'Highest support priority' },
      { textDa: 'Hurtigere feature-requests', textEn: 'Faster feature requests' },
    ],
    ctaDa: 'Vælg 3-årig',
    ctaEn: 'Choose 3-year',
  },
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
      <div className="relative pt-6 sm:pt-8 pb-3 sm:pb-4 px-5 sm:px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-[#2dd4bf] text-xs font-medium tracking-widest uppercase opacity-80">
            .TBKEY
          </span>
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
          {isDa ? 'Vælg Din Plan' : 'Choose Your Plan'}
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-white/50 max-w-lg mx-auto leading-relaxed">
          {isDa
            ? 'Få fuld skrivetilladelse med et krypteret escrow-bevis — start gratis eller vælg den plan der passer jer bedst'
            : 'Get full write access with an encrypted escrow proof — start free or pick the plan that fits you best'}
        </p>
      </div>

      {/* ── Plan cards ── */}
      <div className="relative px-2.5 sm:px-4 lg:px-5 pb-6 sm:pb-8">
        {/* Scrollable on mobile, grid on lg+ */}
        <div className="flex gap-2.5 sm:gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-thin lg:overflow-visible lg:grid lg:grid-cols-5 lg:gap-3 xl:gap-4 lg:pb-0">

          {PLANS.map((plan) => {
            const isPopular = plan.popular;
            const isFree = plan.free;

            return (
              <div
                key={plan.id}
                className={`relative min-w-[200px] sm:min-w-[220px] lg:min-w-0 flex-shrink-0 snap-start
                  rounded-xl lg:rounded-2xl p-3.5 sm:p-4 flex flex-col text-center
                  transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer group
                  ${isFree
                    ? 'bg-[#0e1f3d]/80 border border-[#1e3a5f]/60 dark:border-[#1a2d4d]/40 hover:border-[#2dd4bf]/40'
                    : isPopular
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
                      <Star className="h-3 w-3 mr-1" />
                      {isDa ? plan.badgeDa : plan.badgeEn}
                    </span>
                  </div>
                )}

                {/* Discount badge (top-right) */}
                {plan.discount && (
                  <div className="absolute top-2.5 right-2.5 z-10">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold
                      ${isPopular
                        ? 'bg-[#f59e0b]/20 text-[#f59e0b]'
                        : 'bg-[#2dd4bf]/15 text-[#2dd4bf]'
                      }`}
                    >
                      {plan.discount}
                    </span>
                  </div>
                )}

                {/* Icon */}
                <div className={`h-9 w-9 sm:h-10 sm:w-10 rounded-xl flex items-center justify-center mx-auto mb-2.5
                  ${isFree
                    ? 'bg-[#2dd4bf]/10'
                    : isPopular
                      ? 'bg-[#f59e0b]/10'
                      : 'bg-[#2dd4bf]/10'
                  }`}
                >
                  {isFree ? (
                    <Gift className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-[#2dd4bf]" />
                  ) : isPopular ? (
                    <ShieldCheck className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-[#f59e0b]" />
                  ) : (
                    <Lock className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-[#2dd4bf]" />
                  )}
                </div>

                {/* Plan name */}
                <p className={`text-xs sm:text-sm font-bold uppercase tracking-wider mb-1
                  ${isFree
                    ? 'text-[#2dd4bf]'
                    : isPopular
                      ? 'text-[#f59e0b]'
                      : 'text-[#2dd4bf]'
                  }`}
                >
                  {isDa ? plan.nameDa : plan.nameEn}
                </p>

                {/* Description */}
                <p className="text-[10px] sm:text-[11px] text-white/40 leading-relaxed mb-2.5 line-clamp-2 min-h-[2rem]">
                  {isDa ? plan.descDa : plan.descEn}
                </p>

                {/* Price */}
                <p className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {isDa ? plan.priceDa : plan.priceEn}
                </p>
                <p className="text-[10px] sm:text-xs text-white/40 mt-0.5 mb-3">
                  {isDa ? plan.subtitleDa : plan.subtitleEn}
                </p>

                {/* Savings tag */}
                {plan.savingsDa && (
                  <div className={`inline-flex items-center justify-center gap-1 w-full px-2 py-1 rounded-md text-[10px] sm:text-xs font-semibold mb-2.5
                    ${isPopular
                      ? 'bg-[#f59e0b]/10 text-[#f59e0b]'
                      : 'bg-[#2dd4bf]/10 text-[#2dd4bf]'
                    }`}
                  >
                    <Sparkles className="h-3 w-3" />
                    {isDa ? plan.savingsDa : plan.savingsEn}
                  </div>
                )}

                {/* Free tag */}
                {isFree && (
                  <div className="inline-flex items-center justify-center gap-1 w-full px-2 py-1 rounded-md text-[10px] sm:text-xs font-semibold mb-2.5 bg-[#2dd4bf]/10 text-[#2dd4bf]">
                    <Gift className="h-3 w-3" />
                    {isDa ? '60 dage gratis' : '60 days free'}
                  </div>
                )}

                {/* Features */}
                <div className="space-y-1.5 mb-3 flex-1 text-left">
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-1.5">
                      <Check className={`h-3 w-3 shrink-0 mt-0.5
                        ${feat.highlight
                          ? isPopular
                            ? 'text-[#f59e0b]'
                            : 'text-[#2dd4bf]'
                          : 'text-white/30'
                        }`}
                      />
                      <span className={`text-[10px] sm:text-[11px] leading-snug
                        ${feat.highlight
                          ? isPopular
                            ? 'text-[#f59e0b]/90 font-semibold'
                            : 'text-[#2dd4bf]/90 font-semibold'
                          : 'text-white/50'
                        }`}
                      >
                        {isDa ? feat.textDa : feat.textEn}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  type="button"
                  className={`w-full flex items-center justify-center gap-1.5
                    h-8 sm:h-9 px-3 rounded-lg text-xs sm:text-sm font-semibold
                    transition-all duration-200 hover:shadow-md active:scale-[0.97]
                    ${isFree
                      ? 'bg-[#2dd4bf] hover:bg-[#14b8a6] text-[#0c1a33] shadow-[#2dd4bf]/20'
                      : isPopular
                        ? 'bg-[#f59e0b] hover:bg-[#d97706] text-white shadow-[#f59e0b]/20'
                        : 'bg-[#0d9488]/80 hover:bg-[#0d9488] text-white/90 hover:text-white border border-[#0d9488]/40'
                    }`}
                >
                  <span>{isDa ? plan.ctaDa : plan.ctaEn}</span>
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
