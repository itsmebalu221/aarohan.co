"use client";

import Cursor from "@/components/cursor/Cursor";
import SmoothScroll from "@/components/scroll/SmoothScroll";
import PageTransition from "@/components/transitions/PageTransition";
import Navigation from "@/components/navigation/Navigation";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SmoothScroll>
      <div className="noise-overlay" aria-hidden="true" />

      <Cursor />
      <Navigation />

      <PageTransition>
        <main className="relative">{children}</main>
      </PageTransition>
    </SmoothScroll>
  );
}
