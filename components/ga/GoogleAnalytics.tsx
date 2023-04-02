import Script from 'next/script';

export const GoogleAnalytics = () => {
  return (
    <>
      {/* <!-- Google tag (gtag.js) --> */}
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-NSS3ENV9WK" strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-NSS3ENV9WK');
        `}
      </Script>
    </>
  );
};
