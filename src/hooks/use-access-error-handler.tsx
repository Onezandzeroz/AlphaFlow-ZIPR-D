'use client';

import { useState, useCallback } from 'react';
import { useTranslation } from '@/lib/use-translation';
import { parseApiError, isAccessDenied } from '@/lib/api-error-handler';
import { toast } from 'sonner';
import { AccessDeniedBanner } from '@/components/access-denied-banner';

export interface AccessErrorState {
  variant: 'denied' | 'expired';
  action?: string;
}

interface UseAccessErrorHandlerOptions {
  /** Called when user clicks "Go to Access Settings" */
  onGoToSettings?: () => void;
  /** Called when user clicks "Purchase Access Token" */
  onPurchaseToken?: () => void;
}

/**
 * React hook for handling API errors with bilingual access-denied support.
 *
 * When a mutation (POST/PUT/DELETE) fails:
 * - If the error is ACCESS_DENIED / ACCESS_EXPIRED → shows a centered modal popup
 *   with bilingual message, brief explanation, and CTAs to buy tokens or go to settings.
 * - For all other errors → shows a translated toast message.
 *
 * @example
 * ```tsx
 * const { handleMutationError, accessBanner } = useAccessErrorHandler({
 *   onGoToSettings: () => onViewChange('settings'),
 *   onPurchaseToken: () => onViewChange('settings'),
 * });
 *
 * // In your mutation handler:
 * const response = await fetch('/api/contacts', { method: 'POST', ... });
 * if (!response.ok) {
 *   await handleMutationError(response, 'Opret kontakt');
 *   return;
 * }
 * ```
 *
 * Then render `{accessBanner}` anywhere in your component (it uses fixed/portal positioning).
 */
export function useAccessErrorHandler(options: UseAccessErrorHandlerOptions = {}) {
  const { language } = useTranslation();
  const [accessError, setAccessError] = useState<AccessErrorState | null>(null);

  /**
   * Process a failed fetch response.
   *
   * @param response - The fetch Response that failed (response.ok === false)
   * @param action - Optional human-readable description of the action (e.g. "Opret kontakt" / "Create contact")
   * @returns true if the error was an access denial (popup shown), false otherwise (toast shown)
   */
  const handleMutationError = useCallback(
    async (
      response: Response,
      action?: string,
    ): Promise<boolean> => {
      let body: Record<string, unknown> = {};
      try {
        body = await response.json();
      } catch {
        // Response body is not JSON — use status-based fallback
      }

      // Check if this is a TokenPay access denial
      if (isAccessDenied(body)) {
        const code = body.code as string;
        const variant: AccessErrorState['variant'] =
          code === 'ACCESS_EXPIRED' ? 'expired' : 'denied';

        setAccessError({ variant, action });
        return true; // signal: access denied
      }

      // All other errors — show translated toast
      const err = parseApiError(body, response.status, language);
      toast.error(err.translatedTitle || err.translatedMessage, {
        duration: 5000,
      });

      return false;
    },
    [language]
  );

  const dismissAccessError = useCallback(() => setAccessError(null), []);

  // Render the modal popup when there's an active access error
  const accessBanner = accessError ? (
    <AccessDeniedBanner
      variant={accessError.variant}
      action={accessError.action}
      onGoToSettings={() => {
        dismissAccessError();
        options.onGoToSettings?.();
      }}
      onPurchaseToken={() => {
        dismissAccessError();
        options.onPurchaseToken?.();
      }}
      onDismiss={dismissAccessError}
    />
  ) : null;

  return {
    handleMutationError,
    accessBanner,
    accessError,
    dismissAccessError,
  };
}
