"use client";

import Cursor from "@/components/cursor/Cursor";
import SmoothScroll from "@/components/scroll/SmoothScroll";
import PageTransition from "@/components/transitions/PageTransition";
import Navigation from "@/components/navigation/Navigation";
import Navbar from "@/components/navigation/Navbar";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import FairyMagic from "@/components/effects/WaterRipple";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <SmoothScroll>
        <div className="noise-overlay" aria-hidden="true" />
        <FairyMagic />

        <Cursor />
        <Navbar />
        <Navigation />

        <PageTransition>
          <main id="main-content" className="relative">{children}</main>
        </PageTransition>
      </SmoothScroll>
    </ThemeProvider>
  );
}
