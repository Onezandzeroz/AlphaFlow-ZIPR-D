'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useTranslation } from '@/lib/use-translation';
import { useUpgradeModalStore } from '@/lib/upgrade-modal-store';
import { Button } from '@/components/ui/button';
import {
  ShieldX,
  Clock,
  ArrowRight,
  KeyRound,
  Lock,
  Sparkles,
  X,
  FileKey,
  CheckCircle2,
  Eye,
} from 'lucide-react';

/**
 * Premium Upgrade Access Modal
 *
 * Centered modal overlay that appears whenever a user without a valid
 * .tbkey proof attempts a write operation. Mounted ONCE in AppLayout
 * and controlled via the global `useUpgradeModalStore`.
 *
 * Design goals:
 * - Grab attention with gradient header and clear iconography
 * - Show what features are locked vs. still available
 * - Two clear CTAs: Purchase token (external) + Upload proof (settings)
 * - Consistent placement, layout and design across the entire app
 * - Smooth enter/exit animations
 * - Bilingual (DA/EN)
 */
export function UpgradeAccessModal() {
  const { isOpen, variant, action, dismiss } = useUpgradeModalStore();
  const { t, language } = useTranslation();
  const overlayRef = useRef<HTMLDivElement>(null);
  const isExpired = variant === 'expired';

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, dismiss]);

  // Lock body scroll while open
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlayRef.current) dismiss();
    },
    [dismiss]
  );

  const handleGoToSettings = useCallback(() => {
    dismiss();
    // Navigate to settings page with access tab
    window.location.hash = '#settings';
  }, [dismiss]);

  const handlePurchaseToken = useCallback(() => {
    dismiss();
    // Navigate to settings page with access tab
    window.location.hash = '#settings';
  }, [dismiss]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-[440px] overflow-hidden rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-300 bg-white dark:bg-[#141918] border border-gray-200/80 dark:border-white/[0.08]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Gradient Header ── */}
        <div
          className={`relative px-6 pt-6 pb-4 ${
            isExpired
              ? 'bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600'
              : 'bg-gradient-to-br from-[#0d9488] via-[#0f766e] to-[#115e59]'
          }`}
        >
          {/* Decorative circles */}
          <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/10" />
          <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-white/[0.06]" />

          {/* Close button */}
          <button
            type="button"
            onClick={dismiss}
            className="absolute top-3 right-3 z-10 p-1.5 rounded-lg bg-white/15 hover:bg-white/25 text-white/80 hover:text-white transition-colors"
            aria-label={language === 'da' ? 'Luk' : 'Close'}
          >
            <X className="h-4 w-4" />
          </button>

          {/* Icon + Title */}
          <div className="relative flex items-center gap-4">
            <div className="flex-shrink-0 h-14 w-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/20">
              {isExpired ? (
                <Clock className="h-7 w-7 text-white" />
              ) : (
                <ShieldX className="h-7 w-7 text-white" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-white leading-tight">
                {isExpired ? t('upgradeExpiredTitle') : t('upgradeDeniedTitle')}
              </h2>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white/90">
                  <Eye className="h-3 w-3" />
                  {t('readAccessActive')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="px-6 py-5 space-y-5">
          {/* Action context */}
          {action && (
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-gray-50 dark:bg-white/[0.04] border border-gray-100 dark:border-white/[0.06]">
              <Lock className="h-4 w-4 text-gray-500 dark:text-gray-400 shrink-0 mt-0.5" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {language === 'da'
                  ? `Handlingen "${action}" kræver skrivetilladelse.`
                  : `The action "${action}" requires write access.`}
              </p>
            </div>
          )}

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {isExpired
              ? t('upgradeExpiredDescription')
              : t('upgradeDeniedDescription')}
          </p>

          {/* Feature comparison */}
          <div className="rounded-xl border border-gray-200 dark:border-white/[0.08] overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 dark:bg-white/[0.03] border-b border-gray-200 dark:border-white/[0.06]">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {t('upgradeFeaturesTitle')}
              </p>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-white/[0.04]">
              {/* Available features */}
              {[
                { icon: Eye, label: t('upgradeFeatureView'), available: true },
                { icon: Eye, label: t('upgradeFeatureExport'), available: true },
              ].map((feat) => (
                <div key={feat.label} className="flex items-center gap-3 px-4 py-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{feat.label}</span>
                  <span className="ml-auto text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    {t('upgradeAvailable')}
                  </span>
                </div>
              ))}
              {/* Locked features */}
              {[
                { icon: Sparkles, label: t('upgradeFeatureCreate') },
                { icon: Sparkles, label: t('upgradeFeatureEdit') },
                { icon: Sparkles, label: t('upgradeFeatureDelete') },
              ].map((feat) => (
                <div key={feat.label} className="flex items-center gap-3 px-4 py-2.5 opacity-60">
                  <Lock className="h-4 w-4 text-gray-400 dark:text-gray-500 shrink-0" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">{feat.label}</span>
                  <span className="ml-auto text-xs text-gray-400 dark:text-gray-500 font-medium">
                    {t('upgradeLocked')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── CTAs ── */}
          <div className="space-y-2.5 pt-1">
            {/* Primary CTA — Upload Proof */}
            <Button
              onClick={handleGoToSettings}
              className={`w-full gap-2.5 shadow-sm text-white border-0 h-12 text-sm font-semibold rounded-xl transition-all duration-200 hover:shadow-md active:scale-[0.98] ${
                isExpired
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-amber-500/20'
                  : 'bg-gradient-to-r from-[#0d9488] to-[#0f766e] hover:from-[#0a7c72] hover:to-[#0a5f59] shadow-teal-500/20'
              }`}
            >
              <FileKey className="h-5 w-5" />
              <span>{t('upgradeUploadProof')}</span>
              <ArrowRight className="h-4 w-4 ml-auto" />
            </Button>

            {/* Secondary CTA — Purchase Token */}
            <Button
              variant="outline"
              onClick={handlePurchaseToken}
              className="w-full gap-2.5 h-11 text-sm font-medium rounded-xl border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/[0.04] transition-all duration-200"
            >
              <Sparkles className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <span>{t('upgradePurchaseToken')}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
