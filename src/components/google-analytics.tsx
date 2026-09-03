"use client";

import * as React from "react";
import Script from "next/script";

const COOKIE_CONSENT_KEY = "cookie-consent";
export const COOKIE_CONSENT_EVENT = "cookie-consent-change";

export function GoogleAnalytics() {
  const [isAccepted, setIsAccepted] = React.useState(false);

  React.useEffect(() => {
    const syncConsent = () => {
      setIsAccepted(localStorage.getItem(COOKIE_CONSENT_KEY) === "accepted");
    };

    syncConsent();
    window.addEventListener(COOKIE_CONSENT_EVENT, syncConsent);
    window.addEventListener("storage", syncConsent);

    return () => {
      window.removeEventListener(COOKIE_CONSENT_EVENT, syncConsent);
      window.removeEventListener("storage", syncConsent);
    };
  }, []);

  if (!isAccepted) {
    return null;
  }

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-8XBX4X0R4Y"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-8XBX4X0R4Y');
          gtag('config', 'AW-799364946');
        `}
      </Script>
    </>
  );
}
