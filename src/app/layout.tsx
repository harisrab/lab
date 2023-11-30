import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Script
        async={true}
        strategy="lazyOnload"
        id="script-component-ad"
        src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
        // crossOrigin="anonymous"
      />
      <Script
        // crossOrigin="anonymous"
        id="script-component-ad2"
        strategy="lazyOnload"
      >
        {`
        console.log("Running after interactive") 
        window.googletag = window.googletag || {cmd: []};

        googletag.cmd.push(function() {
            googletag.defineSlot('/22334301867/bd_desk_ros_billboard_prod', [[728, 90], [970, 250]], 'div-gpt-ad-1701346566408-0')
                .addService(googletag.pubads());
                googletag.pubads().enableSingleRequest();
            googletag.enableServices();
        });        
        `}
      </Script>
      <body className={inter.className}>{children}</body>
    </html>
  );
}