import React, { useRef, useEffect } from 'react';

interface ReCaptchaProps {
  onVerify: (token: string) => void;
  onExpired?: () => void;
  onError?: () => void;
  theme?: 'light' | 'dark';
}

declare global {
  interface Window {
    grecaptcha: {
      render: (container: HTMLElement, parameters: any) => number;
      getResponse: (widgetId?: number) => string;
      reset: (widgetId?: number) => void;
      execute: (widgetId?: number) => void;
      ready: (callback: () => void) => void;
    };
  }
}

// reCAPTCHA site key (public key - safe to store in code)
const RECAPTCHA_SITE_KEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'; // Test key - replace with your actual site key

export const ReCaptcha: React.FC<ReCaptchaProps> = ({
  onVerify,
  onExpired,
  onError,
  theme = 'light'
}) => {
  const captchaRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);

  useEffect(() => {
    const renderCaptcha = () => {
      if (!captchaRef.current || !window.grecaptcha) return;

      try {
        widgetIdRef.current = window.grecaptcha.render(captchaRef.current, {
          sitekey: RECAPTCHA_SITE_KEY,
          theme: theme,
          callback: onVerify,
          'expired-callback': onExpired,
          'error-callback': onError,
        });
      } catch (error) {
        console.error('Failed to render reCAPTCHA:', error);
        onError?.();
      }
    };

    if (window.grecaptcha && window.grecaptcha.render) {
      renderCaptcha();
    } else {
      window.grecaptcha?.ready(renderCaptcha);
    }

    // Cleanup function
    return () => {
      if (widgetIdRef.current !== null && window.grecaptcha) {
        try {
          window.grecaptcha.reset(widgetIdRef.current);
        } catch (error) {
          console.error('Failed to reset reCAPTCHA:', error);
        }
      }
    };
  }, [onVerify, onExpired, onError, theme]);

  const reset = () => {
    if (widgetIdRef.current !== null && window.grecaptcha) {
      window.grecaptcha.reset(widgetIdRef.current);
    }
  };

  return <div ref={captchaRef} className="flex justify-center" />;
};