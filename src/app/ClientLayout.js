// src/app/ClientLayout.js

"use client";

import { baselightTheme } from "@/utils/theme/DefaultColors";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Script from "next/script";

export default function ClientLayout({ children }) {
  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=G-9TCLSPVFEL`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9TCLSPVFEL', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <ThemeProvider theme={baselightTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </>
  );
}
