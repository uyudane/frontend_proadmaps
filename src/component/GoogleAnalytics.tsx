import Script from 'next/script';
import React from 'react';

const GoogleAnalytics = () => {
  const googleTagId = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID || '';
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${googleTagId}`}
        strategy='afterInteractive'
      />
      <Script id='google-analytics' strategy='afterInteractive'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${googleTagId}');
        `}
      </Script>
    </>
  );
};

export default GoogleAnalytics;
